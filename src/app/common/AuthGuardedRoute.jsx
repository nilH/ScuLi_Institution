import React,{useEffect} from "react";
import {  Route } from "react-router";
import {useHistory} from "react-router-dom";

export default function AuthGuardedRoute({
  redirectTo = "/login",
  ...rest
}) {
  const history = useHistory();
  useEffect(() => {
    sessionStorage.getItem("login")??history.push("/login")
    return () => {};
  }, [history]);

  
  return <Route {...rest} />;
}
