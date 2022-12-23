import Image from 'next/image';
import Link from 'next/link';
import {
  CartFooter,
  CartItem,
  CartList,
  CartSummary,
  HeaderContainer,
  ShippingCartContent,
  ShoppingCart,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { Handbag, X } from 'phosphor-react';
import { useShoppingCart } from 'use-shopping-cart';
import { useEffect, useState } from 'react';
import { CartEntry } from 'use-shopping-cart/core';
import axios from 'axios';

export function Header() {
  const [cartContentIsOpen, setCartContentIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartEntry[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const { removeItem, cartDetails } = useShoppingCart();

  useEffect(() => {
    const products = Object.values(cartDetails ?? {});

    setCartItems(products);

    setTotalCost(products.reduce((acc, product) => acc + product.price, 0));
  }, [cartDetails]);

  function handleOpenCart() {
    setCartContentIsOpen(true);
  }

  function handleCloseCart() {
    setCartContentIsOpen(false);
  }

  function handleRemoveItemFromCart(itemId: string) {
    removeItem(itemId);
  }

  async function handleCheckout() {
    const priceIds = cartItems.map((product) => {
      return product.price_id;
    });

    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post('/api/checkout', {
        priceIds,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      // Contctar com algum serviço de observabilidade
      // (Datadog, Bugsnag, Sentry...)
      setIsCreatingCheckoutSession(false);
      alert('Falha ao registrar o checkout');
    }

    console.log(priceIds);
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

        {!cartItems.length && (
          <p className="empty">Sua sacola de compras está vazia.</p>
        )}

        <CartList>
          {cartItems.map((product) => (
            <CartItem key={product.id}>
              <figure>
                {product.image && (
                  <Image
                    src={product.image || ''}
                    width={94}
                    height={94}
                    alt={`Imagem do produto ${product.name}`}
                  />
                )}
              </figure>
              <div className="details">
                <div className="productInfo">
                  {product.name}
                  <strong>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(product.price)}
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItemFromCart(product.id)}
                >
                  Remover
                </button>
              </div>
            </CartItem>
          ))}
        </CartList>

        {!!cartItems.length && (
          <CartFooter>
            <CartSummary>
              <div className="info amount">
                <span className="desc">Quantidade</span>
                <span className="value">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}
                </span>
              </div>
              <div className="info cost">
                <span className="desc">Valor total</span>
                <div className="value">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(totalCost)}
                </div>
              </div>
            </CartSummary>
            <button
              type="button"
              // disabled={!cartItems.length}
              disabled={isCreatingCheckoutSession}
              onClick={handleCheckout}
            >
              Finalizar compra
            </button>
          </CartFooter>
        )}
      </ShippingCartContent>
    </>
  );
}
