import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "./constants";

export const defaultMetadata: Metadata = {
  title: {
    default: `${SITE_NAME} - 퍼포먼스 마케팅 에이전시`,
    template: `%s | ${SITE_NAME} - 퍼포먼스 마케팅 에이전시`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generatePageMetadata(
  title: string,
  description?: string,
  path?: string
): Metadata {
  const pageDescription = description || SITE_DESCRIPTION;
  const url = path ? `${SITE_URL}${path}` : undefined;

  return {
    title,
    description: pageDescription,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: pageDescription,
      ...(url && { url }),
    },
    twitter: {
      title: `${title} | ${SITE_NAME}`,
      description: pageDescription,
    },
  };
}
