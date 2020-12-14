import React from 'react'

import { useStore } from '../../store/store'
import {Link} from 'react-router-dom';

import'./Header.scss'
import logo from './logo.svg'

import MenuIcon from '@material-ui/icons/Menu';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AppsIcon from '@material-ui/icons/Apps';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';

const Header = React.memo((props) => {
    const dispatch = useStore()[1]

    const toggleSideDrawer = () => {
        dispatch('TOGGLE_SIDE_DRAWER')
    }

    return (
        <header className="header">
            <div className="header__left">
                <span onClick={toggleSideDrawer}>
                    <MenuIcon className="icon icon__d" />
                </span>
                <Link to="/">
                    <img src={logo} alt="Logo" />
                </Link>
            </div>
            <form className="header__center">
                <input placeholder="Search" />
                <div type="submit">
                    <SearchRoundedIcon className="icon" />
                </div>
            </form>
            <div className="header__right">
                <VideoCallIcon className="icon icon__d" />
                <AppsIcon className="icon icon__d" />
                <MoreVertIcon className="icon icon__d" />
                <a href="name" className='login-button'>
                    <Avatar variant="circular" className="icon" />
                    SIGN IN
                </a>
            </div>
        </header>
    )
})

export default Header
