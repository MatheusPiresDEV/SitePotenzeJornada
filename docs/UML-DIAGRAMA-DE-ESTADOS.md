# Diagramas de Estados - Sistema Potenze

Este documento apresenta os diagramas de estados para os principais fluxos do sistema, modelando o ciclo de vida e transições de estados.

---

## Diagrama 1: Estados da Navegação (Application State)

**Descrição:** Estados principais da aplicação conforme o usuário navega entre páginas.

```
                    ┌─────────────────┐
                    │   [INITIAL]     │
                    │   Loading App   │
                    └────────┬────────┘
                             │
                             │ DOM ready
                             │ React mounts
                             ▼
                    ┌─────────────────┐
         ┌─────────►│      HOME       │◄──────────────┐
         │          │   Viewing home  │               │
         │          │     page with   │               │
         │          │    products     │               │
         │          └────────┬────────┘               │
         │                   │                        │
         │                   │ click "Ver Catálogo"   │
         │                   │ or menu "Produtos"     │
         │                   ▼                        │
         │          ┌─────────────────┐               │
         │          │  CATALOG_PAGE   │               │
         │          │   Browsing all  │               │
         │          │    products     │               │
         │          │  with filters   │               │
         │          └────────┬────────┘               │
         │                   │                        │
         │                   │ click product card     │
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
         │  click "Voltar"                            
         │  or logo                                   
         └────────────────────────────────────────────

STATE DETAILS:

HOME:
- Entry: Initial route or navigation from other pages
- Actions: 
  * Render Hero, Features, Products, Partners, CTA
  * Load products from ProductService
  * Scroll animations trigger
- Exit: User clicks navigation link
- Sub-states: None

CATALOG_PAGE:
- Entry: Navigate to /produtos
- Actions:
  * Display all products in grid
  * Initialize filters (all = 'all', sortBy = 'name-asc')
  * Enable search/filter controls
- Exit: User clicks product or back button
- Sub-states: FILTERING (see Diagram 3)

PRODUCT_DETAIL:
- Entry: Navigate to /produto/:slug
- Actions:
  * Fetch product by slug
  * Initialize selectedImage = 0
  * Render gallery, specs, features
- Exit: User navigates away
- Sub-states: GALLERY_INTERACTION (see Diagram 2)
```

**Transições:**
- `HOME → CATALOG_PAGE`: Click "Ver Catálogo Completo" or menu link
- `HOME → PRODUCT_DETAIL`: Click product card in featured section
- `CATALOG_PAGE → PRODUCT_DETAIL`: Click product card in grid
- `PRODUCT_DETAIL → HOME`: Click "Voltar" or logo
- `PRODUCT_DETAIL → HOME (scrolled)`: Click "Solicitar Orçamento" (with scroll to #contato)
- `CATALOG_PAGE → HOME`: Click "Voltar" or logo
- `* → HOME`: Click logo (from any page)

**Eventos Globais (qualquer estado):**
- Click WhatsApp button: Opens WhatsApp (não muda estado)
- Scroll: Triggers header style change (não muda estado)
- Mobile menu toggle: Opens/closes menu (não muda estado)

---

## Diagrama 2: Estados da Galeria de Imagens

**Descrição:** Estados da interação com galeria de imagens na página de produto.

```
                         ┌──────────────────┐
                         │    [INITIAL]     │
                         │  Gallery Loading │
                         └─────────┬────────┘
                                   │
                                   │ product.images.length > 0
                                   ▼
                         ┌──────────────────┐
                    ┌───►│   FIRST_IMAGE    │
                    │    │  selectedImage=0 │
                    │    │  Display images  │
                    │    │      [0]         │
                    │    └─────────┬────────┘
                    │              │
                    │              │ click thumbnail #1
                    │              ▼
                    │    ┌──────────────────┐
                    │    │  SECOND_IMAGE    │
                    │    │  selectedImage=1 │
                    │    │  Display images  │
                    │    │      [1]         │
                    │    └─────────┬────────┘
                    │              │
                    │              │ click thumbnail #2
                    │              ▼
                    │    ┌──────────────────┐
                    │    │   THIRD_IMAGE    │
                    │    │  selectedImage=2 │
                    │    │  Display images  │
                    │    │      [2]         │
                    │    └─────────┬────────┘
                    │              │
                    │              │ click any thumbnail
                    │              ▼
                    └────────── [loop]


ALT STATE:
                         ┌──────────────────┐
                         │  SINGLE_IMAGE    │
                         │  No thumbnails   │
                         │  Only main image │
                         └──────────────────┘
                    (if product.images.length === 1)

STATE DETAILS:

FIRST_IMAGE (default):
- Entry: Component mounts or thumbnail #0 clicked
- State: selectedImage = 0
- Display: 
  * Main image = product.images[0]
  * Thumbnail #0 highlighted (border-[#8B1E1E])
  * Other thumbnails normal (border-neutral-200)
- Actions: Display image, highlight thumbnail

SECOND_IMAGE:
- Entry: User clicks thumbnail #1
- State: selectedImage = 1
- Display:
  * Main image = product.images[1]
  * Thumbnail #1 highlighted
- Actions: Update main image, update borders

THIRD_IMAGE:
- Entry: User clicks thumbnail #2
- State: selectedImage = 2
- Display:
  * Main image = product.images[2]
  * Thumbnail #2 highlighted
- Actions: Update main image, update borders

SINGLE_IMAGE (alternate):
- Entry: product has only 1 image
- Condition: product.images.length === 1
- Display: Only main image, no thumbnails rendered
- Actions: Static display (no interaction)
```

**Transições:**
- `* → FIRST_IMAGE`: Click thumbnail index 0
- `* → SECOND_IMAGE`: Click thumbnail index 1
- `* → THIRD_IMAGE`: Click thumbnail index 2
- `* → IMAGE[n]`: Click thumbnail index n

**Invariante:** 
- `0 <= selectedImage < product.images.length`
- Sempre há exatamente 1 imagem selecionada

---

## Diagrama 3: Estados do Sistema de Filtragem

**Descrição:** Estados do catálogo conforme filtros são aplicados/removidos.

```
                         ┌──────────────────┐
                         │    [INITIAL]     │
                         │  Catalog Loading │
                         └─────────┬────────┘
                                   │
                                   │ Mount ProductsPage
                                   ▼
                         ┌──────────────────┐
                    ┌───►│   NO_FILTERS     │◄───────┐
                    │    │  All products    │        │
                    │    │  shown (8 items) │        │
                    │    │  Default sort    │        │
                    │    └─────────┬────────┘        │
                    │              │                 │
                    │              │ type in search  │
                    │              ▼                 │
                    │    ┌──────────────────┐        │
                    │    │  SEARCH_ACTIVE   │        │
                    │    │  Filter by text  │        │
                    │    │  in title/desc   │        │
                    │    └─────────┬────────┘        │
                    │              │                 │
                    │              │ select category │
                    │              ▼                 │
                    │    ┌──────────────────┐        │
                    │    │ CATEGORY_FILTER  │        │
                    │    │  Filter by       │        │
                    │    │  category only   │        │
                    │    └─────────┬────────┘        │
                    │              │                 │
                    │              │ add IP filter   │
                    │              ▼                 │
                    │    ┌──────────────────┐        │
                    │    │  MULTI_FILTER    │        │
                    │    │  Multiple filters│        │
                    │    │  active (AND)    │        │
                    │    └─────────┬────────┘        │
                    │              │                 │
                    │              │ change sort     │
                    │              ▼                 │
                    │    ┌──────────────────┐        │
                    │    │ FILTERED_SORTED  │        │
                    │    │  Filters + sort  │        │
                    │    │  applied         │        │
                    │    └─────────┬────────┘        │
                    │              │                 │
                    │              │ results = 0     │
                    │              ▼                 │
                    │    ┌──────────────────┐        │
                    │    │   NO_RESULTS     │        │
                    │    │  Empty state     │        │
                    │    │  shown           │        │
                    │    └─────────┬────────┘        │
                    │              │                 │
                    │              │ click "Limpar   │
                    │              │ Filtros"        │
                    └──────────────┴─────────────────┘


STATE DETAILS:

NO_FILTERS:
- Entry: Initial load or after reset
- State:
  * searchQuery = ""
  * selectedCategory = "all"
  * selectedIP = "all"
  * sortBy = "name-asc"
- Display: All 8 products in alphabetical order
- Actions: Render full grid, show total count

SEARCH_ACTIVE:
- Entry: User types in search field
- State: searchQuery !== ""
- Display: Products matching search term
- Actions: 
  * Real-time filtering
  * Show search tag
  * Update counter
- Transition: Immediate (no debounce, useMemo handles perf)

CATEGORY_FILTER:
- Entry: User selects category dropdown
- State: selectedCategory !== "all"
- Display: Products of selected category
- Actions:
  * Filter by category
  * Show category tag
  * Update counter

MULTI_FILTER:
- Entry: Multiple filters active
- State: 
  * (searchQuery !== "" OR selectedCategory !== "all" OR selectedIP !== "all")
  * AND count of active filters >= 2
- Display: Products matching ALL filters (AND logic)
- Actions:
  * Apply filters in sequence
  * Show multiple filter tags
  * Update counter
- Logic: `filtered.filter(searchFn).filter(categoryFn).filter(ipFn)`

FILTERED_SORTED:
- Entry: Any filter active + sort changed
- State: 
  * At least 1 filter active
  * sortBy changed from default
- Display: Filtered products in specified order
- Actions:
  * Apply filters
  * Apply sorting
  * Show filter tags
- Sort options: name-asc, name-desc, category

NO_RESULTS:
- Entry: filteredProducts.length === 0
- State: Active filters but no matches
- Display:
  * Empty state icon
  * "Nenhum produto encontrado"
  * "Limpar todos os filtros" button
- Actions: Offer reset option
```

**Transições:**
- `NO_FILTERS → SEARCH_ACTIVE`: User types in search
- `NO_FILTERS → CATEGORY_FILTER`: User selects category
- `* → MULTI_FILTER`: Second filter added
- `* → FILTERED_SORTED`: Sort option changed
- `* → NO_RESULTS`: Filtering yields empty array
- `* → NO_FILTERS`: Click "Limpar Filtros" or clear all individual filters

**Propriedades:**
- **Real-time**: Transitions instantâneas (useMemo)
- **Reversible**: Todos os estados podem retornar a NO_FILTERS
- **Combinable**: Filtros são cumulativos (AND logic)

---

## Diagrama 4: Estados do Mobile Menu

**Descrição:** Estados do menu de navegação mobile (Header component).

```
                         ┌──────────────────┐
                         │    [INITIAL]     │
                         │   Menu Closed    │
                         └─────────┬────────┘
                                   │
                                   │ Component mounts
                                   ▼
                         ┌──────────────────┐
                    ┌───►│     CLOSED       │
                    │    │ Menu invisible   │
                    │    │ Hamburger icon   │
                    │    │    shown         │◄───┐
                    │    └─────────┬────────┘    │
                    │              │             │
                    │              │ click       │
                    │              │ hamburger   │
                    │              ▼             │
                    │    ┌──────────────────┐    │
                    │    │      OPEN        │    │
                    │    │  Menu visible    │    │
                    │    │  Overlay active  │    │
                    │    └─────────┬────────┘    │
                    │              │             │
                    │              │ click       │
                    │              │ close or    │
                    │              │ nav link    │
                    │              └─────────────┘
                    │
                    │ screen resize
                    │ to desktop
                    └──────────────────────────────
                         (auto-close)

STATE DETAILS:

CLOSED:
- Entry: Component mounts or user closes menu
- State: isMobileMenuOpen = false
- Display:
  * Hamburger icon visible (mobile/tablet only)
  * Navigation hidden (mobile/tablet)
  * Desktop nav always visible
- Actions: Wait for user interaction
- Styles: Menu off-screen or hidden

OPEN:
- Entry: User clicks hamburger icon
- State: isMobileMenuOpen = true
- Display:
  * Close (X) icon shown
  * Navigation menu slides in
  * Overlay/backdrop visible
  * Body scroll locked (optional)
- Actions: 
  * Animate menu entrance
  * Enable links
  * Focus management
- Styles: Menu on-screen, z-index elevated
```

**Transições:**
- `CLOSED → OPEN`: Click hamburger icon
- `OPEN → CLOSED`: Click close icon
- `OPEN → CLOSED`: Click navigation link (and navigate)
- `OPEN → CLOSED`: Click overlay/backdrop
- `OPEN → CLOSED`: Resize window to desktop breakpoint
- `OPEN → CLOSED`: Press ESC key (if implemented)

**Viewport Dependencies:**
- **Mobile (<768px)**: State machine active
- **Desktop (≥768px)**: State machine bypassed (nav always visible)

---

## Diagrama 5: Estados do Scroll Behavior

**Descrição:** Estados visuais do Header baseados em posição do scroll.

```
                         ┌──────────────────┐
                         │    [INITIAL]     │
                         │  Page Loading    │
                         └─────────┬────────┘
                                   │
                                   │ Page mounts
                                   ▼
                         ┌──────────────────┐
                    ┌───►│   AT_TOP         │
                    │    │  scrollY = 0     │
                    │    │  Transparent or  │
                    │    │  default style   │
                    │    └─────────┬────────┘
                    │              │
                    │              │ scroll down
                    │              │ (scrollY > threshold)
                    │              ▼
                    │    ┌──────────────────┐
                    │    │   SCROLLED       │
                    │    │  scrollY > 50    │
                    │    │  Solid bg        │
                    │    │  Shadow added    │
                    │    └─────────┬────────┘
                    │              │
                    │              │ scroll up
                    │              │ (scrollY <= threshold)
                    └──────────────┘


STATE DETAILS:

AT_TOP:
- Entry: Page load or scroll to top
- Condition: window.scrollY <= 50
- State: isScrolled = false
- Styles:
  * Background: transparent or subtle
  * Shadow: none or minimal
  * Padding: larger (optional)
- Actions: Default header appearance

SCROLLED:
- Entry: User scrolls down past threshold
- Condition: window.scrollY > 50
- State: isScrolled = true
- Styles:
  * Background: solid white (bg-white)
  * Shadow: shadow-md or shadow-lg
  * Border: border-b (subtle)
  * Padding: compact (optional)
- Actions: Enhanced visibility on scroll
- Z-index: Elevated (z-40 or z-50)
```

**Transições:**
- `AT_TOP → SCROLLED`: window.scrollY > 50
- `SCROLLED → AT_TOP`: window.scrollY <= 50

**Implementation:**
- Event: `window.addEventListener('scroll', handleScroll)`
- Debounce: Optional (RequestAnimationFrame)
- Threshold: 50px (customizable)

---

## Diagrama 6: Estados do WhatsApp Button

**Descrição:** Estados do botão flutuante de WhatsApp.

```
                         ┌──────────────────┐
                         │    [INITIAL]     │
                         │  Button Hidden   │
                         └─────────┬────────┘
                                   │
                                   │ Component mounts
                                   │ + animation delay
                                   ▼
                         ┌──────────────────┐
                    ┌───►│     VISIBLE      │
                    │    │  Button shown    │
                    │    │  Bottom-right    │
                    │    │  Idle state      │◄───┐
                    │    └─────────┬────────┘    │
                    │              │             │
                    │              │ hover       │
                    │              ▼             │
                    │    ┌──────────────────┐    │
                    │    │     HOVERED      │    │
                    │    │  Scale up 1.1    │    │
                    │    │  Pulse effect    │────┘
                    │    └─────────┬────────┘
                    │              │
                    │              │ click
                    │              ▼
                    │    ┌──────────────────┐
                    │    │    CLICKED       │
                    │    │  Opens WhatsApp  │
                    │    │  (new tab/app)   │
                    │    └─────────┬────────┘
                    │              │
                    │              │ (returns to VISIBLE
                    │              │  after external action)
                    └──────────────┘


STATE DETAILS:

VISIBLE:
- Entry: Component mounts (after entrance animation)
- Display:
  * Fixed position (bottom-right)
  * WhatsApp icon + green background
  * z-index: 50
  * Initial scale: 1
- Actions: Wait for interaction

HOVERED:
- Entry: Mouse enters button
- Display:
  * Scale: 1.1 (transform: scale(1.1))
  * Shadow: Enhanced
  * Cursor: pointer
  * Optional pulse animation
- Actions: Visual feedback
- Exit: Mouse leaves

CLICKED:
- Entry: User clicks button
- Actions:
  * Generate WhatsApp URL
  * window.open(url, '_blank')
  * Open WhatsApp Web or native app
- Display: Button remains visible (no state change in UI)
- Effect: External navigation
```

**Transições:**
- `INITIAL → VISIBLE`: After mount + animation delay (~500ms)
- `VISIBLE → HOVERED`: Mouse enter
- `HOVERED → VISIBLE`: Mouse leave
- `* → CLICKED`: Click event (then returns to VISIBLE)

**Persistent:** Button permanece visível em todas as páginas (layout global)

---

## Notas Gerais sobre Estados

### Características dos Diagramas:

1. **Máquinas de Estados Finitos:**
   - Cada diagrama representa um FSM (Finite State Machine)
   - Estados bem definidos e mutuamente exclusivos
   - Transições determinísticas

2. **Composição:**
   - Estados podem conter sub-estados (ex: CATALOG_PAGE contém FILTERING)
   - Hierarquia de estados permite modelagem complexa

3. **Concorrência:**
   - Múltiplos diagramas ativos simultaneamente
   - Exemplo: Navigation state + Mobile Menu state + Scroll state

4. **Persistência:**
   - Estados não persistem entre reloads (exceto URL via React Router)
   - Todos os estados retornam ao INITIAL em refresh

### Tecnologias de Implementação:

- **React useState**: Para estados locais (selectedImage, isMenuOpen)
- **React Router**: Para estados de navegação (location)
- **URL params**: Para estado do produto atual (slug)
- **Query params**: Potencial futuro para filtros (ex: ?category=industrial)
- **Local Storage**: Não utilizado atualmente

### Padrões Observados:

1. **Estado Default Sempre Definido:**
   - Todos os estados têm um default claro
   - Exemplo: selectedImage = 0, filters = 'all'

2. **Transições Reversíveis:**
   - Usuário sempre pode voltar ao estado anterior
   - Botões "Voltar", "Limpar Filtros", etc.

3. **Feedback Visual:**
   - Toda transição tem feedback visual
   - Animações, highlights, loading states

4. **Responsividade:**
   - Estados podem ter comportamentos diferentes por viewport
   - Exemplo: Mobile menu só existe em mobile

### Possíveis Extensões Futuras:

- **Loading States**: Para chamadas API (não implementado)
- **Error States**: Para tratamento de erros (parcialmente implementado)
- **Authentication States**: Login/logout (não aplicável)
- **Shopping Cart**: Estados de carrinho de compras (não implementado)
