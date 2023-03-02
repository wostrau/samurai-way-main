import {instance, APIResponseType} from './api'

export const authAPI = {
    me() {
        return instance
            .get<APIResponseType<{ id: number, email: string, login: string }>>('auth/me')
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance
            .post<APIResponseType<{ userId: number }>>('auth/login', {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance
            .delete<APIResponseType>('auth/login')
            .then(response => response.data)
    }
}