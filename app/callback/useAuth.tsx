"use client";
import { useEffect, useState } from "react";
import axios from "axios";
export default function useAuth(code: string | null) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

//   const getData = async () => {
//     const res = await fetch("http://localhost:3001/login", {
//       method: "POST",
//       body: code,
//     });
//     const data = await res.json();
//     console.log(data);
//   };
  useEffect(() => {
    if (code) {
      axios
        .post("https://applefy-backend.onrender.com/login", {
          code,
        })
        .then((res) => {
          console.log(res.data);
        });
    //   getData();
      // fetch("http://localhost:3001/login",{
      //     method:"POST",
      //     body:code
      // })
      // .catch(() => {
      //   (window as Window).location = "/";
      // });
    }
  }, [code]);
}
