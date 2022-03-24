import React from 'react';
import { fetchData } from './Data';
import './App.css';

function App() {
  fetchData();
  return (
    <div className="App">
      <div>
        <input
          type="text"
          className='search'
          placeholder='Type something here'
        />
      </div>
      <div className="container"></div>
    </div>
  );
}

export default App;
