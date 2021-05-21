


import { makeStyles } from '@material-ui/core/styles';
import {
    Link, useHistory, useRouteMatch
} from "react-router-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, TextField, Typography } from '@material-ui/core';
import CommonStyle from '../../styles/CommonStyle';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import moment from "moment";
import DateUtils from '../../utils/DateUtils';
const useStyles = makeStyles(theme => ({
    cardContainer: {
        display: "flex",
        boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.2)",
        marginLeft:theme => theme.isMobile?0:20,
        marginRight:theme => theme.isMobile?0:20,
        marginTop:20,
        
        "&:hover": {
            boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.7)",
            cursor:"pointer"
        }
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




const ContentCard = ({ content }) => {
    const { isMobile } = useDeviceDetect();
    const classes = useStyles({ isMobile });

    const history = useHistory();
    const onclickCard = useCallback(() => {
        let link = `/blogs/${content.id}`;
        history.push(link);
    }, [history]);

    const renderedModifiedDate = useCallback(()=>{
        let lastModifiedAt = new Date(content.lastModifiedAt);
        return DateUtils.convertYYYY_MM_DDFrom(lastModifiedAt);
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
                    <Typography style={{fontSize:isMobile?15:25}} color={"textPrimary"}  >
                        {content.title}
                    </Typography>
                    <Typography style={{fontSize:isMobile?10:18}} variant="subtitle1" color="textSecondary">
                        {content.subTitle}
                    </Typography>
                    <Typography variant="caption" component="h2">
                        {renderedModifiedDate()}
                    </Typography>


                </CardContent>
            </div>
            
        </Card >
    )
}


export default ContentCard;