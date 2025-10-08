export interface HotspotData {
  number: number;
  title: string;
  description: string;
  x: number; // posição em percentual (0-100)
  y: number; // posição em percentual (0-100)
  category: "attraction" | "accommodation" | "service" | "facility";
  // Propriedades opcionais de personalização
  backgroundColor?: string; // cor de fundo do marcador
  icon?: string; // ícone (emoji ou classe de ícone)
  text?: string; // texto customizado (sobrescreve o número)
  size?: "small" | "medium" | "large"; // tamanho do marcador
}

export interface HotspotClickEvent {
  number: number;
  title: string;
  x: number;
  y: number;
}
