
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Collapse, createMuiTheme, Grid, IconButton, TextField, ThemeProvider, Typography, Zoom } from '@material-ui/core';
import CommonStyle from '../../styles/CommonStyle';
import useDeviceDetect from '../../hooks/useDeviceDetect';

import { FaJava, FaDatabase, FaChrome, FaReact, FaServer, FaHome, FaSearchPlus, FaList } from 'react-icons/fa';
import { IoLogoJavascript, IoCodeSlashOutline } from "react-icons/io5";
import { SiSpring, SiApachemaven } from "react-icons/si";

import { FaBook, FaSearch } from 'react-icons/fa';
import { AiOutlineFileSearch } from 'react-icons/ai';

import { BsGridFill } from 'react-icons/bs';
import { useHistory } from 'react-router';
import DateUtils from '../../utils/DateUtils';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    titleContainer: {
        height: 180
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
    btnGroup: { justifyContent: "center", display: "flex", marginTop: 10 },
    searchBarContainer: {
        width: "40ch",
        margin: theme.spacing(1)
    }

}));

const SearchBar = ({}) => {
    const { isMobile } = useDeviceDetect();
    const classes = useStyles({ isMobile });
    const [searchText,setSearchText] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        if (e)e.preventDefault();
        let link = `/blogs?title=${searchText}`;
        history.push(link);
    }
    
    return (
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField value={searchText} 
                    onChange={(e)=>setSearchText(e.target.value)} 
                    className={classes.searchBarContainer} 
                    InputProps={{endAdornment: 
                        <Link><FaSearch  color={"grey"} style={{margin:2}} onClick={handleSubmit} size={25}/></Link>}}
                    label="검색" />
        </form>
    );
}

const Title = ({ title, subTitle, createdBy, createdAt,lastModifiedAt }) => {
    const { isMobile } = useDeviceDetect();
    const classes = useStyles({ isMobile });
    const [searchBarActivate, setSearchBarActivate] = useState(false);
    const history = useHistory();
    
    const goBlogList = useCallback(() => {
        let link = `/blogs`;
        history.push(link);
    }, [history]);
    
    const toggleSearchBar = (e) => {
        setSearchBarActivate(!searchBarActivate);
        if (searchBarActivate) {
            e.target.focus();
        }
    }
   
    const titleTheme = createMuiTheme({
        typography: {
            h3: {
                fontSize: isMobile ? 18 : 27,
            },
            h6: {
                fontSize: isMobile ? 15 : 23,
                margin: 5
            },
            subtitle1: {
                fontSize: isMobile ? 12 : 15,
            },
        },
    });


    const renderedModifiedDate = useCallback(()=>{
        let mdfDate = new Date(lastModifiedAt);
        return DateUtils.convertYYYY_MM_DDFrom(mdfDate);
    },[lastModifiedAt])

    return (
        <ThemeProvider theme={titleTheme}>
            <div className={classes.titleContainer}>
                <Typography className={classes.subTitleText} variant="h3">
                    {title}
                </Typography>
                <Typography className={classes.subTitleText} variant="h6">
                    {subTitle}
                </Typography>
                <Typography className={classes.createdInfoText} variant="subtitle1">
                    By. {createdBy} - {renderedModifiedDate()}
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
                <div style={{ margin: 10 }}>
                    <IconButton onClick={goBlogList}>
                        <FaList size={30} color={CommonStyle.mainColor} />
                    </IconButton>
                </div>
            </Grid>

            <div>
                <Collapse in={searchBarActivate}>
                    <Zoom in={searchBarActivate}>
                        <Grid style={{ justifyContent: "center", display: "flex" }}>
                            <SearchBar />
                        </Grid>
                    </Zoom>
                </Collapse>
            </div>

            {/* <UnderNavBar /> */}
        </ThemeProvider>
    )
}

export default Title;