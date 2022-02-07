import { useMutation } from "@apollo/client";
import EDIT_MUTATION from "../../../queries/editMutation";
import { Input, Form, message } from "antd";
import { useEffect, useState } from "react";

const TableInput = ({ id, field, value }) => {
  const [mutateState, { data, loading, error }] = useMutation(EDIT_MUTATION);
  const [inputValue, setInputValue] = useState(value);
  const [toggleEdit, setToggleEdit] = useState(false);
  

  const msgFromTop = document.height - 8;

  message.config({ top: msgFromTop });
  return (
    <Form
      onClick={() => {
        if (!toggleEdit) setToggleEdit(true);
      }}
      initialValues={{
        ["name"]: value,
      }}
    >
      {value || toggleEdit ? (
        toggleEdit ? (
          <Input
            autoFocus
            style={{ backgroundColor: "transparent" }}
            bordered={toggleEdit}
            onBlur={() => {
              setToggleEdit(false);
              setInputValue(value);
            }}
            onPressEnter={async (e) => {
              await mutateState({
                variables: { orderID: id, field: field, value: e.target.value },
              });
              message.success("Položka úspěšně upravena!");
              setToggleEdit(false);
            }}
            value={inputValue}
            type="text"
            width={"100px"}
            onChange={(e) => setInputValue(e.target.value)}
            /* bordered={false} */
          ></Input>
        ) : (
          value
        )
      ) : (
        <span style={{ color: "gray", cursor: "pointer" }}>_____</span>
      )}
    </Form>
  );
};

export default TableInput;
