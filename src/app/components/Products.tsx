import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import { products } from '../data/products';

export function Products() {
  return (
    <section id="produtos" className="py-24 bg-neutral-50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-[#8B1E1E] text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
            NOSSOS PRODUTOS
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-4">
            Produtos Potenze
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Linha completa de luminárias LED de alta qualidade e eficiência energética
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              slug={product.slug}
              title={product.title}
              image={product.mainImage}
              description={product.shortDescription}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-neutral-800 transition-all hover:scale-105"
          >
            Ver Catálogo Completo
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
