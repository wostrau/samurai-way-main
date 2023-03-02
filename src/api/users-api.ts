import {instance, APIResponseType} from './api'
import {UserType} from '../redux/users-reducer'


type UsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance
            .get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    followUser(id: string) {
        return instance
            .post<APIResponseType>(`follow/${id}`)
            .then(response => response.data)
    },
    unfollowUser(id: string) {
        return instance
            .delete<APIResponseType>(`follow/${id}`)
            .then(response => response.data)
    }
}
