// Initalize LocalStorage
const ls = localStorage
ls['state'] = 'active'

/* ChatGPT code */
//print("Hello-World!")

// Random num generator
function random_item(list) { return list[Math.floor((Math.random() * list.length))]; }

// Function to make RGB color 10% lighter
function makeColorLighter(rgbValue) {
	// Extract the red, green, and blue values
	var red = rgbValue[0];
	var green = rgbValue[1];
	var blue = rgbValue[2];

	// Calculate the lighter values for each component
	var lighterRed = Math.min(Math.round(red * 1.1), 255);
	var lighterGreen = Math.min(Math.round(green * 1.1), 255);
	var lighterBlue = Math.min(Math.round(blue * 1.1), 255);

	// Return the new RGB color value as an array
	return [lighterRed, lighterGreen, lighterBlue];
}

// Function to make RGB color 10% darker
function makeColorDarker(rgbValue) {
	// Extract the red, green, and blue values
	var red = rgbValue[0];
	var green = rgbValue[1];
	var blue = rgbValue[2];

	// Calculate the darker values for each component
	var darkerRed = Math.max(Math.round(red * 0.9), 0);
	var darkerGreen = Math.max(Math.round(green * 0.9), 0);
	var darkerBlue = Math.max(Math.round(blue * 0.9), 0);

	// Return the new RGB color value as an array
	return [darkerRed, darkerGreen, darkerBlue];
}

// Time Notification
function createNotification(title, heading, time, url) {
	// Check if the browser supports the Notification API
	if ('Notification' in window) {
		// Request permission from the user to display notifications
		Notification.requestPermission()
			.then(function(permission) {
				if (permission === 'granted') {
					// Create a new notification
					var notification = new Notification(title, {
						body: heading + '\n\tTime: ' + time,
					});

					// Handle click event on the notification
					notification.onclick = function() {
						window.open(url);
					};
				}
			})
			.catch(function(error) {
				console.error('Error requesting permission:', error);
			});
	} else {
		console.log('Notifications not supported in this browser.');
	}
}

/* End ChatGPT code */

// Matching platform theme
var COLOR;

// root = Tk()
kaboom({
	background: COLOR,
	font: "apl386",
	touchToMouse: true,
	crisp: true,
	color: [46, 42, 43]
});

loadFont("apl386", "APL386.ttf")

// Variables
var filetype = "png";
let ftype = "day";
let speed = 330;

let hp = 6;
let score = 0;

if (ls.getItem('skins') === null || ls['skins'] == undefined) { ls.setItem('skins', 'classic') }
if (ls.getItem('coins') === null || ls['coins'] == undefined) { ls.setItem('coins', 0) }
if (ls.getItem('highscore') === null || ls['highscore'] == undefined) { ls.setItem('highscore', 0) }

if (localStorage.getItem('availables') === null || ls['availables'] == null) {
	localStorage.setItem('availables', JSON.stringify(["classic"]));
} else {
	let availables = JSON.parse(localStorage.getItem('availables')) || [];
	availables.push("classic"); // Add "classic" if not already present
	availables = Array.from(new Set(availables)); // Remove duplicates
	localStorage.setItem('availables', JSON.stringify(availables));
}

let skin = ls['skins']
if (ls['skins'] == "classic") {
	setGravity(1700)
} else if (ls['skins'] == 'bean') {
	setGravity(1699)
} else if (ls['skins'] == "birb") {
	setGravity(1726)
} else if (ls['skins'] == 'potato') {
	setGravity(1740)
}

// Load only the required sprites
loadSprite(`RED`, `sprites/hp/RED.png`)
loadSprite(`YELLOW`, `sprites/hp/YELLOW.png`)
loadSprite(`GREEN`, `sprites/hp/GREEN.png`)

loadSprite(`slow`, `sprites/slow.png`)
loadSprite(`menu`, `sprites/menu.png`)
loadSprite(`speed`, `sprites/speed.png`)
loadSprite(`templ`, `sprites/templ.png`)

loadSprite("rect", "sprites/rect.png")

loadSprite(`happy-${skin}`, `/sprites/${skin}/happy.${filetype}`)
loadSprite(`sad-${skin}`, `/sprites/${skin}/sad.${filetype}`)
loadSprite(`eat-${skin}`, `/sprites/${skin}/eat.${filetype}`)

// Load sounds
loadSound(`calmbeat`, `/sounds/calmbeat.mp3`)
loadSound(`oof`, `/sounds/oof.mp3`)
loadSound(`subway`, `/sounds/subway.mp3`)

// Render the background
function backgroundz() {
	// Background
	var bgzz = random_item([
		'Big_Sur_Abstract', "Dome", "Monterey_Abstract", "Peak", "Tree", "Ventura_Abstract", "Mojave_Desert"
	])

	loadSprite(`bg-${bgzz}`, `/sprites/backgrounds/${bgzz}/${ftype}.jpg`)

	var background = add([
		sprite(`bg-${bgzz}`, {
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight,
		}),
		pos(0, 0),
		scale(1),
		fixed(),
		"background"
	]);

	if (bgzz == "Big_Sur_Abstract") { COLOR = [84, 65, 115] }
	else if (bgzz == "Dome") { COLOR = [173, 155, 135] }
	else if (bgzz == "Mojave_Desert") { COLOR = [200, 152, 93] }
	else if (bgzz == "Monterey_Abstract") { COLOR = [92, 43, 207] }
	else if (bgzz == "Peak") { COLOR = [158, 110, 73] }
	else if (bgzz == "The_Beach") { COLOR = [252, 185, 64] }
	else if (bgzz == "The_Cliffs") { COLOR = [143, 79, 52] }
	else if (bgzz == "The_Desert") { COLOR = [255, 129, 52] }
	else if (bgzz == "The_Lake") { COLOR = [13, 130, 131] }
	else if (bgzz == "Tree") { COLOR = [162, 160, 153] }
	else if (bgzz == "Ventura_Abstract") { COLOR = [237, 158, 55] }
	else { COLOR = [rand(0, 255), rand(0, 255), rand(0, 255)] }
}

// 3 seperate platforms of colour
function PlatformGen() {
	let platform = add([
		rect(width(), 48),
		pos(0, height()),
		anchor("botleft"),
		body({ isStatic: true }),
		area(),
		color(makeColorLighter(COLOR)),
		"platform"
	]);

	add([
		rect(width(), 38),
		pos(0, height()),
		anchor("botleft"),
		body({ isStatic: true }),
		area(),
		color(COLOR),
		"platform"
	]);

	add([
		rect(width(), 10),
		pos(0, height()),
		anchor("botleft"),
		body({ isStatic: true }),
		area(),
		color(makeColorDarker(COLOR)),
		"platform"
	]);
}

// UpdateHealth takes the HP as an ARG and updates it
function UpdateHealth(HorsePower) {
	destroyAll("DESTROY")

	var POSITION = 0
	const SIZE = 20

	for (var i = 1; i <= HorsePower; i++) {
		POSITION += 14
		if (POSITION != 12) { POSITION += 12 }

		if (i >= 1 && i <= 2) {
			add([
				sprite("RED", {
					width: SIZE, height: SIZE
				}),
				area(),
				pos(POSITION, 25),
				anchor("center"),
				"DESTROY"
			])
		} else if (i >= 3 && i <= 4) {
			add([
				sprite("YELLOW", {
					width: SIZE, height: SIZE
				}),
				area(),
				pos(POSITION, 25),
				anchor("center"),
				"DESTROY"
			])
		} else {
			add([
				sprite("GREEN", {
					width: SIZE, height: SIZE
				}),
				area(),
				pos(POSITION, 25),
				anchor("center"),
				"DESTROY"
			])
		}
	}
}

// Generate obstecles ------------------
function GenObst() {
	let WIDTHS = rand(40, 50)
	let HEIGHTS = rand(25, 65)
	let COLOURS = [rand(0, 255), rand(0, 255), rand(0, 255)]

	var obstc = add([
		sprite('rect', {
			width: WIDTHS, height: HEIGHTS,
		}),
		area(),
		pos(width(), height() - 47),
		anchor("botleft"),
		color(random_item([COLOURS, makeColorLighter(COLOURS), makeColorDarker(COLOURS)])),
		move(LEFT, speed),
		offscreen({ destroy: true }),
		opacity(0.1),
		fadeIn(0.6),
		outline(1),
		"obstc",
	])
}

// --- FOODS -- //
function GenKFC() {
	loadSprite("kfc", `/sprites/food/kfc.png`)
	add([
		sprite(`kfc`),
		area(),
		pos(width(), height() - 47),
		anchor("botleft"),
		move(LEFT, speed),
		offscreen({ destroy: true }),
		opacity(0.2),
		fadeIn(0.8),
		outline(1),
		"food-kfc"
	])
}

function GenKNUT() {
	loadSprite("kokonut", `/sprites/food/kokonut.png`)
	add([
		sprite(`kokonut`),
		area(),
		pos(width(), height() - 47),
		anchor("botleft"),
		move(LEFT, speed),
		offscreen({ destroy: true }),
		opacity(0.2),
		fadeIn(0.8),
		outline(1),
		"food-knt"
	])
}

function GenRotten() {
	loadSprite("rotten", `/sprites/food/rotten.png`)
	add([
		sprite(`rotten`),
		area(),
		pos(width(), height() - 47),
		anchor("botleft"),
		move(LEFT, speed),
		offscreen({ destroy: true }),
		opacity(0.2),
		fadeIn(0.8),
		outline(1),
		"food-rotten"
	])
}

function GenBanana() {
	loadSprite('banana', `/sprites/food/banana.png`)
	add([
		sprite('banana'),
		area(),
		pos(width(), height() - 40),
		anchor("botleft"),
		move(LEFT, speed),
		offscreen({ destroy: true }),
		opacity(0.2),
		fadeIn(0.8),
		outline(1),
		"food-banana"
	])
}

// Cashes ---
function Cash5() {
	loadSprite("cash-5", "/sprites/cash/cashfive.png")
	add([
		sprite("cash-5"),
		area(),
		pos(width(), height() - 45),
		anchor("botleft"),
		move(LEFT, speed),
		offscreen({ destroy: true }),
		opacity(0.2),
		fadeIn(0.8),
		outline(1),
		"bc5"
	])
}

function Cash10() {
	loadSprite("cash-10", "/sprites/cash/cashten.png")
	add([
		sprite("cash-10"),
		area(),
		pos(width(), height() - 45),
		anchor("botleft"),
		move(LEFT, speed),
		offscreen({ destroy: true }),
		opacity(0.2),
		fadeIn(0.8),
		outline(1),
		"bc10"
	])
}

function Cash2() {
	loadSprite("cash-2", "/sprites/cash/cashtwo.png")
	add([
		sprite("cash-2"),
		area(),
		pos(width(), height() - 45),
		anchor("botleft"),
		move(LEFT, speed),
		offscreen({ destroy: true }),
		opacity(0.2),
		fadeIn(0.8),
		outline(1),
		"bc2"
	])
}

function Cash1() {
	loadSprite("cash-1", "/sprites/cash/cashone.png")
	add([
		sprite("cash-1"),
		area(),
		pos(width(), height() - 45),
		anchor("botleft"),
		move(LEFT, speed),
		offscreen({ destroy: true }),
		opacity(0.2),
		fadeIn(0.8),
		outline(1),
		"bc1"
	])
}

// Spawn Treas
function SpawnTrees() {
	if (ls['state'] == 'active') {
		let rando = Math.floor(Math.random() * 144);

		if (rando === 1) { GenKFC() }
		else if (rando == 5 || rando === 2) { GenKNUT() }

		else if (rando === 90 || rando === 93 || rando === 96) { GenRotten() }
		else if (rando == 80 || rando == 85) { GenBanana() }

		else if (rando === 125 || rando === 123 || rando == 121) { Cash1() }
		else if (rando === 110 || rando == 105) { Cash2() }
		else if (rando == 96) { Cash5() }
		else if (rando == 143) { Cash10() }
		else { GenObst() }
	}

	wait(rand(rand(0.7, 0.9), (1.3, 1.7)), () => { SpawnTrees(); })
}

var track = play(random_item(["subway", "calmbeat"]), { volume: 0.9, loop: true })

// Main game loop
scene("game", () => {
	ls['state'] = 'active'

	// Preload backgrounds and audio tracak
	backgroundz();

	// Render a pltform
	PlatformGen()

	// Generate a main character (player)
	var player = add([
		sprite(`happy-${skin}`),
		pos(20, 40),
		area(),
		body(),
		doubleJump(2),
		"player", skin,
	])

	add([
		sprite("menu"),
		pos(width() - 60, 10),
		area(),
		anchor("topleft"),
		"btn-menu"
	])

	var tSlow = add([
		sprite("templ"),
		pos(width() - 110, 10),
		area(),
		anchor("topleft"),
		"btn-slow"
	])

	var tSpeed = add([
		sprite("templ"),
		pos(width() - 160, 10),
		area(),
		anchor("topleft"),
		"btn-speed"
	])

	onClick("btn-menu", (emenu) => {
		speed = 0
		destroyAll("obstc")
		destroyAll("food-banana")
		destroyAll("food-rotten")
		destroyAll('food-kfc')
		destroyAll('food-knt')

		player.use(`sad-${skin}`)
		ls['state'] = 'disabled'

		add([
			text("Continue", { size: 50 / 16 * 16, }),
			area(),
			pos(center()),
			anchor("center"),
			fixed(),
			"contss"
		])
	})

	onClick('contss', (cntt) => {
		player.use(`happy-${skin}`)
		ls['state'] = 'active'
		speed = 330;
		destroyAll("contss")
	})

	// Cashashes
	player.onCollide("bc1", (bc1) => {
		ls['coins'] = parseInt(ls['coins']) + 1;
		healthbar.text = `S:${score} C:${ls['coins']}`
		destroy(bc1)
	})

	player.onCollide("bc2", (bc2) => {
		ls['coins'] = parseInt(ls['coins']) + 2
		healthbar.text = `S:${score} C:${ls['coins']}`
		destroy(bc2)
	})

	player.onCollide("bc5", (bc5) => {
		ls['coins'] = parseInt(ls['coins']) + 5
		healthbar.text = `S:${score} C:${ls['coins']}`
		destroy(bc5)
	})

	player.onCollide("bc10", (bc10) => {
		ls['coins'] = parseInt(ls['coins']) + 10
		healthbar.text = `S:${score} C:${ls['coins']}`
		destroy(bc10)
	})

	// Player Collisions
	player.onCollide("food-rotten", (frr) => {
		destroy(frr)
		hp -= 1
		UpdateHealth(hp)
		if (hp <= 0) { go("fail") }

		tSlow.use(sprite('slow'))

		player.use(sprite(`sad-${skin}`))
		setTimeout(() => { player.use(sprite(`happy-${skin}`)) })

		SPOOD = random_item([50, 30, 10, 25, 33])
		speed -= SPOOD
		console.log(`Minus: ${speed}, ${SPOOD}`)

		setTimeout(() => {
			speed += SPOOD
			tSlow.use(sprite(`templ`))
			console.log(`Plus: ${speed}`)
		}, 15000)
	})

	player.onCollide("food-banana", (fbb) => {
		destroy(fbb)
		hp -= random_item([1, 2])
		UpdateHealth(hp)
		if (hp <= 0) { go("fail") }

		player.use(sprite(`sad-${skin}`))
		setTimeout(() => {
			player.use(sprite(`happy-${skin}`));
		}, 3000);
	})

	player.onCollide("food-knt", (fkk) => {
		destroy(fkk)
		hp += 1
		UpdateHealth(hp)
		if (hp <= 0) { go("fail") }

		player.use(sprite(`eat-${skin}`))
		setTimeout(() => { player.use(sprite(`happy-${skin}`)); }, 3000);
	})

	player.onCollide("food-kfc", (fkc) => {
		destroy(fkc)
		hp += random_item([1, 2])
		UpdateHealth(hp)

		tSpeed.use(sprite('speed'))

		let PEED = random_item([45, 35, 25, 15])
		speed += PEED
		console.log(`KFC Minus: ${speed}, ${PEED}`)

		// Check if an object with a specific tag exists at a position
		function doesObjectExistAtPosition(tag, x, y) {
			const objectsWithTag = get(tag); // Get all objects with the given tag

			for (const obj of objectsWithTag) {
				const { x: objX, y: objY } = obj.pos; // Get the position of the object

				if (objX === x && objY === y) {
					return true; // Object with the given position found
				}
			}
			return false; // Object with the given position not found
		}

		// Usage
		const tag = "btn-speed";
		const x = width() - 60;
		const y = 10;

		const objectExists = doesObjectExistAtPosition(tag, x, y);
		if (objectExists) {
			console.log(`An object with tag "${tag}" exists at position (${x}, ${y})`);
		} else {
			console.log(`No object with tag "${tag}" exists at position (${x}, ${y})`);
		}

		player.use(sprite(`eat-${skin}`))

		setTimeout(() => {
			tSpeed.use(sprite('templ'))
			player.use(sprite(`happy-${skin}`));
			console.log(`KFC Minus: ${speed}, ${PEED}`)
		}, 15000);
	})

	player.onCollide("obstc", () => {
		hp -= 1
		UpdateHealth(hp)
		shake()
		navigator.vibrate(200);
		addKaboom({ x: player.pos.x, y: player.pos.y - 40 })

		if (hp <= 0) { go("fail") }

		player.use(sprite(`sad-${skin}`))
		setTimeout(() => { player.use(sprite(`happy-${skin}`)); }, 2000);
	})

	var healthbar = add([
		text(`S:${score} C:${ls['coins']}`), {
			width: width(),
			size: 50 / 16 * 16,
		}, area(),
		pos(13, 40),
		'healthbar',
	])

	UpdateHealth(hp)

	// Jump
	onKeyPress("space", () => { if (player.isGrounded()) { player.jump() } })
	onClick(() => { if (player.isGrounded()) { player.jump() } })

	onKeyPress("k", () => {
		hp = 0
		UpdateHealth(hp)
		console.log("How dare...")
		if (hp <= 0) { go("fail") }
	})

	console.log("Key Bind: K for KILL")

	// Generate obstecles
	wait(rand(0.9, 1.7), () => { SpawnTrees(); })

	onUpdate(() => {
		if (ls['state'] == 'active') {
			score += 1
			healthbar.text = `S:${score} C:${ls['coins']}`
		}
	})
})

function invertBg(backgroundColor) {
	// Get the background color.
	var backgroundR = backgroundColor.r;
	var backgroundG = backgroundColor.g;
	var backgroundB = backgroundColor.b;

	// Invert the background color.
	var invertedR = 255 - backgroundR;
	var invertedG = 255 - backgroundG;
	var invertedB = 255 - backgroundB;

	// Return the new color in RGB format.
	return `rgb(${invertedR}, ${invertedG}, ${invertedB})`;
}

// Fail
scene("fail", () => {
	var background = add([
		pos(0, 0),
		scale(1),
		rect(document.documentElement.clientWidth, document.documentElement.clientHeight),
		color(random_item([makeColorDarker(COLOR), makeColorLighter(COLOR)])),
	]);

	ls['state'] = "disabled"

	if (ls.getItem('highscore') == null) { ls.setItem('highscore', score) }
	else if (ls.getItem('highscore') < score) { ls.setItem('highscore', score) }

	if (ls['highscore'] > score) {
		var txt = `${random_item(["What a failiure", "Big L", "Try again", 'Bruh such a fail', "Timmy did better"])}\nScore: ${score}\nCoins ${ls['coins']}`
	} else {
		var txt = `${random_item(['New high score', 'Laughs in failiure', "Nice high score!"])}\nScore: ${score}\nCoins: ${ls["coins"]}`
		let TIME = new Date().toLocaleTimeString();
		createNotification('New Highscore', `${random_item(['New high score', 'Laughs in failiure', "Nice high score!"])}: ${score}`, TIME, 'https://example.com');
	}

	add([
		rect(window.innerWidth / 1.3, window.innerHeight / 1.3),
		pos(center()),
		color(COLOR),
		anchor('center'),
	])

	add([
		text(txt, {
			size: 50 / 16 * 16,
			color: invertBg(COLOR)
		}),
		pos(center()),
		anchor("center"),
		color(27, 27, 27),
		area(),
		"clickMe"
	])

	add([
		text("Back", {
			size: 50 / 16 * 16,
			color: invertBg(COLOR),
		}),
		pos(window.innerWidth / 1.3, height() - 10),
		anchor("botleft"),
		color(27, 27, 27),
		area(),
		"neverClick"
	])

	add([
		text("125BC", {
			size: 50 / 16 * 16,
			color: invertBg(COLOR),
		}),
		pos(window.innerWidth / 0.3, height() - 10),
		anchor("botleft"),
		color(27, 27, 27),
		area(),
		"superClick"
	])

	onClick("neverClick", () => {
		document.location.href = "/index.html"
	})

	speed = 330;

	// Return
	onClick(() => {
		ls['state'] = 'active'
		go("game")
		hp = 6
		UpdateHealth(hp)
		score = 0
	})

	onKeyPress(() => {
		ls['state'] = 'active'
		go("game")
		hp = 6
		UpdateHealth(hp)
		score = 0
	})

})

go('game')