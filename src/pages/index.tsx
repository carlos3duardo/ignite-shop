import Head from 'next/head';
import Image from 'next/image';
import { HomeContainer, Product } from '../styles/pages/home';

import tshirt1 from '../assets/tshirts/tshirt-beyond-the-limits.png';
import tshirt2 from '../assets/tshirts/tshirt-ignite-abord.png';
// import tshirt3 from '../assets/tshirts/tshirt-ignite-lab.png';
// import tshirt4 from '../assets/tshirts/tshirt-maratona-explorer-azul.png';
// import tshirt5 from '../assets/tshirts/tshirt-maratona-explorer-vermelha.png';

export default function Home() {
  return (
    <>
      <Head>
        <title>Ignite Shop</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <HomeContainer>
        <Product>
          <Image src={tshirt1} width={520} height={480} alt="Camisa 1" />

          <footer>
            <strong>Camiseta X</strong>
            <span>R$ 79,90</span>
          </footer>
        </Product>

        <Product>
          <Image src={tshirt2} width={520} height={480} alt="Camisa 1" />

          <footer>
            <strong>Camiseta Y</strong>
            <span>R$ 82,90</span>
          </footer>
        </Product>

        {/* <Product>
          <Image src={tshirt3} width={520} height={480} alt="Camisa 1" />

          <footer>
            <strong>Camiseta Z</strong>
            <span>R$ 69,90</span>
          </footer>
        </Product> */}
      </HomeContainer>
    </>
  );
}
