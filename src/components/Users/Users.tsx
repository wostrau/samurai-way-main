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
import queryString, {ParsedQuery} from 'query-string'


type QueryParamsType = { term?: string, page?: string, friend?: string }

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
        const parsed = queryString.parse(history.location.search.substr(1)) as ParsedQuery & QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)

        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch (parsed.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break
        }

        dispatch(getUsersTC(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
            /*`?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`*/
        })
    }, [filter, currentPage])

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
