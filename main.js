let questionDiv = document.querySelector('.question');
let optionBtns = document.querySelector('.option_wrapper');
let submitBtn = document.querySelector('.submit_answer');
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    submitBtn.classList.remove('hide');
    displayQuestion();
}

function displayQuestion() {
    resetState();
    let currentQuestion = data[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionDiv.innerHTML = `${questionNo} ${currentQuestion['question']}`;
    currentQuestion.answers.forEach(e => {
        let btn = document.createElement('button');
        btn.innerHTML = e.text;
        optionBtns.append(btn);
        if (e.is_correct) {
            btn.dataset.is_correct = e.is_correct;
        }
        btn.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    submitBtn.style.display = 'none';
    while (optionBtns.firstChild) {
        optionBtns.removeChild(optionBtns.firstChild);
    }
}

function selectAnswer(e) {
    let selectedBtn = e.target;
    let isCorrect = selectedBtn.dataset.is_correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add('active');
        score++;
    } else {
        selectedBtn.classList.add('wrong');
    }
    Array.from(optionBtns.children).forEach(btn => {
        if (btn.dataset.is_correct === "true") {
            btn.classList.add('active');
        }
        btn.disabled = true;
    });
    submitBtn.innerHTML = 'Next';
    submitBtn.style.display = 'block';
}

function showScore() {
    resetState();
    questionDiv.innerHTML = `Your score: ${score} out of ${data.length}`;
    submitBtn.innerHTML = 'Play Again';
    submitBtn.style.display = 'block';
}

function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < data.length) {
        displayQuestion();
    } else {
        showScore();
    }
}

submitBtn.addEventListener('click', () => {
    if (currentQuestionIndex < data.length) {
        handleNextQuestion();
    } else {
        startQuiz();
    }
});

startQuiz();