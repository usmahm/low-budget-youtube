import React from 'react';

import './RequestErrorHandler.scss'

const RequestErrorHandler = (props) => {
    return (
        <div className="error">
            {/* <p>OOPS!</p> */}
            <div>
                {props.children}
            </div>
        </div>
    )
}
export default RequestErrorHandler;