import { configureStore } from '@reduxjs/toolkit';
import cartItemsReducer from './cartItemsSlice';
import productModalReducer from './productModalSlice';
import userReducer from './userSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        productModal: productModalReducer,
        cartItems: cartItemsReducer,
    },
});
