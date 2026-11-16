import type { Metadata } from "next";
import { SITE, ASSET_PREFIX } from "@/lib/content";
import { Header, StickyBar, Footer } from "@/components/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.base),
  title: SITE.metaTitle,
  description: SITE.metaDescription,
  icons: { icon: `${ASSET_PREFIX}/favicon.svg` },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.brand,
    title: SITE.metaTitle,
    description: SITE.metaDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.metaTitle,
    description: SITE.metaDescription,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyBar />
      </body>
    </html>
  );
}
