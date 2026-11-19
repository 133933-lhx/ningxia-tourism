import type { MetadataRoute } from "next";
import { attractions } from "@/content/attractions";
import { foods } from "@/content/foods";
import { routes } from "@/content/routes";

export const dynamic = "force-static";

const BASE = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/attractions`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/foods`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/routes`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/routes/plan`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/dialect`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/ask`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/about`, changeFrequency: "yearly", priority: 0.3 },
  ];

  return [
    ...staticPages,
    ...attractions.map((a) => ({
      url: `${BASE}/attractions/${a.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...foods.map((f) => ({
      url: `${BASE}/foods/${f.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...routes.map((r) => ({
      url: `${BASE}/routes/${r.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
