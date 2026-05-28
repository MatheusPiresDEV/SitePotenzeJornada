# Diagramas de Sequência - Sistema Potenze

Este documento apresenta os diagramas de sequência para os fluxos mais críticos e complexos do sistema.

---

## Sequência 1: Visualizar Detalhes do Produto

**Descrição:** Fluxo completo desde o clique no card até a exibição dos detalhes do produto.

**Atores:** Cliente, Browser

**Componentes:** ProductCard → React Router → ScrollToTop → ProductDetail → ProductService

```
Cliente          ProductCard        Router       ScrollToTop    ProductDetail    ProductService       Browser
  │                   │                │               │               │                 │                │
  ├─ click ─────────► │                │               │               │                 │                │
  │                   │                │               │               │                 │                │
  │                   ├─ navigate() ──► │               │               │                 │                │
  │                   │   to("/produto/ │               │               │                 │                │
  │                   │      :slug")    │               │               │                 │                │
  │                   │                │               │               │                 │                │
  │                   │                ├─ location ───► │               │                 │                │
  │                   │                │   changed      │               │                 │                │
  │                   │                │               │               │                 │                │
  │                   │                │               ├─ scrollTo() ──┼────────────────►│                │
  │                   │                │               │  (0, 0)       │                 │                │
  │                   │                │               │               │                 │                │
  │                   │                │               │               │                 │   ┌──scroll──┐ │
  │                   │                │               │               │                 │   │  to top  │ │
  │                   │                │               │               │                 │   └──────────┘ │
  │                   │                │               │               │                 │                │
  │                   │                ├─ render ──────┼──────────────►│                 │                │
  │                   │                │  ProductDetail│               │                 │                │
  │                   │                │               │               │                 │                │
  │                   │                │               │               ├─ useParams() ───┤                │
  │                   │                │               │               │  { slug }       │                │
  │                   │                │               │               │                 │                │
  │                   │                │               │               ├─ getProductBy ─►│                │
  │                   │                │               │               │   Slug(slug)    │                │
  │                   │                │               │               │                 │                │
  │                   │                │               │               │                 ├─ search in ───►│
  │                   │                │               │               │                 │   products[]   │
  │                   │                │               │               │                 │                │
  │                   │                │               │               │◄── product ────┤                │
  │                   │                │               │               │    or undefined │                │
  │                   │                │               │               │                 │                │
  │                   │                │               │               ├─ useState(0) ───┤                │
  │                   │                │               │               │  [selectedImage]│                │
  │                   │                │               │               │                 │                │
  │◄──────────────────┼────────────────┼───────────────┼───────────────┤                 │                │
  │    render page    │                │               │               │                 │                │
  │    with:          │                │               │               │                 │                │
  │    - Gallery      │                │               │               │                 │                │
  │    - Title/Desc   │                │               │               │                 │                │
  │    - Features     │                │               │               │                 │                │
  │    - Specs Grid   │                │               │               │                 │                │
  │                   │                │               │               │                 │                │

ALT: Product not found
  │◄──────────────────┼────────────────┼───────────────┼───────────────┤                 │                │
  │    render "Not    │                │               │               │                 │                │
  │    found" page    │                │               │               │                 │                │
```

**Passos:**
1. Cliente clica no ProductCard
2. ProductCard aciona navegação via React Router para `/produto/:slug`
3. Router detecta mudança de localização
4. ScrollToTop intercepta e executa `window.scrollTo(0, 0)`
5. Router renderiza ProductDetail com novo slug
6. ProductDetail extrai slug dos params da URL
7. ProductDetail chama `getProductBySlug(slug)` do ProductService
8. ProductService busca no array de produtos
9. ProductService retorna produto ou undefined
10. **SE produto encontrado:** ProductDetail renderiza página completa
11. **SE produto NÃO encontrado:** ProductDetail renderiza mensagem de erro

**Timing:** ~50-100ms (renderização React + scroll)

---

## Sequência 2: Pesquisar e Filtrar Produtos

**Descrição:** Fluxo de pesquisa em tempo real com aplicação de filtros múltiplos.

**Atores:** Cliente

**Componentes:** ProductsPage → useMemo → ProductService → ProductCard[]

```
Cliente         ProductsPage     useMemo Hook    ProductService       Browser
  │                   │                │                │                │
  ├─ type "IP67" ────►│                │                │                │
  │   in search       │                │                │                │
  │                   │                │                │                │
  │                   ├─ setSearch ───►│                │                │
  │                   │  Query("IP67") │                │                │
  │                   │                │                │                │
  │                   │◄── trigger ────┤                │                │
  │                   │   re-compute   │                │                │
  │                   │                │                │                │
  │                   ├─ compute ─────►│                │                │
  │                   │  filtered      │                │                │
  │                   │  products      │                │                │
  │                   │                │                │                │
  │                   │                ├─ filter by ───►│                │
  │                   │                │  searchQuery   │                │
  │                   │                │                │                │
  │                   │                │                ├─ products ────►│
  │                   │                │                │  .filter(p =>  │
  │                   │                │                │   p.title      │
  │                   │                │                │   .includes())  │
  │                   │                │                │                │
  │                   │                │◄── filtered ───┤                │
  │                   │                │   products[]   │                │
  │                   │                │                │                │
  │                   │◄── memoized ───┤                │                │
  │                   │   result       │                │                │
  │                   │                │                │                │
  │◄── re-render ─────┤                │                │                │
  │    with 2 products│                │                │                │
  │    + filter tags  │                │                │                │
  │                   │                │                │                │
  ├─ select "IP67" ──►│                │                │                │
  │   in IP filter    │                │                │                │
  │                   │                │                │                │
  │                   ├─ setSelected ─►│                │                │
  │                   │  IP("IP67")    │                │                │
  │                   │                │                │                │
  │                   │◄── trigger ────┤                │                │
  │                   │                │                │                │
  │                   ├─ compute ─────►│                │                │
  │                   │                │                │                │
  │                   │                ├─ filter by ───►│                │
  │                   │                │  searchQuery   │                │
  │                   │                │  AND category  │                │
  │                   │                │  AND IP        │                │
  │                   │                │                │                │
  │                   │                │                ├─ multi-step ──►│
  │                   │                │                │  filtering     │
  │                   │                │                │                │
  │                   │                │◄── filtered ───┤                │
  │                   │                │                │                │
  │                   │                ├─ sort by ─────►│                │
  │                   │                │  sortBy        │                │
  │                   │                │                │                │
  │                   │                │◄── sorted ─────┤                │
  │                   │                │                │                │
  │                   │◄── memoized ───┤                │                │
  │                   │                │                │                │
  │◄── re-render ─────┤                │                │                │
  │    with updated   │                │                │                │
  │    product list   │                │                │                │
  │                   │                │                │                │
```

**Passos - Pesquisa:**
1. Cliente digita texto no campo de busca
2. ProductsPage atualiza estado `searchQuery` via `setSearchQuery()`
3. Hook `useMemo` detecta mudança em dependências
4. useMemo executa função de filtragem
5. Sistema filtra produtos (título, descrição, shortDescription)
6. useMemo armazena resultado em cache
7. ProductsPage re-renderiza com produtos filtrados
8. Cliente vê resultados em tempo real

**Passos - Filtro Adicional:**
1. Cliente seleciona grau de proteção "IP67"
2. ProductsPage atualiza `selectedIP`
3. useMemo re-executa (nova dependência)
4. Sistema aplica TODOS os filtros em sequência:
   - Filtro de pesquisa (searchQuery)
   - Filtro de categoria (selectedCategory)
   - Filtro de IP (selectedIP)
5. Sistema ordena resultados conforme `sortBy`
6. useMemo retorna lista final
7. ProductsPage re-renderiza
8. Sistema exibe contador atualizado e filter tags

**Otimização:** useMemo evita re-filtragem desnecessária quando outros estados mudam (ex: showFilters)

**Timing:** ~10-50ms (filtragem em memória, instantânea para usuário)

---

## Sequência 3: Alternar Imagem na Galeria

**Descrição:** Interação com galeria de imagens do produto.

**Atores:** Cliente

**Componentes:** ProductDetail

```
Cliente         ProductDetail      React State        Browser
  │                   │                   │                │
  │                   │  initial render   │                │
  │                   ├─ useState(0) ────►│                │
  │                   │  [selectedImage]  │                │
  │                   │                   │                │
  │◄── render ────────┤                   │                │
  │    image[0] as    │                   │                │
  │    main + 3       │                   │                │
  │    thumbnails     │                   │                │
  │                   │                   │                │
  ├─ click ──────────►│                   │                │
  │   thumbnail #2    │                   │                │
  │                   │                   │                │
  │                   ├─ onClick() ───────┤                │
  │                   │  setSelected      │                │
  │                   │  Image(2)         │                │
  │                   │                   │                │
  │                   │◄── state update ──┤                │
  │                   │   selectedImage=2 │                │
  │                   │                   │                │
  │                   ├─ re-render ───────┼───────────────►│
  │                   │  with new image   │                │
  │                   │                   │                │
  │◄──────────────────┤                   │                │
  │    main image =   │                   │                │
  │    images[2]      │                   │                │
  │    thumbnail #2   │                   │                │
  │    highlighted    │                   │                │
  │    (red border)   │                   │                │
  │                   │                   │                │
```

**Passos:**
1. ProductDetail renderiza com `selectedImage = 0` (padrão)
2. Sistema exibe primeira imagem como principal
3. Sistema renderiza miniaturas (se `product.images.length > 1`)
4. Cliente clica em thumbnail com índice 2
5. Handler `onClick` chama `setSelectedImage(2)`
6. React atualiza estado
7. Componente re-renderiza
8. Sistema atualiza:
   - Imagem principal: `product.images[2]`
   - Borda da miniatura #2: `border-[#8B1E1E]` (vermelha)
   - Outras miniaturas: `border-neutral-200` (cinza)

**Timing:** ~16ms (1 frame de animação)

---

## Sequência 4: Solicitar Orçamento (Cross-Page Navigation)

**Descrição:** Navegação de página de produto para seção de contato na home.

**Atores:** Cliente

**Componentes:** ProductDetail → React Router → Home → Browser

```
Cliente       ProductDetail    Router (useNavigate)    Home      Browser (window)
  │                 │                   │                 │              │
  ├─ click ────────►│                   │                 │              │
  │  "Solicitar     │                   │                 │              │
  │   Orçamento"    │                   │                 │              │
  │                 │                   │                 │              │
  │                 ├─ navigate('/') ──►│                 │              │
  │                 │                   │                 │              │
  │                 │                   ├─ route to / ───►│              │
  │                 │                   │                 │              │
  │                 │                   │                 ├─ render ────►│
  │                 │                   │                 │  Home page   │
  │                 │                   │                 │              │
  │                 ├─ setTimeout ──────┼─────────────────┼─────────────►│
  │                 │  (100ms)          │                 │              │
  │                 │                   │                 │              │
  │                 │  ┌─ wait 100ms ──┐                 │              │
  │                 │  └───────────────┘                 │              │
  │                 │                   │                 │              │
  │                 ├─ getElementById ──┼─────────────────┼─────────────►│
  │                 │  ('contato')      │                 │              │
  │                 │                   │                 │              │
  │                 │◄── element ───────┼─────────────────┼──────────────┤
  │                 │   reference       │                 │              │
  │                 │                   │                 │              │
  │                 ├─ getBounding ─────┼─────────────────┼─────────────►│
  │                 │  ClientRect()     │                 │              │
  │                 │                   │                 │              │
  │                 │◄── position ──────┼─────────────────┼──────────────┤
  │                 │                   │                 │              │
  │                 ├─ calculate ───────┤                 │              │
  │                 │  offset (top - 80)│                 │              │
  │                 │                   │                 │              │
  │                 ├─ window.scrollTo ─┼─────────────────┼─────────────►│
  │                 │  ({ top, smooth })│                 │              │
  │                 │                   │                 │              │
  │                 │                   │                 │   ┌───────┐ │
  │                 │                   │                 │   │smooth │ │
  │                 │                   │                 │   │scroll │ │
  │                 │                   │                 │   └───────┘ │
  │                 │                   │                 │              │
  │◄────────────────┼───────────────────┼─────────────────┼──────────────┤
  │   viewing       │                   │                 │              │
  │   contact form  │                   │                 │              │
  │   in Home page  │                   │                 │              │
  │                 │                   │                 │              │
```

**Passos:**
1. Cliente clica em "Solicitar Orçamento" (ProductDetail)
2. Handler `scrollToContact()` é chamado
3. Executa `navigate('/')` (React Router)
4. Sistema navega para home
5. ScrollToTop rola para topo (automático)
6. Home é renderizada
7. ProductDetail executa `setTimeout(100ms)` para garantir renderização
8. Após 100ms:
   a. Busca elemento com id `contato`
   b. Obtém posição via `getBoundingClientRect()`
   c. Calcula offset (-80px para compensar header fixo)
   d. Executa `window.scrollTo()` com smooth behavior
9. Página rola suavemente até seção de contato

**Timing:** 
- Navegação: ~50ms
- Delay: 100ms (garantir DOM)
- Scroll suave: ~300-500ms (dependendo da distância)

**Nota:** Delay de 100ms é necessário para garantir que a seção #contato já esteja renderizada no DOM antes da tentativa de scroll.

---

## Sequência 5: Iniciar Aplicação (Bootstrap)

**Descrição:** Inicialização completa da aplicação React.

**Atores:** Sistema

**Componentes:** index.tsx → App → BrowserRouter → Initial Route

```
Browser           index.tsx         React        BrowserRouter      App         ScrollToTop     Header/Footer    Home
  │                   │                │                │             │               │                │            │
  ├─ load page ──────►│                │                │             │               │                │            │
  │                   │                │                │             │               │                │            │
  │                   ├─ import React ►│                │             │               │                │            │
  │                   │                │                │             │               │                │            │
  │                   ├─ import App ───┼────────────────┼────────────►│               │                │            │
  │                   │                │                │             │               │                │            │
  │                   ├─ ReactDOM ─────►│                │             │               │                │            │
  │                   │  .createRoot() │                │             │               │                │            │
  │                   │                │                │             │               │                │            │
  │                   ├─ root.render ──►│                │             │               │                │            │
  │                   │  (<App />)     │                │             │               │                │            │
  │                   │                │                │             │               │                │            │
  │                   │                ├─ mount ────────┼────────────►│               │                │            │
  │                   │                │  App           │             │               │                │            │
  │                   │                │                │             │               │                │            │
  │                   │                │                │             ├─ setup ───────►│                │            │
  │                   │                │                │             │  BrowserRouter│                │            │
  │                   │                │                │             │               │                │            │
  │                   │                │                │             │◄── router ────┤                │            │
  │                   │                │                │             │   context     │                │            │
  │                   │                │                │             │               │                │            │
  │                   │                │                │             ├─ mount ───────┼───────────────►│            │
  │                   │                │                │             │  ScrollToTop  │                │            │
  │                   │                │                │             │               │                │            │
  │                   │                │                │             │               ├─ useLocation ──┤            │
  │                   │                │                │             │               │  hook setup    │            │
  │                   │                │                │             │               │                │            │
  │                   │                │                │             ├─ mount ───────┼───────────────►│            │
  │                   │                │                │             │  Header       │                │            │
  │                   │                │                │             │               │                │            │
  │                   │                │                │             ├─ mount ───────┼───────────────►│            │
  │                   │                │                │             │  Footer       │                │            │
  │                   │                │                │             │               │                │            │
  │                   │                │                │             ├─ resolve ─────┼────────────────┼───────────►│
  │                   │                │                │             │  route '/'    │                │            │
  │                   │                │                │             │               │                │            │
  │                   │                │                │             │               │                │            ├─ mount
  │                   │                │                │             │               │                │            │  sub-
  │                   │                │                │             │               │                │            │  components:
  │                   │                │                │             │               │                │            │  Hero
  │                   │                │                │             │               │                │            │  Features
  │                   │                │                │             │               │                │            │  Products
  │                   │                │                │             │               │                │            │  Partners
  │                   │                │                │             │               │                │            │  CTA
  │                   │                │                │             │               │                │            │
  │◄──────────────────┼────────────────┼────────────────┼─────────────┼───────────────┼────────────────┼────────────┤
  │   Fully rendered home page                                                                                      │
  │                   │                │                │             │               │                │            │
```

**Passos:**
1. Browser carrega HTML com `<div id="root">`
2. Vite injeta bundle JavaScript
3. index.tsx executa
4. Importa React e App component
5. Cria root do React: `ReactDOM.createRoot()`
6. Renderiza `<App />` no root
7. App monta e inicializa:
   a. BrowserRouter (contexto de roteamento)
   b. ScrollToTop (listener de mudanças de rota)
   c. Header (layout fixo)
   d. Footer (layout fixo)
   e. WhatsAppButton (botão flutuante)
8. Router resolve rota atual (`/`)
9. Router monta componente `<Home />`
10. Home monta seus subcomponentes:
    - Hero
    - Features
    - Products (carrega produtos do ProductService)
    - Partners
    - CTA
11. Todos os componentes renderizam
12. Página completa é exibida

**Timing:** ~200-500ms (primeira carga com assets)

---

## Notas de Implementação

### Tecnologias Envolvidas:
- **React 18+**: Rendering engine
- **React Router v6**: Navegação SPA
- **Motion (Framer Motion)**: Animações
- **TypeScript**: Type safety
- **Vite**: Build tool e dev server

### Padrões de Comunicação:
- **Props drilling**: Dados passados de pai para filho
- **Hooks**: useState, useEffect, useMemo, useParams, useLocation, useNavigate
- **Context API**: Fornecido pelo BrowserRouter (routing context)

### Performance:
- **useMemo**: Otimiza filtragem/ordenação (evita re-computação)
- **Code splitting**: Possível implementação futura com React.lazy()
- **Image optimization**: URLs Unsplash otimizadas

### Tratamento de Erros:
- **Produto não encontrado**: Renderização condicional
- **Navegação inválida**: Router gerencia automaticamente
- **Imagens quebradas**: Fallback via ImageWithFallback (se usado)
