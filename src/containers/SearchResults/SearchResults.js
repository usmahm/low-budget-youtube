import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import useSearchHttp from '../../hooks/useSearchHttp';

import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import SearchResultCard from '../../components/VidCard/SearchResultCard/SearchResultCard';
import RequestErrorHandler from '../../hoc/RequestErrorHandler/RequestErrorHandler';

import './SearchResults.scss'

const SearchRes = (props) => {
    const [hasMore, setHasMore] = useState(false)
    const hardCodedLimit = 150 // Prevent loading more than 75 search results thus making API limit reach time longer
    const { searchData, sendSearchRequest, error, totalResults, nextPageToken, fetchMoreSearchResult} = useSearchHttp()
    let searchQuery = new URLSearchParams(props.location.search).get('search-query');

    // let CORSAnywhereURL = "https://cors-anywhere.herokuapp.com/";
    // CORSAnywhereURL = "";  
    
    // Handles first request to the server
    useEffect(() => {
        sendSearchRequest(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchQuery}&type=video&key=${process.env.REACT_APP_KEY_5}`)
    }, [sendSearchRequest, searchQuery])

    useEffect(() => {
    // Checks if first API call has been made thus nextPageToken would have been set for the next API call
        if (totalResults) {
            setHasMore(true)
        }
    }, [totalResults])

    const getMoreVideos = () => {
        if (searchData.length > 0) {
            if (searchData.length >= hardCodedLimit) {
                setHasMore(false)
                return;
            }
            if (searchData.length < hardCodedLimit) {
                fetchMoreSearchResult(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchQuery}&type=video&pageToken=${nextPageToken}&key=${process.env.REACT_APP_KEY_6}`)
            }
        }
    }

    let videos = <LoadingIndicator />

    if (searchData.length > 0) {
        videos = searchData.map((vidData) => (
            <SearchResultCard key={vidData.videoId} videosData={vidData} />
          ))
    }

    if (searchData.length === 0 && error) {
        if (error.status === 403) {
          videos = (
            <RequestErrorHandler>
              <p>Can't load search results at the moment.</p>
              <p>Try reloading the page after some time.</p>
            </RequestErrorHandler>
          ) 
        }
      }

    return (
        <main className="search-page">
            <InfiniteScroll
                pageStart={0}
                loadMore={getMoreVideos}
                hasMore={hasMore}
                loader={<LoadingIndicator key="spinner" type="spinner" />}
            >
                <div className="results-container">
                    {videos}
                </div>
            </InfiniteScroll>
            {searchData.length > 0 && searchData.length >= hardCodedLimit ? <p className="page-end__message">You've reached this end of the search results.</p> : null}
        </main>
    )
}

export default SearchRes