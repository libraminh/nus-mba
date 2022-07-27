import Head from 'next/head';
import BaseHeader from '../BaseHeader';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>NUS MBA Programme Builder</title>
        <meta name='description' content='NUS MBA Programme Builder' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <BaseHeader />

      <div className='app-wrapper max-w-1456 mx-auto'>{children}</div>
    </>
  );
};

export default Layout;
