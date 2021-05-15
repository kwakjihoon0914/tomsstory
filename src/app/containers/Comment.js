import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const useStyles = makeStyles((theme) => ({
    contentPaper: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),

    }
}));
const Comment = () =>{

    const classes = useStyles();

    return (
        <Paper elevation={2} className={classes.contentPaper}>
            {/* <FontAwesomeIcon */}
            {/* <FontAwesomeIcon icon={["fal", "coffee"]} /> */}
            <Typography variant={"h6"}>
                {/* <FontAwesomeIcon icon="coffee" /> */}
                Comment</Typography>

        </Paper>
    )
}

export default Comment;