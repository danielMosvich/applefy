// async function getArtist(id: string) {
//   if (localStorage.getItem("access_token")) {
//     const token = localStorage.getItem("access_token");
//     try {
//       const artistResponse = await fetch(
//         `https://api.spotify.com/v1/artists/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const artistTopSongsResponse = await fetch(
//         `https://api.spotify.com/v1/artists/${id}/top-tracks`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const artistAlbumsResponse = await fetch(
//         `https://api.spotify.com/v1/artists/${id}/albums`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const relatedArtistsResponse = await fetch(
//         `https://api.spotify.com/v1/artists/${id}/related-artists`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

import { ArtistAlbums } from "../types/artist/artistAlbums";
import { ArtistProps } from "../types/artist/artistProps";
import { ArtistTopSongs } from "../types/artist/artistTopSongs";
import { RelatedArtists } from "../types/artist/relatedArtists";

// import { ArtistAlbums, ArtistTopSongs, DataPropsArtist, RelatedArtists } from "../types/artist/artistProps";

//       const artist = await artistResponse.json();
//       const artistTopSongs = await artistTopSongsResponse.json();
//       const artistAlbums = await artistAlbumsResponse.json();
//       const relatedArtists = await relatedArtistsResponse.json();

//       return {
//         artist,
//         artistTopSongs,
//         artistAlbums,
//         relatedArtists,
//       };
//     } catch (error) {
//       console.log("Error al obtener la playlist:", error);
//     }
//   }
// }

// export default getArtist;
async function getArtist(id: string) {
  if (localStorage.getItem("access_token")) {
    const token = localStorage.getItem("access_token");
    try {
      const [
        artistResponse,
        artistTopSongsResponse,
        artistAlbumsResponse,
        relatedArtistsResponse,
      ] = await Promise.all([
        fetch(`https://api.spotify.com/v1/artists/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch(`https://api.spotify.com/v1/artists/${id}/albums?limit=50`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const artist: ArtistProps = await artistResponse.json();
      const artistAlbums: ArtistAlbums = await artistAlbumsResponse.json();
      const artistTopSongs: ArtistTopSongs = await artistTopSongsResponse.json();
      const relatedArtists: RelatedArtists = await relatedArtistsResponse.json();

      return {
        artist,
        artistTopSongs,
        artistAlbums,
        relatedArtists,
      };
    } catch (error) {
      console.log("Error al obtener la información:", error);
    }
  }
}

export default getArtist;
