const MAX_PLATE = 4
const selected = new Set()
const ui = {
	lactase: true,
	muted: false,
	view: 'anatomy',
	everyDay: false,
	playing: false,
	paused: false,
	phase: 'idle',
	hours: 0,
	speed: 1,
	farted: false,
	pooped: false,
	bilePlayed: false,
	acidPlayed: false,
	lastSay: '',
	log: [],
	sparks: [],
	chewFor: 4,
	jawT: 0,
	gurgleAcc: 0,
	animT: 0,
	grabbing: false,
	seeking: false,
	wasPlaying: false,
	grabU: 0
}

const P_CHEW = 0.08
const P_SWALLOW = 0.07
const P_GUT = P_CHEW + P_SWALLOW
const U_SWALLOW0 = 0.02
const U_GUT0 = 0.12

let meal = mix([...selected], { lactase: true })
let lastTick = 0
let chewAcc = 0
let pathEl
let pathLen = 1

const MOUTH = { x: 320, y: 98 }
const LIVER = { x: 210, y: 320 }
const THORACIC = { x: 400, y: 210 }
const ANUS = { x: 340, y: 1000 }

const STAGE_ORGANS = {
	idle: ['mouth'],
	cephalic: ['mouth', 'parotid'],
	chew: ['mouth', 'parotid', 'teeth', 'tongue'],
	swallow: ['mouth', 'epiglottis', 'esophagus'],
	esophagus: ['esophagus', 'les'],
	stomach: ['stomach', 'les'],
	duodenum: ['duodenum', 'gallbladder', 'pancreas', 'liver'],
	jejunum: ['smallbowel', 'liver'],
	ileum: ['smallbowel'],
	colon: ['colon'],
	rectum: ['rectum', 'colon']
}

function $(sel) {
	return document.querySelector(sel)
}

function foodName() {
	if (!meal.foods.length) return 'the bite'
	if (meal.foods.length === 1) return meal.foods[0].name
	return meal.foods.map((f) => f.name).join(' + ')
}

function foodId() {
	return meal.foods.length === 1 ? meal.foods[0].id : 'combo'
}

function say(title, text) {
	if (ui.lastSay === title) return
	ui.lastSay = title
	ui.log.unshift({ title, text })
	ui.log = ui.log.slice(0, 8)
}

function syncPause() {
	const label = ui.paused ? 'Resume' : 'Pause'
	const pause = $('#pause')
	if (pause) {
		pause.textContent = label
		pause.disabled = ui.phase === 'idle'
	}
	document.body.classList.toggle('is-paused', ui.paused && ui.phase !== 'idle' && !ui.grabbing && !ui.seeking)
}

function setPaused(paused) {
	if (ui.phase === 'idle') return
	ui.paused = paused
	syncPause()
	paint()
}

function togglePause() {
	if (ui.phase === 'idle' || ui.grabbing || ui.seeking) return
	if (!ui.playing && !ui.paused && ui.phase === 'gut' && ui.hours >= 48) return
	if (!ui.playing && !ui.paused) ui.playing = true
	setPaused(!ui.paused)
}

function renderTray() {
	const tray = $('#tray')
	const n = selected.size
	tray.innerHTML = `<h2>Plate · click to add · ${n}/${MAX_PLATE}</h2>` + FOODS.map((f) => {
		const on = selected.has(f.id)
		return `<button class="food ${on ? 'on' : ''}" data-id="${f.id}" draggable="true" style="--c:${f.color}">
			<span class="swatch"></span>
			<b>${f.name}</b>
			<small>${f.serving}</small>
		</button>`
	}).join('')
	tray.querySelectorAll('.food').forEach((btn) => {
		const id = btn.dataset.id
		btn.addEventListener('click', () => {
			if (selected.has(id)) selected.delete(id)
			else if (selected.size < MAX_PLATE) selected.add(id)
			rebuildMeal()
			renderTray()
			paint()
		})
		btn.addEventListener('dragstart', (e) => {
			audio.unlock()
			e.dataTransfer.setData('text/plain', id)
			e.dataTransfer.effectAllowed = 'copy'
			document.body.classList.add('dragging')
		})
		btn.addEventListener('dragend', () => document.body.classList.remove('dragging'))
	})
	const eat = $('#eat')
	if (eat) {
		eat.disabled = n === 0
		eat.textContent = n > 1 ? 'Eat this plate' : (n === 1 ? 'Eat selected' : 'Build a plate')
	}
}

function rebuildMeal() {
	meal = mix([...selected], { lactase: ui.lactase })
	ui.farted = false
	ui.pooped = false
	const label = $('#meal-label')
	if (label) label.textContent = meal.foods.map((f) => f.name).join(' + ')
}

function startEating(id) {
	if (id) selected.add(id)
	if (!selected.size) return
	renderTray()
	rebuildMeal()
	ui.log = []
	ui.sparks = []
	ui.lastSay = ''
	ui.playing = true
	ui.paused = false
	ui.phase = 'chew'
	ui.hours = 0
	ui.farted = false
	ui.pooped = false
	ui.bilePlayed = false
	ui.acidPlayed = false
	ui.gurgleAcc = 0
	const extra = Math.max(0, meal.foods.length - 1) * 0.55
	ui.chewFor = (meal.chew === 'liquid' ? 1.4 : meal.chew === 'dense' ? 5.2 : 3.8) + extra
	lastTick = performance.now()
	audio.unlock()
	audio.setMuted(ui.muted)
	if (meal.chew === 'liquid') audio.slurp()
	say(meal.foods.length > 1 ? 'Together' : 'Bite', chewCall().line)
	const eat = $('#eat')
	if (eat) eat.textContent = 'Eating…'
	syncPause()
	syncProgress()
}

function eat() {
	startEating()
}

function svgPoint(evt) {
	const svg = $('.body')
	const ctm = svg.getScreenCTM()
	const pt = svg.createSVGPoint()
	pt.x = evt.clientX
	pt.y = evt.clientY
	if (!ctm) return { x: 0, y: 0 }
	return pt.matrixTransform(ctm.inverse())
}

function progressFromState() {
	if (ui.phase === 'idle') return 0
	if (ui.phase === 'chew') return (ui.hours / Math.max(0.2, ui.chewFor)) * P_CHEW
	if (ui.phase === 'swallow') return P_CHEW + (ui.hours / 1.7) * P_SWALLOW
	return P_GUT + (ui.hours / 48) * (1 - P_GUT)
}

function uFromProgress(p) {
	if (p <= P_CHEW) return (p / P_CHEW) * U_SWALLOW0
	if (p <= P_GUT) return U_SWALLOW0 + ((p - P_CHEW) / P_SWALLOW) * (U_GUT0 - U_SWALLOW0)
	return U_GUT0 + ((p - P_GUT) / (1 - P_GUT)) * (0.995 - U_GUT0)
}

function progressFromU(u) {
	if (u <= U_SWALLOW0) return (u / U_SWALLOW0) * P_CHEW
	if (u <= U_GUT0) return P_CHEW + ((u - U_SWALLOW0) / (U_GUT0 - U_SWALLOW0)) * P_SWALLOW
	return P_GUT + ((u - U_GUT0) / (0.995 - U_GUT0)) * (1 - P_GUT)
}

function leadU() {
	return uFromProgress(progressFromState())
}

function midParticleU(hours) {
	const saved = ui.phase
	ui.phase = 'gut'
	const u = particleU(stateAt(meal, hours, 'gut'), 20, 'starch')
	ui.phase = saved
	return Math.max(U_GUT0, u)
}

function visualLeadU() {
	if (ui.phase === 'gut') return midParticleU(ui.hours)
	return leadU()
}

function seekFromU(u) {
	u = Math.max(0, Math.min(0.995, u))
	if (u <= U_GUT0) {
		seekProgress(progressFromU(u))
		return
	}
	const saved = ui.phase
	ui.phase = 'gut'
	let lo = 0
	let hi = 48
	for (let i = 0; i < 20; i++) {
		const mid = (lo + hi) / 2
		const pu = particleU(stateAt(meal, mid, 'gut'), 20, 'starch')
		if (pu < u) lo = mid
		else hi = mid
	}
	ui.phase = saved
	seekProgress(P_GUT + (((lo + hi) / 2) / 48) * (1 - P_GUT))
}

function applyProgress(p) {
	p = Math.max(0, Math.min(1, p))
	if (p <= P_CHEW) {
		ui.phase = 'chew'
		ui.hours = (p / P_CHEW) * ui.chewFor
		ui.playing = true
		return
	}
	if (p <= P_GUT) {
		ui.phase = 'swallow'
		ui.hours = ((p - P_CHEW) / P_SWALLOW) * 1.7
		ui.playing = true
		return
	}
	ui.phase = 'gut'
	ui.hours = ((p - P_GUT) / (1 - P_GUT)) * 48
	if (ui.hours >= 48) {
		ui.hours = 48
		ui.playing = false
		const eat = $('#eat')
		if (eat) eat.textContent = 'Eat again'
		return
	}
	ui.playing = true
	const eat = $('#eat')
	if (eat) eat.textContent = 'Eating…'
}

function seekProgress(p) {
	const prev = progressFromState()
	applyProgress(p)
	if (p < prev - 0.002) {
		const stage = ui.phase === 'gut' ? stateAt(meal, ui.hours, 'gut').stage : ui.phase
		if (stage !== 'rectum') ui.pooped = false
		if (stage !== 'colon' && stage !== 'rectum') ui.farted = false
		if (stage === 'chew' || stage === 'swallow' || stage === 'stomach' || stage === 'esophagus') ui.bilePlayed = false
	}
}

function syncProgress() {
	const el = $('#progress')
	if (!el) return
	el.disabled = ui.phase === 'idle'
	if (ui.seeking || ui.grabbing) return
	el.value = String(Math.round(progressFromState() * 1000))
}

function closestUNear(pt, hintU, window) {
	const w = window ?? 0.14
	const start = Math.max(0, hintU - w)
	const end = Math.min(0.995, hintU + w)
	const steps = 70
	let best = hintU
	let bestD = Infinity
	for (let i = 0; i <= steps; i++) {
		const u = start + (end - start) * (i / steps)
		const q = pathEl.getPointAtLength(u * pathLen)
		const dx = q.x - pt.x
		const dy = q.y - pt.y
		const d = dx * dx + dy * dy
		if (d < bestD) {
			bestD = d
			best = u
		}
	}
	return { u: best, d: Math.sqrt(bestD) }
}

function canGrab(pt) {
	if (ui.phase === 'idle' || !pathEl) return false
	const lead = pathEl.getPointAtLength(visualLeadU() * pathLen)
	if (Math.hypot(pt.x - lead.x, pt.y - lead.y) < 44) return true
	return closestUNear(pt, visualLeadU(), 0.05).d < 26
}

function inMouth(p) {
	const dx = (p.x - MOUTH.x) / 52
	const dy = (p.y - MOUTH.y) / 40
	return dx * dx + dy * dy < 1
}

function tick(ts) {
	requestAnimationFrame(tick)
	const dt = Math.min(0.05, (ts - lastTick) / 1000)
	lastTick = ts
	if (!ui.playing || ui.paused || ui.grabbing || ui.seeking) {
		paint()
		return
	}

	ui.animT += dt
	ui.sparks = ui.sparks.filter((s) => {
		s.life -= dt
		s.x += (s.tx - s.x) * dt * 2.2
		s.y += (s.ty - s.y) * dt * 2.2
		return s.life > 0
	})

	if (ui.phase === 'chew') {
		ui.hours += dt
		chewAcc += dt
		if (chewAcc > (meal.chew === 'liquid' ? 0.35 : 0.42)) {
			chewAcc = 0
			audio.chew(meal.chew)
		}
		if (ui.hours > ui.chewFor * 0.45) say('Mush', mushCall().line)
		if (ui.hours > ui.chewFor) {
			ui.phase = 'swallow'
			ui.hours = 0
			audio.swallow()
			say('Swallow', 'TRAPDOOR. Epiglottis slams the airway shut. One wet slug down the esophagus. Gravity is optional. Breathing is not allowed.')
		}
	} else if (ui.phase === 'swallow') {
		ui.hours += dt
		if (ui.hours > 1.7) {
			ui.phase = 'gut'
			ui.hours = 0.01
			if (meal.carbonated) audio.fizz()
			audio.acid()
			ui.acidPlayed = true
			say('Stomach', stomachCall().line)
		}
	} else if (ui.phase === 'gut') {
		ui.hours += dt * ui.speed * (0.4 + ui.hours * 0.09)
		if (ui.hours > 48) {
			ui.hours = 48
			ui.playing = false
			ui.paused = false
			$('#eat').textContent = 'Eat again'
			syncPause()
		}
		const state = stateAt(meal, ui.hours, 'gut')
		ui.gurgleAcc += dt
		if (state.stage === 'stomach') {
			if (ui.gurgleAcc > 1.6) {
				ui.gurgleAcc = 0
				audio.acid()
			}
		} else if (state.stage === 'duodenum' || state.stage === 'jejunum' || state.stage === 'ileum') {
			if (ui.gurgleAcc > 1.1) {
				ui.gurgleAcc = 0
				if (Math.random() < 0.65) audio.gurgle()
				else audio.squish()
			}
		} else if (state.stage === 'colon' || state.stage === 'rectum') {
			if (ui.gurgleAcc > 0.9) {
				ui.gurgleAcc = 0
				if (state.gas >= 2) audio.bubble()
				else audio.squish()
			}
		}
		if (state.stage === 'duodenum' && !ui.bilePlayed) {
			ui.bilePlayed = true
			audio.bile()
			say('Bile', 'BILE DUMP. The gallbladder squeezes green-gold detergent onto the fat. Pancreas floods bicarbonate so the enzymes can actually work.')
		}
		if (state.stage === 'jejunum') say('Heist', 'THE HEIST. Look — bits are vanishing. That is not magic. That is you. Sugars and amino acids steal into the portal vein. Fat sneaks out the back through lymph.')
		if (state.stage === 'colon') say('Colon', 'Leftovers. Water out. Bacteria in. They are throwing a fermentation party and the balloons are hydrogen.')
		if (state.stage === 'rectum' && !ui.pooped) {
			ui.pooped = true
			audio.plop()
			say('Out', poopCall(state).line)
		}
		if (state.fartNow && !ui.farted) {
			ui.farted = true
			if (!ui.muted) audio.fart(state.gas)
			say('Gas', 'THERE IT IS. Microbial exhaust. Hydrogen, carbon dioxide, maybe methane. Your colon just exhaled.')
		}
	}
	paint()
}

function paint() {
	const state = ui.phase === 'idle'
		? stateAt(meal, 0, 'cephalic')
		: stateAt(meal, ui.hours, ui.phase === 'gut' ? 'gut' : ui.phase)

	document.body.dataset.view = ui.view
	document.body.dataset.phase = ui.phase
	document.body.dataset.stage = state.stage

	highlight(ui.phase === 'idle' ? 'idle' : state.stage)
	drawFood(state)
	drawBooth(state)
	drawEpiglottis(ui.phase === 'swallow')
	drawJaw(ui.phase === 'chew')
	syncPause()
	syncProgress()
}

function highlight(stage) {
	document.querySelectorAll('[data-organ]').forEach((el) => el.classList.remove('hot'))
	const ids = STAGE_ORGANS[stage] || []
	ids.forEach((id) => {
		document.querySelectorAll(`[data-organ="${id}"]`).forEach((el) => el.classList.add('hot'))
	})
}

function drawEpiglottis(on) {
	const flap = $('#epiglottis-flap')
	if (flap) flap.setAttribute('transform', on ? 'rotate(52 320 124)' : 'rotate(0 320 124)')
}

function drawJaw(on) {
	const jaw = $('#jaw')
	if (!jaw) return
	if (on && !ui.paused) ui.jawT = Math.sin(ui.animT * 11) * 5
	if (!on) ui.jawT = 0
	jaw.setAttribute('transform', `translate(0 ${ui.jawT})`)
	const tongue = $('#tongue')
	if (tongue) tongue.setAttribute('transform', `translate(0 ${on ? ui.jawT * 0.45 : 0})`)
}

function svgEl(name, attrs) {
	const el = document.createElementNS('http://www.w3.org/2000/svg', name)
	for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
	return el
}

function drawFood(state) {
	const g = $('#bolus-cloud')
	if (!g || !pathEl) return
	g.innerHTML = ''
	if (ui.view === 'xray') {
		drawXrayGas(state)
		return
	}
	if (ui.phase === 'idle') return

	if (ui.phase === 'chew') drawChew(g)
	else if (ui.phase === 'swallow') drawSwallow(g)
	else drawGut(g, state)

	drawGrabber(g)
	ui.sparks.forEach((s) => {
		g.appendChild(blob(s.x, s.y, 2.4, s.kind === 'fat' ? '#e6d48a' : '#d46a5a', Math.max(0.15, s.life)))
	})
}

function drawGrabber(g) {
	if (!pathEl || ui.phase === 'idle') return
	const u = Math.min(0.995, visualLeadU())
	const pt = pathEl.getPointAtLength(u * pathLen)
	const r = ui.grabbing ? 16 : 13
	g.appendChild(svgEl('circle', {
		cx: pt.x, cy: pt.y, r: r + 8,
		fill: '#d4a24c',
		'fill-opacity': ui.grabbing ? '0.16' : '0.08',
		stroke: '#d4a24c',
		'stroke-width': ui.grabbing ? '2.4' : '1.6',
		'stroke-dasharray': ui.grabbing ? '0' : '4 3',
		opacity: '0.95'
	}))
	g.appendChild(blob(pt.x, pt.y, r, lerpColor(meal.color, '#d4c4a8', 0.35), 0.97))
}

function drawChew(g) {
	const p = Math.min(1, ui.hours / ui.chewFor)
	const foods = meal.foods.length ? meal.foods : [{ color: meal.color }]
	if (meal.chew === 'liquid' || p > 0.78) {
		const r = 16 - p * 6
		g.appendChild(blob(MOUTH.x, MOUTH.y + p * 4, r, lerpColor(meal.color, '#d4c4a8', Math.min(1, p * 1.1)), 0.95))
		if (foods.length > 1 && p < 0.95) {
			foods.forEach((f, i) => {
				const ang = (i / foods.length) * Math.PI * 2
				g.appendChild(blob(MOUTH.x + Math.cos(ang) * 5, MOUTH.y + Math.sin(ang) * 3, 3.2, f.color, 0.8))
			})
		}
		return
	}
	const n = p < 0.22 ? foods.length : Math.max(8, foods.length * 3)
	for (let i = 0; i < n; i++) {
		const food = foods[i % foods.length]
		const mush = lerpColor(food.color, '#d4c4a8', Math.min(1, p * 1.3))
		const ang = (i / n) * Math.PI * 2 + ui.hours * 3
		const spread = p < 0.22 ? 4 : 10 + p * 8
		const x = MOUTH.x + Math.cos(ang) * spread
		const y = MOUTH.y + Math.sin(ang) * (spread * 0.45) + ui.jawT * 0.4
		const r = (14 - p * 9) * (p < 0.22 ? 0.7 : 0.5)
		g.appendChild(blob(x, y, r, mush, 0.92))
	}
	if (p > 0.2 && p < 0.75) {
		g.appendChild(svgEl('circle', {
			cx: MOUTH.x + 18, cy: MOUTH.y + 8, r: 2.2,
			fill: '#e8efe8', opacity: '0.55'
		}))
		g.appendChild(svgEl('circle', {
			cx: MOUTH.x - 16, cy: MOUTH.y + 10, r: 1.6,
			fill: '#e8efe8', opacity: '0.4'
		}))
	}
}

function drawSwallow(g) {
	const p = Math.min(1, ui.hours / 1.7)
	const u = 0.02 + p * 0.1
	const pt = pathEl.getPointAtLength(u * pathLen)
	g.appendChild(blob(pt.x, pt.y, 11, lerpColor(meal.color, '#cbb89a', 0.6), 0.95))
}

function drawGut(g, state) {
	const n = 46
	const barium = ui.view === 'barium'
	for (let i = 0; i < n; i++) {
		const kind = particleKind(i)
		const u = particleU(state, i, kind)
		if (u < 0) continue
		const pt = pathEl.getPointAtLength(Math.min(0.995, u) * pathLen)
		const inSi = state.stage === 'jejunum' || state.stage === 'ileum' || state.stage === 'duodenum'
		const absorb = inSi && kind !== 'fiber' ? Math.min(0.85, state.hours / 8) : 0
		if (absorb > 0.15 && Math.random() < 0.04 && !ui.paused) {
			ui.sparks.push({
				x: pt.x, y: pt.y,
				tx: kind === 'fat' ? THORACIC.x : LIVER.x,
				ty: kind === 'fat' ? THORACIC.y : LIVER.y,
				life: 1.1,
				kind
			})
		}
		if (absorb > 0.7 && kind !== 'fiber') continue
		const churn = state.stage === 'stomach' ? 11 : 5
		const x = pt.x + Math.sin(i * 1.7 + ui.hours) * churn
		const y = pt.y + Math.cos(i * 1.3 + ui.hours * 0.8) * (churn * 0.7)
		const mushR = state.stage === 'stomach' ? 5.5 : 3.4
		const r = kind === 'fiber' ? mushR + 0.8 : mushR * (1 - absorb * 0.7)
		const c = barium ? '#e8eef2' : particleColor(state, kind, i)
		g.appendChild(blob(x, y, r, c, barium ? 0.9 : 0.88))
	}

	if (state.stage === 'colon' && state.gas >= 2 && ui.view === 'anatomy') {
		for (let i = 0; i < Math.min(12, Math.round(state.gas * 3)); i++) {
			const u = 0.72 + i / 22
			const pt = pathEl.getPointAtLength(u * pathLen)
			g.appendChild(svgEl('circle', {
				cx: pt.x + Math.sin(i + ui.hours * 2) * 8,
				cy: pt.y - 10,
				r: 2 + (i % 3),
				fill: 'none',
				stroke: '#c9e4d4',
				'stroke-width': '1.2',
				opacity: '0.75'
			}))
		}
	}

	if (state.stage === 'rectum' || (state.inRectum && state.inRectum > 0.35)) drawPoop(g, state)
}

function drawPoop(g, state) {
	const t = Math.min(1, (state.hours - 20) / 12)
	const y = ANUS.y - 40 + t * 50
	const x = ANUS.x
	const type = state.bristol
	const c = '#5a3c28'
	if (type <= 2) {
		for (let i = 0; i < 5; i++) g.appendChild(blob(x + (i - 2) * 7, y + (i % 2) * 6, 5, c, 0.95))
	} else if (type <= 4) {
		g.appendChild(svgEl('path', {
			d: `M ${x - 8} ${y} C ${x - 10} ${y + 32}, ${x + 10} ${y + 32}, ${x + 8} ${y} Z`,
			fill: c
		}))
		g.appendChild(svgEl('ellipse', {
			cx: x - 2, cy: y + 8, rx: 3, ry: 2, fill: '#6e4a32', opacity: '0.5'
		}))
	} else if (type === 5) {
		g.appendChild(blob(x - 8, y, 7, c, 0.9))
		g.appendChild(blob(x + 6, y + 8, 6, c, 0.9))
	} else {
		g.appendChild(blob(x, y + 6, 12, '#7a5a3a', 0.7))
	}
}

function blob(x, y, r, fill, opacity) {
	const g = svgEl('g', {})
	g.appendChild(svgEl('ellipse', {
		cx: x, cy: y, rx: r * 1.18, ry: r * 0.86, fill, opacity: String(opacity)
	}))
	g.appendChild(svgEl('ellipse', {
		cx: x - r * 0.32, cy: y - r * 0.28, rx: r * 0.38, ry: r * 0.22,
		fill: '#fff', opacity: String(Math.min(0.35, opacity * 0.28))
	}))
	return g
}

function drawXrayGas(state) {
	const g = $('#bolus-cloud')
	;[[455, 350], [196, 620], [504, 620], [340, 436]].forEach(([x, y], i) => {
		g.appendChild(svgEl('circle', { cx: x, cy: y, r: 10 + (i === 0 ? 8 : 4), fill: '#0a0a0a', opacity: '0.55' }))
	})
}

function particleKind(i) {
	const m = meal.macros
	const total = m.carb + m.protein + m.fat + m.fiber + 0.01
	const roll = (i % 100) / 100
	const fatP = m.fat / total
	const fibP = m.fiber / total
	const proP = m.protein / total
	if (roll < fibP) return 'fiber'
	if (roll < fibP + fatP) return 'fat'
	if (roll < fibP + fatP + proP) return 'protein'
	return 'starch'
}

function particleU(state, i, kind) {
	if (ui.phase === 'idle' || ui.phase === 'chew' || ui.phase === 'swallow') return -1
	const delay = (i / 52) * 0.18
	const t = state.hours
	let ge = Math.pow(0.5, Math.max(0, t - delay) / meal.t50h)
	if (kind === 'fat') ge = Math.pow(0.5, Math.max(0, t - delay) / (meal.t50h * 1.35))
	if (kind === 'fiber') ge = Math.pow(0.5, Math.max(0, t - delay) / (meal.t50h * 1.15))
	const leftStomach = 1 - ge
	const siU = Math.min(1, Math.max(0, (t - delay - meal.t50h * 0.45) / meal.siTransitH))
	const colU = Math.min(1, Math.max(0, (t - delay - meal.t50h * 0.6 - meal.siTransitH * 0.7) / meal.colonH))
	if (ge > 0.55) return 0.12 + (1 - ge) * 0.12 + (i % 5) * 0.004
	if (leftStomach < 0.92 && siU < 0.95) return 0.28 + siU * 0.32 + delay * 0.05
	return 0.62 + Math.min(0.37, colU * 0.36)
}

function particleColor(state, kind, i) {
	const food = meal.foods.length ? meal.foods[i % meal.foods.length] : null
	const base = food ? food.color : meal.color
	if (state.stage === 'colon' || state.stage === 'rectum') return lerpColor(base, '#6b4a32', 0.82)
	if (state.stage === 'stomach') return lerpColor(base, '#c4b08a', 0.55)
	if (kind === 'fat') return lerpColor(base, '#e6d48a', 0.7)
	if (kind === 'protein') return lerpColor(base, '#c98580', 0.55)
	if (kind === 'fiber') return base
	return lerpColor(base, '#d2c2a6', 0.35)
}

function lerpColor(a, b, t) {
	const pa = hexRgb(a)
	const pb = hexRgb(b)
	const r = Math.round(pa[0] + (pb[0] - pa[0]) * t)
	const g = Math.round(pa[1] + (pb[1] - pa[1]) * t)
	const bl = Math.round(pa[2] + (pb[2] - pa[2]) * t)
	return `#${[r, g, bl].map((n) => n.toString(16).padStart(2, '0')).join('')}`
}

function hexRgb(h) {
	const s = h.replace('#', '')
	return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)]
}

function chewCall() {
	if (meal.foods.length > 1) {
		return {
			title: 'Together',
			line: `${foodName()} hit the teeth as one swallow. Different textures, one bolus. Fat and fiber on this plate will set the pace for everyone — the fast item does not get to cut the line.`
		}
	}
	const name = foodName()
	const lines = {
		water: { title: 'A sip', line: `${name}. No chew. Just a cold swallow lining up at the trapdoor.` },
		cola: { title: 'Fizz', line: `${name} hits the tongue — sugar, acid, bubbles trying to climb back out already.` },
		milk: { title: 'White', line: `${name}. No fracture. A creamy swallow. Lactose is the plot twist later, if this person has no lactase.` },
		apple: { title: 'Crunch', line: `CRUNCH. Enamel vs ${name}. Juice everywhere. Skin is fiber. Flesh is sugar-water. The mouth is winning.` },
		broccoli: { title: 'Crunch', line: `${name} fights back. Cell walls. Chlorophyll. A fibrous crunch the small bowel will not fully cash.` },
		steak: { title: 'Work', line: `${name}. This is a job. Muscle fibers. Fat. Masseter burning. The stomach is going to be busy for hours.` },
		'black-beans': { title: 'Dense', line: `${name}. Starchy. Tight. The GOS in these is a gift to the colon bacteria — they will throw a gas party.` },
		pizza: { title: 'Loaded', line: `${name}. Fat, starch, cheese. A delayed-emptying special. The pylorus is going to be picky.` },
		oats: { title: 'Glue', line: `${name} going gluey. Beta-glucan. This will thicken into a respectable bolus.` },
		'white-rice': { title: 'Soft', line: `${name} between the teeth. Soft starch. Easy mush. A quiet colon later — rice does not ferment much.` }
	}
	return lines[foodId()] || { title: 'Bite', line: `${name} hits the teeth. Six systems are eating. The gut is only receiving.` }
}

function mushCall() {
	if (meal.foods.length > 1) {
		return {
			title: 'One mush',
			line: `${foodName()} are losing their edges. The stomach will not sort them into separate queues. This is one chyme.`
		}
	}
	return {
		title: 'Mush',
		line: `It is paste. You could not pick ${foodName()} out of a lineup. Saliva + crushing = a swallowable bolus. Gross. Perfect.`
	}
}

function stomachCall() {
	const fat = meal.macros.fat > 2
	const pro = meal.macros.protein > 1
	const combo = meal.foods.length > 1
	return {
		title: combo ? 'Shared acid vat' : 'Acid vat',
		line: `Welcome to the acid vat. pH ~2. ${combo ? 'Every food on the plate is in here together. ' : ''}${pro ? 'Pepsin is unzipping protein. ' : ''}${fat ? `Fat (${meal.macros.fat.toFixed(0)} g) is stalling the exit for the whole mix — liquids still leak first. ` : ''}Half-empty ~${meal.t50h.toFixed(1)} h. Only bits ≲ 2 mm get past the pylorus.`
	}
}

function poopCall(state) {
	return {
		title: 'Out',
		line: `And that is the exit. Bristol type ${state.bristol} — ${BRISTOL[state.bristol - 1]}. Everything useful already left. This is the receipt. A typical-adult model, not your lab result.`
	}
}

function boothCopy(state) {
	if (ui.phase === 'idle') {
		if (!meal.foods.length) {
			return {
				title: 'Build a plate',
				line: 'Click two, three, four foods. Drop any of them on the mouth. They enter as one meal — fat slows the sugar, fiber rides with the steak, beans ferment whether the rice is quiet or not.',
				aside: 'The point is to see what combinations do, so the next plate is a better one. Pause is up top. Spacebar works.'
			}
		}
		const lesson = meal.lessons[0]
		return {
			title: lesson ? lesson.title : 'This plate',
			line: lesson ? lesson.text : `${foodName()} is ready. Drop it on the mouth.`,
			aside: lesson ? lesson.better : 'Click another food to see how the clock and the leftover change.'
		}
	}
	if (ui.phase === 'chew') {
		const mush = ui.hours > ui.chewFor * 0.45
		const call = mush ? mushCall() : chewCall()
		return {
			title: call.title,
			line: call.line,
			aside: mush
				? 'Particle size is collapsing. A bolus is just food that has agreed to be swallowed.'
				: 'Incisors cut. Molars grind. Parotids hose it with saliva. Amylase starts starch before the stomach even knows.'
		}
	}
	if (ui.phase === 'swallow') {
		return {
			title: 'The trapdoor',
			line: 'One wet bolus. Epiglottis vs trachea. Then a stripping wave down the esophagus. You do not get a vote.',
			aside: 'The lower esophageal sphincter is the bouncer at the stomach door.'
		}
	}
	const stage = {
		esophagus: {
			title: 'Down the pipes',
			line: 'The mush is a single slug riding a peristaltic stripping wave. Gravity is a courtesy, not a requirement.',
			aside: 'About two seconds of transit if the wave is honest.'
		},
		stomach: {
			title: 'Chyme factory',
			line: stomachCall().line,
			aside: 'Liquids leave first. Fat lags. That pale J on your right is the patient’s left — the fundus parked under the ribs.'
		},
		duodenum: {
			title: 'Chemical takedown',
			line: 'Bile from the green gallbladder. Bicarbonate and enzymes from the pancreas. Fat goes cloudy. This is where the meal is taken apart for real.',
			aside: 'The C-loop of duodenum is hugging the head of the pancreas. That is not a cartoon. That is anatomy.'
		},
		jejunum: {
			title: 'The heist',
			line: meal.foods.length > 1
				? 'Watch the colors vanish at different jobs. Sugars and amino acids — red sparks to the liver. Fat — cream sparks up through lymph. Fiber from the plants stays in the tube. The mix does not absorb as one blob.'
				: 'Watch bits vanish. Red sparks to the liver — sugars and amino acids in the portal vein. Cream sparks up — fat in lacteals, into lymph. Fiber stays in the tube because it cannot cross.',
			aside: glucoseAside()
		},
		ileum: {
			title: 'Last useful bits',
			line: 'Residue, bile acids, B12 if there is any. Most of the meal has already crossed into blood or lymph. What remains is heading for the cecum.',
			aside: 'Terminal ileum, viewer’s left, dumps into the cecum through the ileocecal valve.'
		},
		colon: {
			title: 'The drying rack',
			line: 'Water out. Microbes in. Leftover carbohydrate becomes gas. Color turns brown here — stercobilin, late, not in the stomach. This is poop being assembled.',
			aside: meal.fermentable ? 'This meal has fermentable leftovers. The bacteria are employed.' : 'A quiet ferment. Rice-like. Fewer balloons.'
		},
		rectum: {
			title: 'Outgoing',
			line: poopCall(state).line,
			aside: 'Haustra packed it. Rectum holds it. The rest is plumbing.'
		}
	}
	return stage[state.stage] || {
		title: 'Follow the food',
		line: 'The model is the event. I just call the play.',
		aside: ''
	}
}

function glucoseAside() {
	const g = meal.glucose
	if (g === 'spike') return 'Glucose shape: steep. Liquid sugar, weak brakes.'
	if (g === 'blunted') return 'Glucose shape: blunted. Fat/protein/soluble fiber sharing the swallow.'
	if (g === 'fast-starch') return 'Glucose shape: fast starch. White rice-like, little fiber.'
	if (g === 'low') return 'Glucose shape: low. This plate is not a carb flood.'
	return 'Glucose shape: steady. Mixed brakes on the carb.'
}

function drawBooth(state) {
	const copy = boothCopy(state)
	const title = $('#call-title')
	const line = $('#call-line')
	const aside = $('#call-aside')
	const clock = $('#clock')
	const live = $('#live-pill')
	if (title) title.textContent = copy.title
	if (line) line.textContent = copy.line
	if (aside) aside.textContent = copy.aside
	drawPlateFacts()
	if (live) {
		live.textContent = ui.paused ? 'PAUSED' : (ui.playing ? 'LIVE' : 'STANDBY')
		live.classList.toggle('paused', ui.paused)
		live.classList.toggle('hot', ui.playing && !ui.paused)
	}
	if (ui.phase === 'idle') clock.textContent = meal.foods.length
		? `Stomach ½ empty ~${meal.t50h.toFixed(1)} h · gut ~${meal.wholeGutH.toFixed(0)} h`
		: 'Click foods, then drop them on the mouth'
	else if (ui.phase === 'chew') clock.textContent = 'Mouth · chewing'
	else if (ui.phase === 'swallow') clock.textContent = 'Pharynx → esophagus'
	else clock.textContent = formatHours(state.hours) + '  ·  ' + state.appearance
	$('#pH').textContent = ui.phase === 'idle' ? '' : `pH ${state.pH}`
	$('#bristol-read').textContent = ui.phase === 'gut' ? `Bristol ${state.bristol} — ${BRISTOL[state.bristol - 1]}` : ''
	$('#log').innerHTML = ui.log.map((row) => `<li><b>${row.title}</b>${row.text}</li>`).join('')

	const proofs = proofsFor(state.proofIds).slice(0, 1)
	$('#proof').innerHTML = proofs.map((p) => `
		<article class="proof ${p.grade}">
			<div class="pg">${p.grade === 'robust' ? '✓ experiment' : p.grade}</div>
			<h3>${p.claim}</h3>
			<p class="exp">${p.experiment}</p>
			<a href="${p.href}" target="_blank" rel="noreferrer">${p.cite}</a>
		</article>
	`).join('')

	if (ui.everyDay) {
		$('#long').hidden = false
		$('#long').innerHTML = longTerm(meal)
	} else $('#long').hidden = true
}

function glucoseWord() {
	return {
		spike: 'steep',
		blunted: 'blunted',
		'fast-starch': 'fast starch',
		low: 'low',
		steady: 'steady'
	}[meal.glucose] || meal.glucose
}

function drawPlateFacts() {
	const macros = $('#macros')
	const timing = $('#timing')
	const lessons = $('#lessons')
	const legend = $('#food-legend')
	if (!macros) return
	if (!meal.foods.length) {
		macros.innerHTML = ''
		if (timing) timing.innerHTML = ''
		if (lessons) lessons.innerHTML = ''
		if (legend) legend.innerHTML = ''
		return
	}
	const m = meal.macros
	const max = Math.max(m.protein, m.fat, m.carb, m.fiber, m.addedSugar, 1)
	macros.innerHTML = [
		['Protein', m.protein, '#c98580'],
		['Fat', m.fat, '#e6d48a'],
		['Carb', m.carb, '#d4a24c'],
		['Fiber', m.fiber, '#7fa07a'],
		['Sugar+', m.addedSugar, '#c46a4a']
	].map(([label, g, c]) => {
		const w = Math.max(8, (g / max) * 100)
		return `<span><b>${label}</b><i style="width:${w}%;background:${c}"></i>${g.toFixed(g < 10 ? 1 : 0)} g</span>`
	}).join('')
	if (timing) {
		timing.innerHTML = `
			<div><b>Stomach ½ empty</b>${meal.t50h.toFixed(1)} h</div>
			<div><b>Small bowel</b>~${meal.siTransitH.toFixed(1)} h</div>
			<div><b>Colon</b>~${meal.colonH.toFixed(0)} h</div>
			<div><b>Whole-gut model</b>~${meal.wholeGutH.toFixed(0)} h</div>
			<div><b>Glucose</b>${glucoseWord()}</div>
			<div><b>Satiety</b>${meal.satiety}</div>
		`
	}
	if (lessons) {
		lessons.innerHTML = meal.lessons.map((L) => `
			<article class="lesson ${L.grade}">
				<div class="pg">Eat better · ${L.grade === 'robust' ? '✓ physiology' : L.grade}</div>
				<h3>${L.title}</h3>
				<p>${L.text}</p>
				<p class="better">${L.better}</p>
			</article>
		`).join('')
	}
	if (legend) {
		legend.innerHTML = meal.foods.map((f) => `<span><i style="background:${f.color}"></i>${f.name}</span>`).join('')
	}
}

function formatHours(h) {
	if (h < 1) return `${Math.round(h * 60)} min`
	return `${Math.floor(h)} h ${Math.round((h % 1) * 60)} m`
}

function longTerm(m) {
	if (m.flags.has('upf') || m.macros.addedSugar > 10) return '<p>Pattern only: repeated added-sugar meals, not this one bite.</p>'
	if (m.fiber.insoluble + m.fiber.soluble >= 4) return '<p>A fiber-rich pattern supports bulk and transit in healthy-adult trials.</p>'
	return ''
}

function bind() {
	renderTray()
	rebuildMeal()
	pathEl = $('#gut-path')
	pathLen = pathEl.getTotalLength()

	const svg = $('.body')
	svg.addEventListener('dragover', (e) => {
		e.preventDefault()
		document.body.classList.toggle('over-mouth', inMouth(svgPoint(e)))
	})
	svg.addEventListener('drop', (e) => {
		e.preventDefault()
		document.body.classList.remove('dragging', 'over-mouth')
		const id = e.dataTransfer.getData('text/plain')
		if (id && inMouth(svgPoint(e))) startEating(id)
	})

	$('#eat').addEventListener('click', eat)
	$('#pause').addEventListener('click', togglePause)
	$('#speed').addEventListener('input', (e) => {
		ui.speed = Number(e.target.value)
		$('#speed-read').textContent = `${ui.speed.toFixed(1)}×`
	})
	$('#lactase').addEventListener('change', (e) => {
		ui.lactase = e.target.checked
		rebuildMeal()
		paint()
	})
	$('#mute').addEventListener('change', (e) => {
		ui.muted = e.target.checked
		audio.setMuted(ui.muted)
		if (!ui.muted) audio.unlock()
	})
	$('#everyday').addEventListener('change', (e) => {
		ui.everyDay = e.target.checked
		paint()
	})
	document.querySelectorAll('[data-view]').forEach((b) => {
		b.addEventListener('click', () => {
			ui.view = b.dataset.view
			document.querySelectorAll('[data-view]').forEach((x) => x.classList.toggle('on', x === b))
			paint()
		})
	})
	$('#progress').addEventListener('pointerdown', () => {
		if (ui.phase === 'idle') return
		ui.seeking = true
		ui.wasPlaying = ui.playing && !ui.paused
		ui.paused = true
		syncPause()
	})
	$('#progress').addEventListener('input', (e) => {
		if (ui.phase === 'idle') return
		seekProgress(Number(e.target.value) / 1000)
		paint()
	})
	const endSeek = () => {
		if (!ui.seeking) return
		ui.seeking = false
		if (ui.wasPlaying) ui.paused = false
		syncPause()
		paint()
	}
	$('#progress').addEventListener('pointerup', endSeek)
	$('#progress').addEventListener('pointercancel', endSeek)

	svg.addEventListener('pointerdown', (e) => {
		if (e.button !== 0) return
		if (document.body.classList.contains('dragging')) return
		if (ui.phase === 'idle') return
		const pt = svgPoint(e)
		if (!canGrab(pt)) return
		e.preventDefault()
		ui.grabbing = true
		ui.wasPlaying = ui.playing && !ui.paused
		ui.paused = true
		ui.grabU = visualLeadU()
		svg.setPointerCapture(e.pointerId)
		document.body.classList.add('grabbing-food')
		document.body.classList.remove('can-grab')
		const near = closestUNear(pt, ui.grabU, 0.16)
		ui.grabU = near.u
		seekFromU(near.u)
		syncPause()
		paint()
	})
	svg.addEventListener('pointermove', (e) => {
		if (ui.grabbing) {
			const pt = svgPoint(e)
			const near = closestUNear(pt, ui.grabU, 0.16)
			ui.grabU = near.u
			seekFromU(near.u)
			paint()
			return
		}
		if (ui.phase === 'idle' || document.body.classList.contains('dragging')) {
			document.body.classList.remove('can-grab')
			return
		}
		document.body.classList.toggle('can-grab', canGrab(svgPoint(e)))
	})
	const endGrab = (e) => {
		if (!ui.grabbing) return
		ui.grabbing = false
		document.body.classList.remove('grabbing-food')
		if (ui.wasPlaying) ui.paused = false
		try { svg.releasePointerCapture(e.pointerId) } catch (err) {}
		syncPause()
		paint()
	}
	svg.addEventListener('pointerup', endGrab)
	svg.addEventListener('pointercancel', endGrab)
	svg.addEventListener('pointerleave', () => {
		if (!ui.grabbing) document.body.classList.remove('can-grab')
	})
	window.addEventListener('pointerup', endSeek)

	window.addEventListener('keydown', (e) => {
		if (e.code !== 'Space') return
		const tag = (e.target && e.target.tagName) || ''
		if (tag === 'INPUT' || tag === 'BUTTON' || tag === 'TEXTAREA') return
		e.preventDefault()
		togglePause()
	})

	audio.setMuted(ui.muted)
	syncPause()
	requestAnimationFrame(tick)
}

bind()
