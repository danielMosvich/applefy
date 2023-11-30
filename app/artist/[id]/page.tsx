"use client";
import getArtist from "@/app/api/getArtist";
import ArtistTrackList from "@/app/components/artistTracksList";
import { DataProps } from "@/app/types/artist/DataProps";
import { Item } from "@/app/types/artist/artistAlbums";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./flickity.css";
import { Pagination } from "swiper/modules";
import { usePlayerStore } from "@/app/store/player";
import { useRouter } from "next/navigation";
interface ArtistParamsProps {
  params: { id: string };
}
export interface latestAlbumProps {
  album_group: string;
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface ExternalUrls {
  spotify: string;
}

interface Image {
  height: number;
  url: string;
  width: number;
}

export default function Artist({ params }: ArtistParamsProps) {
  const { song } = usePlayerStore();
  const { push } = useRouter();
  const [data, setData] = useState<DataProps | null>();
  const [latestAlbum, setlatestAlbum] = useState<latestAlbumProps | null>(null);
  const [albums, setAlbums] = useState<latestAlbumProps[] | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const { id } = params;

  // function obtenerAlbumMasCercano(albums: Item[], name: string): Item | null {
  //   const fechaActual = new Date();

  //   // Filtrar los álbumes que tienen una fecha de lanzamiento válida y cuyo primer artista coincide con 'name'
  //   const albumsValidos = albums.filter(
  //     (album) => album.release_date_precision === "day" && album.artists[0].name === name
  //   );

  //   // Ordenar los álbumes por fecha de lanzamiento de forma ascendente
  //   albumsValidos.sort(
  //     (a, b) =>
  //       new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
  //   );

  //   // Encontrar el álbum con la fecha más cercana a la actual
  //   let albumMasCercano: Item | null = null;
  //   let diferenciaMinima = Infinity;

  //   albumsValidos.forEach((album) => {
  //     const fechaAlbum = new Date(album.release_date);
  //     const diferencia = Math.abs(fechaActual.getTime() - fechaAlbum.getTime());

  //     if (diferencia < diferenciaMinima) {
  //       diferenciaMinima = diferencia;
  //       albumMasCercano = album;
  //     }
  //   });

  //   return albumMasCercano;
  // }
  function obtenerAlbumMasCercano(albums: Item[], name: string): Item | null {
    const fechaActual = new Date();

    // Filtrar los álbumes que tienen una fecha de lanzamiento válida y cuyo primer o segundo artista coincide con 'name'
    const albumsValidos = albums.filter(
      (album) =>
        album.release_date_precision === "day" &&
        (album.artists[0]?.name === name || album.artists[1]?.name === name)
    );

    // Ordenar los álbumes por fecha de lanzamiento de forma ascendente
    albumsValidos.sort(
      (a, b) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
    );

    // Encontrar el álbum con la fecha más cercana a la actual
    let albumMasCercano: Item | null = null;
    let diferenciaMinima = Infinity;

    albumsValidos.forEach((album) => {
      const fechaAlbum = new Date(album.release_date);
      const diferencia = Math.abs(fechaActual.getTime() - fechaAlbum.getTime());

      if (diferencia < diferenciaMinima) {
        diferenciaMinima = diferencia;
        albumMasCercano = album;
      }
    });

    return albumMasCercano;
  }

  function formatearFecha(inputFecha: string): string {
    // Parsear la cadena de fecha
    const partesFecha = inputFecha.split("-");
    const fecha = new Date(
      parseInt(partesFecha[0]),
      parseInt(partesFecha[1]) - 1,
      parseInt(partesFecha[2])
    );

    // Obtener el nombre abreviado del mes
    const mesesAbreviados: string[] = [
      "ENE",
      "FEB",
      "MAR",
      "ABR",
      "MAY",
      "JUN",
      "JUL",
      "AGO",
      "SEP",
      "OCT",
      "NOV",
      "DIC",
    ];
    const mesAbreviado: string = mesesAbreviados[fecha.getMonth()];

    // Formatear la fecha según el formato deseado
    const fechaFormateada: string = `${fecha.getDate()} ${mesAbreviado} ${fecha.getFullYear()}`;

    return fechaFormateada;
  }
  function checkLenghtTracks(tracks: number) {
    if (tracks > 1) {
      return "canciones";
    } else {
      return "cancion";
    }
  }
  function formatAlbumTitle(albumName: string, albumType: string): string {
    if (albumType === "single") {
      return `${albumName} - Single`;
    } else {
      return albumName;
    }
  }
  function handleScroll() {
    setScrollY(window.scrollY);
  }
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
  function filterAlbums(
    albums: latestAlbumProps[],
    name: string
  ): latestAlbumProps[] {
    return albums.filter(
      (album) => album.album_type === "album" && album.artists[0].name === name
    );
  }
  useEffect(() => {
    if (id) {
      getArtist(id)
        .then((res) => {
          if (res) {
            setlatestAlbum(
              obtenerAlbumMasCercano(res.artistAlbums.items, res.artist.name)
            );
            if (
              filterAlbums(res.artistAlbums.items, res.artist.name).length > 0
            ) {
              setAlbums(filterAlbums(res.artistAlbums.items, res.artist.name));
            }
          }
          setData(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return data ? (
    <div className=" w-full min-h-screen pt-[390px]">
      {data.artist.images && (
        <div
          style={{
            // objectPosition: "center center",
            transform: `translateY(-${scrollY * 0.3}px)`,
          }}
          className="w-full flex flex-col bg-green-200  max-h-[390px] h-[390px] overflow-hidden fixed z-10 top-0 transition-none"
        >
          <Image
            className="w-full h-full object-cover"
            unoptimized
            width={0}
            height={0}
            src={data.artist.images[0].url}
            alt={`${data.artist.name}` + "picture"}
          />
        </div>
      )}
      {/* recomended album / single */}
      <section
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 100%)",
        }}
        className="z-20 absolute top-0 left-0 w-full bg-red-500 h-[390px] flex items-end p-5"
      >
        <h2 className=" text-4xl font-bold text-white z-20 ">
          {data.artist.name}
        </h2>
      </section>
      {latestAlbum && (
        <section className="p-5 z-20 relative bg-white flex gap-4">
          <Image
            className="w-[110px] h-[110px] rounded-lg ring-1 ring-neutral-300"
            unoptimized
            src={latestAlbum.images[1].url}
            width={110}
            height={110}
            alt="xd"
          />
          <div className=" flex flex-col justify-start ">
            <div>
              <p className="text-xs font-[500] text-neutral-500">
                {formatearFecha(String(latestAlbum.release_date))}
              </p>
              <h3 className="font-[500]">
                {formatAlbumTitle(latestAlbum.name, latestAlbum.album_type)}
              </h3>

              {formatAlbumTitle(latestAlbum.name, latestAlbum.album_type)
                .length <= 25 && (
                <p className="text-neutral-500">
                  {String(latestAlbum.total_tracks)}{" "}
                  {checkLenghtTracks(latestAlbum.total_tracks)}
                </p>
              )}
            </div>
            <button className="text-rose-500 flex gap-1 items-center bg-gray-100 w-fit py-[3px] px-2 pr-3 rounded-full text-[15px] font-[600] mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 512 512"
              >
                <path
                  d="M417.4 224H288V94.6c0-16.9-14.3-30.6-32-30.6s-32 13.7-32 30.6V224H94.6C77.7 224 64 238.3 64 256s13.7 32 30.6 32H224v129.4c0 16.9 14.3 30.6 32 30.6s32-13.7 32-30.6V288h129.4c16.9 0 30.6-14.3 30.6-32s-13.7-32-30.6-32z"
                  fill="currentColor"
                />
              </svg>
              <span>Agregar</span>
            </button>
          </div>
        </section>
      )}
      {/* TOP TRACKS */}
      <section className="relative z-20 bg-white">
        <h3 className="text-2xl font-[700] mb-3 px-5">Top canciones</h3>
        <ul className="flex flex-col">
          <Swiper
            className="mySwiper w-full h-fit"
            slidesPerView={"auto"}
            slidesOffsetBefore={-30}
          >
            <SwiperSlide className="pl-[50px] w-fit">
              {data.artistTopSongs.tracks.map(
                (e, i) =>
                  i < 5 && (
                    <div key={e.id + i} className="">
                      <ArtistTrackList data={e} />
                    </div>
                  )
              )}
            </SwiperSlide>
            <SwiperSlide className="w-fit px-5">
              {data.artistTopSongs.tracks.map(
                (e, i) => i >= 5 && <ArtistTrackList key={e.id + i} data={e} />
              )}
            </SwiperSlide>
          </Swiper>
        </ul>
      </section>

      {albums && (
        <section className="bg-white z-20 relative">
          <h3 className="text-2xl font-[700] pt-10 pb-3  px-5">Albums</h3>
          <ul className="">
            <Swiper
              slidesPerView={2}
              spaceBetween={10}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="mySwiper swiperAlbum "
              freeMode={true}
              style={{ padding: "0 20px" }}
            >
              {albums.map(
                (e, i) =>
                  e.album_type === "album" && (
                    <SwiperSlide
                      className="SwiperSlideAlbum"
                      key={e.id + i}
                      onClick={() => push(`/album/${e.id}`)}
                    >
                      <Image
                        className="w-full rounded-lg ring-1 ring-neutral-300"
                        unoptimized
                        src={e.images[1].url}
                        width={160}
                        height={160}
                        alt=""
                      />
                      <h3 className="mt-2 font-[450] text-base">{e.name}</h3>
                      {e.name.length <= 22 && (
                        <h3 className="font-[450] text-sm text-neutral-500">
                          {getYearFromDate(String(e.release_date))}
                        </h3>
                      )}
                    </SwiperSlide>
                  )
              )}
            </Swiper>
          </ul>
        </section>
      )}
      <section className="pb-10 bg-white z-20 relative">
        <h3 className="text-2xl font-[700] pt-10 pb-3  px-5">Sencillos y EP</h3>
        <ul className="">
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper swiperAlbum"
            freeMode={true}
            style={{ padding: "0 20px" }}
          >
            {data.artistAlbums.items.map(
              (e, i) =>
                e.album_type === "single" && (
                  <SwiperSlide
                    className="SwiperSlideAlbum"
                    key={e.id + i}
                    onClick={() => {
                      push(`/album/${e.id}`);
                    }}
                  >
                    <Image
                      className="w-full rounded-lg ring-1 ring-neutral-300"
                      unoptimized
                      src={e.images[1].url}
                      width={160}
                      height={160}
                      alt=""
                    />
                    <h3 className="mt-2 font-[450] text-base">
                      {formatAlbumTitle(e.name, e.album_type)}
                    </h3>
                    {e.name.length <= 19 && (
                      <h3 className="font-[450] text-sm text-neutral-500">
                        {getYearFromDate(String(e.release_date))}
                      </h3>
                    )}
                  </SwiperSlide>
                )
            )}
          </Swiper>
        </ul>
      </section>

      <section
        className="bg-gray-100 h-full pt-5"
        style={{ paddingBottom: song ? "180px" : "120px" }}
      >
        <h3 className="text-2xl font-[700] pb-5  px-5">Artistas similares</h3>
        <ul className="flex">
          <Swiper
            slidesPerView={3}
            spaceBetween={10}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper swiperAlbum"
            freeMode={true}
            style={{ padding: "0 20px" }}
          >
            {data.relatedArtists.artists.map((e, i) => (
              <SwiperSlide
                key={e.id + "relatedaArtists"}
                className=""
                onClick={() => {
                  push(`/artist/${e.id}`);
                }}
              >
                <Image
                  className="rounded-full w-full h-fit max-h-[110px]  shadow-sm object-cover"
                  unoptimized
                  src={e.images[1].url}
                  width={105}
                  height={105}
                  alt="xd"
                />
                <h3 className="font-[500] text-center text-sm mt-2">
                  {e.name}
                </h3>
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      </section>
    </div>
  ) : (
    <div>loading</div>
  );
}
