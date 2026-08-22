'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/AdminHeader';
import { FileText, PlusCircle, Search, Edit, Trash2, ExternalLink, Filter, RefreshCw } from 'lucide-react';

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  categorySection: string;
  subCategory: string | null;
  published: boolean;
  readingTime: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminArticlesListPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCat, setSelectedSubCat] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const subCategoryOptions = [
    { name: 'All Sub-categories', value: '' },
    { name: 'Gmail & Email', value: 'email' },
    { name: 'Google Services', value: 'google' },
    { name: 'WhatsApp', value: 'whatsapp' },
    { name: 'iPhone & iOS', value: 'iphone' },
    { name: 'Social Media', value: 'social-media' },
    { name: 'YouTube', value: 'youtube' },
    { name: 'Microsoft Office', value: 'microsoft-office' },
    { name: 'Chrome & Browsers', value: 'browsers' },
    { name: 'Wi-Fi & Network', value: 'network' },
    { name: 'Git & GitHub', value: 'git-github' },
    { name: 'Docker & DevOps', value: 'devops' },
    { name: 'AI Tools', value: 'ai' },
    { name: 'Files & Storage', value: 'files-storage' },
    { name: 'Smart TV & Streaming', value: 'smart-tv' },
    { name: 'Printer & Scanner', value: 'printer' },
    { name: 'Smart Home & IoT', value: 'smart-home' },
    { name: 'Digital Payments & UPI', value: 'digital-payments' },
    { name: 'Resume & Career', value: 'career' },
    { name: 'Online Forms & Documents', value: 'documents' },
    { name: 'Online Security & Privacy', value: 'security' },
    { name: 'Windows 11', value: 'windows' },
    { name: 'Android', value: 'android' },
    { name: 'PDF Tools', value: 'pdf' },
    { name: 'Linux', value: 'linux' },
    { name: 'Internet', value: 'internet' }
  ];

  const fetchArticles = async () => {
  const fetchArticles = React.useCallback(async () => {
    setLoading(true);
    try {
      let url = `/api/articles?limit=500`;
      if (searchQuery) url += `&q=${encodeURIComponent(searchQuery)}`;
      if (selectedSubCat) url += `&subCategory=${encodeURIComponent(selectedSubCat)}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setArticles(data.articles);
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };
  }, [searchQuery, selectedSubCat]);

  useEffect(() => {
    fetchArticles();
  }, [selectedSubCat]);
  }, [fetchArticles]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchArticles();
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setArticles(articles.filter((a) => a.id !== id));
      } else {
        alert(`Error deleting article: ${data.error}`);
      }
    } catch (err) {
      alert('Failed to delete article');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" /> Articles Manager
            </h1>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Showing {articles.length} articles in current filter view
            </p>
          </div>

          <Link
            href="/admin/articles/new"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-2.5 rounded-xl text-sm shadow-md transition-all border border-blue-500/30"
          >
            <PlusCircle className="w-4 h-4" /> Add New Article
          </Link>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center gap-4 justify-between">
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search titles or slugs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-medium"
            />
          </form>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 w-full md:w-auto">
              <Filter className="w-4 h-4 text-slate-500" />
              <select
                value={selectedSubCat}
                onChange={(e) => setSelectedSubCat(e.target.value)}
                className="bg-transparent text-sm text-slate-800 font-semibold focus:outline-none cursor-pointer"
              >
                {subCategoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-white text-slate-900">
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={fetchArticles}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
              title="Refresh List"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
          {loading ? (
            <div className="p-12 text-center text-slate-500 space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
              <p className="text-sm font-semibold">Loading articles dataset...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="p-12 text-center space-y-3 text-slate-500">
              <FileText className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-base font-bold text-slate-800">No articles found</p>
              <p className="text-xs">Try adjusting your search criteria or select another sub-category filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="text-xs uppercase bg-slate-100/80 text-slate-600 border-b border-slate-200 font-bold">
                  <tr>
                    <th className="py-3.5 px-4">Title & Slug</th>
                    <th className="py-3.5 px-4">Section</th>
                    <th className="py-3.5 px-4">Sub-Category</th>
                    <th className="py-3.5 px-4">Reading Time</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {articles.map((art) => (
                    <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 max-w-sm">
                        <div className="font-bold text-slate-900 leading-tight">{art.title}</div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5 truncate">/{art.slug}</div>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-extrabold text-blue-600">
                        {art.categorySection}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-semibold text-slate-600">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-bold border border-slate-200">
                          {art.subCategory || 'general'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-500 font-medium">
                        {art.readingTime || '5 min read'}
                      </td>
                      <td className="py-3.5 px-4">
                        {art.published ? (
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
                            href={`/admin/articles/${art.id}/edit`}
                            className="p-1.5 rounded bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-colors border border-blue-200"
                            title="Edit Guide"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>

                          <Link
                            href={`/how-to/${art.subCategory || 'general'}/${art.slug}`}
                            target="_blank"
                            className="p-1.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-colors text-xs font-bold px-2 border border-slate-200"
                            title="View Live Page"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => handleDelete(art.id, art.title)}
                            disabled={deletingId === art.id}
                            className="p-1.5 rounded bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors border border-rose-200 disabled:opacity-50"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );

