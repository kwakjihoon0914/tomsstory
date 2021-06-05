


import { makeStyles } from '@material-ui/core/styles';
import {
    Link, useHistory, useRouteMatch
} from "react-router-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, TextField, Typography } from '@material-ui/core';
import useDeviceDetect from '../../hooks/useDeviceDetect';
const useStyles = makeStyles(theme => ({
    cardContainer: {
        display: "flex",
        boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.2)",
        marginTop:20,
        "&:hover": {
            boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.7)",
            cursor:"pointer"
        }
    },
    fake:{
        backgroundColor:"#e8e8e8",color:"#e8e8e8",margin:5
    },
    cardDetails: {
        flexDirection: 'column',
    },
    innerTitle:{
        
    },
    cover: {
        width: theme => theme.isMobile?100:180,
    },
}));


const FakeCard = ({ content }) => {

    const { isMobile } = useDeviceDetect();
    const classes = useStyles({ isMobile });

    const history = useHistory();
    const cardClickHandler = useCallback(() => {
       
    }, [history]);

    return (
        <Card className={classes.cardContainer} onClick={cardClickHandler}>
             <CardMedia
                className={classes.cover}
                image={"../../images/loading.gif"}
                title="loading"
            />
            <div className={classes.cardDetails}>
                <CardContent>
                    <Typography variant="overline" color="textSecondary" >
                    <span className={classes.fake} >{"---------"}</span>
                    </Typography>
                    <Typography style={{fontSize:isMobile?15:25}} color={"textPrimary"} >
                        <span className={classes.fake} >{"--------------------"}</span>
                    </Typography>
                    <Typography style={{fontSize:isMobile?10:18}} variant="subtitle1" color="textSecondary">
                        <span className={classes.fake} >{"--------------------------------------"}</span>
                    </Typography>
                    <Typography variant="caption" component="h2">
                        <span className={classes.fake} >{"-------------"}</span>
                    </Typography>
                </CardContent>
            </div>
        </Card >
    )
}


export default FakeCard;