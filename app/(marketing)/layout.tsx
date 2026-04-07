import type { ReactNode } from "react";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="surface-grid">
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
