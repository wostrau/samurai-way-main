import {AppThunkType, InferActionsType} from './redux-store'
import {updateUsersArray} from '../utilities/object-helpers'
import {usersAPI} from '../api/users-api'
import {PhotosType} from '../types/types'
import {ThunkDispatch} from 'redux-thunk'


const initialState = {
    users: [] as Array<UserStateType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>
}

export const usersReducer = (state: UsersPageType = initialState, action: UsersReducerActionsType): UsersPageType => {
    switch (action.type) {
        case 'USERS/SET-USERS':
            return {...state, users: action.users}
        case 'USERS/FOLLOW-USER':
            return {...state, users: updateUsersArray(state.users, action.id, {followed: true})}
        case 'USERS/UNFOLLOW-USER':
            return {...state, users: updateUsersArray(state.users, action.id, {followed: false})}
        case 'USERS/SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage}
        case 'USERS/SET-TOTAL-USERS-COUNT':
            return {...state, totalUsersCount: action.totalUsersCount}
        case 'USERS/TOGGLE-IS-FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'USERS/TOGGLE-IS-FOLLOWING-PROGRESS':
            return {
                ...state, followingInProgress:
                    action.isFetching
                        ? [...state.followingInProgress, action.id]
                        : state.followingInProgress.filter(id => id !== action.id)
            }
        default:
            return state
    }
}

export const usersAction = {
    setUsers: (users: Array<UserStateType>) => ({type: 'USERS/SET-USERS', users} as const),
    followUser: (id: number) => ({type: 'USERS/FOLLOW-USER', id} as const),
    unfollowUser: (id: number) => ({type: 'USERS/UNFOLLOW-USER', id} as const),
    setCurrentPage: (currentPage: number) => ({type: 'USERS/SET-CURRENT-PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'USERS/SET-TOTAL-USERS-COUNT',
        totalUsersCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'USERS/TOGGLE-IS-FETCHING', isFetching} as const),
    toggleFollowingInProgress: (id: number, isFetching: boolean) => {
        return {type: 'USERS/TOGGLE-IS-FOLLOWING-PROGRESS', id, isFetching} as const
    }
}

//thunks
export const getUsersTC = (currentPage: number, pageSize: number): UsersThunkType => {
    return async (dispatch) => {
        dispatch(usersAction.toggleIsFetching(true))
        dispatch(usersAction.setCurrentPage(currentPage))
        const data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(usersAction.toggleIsFetching(false))
        dispatch(usersAction.setUsers(data.items))
        dispatch(usersAction.setTotalUsersCount(data.totalCount))
    }
}
export const followUserTC = (id: number): UsersThunkType => {
    return async (dispatch) => {
        const apiMethod = await usersAPI.followUser.bind(usersAPI)
        await _followUnfollowFlow(id, dispatch, apiMethod, usersAction.followUser)
    }
}
export const unfollowUserTC = (id: number): UsersThunkType => {
    return async (dispatch) => {
        const apiMethod = await usersAPI.unfollowUser.bind(usersAPI)
        await _followUnfollowFlow(id, dispatch, apiMethod, usersAction.unfollowUser)
    }
}
const _followUnfollowFlow = async (id: number, dispatch: UsersDispatch, apiMethod: any, actionCreator: FollowType) => {
    dispatch(usersAction.toggleFollowingInProgress(id, true))
    const data = await apiMethod(id)
    if (data.resultCode === 0) dispatch(actionCreator(id))
    dispatch(usersAction.toggleFollowingInProgress(id, false))
}

export type UserStateType = {
    id: number,
    name: string,
    uniqueUrlName: string
    photos: PhotosType
    status: string | null
    followed: boolean
}
export type UsersPageType = typeof initialState
export type UsersReducerActionsType = InferActionsType<typeof usersAction>
type UsersThunkType = AppThunkType<UsersReducerActionsType>
export type UsersDispatch = ThunkDispatch<UserStateType, typeof usersAPI, UsersReducerActionsType>
type FollowType = (id: number) => ReturnType<typeof usersAction.followUser> | ReturnType<typeof usersAction.unfollowUser>
