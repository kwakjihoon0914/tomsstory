
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Grid, Hidden } from '@material-ui/core';
import TopAppBar from './app/containers/TopAppBar';
import SubContent from './app/containers/SubContent';
import Blog from './app/containers/Blog';
import AppWrapper from "./app/containers/AppWrapper";
import Editor from './app/containers/Editor';

const useStyles = makeStyles(theme => ({

}))

const App = () => {

  const classes = useStyles();

  return (
    <Router>
      <AppWrapper>
        <TopAppBar />
        <Switch >
          <Route path="/blogs/:contentId"
            render={(props) => (
              <Blog {...props} />
            )}
          />

          <Route path="/edit"            
            render={(props) => (
              <Editor {...props} />
            )}
          />
          {/* defualt route */}
          <div style={{ height: 1200 }}>
            asdfasdfasdf
        </div>
        </Switch>
      </AppWrapper>
    </Router>
  );
}


export default App;
