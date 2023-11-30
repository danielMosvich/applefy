// import { create } from "zustand";

// export const usePlayerStore = create((set) => ({
//   playGlobal: true,
//   volume: 0.1,
//   imageHD: "",
//   song: "",
//   name: "",
//   artists: "",
//   image: "",
//   changeSong: (newSong) => set(() => ({ song: newSong, play: true })),
//   changeName: (newName) => set(() => ({ name: newName, play: true })),
//   changeArtists: (newArtists) =>
//     set(() => ({ artists: newArtists, play: true })),
//   changeImage: (newImage) => set(() => ({ image: newImage, play: true })),
//   changeImageHD: (newImageHD) =>
//     set(() => ({ imageHD: newImageHD, play: true })),

//   setPlayGlobal: (value) => set(() => ({ playGlobal: value })),
//   changeVolume: (newVolume) => set(() => ({ volume: newVolume })),
// }));
// player.ts
import { create } from "zustand";
import { PlayerProps } from "./playerProps";
import { Track } from "../types/artist/artistTopSongs";

interface PlayerStore {
  playGlobal: boolean;
  volume: number;
  imageHD: string;
  song: string;
  name: string;
  artists: string;
  image: string;
  changeSong: (newSong: string) => void;
  changeName: (newName: string) => void;
  changeArtists: (newArtists: string) => void;
  changeImage: (newImage: string) => void;
  changeImageHD: (newImageHD: string) => void;
  setPlayGlobal: (value: boolean) => void;
  changeVolume: (newVolume: number) => void;
  changePlayer: (item: PlayerProps | Track) => void;
  changePlayerFromAlbum: (data: PlayerAlbumProps) => void;
}

export interface PlayerAlbumProps {
  images: Image[];
  data: Data;
}

export interface Data {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

function convertirArrayATexto(array: { name: string }[]) {
  const nombres = array.map((obj) => obj.name);
  return nombres.join(", ");
}
export const usePlayerStore = create<PlayerStore>((set) => ({
  playGlobal: true,
  volume: 0.1,
  imageHD: "",
  song: "",
  name: "",
  artists: "",
  image: "",
  changeSong: (newSong) => set(() => ({ song: newSong, play: true })),
  changeName: (newName) => set(() => ({ name: newName, play: true })),
  changeArtists: (newArtists) =>
    set(() => ({ artists: newArtists, play: true })),
  changeImage: (newImage) => set(() => ({ image: newImage, play: true })),
  changeImageHD: (newImageHD) =>
    set(() => ({ imageHD: newImageHD, play: true })),
  setPlayGlobal: (value) => set(() => ({ playGlobal: value })),
  changeVolume: (newVolume) => set(() => ({ volume: newVolume })),
  changePlayer: (item) =>
    set({
      song: item.preview_url || "",
      image: item.album.images[2]?.url || "",
      imageHD: item.album.images[0]?.url || "",
      name: item.name || "",
      artists: convertirArrayATexto(item.artists) || "",
    }),
  changePlayerFromAlbum: (item: PlayerAlbumProps) =>
    set(() => ({
      song: item.data.preview_url || "",
      image: item.images[2]?.url || "",
      imageHD: item.images[0]?.url || "",
      name: item.data.name || "",
      artists: convertirArrayATexto(item.data.artists) || "",
    })),
}));

// En tu componente
// import { usePlayerStore } from './player';

// export const {
//   playGlobal,
//   volume,
//   imageHD,
//   song,
//   name,
//   artists,
//   image,
//   changeSong,
//   changeName,
//   changeArtists,
//   changeImage,
//   changeImageHD,
//   setPlayGlobal,
//   changeVolume,
// } = usePlayerStore;

// Ahora puedes usar estas variables y funciones directamente en tu componente
