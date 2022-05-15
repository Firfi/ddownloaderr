export interface MetaUpdateCounts {
  links: number,
  images: number,
}

export interface MetaUpdate extends MetaUpdateCounts {
  url: string, // not an url for convenience, but a valid url anyways
}

export interface Meta extends MetaUpdate {
  lastFetch: Date, // being set in DB currently, we may want to fine tune it and set programmatically
}