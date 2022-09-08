import { Link } from "react-router-dom";

const PageNotFound = () => (
    <div>
        <h1>PAGE NOT FOUND</h1>
        <p>Oops! Llegaste a un mundo desconocido, mejor regresa al inicio</p>
        <Link to='/home'><button>Regresar</button></Link>
    </div>
);

export default PageNotFound;