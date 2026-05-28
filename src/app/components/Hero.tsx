import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
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
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-900">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1670005382237-961e1f0a9cd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-32 pb-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="inline-flex items-center gap-3 bg-[#8B1E1E] text-white px-6 py-3 rounded-full mb-8"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="font-bold text-[#8B1E1E] text-lg">10</span>
            </div>
            <span className="font-semibold tracking-wide">ANOS DE EXCELÊNCIA</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.9]"
          >
            Iluminação
            <br />
            Industrial LED
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="text-xl text-white/90 mb-10 max-w-2xl"
          >
            Soluções completas em iluminação LED de alta performance para ambientes
            industriais e comerciais.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollToSection('produtos')}
              className="bg-[#8B1E1E] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#6B1515] transition-all hover:scale-105 shadow-xl"
            >
              Ver Produtos
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="bg-white text-[#8B1E1E] px-8 py-4 rounded-lg font-semibold hover:bg-neutral-100 transition-all hover:scale-105 shadow-xl"
            >
              Fale Conosco
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-8 h-8 text-white animate-bounce" />
      </motion.div>
    </section>
  );
}
