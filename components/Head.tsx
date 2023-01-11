import Head from 'next/head';
import { useRouter } from 'next/router';

import { BASE_URL } from '@utils/baseUrl';

interface LayoutProps {
  title: string;
  description?: string;
  image?: string;
}

export default function Layout({ title, description, image }: LayoutProps) {
  const router = useRouter();

  const metaTitle = `${title} | AluraGeek`;
  const metaUrl = BASE_URL + router.pathname;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="title" content={metaTitle} />

      <meta property="og:title" content={metaTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={metaUrl} />

      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={metaUrl} />

      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />

          <meta property="twitter:description" content={description} />
        </>
      )}

      {image && (
        <>
          <meta property="og:image" content={image} />

          <meta property="twitter:image" content={image} />
        </>
      )}
    </Head>
  );
}
