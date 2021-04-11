import React from "react";
import {shallow, mount} from "enzyme";
import configureStore from "redux-mock-store";

import * as ReactReduxHooks from "react-redux";
import Login from "./Login";
import {configure} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import userReducer, {loginUser, userSelector, clearState} from './UserSlice';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {render, screen, fireEvent, act} from "@testing-library/react";

configure({adapter: new Adapter()});

describe("Login", () => {
    let wrapper;
    let useEffect;
    let store;

    const mockUseEffect = () => {
        useEffect.mockImplementationOnce(f => f());
    };
    beforeEach(() => {
        store = configureStore()({
            username: '',
            email: '',
            isFetching: false,
            isSuccess: false,
            isError: false,
            errorMessage: '',
        });

        useEffect = jest.spyOn(React, "useEffect");
        mockUseEffect();
        mockUseEffect();

        jest
            .spyOn(ReactReduxHooks, "useSelector")
            .mockImplementation(state => store.getState());

        jest
            .spyOn(ReactReduxHooks, "useDispatch")
            .mockImplementation(() => store.dispatch);

        wrapper = shallow(<Login store={store}/>);
        render(<Router><Login/></Router>);
    });

    describe("on start", () => {
        it("should render button", () => {
            expect(wrapper.find("button")).toHaveLength(1);
        });

        it("should not trigger submit", async () => {
            fireEvent.input(screen.getByRole("textbox", {name: /email/i}), {
                target: {
                    value: "test"
                }
            });

            fireEvent.input(screen.getByLabelText("password"), {
                target: {
                    value: "password"
                }
            });
            await act( async () => {
                fireEvent.submit(screen.getByRole("button"));
            });
            expect(screen.getByRole("textbox", {name: /email/i}).value).toBe("test");
            expect(screen.getByLabelText("password").value).toBe("password");
        });

        it("should check proper input value", async () => {
            fireEvent.input(screen.getByRole("textbox", {name: /email/i}), {
                target: {
                    value: "karthikkncs14@gmail.com"
                }
            });

            fireEvent.input(screen.getByLabelText("password"), {
                target: {
                    value: "123456"
                }
            });


            await act( async () => {
                fireEvent.submit(screen.getByRole("button"));
            });
            expect(screen.getByRole("textbox", {name: /email/i}).value).toBe("karthikkncs14@gmail.com");
            expect(screen.getByLabelText("password").value).toBe("123456");
        });

        it("should trigger submit button", async () => {
            fireEvent.input(screen.getByRole("textbox", {name: /email/i}), {
                target: {
                    value: "karthikkncs14@gmail.com"
                }
            });

            fireEvent.input(screen.getByLabelText("password"), {
                target: {
                    value: "123457"
                }
            });
            await act( async () => {
                fireEvent.submit(screen.getByRole("button"));
            });
        });
    });
});
