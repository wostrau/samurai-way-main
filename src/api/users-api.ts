import {instance, APIResponseType} from './api'
import {UserStateType} from '../redux/users-reducer'


type UsersResponseType = {
    items: Array<UserStateType>
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10, term: string = '', friend: null | boolean = null) {
        return instance
            .get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`
            + (friend === null ? '' : `&friend=${friend}`)
            )
            .then(response => response.data)
    },
    followUser(id: number) {
        return instance
            .post<APIResponseType>(`follow/${id}`)
            .then(response => response.data) as Promise<APIResponseType>
    },
    unfollowUser(id: number) {
        return instance
            .delete<APIResponseType>(`follow/${id}`)
            .then(response => response.data) as Promise<APIResponseType>
    }
}
