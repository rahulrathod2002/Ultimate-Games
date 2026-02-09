const appJson = require('./app.json');

module.exports = ({ config }) => {
  const baseConfig = config ?? appJson.expo;
  const runNumber = Number.parseInt(process.env.GITHUB_RUN_NUMBER, 10);
  const buildNumber = Number.isFinite(runNumber) ? runNumber : baseConfig.android?.versionCode ?? 1;

  return {
    ...baseConfig,
    icon: './assets/images/UltimateGames.png',
    splash: {
      ...(baseConfig.splash ?? {}),
      image: './assets/images/UltimateGames.png',
    },
    android: {
      ...(baseConfig.android ?? {}),
      versionCode: buildNumber,
      adaptiveIcon: {
        ...(baseConfig.android?.adaptiveIcon ?? {}),
        foregroundImage: './assets/images/UltimateGames.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      ...(baseConfig.web ?? {}),
      favicon: './assets/images/UltimateGames.png',
    },
    extra: {
      ...(baseConfig.extra ?? {}),
      buildNumber: String(buildNumber),
    },
  };
};
