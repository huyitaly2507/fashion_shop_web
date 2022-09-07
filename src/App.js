import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes/routes';
import DefaultLayout from './Layout/DefaultLayout/DefaultLayout';
import { Fragment } from 'react';
import Modal from './components/Modal/Modal';
import { ProductViewModal } from './components/ProductView/ProductView';
import AuthUser from './features/auth/AuthUser';

function App() {
    return (
        <div className="App">
            <AuthUser>
                <Router>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;

                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <>
                                            <Modal />
                                            <Layout>
                                                <Page />
                                            </Layout>
                                            <ProductViewModal />
                                        </>
                                    }
                                />
                            );
                        })}
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;

                            let Layout = DefaultLayout;

                            const ProtectedRoute = route.protected;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <ProtectedRoute>
                                                <Page />
                                            </ProtectedRoute>
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </Router>
            </AuthUser>
        </div>
    );
}

export default App;
