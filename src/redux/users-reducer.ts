import {AppThunkType, InferActionsType} from './redux-store'
import {updateUsersArray} from '../utilities/object-helpers'
import {usersAPI} from '../api/users-api'
import {PhotosType} from '../types/types'
import {ThunkDispatch} from 'redux-thunk'
import {APIResponseType, ResultCodes} from '../api/api'


const initialState = {
    users: [] as Array<UserStateType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
    filter: {term: '', friend: null as null | boolean}
}

export const usersReducer = (state: UsersPageType = initialState, action: UsersReducerActionsType): UsersPageType => {
    switch (action.type) {
        case 'USERS/SET_USERS': {
            return {...state, users: action.users}
        }
        case 'USERS/FOLLOW_USER': {
            return {...state, users: updateUsersArray(state.users, action.id, {followed: true})}
        }
        case 'USERS/UNFOLLOW_USER': {
            return {...state, users: updateUsersArray(state.users, action.id, {followed: false})}
        }
        case 'USERS/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'USERS/SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case 'USERS/TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state, followingInProgress:
                    action.isFetching
                        ? [...state.followingInProgress, action.id]
                        : state.followingInProgress.filter(id => id !== action.id)
            }
        }
        case 'USERS/SET_FILTER': {
            return {
                ...state, filter: action.payload
            }
        }
        default:
            return state
    }
}

export const usersAction = {
    setUsers: (users: Array<UserStateType>) => ({type: 'USERS/SET_USERS', users} as const),
    followUser: (id: number) => ({type: 'USERS/FOLLOW_USER', id} as const),
    unfollowUser: (id: number) => ({type: 'USERS/UNFOLLOW_USER', id} as const),
    setCurrentPage: (currentPage: number) => ({type: 'USERS/SET_CURRENT_PAGE', currentPage} as const),
    setFilter: (filter: FilterType) => ({type: 'USERS/SET_FILTER', payload: filter} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'USERS/SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'USERS/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingInProgress: (id: number, isFetching: boolean) => ({
        type: 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
        id,
        isFetching
    } as const)
}

//thunks
export const getUsersTC = (currentPage: number, pageSize: number, filter: FilterType): UsersThunkType => {
    return async (dispatch) => {
        dispatch(usersAction.toggleIsFetching(true))
        dispatch(usersAction.setCurrentPage(currentPage))
        dispatch(usersAction.setFilter(filter))
        const data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
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
const _followUnfollowFlow = async (id: number, dispatch: UsersDispatch, apiMethod: (id: number) => Promise<APIResponseType>, actionCreator: FollowType) => {
    dispatch(usersAction.toggleFollowingInProgress(id, true))
    const data = await apiMethod(id)
    if (data.resultCode === ResultCodes.Success) dispatch(actionCreator(id))
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
export type FilterType = typeof initialState.filter
export type UsersApiType = typeof usersAPI
export type UsersReducerActionsType = InferActionsType<typeof usersAction>
export type UsersDispatch = ThunkDispatch<UserStateType, UsersApiType, UsersReducerActionsType>
export type UsersThunkType = AppThunkType<UsersReducerActionsType>
type FollowType = (id: number) => ReturnType<typeof usersAction.followUser> | ReturnType<typeof usersAction.unfollowUser>
