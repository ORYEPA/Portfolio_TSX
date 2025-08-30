// src/services/resumeLoader.ts
import matter from "gray-matter";

export type Entry = {
  title: string;
  org: string;
  location?: string;
  details?: string | string[];
  start: string;
  end: string;
  tag?: string;
};

async function loadEntries(mdPath: string): Promise<Entry[]> {
  const res = await fetch(mdPath, { cache: "no-store" });
  console.log("fetch", mdPath, res.status);
  if (!res.ok) throw new Error(`Failed to load ${mdPath} (HTTP ${res.status})`);
  const text = await res.text();
  const { data } = matter(text);
  const entries = (data as any)?.entries ?? [];
  console.log("entries loaded", mdPath, entries.length);
  return entries as Entry[];
}


export const loadEducation  = () => loadEntries("/content/DataEducation/education.md");
export const loadExperience = () => loadEntries("/content/DataExperience/experience.md");
