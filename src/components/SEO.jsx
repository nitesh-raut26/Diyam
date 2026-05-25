import { useEffect } from 'react';

export default function SEO({
  title,
  description,
  keywords,
  image = '/category_bg.png',
  path = '',
  productSchema = null,
  breadcrumbSchema = null,
  faqSchema = null,
}) {
  useEffect(() => {
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://diyam.in';
    const cleanOrigin = currentOrigin.endsWith('/') ? currentOrigin.slice(0, -1) : currentOrigin;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const canonicalUrl = `${cleanOrigin}${cleanPath === '/' ? '' : cleanPath}`;

    const baseTitle = 'DIYAM – Premium LED Focus Lights & Lighting Solutions India';
    const fullTitle = title ? `${title} | DIYAM` : baseTitle;
    document.title = fullTitle;

    const setMeta = (name, value, isProperty = false) => {
      if (!value) return;
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (el) { el.setAttribute('content', value); return; }
      el = document.createElement('meta');
      isProperty ? el.setAttribute('property', name) : el.setAttribute('name', name);
      el.setAttribute('content', value);
      document.head.appendChild(el);
    };

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (el) { el.setAttribute('href', href); return; }
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      el.setAttribute('href', href);
      document.head.appendChild(el);
    };

    const defaultDesc = 'Shop premium LED Focus Lights, spotlights, downlights, track lights, and Philips Certa drivers at DIYAM. Trusted by 5000+ projects across India. Pan-India delivery, 2-year warranty.';
    const defaultKeywords = 'DIYAM, diyam.in, diyam.co.in, LED focus light, spotlight India, LED downlight, Philips Certa driver, LED track light, buy LED lights India';

    setMeta('description', description || defaultDesc);
    setMeta('keywords', keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords);
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Open Graph
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', 'DIYAM Premium Lighting', true);
    setMeta('og:locale', 'en_IN', true);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description || defaultDesc, true);
    setMeta('og:url', canonicalUrl, true);
    const absImage = image.startsWith('http') ? image : `${cleanOrigin}${image}`;
    setMeta('og:image', absImage, true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);
    setMeta('og:image:alt', title || 'DIYAM Premium LED Lighting India', true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:site', '@diyamlighting');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description || defaultDesc);
    setMeta('twitter:image', absImage);

    // Canonical
    setLink('canonical', canonicalUrl);

    // ── Inject / update JSON-LD schemas ──────────────────────────

    const setSchema = (id, data) => {
      let el = document.getElementById(id);
      if (!data) { if (el) el.remove(); return; }
      if (!el) {
        el = document.createElement('script');
        el.setAttribute('type', 'application/ld+json');
        el.setAttribute('id', id);
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(data);
    };

    // Product schema
    if (productSchema) {
      const rawPrice = productSchema.price === 'Contact Me'
        ? null
        : parseFloat(String(productSchema.price).replace(/[^\d.]/g, '')) || null;

      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: productSchema.name,
        image: productSchema.image?.startsWith('http') ? productSchema.image : `${cleanOrigin}${productSchema.image}`,
        description: productSchema.description,
        category: productSchema.category,
        sku: `DIYAM-${productSchema.id}`,
        mpn: productSchema.model || `DIYAM-${productSchema.id}`,
        brand: { '@type': 'Brand', name: productSchema.brand || 'DIYAM' },
        offers: {
          '@type': 'Offer',
          url: canonicalUrl,
          priceCurrency: 'INR',
          ...(rawPrice ? { price: rawPrice.toString() } : {}),
          priceValidUntil: '2027-12-31',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: { '@type': 'Organization', name: 'DIYAM Lighting & Electronics' },
        },
        additionalProperty: Object.keys(productSchema)
          .filter((k) => ['wattage', 'material', 'colorTemp', 'moq', 'usage', 'warranty', 'ipRating', 'cri', 'lumens'].includes(k) && productSchema[k])
          .map((k) => ({
            '@type': 'PropertyValue',
            name: k === 'colorTemp' ? 'Color Temperature' : k === 'ipRating' ? 'IP Rating' : k === 'cri' ? 'CRI' : k.toUpperCase(),
            value: productSchema[k],
          })),
      };
      setSchema('seo-product-schema', schema);
    } else {
      setSchema('seo-product-schema', null);
    }

    // Breadcrumb schema
    setSchema('seo-breadcrumb-schema', breadcrumbSchema || null);

    // FAQ schema
    setSchema('seo-faq-schema', faqSchema || null);

    return () => {
      setSchema('seo-product-schema', null);
      setSchema('seo-breadcrumb-schema', null);
      setSchema('seo-faq-schema', null);
    };
  }, [title, description, keywords, image, path, productSchema, breadcrumbSchema, faqSchema]);

  return null;
}
