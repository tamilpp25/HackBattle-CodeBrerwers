import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>TeachSync</title>
        <meta name="description" content="TeachSync" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="fixed inset-0 z-[-1] h-full w-full object-cover"
        >
          <source src="/video (2160p).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Centered Phrase */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Syllabus-Powered Exam Prep: Uncover Videos with Ease!
          </h1>
          <button className="py-4 text-5xl ease-in hover:scale-125">
            Get Started Now!
          </button>
        </div>
      </main>
    </>
  );
}
