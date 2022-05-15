import { getMetas } from '../../meta/db';
import { formatMetas } from './format';

export const runGetMeta = async (urls: URL[]) => {
  const metas = await getMetas(urls.map(url => url.href));
  return formatMetas(metas);
}