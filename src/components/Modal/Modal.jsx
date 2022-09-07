import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hide } from '~/redux/productModalSlice';
import { hideModal, selectModal } from '~/redux/userSlice';
import Button from '../Button/Button';
import './modal.scss';

export default function Modal(props) {
    const showModal = useSelector(selectModal);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const contentRef = useRef(null);
    const contentElement = contentRef.current;

    if (showModal) {
        const handleSignIn = () => {
            navigate('/signin');
            dispatch(hideModal());
            dispatch(hide());
        };
        contentElement.innerHTML = showModal;
        if (contentElement.querySelector('span')) {
            contentElement.querySelector('span').addEventListener('click', handleSignIn);
        }
    }

    return (
        <div id={props.id} className={`modal ${showModal ? 'active' : ''}`}>
            <div className="modal__content">
                <div className="modal__content__item">
                    <span ref={contentRef}></span>
                </div>
                <div className="modal__content__close" onClick={() => dispatch(hideModal())}>
                    <Button size="sm">Đóng</Button>
                </div>
            </div>
        </div>
    );
}
