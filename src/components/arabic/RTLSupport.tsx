'use client';

import { useEffect } from 'react';

// This component adds RTL support for Arabic content
export const RTLProvider = ({ children }: { children: React.ReactNode }) => {
  // Add RTL support for Arabic fonts
  useEffect(() => {
    // Add Arabic font styles
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Amiri';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/amiri/v17/J7aRnpd8CGxBHpUrtLMA7w.woff2) format('woff2');
        unicode-range: U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC;
      }
      
      [dir="rtl"] {
        font-family: 'Amiri', serif;
      }
      
      [dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3, [dir="rtl"] h4, [dir="rtl"] h5, [dir="rtl"] h6 {
        font-family: 'Amiri', serif;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return <>{children}</>;
};

// Helper function to determine if text contains Arabic characters
export const containsArabic = (text: string): boolean => {
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return arabicPattern.test(text);
};

// Helper function to apply RTL class if text contains Arabic
export const getRTLClass = (text: string): string => {
  return containsArabic(text) ? 'rtl' : '';
};
