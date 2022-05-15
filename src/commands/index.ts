import { runDownload } from './download';
import { runGetMeta } from './meta';
import { formatMetas } from './meta/format';

export type Command = 'meta' | 'download';

const commandHandlers: { [k in Command]: (urls: URL[]) => Promise<string> } = {
  meta: runGetMeta,
  download: async (urls: URL[]) => {
    const metas = await Promise.all(urls.map(runDownload));
    return formatMetas(metas);
  },
};

export const runCommand = (command: Command, urls: URL[]) =>
  commandHandlers[command](urls);
