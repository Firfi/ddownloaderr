import { downloadRoot } from '../download/root';
import { parse, substituteStatics } from '../parser';
import { fetchStatics } from '../download/statics';
import { saveFiles } from '../file/save';

export const runDownload = async (url: URL) => {
  const body = await downloadRoot(url);
  const now = new Date();
  const page = parse(body);
  const statics = await fetchStatics(url, page);
  substituteStatics(url, page, statics);
  await saveFiles(url, page, statics);
}