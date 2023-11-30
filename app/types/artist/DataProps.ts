import { ArtistAlbums } from "./artistAlbums";
import { ArtistProps } from "./artistProps";
import { ArtistTopSongs } from "./artistTopSongs";
import { RelatedArtists } from "./relatedArtists";

export interface DataProps {
  artist: ArtistProps;
  artistTopSongs: ArtistTopSongs;
  artistAlbums: ArtistAlbums;
  relatedArtists: RelatedArtists;
}
