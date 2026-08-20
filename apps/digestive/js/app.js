const selected = new Set(['white-rice'])
const ui = {
	lactase: true,
	muted: true,
	view: 'anatomy',
	everyDay: false,
	playing: false,
	phase: 'idle',
	hours: 0,
	speed: 1,
	farted: false,
	pooped: false,
	lastSay: '',
	log: [],
	sparks: [],
	chewFor: 4
}

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
	chew: ['mouth', 'parotid', 'teeth'],
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

function say(title, text) {
	if (ui.lastSay === title) return
	ui.lastSay = title
	ui.log.unshift({ title, text })
	ui.log = ui.log.slice(0, 10)
}

function renderTray() {
	const tray = $('#tray')
	tray.innerHTML = '<h2>Plate · drag to mouth</h2>' + FOODS.map((f) => {
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
			selected.clear()
			selected.add(id)
			rebuildMeal()
			renderTray()
			if (ui.phase === 'idle') paint()
		})
		btn.addEventListener('dragstart', (e) => {
			e.dataTransfer.setData('text/plain', id)
			e.dataTransfer.effectAllowed = 'copy'
			document.body.classList.add('dragging')
		})
		btn.addEventListener('dragend', () => document.body.classList.remove('dragging'))
	})
}

function rebuildMeal() {
	meal = mix([...selected], { lactase: ui.lactase })
	ui.farted = false
	ui.pooped = false
	const label = $('#meal-label')
	if (label) label.textContent = meal.foods.map((f) => f.name).join(' + ')
}

function startEating(id) {
	if (id) {
		selected.clear()
		selected.add(id)
		renderTray()
	}
	rebuildMeal()
	ui.log = []
	ui.sparks = []
	ui.lastSay = ''
	ui.playing = true
	ui.phase = 'chew'
	ui.hours = 0
	ui.farted = false
	ui.pooped = false
	ui.chewFor = meal.chew === 'liquid' ? 1.4 : meal.chew === 'dense' ? 5.2 : 3.8
	lastTick = performance.now()
	audio.unlock()
	audio.setMuted(ui.muted)
	say('In the mouth', `${meal.foods[0].name} hits the teeth. ${meal.chew === 'liquid' ? 'Almost no chewing — it is already a swallowable bolus.' : 'Watch it fracture, wet with saliva, and turn to mush.'}`)
	$('#eat').textContent = 'Eating…'
}

function eat() {
	startEating()
}

function svgPoint(evt) {
	const svg = $('.body')
	const pt = svg.createSVGPoint()
	pt.x = evt.clientX
	pt.y = evt.clientY
	return pt.matrixTransform(svg.getScreenCTM().inverse())
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
	ui.sparks = ui.sparks.filter((s) => {
		s.life -= dt
		s.x += (s.tx - s.x) * dt * 2.2
		s.y += (s.ty - s.y) * dt * 2.2
		return s.life > 0
	})
	if (!ui.playing) {
		paint()
		return
	}

	if (ui.phase === 'chew') {
		ui.hours += dt
		chewAcc += dt
		if (chewAcc > (meal.chew === 'liquid' ? 0.35 : 0.42)) {
			chewAcc = 0
			audio.chew(meal.chew)
		}
		if (ui.hours > ui.chewFor * 0.45) say('Mush', 'Saliva and crushing have turned recognizable food into a wet bolus. Particle size is collapsing.')
		if (ui.hours > ui.chewFor) {
			ui.phase = 'swallow'
			ui.hours = 0
			audio.swallow()
			say('Swallow', 'Epiglottis covers the airway. A peristaltic stripping wave pushes the bolus down the esophagus. Gravity is optional.')
		}
	} else if (ui.phase === 'swallow') {
		ui.hours += dt
		if (ui.hours > 1.7) {
			ui.phase = 'gut'
			ui.hours = 0.01
			if (meal.carbonated) audio.fizz()
			say('Stomach', `Acid. pH ~2. ${meal.macros.protein > 1 ? 'Pepsin is cutting protein.' : ''} ${meal.macros.fat > 2 ? 'Fat is delaying emptying.' : ''} Only bits ≲ 2 mm leave the pylorus.`)
		}
	} else if (ui.phase === 'gut') {
		ui.hours += dt * ui.speed * (0.4 + ui.hours * 0.09)
		if (ui.hours > 48) {
			ui.hours = 48
			ui.playing = false
			$('#eat').textContent = 'Eat again'
		}
		if (Math.random() < dt * 0.08) audio.squish()
		const state = stateAt(meal, ui.hours, 'gut')
		if (state.stage === 'duodenum') say('Bile and enzymes', 'Gallbladder squeeze. Bile emulsifies fat. Pancreatic juice raises pH so amylase, lipase, and proteases can work.')
		if (state.stage === 'jejunum') say('Absorption', 'The coils are the border. Sugars and amino acids take the portal vein to the liver. Fat takes cream-colored lacteals into lymph. The food you see is shrinking because it is leaving the tube.')
		if (state.stage === 'colon') say('Colon', 'Leftover fiber and water. Microbes ferment what the small bowel missed. Color turns brown from stercobilin. This is where poop is made.')
		if (state.stage === 'rectum' && !ui.pooped) {
			ui.pooped = true
			say('Poop', `Bristol type ${state.bristol} — ${BRISTOL[state.bristol - 1]}. A typical-adult model of this meal, not your lab result.`)
		}
		if (state.fartNow && !ui.farted) {
			ui.farted = true
			if (!ui.muted) audio.fart(state.gas)
			say('Gas', 'Colonic bacteria ate leftover carbohydrate and made hydrogen, carbon dioxide, and maybe methane.')
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
	drawNarration(state)
	drawEpiglottis(ui.phase === 'swallow')
	drawJaw(ui.phase === 'chew')
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
	const t = on ? Math.sin(performance.now() / 90) * 5 : 0
	jaw.setAttribute('transform', `translate(0 ${t})`)
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

	ui.sparks.forEach((s) => {
		g.appendChild(svgEl('circle', {
			cx: s.x, cy: s.y, r: 2.2,
			fill: s.kind === 'fat' ? '#e6d48a' : '#d46a5a',
			opacity: String(Math.max(0.15, s.life))
		}))
	})
}

function drawChew(g) {
	const p = Math.min(1, ui.hours / ui.chewFor)
	const mush = lerpColor(meal.color, '#d4c4a8', Math.min(1, p * 1.3))
	if (meal.chew === 'liquid' || p > 0.78) {
		const r = 16 - p * 6
		g.appendChild(blob(MOUTH.x, MOUTH.y + p * 4, r, mush, 0.95))
		return
	}
	const n = p < 0.22 ? 1 : 8
	for (let i = 0; i < n; i++) {
		const ang = (i / 8) * Math.PI * 2 + ui.hours * 3
		const spread = p < 0.22 ? 0 : 10 + p * 8
		const x = MOUTH.x + Math.cos(ang) * spread
		const y = MOUTH.y + Math.sin(ang) * (spread * 0.45) + Math.sin(performance.now() / 90) * 3
		const r = (14 - p * 9) * (n === 1 ? 1 : 0.55)
		g.appendChild(blob(x, y, r, mush, 0.92))
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
	let absorbed = 0
	for (let i = 0; i < n; i++) {
		const kind = particleKind(i)
		const u = particleU(state, i, kind)
		if (u < 0) continue
		const pt = pathEl.getPointAtLength(Math.min(0.995, u) * pathLen)
		const inSi = state.stage === 'jejunum' || state.stage === 'ileum' || state.stage === 'duodenum'
		const absorb = inSi && kind !== 'fiber' ? Math.min(0.85, state.hours / 8) : 0
		if (absorb > 0.15 && Math.random() < 0.04) {
			ui.sparks.push({
				x: pt.x, y: pt.y,
				tx: kind === 'fat' ? THORACIC.x : LIVER.x,
				ty: kind === 'fat' ? THORACIC.y : LIVER.y,
				life: 1.1,
				kind
			})
			absorbed += 1
		}
		if (absorb > 0.7 && kind !== 'fiber') continue
		const churn = state.stage === 'stomach' ? 11 : 5
		const x = pt.x + Math.sin(i * 1.7 + ui.hours) * churn
		const y = pt.y + Math.cos(i * 1.3 + ui.hours * 0.8) * (churn * 0.7)
		const mushR = state.stage === 'stomach' ? 5.5 : 3.4
		const r = kind === 'fiber' ? mushR + 0.8 : mushR * (1 - absorb * 0.7)
		const c = barium ? '#e8eef2' : particleColor(state, kind)
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
	const c = '#6b4a32'
	if (type <= 2) {
		for (let i = 0; i < 5; i++) g.appendChild(blob(x + (i - 2) * 7, y + (i % 2) * 6, 5, c, 0.95))
	} else if (type <= 4) {
		g.appendChild(svgEl('path', {
			d: `M ${x - 7} ${y} C ${x - 8} ${y + 28}, ${x + 8} ${y + 28}, ${x + 7} ${y} Z`,
			fill: c
		}))
	} else if (type === 5) {
		g.appendChild(blob(x - 8, y, 7, c, 0.9))
		g.appendChild(blob(x + 6, y + 8, 6, c, 0.9))
	} else {
		g.appendChild(blob(x, y + 6, 12, '#7a5a3a', 0.7))
	}
}

function blob(x, y, r, fill, opacity) {
	return svgEl('circle', { cx: x, cy: y, r, fill, opacity: String(opacity) })
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

function particleColor(state, kind) {
	if (state.stage === 'colon' || state.stage === 'rectum') return '#6b4a32'
	if (state.stage === 'stomach') return lerpColor(meal.color, '#c4b08a', 0.75)
	if (kind === 'fat') return '#e6d48a'
	if (kind === 'protein') return '#c98580'
	if (kind === 'fiber') return meal.color
	return lerpColor(meal.color, '#d2c2a6', 0.4)
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

function drawNarration(state) {
	const title = $('#seeing-title')
	const copy = $('#seeing-copy')
	const clock = $('#clock')
	if (ui.phase === 'idle') {
		title.textContent = 'Drop food on the mouth'
		copy.textContent = 'Grab something from the plate and drop it on the lips. Chew becomes mush, mush becomes chyme, nutrients leave the tube, leftover becomes poop.'
		clock.textContent = 'Drag a food onto the mouth'
	} else if (ui.phase === 'chew') {
		const mush = ui.hours > ui.chewFor * 0.45
		title.textContent = mush ? 'Turning to mush' : 'Chewing'
		copy.textContent = mush
			? 'You are watching recognizable food lose its shape. Saliva + crushing = bolus.'
			: `${meal.foods[0].name} is between the teeth. Six systems are eating. The gut is only receiving.`
		clock.textContent = 'Mouth'
	} else if (ui.phase === 'swallow') {
		title.textContent = 'Swallowing'
		copy.textContent = 'One wet bolus. Epiglottis vs trachea. Then the esophagus takes over.'
		clock.textContent = 'Pharynx → esophagus'
	} else {
		title.textContent = labelStage(state.stage)
		copy.textContent = seeingCopy(state)
		clock.textContent = formatHours(state.hours) + '  ·  ' + state.appearance
	}
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

function seeingCopy(state) {
	return {
		esophagus: 'The mush is a single bolus riding a stripping wave toward the stomach.',
		stomach: 'That pale J is turning bolus into chyme — an acidic slurry. Fat lags. Liquids leave first.',
		duodenum: 'Bile (green gallbladder) + pancreatic juice. Fat turns cloudy. This is where the meal is chemically taken apart.',
		jejunum: 'Watch bits vanish. That is absorption: red sparks to the liver (portal), cream sparks up (lymph / fat). Fiber stays.',
		ileum: 'Residue and B12. Most of the useful meal has already crossed into you.',
		colon: 'Drying, fermenting, browning. Leftover carbohydrate becomes gas. This is poop being assembled.',
		rectum: 'Outgoing. The shape is the Bristol model for this meal’s fiber, fat, and leftover sugar.'
	}[state.stage] || 'Follow the food in the model. This column only names it.'
}

function formatHours(h) {
	if (h < 1) return `${Math.round(h * 60)} min`
	return `${Math.floor(h)} h ${Math.round((h % 1) * 60)} m`
}

function labelStage(stage) {
	return {
		chew: 'mouth',
		swallow: 'swallow',
		esophagus: 'esophagus',
		stomach: 'stomach',
		duodenum: 'duodenum',
		jejunum: 'absorbing',
		ileum: 'ileum',
		colon: 'colon',
		rectum: 'poop'
	}[stage] || stage
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
	$('#pause').addEventListener('click', () => {
		ui.playing = !ui.playing
		$('#pause').textContent = ui.playing ? 'Pause' : 'Resume'
	})
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
	$('#scrub').addEventListener('input', (e) => {
		ui.phase = 'gut'
		ui.playing = false
		ui.hours = Number(e.target.value)
		$('#eat').textContent = 'Eat again'
		paint()
	})

	requestAnimationFrame(tick)
}

bind()
