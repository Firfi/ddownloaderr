import { Semaphore } from 'async-mutex';
import fetch, { Response } from 'node-fetch'


const MAX_PARALLEL_DOWNLOADS = 20;

const SEMAPHORE = new Semaphore(MAX_PARALLEL_DOWNLOADS);

// we download a lot in parallel potentially, so let's put some constraints
export const download = async (url: URL, strict = false/*static files could fail for many reasons, but don't make a deal out of it*/): Promise<Response | null> => {
  const [, release] = await SEMAPHORE.acquire();
  try {
    const res = await fetch(url.href);
    if (!res.ok && strict) throw new Error(`failed to download ${url.href}: ${res.status} ${res.statusText}`);
    if (!res.ok) return null;
    return res;
  } finally {
    release();
  }
}