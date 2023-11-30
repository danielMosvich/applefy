"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Callback() {
  // const [code, setCode] = useState<string | null>(null);
  // const { push } = useRouter();
  // if (typeof window !== "undefined") {
  // }
  // useEffect(() => {
  //   // console.log(code);
  //   if (typeof window !== undefined) {
  //     const xd = new URLSearchParams(window.location.search).get("code");
  //     setCode(xd);
  //   }
  // }, []);
  // useEffect(() => {
  //   console.log("GG");
  //   if (code && window) {
  //     axios
  //       .post("http://localhost:3001/login", { code })
  //       .then((res) => {
  //         console.log(window);
  //         localStorage.setItem(
  //           "last_update",
  //           JSON.stringify(Date.now() / 1000)
  //         );
  //         localStorage.setItem("access_token", res.data.access_token);
  //         localStorage.setItem("expires_in", res.data.expires_in);
  //         localStorage.setItem("refresh_token", res.data.refresh_token);
  //         // (window as Window).location = "/";
  //         // window.location = "/";
  //         push("/");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [code]);
  return <div>loading</div>;
}
