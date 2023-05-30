/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  const submitButton = document.querySelector('#btnSubmit');
  const resetButton = document.querySelector('#btnReset');
  const countdown = document.querySelector('#time');
  const result = document.querySelector('#result');

  const countdownTime = 60; // 3 minutes in seconds
  let timer;

  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
  });
  submitButton.addEventListener('click', function (e) {
    calculateScore();
  });
  resetButton.addEventListener('click', function (e) {
    resetQuiz();
  });

  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia?',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: 'What is the capital of Finland?',
      o: ['Helsinki', 'Edinburgh', 'Lima', 'Perth'],
      a: 0,
    },
    {
      q: 'What is the smallest planet in our solar system?',
      o: [
        'Frigus ',
        'Omicron Persei 8',
        'Omicron Ceti III',
        'Dwarf Planet Ceres',
      ],
      a: 3,
    },
  ];

  const endQuiz = () => {
    const score = calculateScore();
    alert(`Time's up! Your score: ${score}/${quizArray.length}`);
  };

  // function to Display the quiz questions and answers from the object
  const resetQuiz = () => {
    location.reload();
  };
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `
      <div class="card mb-3">
        <div class="card-header">Q - ${index + 1}: ${quizItem.q}</div>
        <div class="card-body">
    `;
      quizItem.o.forEach((option, i) => {
        quizDisplay += `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="radio${index}" id="radio_${index}_${i}">
          <label class="form-check-label" for="radio_${index}_${i}">
            ${option}
          </label>
        </div>
      `;
      });
      quizDisplay += `</div></div>`;
    });
    quizWrap.innerHTML = quizDisplay;
  };

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    quizArray.forEach((quizItem, index) => {
      let chosenOptionIndex = null;
      for (let i = 0; i < quizItem.o.length; i++) {
        let r = `radio_${index}_${i}`;
        radioElement = document.querySelector('#' + r);
        if (radioElement.checked) {
          chosenOptionIndex = i;
          break; // Exit the loop once we find a checked radio button.
        }
      }
      if (chosenOptionIndex !== null) {
        const correctAnswerElement = document.querySelector(
          `#radio_${index}_${quizItem.a}`
        ).parentElement;
        if (chosenOptionIndex === quizItem.a) {
          score++;
          correctAnswerElement.style.backgroundColor = 'green';
        } else {
          const chosenOptionElement = document.querySelector(
            `#radio_${index}_${chosenOptionIndex}`
          ).parentElement;
          chosenOptionElement.style.backgroundColor = 'red';
          correctAnswerElement.style.backgroundColor = 'green';
        }
      }
    });
    alert(`Your score: ${score}/${quizArray.length}`);
    result.innerHTML = `Your score: ${score}/${quizArray.length}`;
  };

  const startCountdown = () => {
    let time = countdownTime;
    timer = setInterval(() => {
      if (time < 1) {
        clearInterval(timer);
        endQuiz();
      } else {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        countdown.textContent = `${minutes}:${seconds
          .toString()
          .padStart(2, '0')}`;
        time--;
      }
    }, 1000);
  };

  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
    startCountdown(); // start the countdown timer
  });

  // call the displayQuiz function
  displayQuiz();
});
