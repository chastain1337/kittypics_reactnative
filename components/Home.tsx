import React from 'react'
import Loading from './Loading'
import { Text } from '@ui-kitten/components';
import { CountdownBar } from './CountdownBar';

export default function Home() {
    const func = (iterations:number) => console.log(iterations)
    const apiUrl = process.env.NODE_ENV;
    console.log(process.env);
    return (
        <>
            <CountdownBar OnTimerCompleted={func} />
            <Text category="h5">Vote on which picture you like most.</Text>
            <Text>Environment: {apiUrl}</Text>
        </>
    )
}