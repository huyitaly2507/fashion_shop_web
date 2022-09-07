import { Link } from 'react-router-dom';
import './footerLogin.scss';

function FooterLogin({ signin, signup }) {
    return (
        <footer className="footer-login">
            {signin && (
                <>
                    <span className="navigation-title">Don't have an account?</span>
                    <Link to="/signup" className="navigation-btn">
                        Sign up
                    </Link>
                </>
            )}
            {signup && (
                <>
                    <span className="navigation-title">Already have an account?</span>
                    <Link to="/signin" className="navigation-btn">
                        Sign in
                    </Link>
                </>
            )}
        </footer>
    );
}

export default FooterLogin;
