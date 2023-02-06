import React, { ChangeEvent, FormEvent, useState } from 'react';
import { MdAdd, MdImage } from 'react-icons/md';
import type { Product } from '@prisma/client';
import { AnimatePresence } from 'framer-motion';
import type { NextPage, NextPageContext } from 'next';
import NProgress from 'nprogress';

import Button from '@components/Button/index';
import ErrorDialog from '@components/Error';
import Head from '@components/Head';
import LabeledInput from '@components/Inputs/LabeledInput';
import Success from '@components/Success';
import Title from '@components/Title';
import Spacer from '@components/utils/Spacer';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { BASE_API_URL, fetcher, isDefined, keysAreOfValue } from '@utils/all';
import type { UndefinedPartial } from '@utils/types';

import {
  AdminPageContainer,
  FileInput,
  FileInputButton,
  FileInputContainer,
  FileInputLabel,
  NewProductFile,
  NewProductForm,
  NewProductIcon,
} from './Admin.styles';

interface Props {
  product: Product | undefined;
}

const AdminPage: NextPage<Props> = ({ product }) => {
  const [error, setError] = React.useState<string>();
  const [success, setSuccess] = React.useState<boolean>();

  const title = (product ? 'Editar' : 'Adicionar') + ' produto';

  const [form, setForm] = useState<Omit<Product, 'alt' | 'id'>>(
    product ?? {
      name: '',
      price: 0,
      image: '',
      description: '',
      category: '',
    },
  );

  const isMobile = useMediaQuery('768px');

  function handleChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) {
    setForm((prevForm) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;

      return {
        ...prevForm,
        [target.name]: target['value'],
      } as typeof prevForm; // TODO: remove casting maybe
    });
  }

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    const reader = new FileReader();

    if (file) reader.readAsDataURL(file);
    else setError('Ocorreu um erro');

    reader.onloadend = async () => {
      const stringifiedImage = reader.result;
      const [data, error] = await uploadProductImage(stringifiedImage);

      if (data) {
        setForm((prevForm) => {
          return {
            ...prevForm,
            image: data.link,
          } as typeof prevForm; // TODO: remove casting maybe
        });
      } else if (error) {
        setError(error.message);
      }
    };
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (keysAreOfValue(form, '')) {
      return setError('Preencha todos os campos');
    } else if (isDefined(form) && !form.image.includes('http')) {
      return setError('Insira uma URL válida para a imagem');
    } else if (isDefined(form) && form.price < 0) {
      return setError('O preço não pode ser negativo');
    }

    const pwrd = prompt('Insira a senha para adicionar o produto:');

    NProgress.start();
    setError(undefined);

    if (isDefined(form) && pwrd) {
      const productData = {
        ...form,
        alt: form.name,
        price: form.price, // ! maybe it has to be converted from string to number
        id: product?.id,
      };

      try {
        await saveProduct(productData, pwrd, product ? 'PUT' : 'POST');
        NProgress.done();
        setSuccess(true);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          console.error(err);
        }
      }
    }
  }

  return (
    <>
      <Head title={title} removeSeo />
      <Spacer responsive={1} />
      <AdminPageContainer>
        <Title>{title}</Title>

        <NewProductForm onSubmit={handleSubmit}>
          <FileInputContainer>
            <NewProductFile>
              {isMobile ? (
                <>
                  <MdAdd className={NewProductIcon()} />
                  <FileInputLabel htmlFor="product-image">
                    Adicionar uma imagem para o produto
                  </FileInputLabel>
                </>
              ) : (
                <>
                  <MdImage className={NewProductIcon()} />
                  <FileInputLabel
                    className="new-product-file-label"
                    htmlFor="product-image"
                  >
                    Arraste para adicionar uma imagem para o produto
                  </FileInputLabel>
                </>
              )}

              <FileInput
                type="file"
                id="product-image"
                onChange={handleImageUpload}
              />
            </NewProductFile>
            {!isMobile && (
              <>
                <p>Ou</p>
                <FileInputButton color="secondary" type="button">
                  Procure nos seus arquivos
                  <FileInput type="file" id="product-image" />
                </FileInputButton>
              </>
            )}
          </FileInputContainer>

          <LabeledInput
            label="Nome do produto"
            name="name"
            type="text"
            maxLength={20}
            inputValue={form?.name}
            handleChange={handleChange}
          />
          <LabeledInput
            label="Imagem do produto"
            name="image"
            type="url"
            inputValue={form?.image}
            handleChange={handleChange}
          />
          <LabeledInput
            label="Categoria do produto"
            name="category"
            type="text"
            maxLength={20}
            inputValue={form?.category}
            handleChange={handleChange}
          />
          <LabeledInput
            label="Preço do produto"
            name="price"
            type="number"
            inputValue={form?.price}
            handleChange={handleChange}
          />
          <LabeledInput
            label="Descrição do produto"
            name="description"
            textarea
            maxLength={150}
            inputValue={form?.description}
            handleChange={handleChange}
          />

          <Button type="submit" color="primary">
            Salvar produto
          </Button>
        </NewProductForm>
      </AdminPageContainer>
      <Spacer responsive={1} />
      <AnimatePresence>
        {error && <ErrorDialog error={error} setState={setError} close />}
        {success && <Success state={success} setState={setSuccess} />}
      </AnimatePresence>
    </>
  );
};

async function uploadProductImage(
  stringifiedImage: string | ArrayBuffer | null,
) {
  let data: { link: string } | null | undefined, error: Error | undefined;

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: stringifiedImage,
    });

    if (!res.ok) throw new Error(res.statusText);

    data = await res.json();
  } catch (err) {
    if (err instanceof Error) error = err;
    console.error(err);
  }

  return [data, error] as const;
}
async function saveProduct(
  data: UndefinedPartial<Product>,
  password: string,
  method: 'PUT' | 'POST',
) {
  const response = await fetch('/api/products', {
    method,
    headers: {
      Authorization: password,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error(response.statusText);
}

AdminPage.getInitialProps = async ({
  query,
}: NextPageContext & { query: { product: string } }) => {
  if (!query['product']) return { product: undefined };

  const id = query['product'];
  const product = await fetcher<Product>(`${BASE_API_URL}/products/${id}`);

  return {
    product,
  };
};

export default AdminPage;
