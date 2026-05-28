import { motion } from 'motion/react';
import { Zap, Shield, Lightbulb, Factory } from 'lucide-react';

const categories = [
  {
    icon: Zap,
    title: 'Industrial',
    description: 'Soluções robustas para ambientes industriais',
    color: 'bg-blue-500',
  },
  {
    icon: Shield,
    title: 'Áreas Classificadas',
    description: 'À prova de explosão para segurança máxima',
    color: 'bg-orange-500',
  },
  {
    icon: Lightbulb,
    title: 'Comercial',
    description: 'Iluminação eficiente para espaços comerciais',
    color: 'bg-green-500',
  },
  {
    icon: Factory,
    title: 'Alta Performance',
    description: 'Tecnologia LED de última geração',
    color: 'bg-purple-500',
  },
];

export function ProductCategories() {
  return (
    <section className="py-16 bg-white border-b border-neutral-200">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 bg-neutral-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer border border-transparent hover:border-neutral-200"
              >
                <div
                  className={`w-14 h-14 ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-2 text-lg">
                  {category.title}
                </h3>
                <p className="text-sm text-neutral-600">{category.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
