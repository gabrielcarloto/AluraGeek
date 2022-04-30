import React, { useState } from 'react';
import Head from 'next/head';
import { css } from '../../styles/theme';
import { MdAdd, MdImage } from 'react-icons/md';
import { AnimatePresence } from 'framer-motion';
import NProgress from 'nprogress';
import Button from '../../components/Button/index';
import Container from '../../components/utils/Container';
import Spacer from '../../components/utils/Spacer';
import Error from '../../components/Error';
import Success from '../../components/Success';
import LabeledInput from '../../components/Inputs/LabeledInput';

const fetcher = (url) => fetch(url).then((res) => res.json());
const dev = process.env.NODE_ENV !== 'production';
const baseURL = dev
  ? 'http://localhost:3000/api'
  : 'https://alura-geek-mocha.vercel.app/api';

export default function AdminPage({ product }) {
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const NewProductContainer = css({
    '@media (min-width: 1024px)': {
      padding: '0 30%',
    },

    '.new-product-title': {
      fontSize: '22px',

      '@media (min-width: 1024px)': {
        fontSize: '32px',
      },
    },

    '.new-product-form': {
      marginTop: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',

      '.new-product-file-container': {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',

        'input[type="file"]': {
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: '0px',
          left: '0px',
          opacity: 0,
          cursor: 'pointer',
        },

        '.new-product-file': {
          width: '100%',
          height: '140px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '20px',
          backgroundColor: '$lightBackground',
          border: '1px dashed $border',

          '@media (min-width: 768px)': {
            height: '154px',
          },

          '.new-product-file-icon': {
            width: '35px',
            height: '35px',
            color: '$lightText',

            '@media (min-width: 768px)': {
              width: '44px',
              height: '44px',
            },
          },

          '.new-product-file-label': {
            width: '100%',
            textAlign: 'center',
            fontWeight: '400',
            color: '#6B6B6B',
          },
        },

        [`${Button}`]: {
          position: 'relative',
          width: '50%',
        },
      },
    },

    '.desktop': {
      display: 'none',
    },

    '@media (min-width: 768px)': {
      '.desktop': {
        display: 'block',
      },

      '.mobile': {
        display: 'none',
      },
    },
  });

  function Form() {
    const [form, setForm] = useState({
      name: product.name || '',
      image: product.image || '',
      category: product.category || '',
      price: product.price || '',
      description: product.description || '',
    });

    function handleChange(e) {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }

    function uploadImage(e) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result;

        fetch('/api/upload', {
          method: 'POST',
          body: base64Image,
        })
          .then((r) => {
            if (r.statusText === 'Body exceeded 1mb limit') {
              setError('Envie uma imagem menor que 1mb');
              return;
            }

            return r.json();
          })
          .then((data) => {
            if (data) setForm({ ...form, image: data.link });
          });
      };

      reader.readAsDataURL(file);
    }

    async function handleSubmit(e) {
      e.preventDefault();

      if (
        form.name == '' ||
        form.image == '' ||
        form.category == '' ||
        form.price == ''
      ) {
        setError('Preencha todos os campos');
        return;
      } else if (!form.image.includes('http')) {
        setError('Insira uma URL válida para a imagem');
        return;
      } else if (form.price < 0) {
        setError('O preço não pode ser negativo');
        return;
      }

      const pwrd = prompt('Insira a senha para adicionar o produto:');

      NProgress.start();
      setError(false);

      const productData = {
        ...form,
        alt: form.name,
        price: parseInt(form.price),
        id: product.id || undefined,
      };

      await saveProduct(productData, pwrd);
    }

    async function saveProduct(data, pass) {
      let response;

      if (!product) {
        response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            Authorization: `${pass}`,
          },
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch('/api/products', {
          method: 'PUT',
          headers: {
            Authorization: `${pass}`,
          },
          body: JSON.stringify(data),
        });
      }

      NProgress.done();

      if (!response.ok) {
        setError('Erro ao salvar produto');
        return;
      }
      setSuccess(true);
    }

    return (
      <form className="new-product-form" onSubmit={handleSubmit}>
        <div className="new-product-file-container">
          <div className="new-product-file">
            <MdImage className="new-product-file-icon desktop" />
            <MdAdd className="new-product-file-icon mobile" />
            <label
              className="new-product-file-label mobile"
              htmlFor="product-image"
            >
              Adicionar uma imagem para o produto
            </label>
            <label
              className="new-product-file-label desktop"
              htmlFor="product-image"
            >
              Arraste para adicionar uma imagem para o produto
            </label>
            <input type="file" id="product-image" onChange={uploadImage} />
          </div>
          <p className="desktop">Ou</p>
          <Button className="desktop" color="secondary" type="button">
            Procure nos seus arquivos
            <input type="file" id="product-image" />
          </Button>
        </div>
        <LabeledInput
          label="Nome do produto"
          name="name"
          type="text"
          maxLength="20"
          inputValue={form.name}
          handleChange={handleChange}
        />
        <LabeledInput
          label="Imagem do produto"
          name="image"
          type="url"
          inputValue={form.image}
          handleChange={handleChange}
        />
        <LabeledInput
          label="Categoria do produto"
          name="category"
          type="text"
          maxLength="20"
          inputValue={form.category}
          handleChange={handleChange}
        />
        <LabeledInput
          label="Preço do produto"
          name="price"
          type="number"
          inputValue={form.price}
          handleChange={handleChange}
        />
        <LabeledInput
          label="Descrição do produto"
          name="description"
          textarea
          maxLength="150"
          inputValue={form.description}
          handleChange={handleChange}
        />
        <Button type="submit" color="primary">
          Salvar produto
        </Button>
      </form>
    );
  }

  return (
    <>
      <Head>
        <title>{product ? 'Editar' : 'Adicionar'} produto | AluraGeek</title>
      </Head>
      <Spacer responsive={1} />
      <Container className={NewProductContainer()}>
        <h1 className="new-product-title">
          {product ? 'Editar' : 'Adicionar'} produto
        </h1>
        <Form />
      </Container>
      <Spacer responsive={1} />
      <AnimatePresence>
        {error && (
          <Error error={error} state={error} setState={setError} close />
        )}
        {success && <Success state={success} setState={setSuccess} />}
      </AnimatePresence>
    </>
  );
}

AdminPage.getInitialProps = async ({ query }) => {
  if (!query.product) return { product: false };
  const id = query.product;
  const product = await fetcher(`${baseURL}/products/${id}`);

  return {
    product,
  };
};
