import type { Metadata, Viewport } from "next";
import { invitation } from "@/config/invitation";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const siteUrl = configuredSiteUrl || "https://example.com";
const shareImage = `${siteUrl}${basePath && !siteUrl.endsWith(basePath) ? basePath : ""}${invitation.share.image}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: invitation.share.title,
  description: invitation.share.description,
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: invitation.share.title,
    description: invitation.share.description,
    url: siteUrl,
    siteName: `${invitation.baby.name} 첫돌 초대장`,
    images: [{ url: shareImage, width: 1200, height: 630, alt: invitation.share.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: invitation.share.title,
    description: invitation.share.description,
    images: [shareImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fcfbf8",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
