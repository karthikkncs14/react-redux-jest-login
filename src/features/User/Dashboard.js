import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, fetchUserBytoken, clearState } from './UserSlice';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const history = useHistory();

    const dispatch = useDispatch();
    const { isFetching, isError } = useSelector(userSelector);
    useEffect(() => {
        return async () => {
            try {
                await dispatch(fetchUserBytoken({token: localStorage.getItem('token')}));
            }catch (e) {

            }
        };

    }, [dispatch]);

    const { username, email } = useSelector(userSelector);

    useEffect(() => {
        if (isError) {
            dispatch(clearState());
            history.push('/login');
        }
    }, [isError]);

    const onLogOut = () => {
        localStorage.removeItem('token');
        history.push('/login');
    };

    return (
        <div className="container col-sm-4">
            {isFetching ? (
                <Loader type="Puff" color="#00BFFF" height={100} width={100} />
            ) : (
                <Fragment>
                    <div className="container mx-auto">
                        Welcome back <h3>{username}</h3>
                    </div>

                    <button
                        onClick={onLogOut}
                        className="btn btn-primary btn-block"
                    >
                        Log Out
                    </button>
                </Fragment>
            )}
        </div>
    );
};

export default Dashboard;
