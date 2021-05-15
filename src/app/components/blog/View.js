
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Grid, Hidden, Paper, Divider } from '@material-ui/core';
import CommonStyle from '../../styles/CommonStyle';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Comment from "../../containers/Comment"


const useStyles = makeStyles((theme) => ({

    viewContainer: {
        overflow: "auto",
        //marginLeft:5,
        backgroundColor: "#f6faf5"
        //marginRight:5
    },
    subTitleContainer: {
        height: 200
        , backgroundColor: "rgb(40, 42, 54)"//CommonStyle.mainColor
    },
    subTitleText: {
        textAlign: "center",
        position: "relative",
        top: "calc(50% - 40px)",
        color: CommonStyle.mainComplementaryColor
    },
    contentPaper: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),

    }
}));



const markdown = `A paragraph with *emphasis* and **strong importance**.
 
> A block quote with ~strikethrough~ and a URL: https://reactjs.org.
 
* Lists
* [ ] todo
* [x] done
 
A table:
 
| a | b |
| - | - |



# Java is Gool!


~~~java
  public static void main(String args){
      System.out.println("Hellow World");

      //test
  }
~~~


> A block quote with ~strikethrough~ and a URL: https://reactjs.org.
 
* Lists
* [ ] todo
* [x] done
 
A table:
 
| a | b |
| - | - |


> A block quote with ~strikethrough~ and a URL: https://reactjs.org.
 
* Lists
* [ ] todo
* [x] done
 
A table:
 
| a | b |
| - | - |


> A block quote with ~strikethrough~ and a URL: https://reactjs.org.
 
* Lists
* [ ] todo
* [x] done
 
A table:
 
| a | b |
| - | - |

`


/**
 * @name renderers
 * @desc 마크다운 내 코드에 하이라이트 적용
*/
const renderers = {
    code: ({ language, value }) => {
        return <SyntaxHighlighter style={dracula} language={language} children={value} />
    }
}
const View = ({ contentId, contentWidth }) => {
    const classes = useStyles();

    return (
        <div className={classes.viewContainer} style={{ widht: contentWidth }}>
            <div className={classes.subTitleContainer}>
                <Typography className={classes.subTitleText} variant="h4">
                    Sub Title {contentId}
                </Typography>
                <Typography className={classes.subTitleText} variant="h5">
                    Sub title2
                </Typography>
            </div>
            <Divider />
            <Paper elevation={2} className={classes.contentPaper}>
                <ReactMarkdown renderers={renderers} children={markdown} />
            </Paper>

            <Comment type={"blog"} requestId={contentId}/>
        </div>
    )
}


export default View;