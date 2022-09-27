import { Link, useHistory } from "react-router-dom";
import errorPikachu from "../images/404-error-pokegif.gif"

const PageNotFound = (props) => {
    const history = useHistory()

    return (
        <div style={{color:"#fff"}}>
            <img style={{maxWidth:"40vh"}} src={errorPikachu} alt="errorImage" />
            <h1>404 PAGE NOT FOUND</h1>
            <p>Ooops, you seem to be lost,  <br/> shall we go back home?</p>
            <button onClick={()=>history.replace('/home')}>HOME</button>
            {/* <Link to='/home'><button>Regresar</button></Link> */}
        </div>
    );
}


export default PageNotFound;