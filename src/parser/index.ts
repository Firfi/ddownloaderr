import { parse as parseDOM } from 'node-html-parser';
import type { Statics } from '../download/statics';
import { staticsFilePath } from '../file/name';

export interface WithBodySlice {
  sliceBody(): string; // at the moment of the call
}

// lens into our page with only important methods
export interface PageLens extends WithBodySlice {
  peekSrcs: () => {src: string, set: (string) => void}[];
}

export const parse = (s: string): PageLens => {
  const root = parseDOM(s, {
    parseNoneClosedTags: false,
  });
  return {
    peekSrcs: () => root.querySelectorAll('*').map(e => {
      // todo proper heuristics for attribute
      const src = e.getAttribute('src');
      const href = e.getAttribute('href');
      const attr = src ? 'src' : 'href';
      return {
        src: src || href,
        set: (s: string) => e.setAttribute(attr, s)
      }
    }).filter(e => !!e.src),
    sliceBody(): string {
      return root.innerHTML;
    }
  }
};

export const substituteStatics = (root: URL, p: PageLens, statics: Statics) => {
  p.peekSrcs().forEach(e => {
    const s = statics.get(e.src);
    if (s) {
      e.set(`./${staticsFilePath(root, s.mapped)}`);
    }
  });
}