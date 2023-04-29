import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserName } from "../store/slices/user.slice";

const ProtectedRoutes = () => {
    const userName = useSelector(state => state.userName)
    const userCookie = sessionStorage.getItem('userToken')
    const dispatch = useDispatch()

    if(userName != "" || userCookie != null) {
        dispatch(setUserName(userCookie))
        return <Outlet />
    }else {
        return <Navigate to={'/'}/>
    }
};

export default ProtectedRoutes;