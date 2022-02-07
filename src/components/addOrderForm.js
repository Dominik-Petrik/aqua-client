import { Button, Form } from "antd";
import React, { useRef } from "react";

import FormSearch from "./utils/form/formSearch";
import FormInput from "./utils/form/formInput";
import FormDate from "./utils/form/formDate";
import FormSelect from "./utils/form/formSelect";
import handleKeys from "./utils/form/handleKeys";

const fields = [
  { name: "name", label: "jméno" },
  { name: "city", label: "město" },
  { name: "adress", label: "Ulice a číslo popisné" },
  { name: "email", label: "e-mail" },
  { name: "phone", label: "telefonní číslo" },
  { name: "ico", label: "IČO" },
];

function AddOrderForm() {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onKeyDown={(event) => handleKeys(event)}
    >
      <Form.Item label="příjmení" name="surname">
        <FormSearch />
      </Form.Item>
      {fields.map((field) => (
        <Form.Item label={field.label}>
          <FormInput field={field.name} label={field.label} />
        </Form.Item>
      ))}
      <Form.Item label={"datum narození"}>
        <FormDate />
      </Form.Item>
      <Form.Item label={"poznámka"}>
        <FormInput field={"note"} label={"poznámka"} note />
      </Form.Item>
      <Form.Item label={"zadal"}>
        <FormSelect />
      </Form.Item>
    </Form>
  );
}

export default AddOrderForm;
