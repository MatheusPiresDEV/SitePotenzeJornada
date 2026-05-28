# Diagrama de Casos de Uso - Sistema Potenze

## Atores

### 1. Cliente (Visitante)
Usuário que acessa o site para visualizar produtos e informações da empresa.

### 2. Cliente Interessado
Usuário que busca orçamento ou informações detalhadas sobre produtos específicos.

---

## Casos de Uso

### UC-01: Visualizar Home
**Ator:** Cliente  
**Descrição:** Visualizar a página inicial com informações da empresa, destaques e chamadas para ação.  
**Fluxo Principal:**
1. Cliente acessa o site
2. Sistema exibe Hero com título e CTA
3. Sistema exibe seção Features
4. Sistema exibe produtos em destaque
5. Sistema exibe parceiros
6. Sistema exibe footer com informações de contato

**Fluxo Alternativo:** 
- Cliente clica no botão WhatsApp flutuante

---

### UC-02: Navegar pelo Catálogo
**Ator:** Cliente  
**Descrição:** Acessar página de catálogo completo com todos os produtos.  
**Fluxo Principal:**
1. Cliente clica em "Ver Catálogo Completo" ou menu "Produtos"
2. Sistema redireciona para `/produtos`
3. Sistema rola a página para o topo
4. Sistema exibe grid com todos os produtos (8 produtos)
5. Cliente visualiza cards com imagem, título e descrição breve

**Pré-condição:** Nenhuma  
**Pós-condição:** Lista de produtos é exibida

---

### UC-03: Pesquisar Produtos
**Ator:** Cliente  
**Descrição:** Buscar produtos por texto em tempo real.  
**Fluxo Principal:**
1. Cliente acessa página de catálogo
2. Cliente digita termo de busca no campo de pesquisa
3. Sistema filtra produtos em tempo real (título, descrição, shortDescription)
4. Sistema atualiza contador de resultados
5. Sistema exibe apenas produtos que correspondem à busca

**Fluxo Alternativo A - Sem resultados:**
1. Sistema exibe mensagem "Nenhum produto encontrado"
2. Sistema oferece opção "Limpar todos os filtros"

**Extensão:** UC-04 (Filtrar Produtos)

---

### UC-04: Filtrar Produtos
**Ator:** Cliente  
**Descrição:** Aplicar filtros de categoria, grau de proteção IP e ordenação.  
**Fluxo Principal:**
1. Cliente acessa página de catálogo
2. Cliente seleciona filtro de categoria (Industrial, Comercial, etc.)
3. Sistema filtra produtos pela categoria selecionada
4. Cliente seleciona grau de proteção IP (IP20, IP40, IP56, IP65, IP67)
5. Sistema filtra produtos pelo IP selecionado
6. Cliente seleciona ordenação (Nome A-Z, Nome Z-A, Categoria)
7. Sistema reordena lista de produtos
8. Sistema exibe tags dos filtros ativos
9. Sistema atualiza contador de resultados

**Fluxo Alternativo A - Limpar Filtros:**
1. Cliente clica em "Limpar Filtros"
2. Sistema remove todos os filtros e pesquisa
3. Sistema restaura visualização padrão (ordenado por nome A-Z)

**Fluxo Alternativo B - Remover filtro individual:**
1. Cliente clica no "X" em uma tag de filtro ativo
2. Sistema remove apenas aquele filtro específico
3. Sistema mantém outros filtros ativos

**Extensão:** UC-03 (Pesquisar Produtos)

---

### UC-05: Visualizar Detalhes do Produto
**Ator:** Cliente  
**Descrição:** Acessar página individual com especificações completas do produto.  
**Fluxo Principal:**
1. Cliente clica em um card de produto
2. Sistema navega para `/produto/:slug`
3. Sistema rola página para o topo
4. Sistema busca produto pelo slug na URL
5. Sistema exibe galeria de imagens com miniatura
6. Sistema exibe título, categoria e descrição
7. Sistema exibe lista de características com checks verdes
8. Sistema exibe especificações técnicas em grid de cards (3 colunas)
9. Sistema mapeia ícones automaticamente para cada especificação
10. Sistema exibe CTAs (Solicitar Orçamento, Baixar Catálogo)

**Fluxo Alternativo A - Produto não encontrado:**
1. Sistema exibe mensagem "Produto não encontrado"
2. Sistema oferece link "Voltar para home"

**Pré-condição:** Produto existe no banco de dados  
**Pós-condição:** Detalhes do produto são exibidos

---

### UC-06: Alternar Imagem do Produto
**Ator:** Cliente  
**Descrição:** Navegar entre múltiplas imagens na galeria do produto.  
**Fluxo Principal:**
1. Cliente está na página de detalhes do produto
2. Sistema exibe imagem principal e miniaturas (se houver múltiplas imagens)
3. Cliente clica em uma miniatura
4. Sistema atualiza imagem principal
5. Sistema destaca miniatura selecionada (borda vermelha)

**Pré-condição:** Produto possui múltiplas imagens  
**Regra de Negócio:** Primeira imagem é selecionada por padrão

---

### UC-07: Solicitar Orçamento
**Ator:** Cliente Interessado  
**Descrição:** Navegar para seção de contato para solicitar orçamento.  
**Fluxo Principal:**
1. Cliente está na página de detalhes do produto
2. Cliente clica em "Solicitar Orçamento"
3. Sistema navega para home (/)
4. Sistema aguarda 100ms para garantir carregamento
5. Sistema rola suavemente até seção #contato (offset de 80px do header)

**Pós-condição:** Seção de contato é exibida

---

### UC-08: Baixar Catálogo
**Ator:** Cliente Interessado  
**Descrição:** Download de PDF com informações do produto.  
**Fluxo Principal:**
1. Cliente clica em "Baixar Catálogo"
2. Sistema inicia download do arquivo PDF
3. Sistema mantém usuário na mesma página

**Nota:** Funcionalidade preparada para integração futura

---

### UC-09: Entrar em Contato via WhatsApp
**Ator:** Cliente Interessado  
**Descrição:** Iniciar conversa no WhatsApp da empresa.  
**Fluxo Principal:**
1. Cliente clica no botão flutuante do WhatsApp (canto inferior direito)
2. Sistema abre WhatsApp Web/App com número da empresa
3. Sistema preenche mensagem padrão (se configurado)

**Disponibilidade:** Botão visível em todas as páginas  
**Posição:** Fixed, bottom-right, z-index alto

---

### UC-10: Entrar em Contato por Telefone
**Ator:** Cliente Interessado  
**Descrição:** Ligar para empresa via telefone.  
**Fluxo Principal:**
1. Cliente clica em link com número (41) 3273-9999
2. Sistema aciona app de telefone do dispositivo

---

### UC-11: Entrar em Contato por E-mail
**Ator:** Cliente Interessado  
**Descrição:** Enviar e-mail para empresa.  
**Fluxo Principal:**
1. Cliente clica em vendas@potenze.com.br
2. Sistema abre cliente de e-mail padrão

---

## Diagrama Visual

```
┌─────────────────┐
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
         │                   │
         │                   ◄───── «extends» UC-03
         │
         ├──────────► UC-05: Visualizar Detalhes do Produto
         │
         ├──────────► UC-06: Alternar Imagem do Produto
         │                   │
         │                   ◄───── «requires» UC-05
         │
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
         ├──────────► UC-09: Entrar em Contato via WhatsApp
         │
         ├──────────► UC-10: Entrar em Contato por Telefone
         │
         └──────────► UC-11: Entrar em Contato por E-mail
```

---

## Relacionamentos

- **«extends»**: Cliente Interessado estende Cliente (herança de comportamento)
- **«requires»**: UC-06 requer UC-05 (pré-requisito)
- **«includes»**: UC-03 e UC-04 se complementam (podem ser usados juntos)

---

## Requisitos Não-Funcionais Relacionados

- **RNF-01:** Tempo de resposta da pesquisa < 100ms (tempo real)
- **RNF-02:** Animações suaves (Motion/Framer Motion)
- **RNF-03:** ScrollToTop automático em mudanças de rota
- **RNF-04:** Design responsivo (mobile-first)
- **RNF-05:** Navegação SPA (React Router, sem recarregar página)
- **RNF-06:** Compatibilidade com navegadores modernos
