import { styled } from '..';

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: '1180px',
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const ShoppingCart = styled('button', {
  variants: {
    full: {
      true: {
        color: '$gray300',
      },
    },
  },

  border: 0,
  backgroundColor: '$gray800',
  color: '$gray500',
  width: 48,
  height: 48,
  borderRadius: 6,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'relative',

  cursor: 'pointer',

  '.badge': {
    position: 'absolute',
    backgroundColor: '$green500',
    minHeight: 24,
    minWidth: 24,
    top: '-12px',
    right: '-12px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    fontSize: '$sm',
    fontWeight: 'bold',

    borderRadius: 12,
  },
});

export const ShippingCartContent = styled('div', {
  variants: {
    isOpen: {
      true: {
        transform: 'translateY(0%)',
        opacity: 1,
      },
    },
  },

  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 10,
  backgroundColor: '$gray800',
  minWidth: 480,
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8);',

  transform: 'translateX(110%)',
  opacity: 0,
  transition: 'all 0.4s ease',

  padding: '4.5rem 3rem 3rem 3rem',

  '.btnClose': {
    border: 0,
    width: 24,
    height: 24,
    backgroundColor: 'transparent',
    color: '$gray300',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    top: 28,
    right: 28,

    cursor: 'pointer',
  },

  h2: {
    fontSize: '$lg',
  },
});

export const CartList = styled('ul', {
  margin: '2rem 0 0 0',
  padding: 0,
  listStyle: 'none',
});

export const CartItem = styled('li', {});
