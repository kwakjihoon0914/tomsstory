

import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from "react";
import { useState } from 'react';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    editorContainer:{
        padding:20
        
    }
}))

const Editor = () => {
    const classes = useStyles();
    const [value, setValue] = useState("**Hello world!!!**");

    useEffect(()=>{
        console.log(value)


        alert(1)
    },[value])

    return (
        <div className={classes.editorContainer}>
            <Grid container spacing={1}>
                <Grid item md={6}>
                    
                </Grid>
                <Grid item md={6}>
                    
                </Grid>
            </Grid>
        </div>
    )
}

export default Editor;