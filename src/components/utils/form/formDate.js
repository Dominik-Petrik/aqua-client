import { DatePicker } from "antd";
import React, { useState, useContext } from "react";
import { FormContext } from "../../../context/formContext";
import moment from "moment";
import czLocale from "../../../helperFiles/locale";

function FormDate() {
  const { setFieldValue, formValues } = useContext(FormContext);
  return (
    <DatePicker
      placeholder="datum narození"
      format={"L"}
      value={
        formValues.birthdate
          ? moment(formValues.birthdate)
          : formValues.birthdate
      }
      locale={czLocale}
      onChange={(e) => {
        setFieldValue("birthdate", e);
      }}
    />
  );
}

export default FormDate;
