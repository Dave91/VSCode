import React, { useState } from "react";
import { fetchData, fetchRandomQuote } from "./Data";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [filterMode, setFilterMode] = useState("OR");
  const [quotes, setQuotes] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRandom, setIsRandom] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleRadioChange = (e) => {
    setFilterMode(e.target.value);
  };

  const search = async () => {
    try {
      const resultData = await fetchData(query, filterMode);
      setQuotes(resultData);
      setIsRandom(false);
    } catch (error) {
      console.error("Hiba történt a kereséskor:", error);
      setQuotes([]);
    }
  };

  const randomQuote = async () => {
    try {
      const quote = await fetchRandomQuote();
      setQuotes([quote]);
      setIsRandom(true);
    } catch (error) {
      console.error("Hiba történt a véletlen idézet kérésekor:", error);
      setQuotes([]);
    }
  };

  return (
    <div className={`App ${isDarkMode ? "dark" : ""}`}>
      <div className="search-bar">
        <input
          type="text"
          id="search"
          placeholder="Separate keywords with spaces"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? search() : null)}
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
          <button className="menubtn" onClick={search}>
            Search
          </button>
          <button className="menubtn" onClick={randomQuote}>
            Random Quote
          </button>
        </div>
        <button className="menubtn" id="theme-toggle" onClick={toggleDarkMode}>
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
        {isRandom ? <div className="yoda"></div> : null}
      </div>
    </div>
  );
}

export default App;
