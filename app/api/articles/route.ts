import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  try {
    // Rate limit: 60 requests per minute
    const limiter = rateLimit(request, 60, 60 * 1000);
    if (!limiter.success) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const categorySection = searchParams.get('categorySection') || '';
    const subCategory = searchParams.get('subCategory') || '';
    const published = searchParams.get('published');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const skip = (page - 1) * limit;

    const where: any = {};

    if (query) {
      where.OR = [
        { title: { contains: query } },
        { summary: { contains: query } },
        { slug: { contains: query } }
      ];
    }

    if (categorySection) {
      where.categorySection = categorySection;
    }

    if (subCategory) {
      where.subCategory = subCategory;
    }

    if (published !== null && published !== undefined && published !== '') {
      where.published = published === 'true';
    }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit,
        include: {
          author: { select: { name: true } }
        }
      }),
      prisma.article.count({ where })
    ]);

    return NextResponse.json({
      success: true,
      articles,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting: 20 POST requests per minute
    const limiter = rateLimit(request, 20, 60 * 1000);
    if (!limiter.success) {
      return NextResponse.json({ success: false, error: 'Rate limit exceeded.' }, { status: 429 });
    }

    // 2. Authentication Enforcement: Check admin_token cookie
    const adminToken = request.cookies.get('admin_token')?.value;
    if (adminToken !== 'infomitra_admin_authenticated') {
      return NextResponse.json({ success: false, error: 'Unauthorized. Admin authentication required.' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug: customSlug,
      summary,
      content,
      categorySection = 'how-to',
      subCategory,
      readingTime = '5 min read',
      published = true,
      featured = false,
      stepByStepJson,
      faqJson,
      sourcesJson,
      disclaimer,
      metaTitle,
      metaDescription,
      keywords
    } = body;

    if (!title || !summary || !content) {
      return NextResponse.json({ success: false, error: 'Title, summary, and content are required' }, { status: 400 });
    }

    // Auto slug generation
    let slug = customSlug
      ? customSlug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Check slug collision
    const existing = await prisma.article.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    // Get default author
    let author = await prisma.author.findFirst();
    if (!author) {
      author = await prisma.author.create({
        data: {
          name: 'InfoMitra Editorial Desk',
          slug: 'infomitra-editorial-desk',
          designation: 'Senior Editorial Staff'
        }
      });
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        summary,
        content,
        categorySection,
        subCategory,
        readingTime,
        published: Boolean(published),
        featured: Boolean(featured),
        stepByStepJson: typeof stepByStepJson === 'object' ? JSON.stringify(stepByStepJson) : stepByStepJson,
        faqJson: typeof faqJson === 'object' ? JSON.stringify(faqJson) : faqJson,
        sourcesJson: typeof sourcesJson === 'object' ? JSON.stringify(sourcesJson) : sourcesJson,
        disclaimer,
        metaTitle,
        metaDescription,
        keywords,
        authorId: author.id
      }
    });

    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating article:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
