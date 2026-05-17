import { useEffect } from "react";

const DEFAULT_TITLE = "Kosh — Your Money Level Check";
const DEFAULT_DESCRIPTION =
  "How well do you actually understand money? Find out in 5 minutes.";

/**
 * Sets <title>, <meta name="description">, and the og:title/description tags
 * for the current route, then restores defaults on unmount. Use one of:
 *
 *   useDocumentTitle("FDR vs Sanchaypatra vs DPS — Kosh")
 *   useDocumentTitle("X — Kosh", "Short share-friendly description.")
 */
export function useDocumentTitle(title?: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const descMeta = document.querySelector('meta[name="description"]');
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    const previousDesc = descMeta?.getAttribute("content") ?? null;
    const previousOgTitle = ogTitleMeta?.getAttribute("content") ?? null;
    const previousOgDesc = ogDescMeta?.getAttribute("content") ?? null;

    const nextTitle = title ?? DEFAULT_TITLE;
    const nextDesc = description ?? DEFAULT_DESCRIPTION;

    document.title = nextTitle;
    descMeta?.setAttribute("content", nextDesc);
    ogTitleMeta?.setAttribute("content", nextTitle);
    ogDescMeta?.setAttribute("content", nextDesc);

    return () => {
      document.title = previousTitle;
      if (descMeta && previousDesc !== null) descMeta.setAttribute("content", previousDesc);
      if (ogTitleMeta && previousOgTitle !== null) ogTitleMeta.setAttribute("content", previousOgTitle);
      if (ogDescMeta && previousOgDesc !== null) ogDescMeta.setAttribute("content", previousOgDesc);
    };
  }, [title, description]);
}
