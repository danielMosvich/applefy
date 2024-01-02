// import  from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import { EffectCreative } from "swiper/modules";
import { SetStateAction, useEffect, useState } from "react";
import getLibrary from "@/app/api/getLibrary";
import { PlaylistsProps } from "./PlaylistProps";
import Image from "next/image";
import Card from "./card";
import { FollowsProps } from "./FollowsProps";
import ArtistCard from "./ArtistCard";
import { useRouter } from "next/navigation";
export default function LogoutPage({
  setLogin,
}: {
  setLogin: React.Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [playlists, setPlaylists] = useState<null | PlaylistsProps[]>(null);
  const [follows, setFollows] = useState<null | FollowsProps[]>(null);
  // onClick={() => {
  //     localStorage.clear();
  //     setLogin(false);
  //   }}
  function logOut() {
    localStorage.clear();
    setLogin(false);
  }
  useEffect(() => {
    getLibrary().then((res) => {
      console.log(res);
      if (res?.playlists?.items) {
        setPlaylists(res?.playlists?.items);
      }
      if (res?.follows?.items) {
        setFollows(res?.follows?.items);
      }
    });
  }, []);
  return (
    <div className="flex flex-col gap-6 pb-40">
      <h2 className="font-bold text-3xl">Escuchar ahora</h2>
      {playlists && (
        <div className="grid grid-cols-2 gap-3">
          {playlists.map((e, i) => (
            <Card
              key={i + e.id + "little card"}
              title={e.name}
              img={e.images[0].url}
              id={e.id}
            />
          ))}
        </div>
      )}
      {follows &&
        follows.map((e, i) => {
          if (i < 3) {
            return (
              <ArtistCard
                key={e.id + i + "littlecard"}
                name={e.name}
                img={e.images[1].url}
                id={e.id}
              />
            );
          }
        })}

      
    </div>
  );
}
