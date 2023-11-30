async function getPlaylist(id: string) {
    if (localStorage.getItem("access_token")) {
      const token = localStorage.getItem("access_token");
      try {
        const playlistResponse = await fetch(
          `https://api.spotify.com/v1/albums/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const playlist = await playlistResponse.json();
        return playlist;
      } catch (error) {
        console.log("Error al obtener la playlist:", error);
      }
    }
  }
  
  export default getPlaylist;
  