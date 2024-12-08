import Head from 'next/head';

interface Game {
  name: string;
  code: string;
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Happy Holidays!</title>
        <meta name='description' content='Jay sent you a holiday surprise' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='container'>
        <h1>Hello World</h1>
        <span>This is a test app</span>
      </div>
    </>
  );
}
