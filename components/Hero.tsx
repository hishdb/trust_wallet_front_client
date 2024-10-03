// components/Hero.tsx
import Image from 'next/image';
import { motion } from 'framer-motion';
import landingImage from '../public/images/landing-image.png';

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 py-20 bg-blue-500 text-white" id="hero">
      <div className="md:w-1/2">
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Trust Wallet Verification Form
        </motion.h2>
        <motion.p
          className="text-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          For the purpose of receiving an investment amount from an official institution.
        </motion.p>
        <a
          href="#form"
          className="inline-block px-6 py-3 bg-white text-blue-500 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </a>
      </div>
      <div className="md:w-1/2 mb-8 md:mb-0">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Image src={landingImage} alt="Landing Image" width={500} height={400} className="rounded-lg shadow-lg" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
