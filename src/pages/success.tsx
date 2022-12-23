import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import Stripe from 'stripe';
import { useShoppingCart } from 'use-shopping-cart';
import { stripe } from '../lib/stripe';
import {
  ImageContainer,
  ProductsContainer,
  SuccessContainer,
} from '../styles/pages/success';

type ProductProps = {
  id: string;
  name: string;
  imageUrl: string;
};

interface OrderProps {
  customerName: string;
  products: ProductProps[];
}

export default function Success({ customerName, products }: OrderProps) {
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    clearCart();
  });

  return (
    <>
      <Head>
        <title>Compra efetuada com sucesso! | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada</h1>

        <ProductsContainer>
          {products.map((product) => (
            <ImageContainer key={product.id}>
              <img src={product.imageUrl} width={130} height={130} alt="" />
            </ImageContainer>
          ))}
        </ProductsContainer>

        <p>
          Uhuu <strong>{customerName}</strong>, sua compra de {products.length}{' '}
          {products.length === 1 ? 'camiseta' : 'camisetas'} já está a caminho
          de sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  });

  const products = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0] || null,
    };
  });

  const customerName = session.customer_details?.name;

  return {
    props: {
      customerName,
      products,
    },
  };
};
