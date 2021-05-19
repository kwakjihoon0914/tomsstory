import { makeStyles } from '@material-ui/core/styles';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import ContentCard from './CotentCard';


const useStyles = makeStyles(theme => ({

}));

const ContentCardList = ({ contentList }) => {
    const { isMobile } = useDeviceDetect();
    const classes = useStyles({ isMobile });

    return (
        <>
            {contentList.map(content => {
                return <ContentCard key={content.id} content={content} />
            })}
        </>
    )
}


export default ContentCardList;