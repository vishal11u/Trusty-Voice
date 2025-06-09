import type { Metadata } from "next";

type MetadataOptions = {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
};

export function generateMetadata({
  title,
  description,
  keywords = [],
  path = "",
}: MetadataOptions): Metadata {
  const baseUrl = "https://trusty-voice.vercel.app";
  const fullPath = path ? `${baseUrl}${path}` : baseUrl;
  
  return {
    title: `TrustScribe - ${title}`,
    description,
    keywords: [
      "testimonials",
      "customer feedback",
      "social proof",
      "reviews",
      "trust",
      "conversion",
      "marketing",
      "business growth",
      ...keywords,
    ].join(", "),
    alternates: {
      canonical: fullPath,
    },
    openGraph: {
      title: `TrustScribe - ${title}`,
      description,
      url: fullPath,
      siteName: "TrustScribe",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `TrustScribe - ${title}`,
      description,
    },
  };
} 