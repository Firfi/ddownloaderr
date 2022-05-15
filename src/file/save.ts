import  { promises as fsp } from 'fs';
import { Statics } from '../download/statics';
import { siteRootPrefix, staticsDirName, staticsFilePath } from './name';
import { WithBodySlice } from '../parser';

export const FILES_PREFIX = "downloads";

const mkdir = async (dir: string) => {
    try {
        await fsp.mkdir(dir, { recursive: true });
    } catch (e) {
        if (e.code !== 'EEXIST') {
            throw e;
        }
    }
};

export const saveFiles = async (root: URL, page: WithBodySlice, statics: Statics): Promise<void> => {
  const rootPrefix = siteRootPrefix(root);
  const bodyFileName = rootPrefix + ".html";
  await mkdir(FILES_PREFIX);
  await mkdir(`${FILES_PREFIX}/${staticsDirName(root)}`);
  const staticsFilesPromises = [...statics.entries()].map(([, { mapped, buffer }]) =>
    fsp.writeFile(`${FILES_PREFIX}/${staticsFilePath(root, mapped)}`, Buffer.from(buffer)));
  await Promise.all(staticsFilesPromises).then(/*void*/);
  // write after callbacks had a chance to
  await fsp.writeFile(`${FILES_PREFIX}/${bodyFileName}`, page.sliceBody());
};