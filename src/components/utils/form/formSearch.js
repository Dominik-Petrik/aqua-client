import { useLazyQuery } from "@apollo/client";
import { Select, Form, Space, AutoComplete } from "antd";
import React, { useState, useContext } from "react";
import AUTOCOMPLETE_CUSTOMER from "../../../queries/autocompleteCustomer";
import {
  UserOutlined,
  HomeOutlined,
  PhoneOutlined,
  ConsoleSqlOutlined,
} from "@ant-design/icons";
import { FormContext } from "../../../context/formContext";

const { Option } = Select;

const OptionChild = ({ id, surname, city, phone }) => {
  if (city && city.length > 20) {
    city = city.substr(0, 20) + "...";
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span style={{ width: "25%" }}>
        <Space size={"small"}>
          <UserOutlined style={{ color: "gray" }} />
          {surname}
        </Space>
      </span>
      <span style={{ width: "50%" }}>
        <Space size={"small"}>
          <HomeOutlined style={{ color: "gray" }} />
          {city}
        </Space>
      </span>
      <span style={{ width: "25%" }}>
        <Space size={"small"}>
          <PhoneOutlined style={{ color: "gray" }} />
          {phone}
        </Space>
      </span>
    </div>
  );
};

function FormSearch() {
  const { setFieldValue, setFormValuesFromSaved, formValues } =
    useContext(FormContext);
  const [getResults, { loading, data }] = useLazyQuery(AUTOCOMPLETE_CUSTOMER, {
    fetchPolicy: "no-cache",
    onCompleted: () => {
      let customers = [];

      if (data.autocompleteCustomer.length > 0) {
        customers = data.autocompleteCustomer.map((customer, index) => (
          <Option key={index} label={customer.surname}>
            <OptionChild
              surname={customer.surname}
              city={customer.city}
              phone={customer.phone}
            />
          </Option>
        ));
      }

      setOptions(customers);
    },
    onError: (error) => console.log(error),
  });
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const handleSelect = (key) => {
    const value = data.autocompleteCustomer[key];

    const { surname, name, city, adress, email, phone, ico, birthdate } = value;

    setFormValuesFromSaved({
      surname,
      name,
      city,
      adress,
      email,
      phone,
      ico,
      birthdate,
    });
  };

  const handleSearch = async (term) => {
    if (term.length < 2) {
      setOptions([]);
    } else {
      await getResults({ variables: { searchTerm: term } });
    }
  };

  return (
    <AutoComplete
      placeholder="příjmení"
      defaultActiveFirstOption={false}
      notFoundContent={null}
      showArrow={false}
      optionLabelProp="label"
      value={formValues.surname}
      autoClearSearchValue={false}
      showSearch
      filterOption={false}
      onSelect={(e) => {
        handleSelect(e);
      }}
      onSearch={(term) => {
        handleSearch(term);
        setFieldValue("surname", term);
      }}
    >
      {options}
    </AutoComplete>
  );
}

export default FormSearch;
