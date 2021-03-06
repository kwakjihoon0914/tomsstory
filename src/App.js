
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  BrowserRouter,
  HashRouter
} from "react-router-dom";
import React, { useEffect } from "react";
import TopAppBar from './app/containers/TopAppBar';
import SubContent from './app/containers/SubContent';
import Blog from './app/containers/Blog';
import AppWrapper from "./app/containers/AppWrapper";
import ContentEditor from './app/containers/ContentEditor';
import Resume from './app/containers/Resume';
import CommonConfig from './app/config/CommonConfig';
import BlogList from './app/containers/BlogList';

const useStyles = makeStyles(theme => ({

}))

const App = () => {

  const classes = useStyles();

  useEffect(function init() {
    document.title = CommonConfig.APP_NAME;
  })

  return (
    <HashRouter>
      <AppWrapper>
        <TopAppBar />
        <Switch >

        <Route exact path="/">
            <Redirect to="/blogs" />
        </Route>

          <Route path="/blogs/:menu/:id" render={(props) => (<Blog {...props} /> )} />
          <Route path="/blogs/:id" render={(props) => (<Blog {...props} /> )} />
          <Route path="/blogs" render={(props) => (<BlogList {...props} /> )} />
          <Route path="/edit" render={(props) => <ContentEditor {...props} />} />
          <Route path="/intro" render={(props) => <Resume {...props} />} />

          {/* defualt route */}
          <div style={{ height: 1200 }}>
            Not Found Page 404
          </div>
        </Switch>
      </AppWrapper>
    </HashRouter>
  );
}


export default App;
