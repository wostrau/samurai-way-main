import {UserType} from '../redux/users-reducer';

export const updateUsersArray = (users: Array<UserType>, id: number, newProp: {}): any[] => {
    return users.map(u => u.id === id ? {...u, ...newProp} : u);
};
