import React, {useEffect} from 'react'
import {Preloader} from '../common/Preloader/Preloader'
import {Paginator} from '../common/Paginator/Paginator'
import {User} from './User'
import {UsersSearchForm} from './UsersSearchForm'
import {FilterType, getUsersTC, usersAction} from '../../redux/users-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {
    selectCurrentPage,
    selectFilter, selectFollowingInProgress,
    selectIsFetching,
    selectPageSize,
    selectTotalUsersCount,
    selectUsers
} from '../../redux/users-selectors'
import {withRedirectToLogin} from '../../hoc/WithRedirectToLogin'
import {useHistory} from 'react-router-dom'
import * as queryString from 'querystring'

const Users: React.FC = () => {
    const pageSize = useSelector(selectPageSize)
    const totalUsersCount = useSelector(selectTotalUsersCount)
    const followingInProgress = useSelector(selectFollowingInProgress)
    const users = useSelector(selectUsers)
    const currentPage = useSelector(selectCurrentPage)
    const isFetching = useSelector(selectIsFetching)
    const filter = useSelector(selectFilter)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1))

        dispatch(getUsersTC(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(usersAction.setCurrentPage(pageNumber))
        dispatch(getUsersTC(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersTC(1, pageSize, filter))
    }

    return (
        <>
            {isFetching ? <Preloader/> : null}
            <div>
                <UsersSearchForm
                    onFilterChanged={onFilterChanged}
                />
                <Paginator
                    pageSize={pageSize}
                    currentPage={currentPage}
                    totalUsersCount={totalUsersCount}
                    onPageChanged={onPageChanged}
                />
                <div>
                    {users.map(u => <User
                        key={u.id}
                        user={u}
                        followingInProgress={followingInProgress}
                    />)}
                </div>
            </div>
        </>
    )
}

export default withRedirectToLogin(Users)
