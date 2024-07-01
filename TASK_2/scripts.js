// scripts.js
let timer;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

function startPause() {
    const startPauseButton = document.getElementById('startPauseButton');

    if (startPauseButton.textContent === 'Start') {
        start();
    } else {
        pause();
    }
}

function start() {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 10); // Update display every 10ms
    document.getElementById('startPauseButton').textContent = 'Pause';
    document.getElementById('lapButton').style.display = 'inline-block';
}

function pause() {
    clearInterval(timer);
    document.getElementById('startPauseButton').textContent = 'Resume';
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    lapCounter = 1;
    updateDisplay();
    document.getElementById('startPauseButton').textContent = 'Start';
    document.getElementById('lapTimes').innerHTML = '';
    document.getElementById('lapButton').style.display = 'none';
}

function lap() {
    const currentTime = Date.now();
    const lapTime = currentTime - startTime;
    const formattedTime = formatTime(lapTime);
    
    const lapTimesList = document.getElementById('lapTimes');
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${formattedTime}`;
    lapTimesList.appendChild(lapItem);

    lapCounter++;
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('display').textContent = formattedTime;
}

function formatTime(time) {
    let hours = Math.floor(time / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);

    if (hours < 10) { hours = `0${hours}`; }
    if (minutes < 10) { minutes = `0${minutes}`; }
    if (seconds < 10) { seconds = `0${seconds}`; }
    if (milliseconds < 10) { milliseconds = `0${milliseconds}`; }

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function restart() {
    reset();
    document.getElementById('display').textContent = '00:00:00';
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
        document.getElementById('themeToggleButton').textContent = 'Light Mode';
    } else {
        document.getElementById('themeToggleButton').textContent = 'Dark Mode';
    }
}
