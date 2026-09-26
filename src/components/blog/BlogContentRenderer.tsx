'use client';

import React from 'react';
import Link from 'next/link';
import { Calculator, AlertTriangle, Lightbulb, Info, CheckCircle2 } from 'lucide-react';

interface BlogContentRendererProps {
  content: string;
}

/**
 * Clean LaTeX math expressions into elegant, legible Arabic mathematical statements
 */
function cleanMathFormula(raw: string): string {
  let cleaned = raw
    .replace(/\$\$/g, '')
    .replace(/\$/g, '')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\left\(/g, '(')
    .replace(/\\right\)/g, ')')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 ÷ $2)')
    .replace(/\\times/g, '×')
    .replace(/\\approx/g, '≈')
    .replace(/\\le/g, '≤')
    .replace(/\\ge/g, '≥')
    .replace(/\\%/g, '%')
    .replace(/\\cdot/g, '•')
    .replace(/\\quad/g, ' ')
    .replace(/\\,/g, ' ')
    .replace(/\\/g, '')
    .trim();

  return cleaned;
}

/**
 * Parses inline formatting like **bold**, *italic*, and [links](url)
 */
function renderInlineFormatting(text: string): React.ReactNode[] {
  // Regex to split by bold, inline math, and links
  const regex = /(\*\*.*?\*\*|\$[^\$]+\$|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Bold text **text**
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      return (
        <strong key={index} className="font-extrabold text-[#141D30]">
          {inner}
        </strong>
      );
    }

    // Inline math $formula$
    if (part.startsWith('$') && part.endsWith('$')) {
      const math = cleanMathFormula(part);
      return (
        <span
          key={index}
          className="inline-flex items-center px-2 py-0.5 mx-1 rounded-md bg-[#FAF8FF] border border-[#B2CBF4] text-[#4B6AD9] font-mono font-bold text-xs md:text-sm"
          dir="ltr"
        >
          {math}
        </span>
      );
    }

    // Markdown link [text](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const [, linkText, linkUrl] = linkMatch;
      return (
        <Link
          key={index}
          href={linkUrl}
          className="text-[#4B6AD9] font-bold underline hover:text-[#26395E] transition-colors"
        >
          {linkText}
        </Link>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

export const BlogContentRenderer: React.FC<BlogContentRendererProps> = ({ content }) => {
  const lines = content.trim().split('\n');
  const renderedBlocks: React.ReactNode[] = [];

  let currentListType: 'ul' | 'ol' | null = null;
  let listItems: string[] = [];

  let inTable = false;
  let tableRows: string[][] = [];

  const flushList = (keyPrefix: number) => {
    if (!currentListType || listItems.length === 0) return;

    if (currentListType === 'ul') {
      renderedBlocks.push(
        <ul
          key={`ul-${keyPrefix}`}
          className="my-5 space-y-3 bg-[#FAF8FF] p-5 sm:p-6 rounded-2xl border border-[#B2CBF4]/50 shadow-xs list-none"
        >
          {listItems.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-700 text-sm md:text-base leading-relaxed">
              <span className="w-2 h-2 rounded-full bg-[#4B6AD9] mt-2 shrink-0"></span>
              <span className="flex-1">{renderInlineFormatting(item)}</span>
            </li>
          ))}
        </ul>
      );
    } else {
      renderedBlocks.push(
        <ol
          key={`ol-${keyPrefix}`}
          className="my-5 space-y-3.5 bg-[#FAF8FF] p-5 sm:p-6 rounded-2xl border border-[#B2CBF4]/50 shadow-xs list-none"
        >
          {listItems.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-700 text-sm md:text-base leading-relaxed">
              <span className="w-6 h-6 rounded-full bg-[#4B6AD9] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                {i + 1}
              </span>
              <span className="flex-1 font-medium">{renderInlineFormatting(item)}</span>
            </li>
          ))}
        </ol>
      );
    }

    currentListType = null;
    listItems = [];
  };

  const flushTable = (keyPrefix: number) => {
    if (!inTable || tableRows.length === 0) return;

    const currentTable = [...tableRows];
    tableRows = [];
    inTable = false;

    renderedBlocks.push(
      <div key={`table-${keyPrefix}`} className="my-6 overflow-x-auto rounded-2xl border border-[#D9D9D9] shadow-soft">
        <table className="w-full text-right text-xs md:text-sm border-collapse bg-white overflow-hidden">
          {currentTable.length > 0 && (
            <thead>
              <tr className="bg-gradient-to-r from-[#FAF8FF] to-[#FAF8FF]/60 border-b border-[#D9D9D9] text-[#141D30] font-black">
                {currentTable[0].map((th, hIdx) => (
                  <th key={hIdx} className="p-3.5 sm:p-4 text-xs md:text-sm">
                    {renderInlineFormatting(th)}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="divide-y divide-[#D9D9D9]/50">
            {currentTable.slice(1).map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-[#FAF8FF]/80 transition-colors">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="p-3.5 sm:p-4 text-slate-700 font-medium">
                    {renderInlineFormatting(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // 1. Table rows handling
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList(idx);
      inTable = true;
      const cells = trimmed
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim());

      // Skip separator rows like |:---|:---|
      if (!cells.every((c) => /^:?-+:?$/.test(c))) {
        tableRows.push(cells);
      }
      return;
    } else if (inTable) {
      flushTable(idx);
    }

    // 2. Unordered lists (- or *)
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (currentListType && currentListType !== 'ul') {
        flushList(idx);
      }
      currentListType = 'ul';
      listItems.push(trimmed.replace(/^[-*]\s+/, ''));
      return;
    }

    // 3. Ordered lists (1., 2., etc.)
    if (/^\d+\.\s/.test(trimmed)) {
      if (currentListType && currentListType !== 'ol') {
        flushList(idx);
      }
      currentListType = 'ol';
      listItems.push(trimmed.replace(/^\d+\.\s+/, ''));
      return;
    }

    // Flush any pending lists if this line is not a list item
    flushList(idx);

    // Empty lines
    if (!trimmed) return;

    // 4. Heading Level 2 (## )
    if (trimmed.startsWith('## ')) {
      const titleText = trimmed.replace('## ', '');
      const id = titleText.toLowerCase().replace(/[^\w\u0600-\u06FF]+/g, '-');
      renderedBlocks.push(
        <h2
          key={idx}
          id={id}
          className="text-xl sm:text-2xl md:text-3xl font-black text-[#141D30] mt-12 mb-5 scroll-mt-24 flex items-center gap-3 border-b border-[#D9D9D9]/60 pb-3"
        >
          <span className="w-2.5 h-7 rounded-full bg-[#4B6AD9] inline-block shrink-0"></span>
          <span>{titleText}</span>
        </h2>
      );
      return;
    }

    // 5. Heading Level 3 (### )
    if (trimmed.startsWith('### ')) {
      const titleText = trimmed.replace('### ', '');
      renderedBlocks.push(
        <h3
          key={idx}
          className="text-lg sm:text-xl font-bold text-[#141D30] mt-8 mb-3 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#4B6AD9]/70 inline-block"></span>
          <span>{titleText}</span>
        </h3>
      );
      return;
    }

    // 6. Blockquotes and Callout Alerts (> )
    if (trimmed.startsWith('> ')) {
      const alertContent = trimmed.replace('> ', '');
      const isWarning = alertContent.includes('⚠️') || alertContent.includes('تحذير') || alertContent.includes('خطأ');
      const isTip = alertContent.includes('💡') || alertContent.includes('نصيحة') || alertContent.includes('ملاحظة');

      renderedBlocks.push(
        <div
          key={idx}
          className={`my-6 p-5 rounded-2xl border-s-4 flex items-start gap-3 text-sm md:text-base leading-relaxed ${
            isWarning
              ? 'bg-amber-50 border-amber-500 text-amber-950 shadow-xs'
              : isTip
              ? 'bg-blue-50 border-[#4B6AD9] text-blue-950 shadow-xs'
              : 'bg-[#FAF8FF] border-[#4B6AD9] text-[#141D30] shadow-xs'
          }`}
        >
          {isWarning ? (
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          ) : isTip ? (
            <Lightbulb className="w-5 h-5 text-[#4B6AD9] mt-0.5 shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-[#4B6AD9] mt-0.5 shrink-0" />
          )}
          <div className="flex-1">{renderInlineFormatting(alertContent)}</div>
        </div>
      );
      return;
    }

    // 7. Standalone Math Formula Block ($$ ... $$)
    if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
      const formulaText = cleanMathFormula(trimmed);
      renderedBlocks.push(
        <div
          key={idx}
          className="my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#FAF8FF] via-white to-[#FAF8FF] border-2 border-[#B2CBF4] shadow-sm text-center relative overflow-hidden group"
        >
          <div className="absolute top-2.5 start-3 flex items-center gap-1 text-[11px] font-bold text-[#4B6AD9] bg-[#FAF8FF] px-2.5 py-0.5 rounded-full border border-[#B2CBF4]">
            <Calculator className="w-3 h-3" />
            <span>معادلة حسابية</span>
          </div>

          <div
            className="pt-4 text-base sm:text-lg md:text-xl font-black text-[#141D30] tracking-wide dir-ltr leading-loose font-mono"
            dir="ltr"
          >
            {formulaText}
          </div>
        </div>
      );
      return;
    }

    // 8. Horizontal Divider (---)
    if (trimmed === '---') {
      renderedBlocks.push(
        <hr key={idx} className="my-10 border-t border-[#D9D9D9]/80" />
      );
      return;
    }

    // 9. Standard Paragraph
    renderedBlocks.push(
      <p key={idx} className="text-slate-700 text-sm md:text-base leading-relaxed my-4 text-justify">
        {renderInlineFormatting(trimmed)}
      </p>
    );
  });

  // Flush any final unclosed list or table
  flushList(lines.length);
  flushTable(lines.length);

  return <div className="space-y-2">{renderedBlocks}</div>;
};
