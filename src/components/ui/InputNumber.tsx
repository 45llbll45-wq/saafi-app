'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';

interface InputNumberProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
  placeholder?: string;
  helpText?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  prefix?: string;
  disabled?: boolean;
}

export const InputNumber: React.FC<InputNumberProps> = ({
  id,
  label,
  value,
  onChange,
  unit = 'ر.س',
  placeholder = '0.00',
  helpText,
  min = 0,
  max,
  step = 1,
  required = false,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    if (rawVal === '') {
      onChange(0);
      return;
    }
    const num = parseFloat(rawVal);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-[#141D30] flex items-center gap-1.5">
          {label}
          {required && <span className="text-[#FF7373]">*</span>}
        </label>
        {helpText && (
          <div className="group relative flex items-center cursor-help">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-[#4B6AD9] transition-colors" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-52 p-2 bg-[#141D30] text-white text-xs rounded-xl shadow-lg z-30 text-center pointer-events-none border border-[#26395E]">
              {helpText}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#141D30]" />
            </div>
          </div>
        )}
      </div>

      <div className="relative rounded-2xl shadow-xs transition-all focus-within:ring-2 focus-within:ring-[#4B6AD9]/25 focus-within:border-[#4B6AD9] border border-[#D9D9D9] bg-white">
        <input
          type="number"
          id={id}
          name={id}
          value={value === 0 ? '' : value}
          onChange={handleChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className="w-full py-2.5 px-3.5 pe-14 text-base font-medium text-[#141D30] bg-transparent rounded-2xl focus:outline-hidden placeholder:text-slate-400 text-left dir-ltr"
        />
        {unit && (
          <div className="absolute inset-y-0 right-0 flex items-center pe-3.5 pointer-events-none text-xs font-semibold text-slate-500 border-s border-slate-100 ps-2.5">
            {unit}
          </div>
        )}
      </div>
    </div>
  );
};
