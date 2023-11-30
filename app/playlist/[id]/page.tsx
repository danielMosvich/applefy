"use client";
import getPlaylist from "@/app/api/getPlaylist";
import { PlaylistTrackListProps } from "@/app/components/PlaylistTracksProps";
import PlaylistTrackList from "@/app/components/playlistTrackList";
import { usePlayerStore } from "@/app/store/player";
import { error } from "console";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface paramsProps {
  params: { id: string };
}
interface dataProps {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  followers: { href: string | null; total: number };
  href: string;
  id: string;
  images: {
    url: string;
    height: number | null;
    width: number | null;
  }[];
  name: string;
  owner: {
    display_name: string;
    external_urls: { spotify: string };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    items: PlaylistTrackListProps[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
  type: string;
  uri: string;
}

type songProps = {
  added_at: string;
  added_by: {
    external_url: { spotify: string };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  primary_color: null;
  track: {
    album: {
      album_type: string;
      artist: {
        external_urls: { spotify: string };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }[];
      available_markets: [];
      external_urls: { spotify: string };
      href: string;
      id: string;
      images: {
        height: number | null;
        width: number | null;
        url: string;
      }[];
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: {
      external_urls: { spotify: string };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    available_markets: [];
    disc_number: number;
    duration_ms: number;
    episode: boolean;
    explicit: boolean;
    external_ids: { isrc: string };
    external_urls: { spotify: string };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track: boolean;
    track_number: number;
    type: string;
    uri: string;
  };
  video_thumbnail: {};
};
export default function Playlist({ params }: paramsProps) {
  const { changeSong, changeImage, changeImageHD, changeName, changeArtists } =
    usePlayerStore();

  const { id }: { id: string } = params;
  const [data, setData] = useState<dataProps | null>(null);

  // function handleSong(data: songProps) {
  //   changeImage(data.track.album.images[2].url);
  //   changeImageHD(data.track.album.images[0].url);
  //   changeSong(data.track.preview_url);
  //   changeName(data.track.name);
  //   changeArtists(convertirArrayATexto(data.track.artists));
  // }
  useEffect(() => {
    if (id) {
      getPlaylist(id)
        .then((res) => {
          console.log(res);
          setData(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);
  return data ? (
    <div className="px-5 py-20">
      <div>
        <Image
          unoptimized
          width={300}
          height={300}
          alt="xd"
          className="aspect-square w-[250px] mx-auto rounded-md shadow-2xl"
          src={data.images[0].url}
        />
      </div>
      <div className="flex flex-col justify-center mt-5">
        <h2 className="font-[600]  text-2xl text-center">{data.name}</h2>
        <h2 className="font-[600] text-rose-500 text-xl text-center">
          {data.owner.display_name}
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
      {/* songs */}
      <div className="mt-5 pt-2 flex flex-col gap-1">
        {/* {data.tracks.items.map((e, i) => {
          if (e.is_local) {
            return;
          } else {
            return (
              <div
                key={e.track.id}
                className="flex gap-3 cursor-pointer"
                onClick={() => handleSong(e)}
              >
                {e.track.album.images[2].url ? (
                  <Image
                    unoptimized
                    className="w-12 h-12 rounded-md"
                    src={e.track.album.images[2]?.url}
                    width={48}
                    height={48}
                    alt="xd"
                  />
                ) : (
                  <div className="min-w-[48px] rounded-md min-h-[48px] bg-neutral-700"></div>
                )}
                <div
                  className="w-full overflow-hidden pb-2"
                  style={{ borderBottom: "1px solid rgb(0 0 0 / 0.1) " }}
                >
                  <h2 className="font-[500] whitespace-nowrap overflow-hidden text-ellipsis">
                    {e.track.name}
                  </h2>
                  <h2 className="flex gap-1 font-[500] text-sm text-black/60 whitespace-nowrap overflow-hidden text-ellipsis ">
                    {e.track.artists.length === 1
                      ? e.track.artists[0].name
                      : convertirArrayATexto(e.track.artists)}
                  </h2>
                </div>
              </div>
            );
          }
        })} */}
        <ul>
          {data.tracks.items.map(
            (e, i) =>
              !e.is_local && (
                <PlaylistTrackList key={e.track.id + "playlistSong"} data={e} />
              )
          )}
        </ul>
      </div>
      {/* <div className="loader shadow-2xl">loading</div> */}
    </div>
  ) : (
    <div className="loader shadow-2xl text-rose-500 font-[600] text-2xl uppercase">
      loading...
    </div>
  );
}
