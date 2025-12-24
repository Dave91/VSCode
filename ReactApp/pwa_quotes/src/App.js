import React, { useState } from "react";
import { fetchData } from "./Data";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [filterMode, setFilterMode] = useState("OR");
  const [quotes, setQuotes] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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
    <div className={`App ${isDarkMode ? "dark" : ""}`}>
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
          <label htmlFor="optOr">or</label>
          <input
            type="radio"
            id="optAnd"
            name="relation"
            value="AND"
            checked={filterMode === "AND"}
            onChange={handleRadioChange}
          />
          <label htmlFor="optAnd">and</label>
          <label id="resNum"> (Found: {quotes.length})</label>
        </div>
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
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
