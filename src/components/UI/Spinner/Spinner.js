import React from 'react';
import './Spinner.scss'

const Spinner = (props) => {
    return (
        <span className="spinner" style={{top: props.top}}></span>
    )
}

export default Spinner;