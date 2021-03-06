import React, {useEffect, Fragment} from 'react';
import { Route, useParams } from 'react-router-dom';

import useHttp from '../../hooks/useHttp';
import { useStore } from "../../store/store";
import APIKeys from '../../shared/APIKeys'

import Header from './Header/Header';
import Videos from './Videos/Videos';
import About from '../../components/Channel/About/About';

import './Channel.scss'

const Channel = (props) => {
    const {sendRequest, data} = useHttp()
    const [ state, dispatch ] = useStore();

    const channelID = useParams().id;

    useEffect(() => {
        console.log('Channel key17')
        sendRequest(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics%2CbrandingSettings&id=${channelID}&key=${APIKeys.key17}`)
    }, [channelID, sendRequest])

    useEffect(() => {
        if (data) {
            dispatch('SET_ABOUT_CHANNEL', data)
        }
    }, [data, dispatch])

    useEffect(() => {
        return () => {
            dispatch('RESET_CHANNEL_DETAILS')
        }
    }, [dispatch])

    let channelRoutes = (
        <Fragment>
            <Route path={`/channel/:id/videos`} component={Videos} />
            <Route path={`/channel/${channelID}/about`} component={About} />
        </Fragment>
    )

    return (
        <div className="channel">
            <Header channelDetails={state.channelPage.channelDetails} />
            {channelRoutes}
        </div>
    )
}

export default Channel;