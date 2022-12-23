import { styled } from '../../styles';

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
  minWidth: 480,
  overflowX: 'auto',

  display: 'flex',
  flexDirection: 'column',

  backgroundColor: '$gray800',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8);',

  transform: 'translateX(110%)',
  opacity: 0,
  transition: 'all 0.4s ease',

  padding: '4.5rem 3rem 3rem 3rem',

  '&::-webkit-scrollbar': {
    width: 10,
  },

  '&::-webkit-scrollbar-track': {
    backgroundColor: '$gray800',
    borderRadius: 5,
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '$gray500',
    borderRadius: 5,
    transition: 'all 0.4s',
  },

  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '$green500',
  },

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

  'p.empty': {
    marginTop: '3rem',
    color: '$gray300',
  },
});

export const CartList = styled('ul', {
  margin: '2rem 0 0 0',
  padding: 0,
  listStyle: 'none',
});

export const CartItem = styled('li', {
  display: 'flex',
  gap: '1.25rem',

  '& + li': {
    marginTop: '1.5rem',
  },

  figure: {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    width: 102,
    height: 94,
    borderRadius: 8,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
      objectFit: 'cover',
    },
  },

  '.details': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    padding: '0.25rem 0',

    fontSize: '$lg',
    strong: {
      display: 'block',
    },

    button: {
      border: 0,
      background: 'transparent',

      color: '$green300',
      fontSize: '$sm',
      fontWeight: 'bold',

      cursor: 'pointer',

      '&:hover': {
        color: '$green500',
      },
    },
  },
});

export const CartFooter = styled('footer', {
  marginTop: 'auto',

  button: {
    marginTop: '3.5rem',
    width: '100%',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },
  },
});

export const CartSummary = styled('div', {
  marginTop: '3rem',

  '.info': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '$sm',

    '& + .info': {
      marginTop: '0.5rem',
    },

    '&.cost': {
      fontWeight: 'bold',

      '.desc': {
        fontSize: '$md',
      },

      '.value': {
        fontSize: '$xl',
      },
    },
  },
});
