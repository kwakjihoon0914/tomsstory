import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
   
}));
const Resume = () =>{

    const classes = useStyles();
    useEffect(()=>{
        
    })
    return (
        <Paper elevation={2} >
           <Link to="/blogs">#</Link>
        </Paper>
    )
}

export default Resume;