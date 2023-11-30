import Image from "next/image";
import { Track } from "../types/artist/artistTopSongs";
import { usePlayerStore } from "../store/player";
import { PlaylistTrackListProps } from "./PlaylistTracksProps";
import { PlayerProps } from "../store/playerProps";
import { useRouter } from "next/navigation";

export default function PlaylistTrackList({
  data,
}: {
  data: PlaylistTrackListProps;
}) {
  const { changePlayer } = usePlayerStore();
  const {push} = useRouter()
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
          onClick={(e) => {e.stopPropagation(); push(`/artist/${data.track.artists[0].id}`)}}
        >
          <button className="flex justify-center items-center">
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
        </div>
      </div>
    </li>
  );
}
