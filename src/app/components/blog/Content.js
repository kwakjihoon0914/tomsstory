
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

import Comment from "../../containers/Comment"
import Title from './Title';
import RenderedContent from './RenderedContent';


const useStyles = makeStyles((theme) => ({

    contentContainer: {
        width:"100%",
        overflow: "auto",
        backgroundColor: "#f6faf5"
    },

}));



const Content = ({ content }) => {
    const classes = useStyles();


    return (
        <div className={classes.contentContainer}>
            {content 
                ?(
                    <div>
                        <Title {...content} />
                        <Divider />
                        <RenderedContent type={"md"} content={content.text}  /> 
                      <Comment type={"blog"} requestId={content.id}/>
                    </div>
                )
               :(
                    <Title {...{title:"준비중",subTitle:"-",createdBy:"Kwak ji hoon",createdAt:"-"}} />
                )
            }
        </div>
    )
}


export default Content;