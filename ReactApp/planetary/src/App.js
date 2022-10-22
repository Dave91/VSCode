import "./App.css";
import { useState } from "react";

function App() {
  const Inp = document.getElementById("inp");
  const AnimCheck = document.getElementById("chkb");
  const [inpval, setInpVal] = useState("");
  const [anim, setAnim] = useState(false);
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
      divobj.style.left = 46 + i * 4 + "%";
      divobj.style.top = 46 + i * 4 + "%";
      document.getElementById("objCont").appendChild(divobj);
    }
  }

  divObjCreate();
  let divObjArray = document.getElementsByClassName("objDiv");
  let delta = 0;

  function divObjMove() {
    requestAnimationFrame(divObjMove);
    if (anim) {
      for (let ii = 0; ii < divObjArray.length; ii++) {
        let obj = divObjArray[ii];
        obj.style.left = (anim) ? 46 + Math.sin(delta + ii) * (4 + 4 * ii) + "%" : 46 + ii * 4 + "%";
        obj.style.top = (anim) ? 46 + Math.cos(delta + ii) * (1 + 1 * ii) + "%" : 46 + ii * 4 + "%";
      }
      delta = (anim) ? delta + 0.01 : 0;
    }
  }

  divObjMove();

  return (
    <div>
      <div id="App">
        <div id="objCont">
        </div>

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

        <div class="content" id="content1">
        </div>
      </div>
    </div>
  );
}

export default App;
