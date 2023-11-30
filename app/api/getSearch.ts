export default async function getSearch(q: string) {
  if (localStorage.getItem("access_token")) {
    const token = localStorage.getItem("access_token");
    const searchResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${q}&type=album%2Cartist%2Cplaylist%2Ctrack%2Cshow%2Cepisode%2Caudiobook`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const search = await searchResponse.json()
    // console.log(search)
    return search
  }
}
