/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const Comp3 = forwardRef((props, ref) => {
  const { getData, data } = props;
  function isValidName(name) {
    const regex =
      /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
    return regex.test(name);
  }
  const [name, setName] = useState(data.name || "");
  const [isNameValid, setIsNameValid] = useState(false);
  const [nameErr, setNameErr] = useState("");
  function checkName(value) {
    setName(value);
    if (value === "") {
      setNameErr("*required");
      setIsNameValid(false);
    } else if (!isValidName(value)) {
      setNameErr("Invalid Name");
      setIsNameValid(false);
    } else {
      setNameErr("");
      setIsNameValid(true);
    }
  }
  useEffect(() => {
    if (data.name) {
      checkName(data.name);
    }
  }, [data.name]);
  function validateForm() {
    if (isNameValid) {
      getData && getData({ name });
    }
    return isNameValid;
  }

  useImperativeHandle(ref, () => ({
    validateForm,
  }));

  return (
    <>
      <h1 style={{ fontSize: "20px" }}>{props.comp1Data}</h1>
      <h1 style={{ fontSize: "20px" }}>{props.comp2Data}</h1>
      <input
        type="text"
        style={{ height: "30px", width: "250px" }}
        placeholder="Name"
        value={name}
        onChange={(e) => checkName(e.target.value)}
      />
      <div>
        <span style={{ color: "red" }}>{nameErr}</span>
      </div>
    </>
  );
});
export default Comp3;
