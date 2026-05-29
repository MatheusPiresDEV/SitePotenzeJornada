import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#8B1E1E] text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
          <img
  src="https://potenze.com.br/wp-content/uploads/2025/06/celular.png"
  alt="Potenze - 10 Anos"
  width="150"
/>

          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/produtos" className="hover:opacity-80 transition-opacity">
              Produtos
            </Link>
            {/* <Link to="/uml" className="hover:opacity-80 transition-opacity">
              Testes UML
            </Link> */}
            <button
              onClick={() => scrollToSection('parceiros')}
              className="hover:opacity-80 transition-opacity"
            >
              Parceiros
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="hover:opacity-80 transition-opacity"
            >
              Contato
            </button>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <Link
              to="/produtos"
              className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors text-left"
              onClick={() => setIsMenuOpen(false)}
            >
              Produtos
            </Link>
            {/* <Link
              to="/uml"
              className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors text-left"
              onClick={() => setIsMenuOpen(false)}
            >
              UML
            </Link> */}
            <button
              onClick={() => scrollToSection('parceiros')}
              className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors text-left"
            >
              Parceiros
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors text-left"
            >
              Contato
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
