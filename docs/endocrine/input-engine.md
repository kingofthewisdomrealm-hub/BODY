# Endocrine input engine

How foods, light, sleep, stress, and movement map to chemistry, pulses, and a hormone **signature**. Companion to `PLAN-endocrine.md`. Digestive’s twin is `docs/digestive/food-engine.md` (stool / gas). This engine does not draw poop.

Every numeric push is ◈ **model** unless a row says otherwise. Badge the UI.

---

## 1. What an “input” is

Not only a swallow. Endocrine listens to the gut **and** the clock **and** the nerves.

```
Input {
  id
  kind            meal | drink | light | sleep | stress | move | chemical
  label
  t               sim timestamp
  macros          { carb_g, protein_g, fat_g, fiber_g, water_g }   // meals/drinks
  iodine_ug
  caffeine_mg
  alcohol_g
  glycemic        { class: glucose | starch_refined | starch_intact | sugar_liquid | mixed, gi_band }
  fodmap          ignored here — that is the digestive app
  lux             // light
  spectrum        daylight | led_night | dark
  sleep_h
  sleep_quality   0–1
  stress_units    0–1   // acute psychological
  mets            // movement
  duration_min
}
```

Meals still come from USDA-style macros. Light and sleep have no USDA number; they are sliders with physiologic hooks.

---

## 2. Internal pools the mixer writes

```
pools:
  glucose_mgdl
  insulin
  glucagon
  incretin_glp1
  ghrelin
  leptin            // slow, fat-mass; do not twitch per bite
  epinephrine
  norepinephrine
  cortisol
  acth
  crh
  tsh, t3, t4       // T3/T4 almost sticky on a 24 h clock
  melatonin
  gh
  adh
  aldosterone
  pth
  ca_mgdl

clocks:
  circadian_phase   // 0 = midnight
  hours_awake
  last_meal_min
```

Half-lives (OpenStax / textbook, show as bands):

| Pool | Half-life order | Notes |
|---|---|---|
| Epinephrine | ~1 min | SAM |
| Insulin | minutes | First phase vs second |
| Cortisol | ~60–90 min | Clock + HPA |
| Melatonin | hours-scale night envelope | Light can cut production now |
| T4 | days | Binding proteins |
| T3 | shorter than T4, still not a snack timer | |

---

## 3. Hooks (mechanisms, not vibes)

### 3.1 Meal → glucose axis ✓

1. Food in gut → incretins (GLP-1, GIP) within ~10 min. GLP-1 also slows emptying and says “full.”
2. Absorbed glucose → beta cells. Insulin up. GLUT4 to muscle/fat membranes.
3. Glucagon down (carb meals). Protein meals keep glucagon in the game so the liver can still make glucose.
4. Fiber / fat / protein flatten and delay the glucose peak vs liquid sugar.

Model curve (◈):

```
glucose_peak_min   ≈ 30–60 * (1 + 0.4*fat_frac + 0.2*fiber_frac) / (1 + liquid_sugar)
glucose_delta      ≈ k * available_carb * time_of_day_factor * sleep_debt_factor * insulin_sensitivity
insulin            follows glucose with a short lag + incretin boost
glucagon           inverse of carb-driven insulin, mixed if protein_g high
```

`time_of_day_factor`: morning < evening for the same carb (worse at night). ⚠ / ◈

`sleep_debt_factor`: last night < ~6 h → larger/longer glucose. ✓ direction, ◈ size

Do **not** emit a diabetes label. Stay in a healthy-adult band unless a later pathology pack is on.

### 3.2 Clock → cortisol and melatonin ✓

```
cortisol     ≈ circadian_wave(peak = wake + 30–45 min, nadir ≈ midnight)
             + k_stress * stress_units * delayed(20–40 min)
             + small caffeine bump

melatonin    ≈ darkness_envelope(evening_rise → night_peak → morning_fall)
             * (0 if lux_night > threshold)     // acute suppression
```

Breakfast does not create the dawn cortisol wave. Skipping breakfast does not delete it. ✓

### 3.3 Stress / sprint → two clocks ✓

```
if stress_units high or mets spike:
  epinephrine  += pulse   // seconds
  hr           += 
  gut_tone     -=         // qualitative flag to digestive twin later
  cortisol     += delayed HPA   // not the same peak
```

Keep medulla and cortex visually separate.

### 3.4 Alcohol → ADH ✓

```
adh *= suppress(alcohol_g)
urine_flag = high
sleep_gh_pulse *= damp     // qualitative next night
```

Not a “beer estrogen” story in V1. That’s ⚠ internet.

### 3.5 Iodine → thyroid (slow) ✓

```
colloid_iodine += iodine_ug
t3_t4_synthesis = f(colloid_iodine, tsh)   // hours–days
```

One meal never spikes free T4 on the 15-minute ticker. Kelp can be a lot of iodine; NIDDK warns it can worsen some autoimmune thyroid disease — show as a caution badge, not a plot twist. ⚠ personal

US default: iodine sufficient (iodized salt). Optional region preset: deficient → goiter risk on the **every day** panel only.

### 3.6 Light → pineal ✓

```
if clock in night_band and lux > indoor_bright:
  melatonin_production → cut
```

Phone-bright is an input. It is not food. It belongs in this app anyway.

### 3.7 Sleep cut → next day ⚠ / ✓

```
if sleep_h < 6:
  insulin_sensitivity *= 0.7–0.9   // ◈
  ghrelin += 
  leptin  -= tiny   // slow pool; don’t overplay
  gh_night_pulse missed
```

### 3.8 Hunger hormones ✓ mechanism

```
ghrelin  rises with hours since meal; falls after a mixed meal
PYY/GLP1 rise with calories, especially protein/fat
leptin   follows fat mass over weeks; “every day” column only
```

Leptin resistance is a long-term obesity pattern, not a V1 one-meal switch.

### 3.9 Caffeine ~ 

```
epinephrine += small
cortisol    += small
jitter_flag if stacked with SAM
```

### 3.10 EDC chemical badge ⚠

BPA / can liner / phthalate as a **qualitative** badge on the long-term panel. No fake estrogen ng/mL from one bottle. NIEHS: the class can mimic, block, or interfere; dose and person are not a JSON constant.

---

## 4. Signature (Bristol analog)

After each scene, emit a named state plus sparkline set.

```
Signature {
  name            overnight_fast | fed_carb | fed_mixed | acute_alarm
                  | clock_morning | clock_night | sleep_cut_next_day | caffeine_stack
  glucose_band
  insulin_band
  cortisol_vs_clock     on_time | extra_bump | inverted_flag
  melatonin             rising | cut_by_light | low_day
  sam                   quiet | firing
  adh                   normal | suppressed
  thyroid               unchanged_24h | (slow flags only on every-day)
  notes[]               plain-language mechanisms
}
```

Combinations (non-linear):

| Mix | What we show |
|---|---|
| Oatmeal 08:00 after 8 h sleep | Fed mixed, cortisol already high from clock, insulin polite |
| Cola 23:00 after 4 h sleep + phone light | Worse glucose curve, melatonin cut, sleep-cut signature |
| Coffee + public talk | SAM + caffeine stack; cortisol delayed |
| Beer at 21:00 | ADH down; melatonin/GH night messy |
| White rice vs rice+beans+steak | Bigger faster glucose vs blunted mixed |
| Kelp every day | Iodine caution, thyroid still slow |
| Sprint fasted | Glucagon + SAM; later insulin-sensitivity nod on the long column if repeated |

---

## 5. Short-term vs long-term copy rules

**Short-term** may say:

- “Insulin is moving glucose into muscle.”
- “Alcohol turned down ADH; you will make more urine.”
- “That overhead LED is suppressing melatonin.”

**Short-term** may not say:

- “This soda gave you diabetes.”
- “This kale balanced your estrogen.”
- “Your thyroid is now fast.”

**Long-term** (“if I lived like this every day”) may speak in epidemiology / guideline language, graded, matching the plan table: added sugar pattern, sleep restriction pattern, shift light, inactivity + weight, EDC class.

---

## 6. Seed catalog (V1)

Same spirit as digestive’s ~24 foods. Macros from USDA FoodData Central where the input is a food. Public physiologic classes only.

| id | kind | Why it is in the set |
|---|---|---|
| water | drink | ADH / osmolarity control |
| coffee | drink | Caffeine stack |
| cola | drink | Liquid sugar + caffeine |
| beer_small | drink | ADH |
| milk | meal | Mixed macros, lactose is digestive’s problem |
| banana | meal | Carb, gentle |
| white_rice | meal | Starch, clean insulin demo |
| white_bread | meal | Refined starch |
| oats | meal | Intact starch + fiber |
| steak | meal | Protein ± fat, glucagon stays |
| beans | meal | Carb+fiber+protein; gas lives in digestive |
| iodized_salt | chemical | Thyroid substrate, tiny |
| kelp | meal | Iodine load caution |
| soy | meal | Phytoestrogen badge, not a soap opera |
| dark_chocolate | meal | Mixed, caffeine-ish |
| daylight_am | light | Clock |
| phone_night | light | Melatonin cut |
| sleep_8h | sleep | Baseline |
| sleep_4h | sleep | Next-day glucose |
| walk_20 | move | Mild |
| intervals | move | SAM + GH context |
| talk_stress | stress | Two clocks |
| sit_afternoon | move | Null, for contrast |

JSON lives at `data/inputs.json` when Phase 4 starts. Until then this table is the spec.

---

## 7. Tests the engine must pass

1. Rice at 08:00 moves insulin. T3 does not move on the same ticker.
2. Dawn cortisol happens even with no breakfast.
3. Scare: epinephrine now, cortisol later.
4. Night light cuts melatonin; morning sun does not “add melatonin.”
5. Beer raises a urine flag via ADH, not via “toxin.”
6. 4 h sleep then cola ≠ 8 h sleep then cola.
7. “Every day” is off until the user repeats or toggles it.
8. No output claims to be the user’s lab result.
