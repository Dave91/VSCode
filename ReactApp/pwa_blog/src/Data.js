
export async function fetchData(query) {
	try {
		fetch("https://type.fit/api/quotes")
			.then(function(response) {return response.json();})
			.then(function(data) {renderData(data, query);});
	} catch (error) {console.log(error);}
}

async function renderData(data, query) {
	let container = document.querySelector(".container");
	for (let q in data) {
		if ((data[q]["text"] + data[q]["author"]).includes(query)) {
			let qDiv = document.createElement("div");
			qDiv.className = "quote";
			let qDivText = '"' + data[q]["text"] + '" (' + data[q]["author"] + ')';
			qDiv.innerHTML = qDivText;
			container.appendChild(qDiv);
			setTimeout(function() {
				qDiv.style.opacity = "1";
			}, 250);
		}
	}
}
