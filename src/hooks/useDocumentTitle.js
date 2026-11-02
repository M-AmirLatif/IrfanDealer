import { useEffect } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';

/**
 * Custom hook to update document title and meta description dynamically
 * @param {string} [title] - Page title prefix
 * @param {string} [description] - Meta description
 */
export function useDocumentTitle(title, description) {
  useEffect(() => {
    const baseTitle = SITE_CONFIG.brandName;
    const finalTitle = title ? `${title} | ${baseTitle}` : `${baseTitle} | ${SITE_CONFIG.tagline}`;
    document.title = finalTitle;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);
}
