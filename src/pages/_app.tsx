import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppType } from "next/dist/shared/lib/utils"; // Adjust the import if needed
import Navbar from "~/components/Navbar";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Navbar />
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default MyApp;
