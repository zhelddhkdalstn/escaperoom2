const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const clearBtn = document.getElementById("clearBtn"); // 전체 지우기 버튼

const imgElem = new Image();

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#000000";
ctx.lineWidth = 2.5;

imgElem.onload = function(){
    ctx.drawImage(imgElem, 0, 0, canvas.width, canvas.height);
};

imgElem.src = 'qkdxkfcnfanswp.jpeg';

let painting = false;
let currentColor = "#000000"; // 현재 선택된 색상 저장 변수

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function clearCanvas(){ // 캔버스 전체를 지우는 함수
    ctx.drawImage(imgElem, 0, 0, canvas.width, canvas.height); // 이미지를 다시 그립니다.
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function setDrawingMode(mode) {
    if (mode === "pen") {
        ctx.strokeStyle = currentColor; // 현재 선택된 색상으로 설정
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    if (event.target.id === "clearBtn") {
        clearCanvas(); // 전체 지우기 버튼 클릭 시 캔버스 전체를 지우지 않고, 사용자가 그린 그림만 지웁니다.
    } else {
        currentColor = color; // 현재 선택된 색상 업데이트
        setDrawingMode("pen");
    }
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick));

clearBtn.addEventListener("click", handleColorClick);
