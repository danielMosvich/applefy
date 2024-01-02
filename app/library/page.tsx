"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getLibrary from "../api/getLibrary";

interface ImageObject {
  height: number;
  url: string;
  width: number;
}
interface playlistProps {
  href: string;
  items: {
    collaborative: boolean;
    name: string;
    description: string;
    type: string;
    id: string;
    images: { height: number; width: number; url: string }[];
    external_urls: {
      spotify: string;
    };
    owner: {
      display_name: string;
      href: string;
      id: string;
      type: string;
      uri: string;
    };
    tracks: {
      href: string;
      total: number;
    };
  }[];

  total: number;
}
interface dataProps {
  display_name: string;
  email: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
  id: string;
  images: ImageObject[];
  product: string;
  type: string;
  uri: string;
}
interface followsProps {
  href: string;
  items: {
    external_urls: { spotify: string };
    followers: { href: string | null; total: number };
    genres: string[] | [];
    href: string;
    id: string;
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
  }[];
  total: number;
}
interface ResponseType {
  data: dataProps;
  follows: followsProps;
  playlists: playlistProps;
}

export default function Library() {
  const [data, setData] = useState<dataProps | null>(null);
  const [playlists, setPlaylists] = useState<playlistProps | null>(null);
  const [follows, setFollows] = useState<followsProps | null>(null);
  const { push } = useRouter();
  function logOut() {
    localStorage.clear();
    push("/");
  }
  useEffect(() => {
    getLibrary().then((res) => {
      const { data, follows, playlists } = res as ResponseType;
      setData(data);
      setFollows(follows);
      setPlaylists(playlists);
    });
  }, []);
  return (
    <div className="px-5 pb-40">
      {data ? (
        <div className="py-[88px]">
          <div className="fixed w-full left-0 p-5 z-40 top-0 bg-white/90 backdrop-blur-xl flex items-center h-fit justify-between">
            <h2 className="text-4xl font-bold">Biblioteca</h2>
            <div className="flex items-center gap-3">
              {data.images && data.images[1] && (
                <div className="bg-red-500 rounded-full w-12 h-12 overflow-hidden">
                  <Image
                    unoptimized
                    height={data.images[1].height}
                    width={data.images[1].width}
                    className="w-full h-full object-cover"
                    src={data.images[1].url}
                    alt=""
                  />
                </div>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3rem"
                height="3rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z"
                />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {playlists &&
              playlists?.items.map((e, i) => (
                <div
                  key={e.id}
                  className="flex flex-col"
                  onClick={() => {
                    push(`/playlist/${e.id}`);
                  }}
                >
                  <div className="w-full h-fit overflow-hidden rounded-md">
                    <Image
                      className="w-full h-full object-cover max-w-[165px] min-w-[165px] min-h-[165px] max-h-[165px]"
                      alt="xd"
                      unoptimized
                      src={e.images[0]?.url}
                      width={165}
                      height={165}
                    />
                  </div>
                  <h2 className="text-base mt-2 font-[500] whitespace-nowrap text-ellipsis overflow-hidden">
                    {e.name}
                  </h2>
                  <h3 className="text-base -translate-y-1 text-black/70">
                    {e.owner.display_name}
                  </h3>
                </div>
              ))}
            {follows &&
              follows?.items.map((e, i) => (
                <div
                  key={e.id}
                  className="flex flex-col items-center"
                  onClick={() => {
                    push(`/artist/${e.id}`);
                  }}
                >
                  <Image
                    className="w-full h-full object-cover max-w-[165px] max-h-[165px] rounded-full"
                    alt="xd"
                    unoptimized
                    src={e.images[2]?.url}
                    width={e.images[2]?.width ? e.images[2]?.width : 0}
                    height={e.images[2]?.height ? e.images[2]?.height : 0}
                  />
                  <h2 className="text-base font-[500] mt-2 text-center whitespace-nowrap overflow-hidden text-ellipsis">
                    {e.name}
                  </h2>
                  <h2 className="text-base capitalize text-black/70">
                    {e.type}
                  </h2>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <button
        className="bg-rose-500 text-white text-xl w-1/2 mx-auto p-3 rounded-full flex items-center gap-3 justify-center font-[500]"
        onClick={logOut}
      >
        Log out{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5rem"
          height="1.5rem"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
          />
        </svg>
      </button>
    </div>
  );
}
