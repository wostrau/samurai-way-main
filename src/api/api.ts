import axios from 'axios';
import {ProfileDataFormType} from '../components/Profile/ProfileInfo/ProfileDataForm';
import {ProfileResponseType} from '../redux/profile-reducer';

const baseURL = 'https://social-network.samuraijs.com/api/1.0';
const config = {
    withCredentials: true,
    headers: {'API-KEY': '96e14868-2995-4951-a0b1-5ff5cded4fa9'}
};
const instance = axios.create({...config, baseURL});

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance
            .get(`/users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    followUser(id: string) {
        return instance
            .post(`/follow/${id}`)
            .then(response => response.data);
    },
    unfollowUser(id: string) {
        return instance
            .delete(`/follow/${id}`)
            .then(response => response.data);
    },
};

export const profileAPI = {
    getUserProfile(id: string) {
        return instance
            .get(`/profile/${id}`)
            .then(response => response.data);
    },
    getUserStatus(id: string) {
        return instance
            .get(`/profile/status/${id}`)
            .then(response => response.data);
    },
    updateUserStatus(status: string) {
        return instance
            .put('/profile/status', {status: status})
            .then(response => response.data);
    },
    savePhoto(photo: File) {
        const formData = new FormData();
        formData.append('image', photo);
        return instance
            .put('/profile/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => response.data);
    },
    saveProfile(profile: ProfileResponseType) {
        return instance
            .put('/profile', profile)
            .then(response => response.data);
    }
};

export const authAPI = {
    me() {
        return instance
            .get('/auth/me')
            .then(response => response.data);
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance
            .post('/auth/login', {email: email, password: password, rememberMe: rememberMe})
            .then(response => response.data);
    },
    logout() {
        return instance
            .delete('/auth/login')
            .then(response => response.data);
    },
};


