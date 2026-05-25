import { useEffect } from 'react';

/**
 * Custom High-Performance SEO Component for Diyam (React 19 compatible)
 * Dynamically updates document metadata, canonical tags, and injects structured schemas
 * for both diyam.in and diyam.co.in domains.
 */
export default function SEO({
  title,
  description,
  keywords,
  image = '/category_bg.png',
  path = '',
  productSchema = null,
}) {
  useEffect(() => {
    // 1. Resolve host domain dynamically
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://diyam.in';
    const cleanOrigin = currentOrigin.endsWith('/') ? currentOrigin.slice(0, -1) : currentOrigin;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const canonicalUrl = `${cleanOrigin}${cleanPath === '/' ? '' : cleanPath}`;

    // 2. Update Title (brand keywords + page specific)
    const baseTitle = 'DIYAM – Premium LED Focus Lights & Lighting Solutions';
    const fullTitle = title ? `${title} | ${baseTitle}` : `${baseTitle} | diyam.in`;
    document.title = fullTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (name, value, isProperty = false) => {
      if (!value) return;
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute('content', value);
      } else {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        element.setAttribute('content', value);
        document.head.appendChild(element);
      }
    };

    // 3. Update Meta Description and Keywords
    const defaultDesc = 'Shop high-performance waterproof LED Focus Lights, outdoor flood lights, spots, track lights, and premium Philips Certa drivers at Diyam.';
    updateMetaTag('description', description || defaultDesc);

    const defaultKeywords = 'Diyam, focus light, led focus light, diyam.in, diyam.co.in, diyam lights, outdoor focus light, spotlight, led driver, philips driver';
    updateMetaTag('keywords', keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords);

    // 4. Update Open Graph (Social Sharing) Tags
    updateMetaTag('og:title', title ? `${title} | DIYAM` : 'DIYAM – Illuminate Every Moment', true);
    updateMetaTag('og:description', description || defaultDesc, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:image', image.startsWith('http') ? image : `${cleanOrigin}${image}`, true);

    // 5. Update Twitter Card Tags
    updateMetaTag('twitter:title', title ? `${title} | DIYAM` : 'DIYAM – Premium LED Lighting', false);
    updateMetaTag('twitter:description', description || defaultDesc, false);
    updateMetaTag('twitter:image', image.startsWith('http') ? image : `${cleanOrigin}${image}`, false);

    // 6. Update Canonical Link Tag dynamically
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonicalLink);
    }

    // 7. Inject Product Schema JSON-LD if viewing a specific product
    let schemaScript = document.getElementById('seo-product-schema');
    if (productSchema) {
      const formattedSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': productSchema.name,
        'image': productSchema.image.startsWith('http') ? productSchema.image : `${cleanOrigin}${productSchema.image}`,
        'description': productSchema.description,
        'category': productSchema.category,
        'sku': `DIYAM-PROD-${productSchema.id}`,
        'mpn': productSchema.model || `DIYAM-${productSchema.id}`,
        'brand': {
          '@type': 'Brand',
          'name': productSchema.brand || 'DIYAM'
        },
        'offers': {
          '@type': 'Offer',
          'url': canonicalUrl,
          'priceCurrency': 'INR',
          'price': productSchema.price === 'Contact Me' || !parseFloat(productSchema.price.replace(/[^\d.]/g, ''))
            ? '0'
            : parseFloat(productSchema.price.replace(/[^\d.]/g, '')).toString(),
          'priceValidUntil': '2027-12-31',
          'availability': 'https://schema.org/InStock',
          'itemCondition': 'https://schema.org/NewCondition',
          'seller': {
            '@type': 'Organization',
            'name': 'DIYAM Lighting'
          }
        },
        // Include custom specs inside product properties schema
        'additionalProperty': Object.keys(productSchema)
          .filter(key => ['wattage', 'material', 'colorTemp', 'moq', 'usage', 'warranty'].includes(key) && productSchema[key])
          .map(key => ({
            '@type': 'PropertyValue',
            'name': key === 'colorTemp' ? 'Color Temperature' : key.toUpperCase(),
            'value': productSchema[key]
          }))
      };

      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        schemaScript.setAttribute('id', 'seo-product-schema');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(formattedSchema, null, 2);
    } else if (schemaScript) {
      // Clean up product schema when navigating away
      schemaScript.remove();
    }

    // Clean up dynamic product schema on unmount
    return () => {
      const scriptToRemove = document.getElementById('seo-product-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [title, description, keywords, image, path, productSchema]);

  return null; // This component runs entirely as a side-effect, returning no UI
}
