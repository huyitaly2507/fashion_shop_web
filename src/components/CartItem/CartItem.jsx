import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import numberWithCommas from '~/utils/numberWithCommas';
import { BiMinus, BiPlus, BiTrash } from 'react-icons/bi';
import './cart-item.scss';
import { removeItem, selectCartItems, updateItem } from '~/redux/cartItemsSlice';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '~/Firebase';
import { selectUser } from '~/redux/userSlice';

function CartItem(props) {
    const currentUser = useSelector(selectUser);
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const [item, setItem] = useState(props.item);
    const [quantity, setQuantity] = useState(props.item.quantity);

    const updateQuantity = (opt) => {
        if (opt === '+') {
            dispatch(updateItem({ ...item, quantity: quantity + 1 }));
        }
        if (opt === '-') {
            dispatch(updateItem({ ...item, quantity: quantity - 1 === 0 ? 1 : quantity - 1 }));
        }
    };

    const removeCartItem = () => {
        dispatch(removeItem(item));
    };

    useEffect(() => {
        setItem(props.item);
        setQuantity(props.item.quantity);
    }, [props.item]);

    useEffect(() => {
        updateDoc(doc(db, 'users', `${currentUser?.email}`), {
            savedShows: cartItems,
        });
    }, [cartItems, currentUser?.email]);

    return (
        <div className="cart__item">
            <div className="cart__item__image">
                <img src={item.image} alt="" />
            </div>
            <div className="cart__item__info">
                <div className="cart__item__info__name">
                    <Link to={`/catalog/${item.slug}`}>{`${item.title} - ${item.color} - ${item.size}`}</Link>
                </div>
                <div className="cart__item__info__price">{numberWithCommas(Number(item.price))}</div>
                <div className="cart__item__info__quantity">
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('-')}>
                            <BiMinus />
                        </div>
                        <div className="product__info__item__quantity__input">{quantity}</div>
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('+')}>
                            <BiPlus />
                        </div>
                    </div>
                </div>
                <div className="cart__item__info__delete" onClick={() => removeCartItem()}>
                    <BiTrash />
                </div>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    item: PropTypes.object,
};

export default CartItem;
