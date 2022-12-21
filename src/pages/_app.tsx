import type { AppProps } from 'next/app';
import Image from 'next/image';
import Link from 'next/link';
import { globalStyles } from '../styles/global';
import { Container, Header, ShoppingCart } from '../styles/pages/app';

import logoImg from '../assets/logo.svg';
import { Handbag } from 'phosphor-react';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href="/">
          <Image src={logoImg} alt="Logotipo da loja" />
        </Link>
        <Link href="/cart">
          <ShoppingCart>
            <Handbag size={24} weight="bold" />
          </ShoppingCart>
        </Link>
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
