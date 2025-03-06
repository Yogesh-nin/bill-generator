import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import { RootState } from "./redux/store";

const ProtectedRoute = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    console.log(isAuthenticated)
    const navigate = useNavigate();

    useEffect(() => {

        if(!isAuthenticated) navigate('/login')
        
    }, [isAuthenticated])

    return <Layout>
<Outlet /> 
    </Layout> 
};

export default ProtectedRoute;