import React, { Fragment, useEffect } from "react";
import { Route } from 'react-router-dom';

import useHttp from './hooks/useHttp';
import { useStore } from './store/store';

import Layout from './hoc/Layout/Layout';
import Home from "./containers/Home/Home";
import Trending from "./containers/Trending/Trending";
import WatchVid from './containers/WatchVid/WatchVid';
import SearchResults from './containers/SearchResults/SearchResults'
import Channel from "./containers/Channel/Channel";

import "./App.scss";

const App = props => {
  const { sendRequest, data } = useHttp();
  const dispatch = useStore()[1]

  useEffect(() => {
    sendRequest('https://freegeoip.app/json/')
  }, [sendRequest])

  useEffect(() => {
    if (data) {
      dispatch('SET_COUNTRY_CODE', data.country_code)
    } else {
      dispatch('CANT_FETCH_COUNTRY_CODE')
    }
  }, [data, dispatch])
  
  let routes = (
    <Fragment>
      <Route path="/channel/:id" component={Channel} />
      <Route path="/search" component={SearchResults} />
      <Route path="/watch" component={WatchVid} />
      <Route path='/trending' component={Trending} />
      <Route exact path="/" component={Home} />
      {/* <Redirect to="/" /> */}
    </Fragment>
  )

  return (
      <Layout>
        {routes}
      </Layout>
  );
}

export default App;
