// const questions = [2, 4, 6, 8, 10];
// ARRAY OF OBJECTS
const questions = [
  {
    q: "What is the capital of india?",
    a: "New Delhi",
    opt: ["Jaipur", "Mumbai", "New Delhi", "Kolkata"],
  },
  {
    q: "Which is the national bird of India?",
    a: "Peacock",
    opt: ["Sparrow", "Peacock", "Parrot", "Corw"],
  },
  {
    q: "Which is the 2024 Cricket T20 world cup?",
    a: "India",
    opt: ["India", "Australia", "South Africa", "West Indies"],
  },
  {
    q: "Who is the president of India?",
    a: "New Delhi",
    opt: ["APJ Abdul Kalam", "Draupadi Murmu", "Rahul gandhi", "Narendra MOdi"],
  },
];


const userAnswers = [];


const randomOrder = getARandomOrder();
const questionDiv = document.querySelector(".question")
const timerDiv = document.querySelector(".timer")
const quizDiv = document.querySelector("#quiz")
const scoreDiv = document.querySelector("#score")
const paragraphs = document.querySelectorAll(".option")
const score = document.querySelector("#score span");

let timer = 5;
let count = 0;
let id1;
let id2;
let isQuestionAnswered = false;

timerDiv.innerHTML = timer;
// PRINT THE FIRST QUESTION INSTANTLY ON PAGE LOAD
printQuestion();

id2 = setInterval(() =>{
    if (timer === 1) {
        timer = 5;
        timerDiv.innerHTML = timer;
    } else timerDiv.innerHTML = --timer;
}, 1000);

id1 = setInterval(() =>{
  if(count === questions.length - 1){
    //T o check te last question
    checkUserAnswer();

    //clear the question
    clearInterval(id1);
    //clear  the timer
    clearInterval(id2);

    quizDiv.classList.add("hidden");

    calculateScore();
    
    scoreDiv.classList.remove("hidden");
  }  else{
    // Increament the question number
    count++;

    //To check all question except the last one
    checkUserAnswer();

    //Enable all options again
    enableAllOptions();

    //Change the question
    printQuestion();
  }
}, 5000);

function printQuestion() {
  questionDiv.innerHTML = questions[count].q
  paragraphs.forEach((para, index) =>{
    para.innerHTML = questions[count].opt[index];
  });
}

paragraphs.forEach((para) =>{
  para.addEventListener("click", storeUserAnswer);
});

  function storeUserAnswer(e){
    isQuestionAnswered = true;
    userAnswers.push(e.target.innerHTML);
    disableAlloptions();
    console.log(userAnswers);
  }

  function checkUserAnswer(){
    //INSERT NULL IS USER DIDN'T ANSWER
    if(isQuestionAnswered === false) {
      userAnswers.push(null);
      console.log(userAnswers);
    }
    //RESET VARIABLE TO false IF USER ANSWERED
    else{
      isQuestionAnswered = false;
    }
}

function calculateScore() {
  let finalScore = 0;
  userAnswers.forEach((userAnswers, index) =>{
    if(userAnswers === questions[index].a) finalScore++;
  });
  score.innerHTML = `${finalScore} / ${questions.length}`;
}

function disableAlloptions() {
  paragraphs.forEach((para) =>{
    para.classList.add("pointer-none")
  })
}

function enableAllOptions() {
  paragraphs.forEach((para) =>{
    para.classList.remove("pointer-none");
  });
}

//RANDOM
function printQuestion(){
  questionDiv.innerHTML = `Q${count + 1}. ${questions[randomOrder[count]].q}`;
  paragraphs.forEach((para, index) =>{
    para.innerHTML = questions[randomOrder[count]].opt[index];
  });
}

function calculateScore() {
  let finalScore = 0;
  userAnswers.forEach((userAnswers, index) =>{
    if(userAnswers === questions[randomOrder[index]].a) finalScore++;
  });
  score.innerHTML = `${finalScore} / ${questions.length}`;
}

function getARandomOrder(){
  let temp = [];
  for(let i = 0; i < questions.length; i++){
    const randomValue = Math.floor(Math.random() * questions.length);
    if(temp.includes(randomValue)) return getARandomOrder();
    else{
      temp.push(randomValue);
    }
  }
  return temp;
}
