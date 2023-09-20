import React, { useState, useEffect, ChangeEvent } from "react";

function Component() {
  const [input, setInput] = useState<string>("");
  const [data, setData] = useState<any>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newInput = event.target.value;
    setInput(newInput);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted && input !== "") {
      const apiUrl = `http://localhost:3000/api/fetch?limit=50&search=${input}&filter=`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((result) => {
          setData(result);
        })
        .catch((error) => {
          console.error("Error fetching data", error);
        });
    }
  }, [submitted, input]);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter value"
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        Data: {data ? JSON.stringify(data) : "No data available"}
      </div>
    </div>
  );
}

export default Component;
