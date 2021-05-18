//Question Constructor
function Question(text,choices,answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}


//Question Prototype
Question.prototype.checkAnswer = function(answer){
    return this.answer === answer;
}

//Soruları Yonetecek Olan Constructor Oluşturuldu
//Quiz Constructor
function Quiz(questions){
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}

//Quiz Prototypye - Soruyu indexine göre getirme
Quiz.prototype.getQuestion = function(){
    return this.questions[this.questionIndex];
}

//Quiz Prototypye - Soruların bitmesi kısmı
Quiz.prototype.isFinish = function(){
    return this.questions.length === this.questionIndex;
}

//Quiz Prototypye - Sorunun ve cevabın getirilmesi 
Quiz.prototype.guess = function(answer){
    let question = this.getQuestion();

    if(question.checkAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}


let q1 = new Question("What is the best programming?",
["Python","JavaScript","C#","C++"],
"JavaScript");

let q2 = new Question("What is your favourite programming language?",
["Python","JavaScript","C#","C++"],
"JavaScript");  
                    
let q3 = new Question("What is the most popular programming?",
["Python","JavaScript","C#","C++"],
 "JavaScript"); 

let questions = [q1,q2,q3];

// Start Quiz

let quiz = new Quiz(questions);

loadQuestion();

function loadQuestion(){
    if(quiz.isFinish()){
        showScore();
    }
    else{
        let question = quiz.getQuestion();
        let choices = question.choices;
        document.querySelector('#question').textContent = question.text;

        for(i=0;i<choices.length;i++){
            let element = document.querySelector('#choice'+i);
            element.innerHTML = choices[i];
            guess('btn'+i,choices[i]);
        }
        showProgress();
    }
    
}

function guess(id,guess){
    let btn = document.getElementById(id);
    btn.onclick = function(){
        quiz.guess(guess);
        loadQuestion();
    }
}

function showScore(){
    let html = `<h2>Score</h2><h4>${quiz.score}</h4>`;

    document.querySelector('.card-body').innerHTML = html;
}

function showProgress(){
    let totalQuestion = quiz.questions.length;
    let questionNumber = quiz.questionIndex+1;
    document.querySelector('#progress').innerHTML = 
    'Question ' + questionNumber + ' of ' + totalQuestion;

}