# Carrossel de Imagens - Nuxt 3

Um componente de carrossel moderno e responsivo desenvolvido com Nuxt 3, Vue 3, TypeScript e Tailwind CSS.

## 🚀 Características

- **Design Moderno**: Interface limpa inspirada na descrição fornecida
- **Totalmente Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Navegação Intuitiva**: Suporte a teclado, mouse e touch/swipe
- **Autoplay Configurável**: Reprodução automática com controles de pausa
- **Indicadores Visuais**: Pontos de navegação e barra de progresso
- **Animações Suaves**: Transições fluidas entre slides
- **Acessibilidade**: Suporte completo a navegação por teclado

## 🛠️ Tecnologias Utilizadas

- **Nuxt 3** - Framework Vue.js
- **Vue 3** - Framework JavaScript reativo
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Flowbite Vue** - Componentes UI
- **@nuxt/icon** - Ícones SVG
- **@nuxt/image** - Otimização de imagens

## 📦 Instalação

1. Instale as dependências:
```bash
pnpm install
```

2. Execute o servidor de desenvolvimento:
```bash
pnpm web
```

3. Acesse `http://localhost:3000` no seu navegador

## 🎯 Uso do Componente

### Exemplo Básico

```vue
<template>
  <ImageCarousel 
    :items="carouselItems"
    :autoplay="true"
    :autoplay-interval="4000"
  />
</template>

<script setup lang="ts">
const carouselItems = [
  {
    image: 'https://exemplo.com/imagem1.jpg',
    alt: 'Descrição da imagem',
    tag: 'CATEGORIA',
    title: 'Título do Slide',
    description: 'Descrição detalhada do conteúdo',
    actionLabel: 'AÇÃO'
  }
  // ... mais itens
]
</script>
```

### Props do Componente

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `items` | `CarouselItem[]` | - | Array de itens do carrossel (obrigatório) |
| `autoplay` | `boolean` | `true` | Habilita reprodução automática |
| `autoplayInterval` | `number` | `5000` | Intervalo entre slides em ms |

### Interface CarouselItem

```typescript
interface CarouselItem {
  image: string      // URL da imagem
  alt: string        // Texto alternativo
  tag: string        // Tag/categoria
  title: string      // Título principal
  description: string // Descrição
  actionLabel: string // Label do botão de ação
}
```

## 🎮 Controles de Navegação

### Teclado
- `←` (Seta Esquerda): Slide anterior
- `→` (Seta Direita): Próximo slide
- `Espaço`: Pausar/Reproduzir autoplay

### Mouse
- Clique nos indicadores (pontos) para navegar
- Botão de pausa/reprodução
- Barra de progresso visual

### Touch (Mobile)
- Swipe esquerda/direita para navegar
- Botões de navegação nas laterais
- Todos os controles de mouse também funcionam

## 🎨 Personalização

O componente usa classes Tailwind CSS que podem ser facilmente customizadas:

```css
/* Cores personalizadas */
:root {
  --teal-dark: #2D5A5A;
  --beige-light: #F5F5DC;
}

/* Animações customizadas */
.carousel-slide {
  @apply transition-transform duration-500 ease-in-out;
}
```

## 📱 Responsividade

- **Mobile (< 768px)**: Layout otimizado, controles de toque
- **Tablet (768px - 1024px)**: Layout intermediário
- **Desktop (> 1024px)**: Layout completo com imagens laterais

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm web

# Build de produção
pnpm web:build

# Preview da build
pnpm preview

# Verificação de tipos
pnpm check-types

# Linting
pnpm lint

# Formatação
pnpm format
```

## 📄 Estrutura do Projeto

```
├── components/
│   └── ImageCarousel.vue    # Componente principal
├── pages/
│   └── index.vue            # Página de demonstração
├── assets/
│   └── css/
│       └── main.css         # Estilos globais
├── app.vue                  # App principal
├── nuxt.config.ts           # Configuração do Nuxt
├── tailwind.config.js       # Configuração do Tailwind
└── package.json             # Dependências
```

## 🎯 Funcionalidades Implementadas

✅ Layout baseado na descrição da imagem fornecida  
✅ Imagens centrais com previews laterais (desktop)  
✅ Sistema de tags, títulos e descrições  
✅ Botões de ação com ícones  
✅ Indicadores de posição  
✅ Barra de progresso  
✅ Controles de reprodução/pausa  
✅ Navegação por teclado  
✅ Suporte a touch/swipe  
✅ Design responsivo  
✅ Animações suaves  
✅ Otimização de imagens  

## 🚀 Próximos Passos

- [ ] Adicionar mais tipos de transições
- [ ] Implementar lazy loading de imagens
- [ ] Adicionar suporte a vídeos
- [ ] Criar temas personalizáveis
- [ ] Adicionar mais opções de configuração

## 📝 Licença

ISC
