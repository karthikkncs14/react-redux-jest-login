import React, {useEffect} from 'react';
import {useLocation, useHistory, Link} from 'react-router-dom';
import Header from './Header'
import Form from "../Components/Form";
import Input from "../Components/Input";
import Button from "../Components/Button";
import {useForm} from "react-hook-form";
import {addNewPost, postSelector} from "../Api/PostNewSlice";
import {useDispatch, useSelector} from "react-redux";
import {clearPostState} from "../Api/PostNewSlice";

const AddNew = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const {isFetching, isSuccess, isError, errorMessage} = useSelector(
        postSelector
    );
    const onSubmit = async (data) => {
        try {
            await dispatch(addNewPost(data));
        } catch (e) {

        }
    };

    useEffect(() => {
        return () => {
            dispatch(clearPostState());
        };
    }, []);

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearPostState());
            history.push('/');
        }
    }, [isSuccess]);

    return (
        <div className="main-container">
            <Header>
                <span className="user-name" onClick={history.goBack}>Back</span>
                <span>{"New diary entry"}</span>
                <span  className="drop-out" onClick={history.goBack}>Close</span>
            </Header>

            <div className={"content"}>
                    <Form onSubmit={handleSubmit(onSubmit)} className="add-new-form">

                        <div className="error-alert">{isError && errorMessage}</div>
                        <div className={"form-col"}>
                            <label htmlFor="title">Title</label>
                            <Input disabled={isFetching} placeholder={"Diary entry title..."} id="title"
                                   name="title"
                                   register={register}
                                   type="text"/>
                            {errors.title && <span className="error-alert">{"Please enter title"}</span>}
                        </div>
                        <div className={"form-col"}>
                            <label htmlFor="content">Content</label>
                            <textarea disabled={isFetching}
                                      {...register("content", {
                                          required: "required",
                                          message: "Please enter "+"content"
                                      })}
                                      placeholder={"Diary entry content..."}
                                      id="content"
                                      name="content"></textarea>
                            {errors.content && <span className="error-alert">{"Please enter content"}</span>}
                        </div>
                        <div className="form-submit button-end">
                            <Button disabled={isFetching} type="submit">Submit</Button>
                        </div>

                    </Form>
            </div>
        </div>
    );
};

export default AddNew;
