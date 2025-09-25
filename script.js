const quizData = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Computer Style System", "Creative Style Syntax"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What was the first name of Javascript?",
    options: ["JavaScript", "Mocha", "TypecSript", "ECMAScript"],
    answer: "Mocha"
  },
  {
    question: "Which company developed Java?",
    options: ["Microsoft", "Google", "Sun Microsystems", "IBM"],
    answer: "Sun Microsystems"
  },
  {
    question: "Which year was JavaScript launched?",
    options: ["1996", "1995", "1994", "1997"],
    answer: "1995"
  }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const quizContainer = document.getElementById("quiz-container");

function loadQuestion() {
  if (currentQuestion < quizData.length) {
    let q = quizData[currentQuestion];
    quizContainer.innerHTML = `
      <h5>Question ${currentQuestion + 1} of ${quizData.length}</h5>
      <p class="fw-bold">${q.question}</p>
      <div class="list-group">
        ${q.options.map(opt => `
          <label class="list-group-item option">
            <input type="radio" name="answer" value="${opt}" class="form-check-input me-2">
            ${opt}
          </label>
        `).join('')}
      </div>
      <button class="btn btn-primary mt-3 w-100" onclick="nextQuestion()">Next</button>
    `;
  } else {
    showResult();
  }
}

function nextQuestion() {
  const selected = document.querySelector("input[name='answer']:checked");
  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  let answer = selected.value;
  userAnswers.push(answer);

  if (answer === quizData[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;
  loadQuestion();
}

function showResult() {
  localStorage.setItem("lastScore", score);

  let resultHTML = `
    <h4 class="mb-3">Your Score: ${score} / ${quizData.length}</h4>
    <ul class="list-group mb-3">
      ${quizData.map((q, i) => `
        <li class="list-group-item">
          <strong>Q${i + 1}: ${q.question}</strong><br>
          Your Answer: <span class="${userAnswers[i] === q.answer ? 'text-success' : 'text-danger'}">
            ${userAnswers[i] || "Not Answered"}
          </span><br>
          Correct Answer: <span class="text-success">${q.answer}</span>
        </li>
      `).join('')}
    </ul>
    <button class="btn btn-success w-100 mb-2" onclick="tryAgain()">Try Again</button>
  `;

  const lastScore = localStorage.getItem("lastScore");
  if (lastScore !== null) {
    resultHTML += `<p class="text-muted">Last saved score: ${lastScore} / ${quizData.length}</p>`;
  }

  quizContainer.innerHTML = resultHTML;
}

function tryAgain() {
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  loadQuestion();
}

loadQuestion();
