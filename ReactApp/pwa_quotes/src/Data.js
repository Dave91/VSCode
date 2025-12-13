import DBdata from "./DB.js";

export async function fetchData(query, filtMode) {
  let results = [];

  if (query) {
    const qWords = query.toLowerCase().split(" ");
    results = getFilteredData(DBdata, qWords, filtMode);
  } else {
    results = DBdata;
  }

  return results;
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
