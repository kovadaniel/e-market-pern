import { Spinner } from "react-bootstrap";
import cx from "classnames";

const Loader = ({full}) => {
    return (
        <div className={cx("loader-wrap", full && "loader-wrap-full")}>
            <Spinner animation="grow" className="loader"/>
        </div>
    );
}
 
export default Loader;