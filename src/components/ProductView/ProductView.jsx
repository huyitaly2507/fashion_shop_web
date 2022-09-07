import { doc, updateDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import productData from '~/assets/fake-data/products';
import { db } from '~/Firebase';
import { addItem, selectCartItems } from '~/redux/cartItemsSlice';
import { hide, selectProductModal } from '~/redux/productModalSlice';
import { hideModal, selectUser, showModal } from '~/redux/userSlice';
import numberWithCommas from '~/utils/numberWithCommas';
import Button from '../Button/Button';
import './product-view.scss';

function ProductView(props) {
    const currentUser = useSelector(selectUser);
    const cartItems = useSelector(selectCartItems);
    let product = props.product;

    if (product === undefined)
        product = {
            price: 0,
            title: '',
            colors: [],
            size: [],
        };

    const dispatch = useDispatch();

    const [previewImg, setPreviewImg] = useState(product.image01);
    const [expand, setExpand] = useState(false);
    const [color, setColor] = useState(undefined);
    const [size, setSize] = useState(undefined);
    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();
    const descTitleRef = useRef();
    const descMobileRef = useRef();

    const productID = doc(db, 'users', `${currentUser?.email}`);

    const handleExpand = () => {
        setExpand(!expand);
        const descElement = descTitleRef.current;
        if (descElement && expand === true) {
            const bodyRect = document.body.getBoundingClientRect();
            const descRect = descElement.getBoundingClientRect();
            const offset = descRect.top - bodyRect.top;
            window.scrollTo(0, offset);
        }
    };

    const handleExpandMobile = () => {
        setExpand(!expand);
        const descMobileElement = descMobileRef.current;
        if (descMobileElement && expand === true) {
            const bodyRect = document.body.getBoundingClientRect();
            const descMobileRect = descMobileElement.getBoundingClientRect();
            const offset = descMobileRect.top - bodyRect.top - (window.innerHeight * 25) / 100;
            window.scrollTo(0, offset);
        }
    };

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1);
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
        }
    };

    const check = () => {
        if (color === undefined) {
            dispatch(showModal('Vui lòng chọn màu sắc!'));
            return false;
        }

        if (size === undefined) {
            dispatch(showModal('Vui lòng chọn kích cỡ!'));
            return false;
        }

        return true;
    };

    const addToCart = () => {
        if (!currentUser?.email) {
            dispatch(showModal(`Vui lòng&nbsp<span>đăng nhập</span>&nbspđể thêm vào giỏ hàng!`));
        } else {
            if (check()) {
                const newItem = {
                    id: product.id,
                    slug: product.slug,
                    title: product.title || '',
                    size: size || '',
                    color: color || '',
                    quantity: quantity || '',
                    price: product.price,
                    image: product.image01 || product.image02,
                };
                dispatch(addItem(newItem));
                dispatch(showModal('Thành công!'));
                setTimeout(() => {
                    dispatch(hideModal());
                }, 1000);
            }
        }
    };

    const goToCart = async () => {
        if (!currentUser?.email) {
            dispatch(showModal(`Vui lòng&nbsp<span>đăng nhập</span>&nbspđể mua sản phẩm!`));
        } else {
            if (check()) {
                const newItem = {
                    id: product.id,
                    slug: product.slug,
                    title: product.title || '',
                    size: size || '',
                    color: color || '',
                    quantity: quantity || '',
                    price: product.price,
                    image: product.image01 || product.image02,
                };
                dispatch(addItem(newItem));
                dispatch(showModal('Thành công!'));
                setTimeout(() => {
                    dispatch(hideModal());
                }, 1000);
                navigate('/cart');
            }
        }
    };

    useEffect(() => {
        setPreviewImg(product.image01);
        setQuantity(1);
        setColor(undefined);
        setSize(undefined);
    }, [product.image01]);

    useEffect(() => {
        updateDoc(productID, {
            savedShows: cartItems,
        });
    }, [cartItems, productID]);

    return (
        <div className="product">
            <div className="product__images">
                <div className="product__images__list">
                    <div className="product__images__list__item" onClick={() => setPreviewImg(product.image01)}>
                        <img src={product.image01} alt="" />
                    </div>
                    <div className="product__images__list__item" onClick={() => setPreviewImg(product.image02)}>
                        <img src={product.image02} alt="" />
                    </div>
                </div>

                <div className="product__images__main">
                    <img src={previewImg} alt="" />
                </div>

                <div className={`product-desc ${expand ? 'expand' : ''}`}>
                    <div ref={descTitleRef} className="product-desc__title">
                        Chi tiết sản phẩm
                    </div>
                    <div
                        className="product-desc__content"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    ></div>
                    <div className="product-desc__toggle">
                        <Button size="sm" onClick={handleExpand}>
                            {expand ? 'Thu gọn' : 'Xem thêm'}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="product__info">
                <h1 className="product__info__title">{product.title}</h1>

                <div className="product__info__item">
                    <span className="product__info__item__price">{numberWithCommas(product.price)}</span>
                </div>

                <div className="product__info__item">
                    <div className="product__info__item__title">Màu sắc</div>
                    <div className="product__info__item__list">
                        {product.colors.map((item, index) => (
                            <div
                                key={index}
                                className={`product__info__item__list__item ${color === item ? 'active' : ''}`}
                                onClick={() => setColor(item)}
                            >
                                <div className={`circle bg-${item}`}></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="product__info__item">
                    <div className="product__info__item__title">Kích cỡ</div>
                    <div className="product__info__item__list">
                        {product.size.map((item, index) => (
                            <div
                                key={index}
                                className={`product__info__item__list__item ${size === item ? 'active' : ''}`}
                                onClick={() => setSize(item)}
                            >
                                <span className="product__info__item__list__item__size">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="product__info__item">
                    <div className="product__info__item__title">Số lượng</div>
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('minus')}>
                            <BiMinus />
                        </div>
                        <div className="product__info__item__quantity__input">{quantity}</div>
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('plus')}>
                            <BiPlus />
                        </div>
                    </div>
                </div>

                <div className="product__info__item btn">
                    <Button onClick={() => addToCart()}>Thêm vào giỏ</Button>
                    <Button onClick={() => goToCart()}>Mua ngay</Button>
                </div>
            </div>

            <div className={`product-desc mobile ${expand ? 'expand' : ''}`}>
                <div ref={descMobileRef} className="product-desc__title">
                    Chi tiết sản phẩm
                </div>
                <div className="product-desc__content" dangerouslySetInnerHTML={{ __html: product.description }}></div>
                <div className="product-desc__toggle">
                    <Button size="sm" onClick={handleExpandMobile}>
                        {expand ? 'Thu gọn' : 'Xem thêm'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

ProductView.propTypes = {
    product: PropTypes.object,
};

export const ProductViewModal = () => {
    const productSlug = useSelector(selectProductModal);
    const dispatch = useDispatch();
    // const product = productData.getProductBySlug('quan-jean-phong-cach-18');
    const [product, setProduct] = useState(undefined);

    useEffect(() => {
        setProduct(productData.getProductBySlug(productSlug));
    }, [productSlug]);

    return (
        <div className={`product-view__modal ${product === undefined ? '' : 'active'}`}>
            <div className="product-view__modal__content">
                <div className="product-view__modal__content__item">
                    <ProductView product={product} />
                </div>
                <div className="product-view__modal__content__close" onClick={() => dispatch(hide())}>
                    <Button size="sm">Đóng</Button>
                </div>
            </div>
        </div>
    );
};

export default ProductView;
