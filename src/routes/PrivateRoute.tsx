import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Navigate, Outlet } from "react-router-dom";
import { NAVIGATION_SCREENS } from "../utils/NavigationScreens";

export const PrivateRoute = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  if (!accessToken) {
    return <Navigate to={NAVIGATION_SCREENS.LOGIN_SCREEN} replace />;
  }
  return <Outlet />;
};
