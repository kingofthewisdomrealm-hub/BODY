# BODY

A series of **HTML apps** that show what each body system actually looks like while it works — anatomically placed organs, honest imaging, and the chemistry of what you put in.

First system: the **digestive tract** — live MVP at [`apps/digestive/index.html`](apps/digestive/index.html). Same visual brief, second full plan: the **endocrine system**.

This is an educational model, not a diagnosis tool and not medical advice.

---

## The one-paragraph version

Most digestive “tours” are a cartoon tube with a sandwich sliding through it. Real digestion is a 25-foot living canal in a specific 3D layout: a J-shaped stomach under the left ribs, 10 feet of coiled small bowel in the mid-abdomen, a wider colon framing those coils, and accessory organs (liver, gallbladder, pancreas) dumping bile and enzymes into the duodenum. Food does not travel as one blob. It is chewed into a bolus, acid-churned into chyme, emulsified, absorbed, fermented, dried, and excreted — and on a real x-ray you mostly see **gas, bone, and barium**, not a cheeseburger. This project builds the most visual digestive system that still tells the truth: a working anatomical model, a fluoroscopy/x-ray mode that matches what imaging actually shows, a food engine that tracks chemistry / gas / stool form, short-term vs long-term consequences of what you swallow, and a map of how those packets **leave and enter** every other body system (the gut receives; it does not eat).

Most endocrine “tours” are fruit-sized glands shooting neon arrows. Real endocrine is pea-scale organs (pituitary in the sella, butterfly thyroid on the trachea, triangles on the kidneys, islets as a sliver of pancreas) dumping picomolar messengers into blood. An x-ray still does not show the signal — you need ultrasound, MRI, nuclear uptake, or a **timed lab strip**. The endocrine app is the same honesty contract: living anatomy, real imaging, an input engine (food + light + sleep + stress + movement), and short-term vs long-term consequences that do not diagnose you from one soda.

---

## Repo map

| File | What's in it |
|---|---|
| [`apps/digestive/index.html`](apps/digestive/index.html) | **Live MVP.** Eating → journey → chemistry / physics / biology → system exchange, with experiment citations |
| [`PLAN.md`](PLAN.md) | Digestive build plan: visuals, simulation, food engine, sound, systems overlay, phases |
| [`docs/digestive/research.md`](docs/digestive/research.md) | How the digestive system actually works, graded |
| [`docs/digestive/food-engine.md`](docs/digestive/food-engine.md) | How foods (and combinations) map to chemistry, gas, stool, and time |
| [`docs/digestive/other-systems.md`](docs/digestive/other-systems.md) | How food and digestion couple to every other BODY system |
| [`docs/digestive/sources.md`](docs/digestive/sources.md) | Digestive sources, with what they are and how much weight they get |
| [`PLAN-endocrine.md`](PLAN-endocrine.md) | Endocrine build plan: glands, honest imaging, axes, input engine, sound, phases |
| [`docs/endocrine/research.md`](docs/endocrine/research.md) | How the endocrine system actually works, graded |
| [`docs/endocrine/input-engine.md`](docs/endocrine/input-engine.md) | How meals, light, sleep, stress, and movement map to hormone signatures |
| [`docs/endocrine/sources.md`](docs/endocrine/sources.md) | Endocrine sources, with what they are and how much weight they get |

---

## Evidence grades used throughout

Same idea as the other knowledge repos: label the claim, don't just pile facts.

| Grade | Meaning |
|---|---|
| ✓ **Robust** | Textbook physiology / replicated measurement. Build the model on it. |
| ~ **Range** | Real, but healthy people vary a lot. Show a band, not a single number. |
| ⚠ **Contested** | Effect is argued, or the popular version overstates the study. |
| ◈ **Model** | Educational approximation for the sim. Not a medical prediction for a specific person. |
| ✗ **Cartoon** | Common animation lie. We refuse it. |

---

## Series (later)

Each system is its own HTML app, same visual language:

1. Digestive — [`PLAN.md`](PLAN.md). Factory: it emits the packets the rest of the series consumes.
2. Circulatory
3. Endocrine — [`PLAN-endocrine.md`](PLAN-endocrine.md). Same visual brief: accurate parts, honest imaging, chemistry of inputs, short vs long term.
4. Nervous
5. Urinary
6. Immune / lymphatic
7. Respiratory
8. Musculoskeletal
9. Integumentary
10. Reproductive

---

## Run the digestive MVP

Open [`apps/digestive/index.html`](apps/digestive/index.html) in a browser (or the repo root, which sends you there).

1. Pick up to three foods.
2. Hit **Eat this**. Watch cephalic → chew → swallow (epiglottis) → stomach (patient’s left = your right) → coils → colon.
3. Toggle **Plain film** (meal vanishes) vs **Barium** (lumen lights up).
4. Uncheck **Lactase** and eat milk. Hydrogen / loose Bristol should change. Beans still ferment with lactase on.
5. Uncheck **Mute** if you want chew / swallow / squish / a fart when leftover carb actually ferments.
6. Every proof card is an experiment (scintigraphy, capsule, senna/loperamide, H₂ breath), not a vibe.

---

## Scope note

Nothing here substitutes for a gastroenterologist, endocrinologist, dietitian, or your own physician. Transit times, stool form, gas, and hormone levels are highly individual. Food → poop mappings and input → hormone signatures in the apps are **models of typical physiology**, not a lab result.

*Research compiled: 2026-08-20*
