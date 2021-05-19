


import { makeStyles } from '@material-ui/core/styles';
import {
    Link, useHistory, useRouteMatch
} from "react-router-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, TextField, Typography } from '@material-ui/core';

import CommonStyle from '../../styles/CommonStyle';
import useDeviceDetect from '../../hooks/useDeviceDetect';


const useStyles = makeStyles(theme => ({
    cardContainer: {
        display: "flex",
        width: "100%",
        margin: 5,
        "&:hover": {
            boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.5)",
            cursor:"pointer"
        }
    },
    cardDetails: {
        display: 'flex',
        flexDirection: 'column',
    },
    cover: {
        width: theme => theme.isMobile?100:150,
      },
}));




const ContentCard = ({ content }) => {
    const { isMobile } = useDeviceDetect();
    const classes = useStyles({ isMobile });

    const history = useHistory();
    const onclickCard = useCallback(() => {
        let link = `/blogs/${content.id}`;
        history.push(link);
    }, [history]);

    const renderedModifiedDate = useCallback(()=>{
        let date = new Date(content.lastModifiedAt);
        console.log(date)
        return date+"";
    },[content])

    return (
        <Card className={classes.cardContainer} key={content.id} onClick={onclickCard}>
             <CardMedia
                className={classes.cover}
                image={"../../images/"+content.menu+".png"}
                title=""
            />
            <div className={classes.cardDetails}>
           
                <CardContent>
                    <Typography variant="overline" color="textSecondary">
                        {content.menu}
                    </Typography>
                    <Typography color={"textPrimary"} component="h5" variant="h5">
                        {content.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {content.subTitle}
                    </Typography>
                    <Typography align="right" variant="caption" component="h2">
                        {renderedModifiedDate()}
                    </Typography>


                </CardContent>
            </div>
            
        </Card >
    )
}


export default ContentCard;