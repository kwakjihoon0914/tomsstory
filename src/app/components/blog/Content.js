
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid } from '@material-ui/core';

import Comment from "../../containers/Comment"
import Title from './Title';
import RenderedContent from './RenderedContent';
import useDeviceDetect from '../../hooks/useDeviceDetect';


const useStyles = makeStyles((theme) => ({

    contentContainer: {
        width: "100%",
        overflow: "auto",
        backgroundColor: "#f6faf5",

    },
    wrapper: {
        justifyContent: "center",
        flexDirection: "row"
    }
}));



const Content = ({ content }) => {
    const classes = useStyles();
    const { isMobile } = useDeviceDetect();
    return (
        <Grid className={classes.contentContainer}>
            {content
                ? (
                    <div>
                        <Title {...content} />
                        <Grid container className={classes.wrapper} >
                            <Grid item xs={isMobile ? 12 : 10}>
                                <RenderedContent type={"md"} content={content.text} />
                                <Comment type={"blog"} requestId={content.id} />
                            </Grid>
                        </Grid>
                    </div>
                )
                : (
                    <Title {...{ title: "준비중", subTitle: "-", createdBy: "Kwak ji hoon", createdAt: "-" }} />
                )
            }
        </Grid>
    )
}


export default Content;