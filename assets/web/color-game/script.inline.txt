document.addEventListener('DOMContentLoaded', () => {
    const containers = [
        document.querySelector('.container1'),
        document.querySelector('.container2'),
        document.querySelector('.container3'),
        document.querySelector('.container4'),
        document.querySelector('.container5')
    ];

    const colors = [
        '#fcbe24', // random1
        '#9efc24', // random2
        '#24fcea', // random3
        '#fc24c2', // random4
        '#fc243a'  // random5
    ];

    const getRandomColors = () => {
        return colors.sort(() => 0.5 - Math.random());
    };

    containers.forEach(container => {
        container.addEventListener('click', () => {
            const newColors = getRandomColors();
            containers.forEach((cont, index) => {
                cont.style.backgroundColor = newColors[index];
            });
            // console.log(`${container.className} is clicked!`);
        });
    });
});
// document.addEventListener('DOMContentLoaded', () => {
//     let con1 = document.querySelector('.container1');
//     let con2 = document.querySelector('.container2');
//     let con3 = document.querySelector('.container3');
//     let con4 = document.querySelector('.container4');
//     let con5 = document.querySelector('.container5');
//     let containers = [con1, con2, con3, con4, con5];

//     const colors = [
//         '#fcbe24', // random1
//         '#9efc24', // random2
//         '#24fcea', // random3
//         '#fc24c2', // random4
//         '#fc243a'  // random5
//     ];

//     const getRandomColors = () => {
//         let shuffledColors = [...colors].sort(() => 0.5 - Math.random());
//         return shuffledColors;
//     };

//     containers.forEach(container => {
//         container.addEventListener('click', function () {
//             let newColors = getRandomColors();
//             containers.forEach((cont, index) => {
//                 cont.style.backgroundColor = newColors[index];
//             });
//             console.log(`${container.className} is clicked!`);
//         });
//     });
// });
