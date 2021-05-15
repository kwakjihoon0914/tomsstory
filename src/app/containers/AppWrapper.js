import { useEffect } from "react"
import { useRouteMatch, withRouter } from "react-router-dom";

const AppWrapper = ({ children }) => {

    let match = useRouteMatch();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [match])

    return <>{children}</>;
}
export default withRouter(AppWrapper);
