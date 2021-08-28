
import React, {StyleSheet, useEffect} from 'react';
import './button.scss';


const Button = (props) => {
    useEffect(() => {
    }, []);

    return (
        <button className="form-btn" {...props}>{props.children}</button>
    );
};

export default Button;
