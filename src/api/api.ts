import axios from 'axios'


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '96e14868-2995-4951-a0b1-5ff5cded4fa9'}
})

export type APIResponseType<D = {}> = {
    resultCode: ResultCodes
    messages: Array<string>
    data: D
}

export enum ResultCodes {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export type PostType = {
    id: number
    message: string
    likesCount: number
}
