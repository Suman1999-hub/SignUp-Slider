/* eslint-disable react/prop-types */
import { forwardRef, useState, useImperativeHandle, useEffect } from "react";

// eslint-disable-next-line react/display-name
const Comp1 = forwardRef((props, ref) => {
  const { getData, data } = props;

  const [email, setEmail] = useState(data.email || "");
  const [isValid, setIsValid] = useState(false);
  const [emailErr, setEmailErr] = useState("");

  function validEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  function checkEmail(value) {
    setEmail(value);
    if (value === "") {
      setEmailErr("*required");
      setIsValid(false);
    } else if (!validEmail(value)) {
      setEmailErr("Invalid Email");
      setIsValid(false);
    } else {
      setEmailErr("");
      setIsValid(true);
    }
  }

  useEffect(() => {
    if (data.email) {
      checkEmail(data.email);
    }
  }, [data.email]);

  function validateForm() {
    if (isValid) {
      getData && getData({ email });
    }
    return isValid;
  }

  useImperativeHandle(ref, () => ({
    validateForm,
  }));

  return (
    <>
      <input
        type="text"
        style={{ height: "30px", width: "250px" }}
        placeholder="Email"
        value={email}
        onChange={(e) => checkEmail(e.target.value)}
      />
      <div>
        <span style={{ color: "red" }}>{emailErr}</span>
      </div>
    </>
  );
});

export default Comp1;
