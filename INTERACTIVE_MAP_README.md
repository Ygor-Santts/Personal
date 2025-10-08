# Mapa Interativo do Resort

Este projeto implementa um mapa interativo do resort usando Vue 3 e Nuxt 3, seguindo a arquitetura atômica de componentes.

## 🎯 Funcionalidades

- **Mapa Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Zoom e Pan**: Suporte completo para desktop e mobile
- **Hotspots Interativos**: 70 pontos de interesse clicáveis
- **Pop-ups Informativos**: Exibem detalhes de cada atração, sempre posicionados acima do hotspot
- **Controles de Zoom**: Botões para facilitar a navegação
- **Acessibilidade**: Suporte a teclado e screen readers

## 🏗️ Arquitetura de Componentes

### Átomos

- **Hotspot.vue**: Ponto clicável no mapa
- **CloseButton.vue**: Botão para fechar pop-ups

### Moléculas

- **Popup.vue**: Modal com informações do ponto de interesse, posicionado acima do hotspot com seta indicativa

### Organismos

- **InteractiveMap.vue**: Mapa completo com todas as funcionalidades

## 📁 Estrutura de Arquivos

```
components/
├── atoms/
│   ├── Hotspot.vue          # Ponto clicável
│   └── CloseButton.vue      # Botão de fechar
├── molecules/
│   └── Popup.vue            # Modal de informações
└── organisms/
    └── InteractiveMap.vue   # Mapa principal

data/
└── hotspots.ts              # Dados dos pontos de interesse

types/
└── hotspot.ts               # Tipos TypeScript

pages/
└── interactive-map.vue      # Página de demonstração

public/
└── resort-map.jpg           # Imagem do mapa do resort
```

## 🚀 Como Usar

### 1. Instalação

```bash
pnpm install
```

### 2. Executar o Projeto

```bash
pnpm web
```

### 3. Acessar o Mapa

Navegue para `http://localhost:3000/interactive-map`

## 🎮 Controles

### Desktop

- **Scroll do Mouse**: Zoom in/out
- **Arrastar**: Mover o mapa
- **Duplo Clique**: Zoom rápido
- **Botões de Controle**: Zoom manual

### Mobile

- **Pinça**: Zoom in/out
- **Arrastar**: Mover o mapa
- **Toque Duplo**: Zoom rápido

### Interação com Hotspots

- **Clique/Toque**: Abrir informações
- **ESC ou Clique Fora**: Fechar pop-up
- **Botão X**: Fechar pop-up

## 🎨 Personalização

### Adicionar Novos Hotspots

Edite o arquivo `data/hotspots.ts`:

```typescript
{
  number: 71,
  title: 'Nova Atração',
  description: 'Descrição da nova atração',
  x: 50, // Posição X em percentual (0-100)
  y: 50, // Posição Y em percentual (0-100)
  category: 'attraction' // 'attraction' | 'accommodation' | 'service' | 'facility'
}
```

### Substituir a Imagem do Mapa

1. Substitua o arquivo `public/resort-map.jpg` por sua imagem JPG
2. O caminho já está configurado no componente `InteractiveMap.vue`:
   ```vue
   src="/resort-map.jpg"
   ```

### Personalizar Estilos

Os componentes usam Tailwind CSS. Você pode:

- Modificar as classes nos arquivos `.vue`
- Adicionar estilos customizados na seção `<style>`
- Configurar o tema no `tailwind.config.js`

## 📱 Responsividade

O mapa é totalmente responsivo e se adapta a:

- **Desktop**: Controles completos com mouse
- **Tablet**: Gestos de toque otimizados
- **Mobile**: Interface simplificada

## 🔧 Tecnologias Utilizadas

- **Vue 3**: Framework reativo
- **Nuxt 3**: Framework full-stack
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização utilitária
- **vue3-zoom-pan-pinch**: Biblioteca de zoom/pan
- **Vite**: Build tool

## 📋 Critérios de Aceite Atendidos

✅ **Mapa responsivo** com zoom/pan funcionando em desktop e mobile  
✅ **Hotspots abrindo pop-up** no local correto  
✅ **Pop-up fechando corretamente** (ESC, clique fora, botão X)  
✅ **Componentes organizados** seguindo arquitetura atômica  
✅ **Posicionamento por percentuais** para manter alinhamento  
✅ **Acessibilidade** com ARIA labels e suporte a teclado

## 🎯 Próximos Passos

Para melhorar ainda mais o projeto, considere:

1. **Integração com API**: Buscar dados reais dos hotspots
2. **Filtros**: Filtrar hotspots por categoria
3. **Busca**: Campo de busca para encontrar atrações
4. **Rotas**: Navegação entre diferentes áreas do resort
5. **Analytics**: Rastrear interações dos usuários
6. **PWA**: Transformar em Progressive Web App

## 🐛 Solução de Problemas

### Erro "Cannot apply unknown utility class"

**Problema**: Tailwind CSS v4 não reconhece classes utilitárias como `@apply`
**Solução**: Os componentes foram atualizados para usar CSS padrão em vez de classes Tailwind

### Imagem não carrega

- Verifique se o arquivo existe em `public/`
- Confirme o caminho no componente
- Teste com uma imagem JPG válida

### Hotspots não aparecem

- Verifique se os dados estão em `data/hotspots.ts`
- Confirme as posições X/Y estão entre 0-100
- Verifique o console para erros

### Zoom não funciona

- Confirme se `vue3-zoom-pan-pinch` está instalado
- Verifique se não há conflitos de CSS
- Teste em diferentes navegadores

### Erros de TypeScript

- Os tipos foram definidos em `types/components.d.ts`
- Se houver erros de import, verifique se os arquivos existem

## 📄 Licença

Este projeto é um exemplo educacional e pode ser usado livremente para fins de aprendizado e desenvolvimento.
