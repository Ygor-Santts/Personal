# InteractiveMap - Componente de Mapa Interativo

Componente Vue 3 totalmente configurável para mapas interativos com suporte a zoom, pan, marcadores personalizáveis e modo editor.

## 📋 Índice

- [Características](#características)
- [Props](#props)
- [Eventos](#eventos)
- [Tipos](#tipos)
- [Exemplos de Uso](#exemplos-de-uso)
- [Personalização de Marcadores](#personalização-de-marcadores)

## ✨ Características

- ✅ **Zoom e Pan**: Navegação suave com limites para não sair do mapa
- ✅ **Modo Editor**: Adicionar/remover marcadores clicando no mapa
- ✅ **Marcadores Personalizáveis**: Cores, tamanhos, ícones e textos customizados
- ✅ **Controles Opcionais**: Mostre/oculte controles de zoom e ferramentas de edição
- ✅ **Responsivo**: Adapta-se automaticamente ao tamanho do container
- ✅ **Emissão de Eventos**: Monitore todas as interações do usuário
- ✅ **TypeScript**: Totalmente tipado

## 🎛️ Props

| Prop                  | Tipo                             | Padrão              | Descrição                                                  |
| --------------------- | -------------------------------- | ------------------- | ---------------------------------------------------------- |
| `hotspots`            | `HotspotData[]`                  | `[]`                | Array de marcadores a serem exibidos                       |
| `editorMode`          | `boolean`                        | `false`             | Ativa o modo editor (permite adicionar/remover marcadores) |
| `showZoomControls`    | `boolean`                        | `true`              | Mostra/oculta os botões de zoom                            |
| `showEditorTools`     | `boolean`                        | `false`             | Mostra/oculta ferramentas de edição (exportar, limpar)     |
| `mapImageSrc`         | `string`                         | `"/resort-map.jpg"` | URL da imagem do mapa                                      |
| `defaultHotspotColor` | `string`                         | `"#ef4444"`         | Cor padrão dos marcadores (hex)                            |
| `defaultHotspotSize`  | `"small" \| "medium" \| "large"` | `"medium"`          | Tamanho padrão dos marcadores                              |

## 📡 Eventos

| Evento           | Payload         | Descrição                                                  |
| ---------------- | --------------- | ---------------------------------------------------------- |
| `hotspotClick`   | `HotspotData`   | Emitido quando um marcador é clicado                       |
| `hotspotAdd`     | `HotspotData`   | Emitido quando um novo marcador é adicionado (modo editor) |
| `hotspotRemove`  | `HotspotData`   | Emitido quando um marcador é removido (modo editor)        |
| `hotspotsUpdate` | `HotspotData[]` | Emitido quando a lista de marcadores é atualizada          |

## 📦 Tipos

### HotspotData

```typescript
interface HotspotData {
  number: number; // Número identificador
  title: string; // Título do marcador
  description: string; // Descrição detalhada
  x: number; // Posição X em percentual (0-100)
  y: number; // Posição Y em percentual (0-100)
  category: "attraction" | "accommodation" | "service" | "facility";

  // Propriedades opcionais de personalização
  backgroundColor?: string; // Cor de fundo (hex)
  icon?: string; // Emoji ou texto de ícone
  text?: string; // Texto customizado (sobrescreve number)
  size?: "small" | "medium" | "large"; // Tamanho do marcador
}
```

### Tamanhos de Marcadores

- **small**: 20px × 20px
- **medium**: 24px × 24px (padrão)
- **large**: 32px × 32px

## 🚀 Exemplos de Uso

### 1. Modo Visualização Básico

```vue
<template>
  <InteractiveMap :hotspots="myHotspots" />
</template>

<script setup lang="ts">
import InteractiveMap from "@/components/organisms/InteractiveMap.vue";
import type { HotspotData } from "@/types/hotspot";

const myHotspots: HotspotData[] = [
  {
    number: 1,
    title: "Ponto A",
    description: "Primeiro ponto de interesse",
    x: 30,
    y: 40,
    category: "attraction",
  },
];
</script>
```

### 2. Modo Editor Completo

```vue
<template>
  <InteractiveMap
    :editorMode="true"
    :showEditorTools="true"
    @hotspotAdd="handleAdd"
    @hotspotRemove="handleRemove"
    @hotspotsUpdate="handleUpdate"
  />
</template>

<script setup lang="ts">
import InteractiveMap from "@/components/organisms/InteractiveMap.vue";
import type { HotspotData } from "@/types/hotspot";

const handleAdd = (hotspot: HotspotData) => {
  console.log("Marcador adicionado:", hotspot);
};

const handleRemove = (hotspot: HotspotData) => {
  console.log("Marcador removido:", hotspot);
};

const handleUpdate = (hotspots: HotspotData[]) => {
  console.log("Total de marcadores:", hotspots.length);
};
</script>
```

### 3. Marcadores Personalizados

```vue
<template>
  <InteractiveMap :hotspots="customHotspots" />
</template>

<script setup lang="ts">
import InteractiveMap from "@/components/organisms/InteractiveMap.vue";
import type { HotspotData } from "@/types/hotspot";

const customHotspots: HotspotData[] = [
  {
    number: 1,
    title: "Marcador Grande Vermelho",
    description: "Com tamanho customizado",
    x: 20,
    y: 30,
    category: "attraction",
    backgroundColor: "#ef4444",
    size: "large",
  },
  {
    number: 2,
    title: "Marcador com Emoji",
    description: "Usando ícone de emoji",
    x: 50,
    y: 50,
    category: "service",
    backgroundColor: "#10b981",
    icon: "⭐",
  },
  {
    number: 3,
    title: "Marcador com Texto",
    description: "Texto customizado",
    x: 70,
    y: 40,
    category: "facility",
    backgroundColor: "#3b82f6",
    text: "ABC",
  },
];
</script>
```

### 4. Configurações Customizadas

```vue
<template>
  <InteractiveMap
    :hotspots="hotspots"
    mapImageSrc="/custom-map.png"
    defaultHotspotColor="#10b981"
    defaultHotspotSize="large"
    :showZoomControls="false"
  />
</template>
```

### 5. Monitorando Eventos

```vue
<template>
  <div>
    <InteractiveMap :hotspots="hotspots" @hotspotClick="onHotspotClick" />

    <div v-if="selectedHotspot">
      <h3>{{ selectedHotspot.title }}</h3>
      <p>{{ selectedHotspot.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import InteractiveMap from "@/components/organisms/InteractiveMap.vue";
import type { HotspotData } from "@/types/hotspot";

const hotspots = ref<HotspotData[]>([...]);
const selectedHotspot = ref<HotspotData | null>(null);

const onHotspotClick = (hotspot: HotspotData) => {
  selectedHotspot.value = hotspot;
};
</script>
```

## 🎨 Personalização de Marcadores

### Prioridade de Exibição

O conteúdo do marcador segue esta ordem de prioridade:

1. **icon** (se definido) - emoji ou ícone
2. **text** (se definido) - texto customizado
3. **number** (padrão) - número identificador

### Cores Personalizadas

Use qualquer cor em formato hexadecimal:

```typescript
{
  backgroundColor: "#3b82f6"; // Azul
  backgroundColor: "#10b981"; // Verde
  backgroundColor: "#ef4444"; // Vermelho
  backgroundColor: "#8b5cf6"; // Roxo
}
```

### Ícones com Emoji

```typescript
{
  icon: "🌟"; // Estrela
  icon: "📍"; // Pin de localização
  icon: "🏠"; // Casa
  icon: "🏖️"; // Praia
  icon: "🎯"; // Alvo
}
```

### Tamanhos

```typescript
{
  size: "small"; // 20px × 20px
  size: "medium"; // 24px × 24px (padrão)
  size: "large"; // 32px × 32px
}
```

## 🎮 Interações

### Modo Visualização

- **Click no marcador**: Abre popup com informações
- **Scroll/Pinch**: Zoom in/out
- **Arrastar**: Pan pelo mapa
- **Botões de zoom**: Zoom in/out/reset

### Modo Editor

- **Click no mapa**: Adiciona novo marcador
- **Click direito no marcador**: Remove marcador
- **Botão Exportar**: Copia JSON dos marcadores
- **Botão Limpar**: Remove todos os marcadores

## 🔧 Limitações

- O pan é limitado para não mostrar áreas vazias fora do mapa
- O zoom mínimo é calculado automaticamente para preencher o container
- O zoom máximo é 3x
- Em modo editor, é necessário clicar sem arrastar para adicionar marcadores

## 📝 Notas

- Os marcadores usam coordenadas percentuais (0-100) para responsividade
- A imagem do mapa sempre preenche completamente o container
- O componente é totalmente reativo e responde a mudanças nas props
- Suporta touch events para dispositivos móveis
