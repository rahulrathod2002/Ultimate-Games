const timeDisplay = document.querySelector('.time-display');

const getTime = () => new Date().toLocaleTimeString();

setInterval(() => {
    timeDisplay.innerHTML = getTime();
}, 1000);
