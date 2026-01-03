import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Mail } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close menu when route changes
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Atelier', path: '/atelier' },
    { name: 'Expositions', path: '/expositions' },
    { name: 'Presse', path: '/presse' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      
      {/* Global Background Image for Home Page */}
      {isHome ? (
        <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
          <img 
            src="https://img.sanishtech.com/u/b316ec649c871cbfdcf55e14ee3feeab.png" 
            alt="Background Composition" 
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        /* Global Texture Background for Other Pages */
        <div 
          className="fixed inset-0 -z-10 w-full h-full bg-background-light dark:bg-background-dark"
          style={{
            backgroundImage: 'url("https://img.sanishtech.com/u/8e7dd859ee37ed338d48fceac3c6e619.png")',
            backgroundRepeat: 'repeat',
            backgroundSize: '600px', 
            backgroundPosition: 'center top'
          }}
        />
      )}

      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md py-4 shadow-sm border-b border-wood/10' : 'bg-transparent py-6'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <Link to="/" className="text-xl font-bold tracking-widest uppercase text-anthracite dark:text-white">
            Paolo Bosi
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-widest uppercase transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary border-b border-primary' : 'text-anthracite dark:text-text-secondary-dark'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-anthracite dark:text-text-primary-dark"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-background-light dark:bg-background-dark border-t border-wood/10 dark:border-gray-800 p-6 flex flex-col gap-6 md:hidden shadow-lg h-screen">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-lg font-medium tracking-widest uppercase text-center text-anthracite dark:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className={`flex-grow ${isHome ? '' : 'pt-20'}`}>
        {children}
      </main>

      {/* Footer */}
      <footer 
        className="w-full pt-12 pb-6 border-t border-wood/20 mt-12 transition-colors duration-300 bg-transparent backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-md flex-col items-center px-4">
          <div className="flex items-center justify-center gap-8 mb-6">
            <a href="#" className="text-wood dark:text-text-secondary-dark transition-colors hover:text-primary hover:scale-110 transform duration-200">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-wood dark:text-text-secondary-dark transition-colors hover:text-primary hover:scale-110 transform duration-200">
              <Instagram size={20} />
            </a>
            <Link to="/contact" className="text-wood dark:text-text-secondary-dark transition-colors hover:text-primary hover:scale-110 transform duration-200">
              <Mail size={20} />
            </Link>
          </div>
          <p className="text-xs tracking-widest text-anthracite dark:text-text-secondary-dark uppercase opacity-70">
            © {new Date().getFullYear()} Paolo Bosi. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;