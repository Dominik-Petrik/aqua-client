import logo from "./logo.svg";
import "./App.css";
import QueryContextProvider from "./context/queryContext";
import Orders from "./components/orders";
import SearchField from "./components/searchField";
import ControlBar from "./components/controlBar";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Main from "./components/main";

Spin.setDefaultIndicator(<LoadingOutlined />);

function App() {
  return (
    <QueryContextProvider>
      <div className="App">
        <Main />
      </div>
    </QueryContextProvider>
  );
}

export default App;
