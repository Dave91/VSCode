import "./App.css";
import { useState } from "react";

function App() {
  const UrlInput = document.getElementById("url-input");
  const UrlImg = document.getElementById("url-img");
  const [yturl, setYturl] = useState("");
  const searchBtnPressed = function() {
    setYturl(UrlInput.value);
    /* here comes getYtUrl.py (pytube actions) */
    UrlImg.src = ""
  };
  console.log(yturl);

  return (
    <div className="App">
      <section className="header">
        <div className="row">
          <h2>Download from YouTube</h2>
        </div>
      </section>
      <section className="content">
        <div className="row">
          <input
            id="url-input"
            type="text"
            placeholder="Enter/Paste a valid URL here..."
            value={yturl}
          />
        </div>
        <div className="row">
          <button type="button" onClick={searchBtnPressed}>
            Download
          </button>
        </div>
        <div className="row">
          <img id="url-img" src="" alt=""></img>
        </div>
      </section>
      <section className="footer">
        <div className="row">
        </div>
      </section>
    </div>
  );
}

export default App;
