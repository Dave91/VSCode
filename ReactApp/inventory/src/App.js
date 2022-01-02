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
		items.push(item);
		setData({ items: items });
		console.log(data);
	};

  return (
    <div className="App">
      <div className="row mt-3">
        <h2>Inventory Management Web App</h2>
        <p>Store ur stuff here</p>
        <div className="row mt-3">
          <SearchBar updateSearchParams={updateFilters} />
        </div>
        <div className="row mt-3">
          <AddItem addItem={addItemToData} />
        </div>
      </div>
      <div className="row mt-3">
          <ItemsDisplay items={data["items"]} />
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
