/* eslint-disable react/prop-types */
import { forwardRef, useState, useImperativeHandle, useEffect } from "react";

// eslint-disable-next-line react/display-name
const Comp2 = forwardRef((props, ref) => {
  const { getData, data } = props;

  const [phone, setPhone] = useState(data.phone || "");
  const [isPhValid, setIsPhValid] = useState(false);
  const [phErr, setPhErr] = useState("");

  function isValidPhone(number) {
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return regex.test(number);
  }

  function checkPhone(value) {
    setPhone(value);
    if (value === "") {
      setPhErr("*required");
      setIsPhValid(false);
    } else if (!isValidPhone(value)) {
      setPhErr("Invalid Number");
      setIsPhValid(false);
    } else {
      setPhErr("");
      setIsPhValid(true);
    }
  }

  useEffect(() => {
    if (data.phone) {
      checkPhone(data.phone);
    }
  }, [data.phone]);

  function validateForm() {
    if (isPhValid) {
      getData && getData({ phone });
    }
    return isPhValid;
  }

  useImperativeHandle(ref, () => ({
    validateForm,
  }));

  return (
    <>
      <h1 style={{ fontSize: "20px" }}>{props.comp1Data}</h1>
      <input
        type="text"
        style={{ height: "30px", width: "250px" }}
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => checkPhone(e.target.value)}
      />
      <div>
        <span style={{ color: "red" }}>{phErr}</span>
      </div>
    </>
  );
});

export default Comp2;
