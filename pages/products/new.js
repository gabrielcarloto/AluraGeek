import React from "react";
import Head from "next/head";
import { css } from "../../styles/theme";
import { MdAdd, MdImage } from "react-icons/md";
import { AnimatePresence } from "framer-motion";
import NProgress from "nprogress";
import Input from "../../components/Inputs/Input";
import Textarea from "../../components/Inputs/Textarea";
import Button from "../../components/Button/index";
import FloatLabel from "../../components/Inputs/FloatLabel";
import Container from "../../components/utils/Container";
import Spacer from "../../components/utils/Spacer";
import Error from "../../components/Error";
import Success from "../../components/Success";

export default function NewProduct() {
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const NewProductContainer = css({
    "@media (min-width: 1024px)": {
      padding: "0 30%",
    },

    ".new-product-title": {
      fontSize: "22px",

      "@media (min-width: 1024px)": {
        fontSize: "32px",
      },
    },

    ".new-product-form": {
      marginTop: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",

      ".new-product-file-container": {
        display: "flex",
        alignItems: "center",
        gap: "8px",

        'input[type="file"]': {
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0px",
          left: "0px",
          opacity: 0,
          cursor: "pointer",
        },

        ".new-product-file": {
          width: "100%",
          height: "140px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: "$lightBackground",
          border: "1px dashed $border",

          "@media (min-width: 768px)": {
            height: "154px",
          },

          ".new-product-file-icon": {
            width: "35px",
            height: "35px",
            color: "$lightText",

            "@media (min-width: 768px)": {
              width: "44px",
              height: "44px",
            },
          },

          ".new-product-file-label": {
            width: "100%",
            textAlign: "center",
            fontWeight: "400",
            color: "#6B6B6B",
          },
        },

        [`${Button}`]: {
          position: "relative",
          width: "50%",
        },
      },

      label: {
        top: "11px",
        left: "21px",
        transform: "scale(1.2)",
        fontSize: "12px",
        fontWeight: "400",

        "&.active": {
          transform: "translate(-10px, -2px) scale(1)",
        },

        "&.image-label": {
          left: "22px",

          "&.active": {
            transform: "translate(-11px, -2px) scale(1)",
          },
        },

        "&.category-label": {
          left: "25px",

          "&.active": {
            transform: "translate(-14px, -2px) scale(1)",
          },
        },

        "&.desc-label": {
          left: "23px",

          "&.active": {
            transform: "translate(-12px, -2px) scale(1)",
          },
        },

        "@media (min-width: 768px)": {
          label: {
            left: "22px",

            "&.active": {
              transform: "translate(11px, 6px) scale(1)",
            },
          },
        },
      },
    },

    ".desktop": {
      display: "none",
    },

    "@media (min-width: 768px)": {
      ".desktop": {
        display: "block",
      },

      ".mobile": {
        display: "none",
      },
    },
  });

  function Form() {
    const [nameValue, setNameValue] = React.useState("");
    const [imageValue, setImageValue] = React.useState("");
    const [categoryValue, setCategoryValue] = React.useState("");
    const [priceValue, setPriceValue] = React.useState("");
    const [descValue, setDescValue] = React.useState("");

    const nameLabelBg = React.useRef(null);
    const imageLabelBg = React.useRef(null);
    const categoryLabelBg = React.useRef(null);
    const priceLabelBg = React.useRef(null);
    const descLabelBg = React.useRef(null);

    function toggleClass(ref, className) {
      ref.current.classList.toggle(className);
    }

    async function handleSubmit(e) {
      e.preventDefault();

      if (
        nameValue == "" ||
        imageValue == "" ||
        categoryValue == "" ||
        priceValue == ""
      ) {
        setError("Preencha todos os campos");
        return;
      } else if (!imageValue.includes("http")) {
        setError("Insira uma URL válida para a imagem");
        return;
      } else if (priceValue < 0) {
        setError("O preço não pode ser negativo");
        return;
      }

      const pwrd = prompt("Insira a senha para adicionar o produto:");

      NProgress.start();
      setError(false);

      const productData = {
        name: nameValue,
        alt: nameValue,
        image: imageValue,
        category: categoryValue,
        price: parseInt(priceValue),
        description: descValue,
      };

      await saveProduct(productData, pwrd);
    }

    async function saveProduct(data, pass) {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          Authorization: `${pass}`,
        },
        body: JSON.stringify(data),
      });

      NProgress.done();

      if (!response.ok) {
        setError("Erro ao salvar produto");
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
            <input type="file" id="product-image" />
          </div>
          <p className="desktop">Ou</p>
          <Button className="desktop" color="secondary" type="button">
            Procure nos seus arquivos
            <input type="file" id="product-image" />
          </Button>
        </div>
        <div className={FloatLabel()}>
          <div
            className={
              "label-background focus" + (nameValue == "" ? "" : " active")
            }
            ref={nameLabelBg}
          />
          <Input
            type="text"
            id="name"
            maxLength="20"
            label="true"
            onChange={(event) => setNameValue(event.target.value)}
            onFocus={() => toggleClass(nameLabelBg, "focus")}
            onBlur={() => toggleClass(nameLabelBg, "focus")}
          />
          <label
            className={
              "name-label float-label" + (nameValue !== "" ? " active" : "")
            }
            htmlFor="name"
          >
            Nome do produto
          </label>
        </div>
        <div className={FloatLabel()}>
          <div
            className={
              "label-background focus" + (imageValue == "" ? "" : " active")
            }
            ref={imageLabelBg}
          />
          <Input
            type="text"
            id="image-url"
            label="true"
            onChange={(event) => setImageValue(event.target.value)}
            onFocus={() => toggleClass(imageLabelBg, "focus")}
            onBlur={() => toggleClass(imageLabelBg, "focus")}
          />
          <label
            className={
              "image-label float-label" + (imageValue !== "" ? " active" : "")
            }
            htmlFor="image-url"
          >
            Imagem do produto
          </label>
        </div>
        <div className={FloatLabel()}>
          <div
            className={
              "label-background focus" + (categoryValue == "" ? "" : " active")
            }
            ref={categoryLabelBg}
          />
          <Input
            type="text"
            id="category"
            maxLength="20"
            label="true"
            onChange={(event) => setCategoryValue(event.target.value)}
            onFocus={() => toggleClass(categoryLabelBg, "focus")}
            onBlur={() => toggleClass(categoryLabelBg, "focus")}
          />
          <label
            className={
              "category-label float-label" +
              (categoryValue !== "" ? " active" : "")
            }
            htmlFor="category"
          >
            Categoria do produto
          </label>
        </div>
        <div className={FloatLabel()}>
          <div
            className={
              "label-background focus" + (priceValue == "" ? "" : " active")
            }
            ref={priceLabelBg}
          />
          <Input
            type="number"
            id="price"
            label="true"
            onChange={(event) => setPriceValue(event.target.value)}
            onFocus={() => toggleClass(priceLabelBg, "focus")}
            onBlur={() => toggleClass(priceLabelBg, "focus")}
          />
          <label
            className={
              "price-label float-label" + (priceValue !== "" ? " active" : "")
            }
            htmlFor="price"
          >
            Preço do produto
          </label>
        </div>
        <div className={FloatLabel()}>
          <div
            className={
              "label-background focus" + (descValue == "" ? "" : " active")
            }
            ref={descLabelBg}
          />
          <Textarea
            id="description"
            maxLength="150"
            label="true"
            onChange={(event) => setDescValue(event.target.value)}
            onFocus={() => toggleClass(descLabelBg, "focus")}
            onBlur={() => toggleClass(descLabelBg, "focus")}
          />
          <label
            className={
              "desc-label float-label" + (descValue !== "" ? " active" : "")
            }
            htmlFor="description"
          >
            Descrição do produto
          </label>
        </div>
        <Button type="submit" color="primary">
          Adicionar produto
        </Button>
      </form>
    );
  }

  return (
    <>
      <Head>
        <title>Adicionar produto | AluraGeek</title>
      </Head>
      <Spacer responsive={1} />
      <Container className={NewProductContainer()}>
        <h1 className="new-product-title">Adicionar produto</h1>
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

NewProduct.auth = true;
