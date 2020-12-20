import React from 'react';
import './LoadingIndicator.scss'

const LoadingIndicator = (props) => {
    let indicator = <span className="loading-bar" style={{top: props.top}}></span>
    
    if (props.type) {
        if (props.type === 'loadingBox') {
            indicator = (
                <div className="loading-box">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div>
            )
        } else if (props.type === 'spinner') {
            indicator = (
                <div className="spinner-wrapper">
                    <span className="spinner"></span>
                </div>
            )
        }
    }

    return indicator
}

export default LoadingIndicator;