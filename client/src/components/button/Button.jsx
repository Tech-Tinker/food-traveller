import React from 'react';
import './Button.css';

const Button = (props) => {
    return (
        <button type="submit" className={`bttn mt-8 fw-bold ${props.backgroundColorClass} ${props.widthClass}`}>{props.text}</button>
    );
};

export default Button;