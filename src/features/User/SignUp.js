import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {SignUpUser, userSelector, clearState} from './UserSlice';
import {useHistory} from 'react-router-dom';
import toast from 'react-hot-toast';

const SignUp = () => {
    const dispatch = useDispatch();
    const {register, errors, handleSubmit} = useForm();
    const history = useHistory();

    const {isFetching, isSuccess, isError, errorMessage} = useSelector(
        userSelector
    );
    const onSubmit = (data) => {
        try {
            dispatch(SignUpUser(data));
        } catch (e) {

        }

    };

    useEffect(() => {
        return () => {
            try {
                dispatch(clearState());
            } catch (e) {

            }
        };
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState());
            history.push('/');
        }

        if (isError) {
            toast.error(errorMessage);
            dispatch(clearState());
        }
    }, [isSuccess, isError]);

    return (
        <Fragment>
            <div className="container col-sm-4">
                <h3>Sign Up </h3>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            method="POST"
                        >
                            <div className="form-group">
                                <label htmlFor="email">Name</label>

                                <input
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    type="text"
                                    // ref={register({ required: true })}
                                    autoComplete="name"
                                    required
                                />
                            </div>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="email">email</label>
                                    <input
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        {...register("email", {
                                            required: "required",
                                            // pattern: {
                                            //     value: /S+@S+.S+/,
                                            //     message: "Entered value does not match email format"
                                            // }
                                        })}
                                        type="email"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    {...register("password", {
                                        required: "required",
                                        minLength: {
                                            value: 5,
                                            message: "min length is 5"
                                        }
                                    })}
                                    type="password"
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                >

                                         Sign up

                                </button>
                            </div>
                        </form>
                        <div className="mt-6">
                            <div className="relative">
                                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or <Link to="login"> Login</Link>
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SignUp;
