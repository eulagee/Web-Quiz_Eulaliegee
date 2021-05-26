// Varaiables >> To keep tract of Game time
let currentQuestion = -1;
let score = 0;
let timeLeft = 0;
let timer;
let qN = 0;

let highScore = {
    initial: '',
    score: 0,
}

function displayHighestScore() {

}

// funtion to start the game

function start() {
    document.getElementById('webquizbody').style.display = 'block';
    //each question is allocated 15 seconds each 
    timeLeft = Questions.length * 15;
    document.getElementById("timeLeft").innerHTML = timeLeft

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endgame();
        }
    }, 1000);

    nextQuestion(qN);
}

function nextQuestion(qn) {
    const currentQuestion = Questions[qn];
    document.getElementById('startContainer').style.display = 'none';
    const container = document.getElementById('webquizbody');
    container.innerHTML = "";
    const title = document.createElement("h2");
    title.innerText = currentQuestion.title;
    container.appendChild(title);
    const choicesDiv = document.createElement('div');
    // choicesDiv.style.display = 'flex';
    // choicesDiv.style.flexDirection = 'column';
    choicesDiv.className = 'choices';

    const choices = currentQuestion.Choices;
    choices.forEach(choice => {
        const label = document.createElement("label");

        const radioBtn = document.createElement("input");
        radioBtn.type = 'radio';
        radioBtn.name = 'q' + qn;
        radioBtn.value = choice;
        // radioBtn.onclick = theFunction()

        radioBtn.onchange = (e) => {
            console.log(e.target.value);
            const answer = e.target.value;
            if (answer === currentQuestion.Answer) {
                score++;



            } else {
                //sutracting 15 seconds per incorrect question answered
                timeLeft -= 15;

            }
            //if the itme is less than 0 -> make the timeLEft equal zero (this should prevent any negative numbers rendering)
            if (timeLeft < 0) {
                timeLeft = 0;
                endgame();
            }
            setTimeout(() => {

                qN = qn++
                    console.log(qn);
                if (qn < Questions.length) {
                    nextQuestion(qn);
                } else {
                    endgame();
                }

            }, 500);
            // nextQuestion(qn++);
        }
        label.appendChild(radioBtn);
        const span = document.createElement('span');
        span.innerText = choice;
        label.appendChild(span);
        choicesDiv.appendChild(label);

    });
    container.appendChild(choicesDiv);

}

function setScore() {
    highScore.initial = document.getElementById('name').value;
    highScore.score = score;
    localStorage.setItem('highScore', JSON.stringify(highScore));

    displayScore();
}

function displayScore() {
    const score = highScore ? `<h3>${highScore.initial} - ${highScore.score}</h3>` : ''
    let webquizContent = `
    ${score}
    <div>
    <button onclick="back()">Back</button>
    <button onclick="clearScore()">Clear</button>
    </div>`;
    document.getElementById("scoreContainer").innerHTML = webquizContent;
}

function viewHighScore() {
    const highScore = localStorage.getItem('highScore');
    if (highScore) {
        highScore = JSON.parse(highScore);
        displayScore();
    }
}

function back() {
    qN = 0;
    document.getElementById("timeLeft").innerHTML = 0
    document.getElementById('startContainer').style.display = 'block';
    document.getElementById('scoreContainer').style.display = 'none';
}

function clearScore() {
    score = 0;
    localStorage.removeItem('highScore');
    displayScore();

}
//function to end the game

function endgame() {
    document.getElementById('webquizbody').style.display = 'none';
    clearInterval(timer);
    console.log(qN, Questions.length);
    const gameOver = qN !== Questions.length ? '<h2>Game over!</h2>' : '';
    let webquizContent = `
${gameOver}
<h3>You got a ` + score + ` /100!</h3>
<h3>That means you got ` + score / 20 + ` questions correct!</h3>
<div>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>
</div>`;

    document.getElementById("scoreContainer").innerHTML = webquizContent;
}