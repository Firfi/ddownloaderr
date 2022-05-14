import { download } from './index';
import { PageLens } from '../parser';
import { tryStaticSrc } from '../srcs';

const downloadStatics = async (url: URL): Promise<null | ArrayBuffer> =>
  (await download(url, false))?.arrayBuffer() || null;

export type Statics = Map<string, {
  mapped: URL;
  buffer: ArrayBuffer;
}>;

export const fetchStatics = async (root: URL, page: PageLens): Promise<Statics> => {
  // dedupe and filter not acceptable urls
  const srcToMapped = new Map(page.peekSrcs().map(({src}) => [src, tryStaticSrc(root, src)] as const).filter(([_, url]) => !!url));
  return new Map((await Promise.all([...srcToMapped.entries()].map(async ([src, mapped]) => {
    const buffer = await downloadStatics(mapped);
    if (!buffer) {
      console.log(`Failed to download statics ${mapped.href}`);
      return null;
    }
    return [src, { mapped, buffer }] as const;
  }))).filter(Boolean));
}