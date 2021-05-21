import { makeStyles } from '@material-ui/core/styles';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import ContentCard from './CotentCard';


const useStyles = makeStyles(theme => ({

}));

const ContentCardList = ({ contentList }) => {
    
    const { isMobile } = useDeviceDetect();
    const classes = useStyles({ isMobile });

    return (
        <div>
            {contentList.map(content => {
                return <ContentCard key={content.id} content={content} />
            })}
        </div>
    )
}


export default ContentCardList;