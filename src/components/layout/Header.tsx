'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Menu, X, ChevronDown } from 'lucide-react';
import { TOOLS_LIST } from '@/data/tools-data';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // إغلاق القائمة عند النقر خارجها أو الضغط على Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsToolsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsToolsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // إغلاق القائمة المنسدلة تلقائيًا عند تغيير الصفحة
  useEffect(() => {
    setIsToolsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'حاسبة الأرباح', href: '/profit-calculator' },
    { name: 'المدونة', href: '/blog' },
    { name: 'عن صافي', href: '/about' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  const isAnyToolActive = TOOLS_LIST.some((t) => pathname === t.path);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#D9D9D9]/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* الشعار */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4B6AD9] to-[#26395E] flex items-center justify-center text-white shadow-md shadow-[#4B6AD9]/25 group-hover:scale-105 transition-transform">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-[#141D30] flex items-center gap-1">
                  صافي
                  <span className="w-2 h-2 rounded-full bg-[#4B6AD9] inline-block animate-pulse"></span>
                </span>
                <span className="text-[10px] font-medium text-slate-500 tracking-wider">
                  Saafi | حاسبة أرباح التجارة الإلكترونية
                </span>
              </div>
            </Link>
          </div>

          {/* روابط سطح المكتب */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/')
                  ? 'text-[#4B6AD9] bg-[#FAF8FF] border border-[#B2CBF4]/50'
                  : 'text-slate-600 hover:text-[#141D30] hover:bg-slate-50'
              }`}
            >
              الرئيسية
            </Link>

            <Link
              href="/profit-calculator"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                pathname === '/profit-calculator'
                  ? 'text-[#4B6AD9] bg-[#FAF8FF] border border-[#B2CBF4]/50'
                  : 'text-slate-600 hover:text-[#141D30] hover:bg-slate-50'
              }`}
            >
              الحاسبة الرئيسية
            </Link>

            {/* قائمة الأدوات المنسدلة المستقرة */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsToolsDropdownOpen((prev) => !prev)}
                aria-expanded={isToolsDropdownOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isToolsDropdownOpen || (isAnyToolActive && pathname !== '/profit-calculator')
                    ? 'text-[#4B6AD9] bg-[#FAF8FF] border border-[#B2CBF4]/50'
                    : 'text-slate-600 hover:text-[#141D30] hover:bg-slate-50'
                }`}
              >
                <span>الأدوات</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isToolsDropdownOpen ? 'rotate-180 text-[#4B6AD9]' : 'text-slate-400'
                  }`}
                />
              </button>

              {isToolsDropdownOpen && (
                <div className="absolute top-full right-0 w-80 pt-2 z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-[#D9D9D9] p-2 space-y-1">
                    <div className="px-3 py-2 border-b border-[#D9D9D9]/50 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#4B6AD9] uppercase">
                        أدوات وحاسبات صافي
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">5 أدوات</span>
                    </div>
                    {TOOLS_LIST.map((tool) => {
                      const isThisToolActive = pathname === tool.path;
                      return (
                        <Link
                          key={tool.slug}
                          href={tool.path}
                          onClick={() => setIsToolsDropdownOpen(false)}
                          className={`block px-3 py-2.5 rounded-xl transition-colors ${
                            isThisToolActive
                              ? 'bg-[#FAF8FF] text-[#4B6AD9] font-bold border border-[#B2CBF4]/60'
                              : 'text-slate-700 hover:bg-[#FAF8FF] hover:text-[#4B6AD9]'
                          }`}
                        >
                          <div className="font-semibold text-sm">{tool.title}</div>
                          <div className="text-xs text-slate-500 truncate mt-0.5">{tool.shortDescription}</div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/blog')
                  ? 'text-[#4B6AD9] bg-[#FAF8FF] border border-[#B2CBF4]/50'
                  : 'text-slate-600 hover:text-[#141D30] hover:bg-slate-50'
              }`}
            >
              المدونة
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/about')
                  ? 'text-[#4B6AD9] bg-[#FAF8FF] border border-[#B2CBF4]/50'
                  : 'text-slate-600 hover:text-[#141D30] hover:bg-slate-50'
              }`}
            >
              عن صافي
            </Link>
          </nav>

          {/* زر الدعوة إلى اتخاذ إجراء (CTA) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/profit-calculator"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4B6AD9] text-white font-bold text-sm shadow-md shadow-[#4B6AD9]/25 hover:bg-[#3B57C4] hover:shadow-lg transition-all"
            >
              <span>احسب ربحك الآن</span>
            </Link>
          </div>

          {/* زر القائمة للشاشات الصغيرة */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/profit-calculator"
              className="px-3.5 py-2 rounded-xl bg-[#4B6AD9] text-white font-bold text-xs shadow-xs"
            >
              احسب ربحك
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-700 bg-[#FAF8FF] border border-[#D9D9D9] hover:bg-slate-100 transition-colors"
              aria-label="القائمة الرئيسية"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-[#4B6AD9]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* قائمة الجوال المنبثقة الكاملة والقابلة للتمرير */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#D9D9D9] shadow-xl max-h-[calc(100vh-4.5rem)] overflow-y-auto px-4 py-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
          {/* الروابط الأساسية */}
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-center p-3 rounded-2xl text-sm font-bold transition-colors ${
                  isActive(link.href)
                    ? 'bg-[#4B6AD9] text-white shadow-sm shadow-[#4B6AD9]/20'
                    : 'bg-[#FAF8FF] text-slate-700 border border-[#DED1FF] hover:bg-slate-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* قسم جميع الحاسبات المالية */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-[#4B6AD9] uppercase tracking-wider">
                🧮 جميع الحاسبات المالية (5)
              </span>
              <span className="text-[10px] bg-[#FAF8FF] text-[#4B6AD9] px-2 py-0.5 rounded-full border border-[#B2CBF4]/50 font-bold">
                مجانية 100%
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {TOOLS_LIST.map((tool) => {
                const isThisToolActive = pathname === tool.path;
                return (
                  <Link
                    key={tool.slug}
                    href={tool.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`p-3 rounded-2xl border transition-colors flex items-start justify-between gap-3 ${
                      isThisToolActive
                        ? 'bg-[#FAF8FF] border-[#4B6AD9] text-[#4B6AD9]'
                        : 'bg-white border-[#D9D9D9] hover:bg-[#FAF8FF] text-slate-800'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-sm">{tool.title}</div>
                      <div className="text-xs text-slate-500 line-clamp-1">{tool.shortDescription}</div>
                    </div>
                    <span className="text-xs text-[#4B6AD9] font-bold shrink-0 self-center">فتح &larr;</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* قسم المقالات والأدلة */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-[#141D30] uppercase tracking-wider">
                📚 أهم المقالات والأدلة المالية
              </span>
              <Link
                href="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs text-[#4B6AD9] font-bold hover:underline"
              >
                عرض الكل (10) &larr;
              </Link>
            </div>

            <div className="space-y-2">
              <Link
                href="/blog/how-to-calculate-ecommerce-net-profit"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block p-3 rounded-2xl bg-[#FAF8FF] border border-[#D9D9D9] hover:border-[#4B6AD9] transition-colors"
              >
                <div className="font-bold text-xs text-[#141D30]">
                  كيف تحسب صافي أرباح متجرك بدقة وتتجنب الخسائر المخفية؟
                </div>
                <div className="text-[11px] text-slate-500 mt-1">دليل عملي مع أمثلة حقيقية لحساب التكاليف</div>
              </Link>

              <Link
                href="/blog/how-to-price-ecommerce-products-for-profitability"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block p-3 rounded-2xl bg-[#FAF8FF] border border-[#D9D9D9] hover:border-[#4B6AD9] transition-colors"
              >
                <div className="font-bold text-xs text-[#141D30]">
                  دليل تسعير منتجات المتجر الإلكتروني لتحقيق أعلى ربحية
                </div>
                <div className="text-[11px] text-slate-500 mt-1">استراتيجيات التسعير والهوامش المستهدفة</div>
              </Link>

              <Link
                href="/blog/break-even-point-ecommerce-guide"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block p-3 rounded-2xl bg-[#FAF8FF] border border-[#D9D9D9] hover:border-[#4B6AD9] transition-colors"
              >
                <div className="font-bold text-xs text-[#141D30]">
                  نقطة التعادل للمتاجر الإلكترونية: كيف تحسبها وتتجاوزها؟
                </div>
                <div className="text-[11px] text-slate-500 mt-1">معرفة كمية المبيعات لتغطية التكاليف الثابتة</div>
              </Link>
            </div>
          </div>

          {/* زر رئيسي أسفل القائمة */}
          <div className="pt-2">
            <Link
              href="/profit-calculator"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center p-3.5 rounded-2xl bg-[#4B6AD9] hover:bg-[#3B57C4] text-white font-bold text-sm shadow-md shadow-[#4B6AD9]/25 transition-colors"
            >
              ابدأ بحساب صافي أرباحك الآن
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
