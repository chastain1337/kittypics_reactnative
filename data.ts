import axios, { AxiosResponse } from 'axios';

const apiUrl = process.env.NODE_ENV == "development" ? "https://localhost:7054/" : "http://kittypics-api.onrender.com/";
// export const getFullMember = async (deviceId:string,generateNew = true) : Promise<Member> => {
//     const res = await axios.post(`${apiUrl}getFullMember?deviceId=${deviceId}&generateNew=${generateNew}`)
//     return res.data;
// }