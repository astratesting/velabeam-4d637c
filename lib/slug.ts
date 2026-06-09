import { prisma } from "./prisma";

export async function generateUniqueSlug(name: string): Promise<string> {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);

  let slug = base;
  let counter = 0;

  while (true) {
    const existing = await prisma.site.findUnique({ where: { slug } });
    if (!existing) return slug;
    counter++;
    slug = `${base}-${counter}`;
  }
}
