import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>TeachSync</title>
        <meta name="description" content="TeachSync" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex items-center justify-center overflow-hidden relative">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="fixed inset-0 h-full w-full object-cover z-[-1]"
        >
          <source src="/video (2160p).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Centered Phrase */}
        <div className="text-center text-white z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Syllabus-Powered Exam Prep: Uncover Videos with Ease!
          </h1>
        </div>
      </main>
    </>
  );
}
