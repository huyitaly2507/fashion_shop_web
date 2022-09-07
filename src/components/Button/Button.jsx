import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

function Button(props) {
    const bg = props.backgroundColor ? 'bg-' + props.backgroundColor : 'bg-main';

    const size = props.size ? 'btn-' + props.size : '';

    const animate = props.animate ? 'btn-animate' : '';

    const border = props.border ? 'btn-border' : '';

    return (
        <button
            className={`btn ${bg} ${size} ${animate} ${border} ${props.className}`}
            onClick={props.onClick ? props.onClick : null}
        >
            <span className="btn__txt">{props.children}</span>
            {props.icon ? <span className="btn__icon">{props.icon}</span> : null}
        </button>
    );
}

Button.propTypes = {
    backgroundColor: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.node,
    animate: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Button;
