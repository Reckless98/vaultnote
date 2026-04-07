import type { Metadata } from "next";

export const siteConfig = {
  name: "VaultNote",
  url: "https://vaultnote.app",
  description:
    "VaultNote is a mock zero-knowledge note-taking app with a calm writing surface, local persistence, and a security-first product story.",
};

export function buildMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path?: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;

  return {
    title,
    description,
    alternates: {
      canonical: path ?? "/",
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path ? `${siteConfig.url}${path}` : siteConfig.url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
