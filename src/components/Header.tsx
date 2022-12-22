import Image from 'next/image';
import Link from 'next/link';
import {
  CartItem,
  CartList,
  HeaderContainer,
  ShippingCartContent,
  ShoppingCart,
} from '../styles/components/header';

import logoImg from '../assets/logo.svg';
import { Handbag, X } from 'phosphor-react';
import { useShoppingCart } from 'use-shopping-cart';
import { useState } from 'react';

export function Header() {
  const [cartContentIsOpen, setCartContentIsOpen] = useState(false);

  const { cartDetails } = useShoppingCart();

  const cartItems = Object.values(cartDetails ?? {});

  console.log(cartItems);

  function handleOpenCart() {
    setCartContentIsOpen(true);
  }

  function handleCloseCart() {
    setCartContentIsOpen(false);
  }

  return (
    <>
      <HeaderContainer>
        <Link href="/">
          <Image src={logoImg} alt="Logotipo da loja" />
        </Link>
        <ShoppingCart full={!!cartItems.length} onClick={handleOpenCart}>
          <Handbag size={24} weight="bold" />
          {!!cartItems.length && (
            <span className="badge">{cartItems.length}</span>
          )}
        </ShoppingCart>
      </HeaderContainer>

      <ShippingCartContent isOpen={cartContentIsOpen}>
        <button className="btnClose" onClick={handleCloseCart}>
          <X size={16} weight="bold" />
        </button>
        <h2>Sacola de compras</h2>

        <CartList>
          <CartItem>x</CartItem>
          <CartItem>y</CartItem>
          <CartItem>z</CartItem>
        </CartList>
      </ShippingCartContent>
    </>
  );
}
