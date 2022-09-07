/* eslint-disable no-useless-escape */
import { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterLogin from './components/FooterLogin/FooterLogin';
import HeaderLogin from './components/HeaderLogIn/HeaderLogin';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../AuthUser';
import './authPages.scss';
import ButtonSocial from './components/ButtonSocial/ButtonSocial';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import InputAuth from './components/Input/InputAuth';
import BackBtn from './components/BackButton/BackBtn';

function SignUp() {
    const [errormsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const { setValuesUser, signUp } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmedPassword: '',
            phone: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required').min(4, 'Must be 4 characters or more'),
            email: Yup.string().email('Please enter a valid email address').required('Required'),
            password: Yup.string()
                .required('Required')
                .matches(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    'Password must be more than 8 characters and contain at least one letter, one number and a special character',
                ),
            confirmedPassword: Yup.string()
                .required('Required')
                .oneOf([Yup.ref('password'), null], 'Password must match'),
            // eslint-disable-next-line no-useless-escape
            phone: Yup.string()
                .required('Required')
                .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Must be a valid phone number'),
        }),
        onSubmit: async (values) => {
            try {
                await signUp(values.email, values.password);
                setValuesUser(values);
                navigate('/');
            } catch (error) {
                setErrorMsg(error.message);
                console.log(error.message);
            }
        },
    });

    return (
        <div className="auth-wrapper">
            <div className="auth-page">
                <div className="auth-page_header">
                    <BackBtn />
                    <HeaderLogin>Sign up</HeaderLogin>
                    <BackBtn />
                </div>
                <ButtonSocial className="btn" />
                <form className="infoform" onSubmit={formik.handleSubmit}>
                    <ErrorMessage error={errormsg}>{errormsg}</ErrorMessage>
                    {Object.keys(formik.values).map((value, index) => (
                        <Fragment key={index}>
                            <InputAuth
                                label={
                                    (value === 'name' && 'Your name') ||
                                    (value === 'email' && 'Email address') ||
                                    (value === 'password' && 'Password') ||
                                    (value === 'confirmedPassword' && 'Confirm Password') ||
                                    (value === 'phone' && 'Phone number')
                                }
                                type={
                                    (value === 'email' && 'email') ||
                                    ((value === 'password' || value === 'confirmedPassword') && 'password') ||
                                    'text'
                                }
                                id={value}
                                name={value}
                                value={formik.values[value]}
                                onChange={(e) => {
                                    if (e.target.value.startsWith(' ')) {
                                        return;
                                    } else {
                                        formik.handleChange(e);
                                    }
                                }}
                            />
                            {formik.errors[value] && <p className="errorMsg">{formik.errors[value]}</p>}
                        </Fragment>
                    ))}
                    <button type="submit" className="btn btn-submit">
                        Continue
                    </button>
                </form>
                <FooterLogin signup />
            </div>
        </div>
    );
}

export default SignUp;
