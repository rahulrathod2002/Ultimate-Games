export const webGames = {
  colorGame: {
    title: 'Color Splash',
    html: require('../../assets/web/color-game/index.html'),
    css: require('../../assets/web/color-game/style.css'),
    js: require('../../assets/web/color-game/script.inline.txt'),
  },
  mcq: {
    title: 'Love Me MCQ',
    html: require('../../assets/web/mcq/index.html'),
    css: require('../../assets/web/mcq/styles.css'),
    js: require('../../assets/web/mcq/script.inline.txt'),
  },
  mingle: {
    title: 'Do You Love Me?',
    html: require('../../assets/web/mingle/index.html'),
    css: require('../../assets/web/mingle/styles.css'),
    js: require('../../assets/web/mingle/script.inline.txt'),
    replacements: {
      'dont press the button.mp3': require('../../assets/web/mingle/dont press the button.mp3'),
      'no god.mp3': require('../../assets/web/mingle/no god.mp3'),
      'thank you so much.mp3': require('../../assets/web/mingle/thank you so much.mp3'),
    },
  },
  realTimeWatch: {
    title: 'Real-Time Watch',
    html: require('../../assets/web/real-time-watch/watch.html'),
    css: require('../../assets/web/real-time-watch/watch.css'),
    js: require('../../assets/web/real-time-watch/watch.inline.txt'),
  },
  watch: {
    title: 'Classic Watch',
    html: require('../../assets/web/watch/watch.html'),
    css: require('../../assets/web/watch/watch.css'),
    js: require('../../assets/web/watch/watch.inline.txt'),
  },
  stonePaperScissors: {
    title: 'Stone Paper Scissors',
    html: require('../../assets/web/stone-paper-scissors/index.html'),
    css: require('../../assets/web/stone-paper-scissors/style.css'),
    js: require('../../assets/web/stone-paper-scissors/app.inline.txt'),
    replacements: {
      './images/rock.png': require('../../assets/web/stone-paper-scissors/images/rock.png'),
      './images/paper.png': require('../../assets/web/stone-paper-scissors/images/paper.png'),
      './images/scissors.png': require('../../assets/web/stone-paper-scissors/images/scissors.png'),
    },
  },
};
