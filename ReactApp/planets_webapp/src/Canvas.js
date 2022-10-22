import { createElement } from "react";

const cont1 = document.getElementById("content1");
/*
const content2 = document.getElementById("cont2");
const content3 = document.getElementById("cont3");
const content4 = document.getElementById("cont4");
*/

const menuChkb = document.getElementById("m-chkb");
let toggleAnim = false;
let winW = window.innerWidth;
let winH = window.innerHeight;
//let size = winH / 100;
let particleArray;

// init
function divObjInit() {
  particleArray = [];

  

  particleArray = document.getElementsByClassName("objDiv");
}

//divObjInit();

// anim loop
let delta = 0;
function animate() {
  requestAnimationFrame(animate);
  /*
  if (toggleAnim) {
    for (let obj of particleArray) {
      let id = 0;
      if (id > 0) {
        let x = 0;
        let y = 0;
        x = winW / 2 + Math.sin(delta + id) * (50 + 50 * id);
        y = winH / 2 + Math.cos(delta + id) * (20 + 20 * id);
      }
    }
    delta += 0.01;
  }
  */
}

//animate();

// events
window.addEventListener("resize", function () {
  winW = window.innerWidth;
  winH = window.innerHeight;
  //size = winH / 100;
});

function onInputChange() {
  toggleAnim = (menuChkb.checked) ? true : false;
  divObjInit();
  delta = 0;
}

menuChkb.addEventListener("change", onInputChange);

function onObjClick(ev) {
  let contHideCss =
    "display: none; width: 15%; top: 50rem; background: navajowhite; max-height: 38%;";
  let contShowCss =
    "display: block; width: 90%; top: 5rem; background: rgba(255, 150, 50, 0.7); max-height: 83%;";


  /*
	content2.style = contHideCss;
	content3.style = contHideCss;
	content4.style = contHideCss;
	menuBtn1.style = "border: 1px solid black;";
	menuBtn2.style = "border: 1px solid black;";
	menuBtn3.style = "border: 1px solid black;";
	menuBtn4.style = "border: 1px solid black;";

	if (event.target === menuBtn1) {
		menuBtn1.style = "border: 1px solid white;";
		content1.style = contShowCss;
	}
	if (event.target === menuBtn2) {
		menuBtn2.style = "border: 1px solid white;";
		content2.style = contShowCss;
	}
	if (event.target === menuBtn3) {
		menuBtn3.style = "border: 1px solid white;";
		content3.style = contShowCss;
	}
	if (event.target === menuBtn4) {
		menuBtn4.style = "border: 1px solid white;";
		content4.style = contShowCss;
	}
	*/
}

document.addEventListener("click", onObjClick);
