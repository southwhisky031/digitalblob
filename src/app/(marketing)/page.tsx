import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { SocialProof } from "@/components/sections/social-proof";
import { ValueProposition } from "@/components/sections/value-proposition";
import { SelectedWork } from "@/components/sections/selected-work";
import { ServicesSummary } from "@/components/sections/services-summary";
import { Testimonials } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta-section";
import { OrganizationJsonLd } from "@/components/shared/json-ld";

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <Hero />
      <About />
      <SocialProof />
      <ValueProposition />
      <SelectedWork />
      <ServicesSummary />
      <Testimonials />
      <CTASection />
    </>
  );
}
