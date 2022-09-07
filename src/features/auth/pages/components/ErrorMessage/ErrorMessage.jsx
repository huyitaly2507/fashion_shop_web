import './errorMessage.scss';
import { BsExclamationCircleFill } from 'react-icons/bs';

function ErrorMessage({ error, children }) {
    const customErrMsg = children.slice(children.indexOf('/') + 1, children.length - 2).replace(/-/g, ' ');

    return (
        <>
            {error && (
                <div className="err-msg">
                    <BsExclamationCircleFill className="err-msg-icon" />
                    <span className="err-msg-title">
                        {customErrMsg.charAt(0).toUpperCase() + customErrMsg.slice(1)}
                    </span>
                </div>
            )}
        </>
    );
}

export default ErrorMessage;
