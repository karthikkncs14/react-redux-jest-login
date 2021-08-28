import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BaseUrl from "./BaseUrl";

export const addNewPost = createAsyncThunk(
    'post/addNewPost',
    async ({title,content}, thunkAPI) => {
        try {
            const response = await fetch(
                BaseUrl + "/api/v2/posts",
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        authsessiontoken: localStorage.getItem('token'),
                    },
                    body: JSON.stringify({
                        title,
                        content,
                    }),
                }
            );

            let data = await response.json();
            if (response.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue({message: data.error});
            }
        } catch (e) {
            return thunkAPI.rejectWithValue({message: e.response.data});
        }
    }
    );

export const postNewSlice = createSlice({
    name: 'addNewPost',
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
        [addNewPost.pending]: (state) => {
            state.isFetching = true;
        },
        [addNewPost.fulfilled]: (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.dataList = payload.dataList;
        },
        [addNewPost.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
    },
});

export const {clearPostState} = postNewSlice.actions;

export const postSelector = (state) => state.newPost;
export default postNewSlice.reducer;
