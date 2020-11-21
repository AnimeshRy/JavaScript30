let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

window.onload = () => {
    timerDisplay.textContent = '0:0:0'
    endTime.textContent = 'Start Timer!'
}

function timer(seconds) {
    // clear existing timers
    clearTimeout(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds)
    displayEndTime(then);
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now())/1000);
        // check if we stop it 
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    },1000);
}

function displayTimeLeft(secondsleft) {
    const hours = Math.floor(secondsleft / 3600);
    const min = Math.floor((secondsleft - 3600 * hours) / 60);
    const second = Math.floor(secondsleft - 3600 * hours - min * 60);
    const display = [hours, min, second].join(":");
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${adjustedHour}:${
        minutes < 10 ? "0" : ""
    }${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));

// form
document.customForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
    });