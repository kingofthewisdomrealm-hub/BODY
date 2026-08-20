# BODY — Endocrine system build plan

**Goal:** the most visual working model of human hormones that still tells the truth.

Not glowing glands shooting cartoon arrows. A scatter of tiny organs in real places, blood that is a courier not a light show, feedback loops that actually close, imaging modes that match what radiology and the lab actually show, and an input engine that can say *what happens if you eat this, skip sleep, stand in bright light, or stack coffee on a stressful morning*.

This is the plan for the endocrine HTML app. Same shell language as digestive.

---

## 1. What “accurate” means here

Three views of the same event. The user can switch instantly.

| Mode | What it shows | What it must not fake |
|---|---|---|
| **Anatomy** | See-through body. Glands at living size and location. Blood as a dim courier. Target organs lighting only where receptors exist. | Grapefruit pituitaries. Neck thyroids the size of a fist. Hormones as visible glowing arrows filling the torso. |
| **Imaging** | What a radiologist or nuclear-medicine tech actually sees: plain film, thyroid ultrasound, pituitary MRI, adrenal CT, radioiodine uptake. | A hormone molecule on an x-ray. Glands that “light up” on plain film. |
| **Chemistry** | Axes, pulses, blood concentrations, half-lives, receptor binding, negative feedback. | One magic “balance” sparkle. Instant thyroid change after one meal. |

The killer honesty: **if you x-ray a person, you do not see hormones.** You see bone, gas, and soft-tissue gray. The pituitary is a pea in a bony saddle. The thyroid is a thin butterfly that is only obvious when it is calcified, iodinated, or scanned with ultrasound / radiotracer. The real picture of endocrine function is a **timed blood panel**, not a radiograph. The app teaches that, then offers honest modality modes so the glands *do* appear the way imaging actually shows them.

Sources for that claim: Cleveland Clinic endocrine overview; RadiologyInfo thyroid scan and uptake; RSNA thyroid imaging review; OpenStax A&P 17 (gland size and location).

---

## 2. Product: one HTML app

Single page, no login, GitHub Pages, same contract as digestive.

```
apps/endocrine/index.html     ← the app
apps/endocrine/css/
apps/endocrine/js/
  anatomy.js                  ← gland layout + vessel courier
  imaging.js                  ← plain film / US / MRI / CT / nuclear
  molecules.js                ← hormone particles at honest scale-as-metaphor
  axes.js                     ← HPA, HPT, HPG, glucose, calcium, RAAS
  input-engine.js             ← food, light, sleep, stress, movement
  audio.js                    ← pulse sonification, SAM heart-rate, mute-first
  ui.js
data/inputs.json              ← meals, drinks, light, sleep, stress, movement
data/glands.json              ← size, place, secretions, half-lives
data/hormones.json            ← class, axis, targets, feedback
```

Hub later: `index.html` body map with digestive and endocrine both live.

---

## 3. Visual architecture

### 3.1 Body layout (must be anatomically placed)

Reference adult, standing, anterior view, with a rotate-to-sagittal control (pituitary and pineal are midline and disappear in a pure AP cartoon). Sex toggle changes gonads and some axis set-points. Default androgynous silhouette with optional male / female gonad pack.

| Structure | Placement rule |
|---|---|
| Hypothalamus | Deep midline brain, below the thalamus. Not a separate “gland balloon.” Command center that is neural *and* endocrine. |
| Pituitary | **Pea-sized**, in the sella turcica of the sphenoid, hanging on the infundibulum. Anterior (glandular) vs posterior (nerve terminals). Portal veins to the anterior lobe — no systemic detour. |
| Pineal | Midline, deep, under the back of the corpus callosum. Tiny. Often calcifies in adults — one of the few endocrine structures that can show on a plain skull film. |
| Thyroid | Butterfly on the **front of the trachea**, just below the larynx. Isthmus + two lobes. Not a necklace. |
| Parathyroids | Four peas **behind** the thyroid. Sometimes ectopic (along esophagus or in chest) — inspector can show the variant, default is four posterior. |
| Thymus | Upper chest, more relevant in childhood. Adult: involuted remnant, labeled as such. Do not draw a huge childhood thymus on a default adult. |
| Adrenals | **Triangles on top of each kidney**, not floating in the mid-abdomen. Cortex (three zones) vs medulla (neural). Rich blood flow. |
| Pancreas | Retroperitoneal, head in the duodenal C-loop, tail toward the spleen. Endocrine mass is the **islets** (~1–2% of the organ). Zoom must show islets, not paint the whole pancreas as “the insulin gland.” |
| Ovaries / testes | Pelvis / scrotum. Dual job: gametes + sex steroids. Off unless the sex pack is on. |
| Adipose | Distributed: subcutaneous, visceral, marrow. Leptin / adiponectin source. Not a single organ blob. |
| Diffuse extras | Gut (incretins, gastrin, ghrelin, PYY), kidney (renin, EPO), heart (ANP/BNP), liver (IGF-1, angiotensinogen), skin+liver+kidney (vitamin D → calcitriol), placenta (pregnancy pack, off by default). |

Scale rule the UI must say out loud: the pituitary is ~0.5 g. The thyroid is ~15–20 g in an adult. Hormones work at **picomolar to nanomolar** blood levels. The overview cannot draw them as visible pellets without labeling the drawing as a metaphor.

### 3.2 What a hormone *looks like* at each station

This is the visual differentiator. The particle is not a glowing arrow the whole way.

| Station | Appearance | Physics |
|---|---|---|
| Synthesis | Peptide: ribosome → vesicle. Steroid: cholesterol → lipid droplet → smooth ER. Amine: tyrosine or tryptophan on the bench. | Class color: peptide / protein, steroid, amine. |
| Release | Exocytosis into capillary (peptides, catecholamines) or diffusion (steroids, thyroid). Posterior pituitary: stored vesicles dumped from nerve endings. | Pulses, not a garden hose. GH and GnRH are pulsatile. Insulin has a first phase (minutes) then a second. |
| Blood | Water-soluble hormones ride free or loosely. Steroids and thyroid ride **binding proteins**; <1% of T3/T4 is free and active. | Bound fraction is a dim halo. Free fraction is the one that can dock. |
| Target | Only cells with receptors light. Same hormone, different tissue, different job (oxytocin: uterus vs breast vs brain). | No receptor = the particle passes through like it was never there. |
| Second messenger | Membrane receptors: cAMP or Ca²⁺/IP3 cascade. Intracellular receptors: DNA transcription. | Zoom 5. Catecholamines in seconds. Cortisol and thyroid in minutes to hours. |
| Clearance | Half-life on the ticker. Epinephrine ~1 min. Cortisol ~60–90 min. Thyroid much longer because of binding proteins. | Concentration falls. Feedback closes. |

Critical physics that cartoons get wrong, and we will not:

1. **Hormones are not aimed.** They bathe the whole blood volume. Specificity is the receptor, not a magic flight path. ✗ cartoon arrows as truth
2. **Most of the signal is invisible.** A milliliter of blood does not contain a visible cloud of T4. The chemistry mode is a labeled metaphor.
3. **Feedback is the plot.** High T3/T4 turns down TRH and TSH. High cortisol turns down CRH and ACTH. Insulin and glucagon oppose. Without the loop closing, it is a cartoon fountain.
4. **Timing is not one speed.** SAM catecholamines in seconds. Insulin in minutes. Cortisol over tens of minutes. Thyroid set-point over days. Reproductive axes over weeks. ✗ one “hormone whoosh”

### 3.3 Imaging mode (the x-ray promise)

Four sub-modes, plus the lab strip that is the real clinical picture.

**A. Plain radiograph**
- Bones white, gas black, soft tissue gray.
- Adult pineal may show as a midline calcified speck on a skull film.
- Thyroid, pituitary, adrenals, islets: **not drawn as organs the meal-eater can see.**
- Caption: this is why endocrinology is blood tests and dedicated scans, not a KUB.

**B. Dedicated imaging (this is what people *mean* by “see the gland”)**
- Thyroid **ultrasound**: superficial, hyperechoic vs muscle, size measurable. Default first look for nodules.
- Pituitary **MRI**: sella, stalk, posterior-pituitary T1 bright spot (vasopressin store). CT only if MRI is off-limits.
- Adrenal **CT / MRI**: triangles on the kidneys. Incidentalomas are a real radiology story — most are silent adenomas; function is a lab question, not a pixel question.
- Thyroid **uptake and scan**: radioiodine or Tc-99m. Hot vs cold regions. Function, not a grocery-store x-ray.

**C. Lab panel / “chemical imaging”**
- The honest endocrine image: timed concentrations. Glucose, insulin, C-peptide (later), TSH, free T4, cortisol (AM), ACTH, PTH, calcium, sodium/potassium.
- Clock on the strip. Cortisol at midnight ≠ cortisol at 08:00. TSH and T4 are a pair, never TSH alone as a cartoon.

**D. Cutaway / “if tissue were glass”**
- Educational, labeled as such. Beauty shot: portal system, follicle colloid with iodine, adrenal zones, islet alpha/beta, receptor lock.
- Cross-section of an adrenal: glomerulosa (aldosterone) → fasciculata (cortisol) → reticularis (androgens) → medulla (catecholamines).

Toggle: **live / paused / scrub timeline**. Default compression so a 24 h endocrine day plays in ~90 seconds, with a “real-time meal” slow-mo for the first 15 minutes after swallowing carbs.

### 3.4 Zoom stages

1. Whole body (gland map)
2. Gland (e.g. pituitary in the sella, thyroid on the trachea)
3. Histology (follicle + colloid; islet; adrenal zones; portal capillaries)
4. Cell (beta cell vesicle; follicle iodination; chromaffin cell)
5. Molecule (insulin docking GLUT4 vesicles; steroid-receptor DNA; cAMP cascade)

Each zoom is a real scene, not a popup paragraph.

---

## 4. Simulation engine

A clock plus hormone pools plus axis graphs plus an input tape.

```
clock            real seconds → sim minutes (user-set speed)
pools            {hormoneId, amount, boundFrac, halfLifeMin}
axes             HPA, HPT, HPG, GH/IGF-1, glucose, Ca/PTH, RAAS, pineal
inputs[]         {id, kind, t, payload}   meal | light | sleep | stress | move | chemical
targets[]        tissues with receptor sets
state            glucose, Ca2+, Na+, K+, osmolarity, coreTemp, glycogen, FFA
```

### 4.1 Time bands (healthy adult)

Show a **band**, never a single stopwatch. ~ Range

| Event | Typical band | Notes |
|---|---|---|
| Swallow → first insulin bump | minutes | Incretins (GIP, GLP-1) fire when food is still in the gut, before the full glucose wave. |
| Glucose peak after mixed meal | ~30–60 min | Refined starch/sugar faster and higher. Fiber / fat / protein blunt and delay. |
| Insulin back toward baseline | ~2–4 h | Meal size and GI. |
| SAM epinephrine | seconds to ~1–2 min | Neural. Half-life ~1 min. |
| Cortisol awakening response | peak ~30–45 min after waking | Then falls across the day. Nadir around midnight. |
| Melatonin rise | evening, darkness | Acute bright light at night cuts it. |
| GH | pulses; largest near sleep onset | Sleep-linked more than clock-linked. |
| Thyroid set-point | days | T4 store in colloid. One sushi roll does not re-time BMR. |
| Menstrual / sperm axis | weeks | HPG is a slow plot. V1 can show a simplified 28-day band or a male tonic pulse. |

Modifiers, all ◈ Model unless cited:

- Carbohydrate load → insulin up, glucagon down
- Protein → insulin + glucagon (liver stays allowed to make glucose)
- Fasting / long gap → glucagon, falling insulin, later GH / cortisol / FFA
- Acute psychological stress or sprint → SAM catecholamines now; HPA cortisol on a slower rise
- Caffeine → modest catecholamine / cortisol nudge (qualitative)
- Alcohol → ADH suppression (more urine), sleep architecture mess, next-day HPA noise
- Bright night light → melatonin suppression
- Sleep cut short → next-day insulin resistance trend, ghrelin/leptin shift ⚠ magnitude is individual
- Resistance / hard interval training → GH pulse, catecholamines, later insulin sensitivity
- Iodine in food → thyroid synthesis substrate; iodine deficiency is rare in the iodized-salt US, common historically and in some regions ✓

### 4.2 Chemical stations (must fire in the right order)

The endocrine “tract” is not a tube. It is **axes**. Each axis is a station that must not be skipped.

| Axis | Chain | What happens |
|---|---|---|
| HPT | TRH (hypo) → TSH (ant. pit.) → T3/T4 (thyroid) → body BMR | T3/T4 negative-feedback on TRH/TSH. Needs iodine. Bound in blood. |
| HPA | CRH → ACTH → cortisol (fasciculata) | Stress + clock. Cortisol raises glucose, damps immunity. Negative feedback. |
| SAM | Hypothalamus → spinal sympathetics → adrenal **medulla** | Epinephrine : norepinephrine ≈ 4:1. Seconds. Not the same as cortisol. |
| HPG | GnRH pulses → LH/FSH → ovaries or testes | Pulse frequency matters. Continuous GnRH would shut it down — do not draw a steady drip. |
| GH | GHRH / somatostatin → GH → IGF-1 (liver) | Sleep pulse. Glucose-sparing / diabetogenic side. |
| Glucose | gut incretins + blood glucose → insulin / glucagon | Beta ~75% of islet, alpha ~20%. Brain does not need insulin to take glucose. |
| Calcium | low Ca²⁺ → PTH; high Ca²⁺ → calcitonin (weak in adult) | PTH: bone, kidney, vitamin D activation. |
| RAAS | low volume/Na⁺ → renin → angiotensin II → aldosterone | Kidneys + adrenals + lungs (ACE). |
| Pineal | SCN + darkness → melatonin | Light is an input, not a food. |
| Posterior pit. | hypo neurons → ADH / oxytocin stored in posterior lobe | Alcohol blocks ADH. Salt/dehydration raises ADH. |

Macronutrient endpoints the UI should name:

- Carbohydrate → glucose (and fructose/galactose) → insulin vs glucagon
- Protein → amino acids → insulin + glucagon, later GH/IGF context
- Fat → slower glucose wave, incretin/CCK, bile in the digestive twin app
- Iodine → T3/T4 assembly in colloid
- Sodium / water → ADH + aldosterone
- Calcium / vitamin D / sun → PTH / calcitriol

If an input cannot act at a station (no iodine → no T3/T4; no beta cells → no insulin; bright light → no night melatonin), the pool does not fake a rise. That is how the “broken axis” teaching cases work later. V1 ships healthy axes only.

### 4.3 Hormone signature — the Bristol analog

Digestive maps a meal to a stool form. Endocrine maps a stretch of inputs to a **signature**: a small set of traces plus a named metabolic state.

| State | What the traces show | Typical inputs |
|---|---|---|
| Overnight fast | Insulin low, glucagon up, cortisol rising toward dawn, GH pulses, melatonin falling near wake | Sleep, darkness, empty gut |
| Fed / carbohydrate | Glucose bump, insulin up, glucagon down, incretins | Rice, bread, soda, fruit |
| Fed / mixed | Smaller glucose peak, more CCK/GLP-1/PYY, slower emptying | Steak + potato, beans + rice |
| Acute alarm | Epinephrine spike, HR/BP up, digestion damped | Sprint, scare, public talk |
| Clock morning | Cortisol high, melatonin low, insulin sensitivity better than night | Wake + light |
| Clock night | Melatonin high, cortisol low, GH if asleep | Dark, sleep |
| Sleep-cut next day | Insulin curve worse for the same carbs; hunger hormones noisier | 4 h night then breakfast |
| Caffeine stack | Catecholamine / cortisol nudge on top of whatever meal is in | Coffee on an empty stomach |

**Mapping input → signature is ◈ Model.** People vary (insulin sensitivity, chronotype, sex steroids, thyroid set-point). We will:

- Score an interval’s **carbs, protein, fat, fiber, caffeine, alcohol, iodine, light lux, sleep hours, stress units, movement**
- Push pools along the axes with visible half-lives
- Badge every readout: “typical-adult model, not your lab result”
- Combinations are **not** linear: coffee + all-nighter + soda ≠ coffee at 8am after sleep. Night carbs hit a worse insulin-sensitivity window than morning carbs. ⚠ / ◈

Display, educational not diagnostic:

- Glucose band in mg/dL. Default healthy 70–100 fasting (OpenStax textbook band). Meals may spike; the model should not invent a diabetes diagnosis.
- Free vs total thyroid — do not show “T4 went up 10 minutes after iodized salt.”
- Cortisol time-of-day. A high value at 08:00 can be health. The same number at 23:00 is a different story.

### 4.4 Pulses, not farts

Two real noisy events, both worth audio, neither is a joke board until the science says so:

1. **SAM surge** (catecholamines). Heart rate up, bronchi open, gut quiet. Seconds.
2. **Ultradian / circadian pulses.** GH at sleep, GnRH beats, insulin first-phase.

Gas and stool stay in the digestive app. This app sonifies **concentration and pulse**. Quiet meals can still move insulin. A dark room can be the loudest melatonin scene.

Hydrogen vs methane is a digestive split. Here the split is **neural medulla vs steroid cortex**: people confuse “adrenaline” with “cortisol.” The UI must keep them on two clocks.

---

## 5. Benefits and consequences panel

Every input (and every combination) writes two columns.

### Short term (this hour → ~24–48 h)

- Glucose / insulin / glucagon path
- Cortisol clock vs extra stress bump
- Melatonin vs light at night
- Catecholamine spike if SAM fired
- ADH vs alcohol / salt / water
- Immediate chemistry crawl: “incretins are already asking beta cells for insulin”
- Subjective flags, qualitative: jitter (caffeine + SAM), sleepiness (melatonin), hunger (ghrelin rising in a fast)

### Long term (pattern, not one sip) ⚠

A single soda does not “cause diabetes.” A **pattern** does the epidemiology. The panel must say that.

Use pattern language, graded:

| Pattern | Direction of evidence | Grade |
|---|---|---|
| Repeated high added sugar / sugar-sweetened drinks | Energy excess, worse glucose handling, dental + metabolic risk (DGA / NIDDK) | ✓ diet quality |
| Weight gain, visceral fat, inactivity | Insulin resistance, type 2 diabetes risk | ✓ |
| Sleep restriction as a habit | Next-day insulin resistance, appetite hormone noise | ⚠ magnitude, ✓ direction in lab studies |
| Bright light at night / shift work | Melatonin suppression, circadian misalignment | ✓ mechanism, ⚠ disease claims |
| Chronic psychological stress | HPA wear, sleep, eating — mixed and individual | ⚠ |
| Iodized-salt vs iodine-deficient region | Thyroid hormone synthesis | ✓ |
| Endocrine-disrupting chemicals (BPA, phthalates, PFAS, etc.) | NIEHS: mimic / block / interfere at low dose | ⚠ personal risk from one bottle, ✓ class exists |
| Resistance training + sleep + protein pattern | GH/IGF and insulin-sensitivity context | ✓ lifestyle, ◈ this avatar |

UI rule: **one meal or one night fills the short-term column. Long-term only lights up when the user repeats a pattern or hits “if I lived like this every day.”**

### Combination logic (the bonus)

Not a database of every pair. A mixer:

```
scene = sum(inputs) then apply interactions

interactions:
  carb + morning clock     → better insulin handling than same carb at 23:00
  carb + sleep debt        → higher/longer glucose curve
  caffeine + acute stress  → stacked catecholamines (sublinear)
  alcohol                  → ADH down now; sleep GH/melatonin messy later
  bright light + night     → melatonin cut
  protein + carb           → slower glucose, more GLP-1/PYY
  fiber + carb             → blunted glucose
  fasting + sprint         → glucagon + SAM, later insulin sensitivity
  iodine deficiency        → T3/T4 synthesis cannot rise (region preset)
  BPA / can liner          → qualitative EDC badge, not a fake estrogen number
```

Each result line cites the mechanism in plain language (“beta cells already heard from GLP-1 before the glucose peak; insulin is moving GLUT4 to muscle membranes”).

---

## 6. Sound

Web Audio, user-gated (nothing autoplays). Endocrine is mostly silent in real life. We sonify data; we do not invent organ farts.

| Event | Sound |
|---|---|
| Insulin first phase | Soft click train, denser with a bigger glucose rise. |
| Glucagon | Low opposite tone when glucose is falling. |
| SAM / epinephrine | Heart-rate bump, filtered pulse. Only if the stress or sprint input fired. |
| Cortisol dawn | Slow rising pad, 30–45 min after the wake event. |
| Melatonin | Narrow night tone; chopped if a light input hits. |
| GH pulse | Sparse thump near sleep onset. |
| Portal drip (TRH/CRH/GnRH) | Very quiet ticks in the stalk zoom. |
| Receptor bind (zoom 5) | One tick, not a laser. |

Accessibility: mute, captions of the event (“ACTH pulse → zona fasciculata”), reduced-motion mode that keeps traces and kills gland wobble.

No autoplay. No scream-for-adrenaline meme unless the user arms a joke pack later.

---

## 7. Seed input catalog (V1)

Enough to make combinations interesting. Each input is a JSON record, not a hardcoded if-else.

Suggested V1 set (~24):

**Food / drink:** water, coffee, cola, beer (small), milk, banana, white rice, white bread, oats, steak, beans, iodized salt, kelp, soy, dark chocolate.

**Non-food (this is the endocrine extra):** morning daylight, phone-bright night light, 8 h sleep, 4 h sleep, 20 min walk, hard interval, public-talk stress, all-afternoon sitting.

Schema (see `docs/endocrine/input-engine.md` for fields). USDA FoodData Central for meal macros; clock and stress are unitless model sliders. Do not scrape a copyrighted hormone-diet app.

---

## 8. Tech stack

Match the request: **HTML apps**. Match digestive / WOMEN: no framework tax.

| Piece | Choice | Why |
|---|---|---|
| Runtime | Vanilla HTML / CSS / JS | One file to open, GitHub Pages, no build required for V1 |
| Anatomy | SVG (glands, labels, hit targets) | Crisp at any size, click-to-inspect |
| Molecules + scan grain | Canvas 2D | Thousands of courier dots, MRI/US noise |
| Optional later | Canvas WebGL | Only if 2D can’t do sella + lighting |
| Sound | Web Audio API | Procedural pulses + a few original samples |
| Data | JSON | Inputs, glands, hormones — testable |
| Host | GitHub Pages | Same as WOMEN |

No React. No backend. No user health data stored.

Art direction: medical illustration (Netter-adjacent: real proportions, restrained palette) **plus** radiology (US grain, T1 MRI, nuclear blush) **plus** a lab-strip aesthetic. Not cute glands with faces. Hormone traces are clinical charts, not emoji — unless the user turns on “kid mode” later.

---

## 9. Build phases

### Phase 0 — this repo (done when these docs land)

Research, sources, this plan, input-engine spec.

### Phase 1 — silent anatomy

- Body silhouette, glands in place, labels on hover
- Sagittal cut for hypo–pituitary–pineal
- Zoom to thyroid follicle, islet, adrenal zones
- Size / axis / half-life inspector

**Done when:** a stranger can point at the sella, the isthmus, a parathyroid, and the adrenal medulla without us narrating.

### Phase 2 — one day, one meal

- Drop “white rice + water” at 08:00 after a normal night
- Glucose / insulin / glucagon traces
- Incretin note before the glucose peak
- Scrubbable 24 h timeline with cortisol + melatonin in the background

**Done when:** rice moves insulin and does not move T3 in ten minutes, and cortisol still peaks near waking even if they skip breakfast.

### Phase 3 — imaging modes

- Plain film (glands invisible, maybe a calcified pineal)
- Thyroid US + radioiodine scan
- Pituitary MRI / adrenal CT as stills with captions
- Lab strip that is the live “chemical image”

**Done when:** the x-ray mode would not embarrass a radiology tech, and the lab strip would not embarrass an endocrinology NP.

### Phase 4 — input engine + combinations

- `inputs.json` loaded
- Mix panel: meal + light + sleep + stress + movement
- Short-term column live
- “Every day” long-term column
- Soda at 08:00 ≠ soda at 23:00 after 4 h sleep; coffee stacks on a scare; beer makes urine via ADH

**Done when:** two different days produce two different signatures and two different soundtracks, for reasons the ticker can explain.

### Phase 5 — sound + juice

- Pulse sonification, SAM heart-rate, mute, captions, reduced motion
- Polish: portal blush, colloid iodine sparkle (labeled metaphor), medulla flash vs cortex seep

### Phase 6 — series shell

- Hub page: the body, digestive and endocrine both enterable, other systems gray “next”
- Shared CSS, shared evidence-badge component

Do not block digestive on this app. Shared shell can wait until one of them has a Phase 4.

---

## 10. What we will not do

- Diagnose diabetes, thyroid disease, Cushing, Addison, PCOS, “adrenal fatigue,” or “leaky hormones.”
- Promise a food or supplement “balances hormones” from one serving.
- Treat “adrenal fatigue” as a real axis. Exhaustion after stress is a story; the named internet syndrome is not a V1 disease pack.
- Show a cheeseburger-sized pituitary or a neon hormone arrow on a plain film without labeling it false.
- Make T3/T4 jump after one iodized cracker.
- Autoplay heart-pounding adrenaline audio.
- Invent half-lives that contradict the station table.
- Store user labs or scrape a copyrighted hormone-coach database.
- Medical advice. Educational model only.

---

## 11. Open questions (cheap to decide at Phase 1)

1. Default body: androgynous adult with a gonad pack, or two defaults. Sex changes HPG, some cortisol and thyroid set-points, and pregnancy is a later pack.
2. Kid mode later: same physics, no beer, gentler SAM audio, no disease stills.
3. Pathology pack later: type 1 (no insulin), type 2 (resistance), Graves, Hashimoto, Addison, pituitary adenoma — optional, off by default, never a self-test.
4. Pregnancy / placenta pack: hCG, placental lactogen — off until reproductive app exists.

None of these block Phase 1.

---

## 12. Success test

A user builds this day and can watch, without a narrator:

1. Wake at 07:00: cortisol already climbing, melatonin down, pineal quiet.
2. Coffee + oatmeal: incretins, then glucose, then insulin; glucagon falling; thyroid unchanged.
3. A 10-minute scare: medulla flash in **seconds** (epinephrine), cortex cortisol on a **slower** rise. Two clocks.
4. Phone-bright light at 23:00: melatonin chopped. Caption says why.
5. Beer: ADH down, urine up. Not “beer hormones.”
6. An x-ray toggle where the hormones vanish and, at most, a calcified pineal remains — until they switch to US / MRI / nuclear / the lab strip.
7. A short-term panel (glucose, pulses, sleepiness, jitter) and a long-term panel that only speaks if they say “every day.”
8. A zoom that shows islets, not a pancreas painted solid orange, and a pituitary that stays pea-sized in the sella.

If that loop is true, this is the most visual endocrine system worth building.
