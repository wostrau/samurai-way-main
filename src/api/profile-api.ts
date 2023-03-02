import {instance, APIResponseType} from './api'
import {ContactsType, PhotosType} from '../types/types'

export type ProfileResponseType = {
    userId: number
    aboutMe?: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

export const profileAPI = {
    getProfile(id: number) {
        return instance
            .get<ProfileResponseType>(`profile/${id}`)
            .then(response => response.data)
    },
    getProfileStatus(id: number) {
        return instance
            .get<string>(`profile/status/${id}`)
            .then(response => response.data)
    },
    updateProfileStatus(status: string) {
        return instance
            .put<APIResponseType>('profile/status', {status: status})
            .then(response => response.data)
    },
    saveProfilePhoto(photo: File) {
        const formData = new FormData()
        formData.append('image', photo)
        return instance
            .put<APIResponseType<{ photos: PhotosType }>>('profile/photo', formData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(response => response.data)
    },
    saveProfile(profile: ProfileResponseType) {
        return instance
            .put<APIResponseType>('profile', profile)
            .then(response => response.data)
    }
}