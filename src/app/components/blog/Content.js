
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

import Comment from "../../containers/Comment"
import Title from './Title';
import RenderedContent from './RenderedContent';


const useStyles = makeStyles((theme) => ({

    contentContainer: {
        overflow: "auto",
        //marginLeft:5,
        backgroundColor: "#f6faf5"
        //marginRight:5
    },

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


const Content = ({ content, contentWidth }) => {
    const classes = useStyles();


    return (
        <div className={classes.contentContainer} style={{ widht: contentWidth }}>
            {content ?
                <div>
                    <Title {...content} />
                    <Divider />
                    <RenderedContent type={"md"} content={content.text}  /> 
                    <Comment type={"blog"} requestId={content.id}/>
                </div>
            :   <Title {...{title:"준비중",subTitle:"-",createdAt:"Kwak ji hoon"}} />
            }
            
        </div>
    )
}


export default Content;