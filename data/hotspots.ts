import type { HotspotData } from "../types/hotspot";

export const hotspotsData: HotspotData[] = [
  // ÁREA DE ENTRADA E ESTACIONAMENTO (1-4)
  {
    number: 1,
    title: "Estacionamento Principal",
    description:
      "Estacionamento principal do resort com capacidade para 500 veículos",
    backgroundColor: "#6b7280", // Cinza para estacionamento
    x: 5.48,
    y: 19.1,
    category: "service",
  },
  {
    number: 2,
    title: "Kids Park - Área 1",
    description: "Área de diversão infantil com brinquedos e atividades",
    backgroundColor: "#f59e0b", // Laranja para área infantil
    x: 8.25,
    y: 24.35,
    category: "attraction",
  },
  {
    number: 3,
    title: "Kids Park - Área 2",
    description: "Segunda área do parque infantil com playground",
    backgroundColor: "#f59e0b", // Laranja para área infantil
    x: 13.03,
    y: 26.42,
    category: "attraction",
  },
  {
    number: 4,
    title: "Kids Park - Área 3",
    description: "Terceira área do parque infantil com escorregadores",
    backgroundColor: "#f59e0b", // Laranja para área infantil
    x: 16.67,
    y: 27.01,
    category: "attraction",
  },
  // ÁREA DE ESPORTES E LAZER (5-7)
  {
    number: 5,
    title: "Quadras de Tênis",
    description: "Complexo de tênis com 4 quadras profissionais",
    backgroundColor: "#10b981", // Verde para esportes
    x: 22.94,
    y: 6.69,
    category: "facility",
  },
  {
    number: 6,
    title: "Hotel Principal",
    description: "Hotel principal do resort com 200 suítes e vista para o lago",
    backgroundColor: "#8b5cf6", // Roxo para acomodações
    x: 30.09,
    y: 13.74,
    category: "accommodation",
  },
  {
    number: 7,
    title: "Mini Golf",
    description: "Campo de mini golf com 18 buracos temáticos",
    backgroundColor: "#10b981", // Verde para esportes
    x: 24.28,
    y: 24.41,
    category: "attraction",
  },
  // COMPLEXO AQUÁTICO CENTRAL (8-28)
  {
    number: 8,
    title: "Quiosque Central",
    description: "Quiosque com lanches, bebidas e produtos de conveniência",
    backgroundColor: "#ef4444", // Vermelho para serviços
    x: 19.47,
    y: 36.44,
    category: "service",
  },
  {
    number: 9,
    title: "Piscina das Ondas",
    description: "Piscina com sistema de ondas artificiais",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 29.57,
    y: 29.03,
    category: "attraction",
  },
  {
    number: 10,
    title: "Piscina Infantil",
    description: "Piscina especialmente projetada para crianças",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 32.33,
    y: 31.89,
    category: "attraction",
  },
  {
    number: 11,
    title: "Piscina dos Jatos",
    description: "Piscina com jatos de água e hidromassagem",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 32.18,
    y: 40.9,
    category: "attraction",
  },
  {
    number: 12,
    title: "Piscina com Ilha",
    description: "Piscina com ilha central e ponte de acesso",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 26.16,
    y: 41.94,
    category: "attraction",
  },
  {
    number: 13,
    title: "Tobogã Verde",
    description: "Tobogã aquático de alta velocidade com curvas emocionantes",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 22.67,
    y: 52.47,
    category: "attraction",
  },
  {
    number: 14,
    title: "Piscina das Cachoeiras",
    description: "Piscina com cascatas artificiais e ambiente tropical",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 19.91,
    y: 43.64,
    category: "attraction",
  },
  {
    number: 15,
    title: "Piscina dos Gêiseres",
    description: "Piscina com gêiseres que surpreendem os banhistas",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 22.94,
    y: 42.42,
    category: "attraction",
  },
  {
    number: 16,
    title: "Piscina das Fontes",
    description: "Piscina com fontes dançantes e iluminação especial",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 34.2,
    y: 48.55,
    category: "attraction",
  },
  {
    number: 17,
    title: "Lago Central",
    description: "Lago principal do resort com atividades aquáticas",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 38.78,
    y: 34.26,
    category: "attraction",
  },
  {
    number: 18,
    title: "Piscina das Correntes",
    description: "Piscina com correnteza artificial para relaxamento",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 43.68,
    y: 33.51,
    category: "attraction",
  },
  {
    number: 19,
    title: "Piscina das Piscinas",
    description:
      "Complexo de piscinas interconectadas com diferentes temperaturas",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 48.08,
    y: 30.71,
    category: "attraction",
  },
  {
    number: 20,
    title: "Restaurante do Lago",
    description: "Restaurante com vista panorâmica para o lago",
    backgroundColor: "#ef4444", // Vermelho para serviços
    x: 50.27,
    y: 23.68,
    category: "service",
  },
  {
    number: 21,
    title: "Ponte dos Suspiros",
    description: "Ponte romântica sobre o lago central",
    backgroundColor: "#10b981", // Verde para facilidades
    x: 59.45,
    y: 30.33,
    category: "facility",
  },
  {
    number: 22,
    title: "Ilha dos Pássaros",
    description: "Pequena ilha no lago central com observação de aves",
    backgroundColor: "#10b981", // Verde para facilidades
    x: 55.11,
    y: 34.9,
    category: "facility",
  },
  {
    number: 23,
    title: "Área de Pedalinhos",
    description: "Aluguel de pedalinhos para explorar o lago central",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 60.1,
    y: 38.61,
    category: "attraction",
  },
  {
    number: 24,
    title: "Píer de Pesca",
    description: "Píer especializado para pesca esportiva no lago",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 52.17,
    y: 48.53,
    category: "attraction",
  },
  {
    number: 25,
    title: "Complexo de Tobogãs",
    description: "Complexo com múltiplos tobogãs de diferentes alturas",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 48.97,
    y: 53.61,
    category: "attraction",
  },
  {
    number: 26,
    title: "Piscina das Crianças",
    description: "Piscina temática para crianças com brinquedos aquáticos",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 42.72,
    y: 43.01,
    category: "attraction",
  },
  {
    number: 27,
    title: "Piscina dos Adultos",
    description: "Piscina exclusiva para adultos com bar molhado",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 41.2,
    y: 48.01,
    category: "attraction",
  },
  {
    number: 28,
    title: "Quiosque Aquático",
    description: "Quiosque com lanches e bebidas no complexo de piscinas",
    backgroundColor: "#ef4444", // Vermelho para serviços
    x: 29.31,
    y: 57.32,
    category: "service",
  },
  // ÁREA SUL - PRAIA ARTIFICIAL (29-35)
  {
    number: 29,
    title: "Centro de Convenções",
    description: "Centro de convenções com salas para eventos corporativos",
    backgroundColor: "#10b981", // Verde para facilidades
    x: 18.71,
    y: 61.2,
    category: "facility",
  },
  {
    number: 30,
    title: "Praia Artificial",
    description: "Praia artificial com areia branca importada e palmeiras",
    backgroundColor: "#fbbf24", // Amarelo para praia
    x: 22.34,
    y: 70.68,
    category: "attraction",
  },
  {
    number: 31,
    title: "Piscina da Praia",
    description: "Piscina integrada à praia artificial com ondas suaves",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 27.15,
    y: 73.95,
    category: "attraction",
  },
  {
    number: 32,
    title: "Bar da Praia",
    description: "Bar temático na praia com coquetéis tropicais",
    backgroundColor: "#ef4444", // Vermelho para serviços
    x: 33.6,
    y: 63.6,
    category: "service",
  },
  {
    number: 33,
    title: "Loja de Praia",
    description: "Loja especializada em produtos de praia e protetor solar",
    backgroundColor: "#ef4444", // Vermelho para serviços
    x: 35.59,
    y: 64.8,
    category: "service",
  },
  {
    number: 34,
    title: "Tobogãs da Praia",
    description: "Tobogãs aquáticos com tema tropical integrados à praia",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 47.05,
    y: 57.61,
    category: "attraction",
  },
  {
    number: 35,
    title: "Quiosque da Praia",
    description: "Quiosque com guarda-sóis, cadeiras e serviços de praia",
    backgroundColor: "#ef4444", // Vermelho para serviços
    x: 32.16,
    y: 76.35,
    category: "service",
  },
  // ÁREA NORDESTE - DOME E HOTEL EXECUTIVO (36-43)
  {
    number: 36,
    title: "Dome Central",
    description: "Dome climatizado com atividades internas e shows",
    backgroundColor: "#10b981", // Verde para facilidades
    x: 66.5,
    y: 25.96,
    category: "facility",
  },
  {
    number: 37,
    title: "Piscina do Dome",
    description: "Piscina coberta com temperatura controlada",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 63.36,
    y: 21.32,
    category: "attraction",
  },
  {
    number: 38,
    title: "Hotel Executivo",
    description: "Hotel executivo com 150 quartos e centro de negócios",
    backgroundColor: "#8b5cf6", // Roxo para acomodações
    x: 75.57,
    y: 22.96,
    category: "accommodation",
  },
  {
    number: 39,
    title: "Piscina das Estrelas",
    description: "Piscina com iluminação especial que simula céu estrelado",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 81.36,
    y: 6.2,
    category: "attraction",
  },
  {
    number: 40,
    title: "Spa Aquático",
    description: "Spa com tratamentos aquáticos, sauna e hidromassagem",
    backgroundColor: "#ef4444", // Vermelho para serviços
    x: 78.49,
    y: 4.92,
    category: "service",
  },
  {
    number: 41,
    title: "Ponte dos Amantes",
    description: "Ponte romântica com vista panorâmica",
    backgroundColor: "#10b981", // Verde para facilidades
    x: 64.21,
    y: 10.2,
    category: "facility",
  },
  {
    number: 42,
    title: "Piscina das Cores",
    description:
      "Piscina com sistema de iluminação colorida que muda com música",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 79.7,
    y: 10.91,
    category: "attraction",
  },
  {
    number: 43,
    title: "Piscina dos Espelhos",
    description: "Piscina com efeitos de espelho e ilusões ópticas",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 74.36,
    y: 8.77,
    category: "attraction",
  },

  // HOTÉIS E ACOMODAÇÕES (44-50)
  {
    number: 44,
    title: "Lago dos Cisnes",
    description: "Lago artificial com cisnes e patos para relaxamento",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 42.33,
    y: 8.19,
    category: "facility",
  },
  {
    number: 45,
    title: "Suítes do Lago",
    description: "Suítes premium com varanda privativa e vista para o lago",
    backgroundColor: "#8b5cf6", // Roxo para acomodações
    x: 35.49,
    y: 10.69,
    category: "accommodation",
  },
  {
    number: 46,
    title: "Quadras de Tênis 2",
    description: "Quadras adicionais de tênis com iluminação noturna",
    backgroundColor: "#10b981", // Verde para esportes
    x: 35.92,
    y: 18.53,
    category: "facility",
  },
  {
    number: 47,
    title: "Hotel das Palmeiras",
    description: "Hotel temático com arquitetura tropical e jardins",
    backgroundColor: "#8b5cf6", // Roxo para acomodações
    x: 31.96,
    y: 19.9,
    category: "accommodation",
  },
  {
    number: 48,
    title: "Piscina do Hotel",
    description: "Piscina exclusiva do Hotel das Palmeiras com bar molhado",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 22.68,
    y: 12.67,
    category: "attraction",
  },
  {
    number: 49,
    title: "Bungalows à Beira do Lago",
    description: "Acomodações exclusivas com vista para o lago",
    backgroundColor: "#8b5cf6", // Roxo para acomodações
    x: 5.35,
    y: 63.23,
    category: "accommodation",
  },
  {
    number: 50,
    title: "Área Verde",
    description: "Espaço verde para relaxamento e contemplação da natureza",
    backgroundColor: "#10b981", // Verde para facilidades
    x: 8.71,
    y: 74.98,
    category: "facility",
  },

  // ENTRADA SUL (51-56)
  {
    number: 51,
    title: "Portão de Entrada",
    description: "Entrada principal do resort com controle de acesso",
    backgroundColor: "#6b7280", // Cinza para serviços
    x: 29.21,
    y: 94.09,
    category: "service",
  },
  {
    number: 52,
    title: "Estacionamento Sul",
    description: "Estacionamento secundário com 300 vagas",
    backgroundColor: "#6b7280", // Cinza para estacionamento
    x: 26.14,
    y: 94.98,
    category: "service",
  },
  {
    number: 53,
    title: "Avenida Principal",
    description: "Avenida principal de acesso com paisagismo especial",
    backgroundColor: "#10b981", // Verde para facilidades
    x: 20.93,
    y: 97.93,
    category: "facility",
  },
  {
    number: 54,
    title: "Estacionamento VIP",
    description: "Estacionamento VIP com vagas cobertas e manobrista",
    backgroundColor: "#6b7280", // Cinza para estacionamento
    x: 51.62,
    y: 62.47,
    category: "service",
  },
  {
    number: 55,
    title: "Centro de Eventos",
    description: "Centro de eventos com salas para 500 pessoas",
    backgroundColor: "#10b981", // Verde para facilidades
    x: 60.26,
    y: 70.92,
    category: "facility",
  },
  {
    number: 56,
    title: "Piscina dos Eventos",
    description: "Piscina exclusiva para eventos especiais com deck",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 58.09,
    y: 78.59,
    category: "attraction",
  },

  // ÁREA LESTE (57-65)
  {
    number: 57,
    title: "Estacionamento Leste",
    description: "Estacionamento da área leste com 200 vagas",
    backgroundColor: "#6b7280", // Cinza para estacionamento
    x: 76.59,
    y: 39.04,
    category: "service",
  },
  {
    number: 58,
    title: "Restaurante Executivo",
    description: "Restaurante executivo com menu de negócios",
    backgroundColor: "#ef4444", // Vermelho para serviços
    x: 85.71,
    y: 24.06,
    category: "service",
  },
  {
    number: 59,
    title: "Centro de Negócios",
    description: "Centro de negócios com salas de reunião e internet",
    backgroundColor: "#10b981", // Verde para facilidades
    x: 78.31,
    y: 29.39,
    category: "facility",
  },
  {
    number: 60,
    title: "Lounge Executivo",
    description: "Lounge exclusivo para hóspedes executivos",
    backgroundColor: "#ef4444", // Vermelho para serviços
    x: 83.04,
    y: 21.23,
    category: "service",
  },
  {
    number: 61,
    title: "Piscina Executiva",
    description: "Piscina exclusiva do hotel executivo com vista panorâmica",
    backgroundColor: "#0ea5e9", // Azul para atrações aquáticas
    x: 77.4,
    y: 23.18,
    category: "attraction",
  },
  {
    number: 62,
    title: "Academia Executiva",
    description: "Academia moderna com equipamentos de última geração",
    backgroundColor: "#10b981", // Verde para facilidades
    x: 72.35,
    y: 26.45,
    category: "facility",
  },
  {
    number: 63,
    title: "Spa Executivo",
    description: "Spa exclusivo com tratamentos corporativos",
    backgroundColor: "#ef4444", // Vermelho para serviços
    x: 69.26,
    y: 31.68,
    category: "service",
  },
  {
    number: 64,
    title: "Terraço Executivo",
    description: "Terraço com vista panorâmica e bar para executivos",
    backgroundColor: "#10b981", // Verde para facilidades
    x: 79.75,
    y: 27.98,
    category: "facility",
  },
  {
    number: 65,
    title: "Restaurante do Dome",
    description: "Restaurante gourmet com culinária internacional",
    backgroundColor: "#ef4444", // Vermelho para serviços
    x: 81.19,
    y: 26.56,
    category: "service",
  },
  {
    number: 66,
    title: "Lago dos Cisnes",
    description: "Lago artificial com cisnes e patos para relaxamento",
    x: 75.64,
    y: 64.7,
    category: "attraction",
    backgroundColor: "#0ea5e9",
    size: "medium",
  },
  {
    number: 67,
    title: "Lago dos Cisnes",
    description: "Lago artificial com cisnes e patos para relaxamento",
    x: 77.15,
    y: 67.72,
    category: "attraction",
    backgroundColor: "#0ea5e9",
    size: "medium",
  },
  {
    number: 68,
    title: "Lago dos Cisnes",
    description: "Lago artificial com cisnes e patos para relaxamento",
    x: 76.83,
    y: 79.01,
    category: "attraction",
    backgroundColor: "#0ea5e9",
    size: "medium",
  },
  {
    number: 69,
    title: "Lago dos Cisnes",
    description: "Lago artificial com cisnes e patos para relaxamento",
    x: 95.22,
    y: 61.94,
    category: "attraction",
    backgroundColor: "#0ea5e9",
    size: "medium",
  },
  {
    number: 70,
    title: "Lago dos Cisnes",
    description: "Lago artificial com cisnes e patos para relaxamento",
    x: 93.49,
    y: 50.74,
    category: "attraction",
    backgroundColor: "#0ea5e9",
    size: "medium",
  },
];
