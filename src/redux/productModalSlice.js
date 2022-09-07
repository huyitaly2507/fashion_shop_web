import { createSlice } from '@reduxjs/toolkit';

const productModalSlice = createSlice({
    name: 'productModal',
    initialState: {
        productModal: null,
    },
    reducers: {
        show: (state, action) => {
            state.productModal = action.payload;
        },
        hide: (state) => {
            state.productModal = null;
        },
    },
});

export const selectProductModal = (state) => state.productModal.productModal;

export const { show, hide } = productModalSlice.actions;

const productModalReducer = productModalSlice.reducer;
export default productModalReducer;
