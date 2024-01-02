"use client";
import { useState, useEffect } from "react";
import LoginPage from "./components/loginPage/loginPage";
import LogoutPage from "./components/logoutPage/logoutPage";
const scopes: string[] = [
  "ugc-image-upload",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "app-remote-control",
  "playlist-modify-public",
  "user-modify-playback-state",
  "playlist-modify-private",
  "user-follow-modify",
  "user-read-currently-playing",
  "user-follow-read",
  "user-library-modify",
  "user-read-playback-position",
  "playlist-read-private",
  "user-read-email",
  "user-read-private",
  "streaming",
];
const scope = scopes.join("%20");
export default function Home() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setLogin(true);
    }
  }, []);
  return (
    <main className="w-full h-screen p-5">
      {!login ? (
        <LoginPage />
      ) : (
        <LogoutPage setLogin={setLogin}/>
      )}
      {/* {!login ? (
        <a
          href="http://localhost:3001/login"
          // href="https://applefy-back.onrender.com/login"
          className="bg-rose-500 text-white px-5 py-3 rounded-lg font-[550] "
        >
          LOGIN ♥
        </a>
      ) : (
        <div
          // href="http://localhost"
          className="bg-rose-500 text-white px-5 py-3 rounded-lg font-[550] "
          onClick={() => {
            localStorage.clear();
            setLogin(false);
          }}
        >
          LOG OUT
        </div>
      )} */}
    </main>
  );
}
