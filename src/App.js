
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import React, { useEffect } from "react";
import TopAppBar from './app/containers/TopAppBar';
import SubContent from './app/containers/SubContent';
import Blog from './app/containers/Blog';
import AppWrapper from "./app/containers/AppWrapper";
import Editor from './app/containers/Editor';
import Resume from './app/containers/Resume';
import CommonConfig from './app/config/CommonConfig';

const useStyles = makeStyles(theme => ({

}))

const App = () => {

  const classes = useStyles();

  useEffect(function init() {
    document.title = CommonConfig.APP_NAME;
  })

  return (
    <Router>
      <AppWrapper>
        <TopAppBar />
        <Switch >
          <Route path="/blogs/:menu/:id" render={(props) => (<Blog {...props} /> )} />
          <Route path="/edit" render={(props) => <Editor {...props} />} />
          <Route path="/intro" render={(props) => <Resume {...props} />} />

          {/* defualt route */}
          <div style={{ height: 1200 }}>
            Not Found Page 404
          </div>
        </Switch>
      </AppWrapper>
    </Router>
  );
}


export default App;
