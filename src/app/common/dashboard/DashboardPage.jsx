import React, { useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DashboardPage({ children }) {
  const { logout } = useSelector((state) => state.auth);
  const history = useHistory();
  useEffect(() => {
    logout && history.push("/login");
    return () => {};
  }, [logout,history]);

  return (
    <>
      <div
        style={{
          height: "100vh",
          paddingTop: "0em",
        }}
      >
        <div className="dashboard-header">
          <DashboardHeader />
        </div>
        <div className="dashboard-content">{children}</div>
      </div>
    </>
  );
}
