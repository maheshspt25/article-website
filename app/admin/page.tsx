'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/AdminHeader';
import { FileText, PlusCircle, CheckCircle, Edit, Layers, Sparkles, TrendingUp, RefreshCw } from 'lucide-react';

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  categorySection: string;
  subCategory: string | null;
  published: boolean;
  updatedAt: string;
}

export default function AdminDashboardPage() {
  const [totalArticles, setTotalArticles] = useState(0);
  const [howToCount, setHowToCount] = useState(0);
  const [publishedCount, setPublishedCount] = useState(0);
  const [recentArticles, setRecentArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        const res = await fetch('/api/articles?limit=50');
        const data = await res.json();
        if (data.success && Array.isArray(data.articles)) {
          const articles: ArticleItem[] = data.articles;
          setTotalArticles(data.pagination?.total || articles.length);
          setHowToCount(articles.filter((a) => a.categorySection === 'how-to').length);
          setPublishedCount(articles.filter((a) => a.published).length);
          setRecentArticles(articles.slice(0, 10));
        }
      } catch (err) {
        console.error('Error fetching admin dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardMetrics();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md border border-blue-600/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-white/20 text-white text-xs font-extrabold px-3 py-1 rounded-full border border-white/30 uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-200" /> Executive CMS Panel
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              InfoMitra Editorial Desk & Content Hub
            </h1>
            <p className="text-sm text-blue-100 font-medium max-w-2xl">
              Create, edit, search, publish, and manage all How-To guides, technical articles, and job postings across 25 categories.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/articles/new"
              className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-900 font-extrabold px-5 py-3 rounded-xl text-sm shadow-md transition-all border border-white/40"
            >
              <PlusCircle className="w-4 h-4 text-blue-700" />
              Create New Article
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Total Articles</span>
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">
              {loading ? <RefreshCw className="w-6 h-6 animate-spin text-blue-600 inline" /> : totalArticles}
            </div>
            <div className="text-xs text-slate-500 font-medium">Across all sections</div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">How-To Guides</span>
              <Layers className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-3xl font-black text-indigo-600">
              {loading ? <RefreshCw className="w-6 h-6 animate-spin text-indigo-600 inline" /> : howToCount}
            </div>
            <div className="text-xs text-slate-500 font-medium">25 Sub-categories active</div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Published Status</span>
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-emerald-600">
              {loading ? <RefreshCw className="w-6 h-6 animate-spin text-emerald-600 inline" /> : publishedCount}
            </div>
            <div className="text-xs text-slate-500 font-medium">Live on search engines</div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Sub-Categories</span>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-black text-purple-600">25</div>
            <div className="text-xs text-slate-500 font-medium">Dynamic routing enabled</div>
          </div>
        </div>

        {/* Quick Table Header */}
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs space-y-4 p-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" /> Recently Modified Articles
              </h2>
              <p className="text-xs text-slate-500 font-medium">Live content management dataset</p>
            </div>

            <Link
              href="/admin/articles"
              className="text-xs font-extrabold text-blue-600 hover:text-blue-700 underline"
            >
              View All Articles →
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-12 text-center text-slate-500 space-y-3">
                <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
                <p className="text-sm font-semibold">Loading dashboard overview...</p>
              </div>
            ) : (
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="text-xs uppercase bg-slate-100/80 text-slate-600 border-b border-slate-200 font-bold">
                  <tr>
                    <th className="py-3.5 px-4">Title & Slug</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Sub-Category</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentArticles.map((article) => (
                    <tr key={article.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-bold text-slate-900 truncate">{article.title}</div>
                        <div className="text-xs text-slate-500 font-mono truncate">/{article.slug}</div>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-extrabold text-blue-600">
                        {article.categorySection}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-semibold text-slate-600">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-bold border border-slate-200">
                          {article.subCategory || 'General'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {article.published ? (
                          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded border border-emerald-200 uppercase">
                            Published
                          </span>
                        ) : (
                          <span className="bg-amber-50 text-amber-700 text-[10px] font-extrabold px-2 py-0.5 rounded border border-amber-200 uppercase">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/articles/${article.id}/edit`}
                            className="p-1.5 rounded bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-colors border border-blue-200"
                            title="Edit Article"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/how-to/${article.subCategory || 'general'}/${article.slug}`}
                            target="_blank"
                            className="p-1.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-colors text-xs font-bold px-2.5 border border-slate-200"
                            title="Preview Live"
                          >
                            Preview
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
