const FOODS = [
	{
		id: 'water',
		name: 'Water',
		serving: '250 ml',
		servingG: 250,
		macros: { water: 250, protein: 0, fat: 0, carb: 0, fiber: 0, addedSugar: 0 },
		fiber: { soluble: 0, insoluble: 0 },
		fodmap: { lactose: 0, fructoseExcess: 0, fructans: 0, gos: 0, polyols: 0 },
		flags: ['liquid'],
		chew: 'liquid',
		gastricEmptying: 'fast',
		color: '#7eb6d9',
		ingredients: [{ id: 'water', name: 'Water', g: 250 }]
	},
	{
		id: 'white-rice',
		name: 'White rice',
		serving: '1 cup cooked',
		servingG: 158,
		macros: { water: 108, protein: 4.3, fat: 0.4, carb: 44.5, fiber: 0.6, addedSugar: 0 },
		fiber: { soluble: 0.1, insoluble: 0.5 },
		fodmap: { lactose: 0, fructoseExcess: 0, fructans: 0, gos: 0, polyols: 0 },
		flags: ['starch'],
		chew: 'soft',
		gastricEmptying: 'neutral',
		color: '#e8dcc8',
		ingredients: [{ id: 'rice-starch', name: 'Cooked rice starch', g: 158 }]
	},
	{
		id: 'oats',
		name: 'Oatmeal',
		serving: '1 cup cooked',
		servingG: 234,
		macros: { water: 197, protein: 5.9, fat: 3.6, carb: 28.1, fiber: 4.0, addedSugar: 0 },
		fiber: { soluble: 1.8, insoluble: 2.2 },
		fodmap: { lactose: 0, fructoseExcess: 0, fructans: 0, gos: 0, polyols: 0 },
		flags: ['starch', 'whole-grain'],
		chew: 'soft',
		gastricEmptying: 'neutral',
		color: '#c4a574',
		ingredients: [{ id: 'oat', name: 'Oats + water', g: 234 }]
	},
	{
		id: 'black-beans',
		name: 'Black beans',
		serving: '½ cup cooked',
		servingG: 86,
		macros: { water: 57, protein: 7.6, fat: 0.5, carb: 20.4, fiber: 7.5, addedSugar: 0 },
		fiber: { soluble: 2.0, insoluble: 5.5 },
		fodmap: { lactose: 0, fructoseExcess: 0, fructans: 0, gos: 3, polyols: 0 },
		flags: ['legume'],
		chew: 'dense',
		gastricEmptying: 'neutral',
		color: '#2a1f1a',
		ingredients: [{ id: 'bean', name: 'Black beans (GOS + fiber)', g: 86 }]
	},
	{
		id: 'broccoli',
		name: 'Broccoli',
		serving: '1 cup chopped',
		servingG: 91,
		macros: { water: 81, protein: 2.6, fat: 0.3, carb: 6.0, fiber: 2.4, addedSugar: 0 },
		fiber: { soluble: 0.4, insoluble: 2.0 },
		fodmap: { lactose: 0, fructoseExcess: 0, fructans: 2, gos: 0, polyols: 0 },
		flags: ['crucifer'],
		chew: 'crunch',
		gastricEmptying: 'neutral',
		color: '#3d7a45',
		ingredients: [{ id: 'broccoli', name: 'Broccoli (fiber + fructans)', g: 91 }]
	},
	{
		id: 'apple',
		name: 'Apple',
		serving: '1 medium',
		servingG: 182,
		macros: { water: 156, protein: 0.5, fat: 0.3, carb: 25.1, fiber: 4.4, addedSugar: 0 },
		fiber: { soluble: 1.5, insoluble: 2.9 },
		fodmap: { lactose: 0, fructoseExcess: 2, fructans: 0, gos: 0, polyols: 2 },
		flags: ['fruit'],
		chew: 'crunch',
		gastricEmptying: 'neutral',
		color: '#c45a4a',
		ingredients: [
			{ id: 'apple-flesh', name: 'Flesh (fructose + water)', g: 160 },
			{ id: 'apple-skin', name: 'Skin (fiber)', g: 22 }
		]
	},
	{
		id: 'milk',
		name: 'Whole milk',
		serving: '1 cup',
		servingG: 244,
		macros: { water: 215, protein: 8, fat: 8, carb: 12, fiber: 0, addedSugar: 0 },
		fiber: { soluble: 0, insoluble: 0 },
		fodmap: { lactose: 3, fructoseExcess: 0, fructans: 0, gos: 0, polyols: 0 },
		flags: ['liquid', 'dairy'],
		chew: 'liquid',
		gastricEmptying: 'fast',
		color: '#f2efe6',
		ingredients: [
			{ id: 'lactose', name: 'Lactose', g: 12 },
			{ id: 'milk-fat', name: 'Milk fat', g: 8 },
			{ id: 'milk-protein', name: 'Casein + whey', g: 8 }
		]
	},
	{
		id: 'steak',
		name: 'Steak',
		serving: '6 oz cooked',
		servingG: 170,
		macros: { water: 95, protein: 44, fat: 12, carb: 0, fiber: 0, addedSugar: 0 },
		fiber: { soluble: 0, insoluble: 0 },
		fodmap: { lactose: 0, fructoseExcess: 0, fructans: 0, gos: 0, polyols: 0 },
		flags: ['meat'],
		chew: 'dense',
		gastricEmptying: 'slow',
		color: '#7a2e2e',
		ingredients: [
			{ id: 'muscle-protein', name: 'Muscle protein', g: 44 },
			{ id: 'steak-fat', name: 'Fat', g: 12 }
		]
	},
	{
		id: 'pizza',
		name: 'Cheese pizza',
		serving: '1 slice',
		servingG: 107,
		macros: { water: 45, protein: 12, fat: 10, carb: 33, fiber: 2.5, addedSugar: 3 },
		fiber: { soluble: 0.6, insoluble: 1.9 },
		fodmap: { lactose: 1, fructoseExcess: 0, fructans: 2, gos: 0, polyols: 0 },
		flags: ['mixed', 'upf'],
		chew: 'dense',
		gastricEmptying: 'slow',
		color: '#d4a24c',
		ingredients: [
			{ id: 'crust', name: 'Wheat crust (starch + fructans)', g: 55 },
			{ id: 'cheese', name: 'Cheese (fat + lactose)', g: 30 },
			{ id: 'sauce', name: 'Tomato sauce', g: 22 }
		]
	},
	{
		id: 'cola',
		name: 'Cola',
		serving: '12 oz',
		servingG: 368,
		macros: { water: 330, protein: 0, fat: 0, carb: 39, fiber: 0, addedSugar: 39 },
		fiber: { soluble: 0, insoluble: 0 },
		fodmap: { lactose: 0, fructoseExcess: 1, fructans: 0, gos: 0, polyols: 0 },
		flags: ['liquid', 'carbonated', 'upf'],
		chew: 'liquid',
		gastricEmptying: 'fast',
		color: '#3b2218',
		ingredients: [
			{ id: 'hfcs', name: 'Added sugar', g: 39 },
			{ id: 'co2', name: 'Dissolved CO₂', g: 2 }
		]
	}
]

function foodById(id) {
	return FOODS.find((f) => f.id === id)
}

function mix(ids, options = {}) {
	const lactase = options.lactase !== false
	const sensitivity = options.sensitivity ?? 0.55
	const foods = ids.map(foodById).filter(Boolean)
	const macros = { water: 0, protein: 0, fat: 0, carb: 0, fiber: 0, addedSugar: 0 }
	const fiber = { soluble: 0, insoluble: 0 }
	const fodmap = { lactose: 0, fructoseExcess: 0, fructans: 0, gos: 0, polyols: 0 }
	const flags = new Set()
	const ingredients = []
	let color = '#e8dcc8'
	let chew = 'soft'
	foods.forEach((f) => {
		for (const k of Object.keys(macros)) macros[k] += f.macros[k]
		fiber.soluble += f.fiber.soluble
		fiber.insoluble += f.fiber.insoluble
		for (const k of Object.keys(fodmap)) fodmap[k] = Math.max(fodmap[k], f.fodmap[k])
		f.flags.forEach((flag) => flags.add(flag))
		ingredients.push(...f.ingredients)
		color = f.color
		if (f.chew === 'dense' || f.chew === 'crunch') chew = f.chew
		if (f.chew === 'liquid' && chew === 'soft') chew = 'liquid'
	})
	if (!foods.length) {
		return emptyMeal(lactase, sensitivity)
	}
	if (foods.length > 1) color = mixHex(foods.map((f) => f.color))
	const fermentable = fodmap.gos + fodmap.fructans + fodmap.polyols + fodmap.fructoseExcess + (lactase ? 0 : fodmap.lactose)
	const t50h = emptyingT50(macros, flags)
	const t50Complete = t50h * 1.7
	const siTransitH = 4.6
	const colonH = 32 - Math.min(8, fiber.insoluble * 1.1)
	const wholeGutH = t50h + siTransitH + colonH * 0.55
	const meal = {
		foods,
		ids,
		macros,
		fiber,
		fodmap,
		flags,
		ingredients,
		color,
		chew,
		lactase,
		sensitivity,
		fermentable,
		t50h,
		t50Complete,
		siTransitH,
		colonH,
		wholeGutH,
		carbonated: flags.has('carbonated'),
		glucose: glucoseShape(macros, fiber),
		satiety: satietyOf(macros, fiber)
	}
	meal.lessons = comboLessons(meal)
	return meal
}

function emptyMeal(lactase, sensitivity) {
	const macros = { water: 0, protein: 0, fat: 0, carb: 0, fiber: 0, addedSugar: 0 }
	return {
		foods: [],
		ids: [],
		macros,
		fiber: { soluble: 0, insoluble: 0 },
		fodmap: { lactose: 0, fructoseExcess: 0, fructans: 0, gos: 0, polyols: 0 },
		flags: new Set(),
		ingredients: [],
		color: '#e8dcc8',
		chew: 'soft',
		lactase,
		sensitivity,
		fermentable: 0,
		t50h: 2.7,
		t50Complete: 4.6,
		siTransitH: 4.6,
		colonH: 32,
		wholeGutH: 24,
		carbonated: false,
		glucose: 'low',
		satiety: 'none',
		lessons: []
	}
}

function emptyingT50(macros, flags) {
	const fatSlow = 1 + macros.fat / 28
	const liquidFast = flags.has('liquid') && macros.fat < 3 && macros.protein < 4 ? 0.35 : 1
	return clamp(2.7 * fatSlow * liquidFast, 0.25, 6.5)
}

function glucoseShape(macros, fiber) {
	const starch = Math.max(0, macros.carb - macros.fiber - macros.addedSugar)
	const brake = macros.fat + macros.protein + fiber.soluble * 4
	if (macros.addedSugar >= 20 && brake < 12) return 'spike'
	if (macros.carb >= 22 && brake >= 16) return 'blunted'
	if (macros.carb < 8) return 'low'
	if (starch >= 30 && macros.fiber < 2) return 'fast-starch'
	return 'steady'
}

function satietyOf(macros, fiber) {
	const score = macros.protein * 1.2 + macros.fat * 0.8 + fiber.soluble * 3 + fiber.insoluble * 1.5 + macros.water * 0.01
	if (score < 8) return 'thin'
	if (score < 28) return 'solid'
	return 'heavy'
}

function comboLessons(meal) {
	const ids = new Set(meal.ids)
	const lessons = []
	const solos = meal.foods.map((f) => emptyingT50(f.macros, new Set(f.flags)))
	const fastest = solos.length ? Math.min(...solos) : meal.t50h
	const names = meal.foods.map((f) => f.name).join(' + ')

	if (meal.foods.length > 1 && meal.t50h > fastest * 1.2) {
		lessons.push({
			id: 'together-linger',
			title: 'Together they linger',
			text: `Alone, the fastest item here would be half-gone from the stomach in ~${fastest.toFixed(1)} h. As one swallow, 50% emptying is ~${meal.t50h.toFixed(1)} h. Fat and protein in the mix hold the pylorus — everyone waits.`,
			better: 'That slower clock is why a mixed plate holds you longer than a sugary drink. The calories still all count.',
			grade: 'robust'
		})
	}

	if (ids.has('black-beans') && ids.has('white-rice')) {
		lessons.push({
			id: 'beans-rice',
			title: 'Beans + rice',
			text: 'Rice starch is quiet in the colon. Bean GOS is not — bacteria will make gas either way. Together they cover amino acids better than either alone, and the fiber + water help stool bulk.',
			better: 'A classic plate: plant protein, slower energy than rice solo, some gas as the price of the fiber.',
			grade: 'range'
		})
	}

	if (ids.has('pizza') && ids.has('cola')) {
		lessons.push({
			id: 'pizza-cola',
			title: 'Pizza + cola',
			text: 'Fat in the slice delays emptying. Cola is still ~39 g added sugar with no fiber. The sugar is not cancelled — it just arrives later, on top of refined starch.',
			better: 'If you want the slice, water instead of cola cuts the liquid-sugar dump. The pizza is already a mixed meal.',
			grade: 'robust'
		})
	}

	if (ids.has('cola') && meal.foods.length === 1) {
		lessons.push({
			id: 'cola-solo',
			title: 'Liquid sugar, no brakes',
			text: 'No chew, no fiber, almost no fat or protein. Stomach emptying is fast. The small bowel sees a sugar flood. Satiety is thin — you can drink a meal’s carbs without feeling fed.',
			better: 'Pair sugar with protein, fat, or fiber, or skip the drink. Water has no carb clock.',
			grade: 'robust'
		})
	}

	if (ids.has('steak') && meal.macros.fiber < 2) {
		lessons.push({
			id: 'steak-no-plant',
			title: 'Protein without bulk',
			text: 'Steak is slow: pepsin, fat, hours in the J. Almost no fiber, so the colon has little leftover to ferment or bulk. Stool prior leans drier.',
			better: 'Add broccoli, beans, apple, or oats. The plant is the colon’s job; the steak is the stomach’s.',
			grade: 'range'
		})
	}

	if (ids.has('steak') && (ids.has('broccoli') || ids.has('black-beans') || ids.has('apple') || ids.has('oats'))) {
		lessons.push({
			id: 'steak-plant',
			title: 'Meat + plant',
			text: 'Fat and protein keep this meal in the stomach longer. Fiber from the plant keeps moving once it hits the colon. That is a more complete digestive job than steak alone.',
			better: 'This is the “eat better” pattern on this plate: slow protein, some bulk, fewer empty hours.',
			grade: 'robust'
		})
	}

	if (ids.has('black-beans') && ids.has('broccoli')) {
		lessons.push({
			id: 'double-fodmap',
			title: 'Two fermentable plants',
			text: 'Bean GOS + broccoli fructans. The small bowel cannot finish them. Colon bacteria will. Gas here is leftover carbohydrate working, not a toxin.',
			better: 'Loud, not dangerous, in a typical adult. If you are mapping your own gut, this combo is a high-signal test.',
			grade: 'robust'
		})
	}

	if (ids.has('milk') && !meal.lactase) {
		lessons.push({
			id: 'lactose-off',
			title: 'Lactose with no lactase',
			text: 'Milk sugar stays in the lumen, pulls water, and ferments. Bristol prior goes looser. Beans still ferment even with lactase on — this is a different leftover.',
			better: 'Lactase-on milk is just protein, fat, and sugar absorbed. The toggle is a model of the enzyme, not a diagnosis.',
			grade: 'robust'
		})
	}

	if (ids.has('milk') && (ids.has('black-beans') || ids.has('steak'))) {
		lessons.push({
			id: 'calcium-iron',
			title: 'Calcium in the same swallow',
			text: 'Dairy calcium can compete with iron at the same meal. Heme iron in steak still absorbs better than bean iron. This is a timing nibble, not a reason to fear milk.',
			better: 'If you are eating for iron, a plant+meat plate without a big dairy pour at the same moment is the cautious pattern.',
			grade: 'range'
		})
	}

	if (ids.has('broccoli') && ids.has('black-beans') && !ids.has('steak')) {
		lessons.push({
			id: 'nonheme-c',
			title: 'Plant iron + broccoli',
			text: 'Non-heme iron in beans is picky. Vitamin C in broccoli helps that pathway. Still a model, still not a lab result.',
			better: 'A beans-and-green plate is doing more than “fiber.”',
			grade: 'range'
		})
	}

	if (ids.has('oats') && (ids.has('apple') || ids.has('white-rice') || ids.has('cola'))) {
		lessons.push({
			id: 'beta-glucan',
			title: 'Oat glue on the starch',
			text: 'Soluble oat fiber thickens the meal. Glucose from rice, apple, or cola has more brake than it would solo. Apple still brings polyols that the colon may notice.',
			better: 'This is how “slow carb” actually looks: not magic — viscosity and emptying.',
			grade: 'robust'
		})
	}

	if (meal.macros.fiber >= 3 && meal.macros.water < 80) {
		lessons.push({
			id: 'fiber-thirst',
			title: 'Fiber without water',
			text: 'Insoluble fiber wants water to bulk. Dry fiber plus fat can lean the Bristol prior harder, not softer.',
			better: 'Drink with the plants. Water on this plate is a nutrient for stool, not a garnish.',
			grade: 'range'
		})
	}

	if (meal.macros.fiber >= 3 && meal.macros.water >= 150) {
		lessons.push({
			id: 'fiber-water',
			title: 'Fiber + water',
			text: 'This is the bulk recipe: leftover plant + fluid. Colon transit model shortens a little. Stool prior toward a formed sausage.',
			better: 'A pattern, not one poop. Repeat meals like this, not one heroic apple.',
			grade: 'range'
		})
	}

	if (meal.glucose === 'spike') {
		lessons.push({
			id: 'glucose-spike',
			title: 'Fast glucose',
			text: 'High added sugar, weak protein/fat/fiber brakes. Emptying is quick. The portal vein sees a steep curve.',
			better: 'Add steak, oats, beans, or skip the liquid sugar. The model is teaching the brake, not a diet religion.',
			grade: 'robust'
		})
	}

	if (meal.glucose === 'blunted' && meal.foods.length > 1) {
		lessons.push({
			id: 'glucose-blunt',
			title: 'Same carbs, slower curve',
			text: 'There is still carbohydrate here — but fat, protein, or soluble fiber is sharing the swallow. Emptying and viscosity flatten the hit compared with the sugar or white starch alone.',
			better: 'This is the useful combo: not “no carbs,” but carbs that do not arrive as a flood.',
			grade: 'robust'
		})
	}

	if (ids.has('white-rice') && meal.foods.length === 1) {
		lessons.push({
			id: 'rice-solo',
			title: 'Quiet starch',
			text: 'Easy mush, little fiber, little ferment. Colon stays relatively quiet. Stomach is not delayed. Satiety is only so-so.',
			better: 'Rice plus beans or broccoli turns a fast starch into a meal.',
			grade: 'range'
		})
	}

	if (!lessons.length && meal.foods.length) {
		lessons.push({
			id: 'watch-the-clock',
			title: names || 'This plate',
			text: `Protein ${meal.macros.protein.toFixed(0)} g, fat ${meal.macros.fat.toFixed(0)} g, carb ${meal.macros.carb.toFixed(0)} g, fiber ${meal.macros.fiber.toFixed(1)} g. Stomach half-empty ~${meal.t50h.toFixed(1)} h. Whole-gut model ~${meal.wholeGutH.toFixed(0)} h.`,
			better: 'Click a second food. Combinations change the clock more than most people expect.',
			grade: 'model'
		})
	}

	return lessons.slice(0, 4)
}

function bristolOf(meal) {
	let type = 4
	if (meal.fiber.insoluble + meal.fiber.soluble >= 6 && meal.macros.water >= 80) type = 4
	else if (meal.macros.fiber < 1 && meal.macros.fat >= 10) type = 3
	if (meal.fermentable >= 3 && meal.sensitivity >= 0.4) type += 1
	if (!meal.lactase && meal.fodmap.lactose >= 2) type += 2
	if (meal.fodmap.polyols >= 2) type += 1
	if (meal.macros.fiber < 0.5 && meal.macros.water < 40 && meal.macros.fat >= 8) type -= 1
	return clamp(Math.round(type), 1, 7)
}

function gasOf(meal) {
	const swallowed = meal.flags.has('liquid') ? 0.4 : 0.8
	const fizz = meal.carbonated ? 2.2 : 0
	const ferment = meal.fermentable * 1.4 * meal.sensitivity
	return swallowed + fizz + ferment
}

function stateAt(meal, hours, phase) {
	if (phase && phase !== 'gut') return eatingState(meal, phase)

	const t = Math.max(0, hours)
	const stillStomach = Math.pow(0.5, t / meal.t50h)
	const emptied = 1 - stillStomach
	const siHead = Math.max(0, t - 0.35)
	const inSi = emptied * (1 - sigmoid((siHead - meal.siTransitH) / 0.8))
	const inColon = Math.max(0, emptied - inSi) * sigmoid((t - meal.t50h * 0.6 - meal.siTransitH * 0.5) / 2)
	const inRectum = inColon * sigmoid((t - (meal.t50h + meal.siTransitH + meal.colonH * 0.55)) / 4)

	let stage = 'stomach'
	if (t < 0.02) stage = 'esophagus'
	else if (stillStomach > 0.55) stage = 'stomach'
	else if (inSi > inColon) stage = t < meal.t50h + 1.2 ? 'duodenum' : 'jejunum'
	else if (inRectum > 0.45) stage = 'rectum'
	else stage = 'colon'

	const pH = {
		esophagus: 7,
		stomach: 2,
		duodenum: 6.2,
		jejunum: 6.8,
		ileum: 7.2,
		colon: 6.5,
		rectum: 7
	}[stage] ?? 6.5

	const appearance =
		stage === 'esophagus' ? 'bolus'
		: stage === 'stomach' ? 'chyme'
		: stage === 'duodenum' ? 'emulsified chyme'
		: stage === 'colon' || stage === 'rectum' ? 'forming stool'
		: 'intestinal contents'

	const bristol = bristolOf(meal)
	const gas = gasOf(meal)
	const fartNow = stage === 'colon' && gas >= 2.4 && t > meal.t50h + 3

	return {
		phase: 'gut',
		stage,
		hours: t,
		pH,
		appearance,
		stillStomach,
		inSi,
		inColon,
		inRectum,
		bristol,
		gas,
		fartNow,
		chemistry: chemistryLines(meal, stage),
		physics: physicsLines(meal, stage, t),
		biology: biologyLines(meal, stage),
		systems: systemLines(meal, stage, t),
		proofIds: proofIdsFor(stage, meal)
	}
}

function eatingState(meal, phase) {
	const stage = phase
	return {
		phase,
		stage,
		hours: 0,
		pH: phase === 'chew' ? 6.8 : 7,
		appearance: phase === 'swallow' ? 'bolus' : 'food',
		stillStomach: 1,
		inSi: 0,
		inColon: 0,
		inRectum: 0,
		bristol: bristolOf(meal),
		gas: meal.carbonated ? 1.5 : 0.3,
		fartNow: false,
		chemistry: chemistryLines(meal, stage),
		physics: physicsLines(meal, stage, 0),
		biology: biologyLines(meal, stage),
		systems: systemLines(meal, stage, 0),
		proofIds: proofIdsFor(stage, meal)
	}
}

function chemistryLines(meal, stage) {
	const starch = meal.macros.carb - meal.macros.fiber - meal.macros.addedSugar
	const lines = []
	if (stage === 'cephalic') {
		lines.push('No food in the lumen yet. Vagus is already telling salivary glands and parietal cells to start.')
		return lines
	}
	if (stage === 'chew') {
		lines.push(`Saliva pH ~6.7–7.0. Salivary amylase starts starch${starch > 2 ? ` (${starch.toFixed(0)} g carbohydrate in this bite)` : ''}.`)
		lines.push('Lingual lipase starts triglycerides. It keeps working in the stomach.')
		if (meal.chew === 'liquid') lines.push('Liquid: almost no mastication. Bolus is already swallowable.')
		return lines
	}
	if (stage === 'swallow' || stage === 'esophagus') {
		lines.push('Esophagus adds no enzymes. This is transport only.')
		lines.push('Lower esophageal sphincter must open, then close, or acid will reflux.')
		return lines
	}
	if (stage === 'stomach') {
		lines.push('Parietal HCl. Lumen pH ~1.5–3.5. Amylase dies. No meaningful carb digestion here.')
		if (meal.macros.protein > 1) lines.push(`Pepsin cuts protein (${meal.macros.protein.toFixed(0)} g) into peptides.`)
		if (meal.macros.fat > 2) lines.push(`Fat (${meal.macros.fat.toFixed(0)} g) slows emptying — liquids still leave first.`)
		lines.push('Only pieces ≲ 2 mm pass the pylorus during fed mixing.')
		return lines
	}
	if (stage === 'duodenum') {
		lines.push('Pancreatic bicarbonate lifts pH toward 6–7 so enzymes can work.')
		if (meal.macros.fat > 2) lines.push('CCK → gallbladder squeeze. Bile salts emulsify fat into micelles.')
		lines.push('Enterokinase → trypsin cascade. Pancreatic amylase, lipase, proteases.')
		return lines
	}
	if (stage === 'jejunum' || stage === 'ileum') {
		lines.push('Brush-border maltase / sucrase / lactase. Monosaccharides and amino acids take the portal vein.')
		if (!meal.lactase && meal.fodmap.lactose) lines.push('Lactase off: lactose stays in the lumen, pulls water, feeds colon bacteria.')
		if (meal.macros.fat > 2) lines.push('Fat packs into chylomicrons and leaves via lacteals — not the portal vein.')
		lines.push('Ileum: B12 + intrinsic factor; bile salts recycled.')
		return lines
	}
	lines.push('Colon reabsorbs water. Microbes ferment what the small bowel missed.')
	if (meal.fermentable >= 2) lines.push('Leftover GOS / fructans / polyols / lactose → H₂, CO₂, CH₄ + SCFA.')
	else lines.push('Low leftover carb: quiet fermentation. Stool browns from stercobilin (old red-cell pigment in bile).')
	lines.push(`Model Bristol type ${bristolOf(meal)} — a typical-adult prior, not your lab result.`)
	return lines
}

function physicsLines(meal, stage, t) {
	if (stage === 'cephalic') return ['Seeing or smelling food is enough. The pump starts before the bite.']
	if (stage === 'chew') {
		return [
			meal.chew === 'crunch' ? 'Enamel vs fiber. Particle size must fall or the pylorus will reject it later.'
			: meal.chew === 'dense' ? 'Connective tissue and muscle fibers take more chew cycles.'
			: meal.chew === 'liquid' ? 'No fracture physics. Volume and temperature only.'
			: 'Tongue packs a bolus against the hard palate.',
			'Gravity is optional. Peristalsis can move a bolus upside down.'
		]
	}
	if (stage === 'swallow' || stage === 'esophagus') {
		return [
			'Oral swallow is the last voluntary step. Then the reflex owns it.',
			'Epiglottis covers the trachea. Two pipes, one moment.',
			'Stripping wave: circular muscle behind the bolus contracts; ahead relaxes. ~4–8 s to the stomach.'
		]
	}
	if (stage === 'stomach') {
		return [
			`50% emptying band ~${meal.t50h.toFixed(1)} h for this meal (fat and solids slow; liquids fast).`,
			'A meal spreads. Head of the meal can leave while the tail is still fundus.',
			t > 0.5 ? `About ${(100 * Math.pow(0.5, t / meal.t50h)).toFixed(0)}% of emptyable contents still in the stomach (exponential model).` : 'Fundus stores. Antrum grinds. Retropulsion throws oversized bits back.'
		]
	}
	if (stage === 'duodenum' || stage === 'jejunum') {
		return [
			'Segmentation mixing, not a conveyor belt.',
			'Osmotic pull: unabsorbed sugars drag water into the lumen.',
			'Living small bowel ~10 ft, ~1 in diameter. Cadaver lengths are longer because tone is gone.'
		]
	}
	return [
		'Haustra mix and dry. Mass movements dump toward the rectum.',
		'Gas is a real volume. It distends the wall. That stretch is what you feel.',
		`Whole-gut band is tens of hours. This clock is compressed. Colon model ~${meal.colonH.toFixed(0)} h.`
	]
}

function biologyLines(meal, stage) {
	if (stage === 'cephalic' || stage === 'chew') {
		return [
			'Six systems eat: nervous, endocrine, muscular, skeletal, respiratory, digestive (receiver).',
			'Saliva is an import from blood — water, mucin, enzymes, IgA — not from the drink.'
		]
	}
	if (stage === 'swallow' || stage === 'esophagus') {
		return ['ENS + swallow center. Skeletal muscle upper third, smooth muscle lower third.']
	}
	if (stage === 'stomach') {
		return [
			'Intrinsic factor for B12 is made here. The ileum absorbs it later.',
			'Acid kills many swallowed microbes. Mucus saves the wall from the acid.'
		]
	}
	if (stage === 'duodenum' || stage === 'jejunum' || stage === 'ileum') {
		return [
			'Enterocytes live days. They spend glutamine on themselves before shipping glucose out.',
			'Portal vein → liver first. Lymph → thoracic duct for fat.',
			'~¼ of cardiac output is splanchnic while you rest-and-digest.'
		]
	}
	return [
		'Colonocytes prefer butyrate from microbes. The factory eats some of the leftover on purpose.',
		'Gut serotonin (~90–95% of body 5-HT) runs motility here. It does not cross into brain mood.',
		'GALT samples antigen. Largest mucosal immune site — not a 70% slogan.'
	]
}

function systemLines(meal, stage, t) {
	const rows = []
	if (stage === 'cephalic' || stage === 'chew' || stage === 'swallow') {
		rows.push({ id: 'nervous', dir: 'in', text: 'Hunger, taste, chew rhythm, swallow reflex.' })
		rows.push({ id: 'endocrine', dir: 'in', text: 'Ghrelin / satiety hormones. Cephalic insulin priming.' })
		rows.push({ id: 'muscular', dir: 'in', text: 'Hands, jaw, tongue, pharynx.' })
		rows.push({ id: 'skeletal', dir: 'in', text: 'Teeth and mandible.' })
		rows.push({ id: 'respiratory', dir: 'in', text: 'Epiglottis must win.' })
		rows.push({ id: 'digestive', dir: 'in', text: 'Receives. Does not decide to eat.' })
		return rows
	}
	rows.push({ id: 'circulatory', dir: 'in', text: 'Arterial blood: O₂, water, salts for juices. Then takes sugars and amino acids out via portal vein.' })
	if (meal.macros.fat > 2 && t > 1) rows.push({ id: 'lymph', dir: 'out', text: 'Chylomicrons in lacteals. Cream, not red.' })
	if (meal.macros.carb + meal.macros.addedSugar > 8 && t > 0.8) rows.push({ id: 'endocrine', dir: 'out', text: 'Glucose curve → GIP / GLP-1 → insulin.' })
	if (stage === 'colon' && meal.fermentable >= 2) rows.push({ id: 'respiratory', dir: 'out', text: 'Hydrogen breath: colon gas that blood carries to the lungs. Same physics as the lactose breath test.' })
	if (meal.macros.protein > 10 && t > 4) rows.push({ id: 'urinary', dir: 'out', text: 'Nitrogen → liver urea → kidney. Not made in the intestine.' })
	if (meal.macros.protein > 10 && t > 3) rows.push({ id: 'muscular', dir: 'out', text: 'Amino acids in blood later. They do not fly into a bicep from the gut.' })
	rows.push({ id: 'nervous', dir: 'both', text: 'Vagus + ENS. Stretch = fullness. Gut 5-HT stays in the gut.' })
	if (stage === 'colon') rows.push({ id: 'immune', dir: 'both', text: 'Peyer patches sampling. Quiet on a normal meal.' })
	return rows
}

const PROOFS = [
	{
		id: 'cephalic-niddk',
		stage: ['cephalic', 'chew'],
		grade: 'robust',
		claim: 'Seeing or smelling food makes saliva and starts gastric juice — before the bite.',
		experiment: 'Standard cephalic-phase physiology. NIDDK: nerves from brain to salivary glands when you see or smell food.',
		cite: 'NIDDK, Your Digestive System & How it Works (2017)',
		href: 'https://www.niddk.nih.gov/health-information/digestive-diseases/digestive-system-how-it-works'
	},
	{
		id: 'amylase-pH',
		stage: ['chew', 'stomach'],
		grade: 'robust',
		claim: 'Salivary amylase works at pH ~6.7–7.0 and stops in the stomach. Carbohydrate is not digested in acid.',
		experiment: 'Enzyme pH optima; StatPearls digestion: oral pH 6.7–7.0 vs gastric 0.8–3.5; amylase inactivated in the stomach.',
		cite: 'Patricia & Dhamoon, StatPearls: Physiology, Digestion (2022)',
		href: 'https://www.ncbi.nlm.nih.gov/books/NBK544242/'
	},
	{
		id: 'pylorus-2mm',
		stage: ['stomach'],
		grade: 'robust',
		claim: 'During fed mixing, only particles ≲ 2 mm leave through the pylorus. Bigger bits are thrown back (retropulsion).',
		experiment: 'Gastric sieving: antral contraction against a closed pylorus. Documented in GI physiology (StatPearls).',
		cite: 'StatPearls: Physiology, Digestion — propulsion, grinding, retropulsion',
		href: 'https://www.ncbi.nlm.nih.gov/books/NBK544242/'
	},
	{
		id: 'meal-spreads',
		stage: ['stomach', 'jejunum', 'colon'],
		grade: 'robust',
		claim: 'A meal is not one pellet. Part can enter the colon while part is still in the stomach.',
		experiment: 'Human scintigraphy with ¹¹¹In-labeled pellets. Sequential gamma camera maps show simultaneous stomach and colon signal.',
		cite: 'Camilleri et al., Am J Physiol 1989; summarized by Bowen, Colorado State GI transit',
		href: 'https://vivo.colostate.edu/hbooks/pathphys/digestion/basics/transit.html'
	},
	{
		id: 'transit-bands',
		stage: ['stomach', 'jejunum', 'colon'],
		grade: 'range',
		claim: 'Healthy bands, not a stopwatch: ~50% gastric empty 2.5–3 h; small bowel ~3–7 h; colon often ~16–40 h.',
		experiment: 'Wireless motility capsules (pH/pressure/temp) and scintigraphy in healthy volunteers. Capsule review n≈1885.',
		cite: 'Nandhra et al., J Clin Med 2023; Lee et al. WMC norms; Colorado State summary',
		href: 'https://www.mdpi.com/2077-0383/12/16/5272'
	},
	{
		id: 'barium-not-food',
		stage: ['esophagus', 'stomach', 'xray'],
		grade: 'robust',
		claim: 'Plain x-ray does not show lunch. To watch a bolus you swallow barium and use fluoroscopy.',
		experiment: 'Upper GI series: patient drinks barium; radiologist watches lumen coat in real time. Food itself is radiolucent.',
		cite: 'RadiologyInfo: Upper GI / esophagram; StatPearls Barium Swallow',
		href: 'https://www.radiologyinfo.org/en/info/uppergi'
	},
	{
		id: 'bristol',
		stage: ['colon', 'rectum'],
		grade: 'robust',
		claim: 'Stool form tracks whole-gut transit better than how often you go. Bristol 1–7 is the clinical scale.',
		experiment: '66 volunteers: radiopaque-marker transit, stool weight, diary. Then senna vs loperamide. Form correlated with transit change (r = −0.65).',
		cite: 'Lewis SJ, Heaton KW. Scand J Gastroenterol. 1997;32:920–924',
		href: 'https://doi.org/10.3109/00365529709011203'
	},
	{
		id: 'fiber-laxation',
		stage: ['colon', 'rectum'],
		grade: 'range',
		claim: 'Fiber, especially low-solubility fiber in food, raises fecal weight and slightly shortens transit in healthy people.',
		experiment: 'Systematic review of trials (USDA/NLM). Associations modest; food fiber beat supplements in their models.',
		cite: 'Fiber Intake and Laxation, NCBI Bookshelf NBK619130',
		href: 'https://www.ncbi.nlm.nih.gov/books/NBK619130/'
	},
	{
		id: 'fodmap-gas',
		stage: ['colon', 'jejunum'],
		grade: 'robust',
		claim: 'Poorly absorbed short-chain carbs pull water and are fermented to gas in everyone. IBS adds extra sensitivity to that stretch.',
		experiment: 'Ileostomy water studies; MRI of small-bowel water after fructose/fructans vs glucose; breath hydrogen after lactulose/beans.',
		cite: 'Monash FODMAP mechanism; StatPearls low-FODMAP; Merck Manual Gas',
		href: 'https://www.monashfodmap.com/about-fodmap-and-ibs/'
	},
	{
		id: 'lactose-h2',
		stage: ['colon', 'jejunum'],
		grade: 'robust',
		claim: 'No lactase → lactose reaches the colon → bacteria make hydrogen → you can measure it on the breath.',
		experiment: 'Oral lactose bolus, serial breath H₂ and blood glucose. Intolerant: H₂ up, glucose does not rise.',
		cite: 'StatPearls: Physiology, Digestion — lactose hydrogen breath test',
		href: 'https://www.ncbi.nlm.nih.gov/books/NBK544242/'
	},
	{
		id: 'portal-quarter',
		stage: ['jejunum', 'duodenum'],
		grade: 'robust',
		claim: 'Absorbed sugar and amino acids go to the liver first. About one-fourth of each heartbeat’s blood is serving the gut while you rest-and-digest.',
		experiment: 'Hepatic portal anatomy + splanchnic flow fractions in standard A&P (OpenStax 23.1).',
		cite: 'OpenStax Anatomy & Physiology 2e, §23.1',
		href: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/23-1-overview-of-the-digestive-system'
	},
	{
		id: 'lacteals',
		stage: ['duodenum', 'jejunum'],
		grade: 'robust',
		claim: 'Fat does not take the portal vein. It rides lymph as chylomicrons to the thoracic duct.',
		experiment: 'Classic chyle physiology; villus lacteals. OpenStax: lipids via lacteals, other nutrients via blood to liver.',
		cite: 'OpenStax 23.1 — lymphatic lacteals',
		href: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/23-1-overview-of-the-digestive-system'
	},
	{
		id: 'serotonin-local',
		stage: ['colon', 'jejunum'],
		grade: 'robust',
		claim: '~90% of body serotonin is made in gut enterochromaffin cells. It does not cross the blood–brain barrier to become mood.',
		experiment: 'TPH1 in EC cells vs TPH2 in brain. Germ-free mice: ~60% less peripheral 5-HT; restored after colonization (Yano / Hsiao, Cell 2015).',
		cite: 'Caltech summary of Yano et al.; GI 5-HT reviews',
		href: 'https://www.caltech.edu/about/news/microbes-help-produce-serotonin-gut-46495'
	},
	{
		id: 'juice-import',
		stage: ['chew', 'stomach', 'duodenum'],
		grade: 'range',
		claim: 'Most fluid in the tract is secreted from blood (~6–7 L) plus ~2 L you drank. Almost all is absorbed again. Stool keeps ~0.1–0.2 L.',
		experiment: 'Textbook mass balance of saliva, gastric, bile, pancreatic, intestinal secretions. Exact liters vary by book; direction does not.',
		cite: 'GI secretion tallies (CICM / clinical fluid chapters); OpenStax Table 23.1 imports',
		href: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/23-1-overview-of-the-digestive-system'
	},
	{
		id: 'living-length',
		stage: ['jejunum'],
		grade: 'contested',
		claim: 'Use living length (~25 ft canal, ~10 ft small bowel). Cadaver / relaxed figures (~22 ft SI) are longer because muscle tone is gone.',
		experiment: 'OpenStax: alimentary canal ~7.62 m in life vs ~10.67 m after death. Cleveland Clinic quotes the longer SI.',
		cite: 'OpenStax 23.1 and 23.5 vs Cleveland Clinic digestive overview',
		href: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/23-5-the-small-and-large-intestines'
	}
]

function proofsFor(ids) {
	return PROOFS.filter((p) => ids.includes(p.id))
}

function proofIdsFor(stage, meal) {
	const ids = PROOFS.filter((p) => p.stage.includes(stage)).map((p) => p.id)
	if (!meal.lactase && meal.fodmap.lactose) ids.unshift('lactose-h2')
	if (meal.fermentable >= 2 && stage === 'colon') ids.unshift('fodmap-gas')
	if (meal.macros.fat > 4 && (stage === 'duodenum' || stage === 'jejunum')) ids.unshift('lacteals')
	return [...new Set(ids)].slice(0, 4)
}

function mixHex(hexes) {
	const parts = hexes.map((h) => [
		parseInt(h.slice(1, 3), 16),
		parseInt(h.slice(3, 5), 16),
		parseInt(h.slice(5, 7), 16)
	])
	const n = parts.length
	const r = Math.round(parts.reduce((s, p) => s + p[0], 0) / n)
	const g = Math.round(parts.reduce((s, p) => s + p[1], 0) / n)
	const b = Math.round(parts.reduce((s, p) => s + p[2], 0) / n)
	return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

function sigmoid(x) {
	return 1 / (1 + Math.exp(-x))
}

function clamp(n, a, b) {
	return Math.max(a, Math.min(b, n))
}

const BRISTOL = [
	'Separate hard lumps',
	'Sausage-shaped, lumpy',
	'Sausage with cracks',
	'Smooth soft sausage',
	'Soft blobs, clear edges',
	'Mushy, ragged edges',
	'Watery, no pieces'
]
