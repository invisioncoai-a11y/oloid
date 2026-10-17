import React, { useEffect } from 'react';

export function SEO({
  title,
  description = "OLOID is a premier international engineering, industrial technology, and petroleum services company delivering rotating equipment, process automation, upstream products, and specialized engineering.",
  canonical,
  ogType = 'website',
  ogImage = '/assets/brand/oloid-logo.png',
  schema
}) {
  const fullTitle = title 
    ? `${title} | OLOID Industrial & Petroleum Services` 
    : 'OLOID — Engineering, Industrial Technology & Petroleum Services';
  
  const siteUrl = 'https://oloid.company';
  const fullCanonical = canonical ? (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`) : siteUrl;

  useEffect(() => {
    // Document title
    document.title = fullTitle;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // Canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = fullCanonical;

    // OG title & description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = fullTitle;

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = description;

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.content = fullCanonical;

    let ogTypeMeta = document.querySelector('meta[property="og:type"]');
    if (ogTypeMeta) ogTypeMeta.content = ogType;

    let ogImgMeta = document.querySelector('meta[property="og:image"]');
    if (ogImgMeta) ogImgMeta.content = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

    // Schema injection if provided
    let scriptTag = null;
    if (schema) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      scriptTag.text = JSON.stringify(schema);
      document.head.appendChild(scriptTag);
    }

    return () => {
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [fullTitle, description, fullCanonical, ogType, ogImage, schema]);

  return null;
}

export default SEO;
