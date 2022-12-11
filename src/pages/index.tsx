import Head from 'next/head';
import Image from 'next/image';
import Stripe from 'stripe';
import { GetServerSideProps } from 'next';
import { useKeenSlider } from 'keen-slider/react';

import { stripe } from '../lib/stripe';
import { HomeContainer, Product } from '../styles/pages/home';

import 'keen-slider/keen-slider.min.css';

type Products = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
};

interface HomeProps {
  products: Products[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <Head>
        <title>Ignite Shop</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Product className="keen-slider__slide" key={product.id}>
            <Image
              src={product.imageUrl}
              width={520}
              height={480}
              alt="Camisa 1"
            />

            <footer>
              <strong>{product.name}</strong>
              <span>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(product.price)}
              </span>
            </footer>
          </Product>
        ))}
      </HomeContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount ? price.unit_amount / 100 : 0,
    };
  });

  return {
    props: {
      products,
    },
  };
};
