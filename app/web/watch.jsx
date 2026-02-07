import React from 'react';
import WebGameScreen from '../../src/web/WebGameScreen';
import { webGames } from '../../src/web/webGames';

const Watch = () => <WebGameScreen config={webGames.watch} />;

export default Watch;
