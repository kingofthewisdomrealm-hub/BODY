# BODY

A series of **HTML apps** that show what each body system actually looks like while it works — anatomically placed organs, honest imaging, and the chemistry of what you put in.

First system: the **digestive tract**.

This is an educational model, not a diagnosis tool and not medical advice.

---

## The one-paragraph version

Most digestive “tours” are a cartoon tube with a sandwich sliding through it. Real digestion is a 25-foot living canal in a specific 3D layout: a J-shaped stomach under the left ribs, 10 feet of coiled small bowel in the mid-abdomen, a wider colon framing those coils, and accessory organs (liver, gallbladder, pancreas) dumping bile and enzymes into the duodenum. Food does not travel as one blob. It is chewed into a bolus, acid-churned into chyme, emulsified, absorbed, fermented, dried, and excreted — and on a real x-ray you mostly see **gas, bone, and barium**, not a cheeseburger. This project builds the most visual digestive system that still tells the truth: a working anatomical model, a fluoroscopy/x-ray mode that matches what imaging actually shows, a food engine that tracks chemistry / gas / stool form, short-term vs long-term consequences of what you swallow, and a map of how those absorbed packets hit every other body system.

---

## Repo map

| File | What's in it |
|---|---|
| [`PLAN.md`](PLAN.md) | Build plan: visuals, simulation, food engine, sound, systems overlay, phases |
| [`docs/digestive/research.md`](docs/digestive/research.md) | How the digestive system actually works, graded |
| [`docs/digestive/food-engine.md`](docs/digestive/food-engine.md) | How foods (and combinations) map to chemistry, gas, stool, and time |
| [`docs/digestive/other-systems.md`](docs/digestive/other-systems.md) | How food and digestion couple to every other BODY system |
| [`docs/digestive/sources.md`](docs/digestive/sources.md) | Every source, with what it is and how much weight it gets |

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

1. Digestive — this plan. Factory: it emits the packets the rest of the series consumes.
2. Circulatory
3. Endocrine
4. Nervous
5. Urinary
6. Immune / lymphatic
7. Respiratory
8. Musculoskeletal
9. Integumentary
10. Reproductive

---

## Scope note

Nothing here substitutes for a gastroenterologist, dietitian, or your own physician. Transit times, stool form, and gas are highly individual. Food → poop mappings in the app are **models of typical physiology**, not a lab result.

*Research compiled: 2026-08-20*
