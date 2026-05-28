import { motion } from 'motion/react';
import { Award, Battery, Shield, Wrench } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: '10 Anos',
    subtitle: 'de Excelência',
    description: 'Experiência consolidada no mercado',
  },
  {
    icon: Battery,
    title: 'Eficiência',
    subtitle: 'Energética',
    description: 'Redução de até 80% no consumo',
  },
  {
    icon: Shield,
    title: 'Garantia',
    subtitle: 'Estendida',
    description: 'Produtos com alta durabilidade',
  },
  {
    icon: Wrench,
    title: 'Suporte',
    subtitle: 'Técnico',
    description: 'Assistência especializada',
  },
];

export function Features() {
  return (
    <section className="py-20 bg-neutral-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8B1E1E_1px,transparent_1px),linear-gradient(to_bottom,#8B1E1E_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#8B1E1E] rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="mb-2">
                  <div className="text-3xl font-bold text-white">{feature.title}</div>
                  <div className="text-lg text-[#8B1E1E] font-semibold">
                    {feature.subtitle}
                  </div>
                </div>
                <p className="text-neutral-400 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
