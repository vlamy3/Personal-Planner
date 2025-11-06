// --- Page Switch ---
document.getElementById("openPlanner").addEventListener("click", () => {
    document.getElementById("cover").classList.remove("active");
    document.getElementById("planner").classList.add("active");
    showRandomQuote();
});

// --- Quotes & Verses ---
const verses = [
    { verse: "“Trust in Jehovah with all your heart.” — Proverbs 3:5", motivation: "Flow with faith and clarity 🌿" },
    { verse: "“Let your light shine before men.” — Matthew 5:16", motivation: "Your creativity inspires others ✨" },
    { verse: "“Do not be anxious about anything.” — Philippians 4:6", motivation: "Calm mind, focused heart 💭" },
    { verse: "“The joy of Jehovah is your stronghold.” — Nehemiah 8:10", motivation: "Find strength in gratitude 🌞" },
    { verse: "“Love never fails.” — 1 Corinthians 13:8", motivation: "Lead with love, always 💚" }
];

function showRandomQuote() {
    const today = new Date().getDate();
    const quote = verses[today % verses.length];

    document.querySelector(".quote").textContent = quote.verse;
    document.querySelector(".motivation").textContent = quote.motivation;
}

openBtn.addEventListener("click", () => {
  // Start fade transition
    coverPage.style.opacity = "0";

  // Wait for fade-out to finish, then switch pages
    setTimeout(() => {
    coverPage.classList.remove("active");
    plannerPage.classList.add("active");
    showRandomQuote();
  }, 600); // matches the CSS transition duration
});
document.body.style.backgroundColor = "#faf8f5";
