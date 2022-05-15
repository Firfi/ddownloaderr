export const slugifyUrl = (url: URL) =>
  url.href.replace(/[^a-z0-9]/gi, '_').toLowerCase();
