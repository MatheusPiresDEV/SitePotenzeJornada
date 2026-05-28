import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Check,
  Download,
  Shield,
  Zap,
  Plug,
  Thermometer,
  Sun,
  Palette,
  Clock,
  Box,
  Aperture,
  Ruler,
  Weight,
  Gauge,
  Lightbulb,
  Settings,
} from 'lucide-react';
import { getProductBySlug } from '../data/products';
import { useState } from 'react';

function getSpecIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes('proteç')) return Shield;
  if (l.includes('potênc') || l.includes('potenc')) return Zap;
  if (l.includes('tens')) return Plug;
  if (l.includes('temperatura')) return Thermometer;
  if (l.includes('fluxo') || l.includes('lumin')) return Sun;
  if (l.includes('cor') || l.includes('cri') || l.includes('reprodu')) return Palette;
  if (l.includes('vida')) return Clock;
  if (l.includes('material') || l.includes('corpo')) return Box;
  if (l.includes('ângulo') || l.includes('angulo') || l.includes('abertura'))
    return Aperture;
  if (l.includes('dimens') || l.includes('tamanho') || l.includes('comprim'))
    return Ruler;
  if (l.includes('peso')) return Weight;
  if (l.includes('eficiênc') || l.includes('eficienc') || l.includes('fator'))
    return Gauge;
  if (l.includes('lâmpada') || l.includes('lampada') || l.includes('led'))
    return Lightbulb;
  return Settings;
}

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();

  const scrollToContact = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('contato');
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
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Produto não encontrado
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#8B1E1E] hover:underline"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200 py-4 sticky top-20 z-40">
        <div className="container mx-auto px-6 lg:px-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-[#8B1E1E] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para produtos
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-32">
              <div className="aspect-square bg-white rounded-2xl overflow-hidden mb-4 border border-neutral-200">
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {product.images.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-[#8B1E1E]'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-block bg-[#8B1E1E] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {product.category}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              {product.title}
            </h1>

            <p className="text-xl text-neutral-600 mb-8">{product.description}</p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 bg-[#8B1E1E] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#6B1515] transition-all hover:scale-105"
              >
                Solicitar Orçamento
              </button>
              <button className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-neutral-800 transition-all hover:scale-105">
                <Download className="w-5 h-5" />
                Baixar Catálogo
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-neutral-200 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                Características
              </h2>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl p-8 md:p-10 border border-neutral-200 shadow-sm"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-xl bg-[#8B1E1E]/10 flex items-center justify-center">
              <Settings className="w-6 h-6 text-[#8B1E1E]" />
            </div>
            <h2 className="text-3xl font-bold text-neutral-900">
              Especificações Técnicas
            </h2>
          </div>
          <p className="text-neutral-600 mb-8 ml-16">
            Dados técnicos completos do produto
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.specifications.map((spec, index) => {
              const Icon = getSpecIcon(spec.label);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="group relative overflow-hidden bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 rounded-xl p-5 hover:border-[#8B1E1E]/40 hover:shadow-lg transition-all"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#8B1E1E]/5 rounded-full -translate-y-12 translate-x-12 group-hover:bg-[#8B1E1E]/10 transition-colors" />
                  <div className="relative">
                    <div className="w-10 h-10 rounded-lg bg-white border border-neutral-200 flex items-center justify-center mb-3 group-hover:bg-[#8B1E1E] group-hover:border-[#8B1E1E] transition-colors">
                      <Icon className="w-5 h-5 text-[#8B1E1E] group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-sm uppercase tracking-wide text-neutral-500 mb-1">
                      {spec.label}
                    </p>
                    <p className="text-lg text-neutral-900 font-semibold leading-snug">
                      {spec.value}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-br from-neutral-900 to-[#8B1E1E] rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interessado neste produto?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Entre em contato com nossa equipe para mais informações e orçamento
            personalizado
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+554132739999"
              className="inline-flex items-center gap-2 bg-white text-[#8B1E1E] px-8 py-4 rounded-lg font-semibold hover:bg-neutral-100 transition-all hover:scale-105"
            >
              (41) 3273-9999
            </a>
            <a
              href="mailto:vendas@potenze.com.br"
              className="inline-flex items-center gap-2 bg-[#8B1E1E] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#6B1515] transition-all hover:scale-105 border-2 border-white/20"
            >
              vendas@potenze.com.br
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
