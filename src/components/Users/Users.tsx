import React from 'react'
import {UsersPropsType} from './UsersContainer'
import {Preloader} from '../common/Preloader/Preloader'
import {Paginator} from '../common/Paginator/Paginator'
import {User} from './User'
import {UsersSearchForm} from './UsersSearchForm'
import {FilterType} from '../../redux/users-reducer'

export class Users extends React.Component<UsersPropsType> {

    componentDidMount() {
        const {getUsers, currentPage, pageSize, filter} = this.props
        getUsers(currentPage, pageSize, filter)
    }

    onPageChanged(pageNumber: number) {
        const {getUsers, setCurrentPage, pageSize, filter} = this.props
        //setCurrentPage(pageNumber)
        getUsers(pageNumber, pageSize, filter)
    }

    onFilterChanged(filter: FilterType) {
        const {getUsers, pageSize} = this.props
        getUsers(1, pageSize, filter)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <div>
                    <UsersSearchForm
                        onFilterChanged={this.onFilterChanged.bind(this)}
                    />
                    <Paginator
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currentPage}
                        totalUsersCount={this.props.totalUsersCount}
                        onPageChanged={this.onPageChanged.bind(this)}

                    />
                    <div>
                        {this.props.users.map(u => {
                                return (
                                    <User
                                        key={u.id}
                                        user={u}
                                        followingInProgress={this.props.followingInProgress}
                                        followUser={this.props.followUser}
                                        unfollowUser={this.props.unfollowUser}
                                    />
                                )
                            }
                        )}
                    </div>
                </div>
            </>
        )
    };
}


