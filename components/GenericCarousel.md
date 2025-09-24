# GenericCarousel - Documentação

## Visão Geral

O `GenericCarousel` é um componente Vue 3 totalmente genérico e reutilizável que permite criar carrosséis com qualquer tipo de conteúdo. Ele usa o sistema de slots do Vue para máxima flexibilidade.

## Como Funciona

### 1. **Estrutura Base**

O carrossel sempre mostra 3 itens:

- **Item Esquerdo**: Item anterior (parcialmente visível)
- **Item Central**: Item atual (em destaque)
- **Item Direito**: Próximo item (parcialmente visível)

### 2. **Slots Disponíveis**

#### `#side-item`

- **Uso**: Para os itens laterais (esquerdo e direito)
- **Props disponíveis**:
  - `item`: Dados do item atual
  - `index`: Índice do item
  - `isActive`: Sempre `false` para itens laterais

#### `#center-item`

- **Uso**: Para o item central (em destaque)
- **Props disponíveis**:
  - `item`: Dados do item atual
  - `index`: Índice do item
  - `isActive`: Sempre `true` para o item central

#### `#content` (opcional)

- **Uso**: Conteúdo adicional abaixo do carrossel
- **Props disponíveis**:
  - `item`: Dados do item atual
  - `index`: Índice do item

### 3. **Props Configuráveis**

```typescript
interface Props {
  items: any[]; // Array de dados
  autoplay?: boolean; // Autoplay ativo (padrão: true)
  autoplayInterval?: number; // Intervalo do autoplay em ms (padrão: 5000)
  showArrows?: boolean; // Mostrar setas de navegação (padrão: true)
  showIndicators?: boolean; // Mostrar indicadores (padrão: true)
  showProgressBar?: boolean; // Mostrar barra de progresso (padrão: true)
  showPlayPause?: boolean; // Mostrar botão play/pause (padrão: true)
  showContent?: boolean; // Mostrar slot de conteúdo (padrão: true)
  maxWidth?: string; // Largura máxima (padrão: "max-w-7xl")
  height?: string; // Altura do carrossel (padrão: "h-64 sm:h-80 md:h-96 lg:h-[500px]")
  sideItemOpacity?: number; // Opacidade dos itens laterais (padrão: 0.6)
  centerItemWidth?: string; // Largura do item central (padrão: "w-4/5 sm:w-4/5 md:w-2/5")
  sideItemWidth?: string; // Largura dos itens laterais (padrão: "w-1/6 sm:w-1/5 md:w-2/5")
}
```

## Exemplos de Uso

### 1. **Cards Simples**

```vue
<template>
  <GenericCarousel :items="simpleCards" :height="'h-48'">
    <template #side-item="{ item }">
      <div
        class="w-full h-full bg-gray-100 rounded-lg p-4 flex items-center justify-center"
      >
        <span class="text-gray-600">{{ item.name }}</span>
      </div>
    </template>

    <template #center-item="{ item }">
      <div
        class="w-full h-full bg-blue-500 rounded-lg p-4 flex items-center justify-center"
      >
        <span class="text-white font-bold">{{ item.name }}</span>
      </div>
    </template>
  </GenericCarousel>
</template>

<script setup>
const simpleCards = [
  { name: "Card 1" },
  { name: "Card 2" },
  { name: "Card 3" },
];
</script>
```

### 2. **Cards com Ícones**

```vue
<template>
  <GenericCarousel :items="iconCards" :height="'h-64'">
    <template #side-item="{ item }">
      <div
        class="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl p-6 flex flex-col justify-center items-center text-center"
      >
        <div
          class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3"
        >
          <Icon :name="item.icon" class="w-6 h-6 text-white" />
        </div>
        <h4 class="text-white font-semibold">{{ item.title }}</h4>
      </div>
    </template>

    <template #center-item="{ item }">
      <div
        class="w-full h-full bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-8 flex flex-col justify-center items-center text-center"
      >
        <div
          class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4"
        >
          <Icon :name="item.icon" class="w-8 h-8 text-white" />
        </div>
        <h4 class="text-white font-bold text-xl">{{ item.title }}</h4>
        <p class="text-white opacity-90 text-sm mt-2">{{ item.description }}</p>
      </div>
    </template>
  </GenericCarousel>
</template>

<script setup>
const iconCards = [
  {
    title: "Design",
    description: "Soluções visuais inovadoras",
    icon: "heroicons:paint-brush",
  },
  // ... mais itens
];
</script>
```

### 3. **Cards com Conteúdo Adicional**

```vue
<template>
  <GenericCarousel :items="contentCards" :show-content="true">
    <template #side-item="{ item }">
      <div
        class="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl p-4 flex flex-col justify-center text-center"
      >
        <Icon :name="item.icon" class="w-8 h-8 text-white mx-auto mb-2" />
        <h4 class="text-white font-semibold">{{ item.title }}</h4>
      </div>
    </template>

    <template #center-item="{ item }">
      <div
        class="w-full h-full bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 flex flex-col justify-center text-center"
      >
        <Icon :name="item.icon" class="w-12 h-12 text-white mx-auto mb-4" />
        <h4 class="text-white font-bold text-xl">{{ item.title }}</h4>
      </div>
    </template>

    <template #content="{ item }">
      <div
        class="text-xs uppercase font-semibold tracking-widest text-gray-500 mb-2"
      >
        {{ item.category }}
      </div>
      <h2 class="text-2xl font-bold text-gray-800 mb-3">
        {{ item.title }}
      </h2>
      <p class="text-gray-600 mb-4">
        {{ item.description }}
      </p>
      <div
        class="text-blue-600 font-medium cursor-pointer hover:text-blue-700 transition-colors"
      >
        {{ item.action }}
      </div>
    </template>
  </GenericCarousel>
</template>
```

### 4. **Cards de Imagens**

```vue
<template>
  <GenericCarousel :items="imageCards" :show-content="true">
    <template #side-item="{ item }">
      <div class="w-full h-full rounded-xl overflow-hidden">
        <NuxtImg
          :src="item.image"
          :alt="item.alt"
          class="w-full h-full object-cover"
        />
      </div>
    </template>

    <template #center-item="{ item }">
      <div class="w-full h-full rounded-xl overflow-hidden shadow-2xl">
        <NuxtImg
          :src="item.image"
          :alt="item.alt"
          class="w-full h-full object-cover"
        />
      </div>
    </template>

    <template #content="{ item }">
      <div
        class="text-xs uppercase font-semibold tracking-widest text-gray-500 mb-2"
      >
        {{ item.tag }}
      </div>
      <h2 class="text-2xl font-bold text-gray-800 mb-3">
        {{ item.title }}
      </h2>
      <p class="text-gray-600 mb-4">
        {{ item.description }}
      </p>
      <div
        class="text-green-600 font-medium cursor-pointer hover:text-green-700 transition-colors"
      >
        {{ item.actionLabel }}
      </div>
    </template>
  </GenericCarousel>
</template>
```

## Funcionalidades

### **Navegação**

- **Setas**: Botões de navegação nas laterais
- **Indicadores**: Pontos clicáveis na parte inferior
- **Teclado**: Setas esquerda/direita e espaço para play/pause
- **Swipe/Drag**: Funciona em dispositivos móveis e desktop

### **Autoplay**

- **Controle automático**: Avança automaticamente
- **Pausa inteligente**: Pausa durante interação do usuário
- **Botão play/pause**: Controle manual

### **Responsividade**

- **Breakpoints**: Adapta-se a diferentes tamanhos de tela
- **Classes Tailwind**: Usa classes responsivas por padrão
- **Configurável**: Todas as dimensões são customizáveis

## Demo Interativo

Acesse `/demo` para ver um exemplo interativo onde você pode:

- Alterar todas as configurações em tempo real
- Testar diferentes tipos de conteúdo
- Ver como o carrossel se adapta às mudanças

## Vantagens

1. **Genérico**: Aceita qualquer tipo de dados
2. **Flexível**: Slots permitem total customização
3. **Reutilizável**: Um componente para todos os casos
4. **Performático**: Código otimizado e centralizado
5. **Acessível**: Suporte a teclado e screen readers
6. **Responsivo**: Funciona em todos os dispositivos
