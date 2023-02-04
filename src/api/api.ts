import axios from 'axios';

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
    getUserProfile(id: string) {
        return instance
            .get(`/profile/${id}`)
            .then(response => response.data);
    },
};

export const authAPI = {
    me() {
        return instance
            .get('/auth/me')
            .then(response => response.data);
    },
};

