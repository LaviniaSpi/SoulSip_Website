// -- Data -- //

// -- Drinks --// 
const drinks = {
  matcha: {
    name: "Quiet Matcha",
    tagline: "For the introspective.",
    image: "images/matcha.jpg",
    traits: ["Reflective", "Steady", "Curious"],
    ingredients: ["Ceremonial matcha", "Oat milk", "Honey", "Vanilla"],
    pairing: "You keep a notebook close and listen more than you speak.",
  },
  rose: {
    name: "Rose Reverie",
    tagline: "For the romantic.",
    image: "images/rose.jpg",
    traits: ["Soft", "Imaginative", "Open-hearted"],
    ingredients: ["Hibiscus tea", "Rose syrup", "Lemon", "Sparkling water", "Rose petals"],
    pairing: "You fall in love with mornings, strangers, and small details.",
  },
  espresso: {
    name: "Midnight Tonic",
    tagline: "For the focused.",
    image: "images/espresso.jpg",
    traits: ["Driven", "Sharp", "Independent"],
    ingredients: ["Double espresso", "Tonic water", "Orange peel", "Ice"],
    pairing: "A strong drink for a mind that moves fast and finishes what it starts.",
  },
  golden: {
    name: "Golden Hour",
    tagline: "For the grounded.",
    image: "images/golden.jpg",
    traits: ["Warm", "Generous", "Patient"],
    ingredients: ["Turmeric", "Coconut milk", "Cinnamon", "Black pepper", "Honey"],
    pairing: "You're the one who remembers, who hosts, who holds the room together.",
  },
  lavender: {
    name: "Lavender Lull",
    tagline: "For the dreamer.",
    image: "images/lavender.jpg",
    traits: ["Gentle", "Creative", "Playful"],
    ingredients: ["Lemon juice", "Lavender honey syrup", "Sparkling water", "Fresh lavender"],
    pairing: "You notice the light on the wall and write poems in your head.",
  },
};

const questions = [
  { q: "It's a free Saturday morning. You…", a: [
    { text: "Read by the window with a drink", drink: "matcha" },
    { text: "Walk somewhere you've never been", drink: "rose" },
    { text: "Knock out the to-do list before noon", drink: "espresso" },
    { text: "Cook breakfast for whoever's around", drink: "golden" },
    { text: "Stay in bed making little plans", drink: "lavender" },
  ]},
  { q: "Pick a weather:", a: [
    { text: "Soft grey fog", drink: "matcha" },
    { text: "Pink sunset after rain", drink: "rose" },
    { text: "Crisp wind, bright cold", drink: "espresso" },
    { text: "Late summer warmth", drink: "golden" },
    { text: "Golden afternoon light", drink: "lavender" },
  ]},
  { q: "Your friends would describe you as…", a: [
    { text: "The thoughtful one", drink: "matcha" },
    { text: "The romantic one", drink: "rose" },
    { text: "The decisive one", drink: "espresso" },
    { text: "The dependable one", drink: "golden" },
    { text: "The creative one", drink: "lavender" },
  ]},
  { q: "A perfect evening is…", a: [
    { text: "Quiet, one person, a long talk", drink: "matcha" },
    { text: "Candles, music, slow dinner", drink: "rose" },
    { text: "Finishing something I'm proud of", drink: "espresso" },
    { text: "A full table of people I love", drink: "golden" },
    { text: "Drifting through an idea I had", drink: "lavender" },
  ]},
  { q: "You're drawn to objects that are…", a: [
    { text: "Worn-in and weighty", drink: "matcha" },
    { text: "Delicate and decorative", drink: "rose" },
    { text: "Sharp, minimal, precise", drink: "espresso" },
    { text: "Handmade and warm", drink: "golden" },
    { text: "Strange, soft, a little odd", drink: "lavender" },
  ]},
  { q: "When something goes wrong, you…", a: [
    { text: "Sit with it before reacting", drink: "matcha" },
    { text: "Talk it through with someone close", drink: "rose" },
    { text: "Fix it, then move on", drink: "espresso" },
    { text: "Hold space for everyone else first", drink: "golden" },
    { text: "Wander until your head clears", drink: "lavender" },
  ]},
  { q: "Pick a place to live for a year:", a: [
    { text: "A stone cottage near a forest", drink: "matcha" },
    { text: "An old apartment in Paris", drink: "rose" },
    { text: "A clean loft in a busy city", drink: "espresso" },
    { text: "A farmhouse with a big kitchen", drink: "golden" },
    { text: "A studio above a flower shop", drink: "lavender" },
  ]},
  { q: "Your texting style is…", a: [
    { text: "Considered, sometimes slow", drink: "matcha" },
    { text: "Warm, full of feelings", drink: "rose" },
    { text: "Short, useful, on point", drink: "espresso" },
    { text: "Checking in, making plans", drink: "golden" },
    { text: "Voice notes, tangents, jokes", drink: "lavender" },
  ]},
  { q: "Choose a sound:", a: [
    { text: "Rain on a window", drink: "matcha" },
    { text: "A vinyl record crackling", drink: "rose" },
    { text: "A typewriter at speed", drink: "espresso" },
    { text: "A kettle starting to whistle", drink: "golden" },
    { text: "Wind chimes from far away", drink: "lavender" },
  ]},
  { q: "What do you want from your next year?", a: [
    { text: "More stillness", drink: "matcha" },
    { text: "More beauty", drink: "rose" },
    { text: "More progress", drink: "espresso" },
    { text: "More togetherness", drink: "golden" },
    { text: "More wonder", drink: "lavender" },
  ]},
];

// ===== State =====
let currentQuestion = 0;
let scores = {};

// ===== Page switching =====
const pages = {
  home: document.getElementById("home-page"),
  test: document.getElementById("test-page"),
  result: document.getElementById("result-page"),
};

function showPage(name) {
  Object.values(pages).forEach(p => p.classList.add("hidden"));
  pages[name].classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (name === "test") startTest();
}

// ===== Render the menu on the home page =====
function renderMenu() {
  const grid = document.getElementById("drink-grid");
  grid.innerHTML = Object.values(drinks).map(d => `
    <article class="drink-card">
      <img src="${d.image}" alt="${d.name}">
      <div class="body">
        <h3>${d.name}</h3>
        <p class="tagline">${d.tagline}</p>
        <p class="ing">${d.ingredients.join(", ")}</p>
      </div>
    </article>
  `).join("");
}

// ===== Test logic =====
function startTest() {
  currentQuestion = 0;
  scores = { matcha: 0, rose: 0, espresso: 0, golden: 0, lavender: 0 };
  renderQuestion();
}

function renderQuestion() {
  const { q, a } = questions[currentQuestion];
  const total = questions.length;

  document.getElementById("progress-text").textContent =
    `Question ${currentQuestion + 1} of ${total}`;
  document.getElementById("progress-fill").style.width =
    `${((currentQuestion) / total) * 100}%`;
  document.getElementById("question-text").textContent = q;

  const list = document.getElementById("answer-list");
  list.innerHTML = a.map((ans, i) =>
    `<button class="answer-btn" data-index="${i}">${ans.text}</button>`
  ).join("");

  list.querySelectorAll(".answer-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.index);
      pickAnswer(a[idx].drink, btn);
    });
  });
}

function pickAnswer(drinkKey, btn) {
  scores[drinkKey]++;
  btn.classList.add("selected");

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }, 200);
}

function showResult() {
  // Find the drink with the highest score
  const winnerKey = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])[0][0];
  const drink = drinks[winnerKey];

  document.getElementById("result-image").src = drink.image;
  document.getElementById("result-image").alt = drink.name;
  document.getElementById("result-name").textContent = drink.name;
  document.getElementById("result-tagline").textContent = drink.tagline;
  document.getElementById("result-pairing").textContent = drink.pairing;

  document.getElementById("result-traits").innerHTML =
    drink.traits.map(t => `<span class="trait-tag">${t}</span>`).join("");

  document.getElementById("result-ingredients").innerHTML =
    drink.ingredients.map(i => `<li>${i}</li>`).join("");

  showPage("result");
}

// ===== Init =====
renderMenu();
