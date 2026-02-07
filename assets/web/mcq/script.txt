document.addEventListener('DOMContentLoaded', () => {
    const options = document.querySelectorAll('.op1, .op2, .op3, .op4');
    const resultText = document.querySelector('.selected_op');
    const optionsContainer = document.querySelector('.options');

    [...options].sort(() => Math.random() - 0.5).forEach(option => {
        optionsContainer.appendChild(option);
        setTimeout(() => {
            option.classList.add('shown');
            option.style.color = 'transparent';
        }, 100);
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(opt => opt.style.color = 'transparent');
            option.style.color = 'white';
            option.style.pointerEvents = 'none'; // Disable further clicks

            setTimeout(() => {
                // resultText.textContent = option.textContent;
                if (option.textContent === 'Like') {
                    resultText.textContent = '👍';
                }
                if (option.textContent === 'Hate') {
                    resultText.textContent = '💔';
                }
                if (option.textContent === 'Love') {
                    resultText.textContent = '❤️';
                }
                if (option.textContent === "Don't Like") {
                    resultText.textContent = '💔';
                }
                resultText.classList.add('show');
            }, 0);
        });
    });
});
// ..............................to show all the options...............................//
// document.addEventListener('DOMContentLoaded', () => {
//     const options = document.querySelectorAll('.op1, .op2, .op3, .op4');
//     const resultText = document.querySelector('.selected_op');
//     const optionsContainer = document.querySelector('.options');

//     [...options].sort(() => Math.random() - 0.5).forEach(option => {
//         optionsContainer.appendChild(option);
//         setTimeout(() => {
//             option.classList.add('shown');
//         }, 100);
//     });

//     options.forEach(option => {
//         option.addEventListener('click', () => {
//             options.forEach(opt => opt.style.color = 'transparent');
//             setTimeout(() => {
//                 option.style.color = 'white';
//                 option.style.pointerEvents = 'none'; // Disable further clicks

//                 setTimeout(() => {
//                     resultText.textContent = option.textContent;
//                     resultText.classList.add('show');
//                 }, 500);
//             }, 300);
//         });
//     });
// });
