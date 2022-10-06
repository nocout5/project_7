import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {
  let userIsHere = sessionStorage.getItem("userData");

  return userIsHere ? <Outlet /> : <Navigate to="/login" />;
}
