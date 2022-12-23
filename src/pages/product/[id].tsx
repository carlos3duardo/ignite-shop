import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Stripe from 'stripe';
import { toast, ToastContainer } from 'react-toastify';
import { useShoppingCart } from 'use-shopping-cart';
import { stripe } from '../../lib/stripe';
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product';

import 'react-toastify/dist/ReactToastify.css';

interface ProductProps {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  defaultPriceId: string;
}

export default function Product({
  id,
  name,
  imageUrl,
  price,
  description,
  defaultPriceId,
}: ProductProps) {
  const { addItem, cartDetails } = useShoppingCart();

  const isItemInCart = Object.values(cartDetails ?? {}).find(
    (item) => item.id === id,
  );

  async function addItemToCart() {
    if (isItemInCart) {
      toast.warn(`${name} já está adicionado à sacola de compras.`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'dark',
      });

      return;
    }

    addItem({
      id,
      name,
      price: price / 100,
      image: imageUrl,
      price_id: defaultPriceId,
      currency: 'BRL',
    });
  }

  return (
    <>
      <Head>
        <title>{`${name} | Ignite Shop`}</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={imageUrl} width={540} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{name}</h1>
          <span>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(price / 100)}
          </span>

          <p>{description}</p>

          <button type="button" onClick={addItemToCart}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
      <ToastContainer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await stripe.products.list();

  const paths = response.data.map((product) => {
    return { params: { id: product.id } };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params ? params.id : '';

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
      description: product.description,
      defaultPriceId: price.id,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
