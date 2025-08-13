// src/services/loadServices.ts
import fm from "front-matter";

export type Service = {
  title: string;
  description: string;
  features: string[];
  timeline: string;
  icon: string;
  color: string;
  popular?: boolean;
  slug: string;
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
}

export async function loadServices(): Promise<Service[]> {
  const res = await fetch("/content/DataServices/Services.md", { cache: "no-store" });
  if (!res.ok) throw new Error("Unable to load /content/services.md");
  const text = await res.text();
  const { attributes } = fm<{ services: Omit<Service, "slug">[] }>(text);
  const list = attributes?.services ?? [];
  return list.map((s) => ({ ...s, slug: slugify(s.title) }));
}
