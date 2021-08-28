import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import BaseUrl from "./BaseUrl";

export const fetchPostByToken = createAsyncThunk(
    'post/fetchPostByToken',
    async ({token}, thunkAPI) => {
        console.log("token", token);
        try {
            const response = await fetch(
                BaseUrl + '/api/v2/users/me/posts?page=1&count=17',
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
            // console.log('fetchPostByToken', response, data);
            if (response.status === 200) {
                return {dataList: data};
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            //console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        dataList: [],
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
    },
    reducers: {
        clearPostState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            state.data = [];
            return state;
        },
    },
    extraReducers: {
        [fetchPostByToken.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchPostByToken.fulfilled]: (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.dataList = payload.dataList;
        },
        [fetchPostByToken.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
    },
});

export const {clearPostState} = postSlice.actions;

export const postSelector = (state) => state.post;
export default postSlice.reducer;
