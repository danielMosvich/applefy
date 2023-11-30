"use client";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function Sidebar() {
  const { push } = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      let tokenLocal = localStorage.getItem("access_token") as string;
      setToken(tokenLocal);
    }
  }, []);
  useEffect(() => {
    console.log(
      Math.floor(Date.now()) -
        Math.floor(Number(localStorage.getItem("last_update")))
    );
    const valorAntiguo = Math.floor(
      Number(localStorage.getItem("last_update"))
    );
    const valorActual = Math.floor(Date.now() / 1000);
    const diferenciaEnSegundos = valorActual - valorAntiguo;
    console.log("tiempo transcurrido", diferenciaEnSegundos);
    if (diferenciaEnSegundos >= 3500) {
      console.log("Ha pasado una hora o más desde el valor antiguo.");
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken: localStorage.getItem("refresh_token"),
        })
        .then((res) => {
          console.log("REFRESH DATA");
          console.log(res.data);
          localStorage.setItem("access_token", res.data.accessToken);
          localStorage.setItem(
            "last_update",
            JSON.stringify(Date.now() / 1000)
          );
        });
    } else {
      console.log("No ha pasado una hora desde el valor antiguo.");
    }
  }, [pathname]);
  return (
    <div
      className={`w-full h-20 fixed bottom-0 grid grid-cols-3 z-40 bg-white/60 backdrop-blur-2xl`}
    >
      <div
        onClick={() => {
          push("/");
        }}
        className={`cursor-pointer flex justify-center items-center flex-col gap-1 font-[500] ${
          pathname === "/" ? "text-rose-500" : "text-neutral-500"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2rem"
          height="2rem"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M2.335 7.875c-.54 1.127-.35 2.446.03 5.083l.278 1.937c.487 3.388.731 5.081 1.906 6.093C5.724 22 7.447 22 10.894 22h2.212c3.447 0 5.17 0 6.345-1.012c1.175-1.012 1.419-2.705 1.906-6.093l.279-1.937c.38-2.637.57-3.956.029-5.083c-.54-1.127-1.691-1.813-3.992-3.183l-1.385-.825C14.2 2.622 13.154 2 12 2c-1.154 0-2.199.622-4.288 1.867l-1.385.825c-2.3 1.37-3.451 2.056-3.992 3.183ZM8.25 18a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>
        <label className="text-sm">Inicio</label>
      </div>
      <div
        onClick={() => {
          push("/search");
        }}
        className={`cursor-pointer flex justify-center items-center flex-col gap-1 font-[500] ${
          pathname === "/search" ? "text-rose-500" : "text-neutral-500"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2rem"
          height="2rem"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m18.031 16.617l4.283 4.282l-1.415 1.415l-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9s9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617Zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.867-3.133-7-7-7s-7 3.133-7 7s3.133 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15Z"
          />
        </svg>
        <label className="text-sm">Buscar</label>
      </div>
      <div
        onClick={() => {
          push("/library");
        }}
        className={`cursor-pointer flex justify-center items-center flex-col gap-1 font-[500] ${
          pathname === "/library" ? "text-rose-500" : "text-neutral-500"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2rem"
          height="2rem"
          viewBox="0 0 24 24"
        >
          <g fill="currentColor">
            <path d="M8.51 2h6.98c.232 0 .41 0 .566.015c1.108.109 2.015.775 2.4 1.672H5.544c.385-.897 1.292-1.563 2.4-1.672C8.098 2 8.276 2 8.51 2Zm-2.2 2.723c-1.39 0-2.53.84-2.91 1.954a2.587 2.587 0 0 0-.024.07c.398-.12.813-.2 1.232-.253c1.08-.139 2.446-.139 4.032-.139h6.892c1.586 0 2.951 0 4.032.139c.42.054.834.132 1.232.253a2.173 2.173 0 0 0-.023-.07c-.38-1.114-1.52-1.954-2.911-1.954H6.31ZM11.25 17a.75.75 0 1 0-1.5 0a.75.75 0 0 0 1.5 0Z" />
            <path
              fillRule="evenodd"
              d="M8.672 7.542h6.656c3.374 0 5.062 0 6.01.987c.947.987.724 2.511.278 5.56l-.422 2.892c-.35 2.391-.525 3.587-1.422 4.303c-.897.716-2.22.716-4.867.716h-5.81c-2.646 0-3.97 0-4.867-.716c-.897-.716-1.072-1.912-1.422-4.303l-.422-2.891c-.447-3.05-.67-4.574.278-5.561c.948-.987 2.636-.987 6.01-.987ZM12.75 10.5a.75.75 0 0 0-1.5 0v4.378A2.25 2.25 0 1 0 12.75 17v-3.68c.67.543 1.512.93 2.25.93a.75.75 0 0 0 0-1.5c-.305 0-.886-.219-1.416-.69c-.519-.46-.834-1.021-.834-1.56Z"
              clipRule="evenodd"
            />
          </g>
        </svg>
        <label className="text-sm">Biblioteca</label>
      </div>
    </div>
  );
}
