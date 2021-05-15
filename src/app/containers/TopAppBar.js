

import { makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import CommonStyle from '../styles/CommonStyle';

import {isMobile} from  "react-device-detect";

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,

    /* Top AppBar */
    topAppBar: {
        display: "flex",
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: CommonStyle.mainComplementaryColor,
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        "&:hover": {
            display: "flex",
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: CommonStyle.mainColor,
            boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        }
    },
    get topAppBarComplementary() {
        return this.topAppBar["&:hover"];
    }
    /* Top AppBar Text */
    , topAppBarTitle: {
        color: CommonStyle.mainColor,
        fontWeight: 600,
        flex: 8,
        "&:hover": {
            color: CommonStyle.mainComplementaryColor
        }
    }
    , navContainer: {
        marginLeft: "10%",
        marginRight: "10%",
        justifyContent: "space-between"
    }
    , navContainerForMobile: {
        justifyContent: "space-between",
    }
    , btnLink: {
        fontSize: 18,
        fontWeight: 600
    }
    , nabLink: {
        textDecoration: "none"
    }

}))


const TopAppBar = () => {

    const classes = useStyles();
    const [isScrollTop, setIsScrollTop] = useState(true);
    const [topAppBarStyle, setTopAppBarStype] = useState(classes.topAppBar);


    /**
     * @name getInnerTextColor
     * @desc 
    */
    const getInnerTextColor = useCallback(() => {
        return isScrollTop ? CommonStyle.mainColor : CommonStyle.mainComplementaryColor;
    })

    /**
     * @name handleScrollEvent
     * @desc scroll 위치 이벤트
    */
    useEffect(function handleScrollEvent() {
        let handler = (e) => {
            setIsScrollTop(window.scrollY < 1);
        }
        window.addEventListener("scroll", handler);
        return () => {
            window.removeEventListener("scroll", handler);
        };
    }, []);

    /**
     * @name detectScrollTop
     * @desc scroll 이 최상단이 아니면 툴바의 스타일을 변경한다.
    */
    useEffect(function detectScrollTop(){
        if (isScrollTop) {
            setTopAppBarStype(classes.topAppBar);
        } else {
            setTopAppBarStype(classes.topAppBarComplementary);
        }
    }, [isScrollTop]);

    return (
        <React.Fragment>
            <AppBar position="static" className={topAppBarStyle} position="fixed" onMouseOver={() => setIsScrollTop(false)} onMouseLeave={() => setIsScrollTop(window.scrollY == 0)}>
                <div >
                    <Toolbar className={isMobile?classes.navContainerForMobile:classes.navContainer}>
                        
                        {/***************** Logo *****************/}
                        <div>
                            <Link to="/edit" className={classes.nabLink}>
                                <Typography className={classes.topAppBarTitle} style={{ color: getInnerTextColor() }} variant={isMobile?"h6":"h5"}>
                                    TOM's Story
                                </Typography>
                                <div className={classes.topAppBarTitle} style={{ color: getInnerTextColor(), fontSize:(isMobile?14:20) }}>
                                    지식 저장소
                                </div>
                            </Link>
                        </div>

                        {/***************** Links *****************/}
                        <div>
                            <Link to="/intro" className={classes.nabLink}>
                                <Button className={classes.btnLink} style={{ color: CommonStyle.mainBoldColor }}>INTRO</Button>
                            </Link>
                            <span style={{ color: getInnerTextColor() }}>|</span>
                            <Link to="/blogs/3" className={classes.nabLink}>
                                <Button className={classes.btnLink} style={{ color: CommonStyle.mainBoldColor }}>BLOG</Button>
                            </Link>
                        </div>
                    </Toolbar>
                </div>
            </AppBar>
            <div className={classes.offset} />
        </React.Fragment>
    )
}
export default TopAppBar;