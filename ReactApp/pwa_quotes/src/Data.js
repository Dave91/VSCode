
export async function fetchData(query, filtMode) {
	try {
		fetch("https://type.fit/api/quotes")
			.then(function(response) {return response.json();})
			.then(function(data) {
				let yodaImg = document.querySelector(".yoda");
				if (yodaImg) {yodaImg.remove();}
				if (query) {
					let qWords = query.split(" ");
					filterData(data, qWords, filtMode);
				} else {
					fullResult(data);
				}
			});
	} catch (error) {console.log(error);}
}

async function filterData(data, qWords, filtMode) {
	var dataTxt;
	var dataAuth;
	var matchResult = 0;
	for (let q in data) {
		var matchWord = 0;
		dataTxt = data[q]["text"];
		dataAuth = data[q]["author"];
		if (dataAuth === null) {dataAuth = "Unknown";}
		for (let word in qWords) {
			if ((dataTxt + dataAuth).toLowerCase().includes(qWords[word].toLowerCase())) {
				matchWord++;
			}
		}
		if (filtMode === "OR" && 0 < matchWord) {
			matchResult++
			renderData(dataTxt, dataAuth);
		}
		if (filtMode === "AND" && matchWord === qWords.length) {
			matchResult++
			renderData(dataTxt, dataAuth);
		}
	}
	postResult(matchResult);
}

async function renderData(dataTxt, dataAuth) {
	let container = document.querySelector(".container");
	let qDiv = document.createElement("div");
	qDiv.className = "quote";
	qDiv.innerHTML = '"' + dataTxt + '" (' + dataAuth + ')';
	container.appendChild(qDiv);
	setTimeout(function() {
		qDiv.style.opacity = "1";
	}, 100);
}

async function postResult(matchResult) {
	document.getElementById("resNum").innerHTML = " / (Found: " + matchResult + ")";
	if (matchResult === 0) {
		nullResult();
	}
}

async function nullResult() {
	document.getElementById("resNum").innerHTML = " / (Found: 0)";
	let yodaImg = document.querySelector(".yoda");
	if (!yodaImg) {
		yodaImg = document.createElement("img");
		yodaImg.className = "yoda";
		yodaImg.src = './yoda.gif';
		yodaImg.alt ='yoda';
		document.querySelector(".App").appendChild(yodaImg);
	}
}

async function fullResult(data) {
	var dataTxt;
	var dataAuth;
	var matchResult = 0;
	for (let q in data) {
		dataTxt = data[q]["text"];
		dataAuth = data[q]["author"];
		if (dataAuth === null) {dataAuth = "Unknown";}
		matchResult++
		renderData(dataTxt, dataAuth);
	}
	postResult(matchResult);
}
