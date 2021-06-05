


import { makeStyles } from '@material-ui/core/styles';
import {
    Link, useHistory, useRouteMatch
} from "react-router-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Collapse, Divider, Grid, IconButton, InputAdornment, TextField, Typography, Zoom } from '@material-ui/core';
import CommonStyle from '../../styles/CommonStyle';
import { FaBook, FaList, FaSearch } from 'react-icons/fa';

import { BsGridFill } from 'react-icons/bs';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const useStyles = makeStyles(theme => ({
    root: { backgroundColor: "rgb(40, 42, 54)", width: "100%", height: 180 },
    titleWrapper: { justifyContent: "center", display: "flex", marginTop: 40 },
    btnGroup: { justifyContent: "center", display: "flex", marginTop: 10 },
    searchBarContainer: {
        width: "40ch",
        margin: theme.spacing(1)
    }
}));

const SearchBar = ({queryText }) => {
    const { isMobile } = useDeviceDetect();
    const classes = useStyles({ isMobile });
    const [searchText,setSearchText] = useState(queryText?queryText:"");
    const history = useHistory();

    const handleSubmit = (e) => {
        if(e)e.preventDefault();
        let link = `/blogs?title=${searchText}`;
        history.push(link);
    }
    return (
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField 
                value={searchText} 
                onChange={(e)=>setSearchText(e.target.value)} 
                InputProps={{endAdornment: 
                    <Link><FaSearch  color={"grey"} style={{margin:2}} onClick={handleSubmit} size={25}/></Link>}}
                className={classes.searchBarContainer} label="검색" />
        </form>
    );
}

const Title = ({ queryText,location }) => {
    const classes = useStyles();
    const [searchBarActivate, setSearchBarActivate] = useState(false);
    const toggleSearchBar = (e) => {
        setSearchBarActivate(!searchBarActivate);
        if (searchBarActivate) {
            e.target.focus();
        }
    }
    
    return (
        <>
            <Grid className={classes.root}>

                <div className={classes.titleWrapper}>
                    <Typography variant="h5" style={{ color: "white", fontWeight: "600" }}>
                        <span style={{ fontSize: "150%" }}>Tom</span>'s 
                        <span style={{ fontSize: "150%" }}> Notepad</span>
                    </Typography>
                </div>

                <Grid className={classes.btnGroup}>
                    <div style={{ margin: 10 }}>
                        <IconButton onClick={toggleSearchBar}>
                            <FaSearch size={30} color={CommonStyle.mainColor} />
                        </IconButton>
                    </div>
                    <div style={{ margin: 10 }}>
                        <IconButton>
                            <BsGridFill size={30} color={CommonStyle.mainColor} />
                        </IconButton>
                    </div>
                </Grid>

            </Grid>
            <Collapse  in={searchBarActivate}>
            <Zoom in={searchBarActivate}>
                <Grid style={{ justifyContent: "center", display: "flex" }}>
                    <SearchBar queryText={queryText}/>
                </Grid>
            </Zoom>
            </Collapse>
        </>

    )
}

export default Title;