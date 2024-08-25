/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const Comp4 = forwardRef((props, ref) => {
  const { getData, data } = props;
  function isValidPassword(password) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }
  const [password, setPassword] = useState(data.password || "");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordErr, setPasswordErr] = useState("");
  function checkPassword(value) {
    setPassword(value);

    if (value === "") {
      setPasswordErr("*required");
      setIsPasswordValid(false);
    } else if (!isValidPassword(value)) {
      setPasswordErr("Invalid Password");
      setIsPasswordValid(false);
    } else {
      setPasswordErr("");
      setIsPasswordValid(true);
    }
    // getData && getData({ password: value, isValid: isPasswordValid });
  }
  useEffect(() => {
    if (data.password) {
      checkPassword(data.password);
    }
  }, [data.password]);
  function validateForm() {
    if (isPasswordValid) {
      getData && getData({ password });
    }
    return isPasswordValid;
  }

  useImperativeHandle(ref, () => ({
    validateForm,
  }));

  return (
    <>
      <h1 style={{ fontSize: "20px" }}>{props.comp1Data}</h1>
      <h1 style={{ fontSize: "20px" }}>{props.comp2Data}</h1>
      <h1 style={{ fontSize: "20px" }}>{props.comp3Data}</h1>
      <input
        type="text"
        style={{ height: "30px", width: "250px" }}
        placeholder="Password"
        value={password}
        onChange={(e) => checkPassword(e.target.value)}
      />
      <div>
        <span style={{ color: "red" }}>{passwordErr}</span>
      </div>
    </>
  );
});

export default Comp4;
