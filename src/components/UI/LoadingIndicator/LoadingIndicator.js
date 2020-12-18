import React from 'react';
import './LoadingIndicator.scss'

const LoadingIndicator = (props) => {
    return (
        <span className="spinner" style={{top: props.top}}></span>
    )
}

export default LoadingIndicator;