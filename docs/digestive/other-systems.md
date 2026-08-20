# Food, digestion, and the rest of the body

The digestive tract is not a closed ride. It **imports** from other systems (and from the plate), **consumes** some of that itself, and **exports** the rest. This file is the coupling map in both directions, plus who is actually doing the eating.

Rule that cartoons skip: **food in the lumen is still outside you.** It becomes “in the body” only after it crosses mucosa into blood or lymph. OpenStax: mouth and anus open to the outside; absorption is the border crossing.

Grades match the repo: ✓ robust physiology · ~ range · ⚠ contested · ◈ model · ✗ cartoon.

---

## How to read this

Each system has four rows:

| Row | Meaning |
|---|---|
| **Gut → them** | What digestion / food sends |
| **Them → gut** | What they send back (the other direction is real) |
| **This meal** | Minutes to hours |
| **This pattern** | Weeks to years — only light this if the user says “every day” |

The digestive app’s fourth view is **Exchange** (imports *and* exports), beside Anatomy / Imaging / Chemistry. Streams run both ways. Click a system to isolate its pipes. Those chips are the future apps.

---

## Who is eating?

The digestive system does **not** eat. It **receives**. Eating is a whole-body act that ends when food crosses the lips.

| Job | Who owns it | Grade |
|---|---|---|
| “I’m hungry” | Nervous (hypothalamus) listening to ghrelin (stomach), leptin (fat), glucose, stretch | ✓ |
| Decide to eat, find food, bring it to the mouth | Nervous + musculoskeletal (hands, arms) | ✓ |
| Smell / see / remember food → drool, acid starts | Nervous **cephalic phase** → salivary glands + stomach. Pavlov is real. | ✓ |
| Bite, chew, tongue | Skeletal (teeth) + musculoskeletal (masseter, tongue) + nervous (CN V, VII, XII) | ✓ |
| Taste | Nervous (CN VII, IX, X). The tongue is a sensor, not a stomach. | ✓ |
| Swallow | Nervous swallow reflex + skeletal muscle (pharynx, upper esophagus) then smooth muscle | ✓ |
| Don’t inhale the sandwich | Respiratory (epiglottis) sharing the throat with digestive | ✓ |
| Everything after the bolus is in the esophagus | Digestive | ✓ |

So: **nervous system wants it, musculoskeletal delivers it, skeletal breaks it, respiratory keeps the airway, digestive processes what arrived.** No single BODY app is “the eater.” The digestive app starts at the plate-to-mouth handoff and must show those other systems lighting *before* the first peristaltic wave.

Cephalic phase is the proof of imports: you can start gastric acid **without food in the stomach**, from brain signals alone. NIDDK: see or smell food → salivary glands. ✓

---

## Imports (other systems → gut)

Most of the fluid in the tract on a given day **did not come from the glass**. Textbooks put ~**8–9 L/day** through the lumen: ~**2 L** oral intake + ~**6–7 L** secreted from blood into the tube, then ~98% reabsorbed, ~100–200 mL lost in stool. Exact liters vary by book (~). Direction is ✓.

| Source (typical textbook band) | ~L/day | What it is |
|---|---|---|
| Drink + food water | ~1.5–2 | The only import from **outside** the body |
| Saliva | ~1–1.5 | Water, mucus, amylase, lipase — from blood via salivary glands |
| Gastric juice | ~1.5–2.5 | HCl, pepsinogen, IF, mucus — parietal/chief cells pulling from plasma |
| Bile | ~0.5–1 | Liver product: bile salts + **bilirubin from dead red cells** |
| Pancreatic juice | ~1–2.5 | HCO₃ + enzymes — from blood via pancreas |
| Small-bowel secretions | ~1–3 | Mucus, water, electrolytes, enzymes |
| Colon | small | Mucus; most of the job is taking water *back* |

**The gut is a recirculating pump, not a one-way drain.** Blood → juices → lumen → absorb → blood. Diarrhea is that loop failing (export of *imported* water).

### Import packets by system

| From | What the gut takes | If it stops |
|---|---|---|
| **Outside world** | Food, drink, swallowed air | Nothing to digest. This is not another body system. |
| **Circulatory** | O₂, water, Na/K/Cl/HCO₃ for juices, glucose/glutamine to fuel the wall, clotting factors if we bleed, immune cells | Gut wall is expensive tissue; ischemia kills bowel fast. No plasma → no acid, no bile, no enzymes. |
| **Nervous** | Chew/swallow commands, cephalic phase, vagal “rest and digest,” sympathetic brake, ENS local reflexes | Ileus, dry mouth, no swallow, no hunger |
| **Endocrine** | Thyroid tone on motility, cortisol, insulin (after absorption, storage), plus the gut’s *own* hormones looping back | Hypothyroid constipation is a real clinic pattern |
| **Immune** | Recruited cells, secretory IgA production machinery | Barrier fails; or overreacts (celiac, IBD, allergy) |
| **Musculoskeletal** | Mastication, tongue, sitting upright, abdominal press for defecation | Pureed diet / constipation from immobility |
| **Skeletal** | Teeth; bony protection; calcium store the gut later restocks | Can’t chew |
| **Respiratory** | O₂; a clear airway so the swallow is legal | Aspiration |
| **Urinary** | **1,25-OH vitamin D** — the hormone that tells duodenum to absorb calcium | Kidney failure → gut calcium absorption falls even if diet is fine |
| **Skin** | Vitamin D precursor (sun) that liver then kidney activate | Same calcium loop |
| **Heme / spleen / marrow** | Bilirubin from broken-down RBCs, dumped into bile | No brown stool pigment; jaundice if the dump backs up |
| **Colon microbes** | Butyrate and other SCFA — **colonocytes eat this as fuel** | Starved colon lining in some models; not a cartoon “probiotic glow” |

### The gut also eats

Enterocytes (small bowel) run on **glutamine** and glucose from the blood and from what they are absorbing. Colonocytes prefer **butyrate** made by bacteria from leftover carb. So part of every meal is spent **keeping the factory itself alive**, not shipped to muscle. ✓ direction; don’t put a calorie pie chart on screen in V1 unless we source the fractions.

Epithelium turns over in **days**. That shed cell mass is an import-then-export: amino acids from blood → new mucosa → cells slough into the lumen → some get re-digested. The stool includes leftover diet **plus** you. ✓

---

## Master map

```
OUTSIDE WORLD ── food, drink, air ──► MOUTH
OTHER SYSTEMS ── hunger, hands, teeth, chew, swallow ──► MOUTH

BLOOD ── O2, water, salts, glutamine ──► gut wall + glands
BLOOD ── 6–7 L juices/day ──► LUMEN (still “outside”)
NERVES / HORMONES ── commands ──► motility + secretion
DEAD RED CELLS ── bilirubin ──► bile ──► LUMEN
KIDNEY + SKIN ── activated vitamin D ──► calcium absorption
MICROBES ── butyrate ──► colonocytes

                    ┌─ the wall itself (glutamine, butyrate)
LUMEN ── absorb ───┤
                    ├─ portal vein ──► liver ──► heart ──► tissues
                    └─ lacteals ──► lymph ──► blood

leftover ──► colon ──► stool (~0.1–0.2 L water) + gas
```

OpenStax Table 23.1 is this import column. Exports are the rest of this file. Both arrows on screen.

---

## 1. Circulatory (heart, vessels, blood)

The gut’s delivery truck. During rest-and-digest, about **one-fourth of each heartbeat’s blood** is aimed at the intestines. ✓ (OpenStax)

### Gut → circulatory

| Packet | Route | What the heart/blood do with it |
|---|---|---|
| Glucose, galactose, fructose | Portal vein → liver → hepatic veins → vena cava | Fuel; liver gates how much glucose hits the rest of you |
| Amino acids | Same portal path | Protein synthesis, glucose if needed, urea leftover |
| Water + Na⁺ / K⁺ / Cl⁻ | Portal and systemic | Blood volume, pressure, cell osmolarity |
| Iron | Duodenum → blood on transferrin | Hemoglobin. No iron in the meal → no new red-cell pigment |
| B12 + intrinsic factor | Terminal ileum | Red-cell maturation. No IF (pernicious anemia) → B12 never boards |
| Folate | Small bowel | DNA synthesis in marrow |
| Vitamin K (diet + colonic bacteria) | Lymph / blood | Clotting factors the liver makes |
| Alcohol | Portal vein, first-pass in liver | Direct vasodilator / depressant after that |

Fats skip the portal vein on purpose. See lymphatic.

### Circulatory → gut

Arteries (celiac, superior and inferior mesenteric) bring oxygen so the gut wall can work. Hepatic portal veins then **do not go to the heart first** — they dump into the liver. That is why a meal can intoxicate the liver before it intoxicates the brain. ✓

Postprandial hyperemia: vessels to the gut dilate after eating. You feel it as warmth, sleepiness, “blood left my brain” — the last is folklore; brain perfusion is protected. ⚠

### This meal

- Sugar load → blood glucose rise → pancreas (endocrine) answers with insulin.
- Salt + water load → volume up for a few hours.
- Big meal → splanchnic blood flow up, heart works a bit harder.
- Alcohol → portal concentration high, systemic later.

### This pattern

- Chronic high salt → blood-pressure signal (population, not one pretzel).
- Iron-poor pattern → anemia, then the gut itself gets ischemic-looking and tired.
- Saturated fat / ultra-processed pattern → atherogenic risk is epidemiology, not a clog you can draw in the intestine. ⚠ for mechanism cartoons; association is real enough to show as a long-term badge.

### Visual

Portal vein as a dark stream leaving the small bowel toward the liver. Pulse it when absorption is on. Heart icon only after the liver. Iron packets tagged to marrow/RBC. **Do not draw French fries in a coronary artery.** ✗

### Handoff to `apps/circulatory`

Glucose, amino-acid, iron, volume, and alcohol packets. The heart app should already know what a meal did to splanchnic flow.

---

## 2. Lymphatic (lacteals, thoracic duct)

Fat’s private tunnel so a greasy meal does not flood the portal vein with oil.

### Gut → lymph

Triglycerides are emulsified by bile, cut by pancreatic lipase, packed into **micelles**, rebuilt inside enterocytes into **chylomicrons**, and sent into **lacteals** in each villus. They join lymph, climb to the **thoracic duct**, and empty into the left subclavian vein — then the heart. Fat-soluble vitamins A, D, E, K ride the same cab. ✓

No bile or no lipase → fat stays in the lumen → pale, greasy, floating stool (steatorrhea) and those vitamins never arrive. ✓ mechanism (cystic fibrosis, bile-duct stone).

### Lymph → gut

Mesenteric lymph nodes sit on the same pipes. They are immune, not digestive, but they sample what just crossed.

### This meal

A fatty meal makes the lymph look milky (chyle). In the app, lacteals glow cream after pizza, stay clear after rice.

### Visual

Villus cutaway: capillary (sugars/amino acids, red) vs lacteal (fat, cream). Then a path up the thoracic duct, not through the liver.

### Handoff to immune / lymphatic app

Chylomicron particles + mesenteric node sampling.

---

## 3. Nervous (brain, spinal cord, enteric nervous system)

The gut has its own nervous system. It is not a second brain that thinks thoughts. ✗

### What is actually there

- **Enteric nervous system (ENS):** on the order of **100 million** neurons in the gut wall (OpenStax). Myenteric (Auerbach) plexus → motility. Submucosal (Meissner) plexus → secretions. ✓
- **Vagus + sympathetics:** rest-and-digest vs fight-or-flight. Sympathetic tone slows gut; parasympathetic speeds it. ✓
- **Seeing/smelling food** → brain → salivary glands (“mouth waters”) before the first chew. ✓ NIDDK
- **Stretch** of stomach and intestine → ENS + vagus → fullness.

### Gut serotonin is real. Mood-serotonin from lunch is the cartoon.

About **90–95% of the body’s serotonin (5-HT)** is made in the gut, mostly by **enterochromaffin cells**, not by “happy bacteria” directly. Microbes can *stimulate* those cells (mouse work, Caltech/Hsiao). ✓ amount; ⚠ for human mood.

**Gut 5-HT does not cross the blood–brain barrier.** Brain serotonin is made in the brain from tryptophan. Gut serotonin runs motility, secretion, nausea, and local immune cells. SSRIs have GI side effects because the gut is full of 5-HT receptors — that is the honest link. ✗ “beans = instant happiness via gut serotonin”

Tryptophan in food *can* affect brain 5-HT synthesis, but it competes with other large amino acids; a turkey-dinner coma is mostly **meal size + insulin + circadian**, not tryptophan magic. ⚠

### Gut → brain (real signals)

| Signal | What it does | Grade |
|---|---|---|
| Vagus afferents | Stretch, nutrients, some microbial metabolites | ✓ |
| CCK, GLP-1, PYY | Satiety, slow gastric emptying | ✓ |
| Ghrelin (empty stomach) | Hunger | ✓ |
| GLP-1 / GIP | Incretins → insulin (see endocrine) | ✓ |
| Nausea / 5-HT3 | Vomiting reflex | ✓ |
| SCFA, immune cytokines | Research hot zone for mood/cognition | ⚠ |

### Brain → gut

Stress, fear, and pain change motility and secretion the same day (diarrhea before a talk, constipation in chronic stress). ✓ qualitative. Magnitude is individual. ~

### This meal

- Smell → saliva.
- Stretch → “I’m full” (lag: liquids stretch less for calories than solids).
- Capsaicin / spice → pain fibers, sweating, sometimes faster transit.
- Alcohol / caffeine → CNS first, gut motility as a side effect.

### This pattern

“Gut-brain axis” as a phrase is real anatomy. Using it to sell probiotics for depression is ⚠. The digestive app shows the wiring. It does not diagnose anxiety as a microbiome problem.

### Visual

ENS as a mesh in the gut wall (dim until zoom). Vagus as a cable to the brainstem. When a meal hits, satiety hormones tag the brain icon. Caption: **most serotonin is gut-made; it stays in the gut.**

### Handoff to `apps/nervous`

Vagus traffic, ENS, satiety hormones, 5-HT locality. Brain app must refuse the mood cartoon or the two apps will contradict.

---

## 4. Endocrine (hormones, pancreas islets, thyroid, adrenals)

Digestion is hormone-driven as much as enzyme-driven.

### Gut / meal → endocrine

| Hormone | From | Trigger | Effect |
|---|---|---|---|
| Gastrin | Stomach G cells | Food, stretch, protein | Acid + pepsin up |
| Somatostatin | D cells | Acid high | Brakes gastrin |
| CCK | Duodenal I cells | Fat, protein | Bile squeeze, pancreatic enzymes, satiety, gallbladder |
| Secretin | S cells | Acid in duodenum | Pancreatic bicarbonate |
| GIP | K cells | Glucose, fat | Insulin (incretin), slows gastric emptying |
| GLP-1 | L cells (distal ileum/colon) | Nutrients | Insulin, satiety, slower emptying |
| PYY | L cells | Meal, especially protein/fat | Satiety |
| Motilin | M cells | Fasting | Migrating motor complex (housekeeping waves) |
| Insulin / glucagon | Pancreatic islets | Blood glucose after absorption | Storage vs release |
| Ghrelin | Stomach | Empty | Hunger |

✓ textbook (StatPearls GI physiology, NIDDK).

Iodine in food → thyroid hormone. No iodine, gut can be perfect, thyroid still fails. Calcium absorption needs **activated vitamin D** (kidney finishes the activation). So a “bone meal” is gut + skin sun + kidney.

### Endocrine → gut

Insulin does not digest food; it decides where the absorbed glucose goes (muscle, fat, liver glycogen). Diabetes is an endocrine disease that *shows up* as urine sugar and as long-term vessel damage, not as a broken intestine. Do not animate diabetes as “food rotting in the gut.” ✗

### This meal

- Refined starch/sugar → fast glucose → big insulin.
- Intact fiber matrix → slower curve.
- Fat/protein → CCK, slower stomach, more satiety per calorie (typical, not magic).

### This pattern

- Repeated glucose spikes → insulin-resistance risk (epidemiology).
- Protein pattern → thyroid/iodine and calorie availability affect reproductive hormones (see reproductive).

### Visual

Hormone pulses as colored rings at the organ that secretes them, then a dashed line to the target (gallbladder for CCK, islets for GLP-1). Pancreas shown as **two organs in one**: duct (digestive enzymes) vs islets (insulin).

### Handoff to `apps/endocrine`

Incretin packet, iodine, glucose curve, CCK/secretin. The pancreas must appear in both apps without duplicating the duct vs islet story wrongly.

---

## 5. Immune (GALT, IgA, oral tolerance)

The gut is a **thin absorbent surface** facing more foreign antigen than any other organ. It must let nutrients through and keep microbes in the lumen. That is the job.

### What to say (and not say)

- GALT (Peyer patches, isolated lymphoid follicles, appendix, mesenteric nodes, intraepithelial lymphocytes) is the **largest mucosal immune organ**. NASPGHAN: largest immune tissue in the body, chronically sampling microbiota. ✓ as “biggest mucosal site”
- The slogan **“70% of the immune system is in the gut”** is repeated in reviews and Wikipedia-style pages, usually **without a primary count**. A comparative paper (Ganusov & De Boer, 2007) estimated only **~5–20% of lymphocytes** live in the gut; spleen and nodes are huge. Treat 70% as ◈ / ⚠ slogan. We say: **the gut is the largest place the immune system meets food and bacteria.** We do not put “70%” on screen unless we find a better primary.

### Gut → immune

| Event | Effect |
|---|---|
| Secretory IgA into mucus | Coats microbes, keeps them off the wall |
| Sampling through M cells (Peyer patches) | Learn friend vs foe |
| Oral tolerance | Why eating proteins does not usually cause systemic allergy |
| Pathogen / toxin | Inflammation, diarrhea (flush), fever (systemic cytokines) |
| Food allergy (IgE) | Histamine, hives, anaphylaxis — immune, not “indigestion” |
| Celiac (gluten + HLA) | Immune attack on mucosa — malabsorption follows | 

Microbiome educates Treg / Th17 balance. Mechanism ✓ in animals; using it to explain every human disease is ⚠.

### Immune → gut

Inflammation flattens villi (celiac) or ulcerates (IBD) → the digestive sim’s absorption **drops**. Infections increase motility (diarrhea as defense). ✓

### This meal

Most meals: quiet IgA, no drama. A known allergen: mast cells, not extra pepsin. Do not draw spicy food as “inflammation” unless we mean actual gastritis. ✗

### This pattern

Diverse plants → more microbial substrates → usually a more diverse microbiota (association). Ultra-processed-heavy patterns associate with worse inflammatory markers in umbrella reviews — confounding is real. ⚠

### Visual

Peyer patches as visible plaques in the ileum on zoom. A translucent “sampling” flicker, not a war scene, on a normal meal. Allergen preset later, off by default.

### Handoff to `apps/immune`

Antigen load, IgA, oral tolerance vs allergy vs celiac as three different arrows — never one “leaky gut” bucket. ✗ leaky gut as a catch-all

---

## 6. Respiratory

Share the throat. Then they mostly ignore each other until metabolism.

### Gut → respiratory

| Link | Reality |
|---|---|
| Epiglottis | Food must not enter the trachea. Swallow animation is a respiratory event. ✓ |
| CO₂ | Burning absorbed fuel produces CO₂ the lungs dump. ✓ boring, true |
| Abdominal gas / distension | Can splint the diaphragm, shallow breathing after a huge meal. ~ |
| Aspiration | Pathology. Optional later. |
| H. pylori / reflux → cough | Extra-esophageal reflux is a real clinic entity; don’t make every burp a lung disease. ⚠ |
| Microbiome–asthma | Research. ⚠ |

Methane/hydrogen from the colon are **exhaled in small amounts** (breath tests for lactose / oro-cecal transit). So the lung is a sensor for gut fermentation. ✓ clinical test; tiny volumes.

### Respiratory → gut

Oxygen for the metabolically expensive gut wall. Mouth breathing vs chewing is not a digestive system. Skip.

### Visual

Epiglottis as a hard cut between two pipes. After absorption, a faint CO₂ tag on the lungs. Breath-hydrogen meter when beans hit the colon — same physics as the diagnostic test.

### Handoff to `apps/respiratory`

Swallow safety + metabolic CO₂ + hydrogen breath as an easter egg.

---

## 7. Musculoskeletal (bone, muscle, joints)

The gut does not move the skeleton. It ships the parts.

### Gut → musculoskeletal

| Nutrient | Use | If it never absorbs |
|---|---|---|
| Protein / amino acids | Muscle protein turnover | Sarcopenia over months, not one missed steak |
| Calcium | Bone mineral | Gut absorbs; vitamin D / PTH / kidney decide the rest |
| Phosphate, magnesium | Bone + muscle ATP | |
| Vitamin D (dietary) | Helps gut absorb calcium | Skin makes most D for many people |
| Vitamin C | Collagen cross-links | Scurvy is a gut-supply failure |
| Vitamin K | Bone proteins + clotting | |
| Energy (glucose, fat) | Muscle work, thermogenesis | |

Stomach acid helps **mineral ionization** (iron, some calcium salts). Low acid (PPI, old age) can worsen those absorptions. ✓ mechanism, size varies.

### Musculoskeletal → gut

Chewing is skeletal muscle + TMJ. Abdominal wall protects viscera. Exercise tends to speed transit in many people (qualitative). ~

### This meal

Protein starts as peptides in the stomach, amino acids in the blood in hours, muscle incorporation is not a cartoon “food flying into biceps.” Show the amino-acid packet leaving the liver. ◈

### This pattern

- Protein + loading exercise → muscle (need the endocrine/muscle app later).
- Low calcium / D / calorie → bone mass. Epidemiology + physiology.
- High oxalate + low calcium meals → more oxalate to the kidney (see urinary), not to the bone.

### Visual

After absorption, calcium tags the skeleton, amino acids tag muscle. Delayed, not instant. Bone glow is a **pattern** mode.

### Handoff to `apps/musculoskeletal`

Amino acids, Ca, D, C, energy. Chewing mechanics belong in both mouth (digestive) and jaw (msk).

---

## 8. Urinary (kidneys, bladder)

The kidney is the downstream accountant of everything the gut absorbed and the liver transformed.

### Gut → urinary

| Leftover | Path |
|---|---|
| Water | Absorbed in bowel → blood volume → kidney decides urine volume |
| Sodium, potassium | Same |
| Urea | Amino-acid nitrogen → liver urea cycle → kidney |
| Creatinine | Muscle, not gut, but protein meals can nudge it |
| Oxalate | Spinach, nuts, chocolate → urine stones in susceptible people |
| Urate | Purines (meat, beer) → gout risk in susceptible people |
| Glucose | Only in urine if blood glucose exceeds the renal threshold (endocrine failure), not because the gut “dumped sugar in the bladder” |

Vitamin D: skin or diet → liver 25-OH → **kidney 1,25-(OH)₂** → gut calcium absorption. A three-organ loop. ✓

### Urinary → gut

Activated vitamin D is the main hormone telling the duodenum to absorb calcium. Kidney failure → gut calcium absorption falls even if the diet is fine.

### This meal

- Water load → later urine (not instantly).
- Protein load → later urea.
- Beer → water + alcohol diuresis (endocrine ADH suppression) — kidney, not colon.

### Visual

A thin stream from liver to kidneys labeled urea after a steak. Water meter split: colon reabsorb vs kidney excrete. Do not draw urine being made in the intestine. ✗

### Handoff to `apps/urinary`

Water, Na, urea, oxalate, urate, vitamin D loop.

---

## 9. Integumentary (skin, hair, nails)

Skin is a billboard for gut-supplied nutrients and for liver failure — not a digestive organ.

### Gut → skin

| Supply | Skin sign if missing / failing |
|---|---|
| Protein, zinc, essential fatty acids | Poor wound healing, hair |
| Vitamin A | Follicular hyperkeratosis; also toxicity from too much |
| Vitamin C | Bleeding gums, poor collagen |
| Niacin | Pellagra (4 Ds) — historical, still the physiology |
| B12 / folate / iron | Pallor |
| Liver can’t clear bilirubin | Jaundice (yellow) — accessory digestive organ, not the colon |

Fat malabsorption → fat-soluble vitamin skin/eye problems. ✓

Gut-skin “axis” as acne-from-microbiome is ⚠. Show nutrients and jaundice. Leave influencer dermatology out.

### Skin → gut

Sunlight → vitamin D → (liver, kidney) → calcium absorption. The digestive app should credit the skin when vitamin D is the bottleneck.

### Visual

Optional “deficiency poster” in pattern mode. Jaundice only if we simulate liver backup — off in V1 healthy model.

---

## 10. Reproductive

Energy and micronutrients, not a second gut.

### Gut → reproductive

- **Energy availability** (calories absorbed over weeks) gates hypothalamic GnRH. Starvation and extreme leanness shut cycles down. ✓
- **Folate** before/early pregnancy → neural tube. Gut must absorb it.
- **Iodine, iron, DHA** → fetal/thyroid/brain supply.
- **Zinc** → sperm production among other roles.
- **Alcohol** → teratogen; also hits liver and gonadal hormones.
- Body fat → estrogen (adipose conversion) — endocrine, fed by gut calories. ⚠ to oversimplify.

The gut does not “send food to the uterus.” It fills the blood; the placenta takes from blood.

### This meal vs pattern

One dinner does not change fertility. Pattern mode only. Extreme: alcohol this night is a this-meal toxin for a fetus — if we ever have a pregnancy toggle, treat it as toxicology, not nutrition.

### Handoff to `apps/reproductive`

Folate, energy-availability flag, alcohol, iodine. No food-as-aphrodisiac table. ✗

---

## 11. Liver: digestive organ and whole-body switchboard

The liver is in the digestive set (bile) and in everyone’s business after absorption.

| Job | System it actually serves |
|---|---|
| Bile | Fat digestion (gut) |
| First-pass nutrients | Circulatory gate |
| Glycogen / glucose | Nervous (brain fuel), endocrine |
| Amino acid → urea | Urinary |
| Clotting factors + vit K | Circulatory |
| Bilirubin from dead RBCs | Integument (jaundice if backed up) |
| Detox / drugs / alcohol | Everything |
| First-pass microbes/toxins | Immune |

“Detox juice cleans the liver” is ✗. The liver detoxes the juice.

### Visual

Every portal packet stops in the liver before the heart. Bile goes the other way, down the ducts, only when fat is in the duodenum.

---

## 12. Microbiome: not a body system, but a coupling layer

Colonic microbes turn what **you** could not digest into:

- **Gas** (H₂, CO₂, CH₄) → gut distension, flatus, hydrogen breath
- **Short-chain fatty acids** (acetate, propionate, butyrate) → colonocyte fuel (butyrate is ✓ local); systemic metabolic effects ⚠ in size
- **Vitamin K and some B vitamins** → blood
- **Secondary bile acids** → reabsorbed, affect metabolism ⚠
- Immune education → immune app

They do not “eat your steak.” Protein leftover can make sulfurous smells. They eat **your leftovers**, especially fermentable carbs.

Germ-free mice have less gut serotonin (Caltech). Translating that to a probiotic mood claim is ⚠.

---

## 13. What a meal exports (the food-engine contract)

When the food engine finishes a meal, it should emit packets, not vibes:

```
exports: [
  { id: 'glucose', via: 'portal', to: ['liver', 'circulatory', 'nervous', 'musculoskeletal', 'endocrine'] },
  { id: 'amino-acids', via: 'portal', to: ['liver', 'musculoskeletal', 'integumentary'] },
  { id: 'chylomicrons', via: 'lymph', to: ['circulatory', 'adipose', 'muscle'] },
  { id: 'water-electrolytes', via: 'portal', to: ['circulatory', 'urinary'] },
  { id: 'iron', via: 'portal', to: ['marrow', 'circulatory'] },
  { id: 'b12', via: 'ileum-portal', to: ['marrow', 'nervous'] },
  { id: 'calcium', via: 'duodenum-portal', to: ['musculoskeletal'], needs: 'vit-d-kidney' },
  { id: 'urea', via: 'liver', to: ['urinary'] },
  { id: 'co2', via: 'metabolism', to: ['respiratory'] },
  { id: 'scfa', via: 'colon', to: ['colonocytes', 'liver'] },
  { id: 'h2', via: 'colon', to: ['flatus', 'respiratory-breath-test'] },
  { id: 'glp1', via: 'endocrine', to: ['pancreas-islets', 'nervous-satiety'] }
]
```

Short-term panel lists packets that moved **this meal**. Long-term panel lists systems that would change **if this were the diet**.

---

## 14. Cartoons this map forbids

| Cartoon | Why it dies |
|---|---|
| Food glows inside arteries on a plain x-ray | Not how imaging or absorption works |
| Gut serotonin = mood | Wrong compartment; no BBB crossing |
| 70% of immunity lives in the gut | Unsourced slogan; say “largest mucosal immune site” |
| Liver “flushed” by a juice cleanse | Liver metabolizes the juice |
| One food flies into a muscle or a uterus | Blood is the middleman |
| Brain starves because blood went to the stomach | Splanchnic flow rises; cerebral flow is kept |
| Leaky gut as the cause of everything | Not a diagnosis we will ship |
| Microbiome as a personality | Overclaim |
| The digestive system “eats” | It receives. Nervous + musculoskeletal eat. |
| All lumen fluid came from the glass | Most of it was secreted from blood, then taken back |

---

## 15. Digestive-app UI

**Exchange view** (toggle **Imports** / **Exports** / **Both**)

- Default **Both**: faint arterial inflow + juice secretion into the lumen; portal + lacteal leaving.
- **Imports on**: hungry hypothalamus, hands-to-mouth, teeth, cephalic drool, arterial pulse into glands, ~liters of juice appearing in the lumen *before* much of the meal has arrived, bilirubin into bile, vitamin D tag from skin/kidney.
- **Exports on**: villus split (red capillary vs cream lacteal), system chips lighting as packets land.
- System chips: Circulatory, Lymph, Nervous, Endocrine, Immune, Respiratory, Muscle/Bone, Urinary, Skin, Reproductive. Hover = one sentence. Click = that system’s streams + “opens in BODY / {system} later.”
- Caption on first swallow: **the gut did not decide to eat.**
- Breath-hydrogen and satiety/vagus on by default; reproductive and jaundice are pattern/pathology.

**Inspector copy** is this file, shortened, with grades on the claims that influencers get wrong (serotonin, 70%, detox).

---

## 16. Build order for the series

The digestive app is a factory **and** a customer. Other apps are both suppliers and destinations.

1. Digestive Phase 4 emits `imports[]` and `exports[]`.
2. Circulatory is next because most packets hit blood second.
3. Endocrine rides the same glucose curve.
4. Nervous needs the “serotonin stays here” caption before anyone else invents a mood gut.
5. Urinary is the urea/water sequel.
6. Immune is GALT + allergy/celiac as optional packs.
7. The rest can mount on the same packet bus.

If two apps ever disagree about a packet, this file wins until a better primary source moves the grade.
