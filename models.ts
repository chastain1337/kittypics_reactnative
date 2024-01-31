import { Key } from "react"

export type CountdownBarProps = {
    OnTimerCompleted:Function
    Play:boolean,
    Key:Key
}

export interface Pic {
    picID:number
    url:string
    votes:number
    lastVote:Date
}