import {AppActionsType, AppDispatch, AppThunkType} from './redux-store'
import {usersAPI} from '../api/api'
import {updateUsersArray} from '../utilities/object-helpers'
import {PhotosType} from '../types/types'


const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<string>
}

export const usersReducer = (state: UsersPageType = initialState, action: AppActionsType): UsersPageType => {
    switch (action.type) {
        case 'users/SET-USERS':
            return {...state, users: action.users}
        case 'users/FOLLOW-USER':
            return {...state, users: updateUsersArray(state.users, action.id, {followed: true})}
        case 'users/UNFOLLOW-USER':
            return {...state, users: updateUsersArray(state.users, action.id, {followed: false})}
        case 'users/SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage}
        case 'users/SET-TOTAL-USERS-COUNT':
            return {...state, totalUsersCount: action.totalUsersCount}
        case 'users/TOGGLE-IS-FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'users/TOGGLE-IS-FOLLOWING-PROGRESS':
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.id]
                    : state.followingInProgress.filter(id => id !== action.id)
            }
        default:
            return state
    }
}

export const setUsersAC = (users: Array<UserType>) => ({type: 'users/SET-USERS', users} as const)
export const followUserAC = (id: string) => ({type: 'users/FOLLOW-USER', id} as const)
export const unfollowUserAC = (id: string) => ({type: 'users/UNFOLLOW-USER', id} as const)
export const setCurrentPageAC = (currentPage: number) => ({type: 'users/SET-CURRENT-PAGE', currentPage} as const)
export const setTotalUsersCountAC = (totalUsersCount: number) => ({
    type: 'users/SET-TOTAL-USERS-COUNT',
    totalUsersCount
} as const)
export const toggleIsFetchingAC = (isFetching: boolean) => ({type: 'users/TOGGLE-IS-FETCHING', isFetching} as const)
export const toggleFollowingInProgressAC = (id: string, isFetching: boolean) => {
    return {type: 'users/TOGGLE-IS-FOLLOWING-PROGRESS', id, isFetching} as const
}

//thunks
export const getUsersTC = (currentPage: number, pageSize: number): AppThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetchingAC(true))
        dispatch(setCurrentPageAC(currentPage))
        const data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetchingAC(false))
        dispatch(setUsersAC(data.items))
        dispatch(setTotalUsersCountAC(data.totalCount))
    }
}
const _followUnfollowFlow = async (id: string, dispatch: AppDispatch, apiMethod: any, actionCreator: FollowType) => {
    dispatch(toggleFollowingInProgressAC(id, true))
    const data = await apiMethod(id)
    if (data.resultCode === 0) dispatch(actionCreator(id))
    dispatch(toggleFollowingInProgressAC(id, false))
}
export const followUserTC = (id: string): AppThunkType => {
    return async (dispatch) => {
        const apiMethod = await usersAPI.followUser.bind(usersAPI)
        await _followUnfollowFlow(id, dispatch, apiMethod, followUserAC)
    }
}
export const unfollowUserTC = (id: string): AppThunkType => {
    return async (dispatch) => {
        const apiMethod = await usersAPI.unfollowUser.bind(usersAPI)
        await _followUnfollowFlow(id, dispatch, apiMethod, unfollowUserAC)
    }
}

export type UserType = {
    id: string,
    name: string,
    uniqueUrlName: string
    photos: PhotosType
    status: string | null
    followed: boolean
};
export type UsersPageType = typeof initialState
type FollowType = (id: string) => FollowActionType | UnfollowActionType
type FollowActionType = ReturnType<typeof followUserAC>
type UnfollowActionType = ReturnType<typeof unfollowUserAC>
export type UsersReducerActionsType =
    ReturnType<typeof setUsersAC>
    | FollowActionType
    | UnfollowActionType
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalUsersCountAC>
    | ReturnType<typeof toggleIsFetchingAC>
    | ReturnType<typeof toggleFollowingInProgressAC>
