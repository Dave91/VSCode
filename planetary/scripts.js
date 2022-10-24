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
  for (let ii = 0; ii < divObjArray.length; ii++) {
    let obj = divObjArray[ii];
    obj.style.left = 46 + Math.sin(delta + ii) * (4 + 4 * ii) + "%";
    obj.style.top = 46 + Math.cos(delta + ii) * (1 + 1 * ii) + "%";
  }
  delta += 0.01;
  requestAnimationFrame(divObjMove);
}

//divObjMove();
