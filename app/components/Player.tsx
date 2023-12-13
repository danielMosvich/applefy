"use client";
import { usePlayerStore } from "../store/player";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import PlayerFull from "./PlayerFull";
import Modal from "./Modal";
export default function Player() {
  const {volume, song, image, name, setPlayGlobal, playGlobal } = usePlayerStore();
  const [showModal, setShowModal] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // const [play, setPlay] = useState(false);
  useEffect(() => {
    if (audioRef.current) {
      (audioRef.current as HTMLAudioElement).volume = volume;
    }
  }, [volume,song]);

  // useEffect(() => {
  //   setPlay(playGlobal);
  // }, [playGlobal]);

  if (song) {
    return (
      <>
        <div className="fixed bottom-16 w-full px-4 flex justify-center items-center z-[42]">
          {song && (
            <audio
              ref={audioRef}
              onPause={() => {
                setPlayGlobal(false);
                // setPlay(true)
              }}
              onPlay={() => {
                setPlayGlobal(true);
                // setPlay(false)
              }}
              // controls
              autoPlay
              src={song}
            >
              {/* <source src={song}></source> */}
            </audio>
          )}
          <div
            style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.2)" }}
            className=" w-full p-2 flex bg-white rounded-xl overflow-hidden"
          >
            <div
              onClick={() => setShowModal(true)}
              className="flex w-full gap-3 items-center overflow-hidden"
            >
              <div className="rounded-lg overflow-hidden w-12 h-12 min-w-[48px] min-h-[48px] shadow-sm border-[1px] border-neutral-200">
                <Image
                  className="object-cover w-full h-full "
                  unoptimized
                  src={image}
                  width={48}
                  height={48}
                  alt="xd"
                />
              </div>
              <div className="flex flex-col justify-center w-full overflow-hidden">
                <h3 className="font-[400] w-full text-base whitespace-nowrap overflow-hidden text-ellipsis">
                  {name}
                </h3>
                {/* <h4 className="text-black/60 text-base font-[400] -translate-y-1  whitespace-nowrap overflow-hidden text-ellipsis">
                {artists}
              </h4> */}
              </div>
            </div>
            {/* {String(playGlobal)} */}
            <div className="flex items-center justify-end mr-3">
              {!playGlobal ? (
                <button
                  className="mr-3"
                  onClick={() => {
                    if (audioRef.current) {
                      (audioRef.current as HTMLAudioElement).play();
                      setPlayGlobal(true);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2.3rem"
                    height="2.3rem"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475q0 .25-.113.475t-.337.375l-8.15 5.175q-.125.075-.263.113T9 18.175q-.4 0-.7-.288t-.3-.712Z"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  className="mr-3"
                  onClick={() => {
                    if (audioRef.current) {
                      (audioRef.current as HTMLAudioElement).pause();
                      setPlayGlobal(false);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2.3rem"
                    height="2.3rem"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M16 19q-.825 0-1.413-.588T14 17V7q0-.825.588-1.413T16 5q.825 0 1.413.588T18 7v10q0 .825-.588 1.413T16 19Zm-8 0q-.825 0-1.413-.588T6 17V7q0-.825.588-1.413T8 5q.825 0 1.413.588T10 7v10q0 .825-.588 1.413T8 19Z"
                    />
                  </svg>
                </button>
              )}
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.9rem"
                  height="1.9rem"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M0 0h24v24H0z" />
                    <path
                      fill="currentColor"
                      d="M2 5v14c0 .86 1.012 1.318 1.659.753l8-7a1 1 0 0 0 0-1.506l-8-7C3.012 3.682 2 4.141 2 5zm11 0v14c0 .86 1.012 1.318 1.659.753l8-7a1 1 0 0 0 0-1.506l-8-7C14.012 3.682 13 4.141 13 5z"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {showModal && (
          <Modal showModal={showModal} setShowModal={setShowModal}>
            <PlayerFull audioRef={audioRef} />
          </Modal>
        )}
      </>
    );
  }
}
