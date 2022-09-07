import { createSlice } from '@reduxjs/toolkit';

const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState: {
        value: localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : [],
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;

            const duplicate = state.value.filter(
                (item) => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size,
            );
            if (duplicate.length > 0) {
                const newProducts = state.value.filter(
                    (item) => item.id !== newItem.id || item.color !== newItem.color || item.size !== newItem.size,
                );
                state.value = [...newProducts, { ...newItem, quantity: newItem.quantity + duplicate[0].quantity }];
            } else {
                state.value = [...state.value, newItem];
            }
            localStorage.setItem('cartItems', JSON.stringify(state.value));
        },
        updateItem: (state, action) => {
            const itemUpdate = action.payload;

            const item = state.value.filter(
                (item) => item.id === itemUpdate.id && item.color === itemUpdate.color && item.size === itemUpdate.size,
            );

            if (item.length > 0) {
                const newProducts = state.value.filter(
                    (item) =>
                        item.id !== itemUpdate.id || item.color !== itemUpdate.color || item.size !== itemUpdate.size,
                );
                state.value = [...newProducts, itemUpdate];
                localStorage.setItem('cartItems', JSON.stringify(state.value));
            }
        },
        removeItem: (state, action) => {
            const itemDel = action.payload;
            state.value = state.value.filter(
                (item) => item.id !== itemDel.id || item.color !== itemDel.color || item.size !== itemDel.size,
            );
            localStorage.setItem('cartItems', JSON.stringify(state.value));
        },
        addCart: (state, action) => {
            state.value = action.payload;
            localStorage.setItem('cartItems', JSON.stringify(state.value));
        },
        removeCart: (state) => {
            localStorage.removeItem('cartItems');
            state.value = [];
        },
    },
});

export const selectCartItems = (state) => state.cartItems.value;

export const { addItem, updateItem, removeItem, addCart, removeCart } = cartItemsSlice.actions;

const cartItemsReducer = cartItemsSlice.reducer;
export default cartItemsReducer;
