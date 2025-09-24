# Carousel Component Demo

Este projeto demonstra um componente de carousel personalizado construído com Vue 3 e Nuxt.js.

## 🎯 Funcionalidades

- **Carousel Responsivo**: Layout adaptável para diferentes tamanhos de tela
- **Navegação por Arrows**: Setas de navegação com área de clique focada no ícone
- **Indicators Dinâmicos**: Indicadores que se transformam de círculo para retângulo alongado
- **Touch/Swipe Support**: Suporte completo para gestos em dispositivos móveis
- **Drag & Drop**: Navegação por arrastar com mouse
- **Autoplay**: Reprodução automática com controle play/pause
- **Keyboard Navigation**: Navegação por teclado (setas esquerda/direita)

## 🚀 Demo Online

Acesse a demo ao vivo: [https://ygor-santts.github.io/Personal/](https://ygor-santts.github.io/Personal/)

## 🛠️ Tecnologias Utilizadas

- **Vue 3** - Framework JavaScript reativo
- **Nuxt.js 3** - Framework full-stack para Vue
- **Tailwind CSS** - Framework CSS utilitário
- **TypeScript** - Tipagem estática para JavaScript

## 📱 Características do Carousel

### Layout

- **Item Central**: Destaque principal com sombra
- **Itens Laterais**: Parcialmente visíveis com opacidade reduzida
- **Altura Uniforme**: Todos os itens com a mesma altura

### Navegação

- **Arrows**: Clique apenas no ícone (não no fundo do botão)
- **Indicators**: Background em pílula com transição suave
- **Touch**: Swipe para navegar em dispositivos móveis
- **Mouse**: Drag para navegar no desktop

### Animações

- **Indicators**: Transição de círculo para retângulo alongado
- **Suave**: Animações de 300ms para melhor UX
- **Sem animações nos itens**: Foco na performance

## 🏗️ Estrutura do Projeto

```
components/
├── GenericCarousel.vue    # Componente principal do carousel
├── CarouselExamples.vue   # Exemplos de uso
└── InfoCard.vue          # Card de informações

pages/
├── index.vue             # Página principal
└── demo.vue              # Página de demonstração
```

## 🚀 Como Executar Localmente

1. **Clone o repositório**

   ```bash
   git clone https://github.com/Ygor-Santts/Personal.git
   cd Personal
   ```

2. **Instale as dependências**

   ```bash
   pnpm install
   ```

3. **Execute em modo desenvolvimento**

   ```bash
   pnpm web
   ```

4. **Build para produção**
   ```bash
   pnpm web:build
   ```

## 📦 Scripts Disponíveis

- `pnpm web` - Executa em modo desenvolvimento
- `pnpm web:build` - Build para produção
- `pnpm preview` - Preview do build de produção
- `pnpm lint` - Executa o linter
- `pnpm format` - Formata o código
 - `pnpm generate` - Gera site estático em `.output/public`

## 🌐 Deploy no GitHub Pages

O projeto está configurado para GitHub Pages com Nuxt 3 (static):

- `nuxt.config.ts`: `nitro.preset = "github_pages"` e `app.baseURL = "/Personal/"`
- `@nuxt/image` com `provider: "none"` para funcionamento em hospedagem estática
- GitHub Actions em `.github/workflows/deploy.yml`

Passos:

1. Confirme que o branch padrão é `main` e o repositório se chama `Personal`.
2. Nas configurações do repositório, habilite GitHub Pages com source "GitHub Actions".
3. Faça push para `main`. A action irá:
   - Instalar dependências
   - `pnpm generate` (gera em `.output/public`)
   - Publicar no Pages

## 🎨 Personalização

O carousel é totalmente configurável através de props:

```vue
<GenericCarousel
  :items="items"
  :autoplay="true"
  :autoplay-interval="5000"
  :show-arrows="true"
  :show-indicators="true"
  :show-play-pause="true"
  :height="'h-64 sm:h-80 md:h-96'"
  :side-item-opacity="0.6"
/>
```

## 📄 Licença

Este projeto está sob a licença ISC.

## 👨‍💻 Autor

**Ygor Santos**

- GitHub: [@Ygor-Santts](https://github.com/Ygor-Santts)
- Email: ygorpb2@gmail.com
