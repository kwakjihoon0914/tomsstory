import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import ContentService from '../services/ContentService';
import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Collapse, Divider, Grid, IconButton, InputAdornment, TextField, Typography, Zoom } from '@material-ui/core';
import CommonStyle from '../styles/CommonStyle';
import ContentCard from '../components/blogList/CotentCard';
import ContentCardList from '../components/blogList/ContentCardList';
import useScrollBottom from '../hooks/useScrollBottom';
import Title from '../components/blogList/Title';
import useDeviceDetect from '../hooks/useDeviceDetect';


const useStyles = makeStyles(theme => ({
    blogListContainer: {
        marginTop: 0,
        flexDirection: "row",
        justifyContent:"center"
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
const BlogList = ({location}) => {

    const classes = useStyles();
    const { isBottom } = useScrollBottom();
    const { isMobile}  = useDeviceDetect();
    const [progressStatus, setProgressStatus] = useState(false);

    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(-1);
    const [contentList, setContentList] = useState([]);
    
    const queryToObject= (query) =>{
        query = query.substring(1)
        return Object.fromEntries(new URLSearchParams(query));
    }

    const fetchContentList = async (page,title) => {
        try {
            
            setProgressStatus(true);
            
            // 2) 이전 페이지와 합치자!
            let currentContentList = page==0 ? [] : [...contentList];
            let fetchedContentListWithPage;
            if (title){
                fetchedContentListWithPage = (await ContentService.getContentsByTitle(title,page, 5)).data;
            }else{
                fetchedContentListWithPage = (await ContentService.getContentListByPage(page, 5)).data;
            }
            Array.prototype.push.apply(currentContentList, fetchedContentListWithPage.contents);


            // 3) 업데이트
            setContentList(currentContentList);
            setCurrentPage(fetchedContentListWithPage.pageRequest.page);

            // 4) 더 이상 페칭 가능한 데이터가 없으면
            if (fetchedContentListWithPage.contents.length == 0) setHasMore(false);

        } catch (e) {
            console.log(e)
        } finally {
            setProgressStatus(false);
        }
    }
    function fetch(page){
        let title= queryToObject(location.search).title
        if (title && title.trim() != ""){
            fetchContentList(page,title);
        }else{
            fetchContentList(page);
        }
    }

    useEffect(function refresh(){
        setHasMore(true);
        fetch(0);
    },[location.search])

    useEffect(function detectScroll() {
        if (isBottom && hasMore) {
            fetch(currentPage+1);
        }
    }, [isBottom]);
    

    return (
        <Grid container className={classes.blogListContainer}>
            <Title /> 
            <Grid md={isMobile?12:10}>
                <Grid item >
                {contentList.length > 0 &&
                    <>
                        {/* 1. Hot */}
                        <Caption text={"Hot"} />
                        <ContentCard content={contentList[0] ? contentList[0] : undefined} />
                        
                        {/* 2. New */}
                        <Caption text={"New"} />
                        <ContentCardList contentList={contentList} />

                        {/* 99. Circular Progress  */}
                        {progressStatus &&
                            <div className={classes.loadingContainer}>
                                <CircularProgress thickness={10} size={20} />
                            </div>
                        }
                    </>
                }
                </Grid>
            </Grid>
        </Grid>
    )
}


export default BlogList;