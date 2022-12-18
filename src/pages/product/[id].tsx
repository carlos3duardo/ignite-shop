import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import Stripe from 'stripe';
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

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        priceId: defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      // Contctar com algum serviço de observabilidade
      // (Datadog, Bugsnag, Sentry...)

      setIsCreatingCheckoutSession(false);

      alert('Falha ao registrar o checkout');
    }
  }

  return (
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
          }).format(price)}
        </span>

        <p>{description}</p>

        <button
          type="button"
          onClick={handleBuyProduct}
          disabled={isCreatingCheckoutSession}
        >
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
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
      price: price.unit_amount ? price.unit_amount / 100 : 0,
      description: product.description,
      defaultPriceId: price.id,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
