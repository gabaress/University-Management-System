import { Outlet, Link } from "react-router-dom";

export default function Container(){
    return (
        <div>
            <nav>
                <Link to="/">Home</Link> |
                <Link to="/secondpage"> Second page</Link> |
                <Link to="/genre"> Genre</Link> |
                <Link to="/review"> Review</Link>
            </nav>
            <div id="container">
                <Outlet />
            </div>
        </div>
    );
}