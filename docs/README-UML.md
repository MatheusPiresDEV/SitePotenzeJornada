# Documentação UML - Sistema Potenze

## 📋 Visão Geral

Esta documentação apresenta a modelagem completa do sistema orientado a objetos do site Potenze utilizando UML (Unified Modeling Language). O sistema é uma aplicação web SPA (Single Page Application) desenvolvida em React + TypeScript para catálogo de produtos de iluminação LED industrial.

**Empresa:** Potenze Iluminação LED Industrial  
**Website:** https://potenze.com.br/  
**Tecnologias:** React 18+, TypeScript, React Router, Tailwind CSS, Motion (Framer Motion)  
**Arquitetura:** SPA com navegação client-side

---

## 📚 Diagramas Disponíveis

### 1. [Diagrama de Casos de Uso](./UML-CASOS-DE-USO.md)
**O que modela:** Interações entre atores (usuários) e sistema, funcionalidades principais.

**Conteúdo:**
- **Atores:** Cliente (Visitante), Cliente Interessado
- **11 Casos de Uso Principais:**
  - UC-01: Visualizar Home
  - UC-02: Navegar pelo Catálogo
  - UC-03: Pesquisar Produtos
  - UC-04: Filtrar Produtos
  - UC-05: Visualizar Detalhes do Produto
  - UC-06: Alternar Imagem do Produto
  - UC-07: Solicitar Orçamento
  - UC-08: Baixar Catálogo
  - UC-09: Entrar em Contato via WhatsApp
  - UC-10: Entrar em Contato por Telefone
  - UC-11: Entrar em Contato por E-mail
- **Relacionamentos:** extends, includes, requires
- **Requisitos Não-Funcionais**

**Quando consultar:**
- Entender funcionalidades do ponto de vista do usuário
- Mapear fluxos de interação
- Validar requisitos de negócio
- Comunicar com stakeholders não-técnicos

---

### 2. [Diagrama de Classes](./UML-DIAGRAMA-DE-CLASSES.md)
**O que modela:** Estrutura estática do sistema - classes, atributos, métodos, relacionamentos.

**Conteúdo:**
- **Modelos de Dados:**
  - Product (entidade principal)
  - ProductSpec (value object)
- **Componentes React:**
  - App (root)
  - Pages: Home, ProductsPage, ProductDetail
  - Components: Header, Footer, Hero, Products, ProductCard, etc.
- **Serviços:**
  - ProductService (repository pattern)
  - IconMapper (utility)
- **Relacionamentos:** 
  - Composição, Agregação, Dependência, Uso
- **Padrões de Projeto:**
  - Component Pattern, Repository, Strategy, Observer, Singleton, Mapper

**Quando consultar:**
- Entender arquitetura do código
- Identificar responsabilidades de cada classe
- Visualizar dependências entre componentes
- Planejar refatorações ou extensões

---

### 3. [Diagrama de Sequência](./UML-DIAGRAMA-DE-SEQUENCIA.md)
**O que modela:** Fluxos dinâmicos - interações temporais entre objetos ao longo do tempo.

**Conteúdo:**
- **5 Sequências Principais:**
  1. **Visualizar Detalhes do Produto:** ProductCard → Router → ScrollToTop → ProductDetail → ProductService
  2. **Pesquisar e Filtrar Produtos:** ProductsPage → useMemo → ProductService (filtragem em tempo real)
  3. **Alternar Imagem na Galeria:** ProductDetail → React State → Browser (interação com galeria)
  4. **Solicitar Orçamento:** ProductDetail → Router → Home → Browser (navegação cross-page com scroll)
  5. **Iniciar Aplicação:** index.tsx → React → BrowserRouter → App (bootstrap completo)
- **Timing:** Estimativas de performance para cada fluxo
- **Fluxos alternativos:** Erros, estados vazios, edge cases

**Quando consultar:**
- Debugar fluxos complexos
- Otimizar performance
- Entender order of operations
- Documentar integrações entre componentes

---

### 4. [Diagrama de Estados](./UML-DIAGRAMA-DE-ESTADOS.md)
**O que modela:** Ciclo de vida e transições de estado de objetos e componentes.

**Conteúdo:**
- **6 Máquinas de Estados:**
  1. **Estados da Navegação:** HOME ↔ CATALOG_PAGE ↔ PRODUCT_DETAIL
  2. **Estados da Galeria de Imagens:** FIRST_IMAGE ↔ SECOND_IMAGE ↔ THIRD_IMAGE
  3. **Estados do Sistema de Filtragem:** NO_FILTERS → SEARCH_ACTIVE → MULTI_FILTER → FILTERED_SORTED → NO_RESULTS
  4. **Estados do Mobile Menu:** CLOSED ↔ OPEN
  5. **Estados do Scroll Behavior:** AT_TOP ↔ SCROLLED
  6. **Estados do WhatsApp Button:** VISIBLE ↔ HOVERED → CLICKED
- **Transições:** Eventos que causam mudanças de estado
- **Condições:** Guards e invariantes
- **Estados compostos:** Hierarquia e sub-estados

**Quando consultar:**
- Entender comportamento de componentes
- Implementar state machines
- Validar lógica de transições
- Identificar estados faltantes ou inconsistentes

---

## 🎯 Casos de Uso por Papel

### Desenvolvedor Frontend
**Consultar primeiro:**
1. Diagrama de Classes (estrutura do código)
2. Diagrama de Sequência (fluxos de interação)
3. Diagrama de Estados (comportamento de componentes)

**Uso típico:**
- Implementar novo componente: Classes + Estados
- Debugar bug: Sequência + Estados
- Refatorar código: Classes + Casos de Uso (validar que funcionalidades não quebrem)

---

### Analista de Sistemas / Product Owner
**Consultar primeiro:**
1. Diagrama de Casos de Uso (funcionalidades)
2. Diagrama de Sequência (fluxos end-to-end)

**Uso típico:**
- Validar requisitos: Casos de Uso
- Planejar features: Casos de Uso + Sequência
- Comunicar com stakeholders: Casos de Uso (diagrama visual)

---

### Arquiteto de Software
**Consultar todos:**
1. Classes (estrutura e padrões)
2. Sequência (integrações e performance)
3. Estados (complexidade de lógica)
4. Casos de Uso (cobertura funcional)

**Uso típico:**
- Avaliar qualidade: Classes (padrões, coesão, acoplamento)
- Planejar escalabilidade: Sequência (gargalos) + Estados (complexidade)
- Revisar arquitetura: Classes + Sequência

---

### Testador / QA
**Consultar primeiro:**
1. Casos de Uso (cenários de teste)
2. Estados (casos de teste de transição)
3. Sequência (fluxos para teste de integração)

**Uso típico:**
- Criar casos de teste: Casos de Uso (fluxos principais e alternativos)
- Testes de transição: Estados (todas as transições)
- Testes de integração: Sequência (end-to-end)

---

## 📊 Estatísticas do Sistema

### Componentes
- **Páginas:** 3 (Home, ProductsPage, ProductDetail)
- **Componentes de Layout:** 3 (Header, Footer, WhatsAppButton)
- **Componentes de UI:** 10+ (Hero, Features, Products, ProductCard, etc.)
- **Componentes Utilitários:** 2 (ScrollToTop, ImageWithFallback)

### Dados
- **Entidades:** 1 (Product)
- **Value Objects:** 1 (ProductSpec)
- **Produtos no Catálogo:** 8
- **Categorias:** 2 (Industrial, Comercial)

### Rotas
- **Rotas Públicas:** 3
  - `/` (Home)
  - `/produtos` (Catalog)
  - `/produto/:slug` (Product Detail)

### Funcionalidades
- **Casos de Uso:** 11
- **Filtros:** 3 (Pesquisa, Categoria, Grau de Proteção IP)
- **Ordenações:** 3 (Nome A-Z, Nome Z-A, Categoria)
- **Formas de Contato:** 4 (WhatsApp, Telefone, E-mail, Formulário)

---

## 🔄 Fluxos Críticos (End-to-End)

### Fluxo 1: Buscar Produto e Solicitar Orçamento
```
HOME → Click "Ver Catálogo" → CATALOG_PAGE → 
Type "IP67" (pesquisa) → Filtrar resultados → 
Click produto → PRODUCT_DETAIL → 
View specs & images → Click "Solicitar Orçamento" → 
HOME (scroll to #contato) → Fill form / Click WhatsApp
```

**Diagramas relacionados:**
- Casos de Uso: UC-02, UC-03, UC-05, UC-07, UC-09
- Sequência: Seq. 1 (Product Detail), Seq. 2 (Search), Seq. 4 (Cross-page)
- Estados: Navigation, Filtering, Gallery

---

### Fluxo 2: Explorar Produtos em Destaque e Ver Detalhes
```
HOME → Scroll to Products section → 
Click featured product → PRODUCT_DETAIL → 
View gallery (click thumbnails) → 
Read specs → Click "Baixar Catálogo"
```

**Diagramas relacionados:**
- Casos de Uso: UC-01, UC-05, UC-06, UC-08
- Sequência: Seq. 1 (Product Detail), Seq. 3 (Gallery)
- Estados: Navigation, Gallery

---

## 🛠️ Tecnologias e Padrões

### Stack Tecnológico
- **Frontend Framework:** React 18+ (Functional Components + Hooks)
- **Language:** TypeScript 5+
- **Routing:** React Router v6 (SPA navigation)
- **Styling:** Tailwind CSS v4
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Package Manager:** pnpm

### Padrões de Projeto Implementados
1. **Component Pattern** (React) - Separação container/presentational
2. **Repository Pattern** (ProductService) - Abstração de acesso a dados
3. **Strategy Pattern** (IconMapper, Sorting) - Múltiplas estratégias intercambiáveis
4. **Observer Pattern** (React Hooks) - useState, useEffect, useMemo
5. **Singleton Pattern** (ProductService) - Métodos estáticos, instância única implícita
6. **Mapper Pattern** (IconMapper) - Transformação de dados para representação

### Princípios SOLID Observados
- **S (Single Responsibility):** Cada componente tem uma responsabilidade clara
- **O (Open/Closed):** IconMapper extensível sem modificação
- **L (Liskov Substitution):** Componentes substituíveis (ProductCard)
- **I (Interface Segregation):** Props bem definidas, não infladas
- **D (Dependency Inversion):** ProductService abstrai fonte de dados

---

## 📁 Estrutura de Arquivos do Projeto

```
/workspaces/default/code/
├── src/
│   ├── app/
│   │   ├── App.tsx                 # Root component
│   │   ├── components/             # Reusable components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── Partners.tsx
│   │   │   ├── CTA.tsx
│   │   │   ├── WhatsAppButton.tsx
│   │   │   ├── ScrollToTop.tsx
│   │   │   └── figma/
│   │   │       └── ImageWithFallback.tsx
│   │   ├── pages/                  # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── ProductsPage.tsx
│   │   │   └── ProductDetail.tsx
│   │   └── data/                   # Data layer
│   │       └── products.ts         # Product data & interfaces
│   └── styles/                     # Global styles
│       ├── theme.css               # Design tokens
│       └── fonts.css               # Font imports
├── docs/                           # Documentation (UML)
│   ├── README-UML.md              # This file
│   ├── UML-CASOS-DE-USO.md
│   ├── UML-DIAGRAMA-DE-CLASSES.md
│   ├── UML-DIAGRAMA-DE-SEQUENCIA.md
│   └── UML-DIAGRAMA-DE-ESTADOS.md
└── package.json                    # Dependencies
```

---

## 🚀 Roadmap de Evolução

### Melhorias Futuras Sugeridas

#### 1. Backend Integration
**Impacto nos Diagramas:**
- **Classes:** Adicionar API Service layer
- **Sequência:** Novos fluxos assíncronos (fetch, error handling)
- **Estados:** Adicionar Loading, Error, Success states

**Mudanças:**
- ProductService passa a chamar API REST
- Adicionar cache strategy (SWR, React Query)
- Implementar error boundaries

---

#### 2. Carrinho de Compras
**Impacto nos Diagramas:**
- **Casos de Uso:** +5 casos (Adicionar ao carrinho, Ver carrinho, etc.)
- **Classes:** Nova entidade Cart, CartItem
- **Estados:** Nova máquina de estados do carrinho
- **Sequência:** Fluxos de adicionar/remover produtos

**Mudanças:**
- Context API para estado global do carrinho
- Persistência em LocalStorage
- Integração com checkout

---

#### 3. Sistema de Busca Avançada
**Impacto nos Diagramas:**
- **Casos de Uso:** UC-03 expandido com filtros avançados
- **Classes:** SearchService com algoritmos mais sofisticados
- **Estados:** Estados de busca (Typing → Searching → Results)
- **Sequência:** Debouncing, API calls

**Mudanças:**
- Busca por especificações técnicas
- Auto-complete
- Histórico de buscas
- Sugestões

---

#### 4. Autenticação / Área do Cliente
**Impacto nos Diagramas:**
- **Casos de Uso:** +8 casos (Login, Logout, Perfil, Pedidos, etc.)
- **Classes:** User, AuthService
- **Estados:** AuthState (Unauthenticated → Authenticated)
- **Sequência:** Fluxos de autenticação (OAuth, JWT)

**Mudanças:**
- Protected routes
- User dashboard
- Order history
- Favorites/Wishlist

---

#### 5. Multi-idioma (i18n)
**Impacto nos Diagramas:**
- **Classes:** TranslationService
- **Estados:** LanguageState (PT ↔ EN ↔ ES)
- **Sequência:** Load translations (lazy loading)

**Mudanças:**
- React-i18next integration
- Language switcher component
- Translated content files

---

## 📖 Como Usar Esta Documentação

### Para Novos Desenvolvedores (Onboarding)

**Dia 1: Visão Geral**
1. Ler este README completo
2. Estudar Diagrama de Casos de Uso (funcionalidades)
3. Explorar o código-fonte com base no Diagrama de Classes

**Dia 2-3: Deep Dive**
1. Diagrama de Classes detalhado (todas as classes)
2. Rodar a aplicação localmente
3. Debugar usando Diagrama de Sequência como referência

**Dia 4-5: Prática**
1. Implementar pequena feature usando diagramas como guia
2. Estudar Diagrama de Estados para entender comportamento
3. Escrever testes baseados em Casos de Uso

---

### Para Manutenção de Código

**Quando corrigir um bug:**
1. Identificar caso de uso afetado (Casos de Uso)
2. Localizar classes/componentes envolvidos (Classes)
3. Traçar fluxo de execução (Sequência)
4. Verificar estados envolvidos (Estados)
5. Reproduzir bug seguindo sequência
6. Aplicar fix e validar contra casos de uso

---

### Para Adicionar Nova Feature

**Processo:**
1. **Análise:** Criar novo caso de uso (ou estender existente)
2. **Design:** Atualizar Diagrama de Classes (novas classes/métodos)
3. **Fluxo:** Adicionar sequência no Diagrama de Sequência
4. **Comportamento:** Modelar estados no Diagrama de Estados
5. **Implementação:** Seguir diagramas como blueprint
6. **Testes:** Basear em casos de uso e transições de estado
7. **Documentação:** Atualizar todos os diagramas relevantes

---

## 🔍 Referências Rápidas

### Convenções UML Usadas

**Diagrama de Classes:**
- `+` público
- `-` privado
- `#` protegido
- `[1]` cardinalidade
- `──►` associação/dependência
- `◄──` herança/implementação

**Diagrama de Sequência:**
- `│` lifeline
- `──►` mensagem síncrona
- `◄──` retorno
- `├─` ativação
- `└─` desativação
- `ALT`, `LOOP`, `OPT` - fragmentos

**Diagrama de Estados:**
- `┌─────┐` estado
- `─►` transição
- `[condition]` guard
- `/ action` efeito
- `◄──►` transição bidirecional

---

## 📞 Contato e Contribuição

### Manutenção da Documentação

Esta documentação deve ser atualizada sempre que:
- Novos componentes forem adicionados
- Rotas mudarem
- Novos casos de uso forem implementados
- Fluxos críticos mudarem
- Estados de componentes forem modificados

### Responsável
**Time de Desenvolvimento Potenze**

### Última Atualização
**Data:** 2026-05-14  
**Versão do Sistema:** 1.0.0  
**Autor:** Claude (Assistente AI)

---

## 🏆 Conclusão

Esta documentação UML fornece uma visão completa e estruturada do sistema Potenze, servindo como:
- **Blueprint** para desenvolvimento
- **Referência** para manutenção
- **Comunicação** entre equipes técnicas e não-técnicas
- **Base** para evolução e escalabilidade

Mantenha-a atualizada e use-a como fonte única de verdade sobre a arquitetura do sistema! 🚀
