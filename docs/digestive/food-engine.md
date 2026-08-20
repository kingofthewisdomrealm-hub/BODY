# Food engine spec

How a meal becomes chemistry, gas, stool, timing, and export packets. All mappings to a specific person’s toilet are ◈ unless noted.

---

## Food record (`data/foods.json`)

```json
{
  "id": "black-beans",
  "name": "Black beans, cooked",
  "servingG": 100,
  "macros": { "water": 66, "protein": 9, "fat": 0.5, "carb": 24, "fiber": 8.7, "addedSugar": 0 },
  "fiber": { "soluble": 2.5, "insoluble": 6.2 },
  "fodmap": { "lactose": 0, "fructoseExcess": 0, "fructans": 0, "gos": 2, "polyols": 0 },
  "flags": ["legume"],
  "chew": "dense",
  "gastricEmptying": "neutral",
  "color": "#3b2f2f",
  "usdaFdcId": null
}
```

- Macros from USDA FoodData Central where possible.
- FODMAP fields are **class intensity 0–3**, not the Monash app’s proprietary cutoffs. Do not scrape that app.
- `gastricEmptying`: `fast` (liquids, low fat) | `neutral` | `slow` (high fat).
- `chew`: `liquid` | `soft` | `crunch` | `dense` — drives sound and particle fracture.

---

## Mixer

```
meal = sum(foods × servings)
then interactions:

fat                 → slower gastric emptying
volume / liquid     → faster gastric emptying
gos + fructans + polyols + lactose*(1-lactase) → fermentable leftover → gas + Bristol up
insoluble fiber + water → fecal bulk, transit down, Bristol toward 3–4
fiber without water → weaker; can worsen hard stool
carbonation         → gastric gas now
alcohol             → motility + reflux flags; not a nutrient win
capsaicin / coffee  → qualitative motility nudge
```

Lactase is a user toggle (default on). FODMAP sensitivity is a slider (default 0.5). Neither is a diagnosis.

---

## Station effects (per food mass)

1. **Mouth** — starch fraction starts falling if chew time > 0; particle size drops.
2. **Stomach** — protein → peptides if pepsin on; fat delayed; carb amylase off.
3. **Duodenum** — fat needs bile+lipase or it stays in lumen (steatorrhea path).
4. **Jejunum** — absorb digestible carb/protein/fat/water.
5. **Ileum** — B12 if IF present.
6. **Colon** — leftover fermentable carb → SCFA + H₂/CO₂/CH₄; leftover water → Bristol up; drying otherwise.

Undigestible cellulose stays until stool. Human amylase does not eat it. ✓

---

## Bristol prior

Baseline type **4**. Shift with a clamped integer:

| Push | Direction |
|---|---|
| Insoluble fiber + water | toward 3–4 from 1–2; mass up |
| Rapid unabsorbed solute (lactose, polyols) | toward 6–7 |
| Low water, low fiber, slower colon | toward 1–2 |
| High saturated fat (weak) | slightly toward hard | ⚠ one technician-scored study; don’t overfit |

Show the type **and** the drivers. Never “this burrito will be type 6 in you.”

Lewis & Heaton: stool *form* tracked whole-gut transit better than frequency. ✓ for using form at all.

---

## Gas units ◈

```
gas = swallowedAir
    + carbonation
    + k * fermentableLeftoverG * sensitivity
```

Play flatus only if `gas` crosses threshold **and** leftover is colonic (hours later, not in the mouth). Beans with lactase on still fart (GOS). Milk farts if lactase off. Rice stays quiet.

---

## Short vs long term

**Short (this meal → ~72 h):** timing bands, Bristol prior, gas, reflux flags, glucose curve shape, export packets.

**Long (pattern):** only if repeat or “every day.” Fiber pattern, added-sugar pattern, UPF share, saturated-fat share, red/processed meat, alcohol. Epidemiology, graded in [`other-systems.md`](other-systems.md). One apple does not prevent cancer.

---

## Exchange packets

After absorption, emit `exports[]` from [`other-systems.md`](other-systems.md) §13. Before and during the meal, emit `imports[]`:

```
imports: [
  { id: 'oral-intake', via: 'mouth', from: ['outside'] },
  { id: 'hunger-command', via: 'nervous', from: ['nervous', 'endocrine-ghrelin'] },
  { id: 'mastication', via: 'msk-skeletal', from: ['musculoskeletal', 'skeletal'] },
  { id: 'cephalic-phase', via: 'vagus', from: ['nervous'] },
  { id: 'plasma-water-salts', via: 'arterial', from: ['circulatory'] },
  { id: 'oxygen', via: 'arterial', from: ['respiratory', 'circulatory'] },
  { id: 'glutamine-wall-fuel', via: 'arterial', from: ['circulatory'] },
  { id: 'bilirubin', via: 'bile', from: ['circulatory-heme'] },
  { id: 'vit-d-active', via: 'blood', from: ['skin', 'urinary'] },
  { id: 'butyrate', via: 'colon-lumen', from: ['microbes'] }
]
```

---

## V1 catalog

Water, coffee, cola, beer, milk, yogurt, cheddar, banana, apple, broccoli, cabbage, beans, white rice, white bread, oats, steak, chicken, fried potatoes, burger, pizza, ice cream, chili, almonds, dark chocolate.

Enough to prove: rice ≠ beans ≠ milk-without-lactase ≠ pizza-fat-delay.
