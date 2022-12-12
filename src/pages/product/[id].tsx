import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
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
}

export default function Product({
  id,
  name,
  imageUrl,
  price,
  description,
}: ProductProps) {
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

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_Mxrwqm6KiFOKfQ' } },
      { params: { id: 'prod_Mxrv6rUTdntNmf' } },
    ],
    fallback: false,
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
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
