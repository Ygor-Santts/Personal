<script setup lang="ts">
// Dados de exemplo para o carousel
const sampleImages = [
  {
    id: 1,
    title: "1 Hotel Resort Paradise",
    description: "Um resort de luxo à beira-mar com todas as comodidades",
    imageUrl:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    price: "R$ 450/noite",
    width: 400, // Largura customizada
  },
  {
    id: 2,
    title: "2 Mountain Lodge Retreat",
    description: "Conforto e tranquilidade nas montanhas",
    imageUrl:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
    price: "R$ 320/noite",
    width: 250, // Largura menor (vertical)
  },
  {
    id: 3,
    title: "3 Urban Business Hotel",
    description: "Localização central para viagens de negócios",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    price: "R$ 280/noite",
    width: 500, // Largura maior (horizontal)
  },
  {
    id: 4,
    title: "4 Boutique Hotel Experience",
    description: "Experiência única e personalizada",
    imageUrl:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
    price: "R$ 380/noite",
    width: 300, // Largura padrão
  },
  {
    id: 5,
    title: "5 Beachfront Villa",
    description: "Villa privativa com vista para o mar",
    imageUrl:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
    price: "R$ 650/noite",
    width: 350, // Largura média
  },
  {
    id: 6,
    title: "6 Historic Palace Hotel",
    description: "Elegância clássica em um palácio histórico",
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    price: "R$ 520/noite",
    width: 450, // Largura grande
  },
  {
    id: 7,
    title: "7 Luxury Spa Resort",
    description: "Relaxamento total com tratamentos de spa",
    imageUrl:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    price: "R$ 580/noite",
    width: 280, // Largura menor
  },
  {
    id: 8,
    title: "8 Modern City Hotel",
    description: "Design contemporâneo no coração da cidade",
    imageUrl:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    price: "R$ 350/noite",
    width: 320, // Largura padrão
  },
  {
    id: 9,
    title: "9 Tropical Island Resort",
    description: "Paraíso tropical com praias de areia branca",
    imageUrl:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
    price: "R$ 720/noite",
    width: 380, // Largura média-grande
  },
  {
    id: 10,
    title: "10 Cozy Country Inn",
    description: "Charme rústico no campo com aconchego familiar",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    price: "R$ 220/noite",
    width: 260, // Largura menor
  },
  {
    id: 11,
    title: "11 Skyline Penthouse Hotel",
    description: "Vista panorâmica da cidade do alto",
    imageUrl:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
    price: "R$ 890/noite",
    width: 420, // Largura grande
  },
];

const sampleCards = [
  {
    id: 1,
    title: "Card 1",
    content: "Conteúdo do primeiro card",
  },
  {
    id: 2,
    title: "Card 2",
    content: "Conteúdo do segundo card",
  },
  {
    id: 3,
    title: "Card 3",
    content: "Conteúdo do terceiro card",
  },
  {
    id: 4,
    title: "Card 4",
    content: "Conteúdo do quarto card",
  },
];
</script>

<template>
  <div class="w-full max-w-6xl mx-auto">
    <Carousel
      :items="sampleImages"
      :items-per-view="3"
      :gap="-170"
      :height="300"
      :loop="true"
    >
      <template #default="{ item }">
        <div class="w-full h-full relative rounded-lg overflow-hidden">
          <img
            :src="item['imageUrl']"
            :alt="item['title']"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black opacity-40"></div>
          <div class="absolute bottom-2 left-2 text-white">
            <h3 class="text-sm font-bold">{{ item["title"] }}</h3>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>
