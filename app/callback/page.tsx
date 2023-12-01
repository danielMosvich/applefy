// "use client";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function Callback() {
//   const [code, setCode] = useState<string | null>(null);
//   const { push } = useRouter();
//   if (typeof window !== "undefined") {
//   }
//   useEffect(() => {
//     if (typeof window !== undefined) {
//       const xd = new URLSearchParams(window.location.search).get("code");
//       setCode(xd);
//     }
//   }, []);
//   useEffect(() => {
//     console.log("GG");
//     if (code && window) {
//       axios
//         .post("http://localhost:3001/login", { code })
//         .then((res) => {
//           console.log(window);
//           localStorage.setItem(
//             "last_update",
//             JSON.stringify(Date.now() / 1000)
//           );
//           localStorage.setItem("access_token", res.data.access_token);
//           localStorage.setItem("expires_in", res.data.expires_in);
//           localStorage.setItem("refresh_token", res.data.refresh_token);
//           (window as Window).location = "/";
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   }, [code]);
//   return <div>loading</div>;
// }
"use client";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Callback() {
  // const [code, setCode] = useState<string | null>(null);
  const { push } = useRouter();
  const searchParams = useSearchParams();
  // const router = useRouter();
  // useEffect(() => {
  // const url = searchParams.get("code")
  // console.log(url)
  // const queryCode = query.code as string;
  // setCode(queryCode);
  // }, []);

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      console.log("GG");
      console.log(code);
      axios
        .post(
          "https://applefy-backend.onrender.com/login",
          { code },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Origin: "https://applefy.vercel.app", // Reemplaza con tu dominio frontend
            },
          }
        )
        .then((res) => {
          localStorage.setItem(
            "last_update",
            JSON.stringify(Date.now() / 1000)
          );
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("expires_in", res.data.expires_in);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          push("/");
        })
        .catch((error) => {
          console.log(error);
          if (localStorage.getItem("access_token")) {
            push("/");
          }
        });
    }
  }, []);

  return <div>loading</div>;
}
