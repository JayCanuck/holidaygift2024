import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Amaranth } from 'next/font/google';
import 'normalize.css';
import './index.css';
import { NuqsAdapter } from 'nuqs/adapters/next/pages';

const queryClient = new QueryClient();

const amaranth = Amaranth({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-amaranth'
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <main className={amaranth.variable}>
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </NuqsAdapter>
  );
}
