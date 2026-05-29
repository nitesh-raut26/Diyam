/**
 * useSEO – Dynamic canonical + meta tag injection for React SPA
 *
 * Fixes:
 *  1. "Duplicate, Google chose different canonical than user"
 *     → injects a <link rel="canonical"> for every route so Google
 *       knows each URL is intentionally unique.
 *  2. "Crawled – currently not indexed"
 *     → each page gets its own unique <title> and <meta description>
 *       so Google sees real unique content worth indexing.
 */

import { useEffect } from 'react'

/**
 * @param {Object} options
 * @param {string} options.title        – Page <title>
 * @param {string} options.description  – Meta description (max ~160 chars)
 * @param {string} [options.canonical]  – Override canonical URL (defaults to current URL)
 * @param {string} [options.ogImage]    – Open Graph image URL
 */
export function useSEO({ title, description, canonical, ogImage }) {
  useEffect(() => {
    const base = 'https://diyam.co.in'
    const canonicalUrl = canonical || base + window.location.pathname

    // ── <title> ────────────────────────────────────────────────────
    document.title = title

    // ── Meta description ───────────────────────────────────────────
    setMeta('name', 'description', description)

    // ── Canonical link ─────────────────────────────────────────────
    let link = document.querySelector("link[rel='canonical']")
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', canonicalUrl)

    // ── Open Graph ─────────────────────────────────────────────────
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonicalUrl)
    if (ogImage) setMeta('property', 'og:image', ogImage)

    // ── Twitter Card ───────────────────────────────────────────────
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    if (ogImage) setMeta('name', 'twitter:image', ogImage)
  }, [title, description, canonical, ogImage])
}

/** Helper – upsert a <meta> tag */
function setMeta(attrName, attrValue, content) {
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attrName, attrValue)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}
