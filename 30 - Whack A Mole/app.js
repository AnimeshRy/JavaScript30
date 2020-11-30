const Game = (holes,scoreBoard,moles,button,hScore) => {
    let lastHole;
    let timeUp = false;
    let score = 0;
    let highscore = localStorage.getItem("hScore") || 0;

    function randtime(min,max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function randomHole(holes) {
        const idx = Math.floor(Math.random() * holes.length);
        const hole = holes[idx];
        if (hole === lastHole) {
            return randomHole(holes)
        }
        lastHole = hole;
        return hole;
    }

    function peep() {
        const time = randtime(200, 1000);
        const hole = randomHole(holes);
        hole.classList.add("up");
        setTimeout(() => {
            hole.classList.remove('up');
            if (!timeUp) peep();
        }, time)
    }

    function startGame() {
        scoreBoard.textContent = 0;
        timeUp = false;
        score = 0;
        button.disabled = true;
        peep();
        setTimeout(() =>{ 
            timeUp = true
            button.disabled = false;
        }, 10000)
    }

    function setHighScore() {
        if (score >= highscore) {
            highscore = score;
            updateLocalStorage(highscore);
            hScore.textContent = highscore;
        }
    }

    function updateLocalStorage(highscore) {
        localStorage.setItem("hScore", highscore);
    }

    function bonk(e) {
        if (!e.isTrusted) return; // cheater
        score++;
        setHighScore();
        this.classList.remove('up');
        scoreBoard.textContent = score;
    }

    moles.forEach(mole => mole.addEventListener('click', bonk))

    return { startGame }
}

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const button = document.querySelector('.start');
const hScore = document.querySelector('.hs');
const player = Game(holes, scoreBoard, moles, button, hScore);

button.onclick = function()  {
    player.startGame();
}

window.onload = () => {
    if (localStorage.length !== 0) {
        hScore.textContent = localStorage.getItem("hScore")
    }
}