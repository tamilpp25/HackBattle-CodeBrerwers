import Head from "next/head";
import { useState, useEffect } from "react";

export default function doubts() {
  // const [questionTitle, setQuestionTitle] = useState('');
  // const [questionDescription, setQuestionDescription] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/doubts/queryQuestions", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update the state with the fetched questions
        setQuestions(data.questions);
      });
  }, []); 

  return (
    <>
      <Head>
        <title>Doubts - TeachSync</title>
        <meta name="description" content="TeachSync" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">
        <h1 className="mt-8 text-4xl text-white">Doubts</h1>
        <div className="flex w-[1000px] mt-20">
          <div className="w-[350px] mr-12">
            <input
              type="text"
              className="w-full px-4 py-2 mb-4"
              placeholder="Question Title"
            />
            <textarea
              className="w-full h-40 px-4 py-2"
              placeholder="Question Description"
            ></textarea>
            <button className="bg-blue-500 px-4 py-2 text-white mt-4">
              Submit
            </button>
          </div>
          <div className="flex-1 border-white border h-96 px-4 py-2">
            <div className="flex justify-center mt-4">
              <input
                type="text"
                className="w-[300px] px-4 py-2 mr-2"
                placeholder="Search..."
              />
              <button className="px-4 py-2 bg-blue-500 text-white">Search</button>
            </div>
            {/* Display questions here */}
            {questions.map((question, index) => (
              <div key={index} className="mb-2 mt-4">
                <a href="#">
                  <h2 className="text-white text-lg hover:text-cyan-500">{question.title}</h2>
                </a>
                <p className="text-white">{question.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
