export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  mainImage: string;
  images: string[];
  specifications: ProductSpec[];
  features: string[];
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Luminária industrial',
    slug: 'luminaria industrial',
    category: 'Industrial',
    description:
      'Luminárias industriais com alto grau de proteção IP67, ideais para ambientes severos com exposição à água e poeira.',
    shortDescription: 'Alta proteção contra água e poeira',
    mainImage:
      'https://potenze.com.br/wp-content/uploads/2025/03/1.png',
    images: [
      'https://potenze.com.br/wp-content/uploads/2025/03/1.png',
      'https://potenze.com.br/wp-content/uploads/2025/03/1.png',
      'https://potenze.com.br/wp-content/uploads/2025/03/1.png',
    ],
    specifications: [
      { label: 'Grau de Proteção', value: 'IP67' },
      { label: 'Potência', value: '50W / 100W / 150W' },
      { label: 'Tensão', value: '100-240V AC' },
      { label: 'Temperatura de Cor', value: '5000K / 6500K' },
      { label: 'Fluxo Luminoso', value: 'Até 21.000 lm' },
      { label: 'Índice de Reprodução de Cor', value: '>80 CRI' },
      { label: 'Vida Útil', value: '50.000 horas' },
      { label: 'Material do Corpo', value: 'Alumínio fundido' },
      { label: 'Ângulo de Abertura', value: '120°' },
    ],
    features: [
      'Proteção total contra poeira',
      'Proteção contra imersão temporária em água',
      'Resistente a ambientes corrosivos',
      'Dissipação térmica eficiente',
      'Ideal para áreas externas e industriais',
      'Fácil instalação e manutenção',
    ],
  },
  {
    id: '2',
    title: 'Luminárias para frigoríficos',
    slug: 'luminarias-para-frigorificos',
    category: 'Industrial',
    description:
      'Suportes robustos para lâmpadas LED tubulares, ideal para instalações industriais e comerciais que exigem iluminação uniforme.',
    shortDescription: 'Suporte para frigorificos em LED ',
    mainImage:
      'https://potenze.com.br/wp-content/uploads/2025/03/7.png',
    images: [
      'https://potenze.com.br/wp-content/uploads/2025/03/7.png',
      'https://potenze.com.br/wp-content/uploads/2025/03/7.png',
    ],
    specifications: [
      { label: 'Grau de Proteção', value: 'IP20 / IP40' },
      { label: 'Compatibilidade', value: 'Tubulares T8 LED' },
      { label: 'Comprimento', value: '60cm / 120cm / 150cm' },
      { label: 'Tensão', value: '100-240V AC' },
      { label: 'Material', value: 'Chapa de aço com pintura eletrostática' },
      { label: 'Refletor', value: 'Alumínio anodizado' },
      { label: 'Fixação', value: 'Teto ou parede' },
    ],
    features: [
      'Refletor de alto rendimento',
      'Instalação simples e rápida',
      'Compatível com lâmpadas LED T8',
      'Corpo resistente e durável',
      'Ótima distribuição luminosa',
    ],
  },
  {
    id: '3',
    title: 'Luminárias para Áreas Classificadas',
    slug: 'luminarias-para-areas-classificadas',
    category: 'Industrial',
    description:
      'Sistema de iluminação flexível com  LED, perfeito para áreas que necessitam de iluminação adaptável e resistente.',
    shortDescription: 'Flexibilidade e durabilidade industrial',
    mainImage:
      'https://potenze.com.br/wp-content/uploads/2025/03/2.png',
    images: [
      'https://potenze.com.br/wp-content/uploads/2025/03/2.png',
      'https://potenze.com.br/wp-content/uploads/2025/03/2.png',
    ],
    specifications: [
      { label: 'Grau de Proteção', value: 'IP65' },
      { label: 'Potência', value: '18W / 36W' },
      { label: 'Tensão', value: '100-240V AC' },
      { label: 'Comprimento da Mangueira', value: 'Sob medida' },
      { label: 'Material', value: 'Policarbonato flexível' },
      { label: 'Temperatura de Cor', value: '5000K / 6500K' },
      { label: 'Vida Útil', value: '40.000 horas' },
    ],
    features: [
      'Mangueira flexível e resistente',
      'Proteção contra água e poeira',
      'Ideal para ambientes industriais',
      'Instalação versátil',
      'Baixo consumo energético',
    ],
  },
  {
    id: '4',
    title: 'Luminárias High bay',
    slug: 'luminarias-high-bay',
    category: 'Industrial',
    description:
      'Luminárias High bay, proporcionando iluminação eficiente para galpões e áreas industriais.',
    shortDescription: 'Instalação versátil e resistente',
    mainImage:
      'https://potenze.com.br/wp-content/uploads/2025/03/6.png',
    images: [
      'https://potenze.com.br/wp-content/uploads/2025/03/6.png',
      'https://potenze.com.br/wp-content/uploads/2025/03/6.png',
    ],
    specifications: [
      { label: 'Grau de Proteção', value: 'IP40' },
      { label: 'Potência', value: '36W / 54W' },
      { label: 'Tensão', value: '100-240V AC' },
      { label: 'Comprimento', value: '120cm / 150cm' },
      { label: 'Material', value: 'Alumínio extrudado' },
      { label: 'Fluxo Luminoso', value: 'Até 7.200 lm' },
      { label: 'Temperatura de Cor', value: '5000K / 6500K' },
    ],
    features: [
      'Design linear elegante',
      'Instalação em vara ou suspensa',
      'Alta eficiência luminosa',
      'Corpo em alumínio resistente',
      'Ideal para pé-direito alto',
    ],
  },
  {
    id: '5',
    title: 'Luminárias High Bay Modular',
    slug: 'luminarias-high-bay-modular', 
    category: 'Industrial',
    description:
      'Luminária linear de alta performance com proteção IP65, ideal para ambientes industriais que exigem iluminação robusta.',
    shortDescription: 'Design linear com proteção IP65',
    mainImage:
      'https://potenze.com.br/wp-content/uploads/2026/03/HIGH-BAY-150W-E2-980x784.png',
    images: [
      'https://potenze.com.br/wp-content/uploads/2026/03/HIGH-BAY-150W-E2-980x784.png',
      'https://potenze.com.br/wp-content/uploads/2026/03/HIGH-BAY-150W-E2-980x784.png',
      'https://potenze.com.br/wp-content/uploads/2026/03/HIGH-BAY-150W-E2-980x784.png',
    ],
    specifications: [
      { label: 'Grau de Proteção', value: 'IP65' },
      { label: 'Potência', value: '40W / 60W / 80W' },
      { label: 'Tensão', value: '100-240V AC' },
      { label: 'Fluxo Luminoso', value: 'Até 10.400 lm' },
      { label: 'Temperatura de Cor', value: '5000K / 6500K' },
      { label: 'Índice de Reprodução de Cor', value: '>80 CRI' },
      { label: 'Vida Útil', value: '50.000 horas' },
      { label: 'Material', value: 'Policarbonato e alumínio' },
      { label: 'Comprimento', value: '60cm / 120cm / 150cm' },
    ],
    features: [
      'Proteção contra jatos de água',
      'Hermética e à prova de poeira',
      'Alta eficiência energética',
      'Design moderno e compacto',
      'Ideal para ambientes úmidos',
      'Fácil manutenção',
    ],
  },
  {
    id: '6',
    title: 'Refletor Ultra',
    slug: 'refletor-ultra',
    category: 'Industrial',
    description:
      'Refletor ultra com proteção IP56, oferecendo iluminação de alto desempenho para ambientes industriais e comerciais.',
    shortDescription: 'Iluminação linear de alto desempenho',
    mainImage:
      'https://potenze.com.br/wp-content/uploads/2026/03/MODULAR-150W-A2-980x784.png',
    images: [
      'https://potenze.com.br/wp-content/uploads/2026/03/MODULAR-150W-A2-980x784.png',
      'https://potenze.com.br/wp-content/uploads/2026/03/MODULAR-150W-A2-980x784.png',
    ],
    specifications: [
      { label: 'Grau de Proteção', value: 'IP56' },
      { label: 'Potência', value: '36W / 54W / 72W' },
      { label: 'Tensão', value: '100-240V AC' },
      { label: 'Fluxo Luminoso', value: 'Até 9.360 lm' },
      { label: 'Temperatura de Cor', value: '5000K / 6500K' },
      { label: 'Material', value: 'Policarbonato de alta resistência' },
      { label: 'Vida Útil', value: '50.000 horas' },
      { label: 'Comprimento', value: '120cm / 150cm' },
    ],
    features: [
      'Proteção contra poeira e água',
      'Design linear eficiente',
      'Fácil instalação',
      'Corpo resistente a impactos',
      'Baixo consumo energético',
    ],
  },
  {
    id: '7',
    title: 'Luminaria Publica',
    slug: 'luminarias-publicas',
    category: 'Alta Performance',
    description:
      'Luminárias de alta potência para pé-direito alto, ideais para galpões industriais, armazéns e centros de distribuição.',
    shortDescription: 'Ideal para pé-direito alto',
    mainImage:
      'https://potenze.com.br/wp-content/uploads/2026/03/LUMINARIA-PUBLICA-150W-980x784.png',
    images: [
      'https://potenze.com.br/wp-content/uploads/2026/03/LUMINARIA-PUBLICA-150W-980x784.png',
      'https://potenze.com.br/wp-content/uploads/2026/03/LUMINARIA-PUBLICA-150W-980x784.png',
      'https://potenze.com.br/wp-content/uploads/2026/03/LUMINARIA-PUBLICA-150W-980x784.png',
    ],
    specifications: [
      { label: 'Grau de Proteção', value: 'IP65' },
      { label: 'Potência', value: '100W / 150W / 200W' },
      { label: 'Tensão', value: '100-277V AC' },
      { label: 'Fluxo Luminoso', value: 'Até 26.000 lm' },
      { label: 'Temperatura de Cor', value: '5000K / 6500K' },
      { label: 'Índice de Reprodução de Cor', value: '>80 CRI' },
      { label: 'Vida Útil', value: '50.000 horas' },
      { label: 'Material', value: 'Alumínio fundido com dissipador' },
      { label: 'Ângulo de Abertura', value: '60° / 90° / 120°' },
      { label: 'Altura de Instalação', value: '6m a 15m' },
    ],
    features: [
      'Alta potência luminosa',
      'Dissipação térmica eficiente',
      'Ideal para grandes alturas',
      'Economia de até 70% de energia',
      'Driver interno de alta eficiência',
      'Refletor de alto rendimento',
    ],
  },
  {
    id: '8',
    title: 'Luminárias Decorativa',
    slug: 'luminarias-decorativas',
    category: 'Áreas Classificadas',
    description:
      'Luminárias decorativas certificadas para áreas classificadas, combinando segurança e design para ambientes industriais e comerciais.',
    shortDescription: 'Para áreas classificadas',
    mainImage:
      'https://potenze.com.br/wp-content/uploads/2026/03/LUMINARIA-DECORATIVA-CINZA-CHUMBO-N-980x784.png',
    images: [
      'https://potenze.com.br/wp-content/uploads/2026/03/LUMINARIA-DECORATIVA-CINZA-CHUMBO-N-980x784.png',
      'https://potenze.com.br/wp-content/uploads/2026/03/LUMINARIA-DECORATIVA-CINZA-CHUMBO-N-980x784.png',
    ],
    specifications: [
      { label: 'Certificação', value: 'Ex d IIC T6 Gb' },
      { label: 'Grau de Proteção', value: 'IP66' },
      { label: 'Potência', value: '60W / 100W / 150W' },
      { label: 'Tensão', value: '100-240V AC' },
      { label: 'Temperatura de Cor', value: '5000K' },
      { label: 'Fluxo Luminoso', value: 'Até 19.500 lm' },
      { label: 'Material', value: 'Alumínio com revestimento anticorrosivo' },
      { label: 'Vida Útil', value: '50.000 horas' },
      { label: 'Temperatura Ambiente', value: '-40°C a +60°C' },
      { label: 'Classificação de Área', value: 'Zona 1 e 2' },
    ],
    features: [
      'Certificada para áreas classificadas',
      'Proteção à prova de explosão',
      'Resistente a ambientes corrosivos',
      'Segurança máxima',
      'Conformidade com normas internacionais',
      'Ideal para petroquímicas e refinarias',
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category);
}
