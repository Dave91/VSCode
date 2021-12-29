import "./App.css";
import { PropTypes } from "prop-types"
import Info from "./info.js";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <Info />
      <ButtonState></ButtonState>
      {/* <AddItem text="Dave" number={4} />
      <AddItem text="..." />
      <AddItem text="test" /> */}
    </div>
  );
}

function AddItem(props) {
  // { text, number }, no props needed, = def val
  const value = props.text;

  return (
    <form>
      <label for="text-form">Type stg: </label>
      <input type="text" value={value} id="text-form" />
      <p>{props.number}</p>
    </form>
  );
}

function ButtonState() {
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
}

function Data(props) {
  return (
    <div>
      <p>Title: {props.title}</p>
      <p>Count: {props.count}</p>
    </div>
  )
}

/* AddItem.defaultProps = {
  number: 2,
  text: "default",
};

AddItem.propTypes = {
  number: PropTypes.number,
  text: PropTypes.string,
}; */

export default App;
