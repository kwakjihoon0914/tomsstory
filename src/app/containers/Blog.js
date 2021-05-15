
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,useRouteMatch
} from "react-router-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Grid, Hidden,LinearProgress } from '@material-ui/core';
import SideMenu from '../components/blog/SideMenu';
import View from '../components/blog/View';
import useWindowSize from '../hooks/useWindowSize';


const useStyles = makeStyles(theme => ({
    blogContainer:{
        backgroundColor:"#f6faf5"
    }
}))


const Blog = () => {

    const classes = useStyles();
    const [contentId,setContentId] = useState(null);
    const [menuWidth,setMenuWidth] = useState(0);
    const [conetentWidth,setContentWidth] = useState(0);
    const windowSize = useWindowSize();
    let match = useRouteMatch();

    /**
     * @name detectChangedContentId
     * @desc 
    */
    useEffect(function detectChangedContentId(){
       //fetch content By id
       setContentId(match.params.contentId)
    },[match.params.contentId])

    /**
     * @name setChangedWidth
     * @desc 
    */
    useEffect(function setChangedWidth(){
        setMenuWidth(windowSize.width/12*3);
        setContentWidth(windowSize.width/12*9);
    },[windowSize.width]);

    
    

    return (
        <div className={classes.blogContainer}>
            <Grid container spacing={0}>
                <Grid item md={3} lg={3} xl={2}>
                    <Hidden smDown>
                        <SideMenu menuWidth={menuWidth}/>
                    </Hidden>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9} xl={10}>
                    <View conetentWidth={conetentWidth} contentId={contentId} />
                </Grid>
            </Grid>
        </div>

    )
}


export default Blog;