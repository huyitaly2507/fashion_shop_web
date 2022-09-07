import './inputauth.scss';

function InputAuth({ label, type, id, name, value, onChange }) {
    return (
        <>
            <label className="label_auth">{label}</label>
            <input
                className="input_auth"
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={
                    name === 'confirmedPassword'
                        ? 'Confirm your password'
                        : name === 'phone'
                        ? 'Enter your phone numbers'
                        : `Enter your ${name}`
                }
            />
        </>
    );
}

export default InputAuth;
