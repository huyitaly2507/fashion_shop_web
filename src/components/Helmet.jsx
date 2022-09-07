import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function Helmet(props) {
    document.title = 'Yolo - ' + props.title;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <div className="helmet">{props.children}</div>;
}

Helmet.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Helmet;
