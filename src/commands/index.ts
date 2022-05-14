import { runDownload } from './download';

export type Command = "meta" | "download";

const commandHandlers: {[k in Command]: (urls: URL[]) => Promise<String>} = {
  meta: async (urls: URL[]) => {
    // const meta = await Promise.all(urls.map(url => getMeta(url)));
    return JSON.stringify("TODO");
  },
  download: async (urls: URL[]) => {
    const metas = Promise.all(urls.map(runDownload));
    return JSON.stringify(metas);
  },
};

export const runCommand = (command: Command, urls: URL[]) => commandHandlers[command](urls);