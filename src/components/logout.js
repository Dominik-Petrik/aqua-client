import React, { useContext } from "react";
import { Card } from "antd";
import { useMutation } from "@apollo/client";
import DELETE_SESSION from "../queries/deleteSession";
import getCookie from "./functions/login/getCookie";
import deleteCookie from "./functions/login/deleteCookie";
import { QueryContext } from "../context/queryContext";

function Logout() {
  const [deleteSession] = useMutation(DELETE_SESSION);
  const { setLoggedIn } = useContext(QueryContext);
  return (
    <Card
      title="Jste trvale přihlášeni"
      size="small"
      style={{ textAlign: "right", backgroundColor: "#dff3f6" }}
    >
      <a
        onClick={() => {
          const cookie = getCookie("kyif53484fse");
          deleteSession({ variables: { key: cookie } });
          deleteCookie("kyif53484fse");
          setLoggedIn(false);
        }}
      >
        Odhlásit
      </a>
    </Card>
  );
}

export default Logout;
