import {followUserTC, unfollowUserTC, usersAction, UsersApiType} from './users-reducer'
import {usersAPI} from '../api/users-api'
import {APIResponseType, ResultCodes} from '../api/api'
import {appAPI} from './redux-store'


jest.mock('../api/users-api')

const mockUsersAPI = usersAPI as jest.Mocked<UsersApiType>
const mockAppAPI = appAPI as jest.Mocked<typeof appAPI>

const returnValue: APIResponseType = {data: {}, messages: [], resultCode: ResultCodes.Success}
mockUsersAPI.followUser.mockReturnValue(Promise.resolve(returnValue))
mockUsersAPI.unfollowUser.mockReturnValue(Promise.resolve(returnValue))

const mockDispatch = jest.fn()
const mockGetState = jest.fn()

afterAll(() => {
    mockDispatch.mockClear()
    mockGetState.mockClear()
    mockUsersAPI.followUser.mockClear()
    mockUsersAPI.unfollowUser.mockClear()
})


test('thunk test of following user', async () => {
    const newThunk = followUserTC(1)
    await newThunk(mockDispatch, mockGetState, mockAppAPI)

    expect(mockDispatch).toBeCalledTimes(3)
    expect(mockDispatch).toHaveBeenNthCalledWith(1, usersAction.toggleFollowingInProgress(1, true))
    expect(mockDispatch).toHaveBeenNthCalledWith(2, usersAction.followUser(1))
    expect(mockDispatch).toHaveBeenNthCalledWith(3, usersAction.toggleFollowingInProgress(1, false))
})

test('thunk test of unfollowing user', async () => {
    const newThunk = unfollowUserTC(1)
    await newThunk(mockDispatch, mockGetState, mockAppAPI)

    expect(mockDispatch).toBeCalledTimes(3)
    expect(mockDispatch).toHaveBeenNthCalledWith(1, usersAction.toggleFollowingInProgress(1, true))
    expect(mockDispatch).toHaveBeenNthCalledWith(2, usersAction.followUser(1))
    expect(mockDispatch).toHaveBeenNthCalledWith(3, usersAction.toggleFollowingInProgress(1, false))
})