import React from 'react'
import './SidebarCard.scss'

const SidebarCard = props => {
    const activeLink = props.selected ? 'selected' : '';
    return (
        <div className={`sidebar-nav ${activeLink}`}>
            <props.icon className="sidebar-nav__icon" />
            {props.title}
        </div>
    )
}

export default SidebarCard
