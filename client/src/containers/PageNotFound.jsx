import { Link } from "react-router-dom";

const PageNotFound = (props) => (
    <div>
        <h1>404 PAGE NOT FOUND</h1>
        <p>Uy, llegaste a un mundo desconocido. Mejor regresa al inicio.</p>
        <button onClick={props.toggle}>TOGGLE</button>
        {/* <Link to='/home'><button>Regresar</button></Link> */}
    </div>
);

export default PageNotFound;