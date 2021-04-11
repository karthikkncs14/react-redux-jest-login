import userReducer, {
    clearState,
    loginUser,
    SignUpUser,
    fetchUserBytoken,
} from './UserSlice';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import mockLocalStorage from '../../../_mocks_/mockLocalStorage';
import mockData from '../../../_mocks_/mockData';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mock = new MockAdapter(axios);
const store = mockStore();

describe('user reducer', () => {
    const initialState = {
        username: 'karthik kn',
        email: 'karthikkncs14@gmail.com',
        isFetching: false,
        isSuccess: true,
        isError: false,
        errorMessage: '',
    };

    it('should handle initial state', () => {
        expect(userReducer(undefined, {name: 'user'})).toEqual({
            username: '',
            email: '',
            isFetching: false,
            isSuccess: false,
            isError: false,
            errorMessage: '',
        });
    });
    it('should handle login', () => {
        const actual = userReducer(initialState, clearState());
        // console.log("actual test case",actual);
        expect(actual).toEqual({
            username: 'karthik kn',
            email: 'karthikkncs14@gmail.com',
            isFetching: false,
            isSuccess: false,
            isError: false,
            errorMessage: ''
        });
    });

    it('sets fetching true when login is pending', () => {
        const action = {type: loginUser.pending.type};
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            "email": "karthikkncs14@gmail.com",
            "errorMessage": "",
            "isError": false,
            "isFetching": true,
            "isSuccess": true,
            "username": "karthik kn",
        });
    });

    it('sets fulfilled true when login is fulfilled', () => {
        const action = {payload: initialState, type: loginUser.fulfilled.type};
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            "email": "karthikkncs14@gmail.com",
            "errorMessage": "",
            "isError": false,
            "isFetching": false,
            "isSuccess": true,
            "username": undefined,
        });
    });
    it('sets rejected true when login is rejected', () => {
        const action = {payload: initialState, type: loginUser.rejected.type};
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            "email": "karthikkncs14@gmail.com",
            "errorMessage": undefined,
            "isError": true,
            "isFetching": false,
            "isSuccess": true,
            "username": "karthik kn",
        });
    });

    it('sets fetching true when SignUpUser is pending', () => {
        const action = {type: SignUpUser.pending.type};
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            "email": "karthikkncs14@gmail.com",
            "errorMessage": "",
            "isError": false,
            "isFetching": true,
            "isSuccess": true,
            "username": "karthik kn",
        });
    });

    it('sets fulfilled true when SignUpUser is fulfilled', () => {
        const payload = {user: {email: "karthikkncs14@gmail.com", user: "karthik"}};
        const action = {payload, type: SignUpUser.fulfilled.type};
        const state = userReducer(payload, action);
        expect(state).toEqual({
            "email": "karthikkncs14@gmail.com",
            "isFetching": false,
            "isSuccess": true,
            "user": {
                "email": "karthikkncs14@gmail.com",
                "user": "karthik",
            },
        });
    });
    it('sets rejected true when SignUpUser is rejected', () => {
        const action = {payload: initialState, type: SignUpUser.rejected.type};
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            "email": "karthikkncs14@gmail.com",
            "errorMessage": undefined,
            "isError": true,
            "isFetching": false,
            "isSuccess": true,
            "username": "karthik kn",
        });
    });

    it('sets fetching true when fetchUserBytoken is pending', () => {
        const action = {type: fetchUserBytoken.pending.type};
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            "email": "karthikkncs14@gmail.com",
            "errorMessage": "",
            "isError": false,
            "isFetching": true,
            "isSuccess": true,
            "username": "karthik kn",
        });
    });

    it('sets fulfilled true when fetchUserBytoken is fulfilled', () => {
        const action = {
            payload: {email: "karthikkncs14@gmail.com", user: "karthik"},
            type: fetchUserBytoken.fulfilled.type
        };
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            "email": "karthikkncs14@gmail.com",
            "errorMessage": "",
            "isError": false,
            "isFetching": false,
            "isSuccess": true,
            "username": undefined,
        });
    });
    it('sets rejected true when fetchUserBytoken is rejected', () => {
        const action = {payload: initialState, type: fetchUserBytoken.rejected.type};
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            "email": "karthikkncs14@gmail.com",
            "errorMessage": "",
            "isError": true,
            "isFetching": false,
            "isSuccess": true,
            "username": "karthik kn",
        });
    });


});

describe('Login', () => {
    beforeEach(() => {
        jest.setTimeout(10000);
        store.clearActions();
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall()
    });

    it('check login API request', async () => {
        const {authResponse, loginData} = mockData;
        mock.onGet('https://mock-user-auth-server.herokuapp.com/api/v1/auth').reply(200, authResponse);
        await store.dispatch(loginUser(loginData)).then((res) => {
            expect(res.payload.user).toEqual(authResponse.user)
        });
    });
    it('invalid login API request', async () => {
        const {authResponse, invalidData} = mockData;
        mock.onGet('https://mock-user-auth-server.herokuapp.com/api/v1/auth').reply(200, authResponse);
        await store.dispatch(loginUser(invalidData)).then((res) => {
            expect(res.payload.message).toEqual("Incorrect email or password")
        });
    });


});

describe('Register', () => {
    beforeEach(() => {
        jest.setTimeout(10000);
        store.clearActions();
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall()
    });

    it('check new register API request', async () => {
        const {authResponse, signUpData} = mockData;
        mock.onGet('https://mock-user-auth-server.herokuapp.com/api/v1/users').reply(200, authResponse);
        await store.dispatch(SignUpUser(signUpData)).then((res) => {
            expect(res.payload.message).toEqual("User registered with success")
        });
    });

    it('check existing user register API request', async () => {
        const {authResponse, signUpDataSample} = mockData;
        mock.onGet('https://mock-user-auth-server.herokuapp.com/api/v1/users').reply(200, authResponse);
        await store.dispatch(SignUpUser(signUpDataSample)).then((res) => {
            expect(res.payload.message).toEqual("User already registered")
        });
    });
});

describe('fetch user data', () => {
    beforeEach(() => {
        jest.setTimeout(10000);
        store.clearActions();
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall()
    });

    it('check new user with wrong token', async () => {
        const {authResponse, signUpData} = mockData;
        mock.onGet('https://mock-user-auth-server.herokuapp.com/api/v1/users').reply(200, authResponse);
        await store.dispatch(fetchUserBytoken({token: "", status: 200})).then((res) => {
            expect(res.payload.message).toEqual("Unauthorized")
        });
    });
    it('check new user with proper token', async () => {
        const {authResponse, signUpData} = mockData;
        mock.onGet('https://mock-user-auth-server.herokuapp.com/api/v1/users').reply(200, authResponse);
        await store.dispatch(fetchUserBytoken({token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthcnRoaWtrbmNzMTRAZ21haWwuY29tIiwiaWQiOjI5OTU5LCJpYXQiOjE2MTgwODc4NTEsImV4cCI6MTYxODE3NDI1MX0.srKFb56BOibqtmd04MYGLbnJ2O8QxXu7TcAc5DIDMI0"})).then((res) => {
            expect(res.payload).toEqual({
                "email": "karthikkncs14@gmail.com",
                "id": 29959,
                "imageUrl": "https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg",
                "name": "karthik",
                "password": "123456"
            })
        });
    });


});


