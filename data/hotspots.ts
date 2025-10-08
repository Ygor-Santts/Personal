import type { HotspotData } from "~/types/hotspot";

export const hotspotsData: HotspotData[] = [
  // Entrada e Estacionamento (1-4)
  {
    number: 1,
    title: "Estacionamento Principal",
    description:
      "Estacionamento principal do resort com capacidade para 500 veículos. Localização estratégica próxima à entrada principal.",
    x: 15,
    y: 8,
    category: "service",
  },
  {
    number: 2,
    title: "Recepção Hot Park",
    description:
      "Recepção principal do Hot Park. Aqui você encontra informações sobre todas as atrações e pode adquirir ingressos.",
    x: 20,
    y: 12,
    category: "service",
  },
  {
    number: 3,
    title: "Loja de Souvenirs",
    description:
      "Loja oficial do resort com produtos exclusivos, roupas, acessórios e lembranças para levar para casa.",
    x: 18,
    y: 15,
    category: "service",
  },
  {
    number: 4,
    title: "Centro de Informações",
    description:
      "Centro de informações turísticas com mapas, guias e assistência em múltiplos idiomas.",
    x: 22,
    y: 10,
    category: "service",
  },

  // Área de Lazer (5-7)
  {
    number: 5,
    title: "Área Verde",
    description:
      "Espaço verde para relaxamento e contemplação da natureza, com bancos e sombra natural.",
    x: 12,
    y: 18,
    category: "facility",
  },
  {
    number: 6,
    title: "Bungalows à Beira do Lago",
    description:
      "Acomodações exclusivas com vista para o lago. Perfeitas para uma estadia romântica ou em família.",
    x: 25,
    y: 20,
    category: "accommodation",
  },
  {
    number: 7,
    title: "Mini Golf",
    description:
      "Campo de mini golf com 18 buracos temáticos. Diversão garantida para todas as idades.",
    x: 10,
    y: 25,
    category: "attraction",
  },

  // Complexo Aquático Central (8-28)
  {
    number: 8,
    title: "Quiosque Central",
    description:
      "Quiosque com lanches, bebidas e produtos de conveniência no coração do parque aquático.",
    x: 35,
    y: 30,
    category: "service",
  },
  {
    number: 9,
    title: "Piscina das Ondas",
    description:
      "Piscina com sistema de ondas artificiais. A diversão nunca para nesta atração aquática.",
    x: 30,
    y: 35,
    category: "attraction",
  },
  {
    number: 10,
    title: "Piscina Infantil",
    description:
      "Piscina especialmente projetada para crianças com brinquedos aquáticos e profundidade segura.",
    x: 28,
    y: 38,
    category: "attraction",
  },
  {
    number: 11,
    title: "Piscina dos Jatos",
    description:
      "Piscina com jatos de água e hidromassagem. Relaxe e desfrute desta experiência única.",
    x: 32,
    y: 40,
    category: "attraction",
  },
  {
    number: 12,
    title: "Piscina com Ilha",
    description:
      "Piscina com ilha central e ponte de acesso. Ambiente perfeito para fotos e momentos especiais.",
    x: 35,
    y: 42,
    category: "attraction",
  },
  {
    number: 13,
    title: "Tobogã Verde",
    description:
      "Tobogã aquático de alta velocidade com curvas emocionantes. Para os mais aventureiros!",
    x: 38,
    y: 35,
    category: "attraction",
  },
  {
    number: 14,
    title: "Piscina das Cachoeiras",
    description:
      "Piscina com cascatas artificiais e ambiente tropical. Sensação de estar em uma ilha paradisíaca.",
    x: 40,
    y: 38,
    category: "attraction",
  },
  {
    number: 15,
    title: "Piscina dos Gêiseres",
    description:
      "Piscina com gêiseres que surpreendem os banhistas. Diversão garantida para toda a família.",
    x: 42,
    y: 40,
    category: "attraction",
  },
  {
    number: 16,
    title: "Piscina das Fontes",
    description:
      "Piscina com fontes dançantes e iluminação especial. Show aquático imperdível.",
    x: 45,
    y: 42,
    category: "attraction",
  },
  {
    number: 17,
    title: "Lago Central",
    description:
      "Lago principal do resort com atividades aquáticas, pedalinhos e pesca esportiva.",
    x: 50,
    y: 35,
    category: "attraction",
  },
  {
    number: 18,
    title: "Piscina das Correntes",
    description:
      "Piscina com correnteza artificial. Relaxe flutuando pela corrente suave.",
    x: 48,
    y: 38,
    category: "attraction",
  },
  {
    number: 19,
    title: "Piscina das Piscinas",
    description:
      "Complexo de piscinas interconectadas com diferentes temperaturas e profundidades.",
    x: 52,
    y: 40,
    category: "attraction",
  },
  {
    number: 20,
    title: "Restaurante do Lago",
    description:
      "Restaurante com vista panorâmica para o lago. Culinária regional e internacional.",
    x: 55,
    y: 35,
    category: "service",
  },
  {
    number: 21,
    title: "Ponte dos Suspiros",
    description:
      "Ponte romântica sobre o lago central. Local perfeito para fotos e momentos especiais.",
    x: 50,
    y: 32,
    category: "facility",
  },
  {
    number: 22,
    title: "Ilha dos Pássaros",
    description:
      "Pequena ilha no lago central com observação de aves e ambiente natural preservado.",
    x: 52,
    y: 30,
    category: "facility",
  },
  {
    number: 23,
    title: "Área de Pedalinhos",
    description:
      "Aluguel de pedalinhos para explorar o lago central. Diversão em família garantida.",
    x: 48,
    y: 28,
    category: "attraction",
  },
  {
    number: 24,
    title: "Píer de Pesca",
    description:
      "Píer especializado para pesca esportiva no lago central. Equipamentos disponíveis para aluguel.",
    x: 45,
    y: 30,
    category: "attraction",
  },
  {
    number: 25,
    title: "Complexo de Tobogãs",
    description:
      "Complexo com múltiplos tobogãs de diferentes alturas e velocidades. Emoção garantida!",
    x: 42,
    y: 45,
    category: "attraction",
  },
  {
    number: 26,
    title: "Piscina das Crianças",
    description:
      "Piscina temática para crianças com brinquedos aquáticos e monitores especializados.",
    x: 38,
    y: 48,
    category: "attraction",
  },
  {
    number: 27,
    title: "Piscina dos Adultos",
    description:
      "Piscina exclusiva para adultos com bar molhado e ambiente sofisticado.",
    x: 35,
    y: 50,
    category: "attraction",
  },
  {
    number: 28,
    title: "Quiosque Aquático",
    description:
      "Quiosque com lanches, bebidas e produtos aquáticos no complexo de piscinas.",
    x: 32,
    y: 52,
    category: "service",
  },

  // Área Sul (29-35)
  {
    number: 29,
    title: "Centro de Convenções",
    description:
      "Centro de convenções com salas para eventos corporativos e celebrações especiais.",
    x: 25,
    y: 60,
    category: "facility",
  },
  {
    number: 30,
    title: "Praia Artificial",
    description:
      "Praia artificial com areia branca importada e palmeiras. Sensação de estar no Caribe.",
    x: 20,
    y: 65,
    category: "attraction",
  },
  {
    number: 31,
    title: "Piscina da Praia",
    description:
      "Piscina integrada à praia artificial com ondas suaves e ambiente tropical.",
    x: 18,
    y: 68,
    category: "attraction",
  },
  {
    number: 32,
    title: "Bar da Praia",
    description:
      "Bar temático na praia com coquetéis tropicais e petiscos deliciosos.",
    x: 22,
    y: 70,
    category: "service",
  },
  {
    number: 33,
    title: "Loja de Praia",
    description:
      "Loja especializada em produtos de praia, protetor solar e acessórios aquáticos.",
    x: 15,
    y: 72,
    category: "service",
  },
  {
    number: 34,
    title: "Tobogãs da Praia",
    description:
      "Tobogãs aquáticos com tema tropical integrados à área da praia artificial.",
    x: 25,
    y: 75,
    category: "attraction",
  },
  {
    number: 35,
    title: "Quiosque da Praia",
    description:
      "Quiosque com guarda-sóis, cadeiras e serviços de praia para aluguel.",
    x: 20,
    y: 78,
    category: "service",
  },

  // Área Nordeste (36-43)
  {
    number: 36,
    title: "Dome Central",
    description:
      "Dome climatizado com atividades internas, shows e eventos especiais.",
    x: 75,
    y: 15,
    category: "facility",
  },
  {
    number: 37,
    title: "Piscina do Dome",
    description:
      "Piscina coberta com temperatura controlada. Funciona em qualquer estação do ano.",
    x: 78,
    y: 18,
    category: "attraction",
  },
  {
    number: 38,
    title: "Restaurante do Dome",
    description:
      "Restaurante gourmet com culinária internacional e ambiente climatizado.",
    x: 80,
    y: 20,
    category: "service",
  },
  {
    number: 39,
    title: "Piscina das Estrelas",
    description:
      "Piscina com iluminação especial que simula um céu estrelado à noite.",
    x: 82,
    y: 22,
    category: "attraction",
  },
  {
    number: 40,
    title: "Spa Aquático",
    description:
      "Spa com tratamentos aquáticos, sauna e hidromassagem. Relaxamento total.",
    x: 85,
    y: 25,
    category: "service",
  },
  {
    number: 41,
    title: "Ponte dos Amantes",
    description:
      "Ponte romântica com vista panorâmica. Local perfeito para propostas de casamento.",
    x: 88,
    y: 18,
    category: "facility",
  },
  {
    number: 42,
    title: "Piscina das Cores",
    description:
      "Piscina com sistema de iluminação colorida que muda conforme a música.",
    x: 90,
    y: 20,
    category: "attraction",
  },
  {
    number: 43,
    title: "Piscina dos Espelhos",
    description:
      "Piscina com efeitos de espelho e ilusões ópticas. Experiência única e divertida.",
    x: 92,
    y: 22,
    category: "attraction",
  },

  // Hotéis e Acomodações (44-50)
  {
    number: 44,
    title: "Hotel Principal",
    description:
      "Hotel principal do resort com 200 suítes, restaurante, spa e vista para o lago.",
    x: 30,
    y: 25,
    category: "accommodation",
  },
  {
    number: 45,
    title: "Lago dos Cisnes",
    description:
      "Lago artificial com cisnes e patos. Ambiente bucólico para relaxamento.",
    x: 28,
    y: 28,
    category: "facility",
  },
  {
    number: 46,
    title: "Suítes do Lago",
    description:
      "Suítes premium com varanda privativa e vista direta para o lago dos cisnes.",
    x: 25,
    y: 30,
    category: "accommodation",
  },
  {
    number: 47,
    title: "Quadras de Tênis",
    description:
      "Complexo de tênis com 4 quadras profissionais e instrutores disponíveis.",
    x: 12,
    y: 20,
    category: "attraction",
  },
  {
    number: 48,
    title: "Quadras de Tênis 2",
    description:
      "Quadras adicionais de tênis com iluminação noturna para jogos noturnos.",
    x: 8,
    y: 22,
    category: "attraction",
  },
  {
    number: 49,
    title: "Hotel das Palmeiras",
    description:
      "Hotel temático com arquitetura tropical e jardins de palmeiras.",
    x: 15,
    y: 70,
    category: "accommodation",
  },
  {
    number: 50,
    title: "Piscina do Hotel",
    description:
      "Piscina exclusiva do Hotel das Palmeiras com bar molhado e serviço de quarto.",
    x: 12,
    y: 72,
    category: "attraction",
  },

  // Entrada Sul (51-56)
  {
    number: 51,
    title: "Portão de Entrada",
    description:
      "Entrada principal do resort com controle de acesso e recepção de visitantes.",
    x: 50,
    y: 85,
    category: "service",
  },
  {
    number: 52,
    title: "Estacionamento Sul",
    description:
      "Estacionamento secundário com 300 vagas para visitantes e eventos especiais.",
    x: 45,
    y: 88,
    category: "service",
  },
  {
    number: 53,
    title: "Avenida Principal",
    description:
      "Avenida principal de acesso ao resort com paisagismo e iluminação especial.",
    x: 50,
    y: 90,
    category: "facility",
  },
  {
    number: 54,
    title: "Estacionamento VIP",
    description:
      "Estacionamento VIP com vagas cobertas e serviço de manobrista.",
    x: 55,
    y: 88,
    category: "service",
  },
  {
    number: 55,
    title: "Centro de Eventos",
    description:
      "Centro de eventos com salas para 500 pessoas e equipamentos de última geração.",
    x: 60,
    y: 85,
    category: "facility",
  },
  {
    number: 56,
    title: "Piscina dos Eventos",
    description:
      "Piscina exclusiva para eventos especiais com deck e área de convivência.",
    x: 62,
    y: 82,
    category: "attraction",
  },

  // Área Leste (57-65)
  {
    number: 57,
    title: "Estacionamento Leste",
    description:
      "Estacionamento da área leste com 200 vagas e fácil acesso às atrações.",
    x: 85,
    y: 30,
    category: "service",
  },
  {
    number: 58,
    title: "Hotel Executivo",
    description:
      "Hotel executivo com 150 quartos, centro de negócios e salas de reunião.",
    x: 88,
    y: 35,
    category: "accommodation",
  },
  {
    number: 59,
    title: "Restaurante Executivo",
    description:
      "Restaurante executivo com menu de negócios e ambiente corporativo.",
    x: 90,
    y: 38,
    category: "service",
  },
  {
    number: 60,
    title: "Centro de Negócios",
    description:
      "Centro de negócios com salas de reunião, internet e serviços corporativos.",
    x: 92,
    y: 40,
    category: "facility",
  },
  {
    number: 61,
    title: "Lounge Executivo",
    description:
      "Lounge exclusivo para hóspedes executivos com bar e área de relaxamento.",
    x: 88,
    y: 42,
    category: "service",
  },
  {
    number: 62,
    title: "Piscina Executiva",
    description:
      "Piscina exclusiva do hotel executivo com vista panorâmica e bar molhado.",
    x: 85,
    y: 45,
    category: "attraction",
  },
  {
    number: 63,
    title: "Academia Executiva",
    description:
      "Academia moderna com equipamentos de última geração e personal trainer.",
    x: 82,
    y: 48,
    category: "facility",
  },
  {
    number: 64,
    title: "Spa Executivo",
    description:
      "Spa exclusivo com tratamentos corporativos e massagens terapêuticas.",
    x: 80,
    y: 50,
    category: "service",
  },
  {
    number: 65,
    title: "Terraço Executivo",
    description:
      "Terraço com vista panorâmica, bar e área de convivência para executivos.",
    x: 78,
    y: 52,
    category: "facility",
  },

  // Residencial (66-70)
  {
    number: 66,
    title: "Residencial Villas",
    description:
      "Complexo residencial com 50 villas de luxo para estadias prolongadas.",
    x: 95,
    y: 70,
    category: "accommodation",
  },
  {
    number: 67,
    title: "Rua das Villas",
    description:
      "Rua principal do residencial com paisagismo e iluminação especial.",
    x: 92,
    y: 72,
    category: "facility",
  },
  {
    number: 68,
    title: "Avenida das Palmeiras",
    description:
      "Avenida arborizada com palmeiras e jardins temáticos do residencial.",
    x: 90,
    y: 74,
    category: "facility",
  },
  {
    number: 69,
    title: "Centro Comercial",
    description:
      "Centro comercial do residencial com lojas, farmácia e serviços essenciais.",
    x: 88,
    y: 76,
    category: "service",
  },
  {
    number: 70,
    title: "Piscina Residencial",
    description:
      "Piscina exclusiva do residencial com área de lazer e churrasqueiras.",
    x: 85,
    y: 78,
    category: "attraction",
  },
];
