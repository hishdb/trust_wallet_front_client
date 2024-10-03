// components/Footer.tsx
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Trust Wallet. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-blue-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-400">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
