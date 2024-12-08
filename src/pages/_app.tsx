import type { AppProps } from 'next/app';
import { Amaranth, Peralta, Sriracha } from 'next/font/google';
import 'normalize.css';

const amaranth = Amaranth({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-amaranth'
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={amaranth.variable}>
      <Component {...pageProps} />
    </main>
  );
}
