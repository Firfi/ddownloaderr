// download a root url from args

import { download } from './index';

export const downloadRoot = async (url: URL): Promise<string> => (await download(url)).text();