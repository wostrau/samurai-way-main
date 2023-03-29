import {v1} from 'uuid'
import {AppThunkType, InferActionsType} from './redux-store'
import {stopSubmit} from 'redux-form'
import {profileAPI, ProfileResponseType} from '../api/profile-api'
import {PostType} from '../api/api'
import {PhotosType} from '../types/types'
import {FormAction} from 'redux-form/lib/actions'


const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 5},
        {id: 2, message: 'It\'s my first post!', likesCount: 7}
    ] as Array<PostType>,
    profile: {} as ProfileResponseType,
    status: ''
}

export const profileReducer = (state: ProfileStateType = initialState, action: ProfileReducerActionsType): ProfileStateType => {
    switch (action.type) {
        case 'PROFILE/ADD-POST': {
            const newPost = {id: Number(v1()), message: action.newPostText, likesCount: 0}
            return {...state, posts: [newPost, ...state.posts]}
        }
        case 'PROFILE/DELETE-POST':
            return {...state, posts: state.posts.filter(p => p.id !== action.id)}
        case 'PROFILE/SET-USER-PROFILE':
            return {...state, profile: action.profile}
        case 'PROFILE/SET-USER-STATUS':
            return {...state, status: action.status}
        case 'PROFILE/SAVE-USER-PHOTO':
            return {...state, profile: {...state.profile, photos: action.photos}}
        default:
            return state
    }
}

export const profileAction = {
    addPost: (newPostText: string) => ({type: 'PROFILE/ADD-POST', newPostText} as const),
    deletePost: (id: number) => ({type: 'PROFILE/DELETE-POST', id} as const),
    setUserProfile: (profile: ProfileResponseType) => ({type: 'PROFILE/SET-USER-PROFILE', profile} as const),
    setUserStatus: (status: string) => ({type: 'PROFILE/SET-USER-STATUS', status} as const),
    saveUserPhoto: (photos: PhotosType) => ({type: 'PROFILE/SAVE-USER-PHOTO', photos} as const)
}

export const getUserProfile = (id: number): ProfileThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.getProfile(id)
        dispatch(profileAction.setUserProfile(data))
    }
}
export const getUserStatus = (id: number): ProfileThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.getProfileStatus(id)
        dispatch(profileAction.setUserStatus(data))
    }
}
export const updateUserStatus = (status: string): ProfileThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.updateProfileStatus(status)
        if (data.resultCode === 0) dispatch(profileAction.setUserStatus(status))
    }
}
export const savePhoto = (photos: File): ProfileThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.saveProfilePhoto(photos)
        if (data.resultCode === 0) dispatch(profileAction.saveUserPhoto(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileResponseType): ProfileThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.saveProfile(profile)
        if (data.resultCode === 0) {
            dispatch(profileAction.setUserProfile(profile))
        } else {
            const errorMessage = data.messages.length > 0
                ? data.messages[0]
                : 'some error'
            dispatch(stopSubmit('edit-profile', {_error: errorMessage}))
            return Promise.reject(errorMessage)
        }
    }
}

export type ProfileReducerActionsType = InferActionsType<typeof profileAction>
export type ProfileStateType = typeof initialState;
type ProfileThunkType = AppThunkType<ProfileReducerActionsType | FormAction>
