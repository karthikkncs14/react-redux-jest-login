import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {SignUpUser, userSelector, clearState} from '../../Api/UserSlice';
import {useHistory} from 'react-router-dom';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import User from '../../assets/user.svg';
import Form from "../../Components/Form";
import Header from "../Header";

const SignUp = () => {
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
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
    }, [isSuccess]);

    return (
            <div className="main-container">
                <Header><div className="form-header">Register</div></Header>
                <div className={"form-container"}>
                    <Form
                        onSubmit={handleSubmit(onSubmit)}
                        method="POST"
                    >
                        <img src={User} alt="User" style={{"paddingBottom":"33px"}}/>
                        <div className="error-alert">{isError && errorMessage}</div>
                        <div className={"form-col"}>
                            <label htmlFor="email">
                                First Name</label>

                            <Input
                                className="form-control"
                                id="name"
                                name="name"
                                type="text"
                                register={register}
                                autoComplete="name"
                                required
                            />
                            {errors.name && <span className="error-alert">{"Please enter name"}</span>}
                        </div>
                        <div className={"form-col"}>
                            <label htmlFor="email">
                                Email Address</label>
                            <Input
                                className="form-control"
                                id="email"
                                name="email"
                                register={register}
                                type="email"
                            />
                            {errors.email && <span className="error-alert">{"Please enter email"}</span>}
                        </div>


                        <div className={"form-col"}>
                            <label htmlFor="password">Password</label>
                            <Input className="form-control"
                                   id="password"
                                   name="password"
                                   register={register}
                                   type="password"
                            />
                            {errors.password && <span className="error-alert">{"Please enter password"}</span>}
                        </div>

                        <div className="form-submit">
                            <Button type="submit">
                                Register
                            </Button>
                        </div>
                        <div>
                            {!isFetching ?
                                <Link to="login">Already have an account? Go to log in</Link> :
                                <span style={{color: "#c6c6c6"}}>Already have an account? Go to log in</span>}
                        </div>
                    </Form>


                </div>
            </div>
);
};

export default SignUp;
