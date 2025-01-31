import { Navigate, Outlet } from "react-router";

const Privateroute = ({ isAuthenticated }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default Privateroute;