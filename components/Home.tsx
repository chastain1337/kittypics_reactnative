import React, { Key, useEffect,useState } from 'react'
import Loading from './Loading'
import { Button, Text } from '@ui-kitten/components';
import { CountdownBar } from './CountdownBar';
import { getRandomPics } from '../data';
import { Pic } from '../models';
import { PicsGrid } from './PicsGrid';
import { SafeAreaView, View } from 'react-native';
import { AxiosError } from 'axios';
import Constants from 'expo-constants';

export default function Home() {
    const [loadingPics, setLoadingPics] = useState(true);
    const [pics,setPics] = useState([] as Pic[])
    const [iterationsWithoutAVote,setIterationsWithoutAVote] = useState(0)
    const [playTimer, setPlayTimer] = useState(false)
    const [keyToRestartTimer,setKeyToRestartTimer] = useState(0)  // timer restarts whenever this is changed, kinda silly if you ask me

    const setup = async () => {
        setPlayTimer(false)
        setLoadingPics(true)
        try {
            setPics(await getRandomPics(4));
            setLoadingPics(false)
        } catch (error) {
            const axiosError = error as AxiosError
            console.error(axiosError.code, axiosError.request)
            console.error(axiosError.stack)
        }
    }

    useEffect(() => {
        setup();
    },[])
    
    const onTimerCompleted = async () => {
        setIterationsWithoutAVote((prevIterations) => prevIterations + 1);
        await setup();
        setKeyToRestartTimer((prevKey) => prevKey+1)
    }

    if (iterationsWithoutAVote >= 5) {
        return (<View>
            <Text>It's been awhile since you voted. Are you still there?</Text>
            <Button onPress={() => setIterationsWithoutAVote(0)}>Yes!</Button>
        </View>)
    }

    return (
        <SafeAreaView>
            <View style={{paddingTop: Constants.statusBarHeight, alignItems: "center"}}>
            <CountdownBar Play={playTimer} OnTimerCompleted={onTimerCompleted} Key={keyToRestartTimer} />
            <Text category="h6" style={{marginVertical: 10}}>Vote on which picture you like most.</Text>
            {loadingPics 
            ? <Loading /> 
            : <PicsGrid Data={pics} OnPicsLoaded={() => setPlayTimer(true)} OnVoteCast={() => setIterationsWithoutAVote(0)} /> }
            </View>
        </SafeAreaView>
    )
}