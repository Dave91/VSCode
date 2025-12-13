import React, { useState } from "react";
import { fetchData } from "./Data";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [filterMode, setFilterMode] = useState("OR");
  const [quotes, setQuotes] = useState([]);

  const handleRadioChange = (e) => {
    setFilterMode(e.target.value);
  };

  const search = async (event) => {
    if (event.key === "Enter") {
      try {
        const resultData = await fetchData(query, filterMode);
        setQuotes(resultData);
      } catch (error) {
        console.error("Hiba történt a kereséskor:", error);
        setQuotes([]);
      }
    }
  };

  return (
    <div className="App">
      <div className="search-bar">
        <input
          type="text"
          id="search"
          placeholder="Kutass az Erőben..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={search}
        />
        <div className="opt">
          <input
            type="radio"
            id="optOr"
            name="relation"
            value="OR"
            checked={filterMode === "OR"}
            onChange={handleRadioChange}
          />
          <label htmlFor="optOr">OR</label>
          <input
            type="radio"
            id="optAnd"
            name="relation"
            value="AND"
            checked={filterMode === "AND"}
            onChange={handleRadioChange}
          />
          <label htmlFor="optAnd">AND</label>
          <label id="resNum"> / (Találat: {quotes.length})</label>
        </div>
      </div>

      <div className="container">
        {!quotes || quotes.length === 0 ? (
          <div className="yoda"></div>
        ) : (
          quotes.map((quoteItem, index) => (
            <div key={index} className="quote">
              {quoteItem.text} - {quoteItem.author || "Unknown"}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
