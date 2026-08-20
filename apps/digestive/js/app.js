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
	farted: false
}

let meal = mix([...selected], { lactase: true })
let lastTick = 0
let chewAcc = 0
let pathEl
let pathLen = 1

const STAGE_ORGANS = {
	idle: [],
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

function renderTray() {
	const tray = $('#tray')
	tray.innerHTML = FOODS.map((f) => {
		const on = selected.has(f.id)
		return `<button class="food ${on ? 'on' : ''}" data-id="${f.id}" style="--c:${f.color}">
			<span class="swatch"></span>
			<b>${f.name}</b>
			<small>${f.serving}</small>
		</button>`
	}).join('')
	tray.querySelectorAll('.food').forEach((btn) => {
		btn.addEventListener('click', () => {
			const id = btn.dataset.id
			if (selected.has(id)) {
				if (selected.size === 1) return
				selected.delete(id)
			} else {
				if (selected.size >= 3) selected.delete([...selected][0])
				selected.add(id)
			}
			rebuildMeal()
			renderTray()
			if (ui.phase === 'idle') paint()
		})
	})
}

function rebuildMeal() {
	meal = mix([...selected], { lactase: ui.lactase })
	ui.farted = false
	$('#meal-label').textContent = meal.foods.map((f) => f.name).join(' + ')
}

function eat() {
	audio.unlock()
	audio.setMuted(ui.muted)
	ui.playing = true
	ui.phase = 'cephalic'
	ui.hours = 0
	ui.farted = false
	lastTick = performance.now()
	$('#eat').textContent = 'Eating…'
}

function tick(ts) {
	requestAnimationFrame(tick)
	const dt = Math.min(0.05, (ts - lastTick) / 1000)
	lastTick = ts
	if (!ui.playing) {
		paint()
		return
	}

	if (ui.phase === 'cephalic') {
		ui.hours += dt
		if (ui.hours > 2.2) {
			ui.phase = 'chew'
			ui.hours = 0
		}
	} else if (ui.phase === 'chew') {
		ui.hours += dt
		chewAcc += dt
		if (chewAcc > (meal.chew === 'liquid' ? 0.35 : 0.42)) {
			chewAcc = 0
			audio.chew(meal.chew)
		}
		const chewFor = meal.chew === 'liquid' ? 1.6 : meal.chew === 'dense' ? 5.4 : 4.2
		if (ui.hours > chewFor) {
			ui.phase = 'swallow'
			ui.hours = 0
			audio.swallow()
		}
	} else if (ui.phase === 'swallow') {
		ui.hours += dt
		if (ui.hours > 1.7) {
			ui.phase = 'gut'
			ui.hours = 0.01
			if (meal.carbonated) audio.fizz()
		}
	} else if (ui.phase === 'gut') {
		ui.hours += dt * ui.speed * (0.35 + ui.hours * 0.08)
		if (ui.hours > 48) {
			ui.hours = 48
			ui.playing = false
			$('#eat').textContent = 'Eat again'
		}
		if (Math.random() < dt * 0.08) audio.squish()
	}
	paint()
}

function paint() {
	const phase = ui.phase === 'gut' ? 'gut' : ui.phase === 'idle' ? 'cephalic' : ui.phase
	const state = ui.phase === 'idle'
		? stateAt(meal, 0, 'cephalic')
		: stateAt(meal, ui.hours, ui.phase === 'gut' ? 'gut' : ui.phase)

	document.body.dataset.view = ui.view
	document.body.dataset.phase = ui.phase
	document.body.dataset.stage = state.stage

	highlight(state.stage)
	drawParticles(state)
	drawClock(state)
	drawPanels(state)
	drawEpiglottis(ui.phase === 'swallow')
	drawJaw(ui.phase === 'chew')
}

function highlight(stage) {
	document.querySelectorAll('[data-organ]').forEach((el) => el.classList.remove('hot'))
	const ids = STAGE_ORGANS[stage] || STAGE_ORGANS.stomach
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
	const t = on ? Math.sin(performance.now() / 90) * 6 : 0
	jaw.setAttribute('transform', `translate(0 ${t})`)
}

function drawParticles(state) {
	const g = $('#bolus-cloud')
	if (!g || !pathEl) return
	g.innerHTML = ''
	if (ui.view === 'xray') {
		drawXrayGas(state)
		return
	}

	const n = 52
	const barium = ui.view === 'barium'
	for (let i = 0; i < n; i++) {
		const kind = particleKind(i)
		const u = particleU(state, i, kind)
		if (u < 0) continue
		const pt = pathEl.getPointAtLength(u * pathLen)
		const jitter = kind === 'fat' ? 7 : 4
		const x = pt.x + Math.sin(i * 1.7 + ui.hours) * jitter
		const y = pt.y + Math.cos(i * 1.3 + ui.hours * 0.8) * jitter
		const r = kind === 'fiber' ? 4.4 : kind === 'fat' ? 3.8 : 3.1
		const c = barium ? '#e8eef2' : particleColor(state, kind)
		const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
		circle.setAttribute('cx', x)
		circle.setAttribute('cy', y)
		circle.setAttribute('r', r)
		circle.setAttribute('fill', c)
		circle.setAttribute('opacity', barium ? 0.9 : kind === 'fiber' ? 0.75 : 0.88)
		g.appendChild(circle)
	}

	if (state.stage === 'colon' && state.gas >= 2 && ui.view === 'anatomy') {
		for (let i = 0; i < Math.min(12, Math.round(state.gas * 3)); i++) {
			const u = 0.72 + (i / 20) + (Math.sin(ui.hours + i) * 0.01)
			const pt = pathEl.getPointAtLength(u * pathLen)
			const bubble = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
			bubble.setAttribute('cx', pt.x + Math.sin(i + ui.hours * 2) * 6)
			bubble.setAttribute('cy', pt.y - 8 - (ui.hours % 2))
			bubble.setAttribute('r', 2 + (i % 3))
			bubble.setAttribute('fill', 'none')
			bubble.setAttribute('stroke', '#c9e4d4')
			bubble.setAttribute('stroke-width', '1')
			bubble.setAttribute('opacity', '0.7')
			g.appendChild(bubble)
		}
		if (state.fartNow && !ui.farted && !ui.muted) {
			ui.farted = true
			audio.fart(state.gas)
		}
	}
}

function drawXrayGas(state) {
	const g = $('#bolus-cloud')
	const spots = [
		[455, 350],
		[196, 620],
		[504, 620],
		[340, 436]
	]
	spots.forEach(([x, y], i) => {
		const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
		c.setAttribute('cx', x)
		c.setAttribute('cy', y)
		c.setAttribute('r', 10 + (i === 0 ? 8 : 4))
		c.setAttribute('fill', '#0a0a0a')
		c.setAttribute('opacity', '0.55')
		g.appendChild(c)
	})
	if (state.inColon > 0.2) {
		const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
		c.setAttribute('cx', 340)
		c.setAttribute('cy', 760)
		c.setAttribute('r', 28)
		c.setAttribute('fill', '#6a6a6a')
		c.setAttribute('opacity', '0.35')
		g.appendChild(c)
	}
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
	if (ui.phase === 'idle') return -1
	if (ui.phase === 'cephalic') return -1
	if (ui.phase === 'chew') return (i % 8) * 0.002
	if (ui.phase === 'swallow') return 0.02 + (i / 52) * 0.05
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
	return 0.62 + colU * 0.34
}

function particleColor(state, kind) {
	if (state.stage === 'colon' || state.stage === 'rectum') {
		if (kind === 'fiber') return '#6b4a32'
		return '#7a5a3a'
	}
	if (state.stage === 'stomach') return '#c4b08a'
	if (kind === 'fat') return '#e6d48a'
	if (kind === 'protein') return '#c98580'
	if (kind === 'fiber') return meal.color
	return meal.color
}

function drawClock(state) {
	const clock = $('#clock')
	const title = $('#seeing-title')
	const copy = $('#seeing-copy')
	if (ui.phase === 'idle') {
		clock.textContent = 'Pick food on the model. Then eat.'
		title.textContent = 'Ready to eat'
		copy.textContent = 'This is a living anterior torso. Liver sits on the patient’s right (your left). Stomach is the pink J under the left ribs. Small bowel fills the middle. Large bowel frames it in pouches (haustra).'
	} else if (ui.phase === 'cephalic') {
		clock.textContent = 'Before the bite'
		title.textContent = 'Cephalic phase'
		copy.textContent = 'Nothing has entered the tube yet. You are watching salivary glands and the stomach get a vagal head-start from sight and smell.'
	} else if (ui.phase === 'chew') {
		clock.textContent = 'In the mouth'
		title.textContent = 'Chewing'
		copy.textContent = 'Teeth and tongue are fracturing the bite. Watch particle size drop. Saliva wets it into a bolus. This is the last voluntary step.'
	} else if (ui.phase === 'swallow') {
		clock.textContent = 'Airway vs food'
		title.textContent = 'Swallow'
		copy.textContent = 'The pink flap (epiglottis) covers the dashed blue trachea. The bolus is squeezed down the esophagus. Gravity is optional.'
	} else {
		clock.textContent = formatHours(state.hours) + '  ·  ' + state.appearance
		title.textContent = labelStage(state.stage)
		copy.textContent = seeingCopy(state)
	}

	$('#pH').textContent = `pH ${state.pH}`
	$('#bristol-read').textContent = `Bristol ${state.bristol} — ${BRISTOL[state.bristol - 1]}`
}

function seeingCopy(state) {
	return {
		esophagus: 'The pink tube behind the trachea is stripping the bolus toward the cardia. The ring at the diaphragm is the lower esophageal sphincter.',
		stomach: 'The pale J under the left ribs is churning chyme. Fat stays higher and leaves slower. Only bits ≲ 2 mm should pass the pylorus.',
		duodenum: 'The C-loop around the tan pancreas. Green gallbladder is dumping bile. That cloudy mix is emulsified fat.',
		jejunum: 'Packed pink coils — this is most of the 10-foot living small bowel. Volume should fall as water and nutrients cross into blood and lymph.',
		ileum: 'Still coils. Residue, bile-salt recycling, B12 if intrinsic factor came from the stomach.',
		colon: 'The thicker peach frame. Those dents are haustra. Brown happens here. Bubbles mean leftover carb is being fermented.',
		rectum: 'The last vertical segment. Form follows the Bristol prior for this meal — a model, not your toilet.'
	}[state.stage] || 'Follow the highlighted organ. The side panel is naming the chemistry of what you are watching.'
}

function formatHours(h) {
	if (h < 1) return `${Math.round(h * 60)} min`
	const hr = Math.floor(h)
	const m = Math.round((h - hr) * 60)
	return `${hr} h ${m} m`
}

function labelStage(stage) {
	return {
		cephalic: 'cephalic',
		chew: 'mouth',
		swallow: 'pharynx',
		esophagus: 'esophagus',
		stomach: 'stomach',
		duodenum: 'duodenum',
		jejunum: 'jejunum',
		ileum: 'ileum',
		colon: 'colon',
		rectum: 'rectum'
	}[stage] || stage
}

function drawPanels(state) {
	$('#chem').innerHTML = state.chemistry.map((t) => `<li>${t}</li>`).join('')
	$('#phys').innerHTML = state.physics.map((t) => `<li>${t}</li>`).join('')
	$('#bio').innerHTML = state.biology.map((t) => `<li>${t}</li>`).join('')

	$('#systems').innerHTML = state.systems.map((s) =>
		`<div class="sys ${s.dir}"><i>${s.id}</i><span>${s.dir === 'in' ? 'import' : s.dir === 'out' ? 'export' : 'both'}</span><p>${s.text}</p></div>`
	).join('')

	const proofs = proofsFor(state.proofIds)
	$('#proof').innerHTML = proofs.map((p) => `
		<article class="proof ${p.grade}">
			<div class="pg">${gradeLabel(p.grade)}</div>
			<h3>${p.claim}</h3>
			<p class="exp"><b>Experiment.</b> ${p.experiment}</p>
			<a href="${p.href}" target="_blank" rel="noreferrer">${p.cite}</a>
		</article>
	`).join('')

	const macros = meal.macros
	$('#macros').innerHTML = [
		['carb', macros.carb],
		['protein', macros.protein],
		['fat', macros.fat],
		['fiber', macros.fiber],
		['water', macros.water]
	].map(([k, v]) => `<span><b>${v.toFixed(0)} g</b> ${k}</span>`).join('')

	$('#ingredients').innerHTML = meal.ingredients.map((ing) => `<li>${ing.name}</li>`).join('')

	document.querySelectorAll('.who button').forEach((b) => {
		const eating = ['cephalic', 'chew', 'swallow'].includes(ui.phase) || ui.phase === 'idle'
		b.classList.toggle('on', eating)
	})

	if (ui.everyDay) {
		$('#long').hidden = false
		$('#long').innerHTML = longTerm(meal)
	} else {
		$('#long').hidden = true
	}
}

function gradeLabel(g) {
	return {
		robust: '✓ robust',
		range: '~ range',
		contested: '⚠ contested',
		model: '◈ model'
	}[g] || g
}

function longTerm(m) {
	const bits = []
	if (m.flags.has('upf') || m.macros.addedSugar > 10) {
		bits.push('<p><b>Pattern only.</b> Repeated added-sugar / highly processed meals associate with worse cardiometabolic outcomes in umbrella reviews (Lane et al., BMJ 2024). One slice does not do that.</p>')
	}
	if (m.fiber.insoluble + m.fiber.soluble >= 4) {
		bits.push('<p>A fiber-rich pattern supports fecal bulk and shorter transit in healthy-adult trials (USDA/NLM fiber–laxation review).</p>')
	}
	if (m.flags.has('meat') && m.macros.protein > 30) {
		bits.push('<p>Red meat as a <i>pattern</i> has colorectal epidemiology. This steak is protein + fat chemistry, not a tumor.</p>')
	}
	if (!bits.length) bits.push('<p>No strong pattern flag on this plate. Long-term is diet, not a bite.</p>')
	return bits.join('')
}

function bind() {
	renderTray()
	rebuildMeal()
	pathEl = $('#gut-path')
	pathLen = pathEl.getTotalLength()

	$('#eat').addEventListener('click', eat)
	$('#pause').addEventListener('click', () => {
		ui.playing = !ui.playing
		$('#pause').textContent = ui.playing ? 'Pause' : 'Resume'
	})
	$('#speed').addEventListener('input', (e) => {
		ui.speed = Number(e.target.value)
		$('#speed-read').textContent = `${ui.speed.toFixed(1)}× after the swallow`
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
