import axios from 'axios'
import {ProfileResponseType} from '../types/types'


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '96e14868-2995-4951-a0b1-5ff5cded4fa9'}
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    followUser(id: string) {
        return instance
            .post(`follow/${id}`)
            .then(response => response.data)
    },
    unfollowUser(id: string) {
        return instance
            .delete(`follow/${id}`)
            .then(response => response.data)
    }
}

export const profileAPI = {
    getUserProfile(id: number) {
        return instance
            .get(`profile/${id}`)
            .then(response => response.data)
    },
    getUserStatus(id: number) {
        return instance
            .get(`profile/status/${id}`)
            .then(response => response.data)
    },
    updateUserStatus(status: string) {
        return instance
            .put('profile/status', {status: status})
            .then(response => response.data)
    },
    savePhoto(photo: File) {
        const formData = new FormData()
        formData.append('image', photo)
        return instance
            .put('profile/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => response.data)
    },
    saveProfile(profile: ProfileResponseType) {
        return instance
            .put('profile', profile)
            .then(response => response.data)
    }
}

export const authAPI = {
    me() {
        return instance
            .get<ResponseType<MeDataResponseType>>('auth/me')
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance
            .post<ResponseType<{userId: number}>>('auth/login', {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance
            .delete<ResponseType>('auth/login')
            .then(response => response.data)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance
            .get('security/get-captcha-url')
            .then(response => response.data)
    }
}


export type ResponseType<D = {}> = {
    resultCode: ResultCodes
    messages: string[]
    data: D
}

type MeDataResponseType = {
    id: number
    email: string
    login: string
}

export enum ResultCodes {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}