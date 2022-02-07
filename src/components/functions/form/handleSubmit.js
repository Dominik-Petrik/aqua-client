const handleSumbit = async (func, customerFunc, values) => {
  const { surname, name, city, adress, email, phone, birthdate, ico, note } =
    values;
  await func({
    variables: {
      orderInput: values,
    },
  });
  await customerFunc({
    variables: {
      customerInput: {
        surname,
        name,
        city,
        adress,
        email,
        phone,
        birthdate,
        ico,
        note,
      },
    },
  });
};

export default handleSumbit;
