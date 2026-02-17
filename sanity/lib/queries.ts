import { groq } from "next-sanity";

export const caseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    client,
    industry,
    services,
    heroImage,
    challenge,
    solution,
    results,
    gallery,
    testimonial
  }
`;

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    industry,
    services,
    heroImage,
    challenge,
    solution,
    results,
    gallery,
    testimonial
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    icon,
    description,
    features,
    order
  }
`;

export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    photo,
    bio,
    order
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] {
    _id,
    quote,
    author,
    role,
    company,
    avatar
  }
`;

export const clientLogosQuery = groq`
  *[_type == "clientLogo"] {
    _id,
    name,
    logo,
    url,
    featured
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    heroHeadline,
    heroSubtext,
    ctaText,
    contactEmail,
    socialLinks
  }
`;
