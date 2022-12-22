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

export const ShoppingCart = styled('div', {
  variants: {
    full: {
      true: {
        color: '$gray300',
      },
    },
  },

  backgroundColor: '$gray800',
  color: '$gray500',
  width: 48,
  height: 48,
  borderRadius: 6,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'relative',

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
