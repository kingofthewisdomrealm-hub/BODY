let ctx
let muted = true

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

function noise(duration, gain = 0.08) {
	if (muted || !ctx) return
	const n = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate)
	const d = n.getChannelData(0)
	for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 1.4)
	const src = ctx.createBufferSource()
	src.buffer = n
	const g = ctx.createGain()
	g.gain.value = gain
	const f = ctx.createBiquadFilter()
	f.type = 'lowpass'
	f.frequency.value = 900
	src.connect(f).connect(g).connect(ctx.destination)
	src.start()
}

function chew(kind) {
	unlock()
	if (kind === 'liquid') {
		noise(0.12, 0.03)
		return
	}
	noise(kind === 'crunch' ? 0.09 : 0.16, kind === 'crunch' ? 0.12 : 0.07)
}

function swallow() {
	unlock()
	if (muted || !ctx) return
	const o = ctx.createOscillator()
	const g = ctx.createGain()
	o.type = 'sine'
	o.frequency.setValueAtTime(140, now())
	o.frequency.exponentialRampToValueAtTime(70, now() + 0.28)
	g.gain.setValueAtTime(0.06, now())
	g.gain.exponentialRampToValueAtTime(0.001, now() + 0.3)
	o.connect(g).connect(ctx.destination)
	o.start()
	o.stop(now() + 0.32)
	noise(0.2, 0.04)
}

function squish() {
	noise(0.4, 0.035)
}

function fizz() {
	noise(0.5, 0.05)
}

function fart(units) {
	unlock()
	if (muted || !ctx) return
	const o = ctx.createOscillator()
	const g = ctx.createGain()
	o.type = 'sawtooth'
	const t = now()
	o.frequency.setValueAtTime(90 + units * 8, t)
	o.frequency.exponentialRampToValueAtTime(42, t + 0.35)
	g.gain.setValueAtTime(0.04 + Math.min(0.08, units * 0.015), t)
	g.gain.exponentialRampToValueAtTime(0.001, t + 0.4)
	const f = ctx.createBiquadFilter()
	f.type = 'lowpass'
	f.frequency.value = 280
	o.connect(f).connect(g).connect(ctx.destination)
	o.start()
	o.stop(t + 0.42)
	noise(0.25, 0.03)
}

const audio = { setMuted, unlock, chew, swallow, squish, fizz, fart }
