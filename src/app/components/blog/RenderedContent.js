
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Grid, Hidden, Paper, Divider } from '@material-ui/core';
import CommonStyle from '../../styles/CommonStyle';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Comment from "../../containers/Comment"
import Title from './Title';
import useDeviceDetect from '../../hooks/useDeviceDetect';


const useStyles = makeStyles((theme) => ({
    contentPaper: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
    }
}));

/**
 * @name renderers
 * @desc 마크다운 내 코드에 하이라이트 적용
*/
const renderers = {
    code: ({ language, value }) => {
        return <SyntaxHighlighter style={dracula} language={language} children={value} />
    }
}

const RenderedContent = ({ content, type }) => {
    const { isMobile } = useDeviceDetect();
    const classes = useStyles({ isMobile });

    return (
        <Paper elevation={2} className={classes.contentPaper}>
            <ReactMarkdown renderers={renderers} children={content} />
        </Paper>
    )
}

export default RenderedContent;