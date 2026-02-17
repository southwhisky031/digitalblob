import { SITE_URL, SOCIAL_LINKS } from "@/lib/constants";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "digitalblob",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+82-2-6952-1006",
      contactType: "customer service",
      availableLanguage: ["Korean", "English"],
    },
    sameAs: Object.values(SOCIAL_LINKS),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleJsonLdProps {
  headline: string;
  datePublished?: string;
  description?: string;
  image?: string;
}

export function ArticleJsonLd({
  headline,
  datePublished,
  description,
  image,
}: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    ...(datePublished && { datePublished }),
    ...(description && { description }),
    ...(image && { image }),
    author: {
      "@type": "Organization",
      name: "digitalblob",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "digitalblob",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
