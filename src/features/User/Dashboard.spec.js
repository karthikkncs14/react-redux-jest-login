import React from "react";
import {shallow} from "enzyme";
import configureStore from "redux-mock-store";

import * as ReactReduxHooks from "react-redux";
import Dashboard from "./Dashboard";
import {configure} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {fireEvent, render, screen} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";

configure({adapter: new Adapter()});

describe("Dashboard", () => {
    let wrapper;
    let useEffect;
    let store;

    const mockUseEffect = () => {
        useEffect.mockImplementationOnce(f => f());
    };

    beforeEach(() => {
        store = configureStore()({
            user: {
                username: '',
                email: '',
                isFetching: false,
                isSuccess: false,
                isError: false,
                errorMessage: '',
            },
            isLoading: false,
            error: null
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

        wrapper = shallow(<Dashboard store={store}/>);
        render(<Router><Dashboard store={store}/></Router>);
    });

    describe("on start", () => {


        it("should render button", () => {
            expect(wrapper.find("button")).toHaveLength(1);
        });

    });

    describe("on start", () => {
        it("should display matching error when email is invalid", async () => {
            fireEvent.click(screen.getByRole("button"));
        });
    });
});
