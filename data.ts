import axios, { AxiosResponse } from 'axios';
import { Pic } from './models';

const apiUrl = process.env.NODE_ENV == "development" ? "http://192.168.1.10:5215/" : "https://kittypics-api.onrender.com/";

export const getRandomPics = async (count:number) : Promise<Pic[]> => {
    const res = await axios.get(`${apiUrl}Pics/GetRandomPics?count=${count}`)
    return res.data;
}

export const castVote = async (picId:number) : Promise<void> => {
    await axios.get(`${apiUrl}Pics/Vote?picId=${picId}`)
}