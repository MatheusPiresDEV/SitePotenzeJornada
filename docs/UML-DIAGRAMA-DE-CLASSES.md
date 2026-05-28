# Diagrama de Classes - Sistema Potenze

## Visão Geral
Este diagrama representa a estrutura orientada a objetos do sistema de catálogo de produtos Potenze, incluindo componentes React, modelos de dados e serviços.

---

## Classes do Modelo de Dados

### Product
**Responsabilidade:** Representar um produto completo com todas as suas informações  
**Tipo:** Entity / Data Model

```typescript
class Product {
  - id: string
  - title: string
  - slug: string
  - description: string
  - shortDescription: string
  - category: string
  - mainImage: string
  - images: string[]
  - specifications: ProductSpec[]
  - features: string[]
  
  + getId(): string
  + getTitle(): string
  + getSlug(): string
  + getCategory(): string
  + getSpecificationByLabel(label: string): ProductSpec | undefined
  + hasMultipleImages(): boolean
  + getImageCount(): number
}
```

**Atributos:**
- `id`: Identificador único do produto
- `title`: Nome completo do produto
- `slug`: URL-friendly identifier (ex: "luminarias-ip67")
- `description`: Descrição detalhada para página do produto
- `shortDescription`: Descrição breve para cards e listagens
- `category`: Categoria do produto (Industrial, Comercial, etc.)
- `mainImage`: URL da imagem principal (thumbnail)
- `images`: Array de URLs para galeria completa
- `specifications`: Lista de especificações técnicas
- `features`: Lista de características e diferenciais

---

### ProductSpec
**Responsabilidade:** Representar uma especificação técnica individual  
**Tipo:** Value Object

```typescript
class ProductSpec {
  - label: string
  - value: string
  
  + getLabel(): string
  + getValue(): string
  + toString(): string
}
```

**Atributos:**
- `label`: Nome da especificação (ex: "Grau de Proteção", "Potência")
- `value`: Valor da especificação (ex: "IP67", "50W / 100W / 150W")

**Relacionamento:** 
- Product [1] ──► [0..*] ProductSpec (Composição)

---

## Classes de Componentes React

### App (Main Component)
**Responsabilidade:** Componente raiz, gerenciar roteamento e layout global  
**Tipo:** Controller / Container Component

```typescript
class App extends React.Component {
  + render(): JSX.Element
  - setupRoutes(): JSX.Element
}
```

**Dependências:**
- BrowserRouter (React Router)
- Header, Footer, WhatsAppButton, ScrollToTop
- Home, ProductsPage, ProductDetail (Pages)

**Rotas:**
- `/` → Home
- `/produtos` → ProductsPage
- `/produto/:slug` → ProductDetail

---

### Home
**Responsabilidade:** Página inicial com visão geral da empresa e produtos em destaque  
**Tipo:** Page Component

```typescript
class Home extends React.Component {
  + render(): JSX.Element
}
```

**Subcomponentes:**
- Hero
- Features
- Products (destaques)
- Partners
- CTA

---

### ProductsPage
**Responsabilidade:** Catálogo completo com pesquisa, filtros e ordenação  
**Tipo:** Page Component / Smart Component

```typescript
class ProductsPage extends React.Component {
  - searchQuery: string
  - selectedCategory: string
  - selectedIP: string
  - sortBy: string
  - showFilters: boolean
  
  + constructor()
  + render(): JSX.Element
  - handleSearch(query: string): void
  - handleCategoryFilter(category: string): void
  - handleIPFilter(ip: string): void
  - handleSort(sortType: string): void
  - toggleFilters(): void
  - resetFilters(): void
  - getFilteredProducts(): Product[]
  - getSortedProducts(products: Product[]): Product[]
  - extractCategories(): string[]
  - extractIPRatings(): string[]
  - hasActiveFilters(): boolean
}
```

**State:**
- `searchQuery`: Termo de busca atual
- `selectedCategory`: Categoria selecionada no filtro
- `selectedIP`: Grau de proteção IP selecionado
- `sortBy`: Critério de ordenação atual
- `showFilters`: Visibilidade do painel de filtros (mobile)

**Hooks/Methods:**
- `useMemo`: Otimização para filtragem e ordenação
- `useState`: Gerenciamento de estado local

---

### ProductDetail
**Responsabilidade:** Página individual do produto com todas as informações detalhadas  
**Tipo:** Page Component / Smart Component

```typescript
class ProductDetail extends React.Component {
  - selectedImage: number
  - product: Product | undefined
  
  + constructor()
  + render(): JSX.Element
  - getProductFromSlug(slug: string): Product | undefined
  - handleImageSelect(index: number): void
  - scrollToContact(): void
  - handleDownloadCatalog(): void
  - renderGallery(): JSX.Element
  - renderSpecs(): JSX.Element
  - getSpecIcon(label: string): LucideIcon
}
```

**State:**
- `selectedImage`: Índice da imagem atualmente selecionada na galeria
- `product`: Dados do produto (derivado do slug na URL)

**Params:**
- `slug`: Identificador do produto na URL (useParams do React Router)

---

### ProductCard
**Responsabilidade:** Card visual de produto para listagens  
**Tipo:** Presentational Component

```typescript
class ProductCard extends React.Component {
  - slug: string
  - title: string
  - image: string
  - description: string
  - index: number
  
  + constructor(props: ProductCardProps)
  + render(): JSX.Element
  - handleClick(): void
}
```

**Props:**
- `slug`: Para navegação
- `title`: Título do produto
- `image`: URL da imagem principal
- `description`: Descrição breve
- `index`: Para animações escalonadas (delay)

---

### Products
**Responsabilidade:** Seção de produtos em destaque na home  
**Tipo:** Container Component

```typescript
class Products extends React.Component {
  + render(): JSX.Element
  - renderProductCards(): JSX.Element[]
}
```

**Dependências:**
- ProductCard (renderizado para cada produto)
- products[] (importado do data layer)

---

### Header
**Responsabilidade:** Cabeçalho com logo e navegação  
**Tipo:** Layout Component

```typescript
class Header extends React.Component {
  - isScrolled: boolean
  - isMobileMenuOpen: boolean
  
  + render(): JSX.Element
  - handleScroll(): void
  - toggleMobileMenu(): void
  - renderNavLinks(): JSX.Element
}
```

**State:**
- `isScrolled`: Controle de estilo ao rolar página
- `isMobileMenuOpen`: Estado do menu mobile

**Features:**
- Logo da empresa
- Navegação (Home, Produtos, Contato)
- Responsivo (menu hamburger em mobile)
- Sticky positioning

---

### Footer
**Responsabilidade:** Rodapé com informações e links  
**Tipo:** Layout Component

```typescript
class Footer extends React.Component {
  + render(): JSX.Element
  - renderContactInfo(): JSX.Element
  - renderSocialLinks(): JSX.Element
  - renderCompanyInfo(): JSX.Element
}
```

**Conteúdo:**
- Informações de contato
- Links rápidos
- Redes sociais
- Direitos autorais

---

### WhatsAppButton
**Responsabilidade:** Botão flutuante para contato via WhatsApp  
**Tipo:** UI Component

```typescript
class WhatsAppButton extends React.Component {
  - phoneNumber: string
  - message: string
  
  + render(): JSX.Element
  - openWhatsApp(): void
  - generateWhatsAppUrl(): string
}
```

**Características:**
- Posição fixa (bottom-right)
- Visível em todas as páginas
- Link direto para WhatsApp Web/App
- Animação de entrada

---

### ScrollToTop
**Responsabilidade:** Gerenciar scroll automático ao trocar de rota  
**Tipo:** Utility Component

```typescript
class ScrollToTop extends React.Component {
  + constructor()
  + render(): null
  - handleRouteChange(): void
}
```

**Comportamento:**
- Monitora mudanças de localização (useLocation)
- Executa `window.scrollTo(0, 0)` em cada mudança
- Não renderiza nada (null component)

---

### Hero
**Responsabilidade:** Banner principal da home com CTA  
**Tipo:** Presentational Component

```typescript
class Hero extends React.Component {
  + render(): JSX.Element
}
```

**Conteúdo:**
- Título principal
- Subtítulo/descrição
- Call-to-action buttons
- Imagem/vídeo de fundo
- Animações de entrada

---

### Features
**Responsabilidade:** Seção de características/diferenciais da empresa  
**Tipo:** Presentational Component

```typescript
class Features extends React.Component {
  - features: Feature[]
  
  + render(): JSX.Element
  - renderFeatureCard(feature: Feature): JSX.Element
}
```

---

### Partners
**Responsabilidade:** Seção de parceiros/clientes  
**Tipo:** Presentational Component

```typescript
class Partners extends React.Component {
  - partners: Partner[]
  
  + render(): JSX.Element
  - renderPartnerLogo(partner: Partner): JSX.Element
}
```

---

### CTA
**Responsabilidade:** Call-to-action para contato/orçamento  
**Tipo:** Presentational Component

```typescript
class CTA extends React.Component {
  + render(): JSX.Element
}
```

---

## Classes de Serviço / Utilidades

### ProductService
**Responsabilidade:** Gerenciar acesso aos dados de produtos  
**Tipo:** Service / Repository

```typescript
class ProductService {
  + static getAllProducts(): Product[]
  + static getProductBySlug(slug: string): Product | undefined
  + static getProductById(id: string): Product | undefined
  + static getProductsByCategory(category: string): Product[]
  + static searchProducts(query: string): Product[]
  + static filterProducts(filters: ProductFilters): Product[]
  + static sortProducts(products: Product[], sortBy: string): Product[]
}
```

**Localização:** `/src/app/data/products.ts`

**Métodos:**
- `getAllProducts()`: Retorna array completo de produtos
- `getProductBySlug(slug)`: Busca produto por slug (para URL)
- `getProductById(id)`: Busca produto por ID
- `getProductsByCategory(category)`: Filtra por categoria
- `searchProducts(query)`: Busca textual em título/descrição
- `filterProducts(filters)`: Aplica múltiplos filtros
- `sortProducts(products, sortBy)`: Ordena produtos

---

### IconMapper
**Responsabilidade:** Mapear especificações técnicas para ícones apropriados  
**Tipo:** Utility / Mapper

```typescript
class IconMapper {
  + static getSpecIcon(label: string): LucideIcon
  - static iconMap: Map<string, LucideIcon>
  - static matchKeyword(label: string, keywords: string[]): boolean
}
```

**Método Principal:**
- `getSpecIcon(label)`: Analisa label e retorna ícone correspondente

**Mapeamento:**
- "proteção" → Shield
- "potência" → Zap
- "tensão" → Plug
- "temperatura" → Thermometer
- "fluxo/luminoso" → Sun
- "cor/cri/reprodução" → Palette
- "vida" → Clock
- "material/corpo" → Box
- "ângulo/abertura" → Aperture
- "dimensões/comprimento" → Ruler
- "peso" → Weight
- "eficiência/fator" → Gauge
- "lâmpada/led" → Lightbulb
- default → Settings

---

## Interfaces

### ProductFilters
```typescript
interface ProductFilters {
  searchQuery?: string
  category?: string
  ipRating?: string
  sortBy?: 'name-asc' | 'name-desc' | 'category'
}
```

---

## Diagrama de Relacionamentos

```
┌──────────────────────────────────────────────────────────┐
│                          App                              │
│  + render(): JSX.Element                                  │
└───────────────────┬──────────────────────────────────────┘
                    │
                    │ uses
    ┌───────────────┼────────────────┐
    │               │                │
    ▼               ▼                ▼
┌─────────┐   ┌──────────┐   ┌──────────────┐
│  Home   │   │ Products │   │ ProductDetail│
│         │   │   Page   │   │              │
└────┬────┘   └─────┬────┘   └──────┬───────┘
     │              │                │
     │uses          │uses            │uses
     │              │                │
     ▼              ▼                ▼
┌──────────────────────────────────────┐
│          ProductCard                 │
│  - slug: string                      │
│  - title: string                     │
│  - image: string                     │
│  + render(): JSX.Element             │
└──────────┬───────────────────────────┘
           │
           │ displays
           │
           ▼
┌───────────────────────────────────────┐
│           Product                     │
│  - id: string                         │
│  - title: string                      │
│  - slug: string                       │
│  - category: string                   │
│  - specifications: ProductSpec[]      │
│  + getSpecificationByLabel(): ...     │
└──────────┬────────────────────────────┘
           │
           │ contains (1 to many)
           │
           ▼
┌───────────────────────────────────────┐
│         ProductSpec                   │
│  - label: string                      │
│  - value: string                      │
│  + getLabel(): string                 │
│  + getValue(): string                 │
└───────────────────────────────────────┘


┌───────────────────────────────────────┐
│       ProductService                  │
│  + getAllProducts(): Product[]        │
│  + getProductBySlug(): Product        │
│  + searchProducts(): Product[]        │
│  + filterProducts(): Product[]        │
│  + sortProducts(): Product[]          │
└──────────┬────────────────────────────┘
           │
           │ provides data to
           │
    ┌──────┴──────┬──────────────┐
    ▼             ▼              ▼
 Home      ProductsPage    ProductDetail


┌───────────────────────────────────────┐
│         IconMapper                    │
│  + getSpecIcon(label): LucideIcon     │
└──────────┬────────────────────────────┘
           │
           │ used by
           │
           ▼
     ProductDetail
     (renderSpecs)
```

---

## Padrões de Projeto Utilizados

### 1. **Component Pattern** (React)
- Separação entre Container (smart) e Presentational (dumb) components
- Componentes reutilizáveis e compostos

### 2. **Repository Pattern**
- `ProductService` abstrai acesso aos dados
- Facilita troca de fonte de dados (agora array estático, futuro API)

### 3. **Strategy Pattern**
- `IconMapper`: Estratégias diferentes de mapeamento por tipo de especificação
- Sorting: Diferentes estratégias de ordenação (name-asc, name-desc, category)

### 4. **Observer Pattern** (React Hooks)
- `useState`: Observa mudanças de estado
- `useEffect`: Reage a mudanças
- `useMemo`: Recomputa quando dependências mudam

### 5. **Singleton Pattern** (Implicit)
- `ProductService` expõe métodos estáticos
- Dados centralizados em um único ponto

### 6. **Mapper Pattern**
- `IconMapper`: Transforma dados (labels) em representações visuais (ícones)

---

## Notas de Implementação

- **TypeScript**: Todas as classes/interfaces usam tipagem forte
- **React Hooks**: Componentes funcionais com useState, useEffect, useMemo, useParams
- **React Router**: Navegação SPA com rotas dinâmicas
- **Lucide Icons**: Biblioteca de ícones consistente
- **Motion (Framer Motion)**: Animações declarativas
- **Tailwind CSS**: Estilização utilitária (não representada em diagrama UML)
