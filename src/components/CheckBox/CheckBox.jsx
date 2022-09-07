import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { BiCheck } from 'react-icons/bi';
import './checkbox.scss';

function CheckBox(props) {
    const inputRef = useRef(null);

    const handleChange = () => {
        if (props.onChange) {
            props.onChange(inputRef.current);
        }
    };

    return (
        <label className="custom-checkbox">
            <input type="checkbox" ref={inputRef} onChange={handleChange} checked={props.checked} />
            <span className="custom-checkbox__checkmark">
                <BiCheck />
            </span>
            {props.label}
        </label>
    );
}

CheckBox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
};

export default CheckBox;
