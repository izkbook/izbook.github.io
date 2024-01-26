ls = localStorage;

// Defaulter
document.getElementById("skinDiv").style.display = "none";

// Click management
function bind(idd, cost, result) {
	document.getElementById(idd).onclick = () => {
		let availables = JSON.parse(localStorage.getItem('availables')) || [];

		if (availables.includes(result)) {
			if (confirm(`Select ${result} skin? (You own it)`)) {
				ls['skins'] = result;
			}
		} else if (confirm(`Do you wish to purchase ${result}? Cost: ${cost}`)) {
			if (ls['coins'] >= cost) {
				ls['coins'] -= cost;
				ls['skins'] = result;

				// Update
				availables.push(result);
				availables = Array.from(new Set(availables)); // Remove duplicates
				localStorage.setItem('availables', JSON.stringify(availables));
				console.log(ls['availables']);
			} else {
				alert(`You need ${cost}, but you have ${ls['coins']}`);
			}
		}
	};
}

// Set
bind("skin-bean", 25, 'bean');
bind("skin-birb", 50, 'birb');
bind("skin-classic", 68, "classic");
bind("skin-potato", 80, "potato")

document.getElementById("gback").innerHTML = `Go back | Coins: ${ls['coins']}`

setInterval(function() {
	document.getElementById("gback").innerHTML = `Go back | BC: ${ls['coins']}`
}, 5000);

function isLandscape() {
	return window.matchMedia("(orientation: landscape)").matches;
}

if (isLandscape()) {
	console.log("Thanks")
} else {
	alert("Please play the game in LANDSCAPE for it to work properly")
}

if (ls['name'] === null || ls['name'] == undefined) {
	ls['name'] = prompt("Please set your name: ");
	//ls<name> = ask(POLITE, str"Pplease set your name")
	
} else {
	console.log(ls['name']);
}

document.getElementById("statdiv").style.display = "none"
document.getElementById("helpDiv").style.display = "none"

function toggleHelp() {
	let develop = document.getElementById("helpDiv")
	
	if (develop === "none") {
		develop.style.display = "block"
	}
}

function toggleDiv() {
	var div = document.getElementById("skinDiv");

	if (div.style.display === "none") {
		div.style.display = "block";
		document.getElementById("selectDiv").style.display = "none"
		document.getElementById('statdiv').style.display = "none"
	} else {
		div.style.display = "none";
		document.getElementById("selectDiv").style.display = "block"
		document.getElementById('statdiv').style.display = "none"
	}
}

function toggleStats() {
	document.getElementById("statdiv").style.display = "none"
	document.getElementById("selectDiv").style.display = "block"
	document.getElementById("skinDiv").style.display = "none"
}

function toggleStatss() {
	document.getElementById("statdiv").style.display = "block"
	document.getElementById("selectDiv").style.display = "none"
	document.getElementById("skinDiv").style.display = "none"
}

let availables = JSON.parse(localStorage.getItem('availables')) || [];

stater = document.getElementById("stater")
stater.innerHTML = `Name: ${ls['name']}<br>
Coins: ${ls['coins']}<br>
Highscore: ${ls['highscore']}<br>
Skins: ${availables}<br>`