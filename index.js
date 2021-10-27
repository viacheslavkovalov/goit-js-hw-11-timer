
const refs = {
    timer: document.querySelector('#timer-1'),
    daysFieldEl: document.querySelector('[data-value="days"]'),
    hoursFieldEl: document.querySelector('[data-value="hours"]'),
    minsFieldEl: document.querySelector('[data-value="mins"]'),
    secondsFieldEl: document.querySelector('[data-value="secs"]'),
}

class CountdownTimer{
    constructor({ onTick,  selector, targetDate}) {
        this.intervalId = null;
        this.onTick = onTick;
        this.selector = selector;
        this.targetDate = targetDate;
        this.do()
    };

    do() {
        let deltaTime = undefined;
        if (deltaTime <= 0) {
            refs.timer.textContent = 'ПОЗДРАВЛЯЕМ С ДНЕМ РОЖДЕНИЯ!';
            clearInterval(this.intervalId);
            return 
        };

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            deltaTime = this.targetDate - currentTime;
            const time = this.getTimeComponents(deltaTime);
            this.onTick(time);
        }, 1000)
    }

    getTimeComponents(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return {days, hours, mins, secs };
    };
    
    pad(value) {
    return String(value).padStart(2, '0');
    };
};

const timer = new CountdownTimer({
    onTick: updateTimerInfo,
    selector: '#timer-1',
    targetDate: new Date('Jan 16, 2022').getTime(),
});


function updateTimerInfo({days, hours, mins, secs }) {
    // refs.daysFieldEl.textContent = `${days}`;
    // refs.hoursFieldEl.textContent = `${hours}`;
    // refs.minsFieldEl.textContent = `${mins}`;
    // refs.secondsFieldEl.textContent = `${secs}`;

    refs.timer.innerHTML =
    "<div class=\"days\"> \
  <div class=\"numbers\">" + days + "</div>days</div> \
<div class=\"hours\"> \
  <div class=\"numbers\">" + hours + "</div>hours</div> \
<div class=\"minutes\"> \
  <div class=\"numbers\">" + mins + "</div>minutes</div> \
<div class=\"seconds\"> \
  <div class=\"numbers\">" + secs + "</div>seconds</div> \
</div>";
}
