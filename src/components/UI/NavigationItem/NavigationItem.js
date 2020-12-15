// import classes from '*.module.css';
import React from 'react'
import { NavLink } from 'react-router-dom';
import { useStore } from '../../../store/store';

import './NavigationItem.scss';

const NavigationItem = props => {
    const state = useStore()[0]
    const Icon = props.icon;
    return (
        <li className={`${props.class}  ${state.globalState.isMainNavSmall ? 's' : ''} ${props.shouldHideOnTabPort ? 'hide' : ''}`}>
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
