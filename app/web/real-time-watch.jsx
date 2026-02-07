import React from 'react';
import WebGameScreen from '../../src/web/WebGameScreen';
import { webGames } from '../../src/web/webGames';

const RealTimeWatch = () => <WebGameScreen config={webGames.realTimeWatch} />;

export default RealTimeWatch;
