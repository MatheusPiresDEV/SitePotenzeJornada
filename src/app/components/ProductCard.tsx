import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  slug: string;
  title: string;
  image: string;
  description?: string;
  index: number;
}

export function ProductCard({ slug, title, image, description, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
    >
      <Link to={`/produto/${slug}`} className="block">
        <div className="aspect-square overflow-hidden bg-neutral-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        <div className="p-5">
          <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-[#8B1E1E] transition-colors">
            {title}
          </h3>

          {description && (
            <p className="text-sm text-neutral-600 mb-4">{description}</p>
          )}

          <span className="inline-flex items-center gap-2 bg-[#8B1E1E] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#6B1515] transition-all group-hover:gap-3">
            Consulte Mais
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>

        <div className="absolute top-3 right-3 w-10 h-10 bg-[#8B1E1E] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowRight className="w-4 h-4 text-white" />
        </div>
      </Link>
    </motion.div>
  );
}
