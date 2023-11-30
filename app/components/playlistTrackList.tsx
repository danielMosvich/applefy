import Image from "next/image";
import { usePlayerStore } from "../store/player";
import { PlaylistTrackListProps } from "./PlaylistTracksProps";
import { useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function PlaylistTrackList({
  data,
}: {
  data: PlaylistTrackListProps;
}) {
  const { changePlayer } = usePlayerStore();
  const { push } = useRouter();
  //   console.log(data, "DATA");
  function getYearFromDate(dateString: string): string | null {
    try {
      const [year] = dateString.split("-");
      // Verifica si el resultado es un número válido
      if (!isNaN(Number(year))) {
        return year;
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
  return (
    <li
      className="flex gap-3 items-center min-h-[55px] h-[55px] relative"
      onClick={() => {
        changePlayer(data.track);
        // console.log(data.track)
      }}
    >
      <div className=" h-full flex items-center">
        <Image
          className="rounded-md border-[1px] border-neutral-200 w-[48px] h-[48px] min-w-[48px] min-h-[48px]"
          unoptimized
          src={data.track.album.images[0].url}
          width={48}
          height={48}
          alt="xd"
        />
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 50px" }}
        className=" h-full w-full border-t-[1px] overflow-hidden border-neutral-200 items-center "
      >
        <div className="overflow-hidden flex flex-col ">
          <h3 className="text-base w-full font-[500] overflow-hidden whitespace-nowrap text-ellipsis">
            {data.track.name}
          </h3>
          <h3 className="text-sm w-full text-neutral-500 overflow-hidden whitespace-nowrap text-ellipsis">
            {/* {data.track.album.artists[0].name} */}
            {convertirArrayATexto(data.track.album.artists)}
          </h3>
        </div>
        <div
          className="px-3 h-full w-full flex  "
          onClick={(e) => {
            e.stopPropagation();
            push(`/artist/${data.track.artists[0].id}`);
          }}
        >
          <Dropdown className=""  >
            <DropdownTrigger className="h-full">
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
            </DropdownTrigger>
            {/* XD */}
            <DropdownMenu aria-label="Static Actions" classNames={{}}>
              <DropdownItem
                key="add library"
                endContent={
                  <button className="min-w-[30px] flex justify-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.2rem"
                      height="1.2rem"
                      viewBox="0 0 256 256"
                    >
                      <path
                        fill="currentColor"
                        d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12Z"
                      />
                    </svg>
                  </button>
                }
              >
                <p className="text-base font-[450]">Agregar a la biblioteca</p>
              </DropdownItem>
              <DropdownItem
                key="add playlist"
                showDivider
                endContent={
                  <button className="min-w-[30px] flex justify-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.4rem"
                      height="1.4rem"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M3 16v-2h7v2H3Zm0-4v-2h11v2H3Zm0-4V6h11v2H3Zm13 12v-4h-4v-2h4v-4h2v4h4v2h-4v4h-2Z"
                      />
                    </svg>
                  </button>
                }
              >
                <p className="text-base font-[450]">
                  Agregar a una playlist...
                </p>
              </DropdownItem>
              <DropdownItem
                key="share"
                endContent={
                  <button className="min-w-[30px] flex justify-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.3rem"
                      height="1.3rem"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.7"
                        d="m15 5l-3-3m0 0L9 5m3-3v12M6 9H4v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9h-2"
                      />
                    </svg>
                  </button>
                }
              >
                <p className="text-base font-[450]">Compartir cancion...</p>
              </DropdownItem>
              <DropdownItem
                key="album"
                
                onPress={()=>{push(`/album/${data.track.album.id}`)}}
                endContent={
                  <button className="min-w-[30px] flex justify-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.2rem"
                      height="1.2rem"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M20 2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2m0 14H8V4h12m-7.5 11a2.5 2.5 0 0 0 2.5-2.5V7h3V5h-4v5.5c-.42-.31-.93-.5-1.5-.5a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5M4 6H2v14a2 2 0 0 0 2 2h14v-2H4"
                      />
                    </svg>
                  </button>
                }
              >
                <p className="text-base font-[450]">Ir al album</p>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {/* <button className="flex justify-center items-center">
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
          </button> */}
        </div>
      </div>
    </li>
  );
}
