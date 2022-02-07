const { createContext, useState, useEffect } = require("react");

export const QueryContext = createContext();

const QueryContextProvider = (props) => {
  const [orders, setOrders] = useState([]);
  const [requery, setRequery] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [states, setStates] = useState([
    "Nová",
    "Hotová",
    "Aktivní",
    "Zrušená",
  ]);

  const [dateRange, setDateRange] = useState([null, null]);

  return (
    <QueryContext.Provider
      value={{
        orders,
        setOrders,
        states,
        setStates,
        currentOffset,
        setCurrentOffset,
        dateRange,
        setDateRange,
        loggedIn,
        setLoggedIn,
        requery,
        setRequery,
      }}
    >
      {props.children}
    </QueryContext.Provider>
  );
};

export default QueryContextProvider;
