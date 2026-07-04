const questions = [
  {
    type: "mcq",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Multi Language",
      "None"
    ],
    answer: 0
  },
  {
    type: "multi",
    question: "Which are frontend technologies?",
    options: ["HTML", "CSS", "Node.js", "JavaScript"],
    answer: [0, 1, 3]
  },
  {
    type: "fill",
    question: "_____ is used for styling web pages.",
    answer: "CSS"
  },
  {
    type: "mcq",
    question: "Which language runs in browser?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: 2
  }
];

let current = 0;
let score = 0;

function loadQuestion() {
  const q = questions[current];
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");

  optionsEl.innerHTML = "";

  questionEl.innerText = q.question;

  if (q.type === "mcq") {
    q.options.forEach((opt, index) => {
      optionsEl.innerHTML += `
        <label class="option">
          <input type="radio" name="option" value="${index}">
          ${opt}
        </label>
      `;
    });
  }

  else if (q.type === "multi") {
    q.options.forEach((opt, index) => {
      optionsEl.innerHTML += `
        <label class="option">
          <input type="checkbox" value="${index}">
          ${opt}
        </label>
      `;
    });
  }

  else if (q.type === "fill") {
    optionsEl.innerHTML = `
      <input type="text" id="fillAnswer" placeholder="Type your answer"/>
    `;
  }
}

function nextQuestion() {
  const q = questions[current];

  if (q.type === "mcq") {
    const selected = document.querySelector('input[name="option"]:checked');
    if (selected && parseInt(selected.value) === q.answer) {
      score++;
    }
  }

  else if (q.type === "multi") {
    const selected = [...document.querySelectorAll('input[type="checkbox"]:checked')]
      .map(cb => parseInt(cb.value));

    if (arraysEqual(selected.sort(), q.answer.sort())) {
      score++;
    }
  }

  else if (q.type === "fill") {
    const ans = document.getElementById("fillAnswer").value.trim();
    if (ans.toLowerCase() === q.answer.toLowerCase()) {
      score++;
    }
  }

  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function arraysEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function showResult() {
  document.getElementById("quiz-box").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("scoreText").innerText =
    `${score} / ${questions.length}`;
}

function restartQuiz() {
  current = 0;
  score = 0;
  document.getElementById("quiz-box").classList.remove("hidden");
  document.getElementById("result").classList.add("hidden");
  loadQuestion();
}

loadQuestion();