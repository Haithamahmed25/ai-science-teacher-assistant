'use client';

import { AppProps } from 'next/app';
import { RTLProvider } from '@/components/arabic/RTLSupport';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RTLProvider>
      <Component {...pageProps} />
    </RTLProvider>
  );
}

export default MyApp;
