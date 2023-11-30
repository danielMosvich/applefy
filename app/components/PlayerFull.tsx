"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { usePlayerStore } from "../store/player";

import { usePalette } from "color-thief-react";
import { RefObject, useEffect, useRef } from "react";
import { Slider } from "@nextui-org/react";
import VolumeBar from "./VolumeBar";
import LinearGradientSlider from "./LinearGradientSlider";

type PlayerFullProps = {
  audioRef: RefObject<HTMLAudioElement>;
};
export default function PlayerFull({ audioRef }: PlayerFullProps) {
  const { song, imageHD, image, name, artists, playGlobal, setPlayGlobal } =
    usePlayerStore();
  const { data, loading, error } = usePalette(image, 5, "hex", {
    crossOrigin: "https://i.scdn.co/",
  });
  const modal = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  if (song) {
    return (
      <motion.div
        onClick={(e) => e.stopPropagation()}
        ref={modal}
        initial={{ scale: 0, y: 300, height: 80 }}
        animate={{ scale: 1.01, y: 0, height: "100vh" }}
        transition={{
          type: "spring",
          duration: 0.5,
        }}
        className="w-full h-screen bottom-0 fixed"
      >
        <div
          className="w-full h-full fixed top-0 left-0"
          style={
            data && {
              background: `linear-gradient(0deg, ${data[0]} 0%, ${data[0]} 30%, ${data[0]} 100%)`,
              filter: "brightness(0.45)",
            }
          }
        >
          {data && (
            <Image
              className="w-full h-full object-cover animate-fade-blur  opacity-50"
              unoptimized
              src={imageHD}
              alt="xd"
              width={100}
              height={100}
            />
          )}
        </div>
        <div className="w-full h-full fixed top-0 left-0 p-8 pt-0">
          <div className="w-12 text-red-50 bg-gray-50/50 h-1 rounded-full mx-auto mb-16 mt-5">
            {}
          </div>
          <Image
            className="w-full object-cover rounded-lg shadow-lg"
            src={imageHD}
            unoptimized
            alt="xd"
            width={640}
            height={640}
          />
          <div className="mt-10">
            <h2 className="text-xl font-[500] text-white">{name}</h2>
            <h3 className="text-lg font-[400] text-white/70">{artists}</h3>
          </div>
          {/* buttons */}
          <div className="flex gap-10 justify-center mt-10">
            <button className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3rem"
                height="3rem"
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
                    d="m20.341 4.247l-8 7a1 1 0 0 0 0 1.506l8 7c.647.565 1.659.106 1.659-.753V5c0-.86-1.012-1.318-1.659-.753zm-11 0l-8 7a1 1 0 0 0 0 1.506l8 7C9.988 20.318 11 19.859 11 19V5c0-.86-1.012-1.318-1.659-.753z"
                  />
                </g>
              </svg>
            </button>
            {playGlobal ? (
              <button
                onClick={() => {
                  if (audioRef.current) {
                    setPlayGlobal(false), audioRef.current.pause();
                  }
                }}
                className="text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3.5rem"
                  height="3.5rem"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M5.746 3a1.75 1.75 0 0 0-1.75 1.75v14.5c0 .966.784 1.75 1.75 1.75h3.5a1.75 1.75 0 0 0 1.75-1.75V4.75A1.75 1.75 0 0 0 9.246 3h-3.5Zm9 0a1.75 1.75 0 0 0-1.75 1.75v14.5c0 .966.784 1.75 1.75 1.75h3.5a1.75 1.75 0 0 0 1.75-1.75V4.75A1.75 1.75 0 0 0 18.246 3h-3.5Z"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => {
                  if (audioRef.current) {
                    setPlayGlobal(true), audioRef.current.play();
                  }
                }}
                className="text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3.5rem"
                  height="3.5rem"
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
                      d="M6 4v16a1 1 0 0 0 1.524.852l13-8a1 1 0 0 0 0-1.704l-13-8A1 1 0 0 0 6 4z"
                    />
                  </g>
                </svg>
              </button>
            )}
            <button className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3rem"
                height="3rem"
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
          <div className="mt-10">
            {/* <VolumeBar audioRef={audioRef} /> */}

            <LinearGradientSlider  audioRef={audioRef}/>
          </div>
        </div>
      </motion.div>
    );
  }
}
