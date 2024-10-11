document.addEventListener("DOMContentLoaded", () => {
  const playerSection = document.getElementById("player-section");
  const categorySection = document.getElementById("category-section");
  const nextBtn1 = document.getElementById("nextBtn1");
  const input = document.getElementById("playerName");
  const categoryButtons = document.querySelectorAll(".category-btn");
  let playerName = "";

  // Handle Player Name Input
  nextBtn1.addEventListener("click", () => {
    if (input.value.trim() !== "") {
      playerName = input.value.trim();
      playerSection.style.display = "none";
      categorySection.style.display = "block";
      nextBtn1.style.display = "none";
    } else {
      input.classList.add("error");
      input.placeholder = "Please enter your name";
    }
  });

  input.addEventListener("input", () => {
    input.classList.remove("error");
  });

  // Handle Category Selection
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      startQuiz(category);
    });
  });

  function startQuiz(category) {
    fetch("Quiz_questions.json")
      .then((response) => response.json())
      .then((data) => {
        const questions = data[category];
        if (questions) {
          showQuiz(questions);
        }
      })
      .catch((error) => {
        console.error("Error fetching Quiz_questions:", error);
      });
  }

  function showQuiz(questions) {
    let currentQuestion = 0;
    const totalQuestions = questions.length;
    let score = 0;

    const quizContainer = document.createElement("div");
    quizContainer.classList.add("quiz-container");
    document.body.innerHTML = "";
    document.body.appendChild(quizContainer);

    displayQuestion();

    function displayQuestion() {
      if (currentQuestion < totalQuestions) {
        const questionData = questions[currentQuestion];
        quizContainer.innerHTML = `
                    <h2>${questionData.question}</h2>
                    ${questionData.options
                      .map(
                        (option, index) => `
                        <button class="option-btn">${option}</button>
                    `
                      )
                      .join("")}
                `;

        document.querySelectorAll(".option-btn").forEach((btn, index) => {
          btn.addEventListener("click", () => {
            if (index === questionData.answer) {
              score++;
            }
            currentQuestion++;
            displayQuestion();
          });
        });
      } else {
        quizContainer.innerHTML = `
        <div class="score-container">
        <h2>Done!</h2>
        <h2>${playerName}, your score is ${score}/${totalQuestions}</h2>
                <button id="endBtn">Finished</button>
        </div>
        `;

        let endBtn = document.getElementById("endBtn");
        endBtn.addEventListener("click", function () {
          window.location.href = "Quiz_setup.html";
        });
      }
    }
  }
});
