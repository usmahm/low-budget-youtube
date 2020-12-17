import React, { useEffect } from 'react';

// import useVideoHttp from '../../hooks/useSearchHttp';
import Spinner from '../../components/UI/Spinner/Spinner';

import SearchResultCard from '../../components/VidCard/SearchResultCard/SearchResultCard';

import './SearchResults.scss'
import useSearchHttp from '../../hooks/useSearchHttp';

const SearchRes = (props) => {
    // const { data, sendVideosRequest } = useVideoHttp()
    console.log(props)
    const { searchData, sendSearchRequest} = useSearchHttp()
    let searchQuery = new URLSearchParams(props.location.search).get('search-query');

    const APIKey = "AIzaSyBQYPwOPrbiFmiafbPOKlxQsieNuMV31yI"; // Key 2
    let CORSAnywhereURL = "https://cors-anywhere.herokuapp.com/";
    CORSAnywhereURL = "";  
    
    useEffect(() => {
        sendSearchRequest(`${CORSAnywhereURL}https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&type=video&key=${APIKey}`)
    }, [sendSearchRequest, searchQuery, CORSAnywhereURL])

    let videos = <Spinner />

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