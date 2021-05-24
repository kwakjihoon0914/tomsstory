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
           <h3>
               준비중 입니다.  <Link to="/blogs">블로그로 돌아가기</Link>
           </h3>
        </Paper>
    )
}

export default Resume;