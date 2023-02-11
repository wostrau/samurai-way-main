import React from 'react';
import {UsersPropsType} from './UsersContainer';
import {Preloader} from '../common/Preloader/Preloader';
import {Paginator} from '../common/Paginator/Paginator';
import {User} from './User';

export class Users extends React.Component<UsersPropsType> {

    componentDidMount() {
        const {getUsers, currentPage, pageSize} = this.props;
        getUsers(currentPage, pageSize);
    };

    currentPageChange(pageNumber: number) {
        const {getUsers, setCurrentPage, pageSize} = this.props;
        setCurrentPage(pageNumber);
        getUsers(pageNumber, pageSize);
    };

    render() {
        return (
            <>
                {this.props.isFetching
                    ? <Preloader/>
                    : <div>
                        <Paginator
                            pageSize={this.props.pageSize}
                            currentPage={this.props.currentPage}
                            totalUsersCount={this.props.totalUsersCount}
                            currentPageChange={this.currentPageChange.bind(this)}
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
                                    );
                                }
                            )}
                        </div>
                    </div>
                }
            </>
        );
    };
}