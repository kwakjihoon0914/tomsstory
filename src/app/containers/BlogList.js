


import { makeStyles } from '@material-ui/core/styles';
import {
    Link, useHistory, useRouteMatch
} from "react-router-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Content from '../components/blog/Content';
import useWindowSize from '../hooks/useWindowSize';
import ContentService from '../services/ContentService';
import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Collapse, Divider, Grid, IconButton, InputAdornment, TextField, Typography, Zoom } from '@material-ui/core';
import useDeviceDetect from '../hooks/useDeviceDetect';
import CommonStyle from '../styles/CommonStyle';
import ContentCard from '../components/blogList/CotentCard';
import ContentCardList from '../components/blogList/ContentCardList';
import useScrollBottom from '../hooks/useScrollBottom';
import { FaBook, FaSearch } from 'react-icons/fa';

import { BsGridFill } from 'react-icons/bs';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Title from '../components/blogList/Title';



const useStyles = makeStyles(theme => ({
    blogListContainer: {
        marginTop: 0,
        flexDirection: "column"
    },
    loadingContainer: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        margin: 10
    },
    contentListCaption: {
        marginLeft: 15,
        verticalAlign: "middle",
        display: "flex",
        flexDirection: "row"
    },
    contentListCaptionText: {
        marginTop:30,
        fontWeight: "600",
        fontSize: 25,
        color: CommonStyle.mainBoldColor
    },


}));



const Caption = ({ text }) => {
    const classes = useStyles();
    return (
        <div className={classes.contentListCaption} >
            <Typography className={classes.contentListCaptionText} variant="h5">
                {text}
            </Typography>
        </div>)
}
const BlogList = () => {

    const classes = useStyles();
    const { isBottom } = useScrollBottom();
    const [progressStatus, setProgressStatus] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [renderedPage, setRenderedPage] = useState(); // for bug
    const [contentList, setContentList] = useState([]);
   

    const fetchContentList = async () => {
        try {
            setProgressStatus(true);

            // 1) 동일 페이지 요청시 리턴 (버그)
            if (renderedPage == currentPage) return;

            // 2) 이전 페이지와 합치자!
            let presentContentList = [...contentList];
            let fetchedContentList = (await ContentService.getContentListByPage(currentPage, 5)).data;
            Array.prototype.push.apply(presentContentList, fetchedContentList.contents);

            // 3) 업데이트
            setContentList(presentContentList);
            setRenderedPage(fetchedContentList.pageRequest.page);

            // 4) 더 이상 페칭 가능한 데이터가 없으면
            if (fetchedContentList.contents.length == 0) setHasMore(false);

        } catch (e) {
            console.log(e)
        } finally {
            setProgressStatus(false);
        }
    }
    useEffect(function init() {
        fetchContentList();
    }, [currentPage]);
    useEffect(function detectScroll() {
        if (!hasMore) {

        } else if (isBottom && hasMore) {
            setCurrentPage(currentPage + 1);
        }
    }, [isBottom])


    return (
        <Grid alignContent={"center"} container className={classes.blogListContainer}>
            <Title/> 
            
            <Grid>
                {/* 1. Hot */}
                {contentList.length > 1 &&
                    <>
                        <Caption text={"Hot"} />
                        <ContentCard content={contentList[0] ? contentList[0] : undefined} />
                    </>
                }
                {/* 2. New */}
                <Caption text={"New"} />
                <ContentCardList contentList={contentList} />

                {/* 99. Circular Progress  */}
                {progressStatus &&
                    <div className={classes.loadingContainer}>
                        <CircularProgress thickness={10} size={20} />
                    </div>
                }
            </Grid>
        </Grid>
    )
}


export default BlogList;