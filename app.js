const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Resizing
function resizeCanvas() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

resizeCanvas();

let painting = false;
let color = "#000000";
let width = 10;

document.querySelector(".color-picker-input").addEventListener("change", () => {
  color = document.querySelector(".color-picker-input").value;
});

document.querySelector("#thickness-adjust").addEventListener("change", () => {
  document.querySelector(".thickness-indicator").style.height =
    document.querySelector("#thickness-adjust").value + "px";

  document.querySelector(".thickness-indicator").style.width =
    document.querySelector("#thickness-adjust").value + "px";
  width = document.querySelector("#thickness-adjust").value;
});

document.querySelector(".popup").addEventListener("click", (e) => {
  if (e.target != document.querySelector("#thickness-adjust")) {
    console.log("hey");
  }
});

function eraserMode() {
  width = 20;
  color = "#fff";
  console.log("eraser");
}

function penMode() {
  width = 10;
  color = document.querySelector(".color-picker-input").value;
  console.log("pen");
}

function showPopup(sel) {
  let popup = document.querySelector(sel);
  popup.classList.toggle("popup-hidden");
}

function startPos(e) {
  painting = true;
  draw(e);
}

function finishedPos() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;
  else {
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.lineCap = "round";

    ctx.lineTo(e.pageX, e.pageY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.pageX, e.pageY);
  }
}

function drawTouch(e) {
  if (!painting) return;
  else {
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.lineCap = "round";

    ctx.lineTo(e.touches[0].pageX, e.touches[0].pageY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.touches[0].pageX, e.touches[0].pageY);

    // console.log(e.touches[0].pageX);
  }
}

function toggleToolbarVisibility(sel) {
  let toolbar = document.querySelector(sel);
  toolbar.classList.toggle("toolbar-hidden");
}

function updatePicker(sel, val) {
  let picker = document.querySelector(sel);
  picker.style.background = val;
}

document.querySelector("#dl-link").addEventListener("click", () => {
  document.querySelector("#dl-link").href = canvas.toDataURL();
  document.querySelector("#dl-link").download = "doodly-art-" + Date.now();
});

// Event Listeners
window.addEventListener("resize", resizeCanvas);

canvas.addEventListener("mousedown", startPos);
canvas.addEventListener("mouseup", finishedPos);
canvas.addEventListener("mousemove", draw);

canvas.addEventListener("touchstart", startPos, false);
canvas.addEventListener("touchend", finishedPos, false);
canvas.addEventListener("touchcancel", finishedPos, false);
canvas.addEventListener("touchmove", drawTouch, false);
