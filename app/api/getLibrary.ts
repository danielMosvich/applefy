async function getLibrary() {
    let data;
    let playlists;
    let follows;
  
    if (localStorage.getItem("access_token")) {
      const token = localStorage.getItem("access_token");
        
      //get data user
      try {
        const userResponse = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const userData = await userResponse.json();
        const {
          display_name,
          email,
          external_urls,
          followers,
          id,
          images,
          product,
          type,
          uri,
        } = userData;
  
        data = {
          display_name,
          email,
          external_urls,
          followers,
          id,
          images,
          product,
          type,
          uri,
        };
  
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
      //get playlist's user
      try {
        const playlistsResponse = await fetch(`https://api.spotify.com/v1/me/playlists?limit=50`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const userPlaylists = await playlistsResponse.json();
        const { href, items, total } = userPlaylists;
  
        playlists = {
          href,
          items,
          total,
        };
  
      } catch (error) {
        console.error("Error al obtener las listas de reproducción:", error);
      }
      
      //get follow's user
      try {
        const followsResponse = await fetch(`https://api.spotify.com/v1/me/following?type=artist&limit=50`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const followsData = await followsResponse.json();
        const { artists } = followsData;
  
        follows = artists;
  
      } catch (error) {
        console.error("Error al obtener los artistas seguidos:", error);
      }
  
      return { data, playlists, follows };
    }
  }
  
  export default getLibrary;