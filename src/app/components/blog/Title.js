
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createMuiTheme, ThemeProvider, Typography } from '@material-ui/core';
import CommonStyle from '../../styles/CommonStyle';
import useDeviceDetect from '../../hooks/useDeviceDetect';


const useStyles = makeStyles((theme) => ({
    subTitleContainer: {
        height: 230
        , backgroundColor: "rgb(40, 42, 54)"//CommonStyle.mainColor
    },
    subTitleText: {
        textAlign: "center",
        position: "relative",
        top: "calc(40% - 40px)",
        color: CommonStyle.mainComplementaryColor,
        
    },
    createdInfoText: {
        textAlign: "center",
        position: "relative",
        top: "calc(40% - 20px)",
        color: CommonStyle.mainColor
    },

}));


const Title = ({ title, subTitle, createdBy, createdAt }) => {
    const {isMobile} = useDeviceDetect();
    const classes = useStyles({ isMobile });
    const titleTheme = createMuiTheme({
        typography: {
            h3:{
                fontSize: isMobile? 18:27,
            },
            h6:{
                fontSize: isMobile? 15:23,
                margin:5
            },
            subtitle1: {
                fontSize: isMobile? 12:15,
            },
        },

    });
   
    return (
        <ThemeProvider theme={titleTheme}>
            <div className={classes.subTitleContainer}>
                <Typography className={classes.subTitleText} variant="h3">
                    {title}
                </Typography>
                <Typography className={classes.subTitleText} variant="h6">
                    {subTitle}
                </Typography>
                <Typography className={classes.createdInfoText} variant="subtitle1">
                    By. {createdBy} - {createdAt}
                </Typography>
            </div>
        </ThemeProvider>
    )
}

export default Title;