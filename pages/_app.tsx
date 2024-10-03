// pages/_app.tsx
import { useRouter } from 'next/router';
import '../styles/globals.css';


const MyApp = ({ Component, pageProps }: any) => {
  const router = useRouter();

  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
