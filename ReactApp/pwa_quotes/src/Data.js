import DBdata from "./DB.js";

export async function fetchData(query, filtMode) {
  const yodaImg = document.querySelector(".yoda");
  if (yodaImg) yodaImg.remove();

  let results = [];

  if (query) {
    const qWords = query.toLowerCase().split(" ");
    results = getFilteredData(DBdata, qWords, filtMode);
  } else {
    results = DBdata;
  }

  renderResults(results);
}

function getFilteredData(data, qWords, filtMode) {
  return data.filter((item) => {
    const text = item.text.toLowerCase();
    const author = (item.author || "Unknown").toLowerCase();
    const fullText = `${text} ${author}`;

    if (filtMode === "AND") {
      return qWords.every((word) => fullText.includes(word));
    } else {
      return qWords.some((word) => fullText.includes(word));
    }
  });
}

function renderResults(results) {
  const container = document.querySelector(".container");
  const resNum = document.getElementById("resNum");

  if (resNum) {
    resNum.innerHTML = ` / (Found: ${results.length})`;
  }

  if (results.length === 0) {
    showNullResult();
    return;
  }

  if (container) {
    results.forEach((item) => {
      const author = item.author || "Unknown";
      const qDiv = document.createElement("div");
      qDiv.className = "quote";
      qDiv.innerHTML = `"${item.text}" (${author})`;
      container.appendChild(qDiv);
      setTimeout(() => {
        qDiv.style.opacity = "1";
      }, 100);
    });
  }
}

function showNullResult() {
  const app = document.querySelector(".App");
  if (app && !document.querySelector(".yoda")) {
    const yodaImg = document.createElement("img");
    yodaImg.className = "yoda";
    yodaImg.src = "./yoda.gif";
    yodaImg.alt = "Yoda - No results";
    app.appendChild(yodaImg);
  }
}
