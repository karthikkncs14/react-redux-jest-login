import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BaseUrl from "./BaseUrl";

export const SignUpUser = createAsyncThunk(
    'users/SignUpUser',
    async ({ name, email, password }, thunkAPI) => {
        try {
            const response = await fetch(
                BaseUrl+"/api/v2/auth/register",
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                }
            );
            let data = await response.json();
            console.log('SignUpUser', data);
            if (response.status === 200) {
                localStorage.setItem('token', data.token);
                return { ...data, username: name, email: email };
            } else {
                return thunkAPI.rejectWithValue({message:data.error});
            }
        } catch (e) {
            //console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue({message:e.response.data});
        }
    }
);

export const loginUser = createAsyncThunk(
    'users/login',
    async ({ email, password }, thunkAPI) => {
        // //console.log("email, password",email, password)
        try {
            const response = await fetch(
                BaseUrl+"/api/v2/auth/login",
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            let data = await response.json();
            // return thunkAPI.rejectWithValue({message:"Incorrect username or password"});
            if (response.status === 200) {

                localStorage.setItem('token', data.token);
                return data;
            } else {
                return thunkAPI.rejectWithValue({message:data.error});
            }
        } catch (e) {
            //console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue({message:e.response.data});
        }
    }
);
export const fetchUserBytoken = createAsyncThunk(
    'users/fetchUserByToken',
    async ({ token }, thunkAPI) => {
        console.log("token",token);
        try {
            const response = await fetch(
                BaseUrl+'/api/v2/users/me',
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        authsessiontoken: token,
                        'Content-Type': 'application/json',
                    },
                }
            );
            let data = await response.json();
            console.log('fetchUserByToken',response, data);

            if (response.status === 200) {
                return { ...data };
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            //console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        email: '',
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
    },
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;

            return state;
        },
    },
    extraReducers: {
        [SignUpUser.fulfilled]: (state, { payload }) => {
            //console.log('fulfilled payload', payload);
            state.isFetching = false;
            state.isSuccess = true;
            state.email = payload.email;
            state.username = payload.username;
        },
        [SignUpUser.pending]: (state) => {
            state.isFetching = true;
        },
        [SignUpUser.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            state.email = payload.email;
            state.username = payload.name;
            state.isError = false;
            state.isFetching = false;
            state.isSuccess = true;
            return state;
        },
        [loginUser.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [loginUser.pending]: (state) => {
            state.isFetching = true;
            state.isError = false;
        },
        [fetchUserBytoken.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchUserBytoken.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.email = payload.email;
            state.username = payload.name;
        },
        [fetchUserBytoken.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
    },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
export default userSlice.reducer;
