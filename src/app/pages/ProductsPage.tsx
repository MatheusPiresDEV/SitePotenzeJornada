import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ArrowLeft, Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { useState, useMemo } from 'react';

export function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIP, setSelectedIP] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name-asc');
  const [showFilters, setShowFilters] = useState(true);

  const categories = Array.from(new Set(products.map((p) => p.category)));
  const ipRatings = Array.from(
    new Set(
      products
        .map((p) => p.specifications.find((s) => s.label === 'Grau de Proteção')?.value)
        .filter(Boolean)
    )
  );

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filtro de pesquisa
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtro de categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Filtro de IP
    if (selectedIP !== 'all') {
      filtered = filtered.filter((product) => {
        const ipSpec = product.specifications.find(
          (s) => s.label === 'Grau de Proteção'
        );
        return ipSpec?.value.includes(selectedIP);
      });
    }

    // Ordenação
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, selectedCategory, selectedIP, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedIP('all');
    setSortBy('name-asc');
  };

  const hasActiveFilters =
    searchQuery || selectedCategory !== 'all' || selectedIP !== 'all' || sortBy !== 'name-asc';

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-[#8B1E1E] text-white py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Catálogo Completo</h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Explore nossa linha completa de luminárias LED de alta qualidade e
              eficiência energética para ambientes industriais e comerciais.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-12">
        {/* Barra de Pesquisa e Filtros */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-neutral-200">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Barra de Pesquisa */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Pesquisar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
              />
            </div>

            {/* Botão Toggle Filtros */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-neutral-800 transition-all"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </button>
          </div>

          {/* Filtros */}
          <div
            className={`${
              showFilters ? 'block' : 'hidden lg:block'
            } grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}
          >
            {/* Filtro de Categoria */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
              >
                <option value="all">Todas as categorias</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro de Proteção IP */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Grau de Proteção
              </label>
              <select
                value={selectedIP}
                onChange={(e) => setSelectedIP(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
              >
                <option value="all">Todos os graus</option>
                {ipRatings.map((ip) => (
                  <option key={ip} value={ip}>
                    {ip}
                  </option>
                ))}
              </select>
            </div>

            {/* Ordenação */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent"
              >
                <option value="name-asc">Nome (A-Z)</option>
                <option value="name-desc">Nome (Z-A)</option>
                <option value="category">Categoria</option>
              </select>
            </div>

            {/* Botão Limpar Filtros */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                disabled={!hasActiveFilters}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all ${
                  hasActiveFilters
                    ? 'bg-[#8B1E1E] text-white hover:bg-[#6B1515]'
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }`}
              >
                <X className="w-5 h-5" />
                Limpar Filtros
              </button>
            </div>
          </div>

          {/* Contador de Resultados */}
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <div className="flex items-center justify-between">
              <p className="text-neutral-600">
                <span className="font-bold text-neutral-900">
                  {filteredAndSortedProducts.length}
                </span>{' '}
                {filteredAndSortedProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              </p>
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 bg-[#8B1E1E] text-white px-3 py-1 rounded-full text-sm">
                      Busca: "{searchQuery}"
                      <button
                        onClick={() => setSearchQuery('')}
                        className="hover:bg-white/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 bg-[#8B1E1E] text-white px-3 py-1 rounded-full text-sm">
                      {selectedCategory}
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className="hover:bg-white/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedIP !== 'all' && (
                    <span className="inline-flex items-center gap-1 bg-[#8B1E1E] text-white px-3 py-1 rounded-full text-sm">
                      {selectedIP}
                      <button
                        onClick={() => setSelectedIP('all')}
                        className="hover:bg-white/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Grid de Produtos */}
        {filteredAndSortedProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredAndSortedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                slug={product.slug}
                title={product.title}
                image={product.mainImage}
                description={product.shortDescription}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-neutral-600 mb-6">
              Tente ajustar os filtros ou fazer uma nova pesquisa
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 bg-[#8B1E1E] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#6B1515] transition-all hover:scale-105"
            >
              <X className="w-5 h-5" />
              Limpar todos os filtros
            </button>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-neutral-900 to-[#8B1E1E] text-white py-16"
      >
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Não encontrou o que procura?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco para soluções personalizadas
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
        </div>
      </motion.div>
    </div>
  );
}
