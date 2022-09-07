import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import SignIn from '~/features/auth/pages/SignIn';
import SignUp from '~/features/auth/pages/SignUp';
import CartPage from '~/pages/CartPage/CartPage';
import CatalogPage from '~/pages/CatalogPage/CatalogPage';
import HomePage from '~/pages/HomePage';
import ProductPage from '~/pages/ProductPage';
import { selectUser } from '~/redux/userSlice';

export const ProtectedRoute = ({ children }) => {
    const currentUser = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/signin');
        }
    }, [currentUser, navigate]);

    return <>{children}</>;
};

const publicRoutes = [
    { path: config.routes.home, component: HomePage },
    { path: config.routes.catalog, component: CatalogPage },
    { path: config.routes.product, component: ProductPage },
    { path: config.routes.accessories, component: HomePage },
    { path: config.routes.contact, component: HomePage },
    { path: config.routes.signin, component: SignIn, layout: null },
    { path: config.routes.signup, component: SignUp, layout: null },
];

const privateRoutes = [{ path: config.routes.cart, component: CartPage, protected: ProtectedRoute }];

export { publicRoutes, privateRoutes };
