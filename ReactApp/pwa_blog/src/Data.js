
export async function fetchData(query) {
	try {
		fetch("https://type.fit/api/quotes")
			.then(function(response) {return response.json();})
			.then(function(data) {renderData(data, query);});
	} catch (error) {console.log(error);}
}

async function renderData(data, query) {
	let yodaImg = document.querySelector(".yoda");
	yodaImg.remove();
	// if no results, yoda comes back :)
	// document.querySelector(".App").appendChild(yodaImg);
	let container = document.querySelector(".container");
	let qWords = query.split(" ");
	for (let q in data) {
		var matchFound = false;
		// AND: count after word trues
		// if count res = qWords.length only then create div etc
		for (let word in qWords) {
			console.log(qWords[word]);
			if ((data[q]["text"] + data[q]["author"]).includes(qWords[word])) {
				matchFound = true;
			}
		}
		if (matchFound) {
			let qDiv = document.createElement("div");
			qDiv.className = "quote";
			let qDivText = '"' + data[q]["text"] + '" (' + data[q]["author"] + ')';
			qDiv.innerHTML = qDivText;
			container.appendChild(qDiv);
			setTimeout(function() {
				qDiv.style.opacity = "1";
			}, 100);
		}
	}
}
