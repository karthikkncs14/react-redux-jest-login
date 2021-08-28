import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser, userSelector, clearState} from '../../Api/UserSlice';
import {useHistory} from 'react-router-dom';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import User from '../../assets/user.svg';
import Form from "../../Components/Form";
import Header from "../Header";

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
        if (isSuccess) {
            dispatch(clearState());
            history.push('/');
        }
    }, [isSuccess]);

    return (
        <div className="main-container">
            <Header><div className="form-header">Login</div></Header>

            <div className={"form-container"}>
                {/*<div className="col-sm-4">col-sm-4</div>*/}

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <img src={User} alt="User" style={{"paddingBottom":"33px"}}/>
                    <div className="error-alert">{isError && errorMessage}</div>
                    <div className={"form-col"}>
                        <label htmlFor="email">Email address</label>
                        <Input disabled={isFetching} placeholder={"Email address..."} id="email"
                               name="email"
                               register={register}
                               type="email"/>
                        {errors.email && <span className="error-alert">{"Please enter email"}</span>}
                    </div>
                    <div className={"form-col"}>
                        <label htmlFor="password">Password</label>
                        <Input disabled={isFetching}  placeholder={"Password..."}
                               id="password"
                               name="password"
                               register={register}
                               type="password"
                        />
                        {errors.password && <span className="error-alert">{"Please enter password"}</span>}
                    </div>
                    <div className="form-submit">
                        <Button disabled={isFetching} type="submit">Login</Button>
                    </div>
                    <div>
                        {!isFetching ?
                        <Link to="SignUp">No account? registered</Link> :
                        <span style={{color: "#c6c6c6"}}>No account? registered</span>}
                    </div>

                </Form>
            </div>
        </div>
    );
};

export default Login;
