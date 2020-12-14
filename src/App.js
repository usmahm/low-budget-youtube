import React, { Fragment } from "react";
import { Route } from 'react-router-dom'

import Layout from './hoc/Layout/Layout';
import Home from "./containers/Home/Home";
import Trending from "./containers/Trending/Trending";
import WatchVid from './containers/WatchVid/WatchVid';

// import data from "./data";
import "./App.scss";

const App = props => {
  
  let routes = (
    <Fragment>
      <Route path="/watch" component={WatchVid} />
      <Route path="/subscription" component={WatchVid} />
      <Route path='/trending' component={Trending} />
      <Route exact path="/" component={Home} />
      {/* <Redirect to="/" /> */}
    </Fragment>
  )

  return (
    // <div className="App">
      <Layout>
        {routes}
      </Layout>
    // {/* </div> */}
  );
}

export default App;
