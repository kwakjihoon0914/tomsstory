
import { makeStyles } from '@material-ui/core/styles';
import {useRouteMatch
} from "react-router-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Grid, Hidden,LinearProgress } from '@material-ui/core';
import LeftSideMenu from '../components/blog/LeftSideMenu';
import Content from '../components/blog/Content';
import useWindowSize from '../hooks/useWindowSize';
import CommonConfig from '../config/CommonConfig';
import ContentService from '../services/ContentService';


const useStyles = makeStyles(theme => ({
    blogContainer:{
        backgroundColor:"#f6faf5"
    }
}))


const Blog = () => {

    const classes = useStyles();
    const match = useRouteMatch();
    const windowSize = useWindowSize();

    const [content,setContent] = useState(null);
    const [menuWidth,setMenuWidth] = useState(0);
    const [conetentWidth,setContentWidth] = useState(0);
   
    const fetchContent = async (id,menu) =>{
        try{
            let content;
            if (menu){
                content = (await ContentService.getLastContent(menu)).data;
            }else{
                content = (await ContentService.getContentOne(id)).data;
            }
            setContent(content);

        }catch(e){
            setContent(null);
            console.error(e)
        }
    }

    /**
     * @name setChangedWidth
     * @desc 
    */
    useEffect(function setChangedWidth(){
        setMenuWidth(windowSize.width/12*3);
        setContentWidth(windowSize.width/12*9);
    },[windowSize.width]);


    /**
     * @name detectChangedContentId
     * @desc title 변경
    */
    useEffect(function detectChangedCotent(){
        if (!content || !content.title){
            document.title = `${CommonConfig.APP_NAME}`;
        }else{
            document.title = `${content.title} - ${CommonConfig.APP_NAME} Blog`;
        }
        
    },[content]);

    
    /**
     * @name handleChangedMatch
     * @desc 라우터 패스 변경감지
    */
    useEffect(function handleChangedMatch(){
        let contentId   = match.params.id;
        let menu = match.params.menu;
        fetchContent(contentId,menu);
    },[match.params.menu,match.params.id]);
    

    return (
        <div className={classes.blogContainer}>
            <Grid container spacing={0}>
            
                {/* 1. Left Side Menu */}
                <Grid item md={3} lg={3} xl={2}>
                    <Hidden smDown>
                        <LeftSideMenu menuWidth={menuWidth}/>
                    </Hidden>
                </Grid>

                {/* 2. Blog Content */}
                <Grid item xs={12} sm={12} md={9} lg={9} xl={10}>
                    <Content content={content} conetentWidth={conetentWidth} />
                </Grid>
            </Grid>
        </div>

    )
}


export default Blog;