import Image from 'next/image';
import Link from 'next/link';
import { HeaderContainer, ShoppingCart } from '../styles/components/header';

import logoImg from '../assets/logo.svg';
import { Handbag } from 'phosphor-react';
import { useShoppingCart } from 'use-shopping-cart';

export function Header() {
  const { cartDetails } = useShoppingCart();

  const itemsCount = Object.values(cartDetails ?? {}).length;

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="Logotipo da loja" />
      </Link>
      <Link href="/cart">
        <ShoppingCart full={!!itemsCount}>
          <Handbag size={24} weight="bold" />
          {!!itemsCount && <span className="badge">{itemsCount}</span>}
        </ShoppingCart>
      </Link>
    </HeaderContainer>
  );
}
