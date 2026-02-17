export interface Result {
  metric: string;
  value: string;
  description: string;
}

export interface CaseStudy {
  _id: string;
  title: string;
  slug: { current: string };
  client: string;
  industry: string;
  services: string[];
  heroImage?: string;
  challenge: string;
  solution: string;
  results: Result[];
  gallery?: string[];
  testimonial?: string;
}

export interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  icon: string;
  description: string;
  features: string[];
  order: number;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  photo?: string;
  bio: string;
  order: number;
}

export interface Testimonial {
  _id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface ClientLogo {
  _id: string;
  name: string;
  logo?: string;
  url?: string;
  featured: boolean;
}

export interface SiteSettings {
  heroHeadline: string;
  heroSubtext: string;
  ctaText: string;
  contactEmail: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  website?: string;
  budget: string;
  message: string;
}
