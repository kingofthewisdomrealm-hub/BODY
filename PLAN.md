# BODY — Digestive system build plan

**Goal:** the most visual working model of human digestion that still tells the truth.

Not a cartoon sandwich in a hose. A living canal, anatomically placed, with food that looks like food until chemistry ruins it, imaging modes that match real radiology, and a food engine that can say *what happens if you eat this, or this plus that*.

This is the plan for app 1. Later systems reuse the same shell.

---

## 1. What “accurate” means here

Three views of the same event. The user can switch instantly.

| Mode | What it shows | What it must not fake |
|---|---|---|
| **Anatomy** | See-through body. Organs in real positions, living lengths, peristalsis, contents changing form. | Organs as a straight vertical tube. Small intestine as a few loops. Stomach as a bag in the middle. |
| **Imaging** | What a radiologist actually sees: plain film, barium fluoroscopy, optional CT-slice. | A cheeseburger glowing on a plain x-ray. Regular food is mostly invisible on plain film. |
| **Chemistry** | pH, enzymes, bile, water, gas, absorption arrows. | One magic “digest” sparkle that skips stations. |
| **Exchange** | Imports into the gut (blood-made juices, nerves, teeth, vitamin D) and exports out (portal, lymph, hormones). | The gut as a lone eater. All lumen water coming from the glass. Food flying into a bicep. Gut serotonin as mood. |

The killer honesty: **if you x-ray a person who just ate, you do not see the meal.** You see bone (white), gas (black), soft tissue (gray), and mottled fecal residue in the colon. To watch a bolus move you need contrast (barium swallow / upper GI / small-bowel follow-through) or another modality (CT, MRI, ultrasound, endoscopy, wireless motility capsule). The app teaches that, then offers a barium mode so the lumen *does* light up, the way fluoroscopy does.

Sources for that claim: RadiologyInfo upper GI / barium swallow; StatPearls barium swallow; Colorado State GI transit (barium meals are how transit was classically watched, and they are not a normal meal).

---

## 2. Product: one HTML app

Single page, no login, GitHub Pages, like WOMEN.

```
apps/digestive/index.html     ← the app
apps/digestive/css/
apps/digestive/js/
  anatomy.js                  ← organ layout + peristalsis
  imaging.js                  ← x-ray / fluoroscopy renderer
  particles.js                ← bolus → chyme → stool particles
  food-engine.js              ← chemistry, gas, Bristol, timelines
  systems.js                  ← export packets to other body systems
  audio.js                    ← squish, chew, borborygmi, flatus
  ui.js
data/foods.json               ← the food catalog
data/organs.json              ← lengths, pH, secretions, transit bands
data/exchange.json            ← packet bus both ways (imports + exports)
```

Later: `apps/circulatory/`, etc., plus a hub `index.html` that is the body map.

---

## 3. Visual architecture

### 3.1 Body layout (must be anatomically placed)

Reference adult, standing, anterior view, with a rotate-to-oblique control (radiologists use RAO for esophagrams).

| Structure | Placement rule |
|---|---|
| Mouth / teeth / tongue / salivary glands | Head. Parotid by the ear; submandibular / sublingual under the jaw. |
| Pharynx + epiglottis | Swallow animation: epiglottis covers the trachea. Food never “goes down the wrong pipe” unless we later add a pathology mode. |
| Esophagus | Behind the trachea, slightly left of midline in the thorax, piercing the diaphragm. |
| Lower esophageal sphincter | At the diaphragm / cardia. Stays closed except to admit a bolus. |
| Stomach | **Left upper quadrant**, J-shaped. Cardia, fundus (under left diaphragm), body, antrum, pylorus. Empty ≈ fist; fed it distends (up to ~4 L is the textbook extreme, not the default meal). Three muscle layers implied by churn direction. |
| Liver | Right upper quadrant, large, under the diaphragm. |
| Gallbladder | Underside of the liver. Contracts when fat hits the duodenum. |
| Pancreas | Retroperitoneal, head in the C-loop of the duodenum, tail toward the spleen. Duct joins the common bile duct at the ampulla of Vater. |
| Duodenum | C-shaped around the pancreas. First reception of bile + pancreatic juice. |
| Jejunum / ileum | Central abdomen, coiled. ~10 ft living length, ~1 inch diameter. Ileocecal valve into the cecum. |
| Large intestine | Frames the small bowel: cecum + appendix (RLQ) → ascending → hepatic flexure → transverse → splenic flexure → descending → sigmoid → rectum → anus. Wider (~3 in). Haustra and teniae coli visible. |
| Rectum / sphincters | Internal (involuntary) + external (voluntary). |

Lengths used in the sim (living, not cadaver):

- Alimentary canal ~25 ft (7.6 m) in life; cadaver ~35 ft because tone is lost. **Use living lengths.** ✓
- Small intestine ~10 ft living (OpenStax). Cleveland Clinic quotes ~22 ft — that is the cadaver / fully relaxed figure. Label the discrepancy in the UI. ⚠
- Large intestine ~5 ft, diameter ~3 in. ✓
- Surface area of small intestine ~200 m² (folds + villi + microvilli). Shown in the zoom, not the overview.

### 3.2 What food *looks like* at each station

This is the visual differentiator. The particle is not a sandwich icon the whole way.

| Station | Appearance | Physics |
|---|---|---|
| Plate | Recognizable food (color, chunks, gloss). | User drops it in the mouth. |
| Mouth | Torn, wet, mixed with saliva. Crunchy foods fragment; fats smear. | Chew cycles. Particle size drops. Starch sheen (amylase). |
| Swallow | Cohesive **bolus**. Epiglottis flip. | 1–2 seconds. Peristaltic stripe down the esophagus (~4–8 s). |
| Stomach | **Chyme**: opaque, acidic slurry. Solids grind against a tight pylorus; only bits ≲ 2 mm leave. Liquids leave faster than solids. Fat floats / delays emptying. | Three-layer churn. Fundus stores; antrum grinds; retropulsion. Color shifts toward gray-tan. |
| Duodenum | Chyme neutralized (bicarbonate). Bile turns fat into a cloudy emulsion. | Visible yellow-green bile pulse from the gallbladder on fatty meals. |
| Jejunum | Volume drops as water + nutrients absorb. Particles shrink. Micron-scale villi zoom available. | Segmentation mixing, not just a conveyor. |
| Ileum | Residue: fiber, some water, shed cells, bile salts being reclaimed. | Ileocecal valve dumps in pulses. |
| Colon | Progressive drying. Bacteria ferment leftover carb → **bubbles** (H₂, CO₂, CH₄). Color to brown (stercobilin from bilirubin). | Haustral mixing, then mass movements. |
| Rectum | Formed stool matching Bristol type. | Stretch → urge. |

Critical physics that cartoons get wrong, and we will not:

1. **A meal spreads.** Part of lunch can be entering the colon while part is still in the stomach (scintigraphy). Particles are a cloud with a head and a tail, not a single pellet. ✗ cartoon pellet
2. **Order is not preserved.** Fat, fiber, and liquid leave at different rates.
3. **Brown happens late.** Fresh small-bowel contents are not poop-colored. Color comes from bile pigments processed in the colon.

### 3.3 Imaging mode (the x-ray promise)

Three sub-modes:

**A. Plain abdominal radiograph**
- Bones white, gas black, soft tissue gray.
- Stomach bubble under the left hemidiaphragm.
- Colonic haustra outlined by gas.
- Fecal matter = mottled gray in the frame of the colon.
- The swallowed apple is **not drawn**. A caption says why.

**B. Barium / fluoroscopy** (this is what people *mean* by “x-ray the food”)
- Barium is white, coats the lumen.
- Watch the stripping wave in the esophagus (tail of the column, inverted-V in health).
- Stomach fills, mixes, pylorus meters contrast into the C-loop.
- Small-bowel follow-through: contrast as a continuous ribbon through coils, then into the cecum.
- Optional barium tablet / solid bolus vs thin liquid (liquids and solids behave differently).

**C. Cutaway / “if tissue were glass”**
- Educational, labeled as such. This is the beauty shot: you see chyme, bile, villi, gas bubbles, stool forming.
- Cross-section of the wall: mucosa → submucosa → circular muscle → longitudinal muscle → serosa. Stomach adds the inner oblique layer. Colon shows teniae + haustra.

Toggle: **live / paused / scrub timeline**. Default compression so a 24–48 h gut transit plays in ~90 seconds, with a “real-time swallow” slow-mo for the first 15 seconds.

### 3.4 Zoom stages

1. Whole body
2. Organ (e.g. stomach isolated)
3. Wall histology (4 layers)
4. Villus / microvillus (absorption)
5. Molecule (starch → maltose → glucose; triglyceride → micelle → chylomicron)

Each zoom is a real scene, not a popup paragraph.

---

## 4. Simulation engine

A clock plus a particle system plus a chemistry state.

```
clock          real seconds → sim minutes (user-set speed)
particles[]    {id, foodId, mass, sizeMm, region, composition, water, pH}
regions        mouth, esophagus, stomach, duodenum, jejunum, ileum, colonSegs[], rectum
secretions     saliva, HCl, pepsin, intrinsic factor, bile, pancreatic juice, mucus, HCO3
gases          H2, CO2, CH4, swallowed N2 (most flatus volume is swallowed air; fermentation is the rest)
stool          Bristol 1–7, mass, water %, color, odor flag
```

### 4.1 Transit bands (healthy adult, mixed solid meal)

Show a **band**, never a single stopwatch. ~ Range

| Segment | Typical band | Notes |
|---|---|---|
| Swallow → stomach | seconds | Automatic after the oral phase. |
| Gastric emptying, 50% | 2.5–3 h | Liquids faster; fat slower. |
| Gastric emptying, complete | 4–5 h | Wireless capsule studies: ~2–5 h; some protocols 0.4–15 h. |
| Small-intestine transit | ~3–7 h | Capsule review: 3.3–7 h. |
| Colon | ~16–40 h typical, normal out to ~59 h | Average often quoted 30–40 h. |
| Whole gut | ~23–37 h typical, normal out to ~73 h | Highly individual. |

Modifiers, all ◈ Model unless cited:

- High fat → slower gastric emptying
- Large volume / liquids → faster gastric emptying
- Insoluble, poorly fermented fiber → faster colon transit, heavier stool
- Low water + low fiber → slower colon, harder stool
- Stress / sympathetic tone → slower motility (qualitative)
- Lactose in a lactase-deficient gut → osmotic water + hydrogen (mechanism is ✓; whether *this user* is deficient is unknown)

### 4.2 Chemical stations (must fire in order)

| Where | pH | What happens |
|---|---|---|
| Mouth | 6.7–7.0 | Salivary amylase starts starch. Lingual lipase starts fat (continues in the stomach). Chewing. |
| Esophagus | — | Transport only. No enzymes added. |
| Stomach | ~1.5–3.5 (can be ~0.8 at the parietal cell) | HCl denatures protein, kills many microbes, activates pepsinogen → pepsin. No meaningful carb digestion here (amylase dies). Particles > ~2 mm retropulsed. Intrinsic factor for B12. |
| Duodenum | neutralized toward ~6–7 | Pancreatic HCO3. Enterokinase → trypsin cascade. Pancreatic amylase, lipase+colipase, proteases. Bile emulsifies fat. |
| Jejunum | ~6–7 | Bulk of digestion and absorption. Brush-border disaccharidases (maltase, sucrase, lactase). |
| Ileum | | B12+intrinsic factor, bile salt recycling. |
| Colon | | Water + electrolyte absorption. Microbiota ferment leftover carb → SCFA + gas. Vitamin K (and some B vitamins) produced. Residue becomes stool. |

Macronutrient endpoints the UI should name:

- Carbohydrate → monosaccharides (glucose, galactose, fructose)
- Protein → amino acids / small peptides
- Fat → fatty acids + monoglycerides → micelles → chylomicrons via lacteals (lymph, not portal vein)

If a food cannot be broken at a station (lactose without lactase, cellulose in humans, sugar alcohols), it continues downstream and becomes **osmotic water + fermentation fuel**. That is how the fart and the loose stool are generated. ✓ mechanism

### 4.3 Stool output — Bristol model

Use the **Bristol Stool Form Scale** (Lewis & Heaton 1997), the clinical standard.

| Type | Form | Gut-transit reading |
|---|---|---|
| 1 | Separate hard lumps | Slow. Hard to pass. |
| 2 | Lumpy sausage | Slow. |
| 3 | Sausage with cracks | Normal-ish. |
| 4 | Smooth soft sausage / snake | Typical “easy” stool. |
| 5 | Soft blobs, clear edges | Faster. |
| 6 | Mushy, ragged | Fast / diarrhea. |
| 7 | Watery, no pieces | Fastest. |

Rome-style grouping often used: 1–2 hard, 3–5 normal, 6–7 loose. Some papers call 3–5 normal and 6–7 diarrhea; we show the 7 types and let the user read them.

**Mapping food → type is ◈ Model.** Stool form tracks whole-gut transit better than frequency (Lewis & Heaton), and fiber (especially low-solubility, low-fermentability fiber in food form) tends to increase fecal weight and shorten transit, but NHANES-style diet vs usual stool type is noisy. Saturated fat has been associated with harder stools in at least one technician-scored healthy-adult study. We will:

- Score a meal’s **water, total fiber, insoluble vs soluble fiber, fat, sugar alcohols, FODMAP load, lactose**
- Push a Bristol prior (e.g. baseline 4)
- Shift it, with a visible “this is a typical-adult model, not your lab result” badge
- Combinations are **not** linear: beans + milk in a lactose-tolerant person ≠ beans + milk in a lactose-intolerant person. The engine has a simple **lactase: on/off** toggle and a **FODMAP sensitivity** slider.

Color / smell (educational, not diagnostic):

- Brown: stercobilin. Default.
- Pale / greasy: fat malabsorption (bile or lipase failure) — only if the sim’s bile/lipase is off.
- Black / red: **not a food joke.** If we ever show it, it is labeled as a medical-attention sign, not a diet outcome.
- Sulfur smell: extra with eggs, meat, crucifers — qualitative.

### 4.4 Gas and farts

Two sources, both real:

1. **Swallowed air** (nitrogen-heavy). Talking while eating, carbonated drinks.
2. **Colonic fermentation** of carbs the small bowel did not absorb: H₂, CO₂, CH₄. Merck; Monash FODMAP; StatPearls FODMAP.

High-gas foods (typical, not a moral list): beans/lentils (oligosaccharides), cabbage/broccoli/onion/garlic (fiber + FODMAPs), apples/pears/stone fruit (fructose/polyols), wheat (fructans), milk if lactose isn’t digested, sugar alcohols (sorbitol, xylitol), large fat loads (can increase gas symptoms), carbonated drinks (dissolved CO₂).

The app plays a fart when colonic gas production crosses a threshold **and** the meal’s fermentable leftover is high. Quiet meals (white rice, eggs, banana for many people) stay quiet. Volume and pitch are silly; the **trigger** is physiological. ◈

Hydrogen vs methane is a real split (methane producers often slower transit). V1 can use a single “gas units” meter; V2 can split H₂/CH₄ if we want constipation vs diarrhea coloring.

---

## 5. Benefits and consequences panel

Every swallowed item (and every combination) writes two columns.

### Short term (this meal → ~72 h)

- Time to stomach empty / first colonic arrival / stool
- Bristol type estimate
- Gas / bloating / reflux risk (fat + large volume + recumbency for reflux — qualitative)
- Glycemic hit (refined starch/sugar vs intact fiber matrix)
- Hydration (water absorbed in small bowel + colon)
- Immediate chemistry crawl: “salivary amylase is cutting this starch now”

### Long term (pattern, not one bite) ⚠

A single apple does not “prevent cancer.” A **pattern** does the epidemiology. The panel must say that.

Use pattern language, graded:

| Pattern | Direction of evidence | Grade |
|---|---|---|
| Fiber-rich plants, whole grains | Better laxation, fecal bulk; population data toward lower colorectal disease risk | ✓ / epidemiology |
| High added sugar, sugar-sweetened drinks | Metabolic disease, dental caries; DGA: keep added sugar low | ✓ diet quality |
| High ultra-processed share | Umbrella reviews: higher cardiometabolic risk, poorer nutrient profile | ⚠ (definition + confounding) |
| High saturated fat | DGA still: <10% kcal; stool may trend harder | ⚠ for “which fats,” ✓ as current guideline |
| Red/processed meat, heavy alcohol | Stronger colorectal signals in population studies | ⚠ mechanism, ✓ association |
| Fermentable fiber / diverse plants | Microbiome substrate, SCFA (butyrate) | ✓ mechanism, ◈ personal response |

UI rule: **one meal fills the short-term column. Long-term only lights up when the user repeats a pattern or hits “if I ate like this every day.”**

### Combination logic (the bonus)

Not a database of every pair. A mixer:

```
meal = sum(foods) then apply interactions

interactions:
  fat + anything        → slower gastric emptying
  FODMAP + FODMAP       → more colonic gas (sublinear, not double forever)
  lactose + lactase-off → osmotic diarrhea shift + H2
  polyols               → water into lumen, Bristol up
  insoluble fiber + water → Bristol toward 3–4, heavier stool
  fiber without water   → weaker effect, can worsen hard stool
  carbonation           → gastric gas now, not later
  capsaicin / coffee    → motility nudge (qualitative)
  alcohol               → motility + reflux flags, not a nutrient
```

Each result line cites the mechanism in plain language (“oligosaccharides in beans reach the colon intact; bacteria eat them and make hydrogen”).

---

## 5b. Other body systems (the packet bus)

The gut is a factory **and** a customer. Full map: [`docs/digestive/other-systems.md`](docs/digestive/other-systems.md).

**Who eats:** nervous system wants it, musculoskeletal delivers it, teeth break it, epiglottis keeps the airway, digestive **receives**. Cephalic phase (see/smell → saliva and acid) is the import that happens *before* the bite.

**Fourth view: Exchange** (Imports / Exports / Both).

**Imports** (on before the swallow, and the whole meal):

- Hunger + hands-to-mouth + chew (not digestive-owned)
- Arterial blood into the wall and glands (O₂, water, salts, glutamine)
- ~6–7 L/day of juices secreted **from plasma into the lumen**, then mostly taken back. Only ~2 L was the glass. Stool keeps ~0.1–0.2 L.
- Bilirubin from dead red cells → bile → brown
- Activated vitamin D from kidney (skin started it) → calcium absorption
- Colonocytes eating butyrate the microbes made from leftovers

**Exports** (when absorption starts):

- **Portal vein (red)** — sugars, amino acids, water, salts, iron, alcohol → **liver first**, then heart. ~25% of cardiac output is splanchnic while you rest-and-digest.
- **Lacteals (cream)** — chylomicrons + A/D/E/K → lymph → thoracic duct → blood. Fat does not take the portal shortcut.
- **Signals** — CCK/GLP-1/PYY/ghrelin, vagus, ENS, GALT, colonic H₂ on the breath.

System chips around the silhouette. Hover = one sentence. Click = isolate that stream + “opens in BODY / {system} later.”

Hard rules (also in the map file):

- Food in the lumen is **outside the body** until it crosses mucosa.
- Most lumen fluid is an **import from blood**, not from the drink.
- The digestive system does not eat. It receives.
- Gut serotonin (~90–95% of body 5-HT) runs motility; **it does not cross the BBB**.
- Do not print “70% of the immune system is in the gut.”
- One meal fills short-term packets. Long-term system effects need “if I ate like this every day.”
- No detox-juice, leaky-gut-explains-everything, or food-flying-into-a-uterus.

`food-engine.js` emits `imports[]` and `exports[]`. Later apps are suppliers *and* destinations. If two apps disagree, `other-systems.md` wins until a better primary source moves the grade.

Build order after digestive Phase 4b: circulatory (biggest pipe both ways) → endocrine (glucose curve) → nervous (hunger + kill the serotonin cartoon) → urinary (urea out, vitamin D in) → the rest.

---

## 6. Sound

Web Audio, user-gated (nothing autoplays). Mix of short samples + procedural filters so it doesn’t sound like a joke board until the science says so.

| Event | Sound |
|---|---|
| Chew | Food-dependent: crunch (chips, apple, nuts), dense (meat), wet (banana). |
| Swallow | Glottis / gulp. |
| Esophagus | Soft peristaltic slide. |
| Stomach | Mixing: low wet churn, borborygmi when empty-ish. |
| Small bowel | Quiet squish, segmentation. |
| Colon fermentation | Tiny bubbles if gas units rising. |
| Flatus | Only if fermentable leftover + gas threshold. Intensity from gas units. |
| Stool pass | Optional, off by default, still honest. |

Accessibility: mute, captions of the event (“ileocecal valve opening”), reduced-motion mode that keeps chemistry and kills peristalsis wobble.

---

## 7. Seed food catalog (V1)

Enough to make combinations interesting. Each food is a JSON record, not a hardcoded if-else.

Suggested V1 set (~24):

Water, coffee, cola, beer (small), milk, yogurt, cheddar, banana, apple, broccoli, cabbage, beans, white rice, white bread, oats, steak, chicken, fried potatoes, burger, pizza, ice cream, chili, almonds, dark chocolate.

Schema (see `docs/digestive/food-engine.md` for fields). USDA FoodData Central for macros; FODMAP class from Monash-style categories (not the proprietary app database — we use public class labels: lactose, fructose excess, fructans, GOS, polyols).

---

## 8. Tech stack

Match the request: **HTML apps**. Match WOMEN: no framework tax.

| Piece | Choice | Why |
|---|---|---|
| Runtime | Vanilla HTML / CSS / JS | One file to open, GitHub Pages, no build required for V1 |
| Anatomy | SVG (organs, labels, hit targets) | Crisp at any size, click-to-inspect |
| Particles + x-ray grain | Canvas 2D | Thousands of chyme bits, barium noise |
| Optional later | Canvas WebGL | Only if 2D can’t do coils + lighting |
| Sound | Web Audio API | Procedural squish + a few licensed/original samples |
| Data | JSON | Foods and organ constants, testable |
| Host | GitHub Pages | Same as WOMEN |

No React. No backend. No user health data stored.

Art direction: medical illustration (Netter-adjacent values: real proportions, restrained palette) **plus** radiology (blue-white fluoroscopy, grain). Not cutesy organs with faces. Poop is clinical Bristol, not emoji — unless the user turns on “kid mode” later.

---

## 9. Build phases

### Phase 0 — this repo (done when these docs land)

Research, sources, this plan, food-engine spec, other-systems map.

### Phase 1 — silent anatomy

- Body silhouette, organs in place, labels on hover
- Peristalsis loop (empty)
- Zoom to stomach wall + small-intestine villus
- Length / pH / secretion inspector

**Done when:** a stranger can point at the pylorus, the ampulla of Vater, and the ileocecal valve without us narrating.

### Phase 2 — one meal, one path

- Drop “white rice + water”
- Particles morph bolus → chyme → residue → Bristol 3–4
- Scrubbable 48 h timeline
- Chemistry ticker

**Done when:** rice does not fart, and the colon is where brown appears.

### Phase 3 — imaging modes

- Plain film (meal invisible, gas visible)
- Barium swallow + follow-through
- Caption that explains the difference

**Done when:** the x-ray mode would not embarrass a radiology tech on first glance.

### Phase 4 — food engine + combinations

- `foods.json` loaded
- Mix panel, lactase toggle, FODMAP slider
- Short-term column live
- “Every day” long-term column
- Beans fart; milk farts only if lactase is off; fat delays the stomach

**Done when:** two different meals produce two different stools and two different soundtracks, for reasons the ticker can explain.

### Phase 4b — exports to other systems

- Villus split: portal vs lacteal
- System chips + hover copy from `other-systems.md`
- **Imports on:** cephalic drool, arterial juice secretion, “the gut did not decide to eat”
- Breath-hydrogen tag on the lungs when beans ferment
- Satiety/vagus tag on the brain; caption that gut 5-HT stays in the gut
- “Every day” pattern lights bone/vessel/fertility chips without claiming one bite did it

**Done when:** pizza makes cream lacteals and a delayed portal glucose; rice does not; clicking Circulatory shows blood *into* glands as well as sugar *out* through the liver.

### Phase 5 — sound + juice

- Chew / swallow / squish / gas
- Mute, captions, reduced motion
- Polish: bile pulse, gallbladder squeeze, haustra filling

### Phase 6 — series shell

- Hub page: the body, digestive highlighted, other systems gray “next”
- Shared CSS, shared evidence-badge component

Do not start circulatory until digestive Phase 4b is true.

---

## 10. What we will not do

- Diagnose IBS, SIBO, celiac, cancer, or “leaky gut.”
- Promise a food cures or causes a disease from one serving.
- Show blood in stool as a gag.
- Use cadaver lengths as if they were living.
- Draw a visible cheeseburger on a plain radiograph without labeling it as false.
- Autoplay farts.
- Invent enzyme timings that contradict the station table.
- Ship a food database scraped from a copyrighted FODMAP app. Public classes + USDA macros only.
- Equate gut serotonin with mood, or print “70% of immunity is in the gut.”
- Draw food depositing itself into muscle, uterus, or arteries, skipping blood.
- Treat the digestive system as the thing that eats. It receives. Nervous + musculoskeletal eat.

---

## 11. Open questions (cheap to decide at Phase 1)

1. Default body: androgynous adult, or a body-selector (sex changes some transit stats — women often slower colon transit in some studies).
2. Kid mode later: same physics, gentler stool art, no beer.
3. Pathology pack later: achalasia bird-beak, gallstone blocking the ampulla, lactose intolerance as a preset — optional, off by default.

None of these block Phase 1.

---

## 12. Success test

A user drops a burrito (tortilla + beans + cheese + salsa) into the mouth and can watch, without a narrator:

1. Chewing and a real swallow (epiglottis).
2. A J-shaped stomach on the **left**, churning chyme, fat delaying the pylorus.
3. Bile and pancreatic juice hitting the duodenal C-loop.
4. Coils, not a garden hose, absorbing the meal while a **tail** is still in the stomach.
5. Beans lighting up fermentation bubbles in the colon hours later.
6. A Bristol type that is softer than rice-alone, with a fart if gas units say so.
7. An x-ray toggle where the burrito vanishes and barium (if enabled) is what you actually track.
8. A short-term panel (gas, stool, timing) and a long-term panel that only speaks if they say “every day.”
9. Exchange view: juices pouring in from blood; glucose/amino acids out through the **liver**; fat through **lacteals**; a chip that says who wanted the meal (brain + hands, not the colon).

If that loop is true, this is the most visual digestive system worth building. Then we do the heart.
