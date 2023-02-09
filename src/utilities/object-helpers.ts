import {UserType} from '../redux/users-reducer';

export const updateUsersArray = (users: Array<UserType>, id: string, newProp: {}): any[] => {
    return users.map((u: any) => u.id === id ? {...u, ...newProp} : u);
};
