import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser, userSelector, clearState} from './UserSlice';
import toast from 'react-hot-toast';
import {useHistory} from 'react-router-dom';


const Login = ({}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const {register, errors, handleSubmit} = useForm();
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const {isFetching, isSuccess, isError, errorMessage} = useSelector(
        userSelector
    );
    //console.log("isError",isError,isSuccess);
    const onSubmit = async (data) => {
        try {
            await dispatch(loginUser(data));
        } catch (e) {

        }
    };

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error(errorMessage);
            dispatch(clearState());
        }

        if (isSuccess) {
            dispatch(clearState());
            history.push('/');
        }
    }, [isError, isSuccess]);

    return (
        <div className="container col-sm-4">
            {/*<div className="col-sm-4">col-sm-4</div>*/}
            <h3>Sign in</h3>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit(onSubmit)}>

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
                    {errors.email && <span role="alert">{errors.email.message}</span>}
                </div>
                <div className="form-group">
                <label htmlFor="password">password</label>
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
                {errors.password && <span role="alert">{errors.password.message}</span>}
                </div>
                <div>
                <button className="btn btn-primary btn-block" type="submit">SUBMIT</button>
                </div>

            </form>
            <div className="mt-6">
                <div className="relative">
                    <div className="relative flex justify-center text-sm">
                                  <span className="forgot-password text-right">
                    Or <Link to="SignUp"> SignUp</Link>
                   </span>
                    </div>
                </div>
            </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
