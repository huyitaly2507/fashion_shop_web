import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(localStorage.getItem('user2')) || null,
        loading: false,
        error: null,
        modal: null,
    },
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            localStorage.setItem('user2', JSON.stringify(state.user));
        },
        loginFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logOutUser: (state) => {
            localStorage.removeItem('user2');
            state.user = null;
        },
        showModal: (state, action) => {
            state.modal = action.payload;
        },
        hideModal: (state) => {
            state.modal = null;
        },
    },
});

export const selectUser = (state) => state.user.user;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;
export const selectModal = (state) => state.user.modal;

export const { loginStart, loginSuccess, loginFailed, logOutUser, showModal, hideModal } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
