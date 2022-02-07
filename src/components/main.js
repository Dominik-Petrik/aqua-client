import React, { useContext } from "react";
import { QueryContext } from "../context/queryContext";
import ControlBar from "./controlBar";
import LoginPage from "./loginPage";
import Orders from "./orders";

function Main() {
  const { loggedIn } = useContext(QueryContext);

  if (!loggedIn) {
    return <LoginPage />;
  }
  return (
    <React.Fragment>
      <ControlBar></ControlBar>
      <Orders></Orders>
    </React.Fragment>
  );
}
export default Main;
