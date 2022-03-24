
export async function fetchData(query) {
	try {
		fetch("https://type.fit/api/quotes")
			.then(function(response) {return response.json();})
			.then(function(data) {renderData(data);});
	} catch (error) {console.log(error);}
}

async function renderData(data) {
	let container = document.querySelector(".container");
	for (let q in data) {
		let qDiv = document.createElement("div");
		qDiv.className = "quote";
		let qDivText = data[q]["text"] + " - " + data[q]["author"];
		qDiv.innerHTML = qDivText;
		container.appendChild(qDiv);
	}
}
