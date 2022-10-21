import React from 'react';
import { fetchData } from './Data';
import './App.css';

function App() {
  const search = async (event) => {
    if (event.key === "Enter") {
      document.querySelector(".container").innerHTML = null;
      let filtMode = document.querySelector('input[name="relation"]:checked').value;
      let inputText = document.getElementById("search");
      let query;
      if (inputText.value) {
        query = inputText.value;
      }
      await fetchData(query, filtMode);
    }
  }
  // OR / AND value goes to Data.js logic
  return (
    <div className="App">
      <div className='search-bar'>
        <input
          type="text"
          id='search'
          placeholder='Type something here...'
          onKeyDown={search}
        />
        <div className='opt'>
          <input type="radio" id='optOr' name='relation' value="OR" defaultChecked={true}></input>
          <label form='optOr'>OR</label>
          <input type="radio" id='optAnd' name='relation' value="AND"></input>
          <label form='optAnd'>AND</label>
          <label id='resNum'> / (Found:)</label>
        </div>
      </div>
      <div className="container"></div>
      <img className='yoda' src='./yoda.gif' alt='yoda'></img>
    </div>
  );
}

export default App;
