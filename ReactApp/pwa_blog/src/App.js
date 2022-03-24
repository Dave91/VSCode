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
  return (
    <div className="App">
      <div className='search-bar'>
        <input
          type="text"
          id='search'
          placeholder='Type something here'
          onKeyDown={search}
        />
      </div>
      <div className="container"></div>
    </div>
  );
}

export default App;
