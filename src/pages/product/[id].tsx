// import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Stripe from 'stripe';
import { useShoppingCart } from 'use-shopping-cart';
import { stripe } from '../../lib/stripe';
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product';

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
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const { addItem, cartDetails } = useShoppingCart();

  const isItemInCart = Object.values(cartDetails ?? {}).find(
    (item) => item.id === id,
  );

  async function addItemToCart() {
    if (isItemInCart) {
      return;
    }

    setIsCreatingCheckoutSession(true);

    addItem({
      id,
      name,
      price,
      currency: 'BRL',
      price_id: defaultPriceId,
    });
    // try {
    //   setIsCreatingCheckoutSession(true);
    //   const response = await axios.post('/api/checkout', {
    //     priceId: defaultPriceId,
    //   });
    //   const { checkoutUrl } = response.data;
    //   window.location.href = checkoutUrl;
    // } catch (err) {
    //   // Contctar com algum serviço de observabilidade
    //   // (Datadog, Bugsnag, Sentry...)
    //   setIsCreatingCheckoutSession(false);
    //   alert('Falha ao registrar o checkout');
    // }
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

          <button
            type="button"
            onClick={addItemToCart}
            disabled={isCreatingCheckoutSession}
          >
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
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
