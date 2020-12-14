// import classes from '*.module.css';
import React from 'react'
import { NavLink } from 'react-router-dom';
import './NavigationItem.scss';

const NavigationItem = props => {
    const Icon = props.icon;
    return (
        <li className={`navigation-item ${props.isSideNavClosed ? 'minimize' : ''}`}>
             <NavLink
                 to={props.link}
                 exact={props.exact}
                 className="navigation-link">

                 {props.icon ? <Icon className="navigation__icon" /> : null}
                 <p>{props.title}</p>
             </NavLink>
        </li>
    )
}

export default NavigationItem
