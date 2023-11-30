// "use client";
const url: string = "https://accounts.spotify.com/authorize";
const client_id: string = "9e0d92d6c8c641448e32478bc8789ecc";
const client_secret = "d417d703420a4a11b5fa32584ec51247";
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
  // function handleLogin() {
  //   (
  //     window as Window
  //   ).location = `${url}?client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code&show_dialog=true`;
  // }

  return (
    <main className="w-full h-screen p-5">
      {/* <button onClick={() => handleLogin()}>XD</button> */}
      <a
        href={`${url}?client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code&show_dialog=true`}
      >
        LOGIN
      </a>
    </main>
  );
}
