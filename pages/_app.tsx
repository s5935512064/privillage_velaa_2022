import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { Liff } from "@line/liff";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }: AppProps) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);
  const router = useRouter();
  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        console.log("LIFF init...");
        liff
          .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
          .then(() => {
            console.log("LIFF init succeeded.");
            // console.log(liff.isLoggedIn());

            if (!liff.isLoggedIn()) {
              liff.login();
            }

            setLiffObject(liff);
          })
          .catch((error: Error) => {
            console.log("LIFF init failed.");
            setLiffError(error.toString());
          });
      });

    // if (!liff.isLoggedIn()) {
    //   liff.login();
    // }
  }, []);

  useEffect(() => {
    // liffObject.logout();
    // if (!liffObject?.isLoggedIn()) {
    //   console.log(liffObject?.isLoggedIn());
    //   // liffObject?.login({
    //   //   redirectUri: "https://www.google.com",
    //   // });
    // }
  }, [liffObject]);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  return <Component {...pageProps} />;
}

export default MyApp;
