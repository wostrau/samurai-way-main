import {usersAction, UsersPageType, usersReducer, UserStateType} from './users-reducer'
import actions from 'redux-form/lib/actions'


let state: UsersPageType
beforeEach(() => {
    state = {
        users: [
            {
                id: 1,
                name: 'Sanya',
                followed: false,
                photos: {small: null, large: null},
                status: 'status 1',
                uniqueUrlName: ''
            },
            {
                id: 2,
                name: 'Cortney',
                followed: false,
                photos: {small: null, large: null},
                status: 'status 2',
                uniqueUrlName: ''
            },
            {
                id: 3,
                name: 'Corry',
                followed: true,
                photos: {small: null, large: null},
                status: 'status 3',
                uniqueUrlName: ''
            },
            {
                id: 4,
                name: 'Cougan',
                followed: true,
                photos: {small: null, large: null},
                status: 'drunk and rowdy mister Lee Cougan',
                uniqueUrlName: ''
            }
        ] as Array<UserStateType>,
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        followingInProgress: [] as Array<number>
    }
})

test('followed user successfully', () => {
    const newState = usersReducer(state, usersAction.followUser(2))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('unfollowed user successfully', () => {
    const newState = usersReducer(state, usersAction.unfollowUser(4))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})