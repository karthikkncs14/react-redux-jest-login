import React, {Fragment, useEffect, useState, useCallback, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {userSelector, fetchUserBytoken, clearState} from '../Api/UserSlice';
import {useHistory} from 'react-router-dom';
import Header from './Header'
import {Link} from 'react-router-dom';
import moment from 'moment';
import useFetch from "../hooks/useFetch";
import scroll from "../hooks/scroll";

const Dashboard = () => {
    const history = useHistory();

    const dispatch = useDispatch();
    const {username, email, isFetching, isError} = useSelector(userSelector);
    const [query, setQuery] = useState(18);
    const [page, setPage] = useState(1);
    const {
        listPost,
        hasMore,
        loading,
        error,
        loadMore
    } = useFetch(query, page)

    useEffect(() => {
        dispatch(fetchUserBytoken({token: localStorage.getItem('token')}));
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            dispatch(clearState());
            history.push('/login');
        }
    }, [isError]);

    const [isFetchScroll, setIsFetching] = scroll(fetchMoreListItems);

    function fetchMoreListItems() {
        loadMore(query, page + 1)
        setIsFetching(false);
        setPage(2);
    }

    const onLogOut = () => {
        localStorage.removeItem('token');
        history.push('/login');
    };

    return (
        <div className="main-container">
            <Header>
                <span className="user-name">{username}</span>
                <span>My Dairy</span>
                <span className="drop-out" onClick={onLogOut}>Drop out</span>
            </Header>
            <div className="grid-container" id="scroll">
                <Link to={"/new-post"} className="item-block">
                    <div><span className="add">{"+"}</span></div>
                </Link>
                {listPost && listPost.map(item => {
                    return <Link to={{
                        pathname: "/post-view", state: {
                            postData: item,
                        },
                    }} className="item-block">
                        <div className={"format-text"}>
                            <span className="grid-date">{moment(item.updated_at).format("MMMM DD, YYYY")}</span>
                            <span className="grid-title">{item.title}</span>
                        </div>
                    </Link>
                })}
            </div>
            <div>{loading && 'Loading...'}</div>
        </div>
    );
};

export default Dashboard;
