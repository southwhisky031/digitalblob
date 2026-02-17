import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS, SITE_NAME, COMPANY_INFO } from "@/lib/constants";
import { DigitalBlobLogo } from "@/components/shared/digitalblob-logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Company info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <DigitalBlobLogo className="h-7 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Brand Accelerator &amp; Digital MKT Agency
              <br />
              브랜드 성장의 최적 경로를 찾아줍니다.
            </p>
            <p className="text-sm text-muted-foreground">
              {COMPANY_INFO.email}
            </p>
            <p className="text-xs text-muted-foreground/60">
              {COMPANY_INFO.address}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h3>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Social
            </h3>
            <nav className="flex flex-col gap-2">
              {Object.entries(SOCIAL_LINKS).map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 text-sm capitalize text-muted-foreground transition-colors hover:text-foreground"
                >
                  {name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-xs text-muted-foreground">
            {COMPANY_INFO.legalName} | 사업자등록번호: {COMPANY_INFO.bizNumber}
            <br />
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
