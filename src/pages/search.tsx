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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#181818]">
      <div className="flex flex-col items-center justify-between p-4">
        <Image
          className="p-3"
          src="/favicon.ico"
          alt="logo"
          height={75}
          width={75}
        />
        <h1 className="font-serif text-5xl text-white">TeachSync</h1>
      </div>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter your topics"
        className="placeholder-[#464e4e]::placeholder m-3 mx-10 mb-4 w-96 rounded-3xl border-2 border-[#464e4e] bg-transparent p-2 text-left font-semibold text-white"
      />
      <button
        className="text-1xl rounded-3xl bg-[#40e0d0] px-5 py-2 text-center font-semibold"
        onClick={handleSubmit}
      >
        Search
      </button>
      {/* <div>Data: {data ? JSON.stringify(data) : "No data available"}</div> */}
      <>
        {data
          ? data.map((e: IVideoData, index: number) => (
              <div key={index} className="p-5 px-4">
                <VideoData info={e} />
              </div>
            ))
          : ""}
      </>
    </div>
  );
}
