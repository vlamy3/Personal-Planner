// --- Page Switch ---
const openBtn = document.getElementById("openPlanner");
const backBtn = document.getElementById("backToCover");
const coverPage = document.getElementById("cover");
const plannerPage = document.getElementById("planner");

// --- Quotes & Verses ---
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

// --- Page Switch ---
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

// --- Pomodoro Timer ---
let time = 25 * 60;
let timerInterval;
const timerDisplay = document.getElementById("timer");

function updateTimer() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

document.getElementById("start").addEventListener("click", () => {
    if (!timerInterval) {
    timerInterval = setInterval(() => {
        time--;
        updateTimer();
        if (time <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        alert("Pomodoro complete! Take a mindful break 🌸");
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
    time = 25 * 60;
    updateTimer();
});

updateTimer();
