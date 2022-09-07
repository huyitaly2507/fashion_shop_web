import { useFormik } from 'formik';
import { Fragment, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../AuthUser';
import './authPages.scss';
import BackBtn from './components/BackButton/BackBtn';
import ButtonSocial from './components/ButtonSocial/ButtonSocial';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import FooterLogin from './components/FooterLogin/FooterLogin';
import HeaderLogin from './components/HeaderLogIn/HeaderLogin';
import InputAuth from './components/Input/InputAuth';

function SignIn() {
    const [errormsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const { signIn } = useContext(AuthContext);
    // const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Please enter a valid email address').required('Required'),
            password: Yup.string()
                .required('Required')
                .matches(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    'Password must be more than 8 characters and contain at least one letter, one number and a special character',
                ),
        }),
        onSubmit: async (values) => {
            try {
                await signIn(values.email, values.password);
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
                    <HeaderLogin>Sign in</HeaderLogin>
                    <BackBtn />
                </div>
                <ButtonSocial className="btn" />
                <form className="infoform" onSubmit={formik.handleSubmit}>
                    <ErrorMessage error={errormsg}>{errormsg}</ErrorMessage>
                    {Object.keys(formik.values).map((value, index) => (
                        <Fragment key={index}>
                            <InputAuth
                                label={(value === 'email' && 'Email address') || (value === 'password' && 'Password')}
                                type={(value === 'email' && 'email') || (value === 'password' && 'password')}
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
                <FooterLogin signin />
            </div>
        </div>
    );
}

export default SignIn;
