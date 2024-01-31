import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer, OnComplete } from 'react-native-countdown-circle-timer'
import { Text } from '@ui-kitten/components';
import { CountdownBarProps } from '../models';

export const CountdownBar:React.FC<CountdownBarProps> = ({OnTimerCompleted, Play, Key}): React.ReactElement => {
    return (
        <CountdownCircleTimer
            isPlaying={Play}
            key={Key}
            duration={5}
            colors={["#8FCC1E","#DB5F63"]}
            colorsTime={[5,0]}
            size={180}
            onComplete={() => OnTimerCompleted()}
        >{() => <Text style={{textAlign: "center"}} category='h1' >KITTY PICS</Text>}</CountdownCircleTimer>
    );
};