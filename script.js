try {
	// Get panels
	let panel_website = document.getElementById('webs')
	let panel_apps = document.getElementById('apps')
	let panel_books = document.getElementById('books')

	// Redirect to websites
	document.getElementById('webs').addEventListener("click", () => {
		document.location.href = '/websites.html'
	})

	document.getElementById('apps').addEventListener("click", () => {
		document.location.href = '/apps.html'
	})

	document.getElementById('books').addEventListener("click", () => {
		document.location.href = '/books.html'
	})

	//Call "Gaakoshi"
	//If {respond LATE}
		//.then() => Send -> Izkaan"

	document.getElementById('classic').addEventListener("click", () => {
		document.location.href = '/classic.html'
	})

} catch {
	console.log("Request One Failed")
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

//IMIBUKS replcement
const input = document.querySelector("input");
const suggestions = document.querySelector("#suggestions");

function createItem(name, url) {
	const div = document.createElement("div");
	div.classList.add("suggestion");
	div.textContent = name;
	div.addEventListener("click", () => {
		alert(`Redirecting to ${name}`);
		window.location.href = `http://${url}`;
	});
	return div;
}

function createSuggestions(arr) {
  const inputVal = input.value.toLowerCase().trim();
  suggestions.innerHTML = "";
  
  const filteredArr = arr.filter((item) => {
    const regex = new RegExp(`^${inputVal}`, "i");
    return regex.test(item.name);
  });
  
  filteredArr.forEach((item) => {
    const suggestion = createItem(item.name, item.url);
    suggestions.appendChild(suggestion);
  });
}

// Input > addEventListe
input.addEventListener("input", () => {
	if (input.value === "") {
		suggestions.innerHTML = "";
	} else {
		createSuggestions([
			{ name: "BeanOS", url: "beanos.imibuks.repl.co" },
			{ name: "The Bean", url: "bean.imibuks.repl.co" },
			{ name: "KSMV1", url: "ksmv1.codinuser.repl.co" },
			{ name: "KSMV3", url: "ksmv3.imibuks.repl.co" },
			{ name: "Notes", url: "store.imibuks.repl.co/notes/notes.html" },
			{ name: "IMI-OS", url: "imi.imibuks.repl.co" },
			{ name: "IMI-DSK", url: "imi-dsk.imibuks.repl.co" },
			{ name: "Blancstore", url: "blancstore.imibuks.repl.co" },
			{ name: "OurCSS", url: ".imibuks.repl.co" },
			
			{ name: "A: MaterialCode", url: "github.com/PyHubs/MaterialCode/" },
			{ name: "A: TextEditor XP", url: "github.com/PyHubs/TXP" },
			{ name: "A: IJP StoryWriter", url: "github.com/PyHubs/IMI-StoryWriter" },
			{ name: "A: Pixel Draw", url: "github.com/PyHubs/Pixel-Draw" },
			{ name: "A: Workspace UX", url: "github.com/PyHubs/Workspace-UX" },
			{ name: "A: Workspace XP", url: "github.com/PyHubs/Workspace-XP-DAP" },

			
			{ name: "B: Story Jam: Dramatic", url: "store.imibuks.repl.co/books/Story%20Jam_%20The%20Dramatic%20Edition.pdf" },
			{ name: "B: The Chair and Table", url: "store.imibuks.repl.co/books/The%20Chair%20and%20Table.pdf" },
			{ name: "B: Story Jam: Lost Boi", url: "store.imibuks.repl.co/books/Story-Jam-Lost-Boi.pdf" },
			{ name: "B: African Farmer", url: "store.imibuks.repl.co/books/All%20About%20Plant%20Life.pdf" },
			{ name: "B: Plant Info Book", url: "store.imibuks.repl.co/books/All%20About%20Plant%20Life.pdf" },
			{ name: "B: Journal Of A Plant", url: "store.imibuks.repl.co/books/The-Journal-Of-A-Plant.pdf" },
			{ name: "B: Journal Of A Plant (OLD", url: "store.imibuks.repl.co/books/The-Journal-Of-A-Plant-Old.pdf" },
		]);

	}
});

document.addEventListener("click", (e) => {
	if (!e.target.matches("input") && !e.target.matches(".suggestion")) {
		suggestions.innerHTML = "";
	}
});