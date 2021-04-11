import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";

import * as ReactReduxHooks from "react-redux";
import SignUp from "./SignUp";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {fireEvent, render, screen} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";

configure({ adapter: new Adapter() });

describe("Sign Up", () => {
    let wrapper;
    let useEffect;
    let store;

    const mockUseEffect = () => {
        useEffect.mockImplementationOnce(f => f());
    };

    beforeEach(() => {
        store = configureStore()({
            data: { username: '',
                email: '',
                isFetching: false,
                isSuccess: false,
                isError: false,
                errorMessage: '',},
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

        wrapper = shallow(<SignUp store={store} />);
        render(<Router><SignUp/></Router>);
    });

    describe("on start", () => {
        it("should have input", () => {
            //console.log("wrapper",wrapper);
            expect(wrapper.find("input")).toHaveLength(3);
        });
        it("should display proper input value", async () => {
            fireEvent.input(screen.getByRole("textbox", {name: /email/i}), {
                target: {
                    value: "kar@gtest.com"
                }
            });

            fireEvent.input(screen.getByLabelText("Password"), {
                target: {
                    value: "123456"
                }
            });

            fireEvent.input(screen.getByLabelText("Name"), {
                target: {
                    value: "kar"
                }
            });

            fireEvent.submit(screen.getByRole("button"));
            expect(screen.getByLabelText("Password").value).toBe("123456");
        });
    });
});
