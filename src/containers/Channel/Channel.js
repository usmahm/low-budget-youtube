import React, {useEffect, Fragment} from 'react';
import { Route, useParams } from 'react-router-dom';

import useHttp from '../../hooks/useHttp';
import useSearchHttp from '../../hooks/useSearchHttp'
import { useStore } from "../../store/store";

import Header from './Header/Header';
import Videos from '../../components/Channel/Videos/Videos';
import About from '../../components/Channel/About/About';

import './Channel.scss'

const Channel = (props) => {
    const {sendRequest, data} = useHttp()
    const { sendSearchRequest, searchData } = useSearchHttp()
    const [ state, dispatch ] = useStore();

    const APIKey = "AIzaSyD-o-aKL9q8Zh25uYSRZAj-KQQu8UVHFY4";
    const channelID = useParams().id;

    useEffect(() => {
        sendRequest(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics%2CbrandingSettings&id=${channelID}&key=${APIKey}`)
        sendSearchRequest(`https://www.googleapis.com/youtube/v3/search?key=${APIKey}&channelId=${channelID}&part=snippet,id&order=date&maxResults=33`)
    }, [APIKey, channelID, sendSearchRequest, sendRequest])

    useEffect(() => {
        if (data) {
            dispatch('SET_ABOUT_CHANNEL', data)
        }

        if (searchData) {
            console.log(searchData);
            dispatch('SET_CHANNEL_VIDEOS', searchData)
        }
    }, [data, dispatch, searchData])

    let channelRoutes = (
        <Fragment>
            <Route path={`/channel/${channelID}/videos`} component={Videos} />
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