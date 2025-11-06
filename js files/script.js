
// --- PAGE ELEMENTS ---
const openBtn = document.getElementById("openPlanner");
const backBtn = document.getElementById("backToCover");
const coverPage = document.getElementById("cover");
const plannerPage = document.getElementById("planner");

// --- QUOTES ---
const verses = [
    { verse: "“Trust in Jehovah with all your heart.” — Proverbs 3:5", motivation: "Flow with faith and clarity 🌿" },
    { verse: "“Let your light shine before men.” — Matthew 5:16", motivation: "Your creativity inspires others ✨" },
    { verse: "“Do not be anxious about anything.” — Philippians 4:6", motivation: "Calm mind, focused heart 💭" },
    { verse: "“The joy of Jehovah is your stronghold.” — Nehemiah 8:10", motivation: "Find strength in gratitude 🌞" },
    { verse: "“Love never fails.” — 1 Corinthians 13:8", motivation: "Lead with love, always 💚" }
];

function showRandomQuote() {
  const random = verses[Math.floor(Math.random() * verses.length)];
    document.querySelector(".quote").textContent = random.verse;
    document.querySelector(".motivation").textContent = random.motivation;
}

// --- PAGE SWITCH ---
openBtn.addEventListener("click", () => {
    coverPage.style.opacity = "0";
    setTimeout(() => {
    coverPage.classList.remove("active");
    plannerPage.classList.add("active");
    showRandomQuote();
    }, 600);
});

backBtn.addEventListener("click", () => {
    plannerPage.style.opacity = "0";
setTimeout(() => {
    plannerPage.classList.remove("active");
    coverPage.classList.add("active");
    coverPage.style.opacity = "1";
    }, 600);
});

// --- POMODORO TIMER (with local save) ---
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
  saveTimerState();
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
  saveTimerState();
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

// --- DURATION SELECTION ---
focusSelect.addEventListener("change", (e) => {
  focusTime = parseInt(e.target.value) * 60;
  if (isFocus) time = focusTime;
  saveTimerState();
  updateTimer();
});

breakSelect.addEventListener("change", (e) => {
  breakTime = parseInt(e.target.value) * 60;
  if (!isFocus) time = breakTime;
  saveTimerState();
  updateTimer();
});

// --- LOCAL SAVE: Timer ---
function saveTimerState() {
    const state = {
    time,
    isFocus,
    focusTime,
    breakTime,
    focusSelect: focusSelect.value,
    breakSelect: breakSelect.value,
  };
  localStorage.setItem("pomodoroState", JSON.stringify(state));
}

function loadTimerState() {
  const saved = JSON.parse(localStorage.getItem("pomodoroState"));
  if (saved) {
    time = saved.time;
    isFocus = saved.isFocus;
    focusTime = saved.focusTime;
    breakTime = saved.breakTime;
    focusSelect.value = saved.focusSelect;
    breakSelect.value = saved.breakSelect;
    modeDisplay.textContent = isFocus ? "Focus" : "Break 🌸";
    pomodoroBox.style.backgroundColor = isFocus
      ? "rgba(255,255,255,0.85)"
      : "rgba(232,246,234,0.9)";
  }
  updateTimer();
}
loadTimerState();

// --- LOCAL SAVE: Notes ---
const textAreas = document.querySelectorAll("textarea");

textAreas.forEach((area, index) => {
  // Load saved note
  const savedText = localStorage.getItem(`note-${index}`);
  if (savedText) area.value = savedText;

  // Save on input
  area.addEventListener("input", () => {
    localStorage.setItem(`note-${index}`, area.value);
  });
});
