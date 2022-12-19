import Link from 'next/link';
import { ImageContainer, SuccessContainer } from '../styles/pages/success';

export default function Product() {
  return (
    <SuccessContainer>
      <h1>Compra efetuada</h1>

      <ImageContainer>
        <img src="" alt="" />
      </ImageContainer>

      <p>
        Uhuu <strong>Nome do usuário</strong>, sua{' '}
        <strong>Nome do produto</strong> já está a caminho de sua casa
      </p>

      <Link href="/">Voltar ao catálogo</Link>
    </SuccessContainer>
  );
}
