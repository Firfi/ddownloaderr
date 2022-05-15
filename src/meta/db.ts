import { prisma } from '../db';
import { Meta, MetaUpdate } from '../types/meta';
import { Meta as DbMeta } from '@prisma/client';

const mapDBMeta = (m: DbMeta): Meta => ({
  url: m.url,
  lastFetch: m.updatedAt, // not exact fetch time but good enough
  links: m.linkCount,
  images: m.imageCount,
});

export const getMetas = async (urls: string[]): Promise<Meta[]> => {
  const r = await prisma.meta.findMany({
    where: {
      url: {
        in: urls,
      },
    },
  });
  return r.map(mapDBMeta);
};

export const saveMeta = async (m: MetaUpdate): Promise<Meta> => {
  const upsert = {
    url: m.url,
    linkCount: m.links,
    imageCount: m.images,
    updatedAt: new Date(),
  };
  const r = await prisma.meta.upsert({
    where: {
      url: m.url,
    },
    update: upsert,
    create: upsert,
  });
  return mapDBMeta(r);
};