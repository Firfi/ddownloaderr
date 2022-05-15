export const tryStaticSrc = (root: URL, src: string): URL | null => {
  let httpUrl: URL;
  try {
    const url = new URL(src);
    if (url.protocol.startsWith('http') && url.hostname === root.hostname) {
      httpUrl = url;
    }
  } catch (e) {
    // try relative
    try {
      httpUrl = new URL(src, root.href);
    } catch (e) {
      return null;
    }
  }
  return httpUrl;
};
