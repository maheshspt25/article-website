import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const limiter = rateLimit(request, 60, 60 * 1000);
    if (!limiter.success) {
      return NextResponse.json({ success: false, error: 'Rate limit exceeded.' }, { status: 429 });
    }

    const article = await prisma.article.findUnique({
      where: { id: params.id },
      include: { author: { select: { name: true } } }
    });

    if (!article) {
      return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, article });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Rate Limiting
    const limiter = rateLimit(request, 30, 60 * 1000);
    if (!limiter.success) {
      return NextResponse.json({ success: false, error: 'Rate limit exceeded.' }, { status: 429 });
    }

    // 2. Authentication Enforcement
    const adminToken = request.cookies.get('admin_token')?.value;
    if (adminToken !== 'infomitra_admin_authenticated') {
      return NextResponse.json({ success: false, error: 'Unauthorized. Admin authentication required.' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      summary,
      content,
      categorySection,
      subCategory,
      readingTime,
      published,
      featured,
      stepByStepJson,
      faqJson,
      sourcesJson,
      disclaimer,
      metaTitle,
      metaDescription,
      keywords
    } = body;

    const data: any = {};

    if (title !== undefined) data.title = title;
    if (slug !== undefined) data.slug = slug;
    if (summary !== undefined) data.summary = summary;
    if (content !== undefined) data.content = content;
    if (categorySection !== undefined) data.categorySection = categorySection;
    if (subCategory !== undefined) data.subCategory = subCategory;
    if (readingTime !== undefined) data.readingTime = readingTime;
    if (published !== undefined) data.published = Boolean(published);
    if (featured !== undefined) data.featured = Boolean(featured);

    if (stepByStepJson !== undefined) {
      data.stepByStepJson = typeof stepByStepJson === 'object' ? JSON.stringify(stepByStepJson) : stepByStepJson;
    }
    if (faqJson !== undefined) {
      data.faqJson = typeof faqJson === 'object' ? JSON.stringify(faqJson) : faqJson;
    }
    if (sourcesJson !== undefined) {
      data.sourcesJson = typeof sourcesJson === 'object' ? JSON.stringify(sourcesJson) : sourcesJson;
    }
    if (disclaimer !== undefined) data.disclaimer = disclaimer;
    if (metaTitle !== undefined) data.metaTitle = metaTitle;
    if (metaDescription !== undefined) data.metaDescription = metaDescription;
    if (keywords !== undefined) data.keywords = keywords;

    const article = await prisma.article.update({
      where: { id: params.id },
      data
    });

    return NextResponse.json({ success: true, article });
  } catch (error: any) {
    console.error('Error updating article:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Rate Limiting
    const limiter = rateLimit(request, 20, 60 * 1000);
    if (!limiter.success) {
      return NextResponse.json({ success: false, error: 'Rate limit exceeded.' }, { status: 429 });
    }

    // 2. Authentication Enforcement
    const adminToken = request.cookies.get('admin_token')?.value;
    if (adminToken !== 'infomitra_admin_authenticated') {
      return NextResponse.json({ success: false, error: 'Unauthorized. Admin authentication required.' }, { status: 401 });
    }

    await prisma.article.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true, message: 'Article deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
