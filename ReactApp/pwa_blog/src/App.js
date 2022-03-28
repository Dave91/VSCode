import React from 'react';
import { fetchData } from './Data';
import './App.css';

function App() {
  const search = async (event) => {
    if (event.key === "Enter") {
      document.querySelector(".container").innerHTML = null;
      let inputText = document.getElementById("search");
      let query;
      if (inputText.value) {
        query = inputText.value;
      }
      await fetchData(query);
    }
  }
  // input radiobtns OR / AND conn tween qwords
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
          <input type="radio" id='optOr' name='relation'></input>
          <label form='optOr'>OR</label>
          <input type="radio" id='optAnd' name='relation'></input>
          <label form='optAnd'>AND</label>
        </div>
        <audio controls loop="true">
          <source src='./dan_bodan_-_fortress_europe.mp3' type='audio/mpeg'></source>
        </audio>
      </div>
      <div className="container"></div>
      <img className='yoda' src='./yoda.gif' alt='yoda'></img>
    </div>
  );
}

export default App;
