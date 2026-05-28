import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  Box,
  GitBranch,
  Workflow,
  FileText,
  Download,
  ExternalLink,
} from 'lucide-react';

type DiagramType = 'casos-uso' | 'classes' | 'sequencia' | 'estados' | 'visao-geral';

export function UMLDiagrams() {
  const [activeTab, setActiveTab] = useState<DiagramType>('visao-geral');

  const tabs = [
    {
      id: 'visao-geral' as DiagramType,
      label: 'Visão Geral',
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      id: 'casos-uso' as DiagramType,
      label: 'Casos de Uso',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      id: 'classes' as DiagramType,
      label: 'Classes',
      icon: Box,
      color: 'bg-purple-500',
    },
    {
      id: 'sequencia' as DiagramType,
      label: 'Sequência',
      icon: GitBranch,
      color: 'bg-orange-500',
    },
    {
      id: 'estados' as DiagramType,
      label: 'Estados',
      icon: Workflow,
      color: 'bg-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      {/* Header */}
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
            <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              DOCUMENTAÇÃO TÉCNICA
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Diagramas UML
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Modelagem completa do sistema orientado a objetos do site Potenze
              com diagramas UML profissionais
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-12">
        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#8B1E1E] text-white shadow-md'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'visao-geral' && <VisaoGeralContent />}
            {activeTab === 'casos-uso' && <CasosUsoContent />}
            {activeTab === 'classes' && <ClassesContent />}
            {activeTab === 'sequencia' && <SequenciaContent />}
            {activeTab === 'estados' && <EstadosContent />}
          </motion.div>
        </AnimatePresence>

        {/* Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-gradient-to-br from-neutral-900 to-[#8B1E1E] rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            Documentação Completa Disponível
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Acesse a documentação técnica completa em markdown com todos os
            diagramas, especificações e guias de implementação
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/docs/README-UML.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#8B1E1E] px-6 py-3 rounded-lg font-semibold hover:bg-neutral-100 transition-all"
            >
              <FileText className="w-5 h-5" />
              README Principal
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="/docs/INDEX.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all border-2 border-white/20"
            >
              <Download className="w-5 h-5" />
              Índice Completo
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Visão Geral Content
function VisaoGeralContent() {
  const stats = [
    { label: 'Casos de Uso', value: '11', color: 'text-green-600' },
    { label: 'Classes Modeladas', value: '20+', color: 'text-purple-600' },
    { label: 'Sequências Mapeadas', value: '5', color: 'text-orange-600' },
    { label: 'Máquinas de Estados', value: '6', color: 'text-pink-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-neutral-600 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Arquitetura Visual */}
      <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
          Arquitetura do Sistema
        </h2>
        <div className="bg-neutral-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
          <pre className="whitespace-pre">
{`┌──────────────────────────────────────────────────────────┐
│                     BROWSER (SPA)                        │
├──────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────┐  │
│  │           APP (Root Component)                     │  │
│  │  ┌──────────────────────────────────────────────┐ │  │
│  │  │     React Router (Navigation)                │ │  │
│  │  └──────────────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Header    │  │   Footer    │  │  WhatsApp   │     │
│  │  (Layout)   │  │  (Layout)   │  │   Button    │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │                    ROUTES                          │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐    │ │
│  │  │   Home   │  │ Products │  │Product Detail│    │ │
│  │  │          │  │   Page   │  │              │    │ │
│  │  │ - Hero   │  │ - Search │  │  - Gallery   │    │ │
│  │  │ - Feat   │  │ - Filters│  │  - Specs     │    │ │
│  │  │ - Prods  │  │ - Grid   │  │  - Features  │    │ │
│  │  └────┬─────┘  └────┬─────┘  └──────┬───────┘    │ │
│  └───────┼─────────────┼────────────────┼────────────┘ │
│          │             │                │              │
│          └─────────────┴────────────────┘              │
│                        │                               │
│                        ▼                               │
│  ┌────────────────────────────────────────────────────┐ │
│  │      ProductService (Data Layer)                   │ │
│  │      8 Produtos LED Industriais                    │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘`}
          </pre>
        </div>
      </div>

      {/* Tecnologias */}
      <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
          Stack Tecnológico
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#8B1E1E] mt-2"></div>
            <div>
              <div className="font-semibold text-neutral-900">
                React 18 + TypeScript
              </div>
              <div className="text-sm text-neutral-600">
                Functional Components + Hooks
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#8B1E1E] mt-2"></div>
            <div>
              <div className="font-semibold text-neutral-900">
                React Router v6
              </div>
              <div className="text-sm text-neutral-600">SPA Navigation</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#8B1E1E] mt-2"></div>
            <div>
              <div className="font-semibold text-neutral-900">
                Tailwind CSS v4
              </div>
              <div className="text-sm text-neutral-600">Utility-first CSS</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#8B1E1E] mt-2"></div>
            <div>
              <div className="font-semibold text-neutral-900">
                Motion (Framer Motion)
              </div>
              <div className="text-sm text-neutral-600">Animations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Padrões de Projeto */}
      <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
          Padrões de Projeto
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Component Pattern (React)',
            'Repository Pattern',
            'Strategy Pattern',
            'Observer Pattern',
            'Singleton Pattern',
            'Mapper Pattern',
          ].map((pattern, index) => (
            <div
              key={pattern}
              className="flex items-center gap-2 bg-neutral-50 px-4 py-3 rounded-lg"
            >
              <div className="w-2 h-2 rounded-full bg-[#8B1E1E]"></div>
              <div className="text-neutral-700 font-medium">{pattern}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Casos de Uso Content
function CasosUsoContent() {
  const casosDeUso = [
    {
      id: 'UC-01',
      nome: 'Visualizar Home',
      ator: 'Cliente',
      complexidade: 'Simples',
    },
    {
      id: 'UC-02',
      nome: 'Navegar pelo Catálogo',
      ator: 'Cliente',
      complexidade: 'Simples',
    },
    {
      id: 'UC-03',
      nome: 'Pesquisar Produtos',
      ator: 'Cliente',
      complexidade: 'Média',
    },
    {
      id: 'UC-04',
      nome: 'Filtrar Produtos',
      ator: 'Cliente',
      complexidade: 'Média',
    },
    {
      id: 'UC-05',
      nome: 'Visualizar Detalhes do Produto',
      ator: 'Cliente',
      complexidade: 'Média',
    },
    {
      id: 'UC-06',
      nome: 'Alternar Imagem do Produto',
      ator: 'Cliente',
      complexidade: 'Simples',
    },
    {
      id: 'UC-07',
      nome: 'Solicitar Orçamento',
      ator: 'Cliente Interessado',
      complexidade: 'Média',
    },
    {
      id: 'UC-08',
      nome: 'Baixar Catálogo',
      ator: 'Cliente Interessado',
      complexidade: 'Simples',
    },
    {
      id: 'UC-09',
      nome: 'Entrar em Contato via WhatsApp',
      ator: 'Cliente Interessado',
      complexidade: 'Simples',
    },
    {
      id: 'UC-10',
      nome: 'Entrar em Contato por Telefone',
      ator: 'Cliente Interessado',
      complexidade: 'Simples',
    },
    {
      id: 'UC-11',
      nome: 'Entrar em Contato por E-mail',
      ator: 'Cliente Interessado',
      complexidade: 'Simples',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
          11 Casos de Uso Mapeados
        </h2>
        <p className="text-neutral-600 mb-8">
          Todos os fluxos de interação entre usuários e sistema documentados
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {casosDeUso.map((caso, index) => (
            <motion.div
              key={caso.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-neutral-50 rounded-lg p-5 border border-neutral-200 hover:border-[#8B1E1E] hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-sm font-bold text-[#8B1E1E] bg-[#8B1E1E]/10 px-3 py-1 rounded-full">
                  {caso.id}
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-full ${
                    caso.complexidade === 'Simples'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {caso.complexidade}
                </div>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                {caso.nome}
              </h3>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Users className="w-4 h-4" />
                <span>Ator: {caso.ator}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Diagrama Visual */}
      <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
          Diagrama de Atores
        </h2>
        <div className="bg-neutral-900 text-green-400 p-6 rounded-lg font-mono text-xs overflow-x-auto">
          <pre className="whitespace-pre">
{`                    ┌─────────────────┐
                    │                 │
                    │    CLIENTE      │
                    │   (Visitante)   │
                    │                 │
                    └────────┬────────┘
                             │
                             ├──────────► UC-01: Visualizar Home
                             │
                             ├──────────► UC-02: Navegar pelo Catálogo
                             │
                             ├──────────► UC-03: Pesquisar Produtos
                             │
                             ├──────────► UC-04: Filtrar Produtos
                             │
                             ├──────────► UC-05: Visualizar Detalhes
                             │
                             ├──────────► UC-06: Alternar Imagem
                             │
                    ┌────────▼────────┐
                    │                 │
                    │    CLIENTE      │
                    │  INTERESSADO    │
                    │   «extends»     │
                    │                 │
                    └────────┬────────┘
                             │
                             ├──────────► UC-07: Solicitar Orçamento
                             │
                             ├──────────► UC-08: Baixar Catálogo
                             │
                             ├──────────► UC-09: WhatsApp
                             │
                             ├──────────► UC-10: Telefone
                             │
                             └──────────► UC-11: E-mail`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// Classes Content
function ClassesContent() {
  const classes = [
    {
      nome: 'Product',
      tipo: 'Entity',
      atributos: 8,
      metodos: 6,
      color: 'bg-purple-500',
    },
    {
      nome: 'ProductSpec',
      tipo: 'Value Object',
      atributos: 2,
      metodos: 3,
      color: 'bg-purple-400',
    },
    {
      nome: 'App',
      tipo: 'Root Component',
      atributos: 0,
      metodos: 2,
      color: 'bg-blue-500',
    },
    {
      nome: 'Home',
      tipo: 'Page Component',
      atributos: 0,
      metodos: 1,
      color: 'bg-blue-400',
    },
    {
      nome: 'ProductsPage',
      tipo: 'Page Component',
      atributos: 5,
      metodos: 8,
      color: 'bg-blue-400',
    },
    {
      nome: 'ProductDetail',
      tipo: 'Page Component',
      atributos: 2,
      metodos: 5,
      color: 'bg-blue-400',
    },
    {
      nome: 'ProductCard',
      tipo: 'UI Component',
      atributos: 5,
      metodos: 2,
      color: 'bg-green-500',
    },
    {
      nome: 'Header',
      tipo: 'Layout Component',
      atributos: 2,
      metodos: 3,
      color: 'bg-green-400',
    },
    {
      nome: 'Footer',
      tipo: 'Layout Component',
      atributos: 0,
      metodos: 3,
      color: 'bg-green-400',
    },
    {
      nome: 'ProductService',
      tipo: 'Service',
      atributos: 0,
      metodos: 6,
      color: 'bg-orange-500',
    },
    {
      nome: 'IconMapper',
      tipo: 'Utility',
      atributos: 1,
      metodos: 2,
      color: 'bg-orange-400',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
          Estrutura de Classes
        </h2>
        <p className="text-neutral-600 mb-8">
          20+ classes modelando componentes, dados e serviços do sistema
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((classe, index) => (
            <motion.div
              key={classe.nome}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-lg border-2 border-neutral-200 hover:border-[#8B1E1E] hover:shadow-lg transition-all overflow-hidden"
            >
              <div className={`${classe.color} text-white p-4`}>
                <div className="text-xs font-semibold mb-1 opacity-90">
                  {classe.tipo}
                </div>
                <div className="text-lg font-bold">{classe.nome}</div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Atributos:</span>
                  <span className="font-bold text-neutral-900">
                    {classe.atributos}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Métodos:</span>
                  <span className="font-bold text-neutral-900">
                    {classe.metodos}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Diagrama de Relacionamentos */}
      <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
          Relacionamentos Principais
        </h2>
        <div className="bg-neutral-900 text-green-400 p-6 rounded-lg font-mono text-xs overflow-x-auto">
          <pre className="whitespace-pre">
{`                    App
                     │
         ┌───────────┼────────────┐
         │           │            │
         ▼           ▼            ▼
       Home    ProductsPage  ProductDetail
         │           │            │
         └───────────┴────────────┘
                     │
                     │ uses
                     ▼
               ProductCard
                     │
                     │ displays
                     ▼
                 Product ──► ProductSpec
                     │         (1 to many)
                     │
                     │
         ProductService ◄──── All Components
                     │
                     │ provides data
                     ▼
              products: Product[]`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// Sequência Content
function SequenciaContent() {
  const sequencias = [
    {
      nome: 'Visualizar Detalhes do Produto',
      passos: 13,
      timing: '~50-100ms',
      complexidade: 'Alta',
    },
    {
      nome: 'Pesquisar e Filtrar Produtos',
      passos: 8,
      timing: '~10-50ms',
      complexidade: 'Média',
    },
    {
      nome: 'Alternar Imagem na Galeria',
      passos: 5,
      timing: '~16ms',
      complexidade: 'Baixa',
    },
    {
      nome: 'Solicitar Orçamento (Cross-page)',
      passos: 9,
      timing: '~400-600ms',
      complexidade: 'Média',
    },
    {
      nome: 'Iniciar Aplicação (Bootstrap)',
      passos: 12,
      timing: '~200-500ms',
      complexidade: 'Alta',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
          5 Fluxos Principais Mapeados
        </h2>
        <p className="text-neutral-600 mb-8">
          Sequências detalhadas de interação com timing estimado
        </p>

        <div className="space-y-4">
          {sequencias.map((seq, index) => (
            <motion.div
              key={seq.nome}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gradient-to-r from-neutral-50 to-white rounded-lg p-6 border border-neutral-200 hover:border-orange-400 hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    {seq.nome}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-neutral-600">
                    <span>{seq.passos} passos</span>
                    <span>•</span>
                    <span className="font-mono text-orange-600">
                      {seq.timing}
                    </span>
                  </div>
                </div>
                <div
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    seq.complexidade === 'Alta'
                      ? 'bg-red-100 text-red-700'
                      : seq.complexidade === 'Média'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {seq.complexidade}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Exemplo de Sequência */}
      <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
          Exemplo: Pesquisar e Filtrar Produtos
        </h2>
        <div className="bg-neutral-900 text-green-400 p-6 rounded-lg font-mono text-xs overflow-x-auto">
          <pre className="whitespace-pre">
{`Cliente    ProductsPage    useMemo    ProductService    Browser
  │              │              │              │             │
  ├─ type ──────►│              │              │             │
  │  "IP67"      │              │              │             │
  │              ├─ setState ──►│              │             │
  │              │              │              │             │
  │              │◄── trigger ──┤              │             │
  │              │  re-compute  │              │             │
  │              │              │              │             │
  │              ├─ filter ─────┼─────────────►│             │
  │              │              │  searchQuery │             │
  │              │              │              │             │
  │              │              │◄── filtered ─┤             │
  │              │              │   products[] │             │
  │              │              │              │             │
  │              │◄── memoized ─┤              │             │
  │              │   result     │              │             │
  │              │              │              │             │
  │◄── render ───┤              │              │             │
  │  2 products  │              │              │             │
  │  + tags      │              │              │             │`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// Estados Content
function EstadosContent() {
  const maquinas = [
    {
      nome: 'Navegação (Application)',
      estados: 3,
      descricao: 'HOME ↔ CATALOG ↔ DETAIL',
      color: 'bg-pink-500',
    },
    {
      nome: 'Galeria de Imagens',
      estados: 3,
      descricao: 'FIRST ↔ SECOND ↔ THIRD',
      color: 'bg-pink-400',
    },
    {
      nome: 'Sistema de Filtragem',
      estados: 5,
      descricao: 'NO_FILTERS → SEARCH → MULTI → SORTED → NO_RESULTS',
      color: 'bg-pink-500',
    },
    {
      nome: 'Mobile Menu',
      estados: 2,
      descricao: 'CLOSED ↔ OPEN',
      color: 'bg-pink-400',
    },
    {
      nome: 'Scroll Header',
      estados: 2,
      descricao: 'AT_TOP ↔ SCROLLED',
      color: 'bg-pink-400',
    },
    {
      nome: 'WhatsApp Button',
      estados: 3,
      descricao: 'VISIBLE ↔ HOVERED → CLICKED',
      color: 'bg-pink-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
          6 Máquinas de Estados
        </h2>
        <p className="text-neutral-600 mb-8">
          Modelagem completa de comportamento e transições
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {maquinas.map((maquina, index) => (
            <motion.div
              key={maquina.nome}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg border-2 border-neutral-200 hover:border-pink-400 hover:shadow-lg transition-all overflow-hidden"
            >
              <div className={`${maquina.color} text-white p-4`}>
                <div className="text-lg font-bold mb-1">{maquina.nome}</div>
                <div className="text-sm opacity-90">
                  {maquina.estados} estados
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm text-neutral-600 font-mono">
                  {maquina.descricao}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Exemplo de Estado */}
      <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
          Exemplo: Estados da Navegação
        </h2>
        <div className="bg-neutral-900 text-green-400 p-6 rounded-lg font-mono text-xs overflow-x-auto">
          <pre className="whitespace-pre">
{`                    ┌─────────────────┐
         ┌─────────►│      HOME       │◄──────────────┐
         │          │   Viewing home  │               │
         │          │     page        │               │
         │          └────────┬────────┘               │
         │                   │                        │
         │                   │ click "Ver Catálogo"   │
         │                   ▼                        │
         │          ┌─────────────────┐               │
         │          │  CATALOG_PAGE   │               │
         │          │   Browsing all  │               │
         │          │    products     │               │
         │          └────────┬────────┘               │
         │                   │                        │
         │                   │ click product          │
         │                   ▼                        │
         │          ┌─────────────────┐               │
         │          │ PRODUCT_DETAIL  │               │
         │          │  Viewing single │               │
         │          │    product      │               │
         │          └────────┬────────┘               │
         │                   │                        │
         │                   │ click "Solicitar       │
         │                   │ Orçamento"             │
         │                   └────────────────────────┘
         │
         │  click "Voltar" or logo
         └────────────────────────────────────────────`}
          </pre>
        </div>
      </div>
    </div>
  );
}
