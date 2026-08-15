import { prisma } from './db';

// Fetch Latest Jobs
export async function getLatestJobs(limit = 10, category?: string) {
  try {
    const where: any = { published: true };
    if (category) {
      where.category = category;
    }
    return await prisma.job.findMany({
      where,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { location: true, author: true },
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

// Fetch Job by Slug
export async function getJobBySlug(slug: string) {
  try {
    return await prisma.job.findUnique({
      where: { slug },
      include: { location: true, author: true },
    });
  } catch (error) {
    console.error('Error fetching job by slug:', error);
    return null;
  }
}

// Fetch Latest Articles by Section (technology, education, how-to, finance, etc.)
export async function getLatestArticles(section?: string, limit = 100, subCategory?: string) {
  try {
    const where: any = { published: true };
    if (section) {
      where.categorySection = section;
    }
    if (subCategory) {
      where.subCategory = subCategory;
    }
    return await prisma.article.findMany({
      where,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { author: true, location: true },
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// Fetch Article by Section and Slug
export async function getArticleBySlug(slug: string) {
  try {
    return await prisma.article.findUnique({
      where: { slug },
      include: { author: true, location: true },
    });
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
}

// Fetch Locations
export async function getActiveLocations() {
  try {
    return await prisma.location.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
}

// Fetch Location by Slug
export async function getLocationBySlug(slug: string) {
  try {
    return await prisma.location.findUnique({
      where: { slug },
      include: {
        jobs: { where: { published: true }, take: 10 },
        articles: { where: { published: true }, take: 10 },
      },
    });
  } catch (error) {
    console.error('Error fetching location by slug:', error);
    return null;
  }
}

// Fetch Tools
export async function getTools() {
  try {
    return await prisma.tool.findMany({
      orderBy: { isFeatured: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching tools:', error);
    return [];
  }
}

// Global Search function
export async function globalSearch(query: string) {
  if (!query || query.trim().length === 0) {
    return { jobs: [], articles: [], tools: [], locations: [] };
  }

  const q = query.trim().toLowerCase();

  try {
    const [jobs, articles, tools, locations] = await Promise.all([
      prisma.job.findMany({
        where: {
          published: true,
          OR: [
            { title: { contains: q } },
            { organization: { contains: q } },
            { qualification: { contains: q } },
            { description: { contains: q } },
          ],
        },
        take: 10,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.article.findMany({
        where: {
          published: true,
          OR: [
            { title: { contains: q } },
            { summary: { contains: q } },
            { content: { contains: q } },
          ],
        },
        take: 10,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.tool.findMany({
        where: {
          OR: [
            { name: { contains: q } },
            { description: { contains: q } },
          ],
        },
        take: 6,
      }),
      prisma.location.findMany({
        where: {
          OR: [
            { name: { contains: q } },
            { state: { contains: q } },
          ],
        },
        take: 6,
      }),
    ]);

    return { jobs, articles, tools, locations };
  } catch (error) {
    console.error('Global search error:', error);
    return { jobs: [], articles: [], tools: [], locations: [] };
  }
}
