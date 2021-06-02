

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

import { isMobile } from "react-device-detect";
import CommonConfig from '../config/CommonConfig';

import { FaSearchPlus } from 'react-icons/fa';
import useDeviceDetect from '../hooks/useDeviceDetect';
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
    // for access inner property
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
    , toolbarContainer: {
        marginLeft: "10%",
        marginRight: "10%",
        justifyContent: "space-between"
    }
    , toolbarContainerForMobile: {
      
        justifyContent: "space-between"
    }
    , navContainer: {
        flexDirection: "row"
    }
    , btnLink: {
        fontSize: 18,
        fontWeight: 600
    }
    , nabLink: {
        textDecoration: "none"
    }
    ,

}))


const TopAppBar = () => {

    const classes = useStyles();
    const [isScrollTop, setIsScrollTop] = useState(true);
    const [topAppBarStyle, setTopAppBarStype] = useState(classes.topAppBar);
    const { isMobile } = useDeviceDetect();

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
    useEffect(function detectScrollTop() {
        if (isScrollTop) {
            setTopAppBarStype(classes.topAppBar);
        } else {
            setTopAppBarStype(classes.topAppBarComplementary);
        }
    }, [isScrollTop]);

    return (
        <React.Fragment>
            <AppBar position="static" className={topAppBarStyle} position="fixed" onMouseOver={() => setIsScrollTop(false)} onMouseLeave={() => setIsScrollTop(window.scrollY == 0)}>
                <div className={classes.navContainer}>
                    <Toolbar className={isMobile ? classes.toolbarContainerForMobile : classes.toolbarContainer}>

                        {/***************** Logo *****************/}
                        <div>
                            <Link to="/intro" className={classes.nabLink}>
                                <Typography className={classes.topAppBarTitle} style={{ color: getInnerTextColor() }} variant={isMobile ? "h6" : "h5"}>
                                    {CommonConfig.APP_NAME}
                                </Typography>
                                {!isMobile &&
                                    <Typography className={classes.topAppBarTitle} style={{ color: getInnerTextColor(), fontSize: (isMobile ? 14 : 20) }}>
                                        지식 저장소
                                    </Typography>
                                }
                            </Link>
                        </div>

                        {/***************** Links *****************/}
                        <div>
                            <Link to="/intro" className={classes.nabLink}>
                                <Button className={classes.btnLink} style={{ color: CommonStyle.mainBoldColor, fontSize: (isMobile ? 16 : 20) }}>Intro</Button>
                            </Link>
                            <span style={{ color: getInnerTextColor() }}>|</span>
                            <Link to="/blogs" className={classes.nabLink}>
                                <Button className={classes.btnLink} style={{ color: CommonStyle.mainBoldColor, fontSize: (isMobile ? 16 : 20) }}>Blog</Button>
                            </Link>
                            <span style={{ color: getInnerTextColor() }}>|</span>
                            <a href="https://github.com/kwakjihoon0914" target="_blank" className={classes.nabLink}>
                                {/* prevent hash router */}
                                <Button className={classes.btnLink} style={{ color: CommonStyle.mainBoldColor, fontSize: (isMobile ? 16 : 20) }}>Git</Button>
                            </a>

                        </div>
                    </Toolbar>
                </div>
            </AppBar>
            <div className={classes.offset} />
        </React.Fragment>
    )
}
export default TopAppBar;