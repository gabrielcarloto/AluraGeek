import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import Button from '@components/Button';
import { css } from '@styles/theme';
import { isAdmin } from '@utils/admin';

interface ProductsTitleProps {
  title: string;
  all?: boolean;
  categoryAll?: boolean;
  link?: string | undefined;
  search?: boolean;
}

function ProductsTitle({
  title,
  all,
  categoryAll,
  link,
  search,
}: ProductsTitleProps) {
  const { data: session } = useSession();
  const isUserAdmin = isAdmin(session);

  const isAll = all || categoryAll;

  const ProductsTitle = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: search ? 'column' : 'row',
    marginBottom: '16px',

    '@media (min-width: 768px)': {
      flexDirection: 'row',
    },

    h2: {
      fontSize: '22px',
      fontWeight: '700',
      lineHeight: '26px',

      '@media (min-width: 1024px)': {
        fontSize: '32px',
        lineHeight: '36px',
      },
    },

    '.products-link': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      alignSelf: search ? 'flex-end' : 'center',

      a: {
        fontSize: '14px',
        fontWeight: '700',
        lineHeight: '16px',
        color: '$primary',

        '@media (min-width: 768px)': {
          fontSize: '16px',
          lineHeight: '18px',
        },
      },

      '.products-arrow': {
        width: '10px',
        height: '10px',
        marginLeft: '7px',

        '@media (min-width: 768px)': {
          width: '16px',
          height: '16px',
          marginLeft: '12px',
        },
      },
    },

    '.add-product-btn': {
      width: '150px',
      alignSelf: 'flex-end',

      '@media (min-width: 768px)': {
        width: '165px',
      },
    },
  });

  return (
    <div className={ProductsTitle()}>
      <h2>{title}</h2>
      {all && (
        <Link passHref href="/products" scroll={false}>
          <div className="products-link">
            <a>Ver todos os produtos</a>
            <div className="products-arrow">
              <Image
                src="/arrow.svg"
                width="20px"
                height="20px"
                layout="responsive"
                alt="seta"
              />
            </div>
          </div>
        </Link>
      )}
      {categoryAll && (
        <Link
          passHref
          href={`/products/category?q=${link || title.toLowerCase()}`}
          scroll={false}
        >
          <div className="products-link">
            <a>Ver tudo</a>
            <div className="products-arrow">
              <Image
                src="/arrow.svg"
                width="20px"
                height="20px"
                layout="responsive"
                alt="seta"
              />
            </div>
          </div>
        </Link>
      )}
      {!isAll && isUserAdmin && (
        <Link passHref href="/products/new" scroll={false}>
          <Button className="add-product-btn" color="primary">
            Adicionar produto
          </Button>
        </Link>
      )}
    </div>
  );
}

export default ProductsTitle;
