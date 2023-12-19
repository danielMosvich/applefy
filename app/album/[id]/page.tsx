"use client";
import getPlaylist from "@/app/api/getAlbum";
import { useEffect, useState } from "react";
import { AlbumProps } from "./albumProps";
import Image from "next/image";
import { Data, usePlayerStore } from "@/app/store/player";
import ReturnPageButton from "@/app/components/returnPageButton";
import Spiner from "@/app/components/spiner/spiner";

export default function Album({ params }: { params: { id: string } }) {
  const [album, setAlbum] = useState<AlbumProps | null>(null);
  const { changePlayerFromAlbum } = usePlayerStore();
  const { id } = params;
  function handleClick(e:Data) {
    if (album) {
      // console.log({ images: album.images, data: e });
      console.log(e)
      changePlayerFromAlbum({ images: album.images, data: e });
    }
  }
  function formatAlbumTitle(albumName: string, albumType: string): string {
    if (albumType === "single") {
      return `${albumName} - Single`;
    } else {
      return albumName;
    }
  }
  function getYearFromDate(dateString: string): string | null {
    try {
      const [year] = dateString.split("-");
      // Verifica si el resultado es un número válido
      if (!isNaN(Number(year))) {
        return String(year);
      } else {
        return null;
      }
    } catch (error) {
      // Si hay algún error al parsear la fecha, devuelve null
      return null;
    }
  }
  function convertirArrayATexto(array: { name: string }[]) {
    const nombres = array.map((obj) => obj.name);
    return nombres.join(", ");
  }

  useEffect(() => {
    if (id) {
      getPlaylist(id).then((res) => {
        console.log(res);
        setAlbum(res);
      });
    }
  }, []);
  return album ? (
    <div className="mt-10 pb-40">
      <ReturnPageButton />
      <div className="p-5">
        <Image
          className="w-2/3 rounded-lg shadow-lg mx-auto"
          unoptimized
          src={album.images[1].url}
          width={300}
          height={100}
          alt="ax"
        />
        <div className="mt-5">
          <h2 className="font-[600]  text-2xl text-center">
            {formatAlbumTitle(album.name, album.album_type)}
          </h2>
          <h2 className="font-[450] text-rose-500 text-xl text-center">
            {convertirArrayATexto(album.artists)}
          </h2>
          <h2 className="text-sm font-[550] text-center text-neutral-500">
            {getYearFromDate(String(album.release_date))}
          </h2>
        </div>
        <div className="flex gap-5 mt-5">
          <button className="capitalize w-full flex gap-2 justify-center items-center bg-neutral-100 text-rose-500 font-bold py-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9.525 18.025q-.5.325-1.012.038T8 17.175V6.825q0-.6.513-.888t1.012.038l8.15 5.175q.45.3.45.85t-.45.85l-8.15 5.175Z"
              />
            </svg>
            <label>reproducir</label>
          </button>
          <button className="capitalize w-full flex gap-2 justify-center items-center bg-neutral-100 text-rose-500 font-bold py-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
            >
              <g
                id="IconifyId18bafed69d07521815"
                fill="none"
                fillRule="evenodd"
                stroke="none"
                strokeWidth="1"
              >
                <g id="IconifyId18bafed69d07521816" fill="currentColor">
                  <path
                    id="IconifyId18bafed69d07521817"
                    d="M4 17a1 1 0 0 1 0-2h2l3-3l-3-3H4a1.001 1.001 0 0 1 0-2h3l4 4l4-4h2V5l4 3.001L17 11V9h-1l-3 3l3 3h1v-2l4 3l-4 3v-2h-2l-4-4l-4 4H4Z"
                  />
                </g>
              </g>
            </svg>
            <label>aleatorio</label>
          </button>
        </div>
      </div>
      <div className="ml-5">
        <ul className="flex flex-col border-t-[1px] border-neutral-200 mt-5">
          {album.tracks.items.map((e, i) => (
            <li
              key={e.id + "album"}
              className="flex items-center gap-3 h-12 overflow-hidden"
              onClick={() => handleClick(e)}
            >
              <p className="font-[400] text-neutral-500 w-5 flex justify-center ">
                {i + 1}
              </p>
              <div className=" flex w-full items-center gap-3 h-full border-b-[1px] border-neutral-200 overflow-hidden">
                <h2 className="font-[450] overflow-hidden whitespace-nowrap text-ellipsis">
                  {e.name}
                </h2>
                {e.explicit && (
                  <div className="text-xs bg-neutral-500 w-4 h-4 rounded-sm font-[400] text-white flex justify-center items-center font-mono">
                    E
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <div className="loader shadow-2xl text-rose-500 font-[600] text-2xl uppercase">
      <Spiner></Spiner>
    </div>
  );
}
