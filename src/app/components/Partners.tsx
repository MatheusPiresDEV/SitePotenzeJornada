import { motion } from 'motion/react';

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

const partners = [
  {
    name: 'Bosch',
    description: 'Tecnologia e Engenharia',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJBcO-FCp0tIwo0NFyaydWBWw3Fjbi1QVXPQ&s'
  },
  {
    name: 'Bridgestone',
    description: 'Indústria de Pneus',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Bridgestone_logo.svg/3840px-Bridgestone_logo.svg.png'
  },
  {
    name: 'Lar',
    description: 'Cooperativa Agroindustrial',
    logo: 'https://www.lar.ind.br/wp-content/uploads/images/111/1.jpg'
  },
  {
    name: 'Caterpillar',
    description: 'Máquinas Pesadas',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR75PBjevvdf7NE_Am09ML1iqkbG0so08gCuA&s'
  },
  {
    name: 'Renault',
    description: 'Indústria Automotiva',
    logo: 'https://logosmarcas.net/wp-content/uploads/2021/04/Renault-Logo.png'
  },
  {
    name: 'Vale',
    description: 'Mineração e Logística',
    logo: 'https://upload.wikimedia.org/wikipedia/pt/thumb/c/cc/Logotipo_Vale.svg/330px-Logotipo_Vale.svg.png'
  },
  {
    name: 'Weg',
    description: 'Equipamentos Elétricos',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/WEG_Equipamentos_El%C3%A9tricos.svg'
  },
  {
    name: 'Aurora',
    description: 'Cooperativa de Alimentos',
    logo: 'https://auroracoop.com.br/wp-content/uploads/2022/03/aurora_preferencial_rgb_1648059233589-570x380.png'
  },
];

export function Partners() {
  return (
    <section id="parceiros" className="py-24 bg-white border-t border-neutral-200">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-[#8B1E1E] text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
            NOSSOS PARCEIROS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Parceiros de Confiança
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Empresas que confiam na qualidade e eficiência das nossas soluções em
            iluminação LED
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative bg-white border-2 border-neutral-200 rounded-xl p-8 hover:border-[#8B1E1E] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="text-center">
                {/* Container da logo ajustado para fundo branco e sem filtros de cor */}
                <div className="w-full h-24 flex items-center justify-center mx-auto mb-4 bg-white rounded-lg p-2">
                  <img
                    src={partner.logo}
                    alt={`Logo da empresa ${partner.name}`}
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      // Se o link da imagem falhar, esconde a imagem e exibe a letra estilizada
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.classList.remove('hidden');
                        fallback.classList.add('flex');
                      }
                    }}
                  />
                  {/* Letra inicial que funciona como Fallback caso a internet falhe */}
                  <span className="hidden w-16 h-16 bg-neutral-100 rounded-full items-center justify-center text-2xl font-bold text-neutral-400 group-hover:text-[#8B1E1E] group-hover:bg-[#8B1E1E]/10 transition-colors">
                    {partner.name.charAt(0)}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-neutral-900 mb-1 group-hover:text-[#8B1E1E] transition-colors">
                  {partner.name}
                </h3>
                <p className="text-sm text-neutral-500">{partner.description}</p>
              </div>

              <div className="absolute top-3 right-3 w-8 h-8 bg-[#8B1E1E] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-neutral-600 mb-6">
            Quer fazer parte desta lista de empresas que confiam na Potenze?
          </p>
          <button
            onClick={() => scrollToSection('contato')}
            className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-neutral-800 transition-all hover:scale-105"
          >
            Entre em Contato
          </button>
        </motion.div>
      </div>
    </section>
  );
}