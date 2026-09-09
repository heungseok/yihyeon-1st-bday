import type { Metadata } from "next";
import { seoulInvitation } from "@/config/invitation";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const siteUrl = configuredSiteUrl || "https://example.com";
const sitePath = `${basePath && !siteUrl.endsWith(basePath) ? basePath : ""}/seoul`;
const shareImage = `${siteUrl}${basePath && !siteUrl.endsWith(basePath) ? basePath : ""}${seoulInvitation.share.image}`;

export const metadata: Metadata = {
  title: seoulInvitation.share.title,
  description: seoulInvitation.share.description,
  openGraph: {
    title: seoulInvitation.share.title,
    description: seoulInvitation.share.description,
    url: `${siteUrl}${sitePath}`,
    images: [{ url: shareImage, width: 1200, height: 630, alt: seoulInvitation.share.title }],
  },
  twitter: {
    title: seoulInvitation.share.title,
    description: seoulInvitation.share.description,
    images: [shareImage],
  },
};

export default function SeoulLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
