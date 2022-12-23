import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Stripe from 'stripe';
import { GetStaticProps } from 'next';
import { useKeenSlider } from 'keen-slider/react';
import { toast, ToastContainer } from 'react-toastify';
import { Handbag } from 'phosphor-react';
import { useShoppingCart } from 'use-shopping-cart';

import { stripe } from '../lib/stripe';
import { HomeContainer, Product } from '../styles/pages/home';

import 'keen-slider/keen-slider.min.css';
import 'react-toastify/dist/ReactToastify.css';

type ProductProps = {
  id: string;
  name: string;
  imageUrl: string;
  priceId: string;
  price: number;
};

interface HomeProps {
  products: ProductProps[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    },
  });

  const { addItem, cartDetails } = useShoppingCart();

  async function addItemToCart(product: ProductProps) {
    const isItemInCart = Object.values(cartDetails ?? {}).find(
      (item) => item.id === product.id,
    );

    if (isItemInCart) {
      toast.warn(`${product.name} já está adicionado à sacola de compras.`, {
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
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      price_id: product.priceId,
      currency: 'BRL',
    });
  }

  return (
    <>
      <Head>
        <title>Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Product key={product.id} className="keen-slider__slide">
            <Link href={`/product/${product.id}`} prefetch={false}>
              <Image
                src={product.imageUrl}
                width={520}
                height={480}
                alt="Camisa 1"
              />
            </Link>

            <footer>
              <div className="info">
                <strong>{product.name}</strong>
                <span>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(product.price)}
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  addItemToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    priceId: product.priceId,
                    imageUrl: product.imageUrl,
                  })
                }
              >
                <Handbag size={32} weight="bold" />
              </button>
            </footer>
          </Product>
        ))}
      </HomeContainer>
      <ToastContainer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      priceId: price.id,
      price: price.unit_amount ? price.unit_amount / 100 : 0,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
