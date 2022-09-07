import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NoImage from '~/assets/images/no-image.png';
import Button from '~/components/Button/Button';
import CartItem from '~/components/CartItem/CartItem';
import Helmet from '~/components/Helmet';
import { db } from '~/Firebase';
import { selectUser } from '~/redux/userSlice';
import numberWithCommas from '~/utils/numberWithCommas';
import './cart-page.scss';

export default function CartPage() {
    const currentUser = useSelector(selectUser);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${currentUser?.email}`), (doc) => {
            doc.data()?.savedShows.forEach((item) => {
                if (item.image === '') {
                    item.image = NoImage;
                }
            });
            setCartProducts(doc.data()?.savedShows);
        });
        setTotalProducts(cartProducts.reduce((total, item) => total + Number(item.quantity), 0));
        setTotalPrice(cartProducts.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0));
    }, [currentUser?.email, cartProducts]);

    return (
        <Helmet title="Giỏ hàng">
            <div className="cart">
                <div className="cart__info">
                    <div className="cart__info__txt">
                        <p>Bạn đang có {totalProducts} sản phẩm trong giỏ hàng</p>
                        <div className="cart__info__txt__price">
                            <span>Thành tiền</span>
                            <span>{numberWithCommas(totalPrice)}</span>
                        </div>
                    </div>
                    <div className="cart__info__btn">
                        <Button size="block">Đặt hàng</Button>
                        <Link to="/catalog">
                            <Button size="block">Tiếp tục mua hàng</Button>
                        </Link>
                    </div>
                </div>
                <div className="cart__list">
                    {cartProducts.map((item, index) => (
                        <CartItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </Helmet>
    );
}
