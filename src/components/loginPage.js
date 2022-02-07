import React, { useContext, useEffect, useState } from "react";
import { QueryContext } from "../context/queryContext";
import { Button, Input, Switch, Alert } from "antd";
import "./styles/login.css";
import { useMutation, useLazyQuery } from "@apollo/client";
import CREATE_SESSION from "../queries/createSession";
import AUTH_SESSION from "../queries/authSession";
import getCookie from "./functions/login/getCookie";
import { LoadingOutlined } from "@ant-design/icons";
import LOGIN_QUERY from "../queries/loginQuery";

function LoginPage() {
  const { loggedIn, setLoggedIn } = useContext(QueryContext);
  const [inputValue, setInputValue] = useState("");
  const [switchValue, setSwitchValue] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [createSession] = useMutation(CREATE_SESSION, {
    onCompleted: (data) => {
      document.cookie = `kyif53484fse = ${data.createSession.key}; path="/";expires=Thu, 18 Dec 2030 12:00:00 UTC`;
    },
  });
  const [authSession, { loading }] = useLazyQuery(AUTH_SESSION, {
    onCompleted: (data) => {
      if (!loading) {
        setLoggedIn(data.authSession);
      }
    },
    fetchPolicy: "network-only",
  });
  const [authPassword, { loading: loadingPassword }] = useLazyQuery(
    LOGIN_QUERY,
    {
      onCompleted: (data) => {
        setShowAlert(!data.login);
        if (data.login && switchValue && !getCookie("kyif53484fse")) {
          createSession();
        }
        setLoggedIn(data.login);
      },
      fetchPolicy: "no-cache",
    }
  );

  const [showLoginForm] = useState(!loading);

  useEffect(() => {
    const key = getCookie("kyif53484fse");
    if (key) {
      authSession({ variables: { key: key } });
    }
  }, []);

  return showLoginForm ? (
    <div className="login-wrapper">
      <h2> Zadejte heslo prosím </h2>
      <Input.Password
        onChange={(e) => setInputValue(e.target.value)}
        style={{ width: "80%" }}
        placeholder="Zadejte heslo"
        onPressEnter={() => {
          authPassword({ variables: { password: inputValue } });
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "40%",
        }}
      >
        <Switch
          checked={switchValue}
          onChange={(value) => setSwitchValue(value)}
        />
        <p> Zapamatuj si mě </p>
      </div>
      <Button
        type="primary"
        style={{ width: "200px" }}
        size="large"
        onClick={() => {
          authPassword({ variables: { password: inputValue } });
        }}
      >
        Přihlásit
      </Button>

      <div className="message-wrapper">
        {showAlert ? (
          <Alert
            showIcon
            message="Přihlášení se nezdařilo"
            type="error"
            style={{ width: "100%", height: "100%" }}
          />
        ) : null}
      </div>
    </div>
  ) : (
    <LoadingOutlined />
  );
}

export default LoginPage;
