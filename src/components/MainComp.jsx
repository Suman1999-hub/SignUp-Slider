import { useState, useRef } from "react";
import Comp1 from "./Comp1";
import Comp2 from "./Comp2";
import Comp3 from "./Comp3";
import Comp4 from "./Comp4";

function MainComp() {
  const [formFields, setFormFields] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
  });
  console.log(formFields);
  const [currentStep, setCurrentStep] = useState(0);

  const comp1Ref = useRef();
  const comp2Ref = useRef();
  const comp3Ref = useRef();
  const comp4Ref = useRef();

  const handleChange = (field, value) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const increseStepOrSubmit = () => {
    let isStepValid = false;

    if (currentStep === 0) {
      isStepValid = comp1Ref.current.validateForm();
    } else if (currentStep === 1) {
      isStepValid = comp2Ref.current.validateForm();
    } else if (currentStep === 2) {
      isStepValid = comp3Ref.current.validateForm();
    } else if (currentStep === 3) {
      isStepValid = comp4Ref.current.validateForm();
    }

    if (isStepValid) {
      if (currentStep === 3) {
        alert("Form Submit Successfully!!!!");
        // You can handle form submission here
        setFormFields({ email: "", name: "", phone: "", password: "" });
        setCurrentStep(0);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      alert("Please fill in the form correctly.");
    }
  };

  const decreaseStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <>
      <div
        style={{
          height: "400px",
          width: "400px",
          border: "1px solid black",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <h1>
          Sign <span style={{ color: "#95079d" }}>Up</span>
        </h1>
        <div>
          {currentStep === 0 && (
            <Comp1
              ref={comp1Ref}
              data={formFields}
              getData={(data) => handleChange("email", data.email)}
            />
          )}
          {currentStep === 1 && (
            <Comp2
              ref={comp2Ref}
              data={formFields}
              getData={(data) => handleChange("phone", data.phone)}
              comp1Data={formFields.email}
            />
          )}
          {currentStep === 2 && (
            <Comp3
              ref={comp3Ref}
              data={formFields}
              comp1Data={formFields.email}
              comp2Data={formFields.phone}
              getData={(data) => handleChange("name", data.name)}
            />
          )}
          {currentStep === 3 && (
            <Comp4
              ref={comp4Ref}
              data={formFields}
              comp1Data={formFields.email}
              comp2Data={formFields.phone}
              comp3Data={formFields.name}
              getData={(data) => handleChange("password", data.password)}
            />
          )}
        </div>

        <div
          className="btn-group"
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {currentStep !== 0 && (
            <button
              onClick={decreaseStep}
              style={{ backgroundColor: "green", color: "white" }}
            >
              Prev
            </button>
          )}
          <button
            onClick={increseStepOrSubmit}
            style={{ backgroundColor: "#95079d", color: "white" }}
          >
            {currentStep === 3 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </>
  );
}

export default MainComp;
