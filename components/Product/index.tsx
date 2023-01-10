import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import type { Product as IProduct } from '@prisma/client';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import NProgress from 'nprogress';

import Error from '@components/Error';
import Success from '@components/Success';
import { isAdmin } from '@utils/admin';

import { ProductStyles } from './Product.styles';

function Product({ product }: { product: IProduct }) {
  const { data: session } = useSession();
  const isUserAdmin = isAdmin(session);

  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<boolean>();

  async function deleteProduct(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    e.preventDefault();

    const pwrd = prompt('Insira a senha para deletar o produto:') || '';

    NProgress.start();

    const response = await fetch(`/api/products/${product.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: pwrd,
      },
    });

    NProgress.done();

    if (!response.ok) {
      setError('Erro ao deletar o produto');
      return;
    }

    setSuccess(true);
  }

  return (
    <>
      <Link
        passHref
        href="/products/[id]"
        as={`/products/${product.id}`}
        key={product.id}
        scroll={false}
      >
        <div className={ProductStyles(isUserAdmin)()}>
          <div className="product-image-container">
            <div className="product-image">
              <Image
                src={product.image}
                alt={product.alt}
                layout="fill"
                objectFit="cover"
              />
              {isUserAdmin && (
                <>
                  <div className="admin-buttons">
                    <Link passHref href={`/admin?product=${product.id}`}>
                      <div>
                        <MdEdit className="admin-button" />
                      </div>
                    </Link>
                    <div onClick={deleteProduct}>
                      <MdDelete className="admin-button delete" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="product-details">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">
              {parseInt(product.price).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
            <a className="product-link">Ver produto</a>
          </div>
        </div>
      </Link>
      <AnimatePresence>
        {error && <Error error={error} setState={setError} close />}
        {success && (
          <Success
            text="Produto deletado com sucesso"
            state={success}
            setState={setSuccess}
            expanded
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Product;
