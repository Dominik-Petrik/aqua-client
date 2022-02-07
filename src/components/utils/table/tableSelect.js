import { useMutation } from "@apollo/client";
import { Select } from "antd";
import selectOptions from "../../../helperFiles/selectOptions";
import React, { useEffect, useState } from "react";
import EDIT_MUTATION from "../../../queries/editMutation";

const TableSelect = ({ id, field, value }) => {
  const [mutateState, { data, loading, error }] = useMutation(EDIT_MUTATION);
  const [inputValue, setInputValue] = useState(value);
  let options = [];
  let allowClear = false;
  switch (field) {
    case "state":
      options = selectOptions.statesOptions;
      break;
    case "finishedBy":
      options = selectOptions.personOptions;
      allowClear = true;
    default:
      break;
  }

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleUpdate = async (newValue) => {
    setInputValue(newValue);
    await mutateState({
      variables: { orderID: id, field: field, value: newValue },
    });
  };

  return (
    <Select
      defaultActiveFirstOption={false}
      placeholder={"Vyberte"}
      onClear={() => {
        setInputValue(null);
        handleUpdate(null);
      }}
      value={inputValue}
      bordered={false}
      allowClear={allowClear}
      options={options}
      onSelect={async (newValue) => await handleUpdate(newValue)}
    />
  );
};

export default TableSelect;
