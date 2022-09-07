import React from 'react';
import './backbtn.scss';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function BackBtn() {
    const navigate = useNavigate();

    return (
        <div className="back_btn" onClick={() => navigate('/')}>
            <MdArrowBackIosNew />
        </div>
    );
}
