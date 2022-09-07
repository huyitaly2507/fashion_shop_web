import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '~/features/auth/AuthUser';
import './buttonSocial.scss';
import { FbIcon, GGIcon } from './Icons';

function ButtonSocial({ className }) {
    const navigate = useNavigate();

    const { googleSignIn, facebookSignIn } = useContext(AuthContext);

    const handleGgSignin = async () => {
        try {
            await googleSignIn();
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleFbSignin = async () => {
        try {
            await facebookSignIn();
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="btn-wrapper">
            <button className={`btn-social google ${className ? className : ''}`} onClick={handleGgSignin}>
                <GGIcon />
                <span className="btn-social-title">Google</span>
            </button>
            <button className={`btn-social facebook ${className ? className : ''}`} onClick={handleFbSignin}>
                <FbIcon />
                <span className="btn-social-title">Facebook</span>
            </button>
        </div>
    );
}

export default ButtonSocial;
