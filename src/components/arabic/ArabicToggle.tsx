'use client';

import { FC, ReactNode } from 'react';

interface ArabicToggleProps {
  showArabic: boolean;
  toggleArabic: () => void;
}

export const ArabicToggle: FC<ArabicToggleProps> = ({ showArabic, toggleArabic }) => {
  return (
    <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
      <button
        onClick={toggleArabic}
        className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
      >
        <span>{showArabic ? '🔼 Hide Arabic version' : '🔽 Show Arabic version'}</span>
      </button>
    </div>
  );
};

interface ArabicContentProps {
  show: boolean;
  children: ReactNode;
}

export const ArabicContent: FC<ArabicContentProps> = ({ show, children }) => {
  if (!show) return null;

  return (
    <div className="mt-4 text-right" dir="rtl">
      {children}
    </div>
  );
};
