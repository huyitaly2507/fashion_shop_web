import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '~/Firebase';
import { selectUser } from '~/redux/userSlice';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';

export default function DefaultLayout({ children }) {
    const currentUser = useSelector(selectUser);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${currentUser?.email}`), (doc) => {
            setTotalProducts(doc.data()?.savedShows.reduce((total, item) => total + Number(item.quantity), 0));
        });
    }, [currentUser?.email]);

    return (
        <div>
            <Header totalProducts={totalProducts} />
            <div className="container">
                <div className="main">{children}</div>
            </div>
            <Footer />
        </div>
    );
}
