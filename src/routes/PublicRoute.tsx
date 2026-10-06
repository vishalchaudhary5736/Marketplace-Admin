import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Navigate, Outlet } from "react-router-dom";
import {
  getNavigationScreen,
  NAVIGATION_SCREENS,
} from "../utils/NavigationScreens";

export const PublicRoute = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const tempToken = useSelector((state: RootState) => state.auth.tempToken);
  const nextStep = useSelector((state: RootState) => state.auth.nextStep);

  if (accessToken) {
    return <Navigate to={NAVIGATION_SCREENS.DASHBOARD} replace />;
  }

  if (tempToken && nextStep) {
    return <Navigate to={getNavigationScreen(nextStep)} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
