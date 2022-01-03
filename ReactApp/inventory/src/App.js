import "./App.css";
import SearchBar from "./SearchBar";
import ItemsDisplay from "./ItemsDisplay";
import AddItem from "./AddItem";
import { useState } from "react";

function App() {
	const [filters, setFilters] = useState({});
	const [data, setData] = useState({ items: [] });

	const updateFilters = (searchParams) => {
		setFilters(searchParams);
	};

	const addItemToData = (item) => {
		let items = data["items"];
    item.id = items.length;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    };
    
    /* get - get info, post - send info, put - modify, delete - del */
    fetch("http://localhost:3000/items", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        items.push(data);
		    setData({ items: items });
      });
	};

  const filterData = (data) => {
    const filteredData = [];
    
    if (!filters.name) {
      return data;
    }
    
    for (const item of data) {
      if (filters.name !== "" && item.name !== filters.name) {
        continue;
      }
      if (filters.price !== "" && item.price !== filters.price) {
        continue;
      }
      if (filters.type !== "" && item.type !== filters.type) {
        continue;
      }
      if (filters.brand !== "" && item.brand !== filters.brand) {
        continue;
      }
      
      filteredData.push(item);
    }

    return filteredData;
  };

  return (
    <div className="App">
      <div className="row mt-3">
        <h2>Inventory Management Web App</h2>
        <p>Store ur stuff here</p>
      </div>
      <div className="row mt-3">
        <SearchBar updateSearchParams={updateFilters} />
      </div>
      <div className="row mt-3">
        <AddItem addItem={addItemToData} />
      </div>
      <div className="row mt-3">
          <ItemsDisplay items={filterData(data["items"])} />
      </div>
    </div>
  );
}

/* function ButtonState() {
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(0);

  const updateTitleClicked = () => {
    setTitle("Title has changed");
  };

  const updateCounterClicked = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Title: {title}</p>
      <p>Counter: {count}</p>
      <button onClick={updateTitleClicked}>Update Title</button>
      <button onClick={updateCounterClicked}>Update Counter</button>
    </div>
  );
} */

export default App;
