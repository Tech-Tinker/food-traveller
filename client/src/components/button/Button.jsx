import React from 'react';
import './Button.css';

const Button = (props) => {
    return (
        <button type="submit" className={`bttn mt-8 ${props.backgroundColorClass}`}>{props.text}</button>
    );
};

export default Button;