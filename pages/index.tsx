import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState, MouseEvent, useRef } from "react";

const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError,
}) => {
  const getUserProfile = async () => {
    const profile = await liff?.getProfile();
    console.log(profile);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div>
      <Head>
        <title>LIFF App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full min-h-screen flex justify-center items-center ">
        <p>TEST</p>
      </main>
    </div>
  );
};

export default Home;
