import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'slate' | 'outline' | 'secondary';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#FAF8FF] text-[#4B6AD9] border-[#B2CBF4]';
      case 'secondary':
        return 'bg-[#DED1FF]/30 text-[#4B6AD9] border-[#DED1FF]';
      case 'success':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'warning':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'danger':
        return 'bg-[#FF7373]/15 text-rose-800 border-[#FF7373]/40';
      case 'outline':
        return 'bg-transparent text-[#141D30] border-[#D9D9D9]';
      case 'slate':
      default:
        return 'bg-slate-100 text-[#141D30] border-[#D9D9D9]';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-0.5';
      case 'md':
      default:
        return 'text-xs md:text-sm px-2.5 py-1';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${getVariantStyles()} ${getSizeStyles()} ${className}`}
    >
      {children}
    </span>
  );
};
