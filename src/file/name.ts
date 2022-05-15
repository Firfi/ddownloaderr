import path from 'path';

import { slugifyUrl } from '../slugify';
import { hashUrl } from '../hash';

export const siteRootPrefix = (url: URL) =>
  `${slugifyUrl(url)}-${hashUrl(url)}`;
export const staticsDirName = (url: URL) => siteRootPrefix(url) + '_files';
export const staticsFilePath = (root: URL, url: URL): string =>
  `${staticsDirName(root)}/${hashUrl(url)}${tryExtension(url)}`;

// we use extension so browser is more happy to load the file i.e. if it's .css on chrome
const tryExtension = (url: URL): string => {
  const ext = path.extname(url.pathname);
  if (ext) {
    return ext;
  }
  return '';
};
