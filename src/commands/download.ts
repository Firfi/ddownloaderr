import { downloadRoot } from '../download/root';
import { parse, substituteStatics } from '../parser';
import { fetchStatics } from '../download/statics';
import { saveFiles } from '../file/save';
import { saveMeta } from '../meta/db';
import { getPageMeta } from '../meta';

export const runDownload = async (url: URL) => {
  const body = await downloadRoot(url);
  const page = parse(body);
  const statics = await fetchStatics(url, page);
  substituteStatics(url, page, statics);
  await saveFiles(url, page, statics);
  return saveMeta(getPageMeta(url, page));
}