const Inp = document.getElementById("inp");
const AnimCheck = document.getElementById("chkb");

function onInputChange() {
  let inpval = Inp.value;
}

function onAnimChange() {
  if (AnimCheck.checked) {
    divObjMove();
  }
}

function searchBtnPressed() {
  // search txt given (mars), show that content (mars)
  contentShow();
}

function contentShow() {
  let cont = document.getElementById("content1");
  cont.className += " contshow";
}

//document.getElementById("content1").addEventListener("click", contentShow);

function divObjCreate() {
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
    //setTimeout(500, divObjMove);
  }
}

divObjMove();
