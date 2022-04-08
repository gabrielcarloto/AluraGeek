import Link from 'next/link';
import Image from 'next/image';
import { css } from "@stitches/react";
import { useSession } from 'next-auth/react';
import Button from '../../components/Button';

function ProductsTitle({ title, search, all, categoryAll, link }) {
  const { data: session } = useSession();
  const isAdmin = session 
                  && session.user 
                  && session.user.name === "Admin"
                  && session.user.email === "nevergonna@giveyou.up";

  const isAll = all || categoryAll;

  const ProductsTitle = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',

    'h2': {
      fontSize: '22px',
      fontWeight: '700',
      lineHeight: '26px',
      // textTransform: `${title === 'Todos os produtos' || search  ? 'none' : 'capitalize'}`,
      color: '#464646',

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

      'a': {
        fontSize: '14px',
        fontWeight: '700',
        lineHeight: '16px',
        color: '#2A7AE4',

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
              <Image src="/arrow.svg" width="20px" height="20px" layout="responsive" alt="seta" />
            </div>
          </div>
        </Link>
      )}
      {categoryAll && (
        <Link passHref href={`/products/category?q=${link || title.toLowerCase()}`} scroll={false}>
          <div className="products-link">
            <a>Ver tudo</a>
            <div className="products-arrow">
              <Image src="/arrow.svg" width="20px" height="20px" layout="responsive" alt="seta" />
            </div>
          </div>
        </Link>
      )}
      {!isAll && isAdmin && (
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