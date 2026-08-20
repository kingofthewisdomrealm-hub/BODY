let ctx
let muted = false

function setMuted(value) {
	muted = value
	if (!muted) unlock()
}

function unlock() {
	if (!ctx) ctx = new AudioContext()
	if (ctx.state === 'suspended') ctx.resume()
}

function now() {
	return ctx ? ctx.currentTime : 0
}

function makeNoise(duration, color = 'white') {
	const n = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * duration)), ctx.sampleRate)
	const d = n.getChannelData(0)
	let last = 0
	for (let i = 0; i < d.length; i++) {
		const white = Math.random() * 2 - 1
		if (color === 'brown') {
			last = (last + 0.02 * white) / 1.02
			d[i] = last * 4.2
		} else if (color === 'pink') {
			last = last * 0.86 + white * 0.14
			d[i] = last * 2.4
		} else {
			d[i] = white
		}
		d[i] *= Math.pow(1 - i / d.length, 1.15)
	}
	const src = ctx.createBufferSource()
	src.buffer = n
	return src
}

function noise(duration, gain = 0.08, opts = {}) {
	if (muted || !ctx) return
	const src = makeNoise(duration, opts.color || 'white')
	const g = ctx.createGain()
	g.gain.value = gain
	const f = ctx.createBiquadFilter()
	f.type = opts.type || 'lowpass'
	f.frequency.value = opts.freq || 900
	f.Q.value = opts.q || 0.7
	src.connect(f).connect(g).connect(ctx.destination)
	src.start()
}

function tone(type, freq, dur, gain, slideTo) {
	if (muted || !ctx) return
	const o = ctx.createOscillator()
	const g = ctx.createGain()
	const f = ctx.createBiquadFilter()
	o.type = type
	const t = now()
	o.frequency.setValueAtTime(freq, t)
	if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), t + dur)
	g.gain.setValueAtTime(0.0001, t)
	g.gain.exponentialRampToValueAtTime(gain, t + 0.018)
	g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
	f.type = 'lowpass'
	f.frequency.value = Math.max(180, freq * 3)
	o.connect(f).connect(g).connect(ctx.destination)
	o.start(t)
	o.stop(t + dur + 0.02)
}

function click(freq, dur, gain) {
	tone('triangle', freq, dur, gain, freq * 0.45)
}

function chew(kind) {
	unlock()
	if (muted || !ctx) return
	if (kind === 'liquid') {
		noise(0.18, 0.045, { color: 'pink', freq: 1400, type: 'bandpass', q: 0.6 })
		tone('sine', 220, 0.12, 0.03, 90)
		return
	}
	if (kind === 'crunch') {
		noise(0.07, 0.16, { color: 'white', freq: 4200, type: 'highpass' })
		noise(0.11, 0.07, { color: 'pink', freq: 900 })
		click(380 + Math.random() * 120, 0.05, 0.05)
		click(190, 0.08, 0.03)
		return
	}
	if (kind === 'dense') {
		noise(0.22, 0.1, { color: 'brown', freq: 420 })
		noise(0.09, 0.06, { color: 'white', freq: 1800, type: 'bandpass', q: 1.4 })
		click(140, 0.07, 0.045)
		return
	}
	noise(0.16, 0.09, { color: 'pink', freq: 700 })
	noise(0.08, 0.05, { color: 'white', freq: 2400, type: 'bandpass', q: 0.9 })
}

function swallow() {
	unlock()
	if (muted || !ctx) return
	noise(0.12, 0.06, { color: 'pink', freq: 500 })
	tone('sine', 160, 0.34, 0.07, 58)
	setTimeout(() => {
		noise(0.28, 0.055, { color: 'brown', freq: 280 })
		tone('triangle', 90, 0.22, 0.04, 40)
	}, 180)
}

function slurp() {
	unlock()
	noise(0.2, 0.05, { color: 'pink', freq: 1600, type: 'bandpass', q: 0.8 })
}

function squish() {
	unlock()
	noise(0.38, 0.07, { color: 'brown', freq: 240 })
	noise(0.16, 0.045, { color: 'pink', freq: 620, type: 'bandpass', q: 1.1 })
}

function fizz() {
	unlock()
	noise(0.7, 0.07, { color: 'white', freq: 5000, type: 'highpass' })
	noise(0.4, 0.03, { color: 'pink', freq: 900 })
}

function acid() {
	unlock()
	if (muted || !ctx) return
	noise(0.9, 0.06, { color: 'brown', freq: 160 })
	tone('sine', 48, 0.7, 0.035, 32)
	for (let i = 0; i < 4; i++) {
		const t = now() + i * 0.12 + Math.random() * 0.08
		const o = ctx.createOscillator()
		const g = ctx.createGain()
		o.type = 'sine'
		o.frequency.value = 90 + Math.random() * 70
		g.gain.setValueAtTime(0.0001, t)
		g.gain.exponentialRampToValueAtTime(0.025, t + 0.02)
		g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09)
		o.connect(g).connect(ctx.destination)
		o.start(t)
		o.stop(t + 0.1)
	}
}

function gurgle() {
	unlock()
	if (muted || !ctx) return
	noise(0.55, 0.08, { color: 'brown', freq: 180 })
	tone('sawtooth', 70 + Math.random() * 40, 0.45, 0.03, 36)
	noise(0.2, 0.04, { color: 'pink', freq: 400, type: 'bandpass', q: 2 })
}

function bile() {
	unlock()
	noise(0.14, 0.06, { color: 'white', freq: 2200, type: 'bandpass', q: 0.7 })
	tone('sine', 310, 0.18, 0.04, 120)
	noise(0.22, 0.04, { color: 'pink', freq: 700 })
}

function bubble() {
	unlock()
	if (muted || !ctx) return
	const t = now()
	const o = ctx.createOscillator()
	const g = ctx.createGain()
	o.type = 'sine'
	o.frequency.setValueAtTime(140 + Math.random() * 90, t)
	o.frequency.exponentialRampToValueAtTime(60, t + 0.12)
	g.gain.setValueAtTime(0.03, t)
	g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14)
	o.connect(g).connect(ctx.destination)
	o.start(t)
	o.stop(t + 0.15)
	noise(0.12, 0.03, { color: 'pink', freq: 800 })
}

function fart(units) {
	unlock()
	if (muted || !ctx) return
	const t = now()
	const wet = 0.55 + Math.min(0.7, units * 0.12)
	const o = ctx.createOscillator()
	const g = ctx.createGain()
	o.type = 'sawtooth'
	o.frequency.setValueAtTime(78 + units * 10, t)
	o.frequency.exponentialRampToValueAtTime(28, t + wet)
	g.gain.setValueAtTime(0.07 + Math.min(0.1, units * 0.02), t)
	g.gain.exponentialRampToValueAtTime(0.0001, t + wet + 0.05)
	const f = ctx.createBiquadFilter()
	f.type = 'lowpass'
	f.frequency.value = 220
	o.connect(f).connect(g).connect(ctx.destination)
	o.start(t)
	o.stop(t + wet + 0.08)
	noise(wet, 0.09, { color: 'brown', freq: 190 })
	noise(0.2, 0.05, { color: 'pink', freq: 500, type: 'bandpass', q: 1.6 })
}

function plop() {
	unlock()
	if (muted || !ctx) return
	tone('sine', 72, 0.22, 0.09, 34)
	noise(0.28, 0.08, { color: 'brown', freq: 160 })
	noise(0.12, 0.05, { color: 'pink', freq: 700 })
	setTimeout(() => tone('triangle', 48, 0.18, 0.04, 28), 90)
}

const audio = {
	setMuted,
	unlock,
	chew,
	swallow,
	slurp,
	squish,
	fizz,
	acid,
	gurgle,
	bile,
	bubble,
	fart,
	plop
}
