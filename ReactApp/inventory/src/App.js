import "./App.css";
import SearchBar from "./SearchBar";
import ItemsDisplay from "./ItemsDisplay";
import AddItem from "./AddItem";
import { useState, useEffect } from "react";

function App() {
	const [filters, setFilters] = useState({});
	const [data, setData] = useState({ items: [] });

  useEffect(() => {
    fetch("http://localhost:3000/items")
    .then((response) => response.json())
    .then((data) => setData({ items: data }));
  }, []);

	const updateFilters = (searchParams) => {
		setFilters(searchParams);
	};

  const deleteItem = (item) => {
    const items = data["items"];
    const requestOptions = {
      method: "DELETE"
    }
    fetch(`http://localhost:3000/items/${item.id}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          const idx = items.indexOf(item);
          items.splice(idx, 1);
          setData({ items: items });
        }
      }
    );
  };

	const addItemToData = (item) => {
		let items = data["items"];

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
          <ItemsDisplay
            deleteItem={deleteItem}
            items={filterData(data["items"])} />
      </div>
    </div>
  );
}

export default App;
