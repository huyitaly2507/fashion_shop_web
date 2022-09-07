import React, { useContext, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '~/assets/images/Logo-2.png';
import { BiMenuAltLeft, BiChevronLeft, BiSearch, BiUser, BiCart, BiLogOut } from 'react-icons/bi';
import './header.scss';
import { useSelector } from 'react-redux';
import { selectUser } from '~/redux/userSlice';
import Button from '~/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '~/features/auth/AuthUser';

const mainNav = [
    {
        display: 'Trang chủ',
        path: '/',
    },
    {
        display: 'Sản phẩm',
        path: '/catalog',
    },
    {
        display: 'Phụ kiện',
        path: '/accessories',
    },
    {
        display: 'Liên hệ',
        path: '/contact',
    },
];

export default function Header(props) {
    const currentUser = useSelector(selectUser);
    const navigate = useNavigate();
    const headerRef = useRef(null);
    const menuLeft = useRef(null);
    const { logOut } = useContext(AuthContext);

    const menuToggle = () => {
        menuLeft.current.classList.toggle('active');
    };

    useEffect(() => {
        const handleScroll = () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={headerRef} className="header">
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <BiMenuAltLeft />
                    </div>
                    <div ref={menuLeft} className="header__menu__left">
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <BiChevronLeft />
                        </div>
                        {mainNav.map((item, index) => (
                            <div
                                key={index}
                                className="header__menu__item header__menu__left__item"
                                onClick={menuToggle}
                            >
                                <NavLink to={item.path} className={({ isActive }) => `${isActive ? 'active' : ''}`}>
                                    <span>{item.display}</span>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                    <div className="header__menu__right">
                        {currentUser ? (
                            <div className="header__menu__right__wrapper">
                                <div className="header__menu__item header__menu__right__item">
                                    <BiSearch />
                                </div>
                                <div className="header__menu__item header__menu__right__item">
                                    <Link to="/cart">
                                        <BiCart />
                                        <div className="cart-quantity">{props.totalProducts}</div>
                                    </Link>
                                </div>
                                <div className="header__menu__item header__menu__right__item user">
                                    <BiUser />
                                    <div className="user__info">
                                        <div className="user__info__wrapper">
                                            <div
                                                className="user__info__img"
                                                style={{ backgroundImage: `url(${currentUser.photoUrl})` }}
                                            ></div>
                                            <div className="user__info__content">
                                                <div className="user__info__content__name">{currentUser.name}</div>
                                                <div className="user__info__content__signInTime">
                                                    {currentUser.lastSignInTime}
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            className="log-out"
                                            size="sm"
                                            icon={<BiLogOut />}
                                            animate={true}
                                            onClick={() => logOut()}
                                        >
                                            Log Out
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="header__menu__right__wrapper">
                                <Button
                                    className="btn-signin"
                                    size="sm"
                                    backgroundColor="white"
                                    border={true}
                                    onClick={() => navigate('/signin')}
                                >
                                    Đăng nhập
                                </Button>
                                <Button className="btn-signup" size="sm" onClick={() => navigate('/signup')}>
                                    Đăng ký
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
