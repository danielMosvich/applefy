"use client";
import { useEffect, useState } from "react";
import getSearch from "../api/getSearch";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePlayerStore } from "../store/player";
import { DataProps } from "./types/dataProps";

export default function Search() {
  const { song, changePlayer } = usePlayerStore();
  const { push } = useRouter();
  const [value, setValue] = useState<string>("");
  const [state, setState] = useState(false);
  const [data, setData] = useState<DataProps | null>(null);
  useEffect(() => {
    if (!state && value !== "") {
      setTimeout(() => {
        setState(true);
      }, 1000);
    }
    if (value !== "" && state) {
      getSearch(value).then((res) => {
        setData(res);
      });
    }
  }, [value, state]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div
      className="p-5 min-h-screen pt-16"
      style={{ paddingBottom: song ? "144px" : "80px" }}
    >
      {/* {JSON.stringify(state)} */}
      <div className="w-full h-16 flex bg-white/60 backdrop-blur-xl text-neutral-500 fixed top-0 left-0">
        <div className="bg-neutral-200/70 my-3 ml-3 w-full rounded-xl overflow-hidden flex items-center">
          <button className="w-fit h-fit p-2" onClick={() => {}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2rem"
              height="1.2rem"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </button>
          <input
            onChange={(e) => {
              setValue(e.target.value);
              setState(false);
            }}
            value={value}
            placeholder="Artistas, tracks, letters and more"
            type="text"
            className=" overflow-hidden text-ellipsis whitespace-nowrap w-full h-full bg-transparent border-none outline-none placeholder-neutral-500 text-neutral-900 font-[500] placeholder:font-[400] caret-rose-500 "
          />
          <button
            className="w-fit h-fit p-2"
            onClick={() => {
              setValue("");
              setState(false);
              setData(null);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M2.343 13.657A8 8 0 1 1 13.658 2.343A8 8 0 0 1 2.343 13.657ZM6.03 4.97a.751.751 0 0 0-1.042.018a.751.751 0 0 0-.018 1.042L6.94 8L4.97 9.97a.749.749 0 0 0 .326 1.275a.749.749 0 0 0 .734-.215L8 9.06l1.97 1.97a.749.749 0 0 0 1.275-.326a.749.749 0 0 0-.215-.734L9.06 8l1.97-1.97a.749.749 0 0 0-.326-1.275a.749.749 0 0 0-.734.215L8 6.94Z"
              />
            </svg>
          </button>
        </div>
        <button className="px-3 text-rose-500 font-[500]">Cancelar</button>
      </div>
      <div className="w-full">
        {data && data.artists.items[0] && (
          <div
            className="flex  justify-between gap-3 py-3 "
            onClick={() => push(`/artist/${data.artists.items[0].id}`)}
          >
            <div className="flex gap-3 items-center">
              <div className="w-14 h-14 rounded-full overflow-hidden border-[1px] border-neutral-200">
                <Image
                  unoptimized
                  width={56}
                  height={56}
                  alt="xd"
                  src={data.artists.items[0].images[2].url}
                ></Image>
              </div>
              <div className="flex flex-col">
                <h2 className="font-[500]">{data.artists.items[0].name}</h2>
                <h2 className="text-neutral-600 capitalize">
                  {data.artists.items[0].type}
                </h2>
              </div>
            </div>
            <button
              className=""
              onClick={() => {
                push(`/artist/${data.artists.items[0].id}`);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.7rem"
                height="1.7rem"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="m19 12l12 12l-12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <ul className="w-full">
        {data &&
          data.tracks.items.map((element, index) => {
            return (
              <li
                key={element.id}
                className="flex justify-between border-t-[1px] w-full"
                onClick={() => {
                  // handleClick(element);
                  // console.log(element);
                  changePlayer(element);
                  // changePlayer(element);
                }}
              >
                <div className="flex gap-3  w-full overflow-hidden py-3">
                  <div className="w-14 h-14 min-w-[56px] min-h-[56px] rounded-md overflow-hidden border-[1px] border-neutral-200">
                    <Image
                      className="rounded-md"
                      unoptimized
                      src={element.album.images[2].url}
                      width={56}
                      height={56}
                      alt="xd"
                    />
                  </div>
                  <div className="overflow-hidden flex flex-col justify-center">
                    <h2 className="text-base font-[500] overflow-hidden whitespace-nowrap text-ellipsis w-full ca">
                      {element.name}
                    </h2>
                    <h3 className="text-sm text-neutral-500 capitalize">
                      {element.type} · {element.artists[0].name}
                    </h3>
                  </div>
                </div>
                <button className="px-3 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.3rem"
                    height="1.3rem"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M6 14q-.825 0-1.413-.588T4 12q0-.825.588-1.413T6 10q.825 0 1.413.588T8 12q0 .825-.588 1.413T6 14Zm6 0q-.825 0-1.413-.588T10 12q0-.825.588-1.413T12 10q.825 0 1.413.588T14 12q0 .825-.588 1.413T12 14Zm6 0q-.825 0-1.413-.588T16 12q0-.825.588-1.413T18 10q.825 0 1.413.588T20 12q0 .825-.588 1.413T18 14Z"
                    />
                  </svg>
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
