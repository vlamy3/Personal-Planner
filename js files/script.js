// --- Pomodoro Timer ---
let focusTime = 25 * 60;
let breakTime = 5 * 60;
let time = focusTime;
let timerInterval;
let isFocus = true;

const timerDisplay = document.getElementById("timer");
const modeDisplay = document.getElementById("mode");
const focusSelect = document.getElementById("focus");
const breakSelect = document.getElementById("break");
const pomodoroBox = document.querySelector(".pomodoro");

function updateTimer() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function switchMode() {
    isFocus = !isFocus;
    if (isFocus) {
    time = focusTime;
    modeDisplay.textContent = "Focus";
    pomodoroBox.style.backgroundColor = "rgba(255,255,255,0.85)";
    } else {
        time = breakTime;
        modeDisplay.textContent = "Break 🌸";
        pomodoroBox.style.backgroundColor = "rgba(232,246,234,0.9)";
    }
    updateTimer();
}

document.getElementById("start").addEventListener("click", () => {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
        time--;
        updateTimer();
        if (time <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        if (isFocus) {
            alert("Focus complete! Time for a peaceful break 🌿");
        } else {
            alert("Break complete! Let’s flow back into focus 💫");
        }
        switchMode();
        }
    }, 1000);
    }
});

document.getElementById("pause").addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

document.getElementById("reset").addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    isFocus = true;
    time = focusTime;
    modeDisplay.textContent = "Focus";
    pomodoroBox.style.backgroundColor = "rgba(255,255,255,0.85)";
    updateTimer();
});

// Update duration selections
focusSelect.addEventListener("change", (e) => {
  focusTime = parseInt(e.target.value) * 60;
    if (isFocus) {
    time = focusTime;
    updateTimer();
}
});

breakSelect.addEventListener("change", (e) => {
  breakTime = parseInt(e.target.value) * 60;
    if (!isFocus) {
    time = breakTime;
    updateTimer();
    }
});

updateTimer();
