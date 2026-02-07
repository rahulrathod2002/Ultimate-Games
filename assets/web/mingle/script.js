let isFirstTime = true;
let audioEnabled = false;

document.addEventListener('click', function enableAudio() {
    audioEnabled = true;
    document.removeEventListener('click', enableAudio);
});

document.getElementById('noBtn').addEventListener('mouseover', function () {
    if (!audioEnabled) {
        document.body.click();
        audioEnabled = true;
    }

    const noBtn = document.getElementById('noBtn');

    const x = Math.random() * (window.innerWidth - noBtn.clientWidth);
    const y = Math.random() * (window.innerHeight - noBtn.clientHeight);
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    if (audioEnabled) {
        if (isFirstTime) {
            const firstAudio = document.getElementById('firstAudio');
            firstAudio.currentTime = 0; // Start from the beginning
            firstAudio.play().then(() => {
                setTimeout(() => {
                    firstAudio.pause();
                }, 9000);
            }).catch(error => {
                console.error("Audio play failed:", error);
            });

            isFirstTime = false;
        } else {
            const secondAudio = document.getElementById('secondAudio');
            secondAudio.currentTime = 0;
            secondAudio.play();
        }
    }
});

document.getElementById('yesBtn').addEventListener('click', function () {
    const messageBox = document.getElementById('messageBox');
    messageBox.innerText = 'I 👍 U ✌️';
    messageBox.style.display = 'block';

    if (audioEnabled) {
        const yesAudio = document.getElementById('yesAudio');
        yesAudio.play().then(() => {
            // setTimeout(() => {
            //     yesAudio.pause();
            // }, 2000);
        });
    }
});
