import React from 'react';

interface ResultStatProps {
  label: string;
  value: string | number;
  subValue?: string;
  badge?: string;
  badgeVariant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  icon?: React.ReactNode;
  highlight?: boolean;
  highlightVariant?: 'primary' | 'success' | 'danger' | 'dark';
  helpText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ResultStat: React.FC<ResultStatProps> = ({
  label,
  value,
  subValue,
  badge,
  badgeVariant = 'neutral',
  icon,
  highlight = false,
  highlightVariant = 'primary',
  helpText,
  size = 'md',
}) => {
  const getHighlightClasses = () => {
    if (!highlight) return 'bg-white border-[#D9D9D9] text-[#141D30]';
    switch (highlightVariant) {
      case 'success':
        return 'bg-emerald-50/80 border-emerald-300 text-emerald-950 shadow-xs';
      case 'danger':
        return 'bg-[#FF7373]/10 border-[#FF7373]/40 text-[#141D30] shadow-xs';
      case 'dark':
        return 'bg-[#141D30] border-[#26395E] text-white shadow-md';
      case 'primary':
      default:
        return 'bg-[#FAF8FF] border-[#B2CBF4] text-[#141D30] shadow-xs';
    }
  };

  const getBadgeClasses = () => {
    switch (badgeVariant) {
      case 'success':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'danger':
        return 'bg-[#FF7373]/15 text-rose-800 border-[#FF7373]/40';
      case 'warning':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'info':
        return 'bg-[#FAF8FF] text-[#4B6AD9] border-[#B2CBF4]';
      case 'neutral':
      default:
        return 'bg-slate-100 text-slate-700 border-[#D9D9D9]';
    }
  };

  const getValueSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'text-lg md:text-xl font-bold';
      case 'lg':
        return 'text-2xl md:text-4xl font-extrabold tracking-tight';
      case 'md':
      default:
        return 'text-xl md:text-2xl font-bold';
    }
  };

  return (
    <div
      className={`relative p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${getHighlightClasses()}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className={`text-xs md:text-sm font-medium ${highlight && highlightVariant === 'dark' ? 'text-[#B2CBF4]' : 'text-slate-600'}`}>
          {label}
        </span>
        {badge && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${getBadgeClasses()}`}>
            {badge}
          </span>
        )}
        {icon && <div className="text-[#4B6AD9] shrink-0">{icon}</div>}
      </div>

      <div className="flex flex-col">
        <span className={`${getValueSizeClass()} font-mono dir-ltr text-right`}>
          {value}
        </span>
        {subValue && (
          <span
            className={`text-xs mt-1 ${
              highlight && highlightVariant === 'dark' ? 'text-[#B0B0B0]' : 'text-slate-500'
            }`}
          >
            {subValue}
          </span>
        )}
      </div>

      {helpText && (
        <p className={`text-xs mt-2 pt-2 border-t ${highlight && highlightVariant === 'dark' ? 'border-[#26395E] text-[#B0B0B0]' : 'border-slate-100 text-slate-500'}`}>
          {helpText}
        </p>
      )}
    </div>
  );
};
