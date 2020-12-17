import React, { useState } from 'react'

import { useStore } from '../../store/store'
import {Link, useLocation, withRouter} from 'react-router-dom';

import'./Header.scss'
import logo from '../../assets/icons/logo.svg'

import MenuIcon from '@material-ui/icons/Menu';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AppsIcon from '@material-ui/icons/Apps';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Header = React.memo((props) => {
    const [searchInput, setSearchInput] = useState('')
    const [showInput, setShowInput] = useState(false)
    const dispatch = useStore()[1]
    let isPathnameWatch = useLocation().pathname === "/watch";

    const toggleSideNav = () => {
        dispatch('TOGGLE_SIDE_NAV')
    }

    const toggleMainNav = () => {
        dispatch('TOGGLE_MAIN_NAV')
    }

    const submitSearchHandler = (event) => {
        event.preventDefault()
        props.history.push(`/search?search-query=${searchInput}`)
    }

    const toggleSearchInput = () => {
        setShowInput(curState => !curState)
    }

    return (
        <header className="header">
            <div className="header__left">
                <div>
                    <span onClick={toggleSideNav}>
                        <MenuIcon className="icon icon__d" />
                    </span>
                    <span onClick={toggleMainNav}>
                        <MenuIcon className={`icon icon__d ${isPathnameWatch ? 'hide' : ''}`} />
                    </span>
                </div>
                <Link to="/">
                    <img src={logo} alt="Logo" />
                </Link>
            </div>
            <form className={`header__center ${showInput ? 'show' : ''}`} onSubmit={submitSearchHandler}>
                <div className="back-icon" onClick={toggleSearchInput}>
                    <ArrowBackIcon />
                </div>
                <div className="input_wrapper">
                    <input value={searchInput} onChange={(event) => {setSearchInput(event.target.value)}} placeholder="Search" />
                    <div type="submit" onClick={submitSearchHandler}>
                        <SearchRoundedIcon className="icon" />
                    </div>
                </div>
            </form>
            <div className="header__right">
                <span onClick={toggleSearchInput}>
                    <SearchRoundedIcon className="search-toggle icon" />
                </span>
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

export default withRouter(Header)
