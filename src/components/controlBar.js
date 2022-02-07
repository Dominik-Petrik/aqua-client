import { Row, Col, Space, Card } from "antd";
import React from "react";
import SearchField from "./searchField";
import AddUserButton from "./addOrderButton";
import StatesFilter from "./statesFilter";
import "./styles/controlBar.css";
import FormContextProvider from "../context/formContext";
import CreatedAtFilter from "./createdAtFilter";
import Logout from "./logout";
import getCookie from "./functions/login/getCookie";
function ControlBar() {
  return (
    <div className="controlBar">
      <div className="search-div">
        <SearchField />
      </div>

      <div className="filters-div">
        <div>
          <CreatedAtFilter />
          <StatesFilter />
        </div>
      </div>

      <div className="neworder-div">
        <FormContextProvider>
          <AddUserButton />
        </FormContextProvider>
      </div>
      {getCookie("kyif53484fse") ? (
        <div className="logout-div">
          <Logout />
        </div>
      ) : null}
    </div>
  );
}

export default ControlBar;
