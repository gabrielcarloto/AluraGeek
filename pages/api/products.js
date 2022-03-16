const starWarsProducts = [
  {
    id: 1,
    name: 'Caneca Stormtrooper',
    price: 'R$ 60,00',
    image: 'https://images.unsplash.com/photo-1620138694717-07141b500f57?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
    alt: 'Caneca Stormtrooper'
  },
  {
    id: 2,
    name: 'Lego Darth Vader',
    price: 'R$ 60,00',
    image: 'https://images.unsplash.com/photo-1620950127852-92592960e363?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
    alt: 'Lego Darth Vader'
  },
  {
    id: 3,
    name: 'Boneco Yoda',
    price: 'R$ 60,00',
    image: 'https://images.unsplash.com/photo-1599002762948-19068b069803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1122&q=80',
    alt: 'Boneco Yoda'
  },
  {
    id: 4,
    name: 'Cosplay Stormtrooper',
    price: 'R$ 60,00',
    image: 'https://images.unsplash.com/photo-1599719500956-d158a26ab3ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    alt: 'Cosplay Stormtrooper'
  },
  {
    id: 5,
    name: 'Boneco Baby Yoda',
    price: 'R$ 60,00',
    image: 'https://images.unsplash.com/photo-1601814933824-fd0b574dd592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80',
    alt: 'Boneco Baby Yoda'
  },
  {
    id: 6,
    name: 'Cosplay Kylo Ren',
    price: 'R$ 60,00',
    image: 'https://images.unsplash.com/photo-1591927675938-b81b071d3e91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Cosplay Kylo Ren'
  },
]

const consoleProducts = [
  {
    id: 1,
    name: 'Controle Xbox',
    price: 'R$ 60,00',
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    alt: 'Controle Xbox'
  },
  {
    id: 2,
    name: 'Playstation 5 e Controle',
    price: 'R$ 60,00',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
    alt: 'Playstation 5 e Controle'
  },
  {
    id: 3,
    name: 'Nintendinho',
    price: 'R$ 60,00',
    image: 'https://images.unsplash.com/photo-1533702165324-66678e2069b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Nintendinho'
  },
  {
    id: 4,
    name: 'Par de Joy-Cons',
    price: 'R$ 60,00',
    image: 'https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Par de Joy-Cons'
  },
  {
    id: 5,
    name: 'Xbox Series X',
    price: 'R$ 60,00',
    image: 'https://images.unsplash.com/photo-1621259182181-1ccb9ec306cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1512&q=80',
    alt: 'Xbox Series X'
  },
  {
    id: 6,
    name: 'Game Boy Color',
    price: 'R$ 60,00',
    image: 'https://images.unsplash.com/photo-1577583113753-ca7e95d1bdc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Game Boy Color'
  },
]

const otherProducts = [
  {
    id: 1,
    name: 'Camisa Atari',
    price: 'R$ 60,00',
    image: 'https://images.unsplash.com/photo-1589021818993-a1223f8f0f04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1045&q=80',
    alt: 'Camisa Atari'
  },
  {
    id: 2,
    name: 'Camisa SNES',
    price: 'R$ 60,00',
    image: 'https://images.unsplash.com/photo-1554410637-1a8267402b57?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Camisa SNES'
  },
  {
    id: 3,
    name: 'Boneco Sonic',
    price: 'R$ 60,00',
    image: 'https://images.unsplash.com/photo-1550747545-c896b5f89ff7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80',
    alt: 'Boneco Sonic'
  },
  {
    id: 4,
    name: 'Seja lá o que é isso',
    price: 'R$ 60,00',
    image: 'https://images.unsplash.com/photo-1611946258523-9c2bfabb94e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1071&q=80',
    alt: 'Produto XYZ'
  },
  {
    id: 5,
    name: 'Óculos VR',
    price: 'R$ 60,00',
    image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    alt: 'Óculos VR'
  },
  {
    id: 6,
    name: 'Pikachu ENORME',
    price: 'R$ 60,00',
    image: 'https://images.unsplash.com/photo-1609372332255-611485350f25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    alt: 'Pikachu ENORME'
  },
]

export { starWarsProducts, consoleProducts, otherProducts };