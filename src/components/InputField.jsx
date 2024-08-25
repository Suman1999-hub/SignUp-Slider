function InputField({ placeName }) {
  function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
  function validatePhoneNumber(phoneNumber) {
    // Define the regular expression pattern using RegExp object
    const pattern = new RegExp(
      "^\\+[1-9]{1}[0-9]{0,2}-[2-9]{1}[0-9]{2}-[2-9]{1}[0-9]{2}-[0-9]{4}$"
    );

    // Test the phone number against the pattern
    if (pattern.test(phoneNumber)) {
      console.log("Phone number is valid");
      return true;
    } else {
      console.log("Phone number is not valid");
      return false;
    }
  }
  console.log(placeName);
  return (
    <input
      type="text"
      style={{ height: "30px", width: "250px" }}
      placeholder={placeName}
    />
  );
}

export default InputField;
