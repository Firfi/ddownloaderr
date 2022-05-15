import { Meta } from '../../types/meta';

const formatSite = (s: string) => {
  const url = new URL(s); // valid
  return url.href
    .substring(url.protocol.length + '//'.length)
    .replace(/\/$/, '');
};

export const formatMeta = (m: Meta): string => `
  site: ${formatSite(m.url)}
  num_links: ${m.links}
  images: ${m.images}
  last_fetch: ${Math.round(m.lastFetch.getTime() / 1000)}
`;

export const formatMetas = (ms: Meta[]) => ms.map(formatMeta).join('\n');
