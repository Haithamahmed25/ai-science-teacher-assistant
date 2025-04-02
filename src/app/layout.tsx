import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { RTLProvider } from '@/components/arabic/RTLSupport';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Science Teacher Assistant',
  description: 'AI-powered content generation, lesson planning, assessment creation, and STEM integration for science teachers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-gray-50 dark:bg-gray-900`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <RTLProvider>
            <Navbar />
            <div className="pt-16">
              {children}
            </div>
          </RTLProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
