import { prisma } from 'lib/db';

const initialProducts = [
  {
    name: 'Capacete Darth Vader Replica',
    alt: 'Capacete em escala real do Darth Vader',
    price: 350,
    description: 'Replica oficial em escala 1:1 com acabamento premium e efeitos sonoros.',
    image: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806',
    category: 'star wars',
  },
  {
    name: 'Action Figure Grogu',
    alt: 'Miniatura do Grogu em sua cápsula',
    price: 120,
    description: 'Figura articulada de 20cm com detalhes pintados à mão e acessórios.',
    image: 'https://images.unsplash.com/photo-1601814933824-fd0b574dd592',
    category: 'star wars',
  },
  {
    name: 'Sabre de Luz Luke Skywalker',
    alt: 'Sabre de luz verde aceso',
    price: 280,
    description: 'Sabre de luz com lâmina LED verde e empunhadura em alumínio.',
    image: 'https://images.unsplash.com/photo-1579566346927-c68383817a25',
    category: 'star wars',
  },
  {
    name: 'PlayStation 5 Slim 1TB',
    alt: 'Console PlayStation 5 Slim branco com controle DualSense',
    price: 3800,
    description: 'Console de última geração com leitor de disco e SSD ultra-rápido.',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db',
    category: 'consoles',
  },
  {
    name: 'Nintendo Switch OLED',
    alt: 'Console Nintendo Switch OLED branco',
    price: 2200,
    description: 'Console híbrido com tela OLED de 7 polegadas e 64GB de memória interna.',
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e',
    category: 'consoles',
  },
  {
    name: 'Xbox Series X 1TB',
    alt: 'Console Xbox Series X preto com controle',
    price: 3600,
    description: 'Console de alto desempenho projetado para jogos em 4K nativo.',
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d',
    category: 'consoles',
  },
  {
    name: 'Desk Mat Feltro',
    alt: 'Mousepad grande de feltro cinza escuro em mesa de madeira',
    price: 85,
    description: 'Base para mesa em feltro sintético antiderrapante no tamanho 90x40cm.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
    category: 'outros',
  },
  {
    name: 'Suporte Headset Alumínio',
    alt: 'Suporte para fone de ouvido em alumínio anodizado preto',
    price: 95,
    description: 'Suporte universal para headphones com base emborrachada e design moderno.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
    category: 'outros',
  },
  {
    name: 'Luminária LED RGB Modulares',
    alt: 'Paineis luminosos hexagonais coloridos na parede',
    price: 190,
    description: 'Kit com painéis modulares touch para iluminação decorativa de ambiente gamer.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    category: 'outros',
  },
];

async function seedDatabase() {
  await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: initialProducts,
  });
}

async function main() {
  try {
    await seedDatabase();
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
