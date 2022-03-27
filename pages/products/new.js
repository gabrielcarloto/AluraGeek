import React from 'react';
import { css } from '../../styles/theme';
import { MdAdd, MdImage } from 'react-icons/md';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Button/index';
import FloatLabel from '../../components/Inputs/FloatLabel';
import Container from '../../components/utils/Container';
import Spacer from '../../components/utils/Spacer';

export default function NewProduct() {
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


      'label': {
        top: '11px',
        left: '21px',
        transform: 'scale(1.2)',
        fontSize: '12px',
        fontWeight: '400',

        '&.active': {
          transform: 'translate(-10px, -2px) scale(1)',
        },

        '&.desc-label': {
          left: '23px',

          '&.active': {
            transform: 'translate(-12px, -2px) scale(1)',
          },
        },
  
        '@media (min-width: 768px)': {
          'label': {
            left: '22px',

            '&.active': {
              transform: 'translate(11px, 6px) scale(1)',
            },
          },
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
    const [nameValue, setNameValue] = React.useState('');
    const [priceValue, setPriceValue] = React.useState('');
    const [descValue, setDescValue] = React.useState('');

    const nameLabelBg = React.useRef(null);
    const priceLabelBg = React.useRef(null);
    const descLabelBg = React.useRef(null);

    function toggleClass(ref, className) {
      ref.current.classList.toggle(className);
    }

    return (
      <form className="new-product-form">
        <div className="new-product-file-container">
          <div className="new-product-file">
            <MdImage className="new-product-file-icon desktop" />
            <MdAdd className="new-product-file-icon mobile" />
            <label className="new-product-file-label mobile" htmlFor="product-image">
              Adicionar uma imagem para o produto
            </label>
            <label className="new-product-file-label desktop" htmlFor="product-image">
              Arraste para adicionar uma imagem para o produto
            </label>
            <input type="file" id="product-image" />
          </div>
          <p className="desktop">
            Ou
          </p>
          <Button className="desktop" color="secondary" type="button">
            Procure nos seus arquivos
            <input type="file" id="product-image" />
          </Button>
        </div>
        <div className={FloatLabel()}>
          <div
            className={'label-background focus' + (nameValue == '' ? '' : ' active')}
            ref={nameLabelBg}
          />
          <Input 
            type="text"
            id="name"
            label="true"
            onChange={event => setNameValue(event.target.value)}
            onFocus={() => toggleClass(nameLabelBg, 'focus')}
            onBlur={() => toggleClass(nameLabelBg, 'focus')}
          />
          <label 
            className={'name-label float-label' + (nameValue !== '' ? ' active' : '')}
            htmlFor="name"
          >
            Nome do produto
          </label>
        </div>
        <div className={FloatLabel()}>
          <div
            className={'label-background focus' + (priceValue == '' ? '' : ' active')}
            ref={priceLabelBg}
          />
          <Input 
            type="text"
            id="price"
            label="true"
            onChange={event => setPriceValue(event.target.value)}
            onFocus={() => toggleClass(priceLabelBg, 'focus')}
            onBlur={() => toggleClass(priceLabelBg, 'focus')}
          />
          <label 
            className={'price-label float-label' + (priceValue !== '' ? ' active' : '')}
            htmlFor="description"
          >
            Preço do produto
          </label>
        </div>
        <div className={FloatLabel()}>
          <div 
            className={'label-background focus' + (descValue == '' ? '' : ' active')}
            ref={descLabelBg}
          />
          <Input
            type="text"
            id="description"
            label="true"
            onChange={event => setDescValue(event.target.value)}
            onFocus={() => toggleClass(descLabelBg, 'focus')}
            onBlur={() => toggleClass(descLabelBg, 'focus')}
          />
          <label
            className={'desc-label float-label' + (descValue !== '' ? ' active' : '')}
            htmlFor="description"
          >
            Descrição do produto
          </label>
        </div>
        <Button type="submit" color="primary">
          Adicionar produto
        </Button>
      </form>
    )
  };

  return (
    <>
      <Spacer responsive={1} />
      <Container className={NewProductContainer()}>
        <h1 className="new-product-title">Adicionar produto</h1>
        <Form />
      </Container>
      <Spacer responsive={1} />
    </>
  )
}

NewProduct.auth = true;