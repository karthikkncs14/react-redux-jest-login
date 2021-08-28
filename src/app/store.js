import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../Api/UserSlice';
import { postSlice} from '../Api/DashboardSlice';
import { postNewSlice} from '../Api/PostNewSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    post: postSlice.reducer,
    newPost: postNewSlice.reducer
  },
});


