import { motion } from 'motion/react';
import { Phone, Mail, ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-neutral-900 via-neutral-800 to-[#8B1E1E] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1724660579557-b03a78094806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)',
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Pronto para Iluminar
              <br />
              Seu Projeto?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Entre em contato com nossa equipe e descubra as melhores soluções em
              iluminação LED para o seu negócio
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <a
              href="tel:+554133739799"

              className="group inline-flex items-center gap-3 bg-white text-[#8B1E1E] px-8 py-4 rounded-lg font-semibold hover:bg-neutral-100 transition-all hover:scale-105 shadow-xl w-full sm:w-auto justify-center"
            >
              <Phone className="w-5 h-5" />
              (41) 3373-9799

              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0" />
            </a>
            <a
              href="mailto:vendas@potenze.com.br"
              className="group inline-flex items-center gap-3 bg-[#8B1E1E] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#6B1515] transition-all hover:scale-105 shadow-xl border-2 border-white/20 w-full sm:w-auto justify-center"
            >
              <Mail className="w-5 h-5" />
              Enviar E-mail
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/70 text-sm"
          >
            Atendimento de segunda a sexta, das 8h às 18h
          </motion.div>
        </div>
      </div>
    </section>
  );
}
