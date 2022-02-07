import React, { useState, useContext } from "react";
import { FormContext } from "../../../context/formContext";
import { Input } from "antd";

function FormInput({ field, label, note }) {
  const { setFieldValue, formValues } = useContext(FormContext);

  function formatNumber(value) {
    try {
      return value.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
    } catch (error) {
      console.log(error);
      return value;
    }
  }

  return note ? (
    <Input.TextArea
      value={formValues[field]}
      placeholder={label}
      onChange={(e) => setFieldValue(field, e.target.value)}
    ></Input.TextArea>
  ) : (
    <Input
      value={formValues[field]}
      placeholder={label}
      onChange={(e) =>
        field != "phone"
          ? setFieldValue(field, e.target.value)
          : setFieldValue(field, formatNumber(e.target.value))
      }
    ></Input>
  );
}

export default FormInput;
