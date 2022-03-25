
export async function fetchData(query) {
	try {
		fetch("https://type.fit/api/quotes")
			.then(function(response) {return response.json();})
			.then(function(data) {renderData(data, query);});
	} catch (error) {console.log(error);}
}

async function renderData(data, query) {
	let container = document.querySelector(".container");
	let qWords = query.split(" ");
	for (let q in data) {
		var matchFound = false;
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
