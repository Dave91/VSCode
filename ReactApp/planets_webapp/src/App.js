import "./App.css";
import { useState } from "react";

function App() {
  const Inp = document.getElementById("inp");
  const AnimCheck = document.getElementById("chkb");
  const [inpval, setInpVal] = useState("");
  const [anim, setAnim] = useState("false");
  const onInputChange = function() {
    setInpVal(Inp.value);
  };
  const onAnimChange = function() {
    setAnim(AnimCheck.checked);
  }
  const searchBtnPressed = function() {
    // search txt given (mars), show that content (mars)
  };

  function divObjCreate () {
    for (let i = 0; i < 10; i++) {
      let divobj = document.createElement("div");
      divobj.className = "objDiv";
      divobj.innerHTML = " ";
      divobj.id = "d" + i;
      divobj.style.left = 49 + i * 4 + "%";
      divobj.style.top = 49 + i * 4 + "%";
      document.getElementById("objCont").appendChild(divobj);
    }
    let divObjArray = document.getElementsByClassName("objDiv");
  }

  divObjCreate();

  return (
    <div>
      <div id="App">
        <h2>Download from YouTube</h2>
        <div>
          <input
            id="inp"
            type="text"
            placeholder="Enter/Paste a valid URL here..."
            value={inpval}
            onChange={onInputChange}
          />
        </div>
        <div>
          <label for="chkb">Animation: </label>
          <input
            title="Toggle animation"
            type="checkbox"
            id="chkb"
            checked={anim}
            onChange={onAnimChange}
          />
        </div>
        <button type="button" onClick={searchBtnPressed}>
          Download
        </button>

        <div id="objCont">
        </div>

        <div class="content" id="content1">
        </div>
      </div>
    </div>
  );
}

export default App;
