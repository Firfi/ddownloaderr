import { WithCounts } from '../parser';
import { MetaUpdate } from '../types/meta';

export const getPageMeta = (root: URL, p: WithCounts): MetaUpdate => ({
  url: root.href,
  links: p.getLinksCount(),
  images: p.getImagesCount(),
});
