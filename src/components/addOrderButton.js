import { Button, Modal, Form, Input } from "antd";
import React, { useState, useContext } from "react";
import AddOrderForm from "./addOrderForm";
import handleSumbit from "./functions/form/handleSubmit";
import { useMutation } from "@apollo/client";
import CREATE_ORDER from "../queries/createOrder";
import { FormContext } from "../context/formContext";
import CREATE_CUSTOMER from "../queries/createCustomer";

function AddUserButton() {
  const [mutateState, { data, loading, error }] = useMutation(CREATE_ORDER);
  const [createCustomer] = useMutation(CREATE_CUSTOMER);
  const [modalOpen, setModalOpen] = useState(false);
  const { formValues, setFormValues } = useContext(FormContext);

  return (
    <React.Fragment>
      <Button
        onClick={() => setModalOpen(true)}
        style={{ width: "300px", height: "60px", fontSize: "25px" }}
        type="primary"
        size="large"
      >
        Přidat zakázku
      </Button>
      <Modal
        bodyStyle={{ overflowY: "scroll", height: "calc(100vh - 300px)" }}
        destroyOnClose
        onCancel={() => {
          setModalOpen(false);
          setFormValues({ createdBy: "Krčmářová" });
        }}
        cancelText="Zrušit"
        okText="Vytvořit"
        title="Nová zakázka"
        confirmLoading={loading}
        visible={modalOpen}
        onOk={async () => {
          setModalOpen(false);
          await handleSumbit(mutateState, createCustomer, formValues);
          setFormValues({ createdBy: "Krčmářová" });
        }}
      >
        <AddOrderForm />
      </Modal>
    </React.Fragment>
  );
}

export default AddUserButton;
