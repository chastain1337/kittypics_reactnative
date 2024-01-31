import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, FlatList, View, TouchableOpacity, GestureResponderEvent, Pressable } from 'react-native';
import { Pic } from "../models";
import { Image, ImageLoadEventData, } from 'expo-image';
import { images } from "./images";
import { Icon, IconElement, Text } from "@ui-kitten/components";
import { castVote } from "../data";

type PicsGridProps = {
    Data: Pic[],
    OnPicsLoaded:Function,
    OnVoteCast:Function
}

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const PicsGrid: React.FC<PicsGridProps> = ({ Data,OnPicsLoaded,OnVoteCast }): React.ReactElement => {
    const [votedForIdx, setVotedForIdx] = useState<number|null>(null);
    const [hoveredPic, setHoveredPic] = useState<number | null>(null)
    const [picsRendered,setPicsRendered] = useState(0)
    const [winningIdx, setWinningIdx] = useState(0)
    const screenWidth = Dimensions.get('window').width;
    const columns = screenWidth >= 800 ? 2 : 1;

    useEffect( () => {
        console.log("Pics have changed, resetting voted status")
        setVotedForIdx(null)    // if list of pics changes, reset voted status
        setPicsRendered(0)
    },[Data])

    useEffect(() => {
        if (picsRendered === Data.length) OnPicsLoaded()
    },[picsRendered])

    const handleOnLoad = (e: ImageLoadEventData) => {
        // start timer after initial picture load
        setPicsRendered(prev => prev + 1)
    }
    
    async function handleOnPress(idx: number) {
        if (votedForIdx != null) return;
        setVotedForIdx(idx);
        
        let maxVotes = 0;
        Data.forEach((d,i) => {
            const actualVotes = d.votes  + (idx === i ? 1 : 0)
            if (actualVotes > maxVotes) {
                maxVotes = d.votes
                setWinningIdx(i)
            }
        })

        // does parent component care if we voted?
        OnVoteCast()

        // cast vote to database
        await castVote(Data[idx].picID)
    }

    

    const CrownIcon = (): IconElement => (
        <Icon style={{width: 50, height: 50}} fill="#FFFFFF" name="award" />
      );

    return (
        <FlatList data={Data} numColumns={columns} key={columns} renderItem={(d) => {
            let pressableStyle = { ...styles.picsContainer };
            if (hoveredPic == d.index) pressableStyle = { ...pressableStyle, ...styles.hoveredStyle }

            let picStyle = {...styles.pic}
            if (votedForIdx != null) picStyle = {...picStyle, ...styles.opacity }

            const textOverlay = votedForIdx === null 
                ? null : 
                (<View style={{margin: "auto", zIndex: 1, alignItems: "center" }}>
                    <Text category="h1">
                        {d.item.votes + (votedForIdx === d.index ? 1 : 0)}
                    </Text>
                    {d.index === winningIdx ? CrownIcon() : null}
                </View>)

            return (
                <View style={{width: 325, height: 325, alignItems: "center", justifyContent: "center" }}>
                <Pressable style={pressableStyle} onPress={() => handleOnPress(d.index)} onHoverOut={() => setHoveredPic(null)} onHoverIn={() => setHoveredPic(d.index)} >
                    {textOverlay}
                    <Image onLoad={handleOnLoad} placeholder={blurhash} transition={500} key={d.item.picID} source={images[d.item.picID]} style={picStyle} contentFit="contain" />
                </Pressable>
                </View>)
        }
        } />
    )
}

const dim = 300;
const styles = StyleSheet.create({
    picsContainer: {
        width: dim,
        height: dim,
        margin: "auto",
        justifyContent: "center",
        alignContent: "center"
    },
    hoveredStyle: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 5,
        shadowOpacity: .57,
        transform: [{ scale: 1.08 }],
    },
    pic: {
        width: dim,
        height: dim,
        position: "absolute"
    },
    opacity: {
        opacity: 0.3,
    }

})