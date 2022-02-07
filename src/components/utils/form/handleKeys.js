const handleKeys = (e) => {
  const form = e.target.form;
  const index = Array.prototype.indexOf.call(form, e.target);
  console.log(e.keyCode);
  switch (e.keyCode) {
    case 40:
      if (index != form.elements.length && index != 0) {
        form.elements[index + 1].focus();
      }
      break;
    case 13:
      if (index != form.elements.length) {
        form.elements[index + 1].focus();
      }
      break;
    case 38:
      if (index != 0) {
        form.elements[index - 1].focus();
      }
      break;
    default:
      break;
  }
};

export default handleKeys;
