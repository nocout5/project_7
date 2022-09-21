import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  let token = 0;
  if (userData != null) {
    token = userData.token;
  }
  return token ? <Outlet /> : <Navigate to="/login" />;
}
