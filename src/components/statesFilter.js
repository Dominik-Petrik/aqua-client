import { useContext, useEffect, useState } from "react";
import { Checkbox } from "antd";
import { QueryContext } from "../context/queryContext";

import React from "react";

function StatesFilter() {
  const { setStates, states } = useContext(QueryContext);
  const options = [
    { label: "Nová", value: "Nová" },
    { label: "Hotová", value: "Hotová" },
    { label: "Aktivní", value: "Aktivní" },
    { label: "Zrušená", value: "Zrušená" },
  ];

  const handleChange = (states) => {
    setStates(states);
  };

  return (
    <Checkbox.Group
      options={options}
      defaultValue={states}
      onChange={(states) => handleChange(states)}
    />
  );
}

export default StatesFilter;
