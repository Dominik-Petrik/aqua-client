import { Select } from "antd";
import selectOptions from "../../../helperFiles/selectOptions";
import React, { useState, useContext, useRef } from "react";
import { FormContext } from "../../../context/formContext";

function FormSelect() {
  const { setFieldValue, formValues } = useContext(FormContext);
  const [input, setInput] = useState("Krčmářová");
  const ref = useRef(null);

  const handleSelect = (value) => {
    setFieldValue("createdBy", value);
  };

  return (
    <Select
      ref={ref}
      onSelect={(value) => {
        setInput(value);
        handleSelect(value);
      }}
      value={input}
      onClear={() => {
        setInput(null);
        handleSelect(null);
      }}
      options={selectOptions.personOptions}
      placeholder={"Vyberte"}
      allowClear
    >
      {" "}
    </Select>
  );
}

export default FormSelect;
