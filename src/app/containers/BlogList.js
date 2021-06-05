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
import FakeCard from '../components/blogList/FakeCard';


const useStyles = makeStyles(theme => ({
    blogListContainer: {
        marginTop: 0,
        flexDirection: "row",
        justifyContent: "center"
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
        marginTop: 30,
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
const BlogList = ({ location }) => {

    const classes = useStyles();
    const { isBottom } = useScrollBottom();
    const { isMobile } = useDeviceDetect();
    const [inProgressActive, setInProgressActive] = useState(false);

    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(-1);
    const [contentList, setContentList] = useState([]);
    const [hotContent,setHotContent] = useState();

    const [query, setQuery] = useState("");
    const prevQuery = useRef(query);

    

    const queryToObject = (query) => {
        query = query.substring(1)
        return Object.fromEntries(new URLSearchParams(query));
    }

    const fetchContentList = async (page, title) => {
        try {
            if (inProgressActive) return;
            setInProgressActive(true);

            // 2) 이전 페이지와 합치자!
            let currentContentList = page == 0 ? [] : [...contentList];
            let fetchedContentListWithPage;
            let fetchedHotContent; // blog list 호출시에만 업데이트하도록하자
            if (title) {
                fetchedContentListWithPage = (await ContentService.getContentsByTitle(title, page, 5)).data;
            } else {
                fetchedContentListWithPage = (await ContentService.getContentListByPage(page, 5)).data;
                fetchedHotContent = (await ContentService.getContentHotOne()).data;
            }
            Array.prototype.push.apply(currentContentList, fetchedContentListWithPage.contents);


            // 3) 업데이트
            setHotContent(fetchedHotContent); // hot content 가 먼저 렌더링 되니 순서를 꼭 지켜야함! 
            setContentList(currentContentList);
            setCurrentPage(fetchedContentListWithPage.pageRequest.page);
            // 4) 더 이상 페칭 가능한 데이터가 없으면
            if (fetchedContentListWithPage.contents.length == 0) setHasMore(false);

        } catch (e) {
            console.log(e)
        } finally {
            setInProgressActive(false);
        }
    }
    function fetch(page) {
        let title = queryToObject(location.search).title
        if (title && title.trim() != "") {
            setQuery(title);
            fetchContentList(page, title);
        } else {
            setQuery("");
            fetchContentList(page);
        }
    }

    useEffect(function refresh() {
        setHasMore(true);
        fetch(0);
    }, [location.search])

    useEffect(function detectScroll() {
        if (isBottom && hasMore) {
            fetch(currentPage + 1);
        }
    }, [isBottom]);


    return (
        <Grid container className={classes.blogListContainer}>
            <Title />
            <Grid item xs={isMobile ? 12 : 10}>
                <Grid item >

                    {/* CASE02) default feteching scucess */}
                    {(contentList.length > 0 && query.trim() == "") &&
                        <>
                            {/***************** Default *****************/}
                            {/* 1. Hot */}
                            <Caption text={"Hot"} />
                            <ContentCard content={hotContent ? hotContent : undefined} />

                            {/* 2. New */}
                            <Caption text={"New"} />
                            <ContentCardList contentList={contentList} />
                        </>
                    }
                    {/* CASE03) feteching with scucess */}
                    {query.trim() != "" &&
                        <>
                            {/* CASE03-1) 검새결과 */}
                            {contentList.length > 0
                                ? // 검색결과
                                <>
                                    {/* 1. List */}
                                    <Typography style={{ margin: 15 }}>
                                        <span style={{ color: "#fa3830" }}>'{query.trim()}' </span>에 대한 검색결과
                                    </Typography>
                                    <ContentCardList contentList={contentList} />
                                </>
                                :
                                // 검색을 했으나 결과가 없음
                                (
                                    <Grid container
                                        spacing={0}
                                        direction="row"
                                        alignItems="center"
                                        justify="center">
                                        <Typography style={{ margin: 30 }}>
                                            <span style={{ color: "#fa3830" }}>'{query.trim()}' </span>대한 검색결과가 없습니다.
                                        </Typography>
                                    </Grid>
                                )
                            }
                        </>
                    }

                    {/* 99. Circular Progress  */}
                    {inProgressActive &&
                        <div className={classes.loadingContainer}>
                            <CircularProgress thickness={10} size={20} />
                        </div>
                    }

                    {/* CASE01) fetching ... */}
                    {contentList.length == 0 &&
                        <>
                            <FakeCard content={{ title: "", subTitle: "" }} />
                            <FakeCard content={{ title: "", subTitle: "" }} />
                        </>

                    }

                </Grid>
            </Grid>
        </Grid>
    )
}


export default BlogList;