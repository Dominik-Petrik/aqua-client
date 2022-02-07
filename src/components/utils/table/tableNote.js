import { useMutation } from "@apollo/client";
import EDIT_MUTATION from "../../../queries/editMutation";
import { Input, Form, Popover, Button } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

import React from "react";

function TableNote({ id, field, value }) {
  if (value == null) value = "";
  const [mutateState, { data, loading, error }] = useMutation(EDIT_MUTATION);
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteViewOpen, setNoteViewOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const shortenedValue = () => {
    if (value && value.length > 25) {
      return value.substring(0, 25) + "...";
    }
    return value;
  };

  const textArea = (defaultValue) => {
    return (
      <Input.TextArea
        placeholder="Přidejte poznámku..."
        value={defaultValue}
        autoFocus={true}
        onBlur={() => {
          setInputValue(value);
          setNoteOpen(false);
        }}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={(e) => {
          e.preventDefault();
          setNoteOpen(false);
          mutateState({
            variables: { orderID: id, field: field, value: inputValue },
          });
        }}
      ></Input.TextArea>
    );
  };

  return (
    <Form
      onClick={() => {
        setNoteOpen(!noteOpen);
        setNoteViewOpen(false);
      }}
      onMouseEnter={() => setNoteViewOpen(true)}
      onMouseLeave={() => setNoteViewOpen(false)}
      style={{ width: 100, cursor: "pointer" }}
    >
      <Popover
        destroyTooltipOnHide={true}
        visible={noteViewOpen}
        content={value}
        arrowPointAtCenter={true}
      ></Popover>
      <Popover
        destroyTooltipOnHide={true}
        visible={noteOpen}
        content={textArea(inputValue)}
        arrowPointAtCenter={true}
      ></Popover>
      {shortenedValue().length > 0 ? (
        shortenedValue()
      ) : (
        <span style={{ color: "gray", cursor: "pointer" }}>_____</span>
      )}
    </Form>
  );
}

export default TableNote;
