import React, { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import VideoData, { IVideoData } from "~/components/VideoData";

export default function search() {
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
      const apiUrl = new URL(
        `/api/fetch?limit=50&search=${input}&filter=`,
        `http://localhost:3000`,
      );

      // const apiUrl = `http://localhost:3000/api/fetch?limit=50&search=${input}&filter=`;
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-700">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter your topics"
        className="mb-4 rounded-3xl bg-gray-500 p-2 font-semibold text-white"
      />
      <button
        className="rounded-3xl bg-gray-500 p-2 font-semibold text-white"
        onClick={handleSubmit}
      >
        Search
      </button>
      {/* <div>Data: {data ? JSON.stringify(data) : "No data available"}</div> */}
      <>
        {data ? data.map((e: IVideoData, index: number) => (
          <div key={index} className="px-4 p-5">
            <VideoData info={e}/>
          </div>
        )) : ""}
      </>
    </div>
  );
}
