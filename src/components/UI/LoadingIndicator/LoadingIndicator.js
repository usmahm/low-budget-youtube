import React from 'react';
import './LoadingIndicator.scss'

const LoadingIndicator = (props) => {
    let indicator = <span className="loading-bar" style={{top: props.top}}></span>
    
    if (props.type) {
        if (props.type === 'loadingBox') {
            indicator = (
                <div class="loading-box">
                    <div class="rect1"></div>
                    <div class="rect2"></div>
                    <div class="rect3"></div>
                    <div class="rect4"></div>
                    <div class="rect5"></div>
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