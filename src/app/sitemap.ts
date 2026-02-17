import type { MetadataRoute } from "next";
import { DUMMY_CASE_STUDIES } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://digitalblob.co";

  const staticPages = ["", "/work", "/services", "/about", "/contact"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  const caseStudyPages = DUMMY_CASE_STUDIES.map((cs) => ({
    url: `${baseUrl}/work/${cs.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...caseStudyPages];
}
