import Head from "next/head";

export default function pyqs() {
  return (
    <>
      <Head>
        <title>Doubts - TeachSync</title>
        <meta name="description" content="TeachSync" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">
        <h1 className="mt-8 text-4xl text-white">Doubts</h1>
        <div className="flex w-[1000px] mt-20"> {/* Adjust the width as needed */}
          {/* Left Side - Input Form */}
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

          {/* Right Side - Questions Display */}
          <div className="flex-1 border-white border h-96 px-4 py-2">
            {/* Display questions here */}
            <div className="mb-2">
              <h2 className="text-white text-lg">Question 1</h2>
              <p className="text-white">This is the question description.</p>
            </div>
            <div className="mb-2">
              <h2 className="text-white text-lg">Question 2</h2>
              <p className="text-white">Another question description.</p>
            </div>
            {/* Add more questions as needed */}
          </div>
        </div>
      </main>
    </>
  );
}
