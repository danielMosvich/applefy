"use client";
import { useState, useEffect } from "react";
const url: string = "https://accounts.spotify.com/authorize";
const client_id: string = "9e0d92d6c8c641448e32478bc8789ecc";
const client_secret = "d417d703420a4a11b5fa32584ec51247";
// const redirect_uri: string = "https://applefy.vercel.app/callback";
const redirect_uri: string = "http://localhost:3000/callback";
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
        <a
          // href="http://localhost:3001/login"
          href="https://applefy-back.onrender.com/login"
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
      )}
    </main>
  );
}
