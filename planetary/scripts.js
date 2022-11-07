const Inp = document.getElementById("inp");
const AnimCheck = document.getElementById("chkb");
const SearchBtn = document.getElementById("searchbtn");
const ContFrame = document.getElementById("contFrame");
let objNameList = [
  "Sun",
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptun",
  "Pluto",
];

AnimCheck.addEventListener("change", function () {
  if (AnimCheck.checked) {
    divObjMove();
  }
});

function contentShow(objname) {
  AnimCheck.checked = false;
  ContFrame.src = "https://www.princeton.edu/~willman/planetary_systems/Sol/";
  ContFrame.className = "content contshow";
}

function searchBtnPressed() {
  let inpval = Inp.value;
  contentShow(inpval);
}

Inp.addEventListener("keypress", function (ev) {
  if (ev.key == "Enter") {
    searchBtnPressed();
  }
});

SearchBtn.addEventListener("click", searchBtnPressed);

function divObjCreate() {
  for (let i = 0; i < 10; i++) {
    let divobj = document.createElement("div");
    divobj.className = "objDiv";
    divobj.innerHTML = " ";
    divobj.id = objNameList[i];
    divobj.style.left = 48 + i * 4 + "%";
    divobj.style.top = 48 + i * 4 + "%";
    document.getElementById("objCont").appendChild(divobj);
    divobj.addEventListener("mouseenter", function () {
      this.innerHTML = "-" + this.id;
    });
    divobj.addEventListener("mouseleave", function () {
      this.innerHTML = " ";
    });
    divobj.addEventListener("click", function () {
      contentShow(this.id);
    });
  }
}

divObjCreate();

let divObjArray = document.getElementsByClassName("objDiv");
let delta = 0;

function divObjMove() {
  if (AnimCheck.checked) {
    requestAnimationFrame(divObjMove);
    for (let ii = 0; ii < divObjArray.length; ii++) {
      let obj = divObjArray[ii];
      if (ii > 0) {
        obj.style.left = 48 + Math.sin(delta + ii) * (4 + 4 * ii) + "%";
        obj.style.top = 48 + Math.cos(delta + ii) * (2 + 2 * ii) + "%";
      }
    }
    delta += 0.01;
  }
}

divObjMove();
