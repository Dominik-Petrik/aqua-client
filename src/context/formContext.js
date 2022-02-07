const { createContext, useState, useEffect } = require("react");

export const FormContext = createContext();

const FormContextProvider = (props) => {
  const [formValues, setFormValues] = useState({ createdBy: "Krčmářová" });
  const setFieldValue = (field, value) => {
    setFormValues({ ...formValues, [field]: value });
  };
  const setFormValuesFromSaved = (object) => {
    setFormValues({ ...formValues, ...object });
    console.log(formValues);
  };

  return (
    <FormContext.Provider
      value={{
        setFieldValue,
        formValues,
        setFormValues,
        setFormValuesFromSaved,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
