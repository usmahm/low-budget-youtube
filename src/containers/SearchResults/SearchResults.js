import React, { useEffect } from 'react';

// import useVideoHttp from '../../hooks/useSearchHttp';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';

import SearchResultCard from '../../components/VidCard/SearchResultCard/SearchResultCard';

import './SearchResults.scss'
import useSearchHttp from '../../hooks/useSearchHttp';

const SearchRes = (props) => {
    // const { data, sendVideosRequest } = useVideoHttp()
    console.log(props)
    const { searchData, sendSearchRequest} = useSearchHttp()
    let searchQuery = new URLSearchParams(props.location.search).get('search-query');

    const APIKey = "AIzaSyDVJP-R4t3T4Qj2FLMsgaAB39B4JlWvahQ"; // Key 6
    let CORSAnywhereURL = "https://cors-anywhere.herokuapp.com/";
    CORSAnywhereURL = "";  
    
    useEffect(() => {
        sendSearchRequest(`${CORSAnywhereURL}https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&type=video&key=${APIKey}`)
    }, [sendSearchRequest, searchQuery, CORSAnywhereURL])

    let videos = <LoadingIndicator />

    if (searchData) {
        console.log(searchData)
        videos = searchData.map((vidData) => (
            <SearchResultCard key={vidData.videoId} videosData={vidData} />
          ))
    }

    return (
        <main className="search-page">
            {videos}
        </main>
    )
}

export default SearchRes