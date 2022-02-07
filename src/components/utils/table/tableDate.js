import { useMutation } from "@apollo/client";
import EDIT_MUTATION from "../../../queries/editMutation";
import { DatePicker } from "antd";
import { useState, useEffect } from "react";
import moment from "moment";
import czLocale from "../../../helperFiles/locale";
import "../../styles/table.css";

const TableDate = ({ id, field, value }) => {
  const [inputValue, setInputValue] = useState(value);
  const [mutateState, { data, loading, error }] = useMutation(EDIT_MUTATION);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <DatePicker
      className="datePicker"
      format={"L"}
      value={inputValue ? moment(inputValue) : inputValue}
      locale={czLocale}
      onChange={async (e) => {
        setInputValue(e);
        await mutateState({
          variables: { orderID: id, field: field, value: e.toISOString() },
        });
      }}
      style={{ width: 120 }}
      bordered={false}
      allowClear={field != "createdAt"}
      disabled={field == "createdAt"}
      /* bordered={false} */
    />
  );
};

export default TableDate;
