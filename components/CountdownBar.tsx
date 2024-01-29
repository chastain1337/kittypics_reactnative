import { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { Text } from '@ui-kitten/components';
import { CountdownBarProps } from '../models';

export const CountdownBar:React.FC<CountdownBarProps> = ({OnTimerCompleted}): React.ReactElement => {
    const [iterations, setIterations] = useState(0);

    return (
        <>
        <CountdownCircleTimer
            isPlaying
            duration={5}
            colors={["#8FCC1E","#DB5F63"]}
            colorsTime={[5,0]}
            size={180}
            onComplete={() => {
                let newIterations = iterations+1; 
                setIterations(newIterations)
                OnTimerCompleted(newIterations)
                return { shouldRepeat: true, delay: 1 } // repeat animation in 1.5 seconds
              }}
        >{() => <Text style={{textAlign: "center"}} category='h1' >KITTY PICS</Text>}</CountdownCircleTimer>
        </>
    );
};