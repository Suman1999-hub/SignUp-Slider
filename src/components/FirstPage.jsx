import { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";

function FirstPage() {
  const comp = [
    {
      placeName: "Email",
      btnName: ["Next"],
    },
    {
      placeName: "Enter Phone Number",
      btnName: ["Prev", "Next"],
    },
    {
      placeName: "Name",
      btnName: ["Prev", "Next"],
    },
    {
      placeName: "Password",
      btnName: ["Prev", "Submit"],
    },
  ];
  const [data, setData] = useState(0);

  

  return (
    <>
      <div
        style={{
          height: "400px",
          width: "400px",
          border: "1px solid black",
          borderRadius: "10px",
        }}
      >
        <h1>
          Sign <span style={{ color: "#95079d" }}>Up</span>
        </h1>
        <h1></h1>
        <div>
          <InputField placeName={comp[data].placeName} />
        </div>
        <div style={{ margin: "75px", display: "flex" }}>
          {comp[data].btnName.map((curr) => {
            return (
              <>
                <div style={{ marginLeft: "10px" }}>
                  {curr === "Next" ? (
                    <Button
                      name={curr}
                      color={"rgb(149, 7, 157)"}
                      onClick={() => setData(data + 1)}
                    />
                  ) : (
                    <Button
                      name={curr}
                      color={"red"}
                      onClick={() => setData(data - 1)}
                    />
                  )}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default FirstPage;
