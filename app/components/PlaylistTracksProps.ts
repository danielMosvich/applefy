export interface PlaylistTrackListProps {
    added_at:        Date;
    primary_color:   null;
    video_thumbnail: VideoThumbnail;
    is_local:        boolean;
    added_by:        AddedBy;
    track:           Track;
}

export interface AddedBy {
    external_urls: ExternalUrls;
    id:            string;
    type:          string;
    uri:           string;
    href:          string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Track {
    preview_url:       string;
    available_markets: string[];
    explicit:          boolean;
    type:              string;
    episode:           boolean;
    track:             boolean;
    album:             Album;
    artists:           Artist[];
    disc_number:       number;
    track_number:      number;
    duration_ms:       number;
    external_ids:      ExternalIDS;
    external_urls:     ExternalUrls;
    href:              string;
    id:                string;
    name:              string;
    popularity:        number;
    uri:               string;
    is_local:          boolean;
}

export interface Album {
    available_markets:      string[];
    type:                   string;
    album_type:             string;
    href:                   string;
    id:                     string;
    images:                 Image[];
    name:                   string;
    release_date:           string;
    release_date_precision: string;
    uri:                    string;
    artists:                Artist[];
    external_urls:          ExternalUrls;
    total_tracks:           number;
}

export interface Artist {
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    name:          string;
    type:          string;
    uri:           string;
}

export interface Image {
    url:    string;
    width:  number;
    height: number;
}

export interface ExternalIDS {
    isrc: string;
}

export interface VideoThumbnail {
    url: null;
}
