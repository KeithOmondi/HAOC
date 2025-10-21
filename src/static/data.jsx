// Nav Data for Eyeglasses Shop
export const navData = [
  {
    title: "Home",
    url: "/"
  },
  {
    title: "Events",
    url: "/events"
  },
  {
    title: "Services",
    url: "/services"
  },
  {
    title: "Our Listings",
    url: "/listings"
  },
  {
    title: "Company",
    children: [
      {
        title: "About Us",
        url: "/about"
      },
      {
        title: "Blogs",
        url: "/blogs"
      },
      {
        title: "Careers",
        url: "/career"
      },
      {
        title: "Contact",
        url: "/contact"
      }
    ]
  }
];

  
  
  // Categories Data for Eyeglasses Shop
  export const categoriesData = [
  {
    id: 1,
    title: "Bedsitter",
    subTitle: "Affordable single-room living spaces ideal for one person.",
    image_Url: "https://www.eazzyrent.com/propertyimages/0006241001.jpg",
  },
  {
    id: 2,
    title: "1 Bedroom",
    subTitle: "Spacious and private apartments perfect for individuals or couples.",
    image_Url: "https://as1.ftcdn.net/v2/jpg/08/86/75/28/1000_F_886752837_gDeEorY9g0vrQe4h0T44YTWQ4O2tNjWg.jpg",
  },
  {
    id: 3,
    title: "2 Bedroom",
    subTitle: "Comfortable family-sized units with modern amenities.",
    image_Url: "https://t4.ftcdn.net/jpg/14/19/07/99/240_F_1419079980_YnYCcEEqp9Wj8lrURiSnzgDvdoLA7raw.jpg",
  },
  {
    id: 4,
    title: "3 Bedroom",
    subTitle: "Spacious homes ideal for families or shared living.",
    image_Url: "https://as2.ftcdn.net/v2/jpg/14/81/12/77/1000_F_1481127734_3iObZLE95yDzb07BETdQQtTAbcOoO3Z3.jpg",
  },
  {
    id: 5,
    title: "Maisonette",
    subTitle: "Two-story residences offering more privacy and space.",
    image_Url: "https://t4.ftcdn.net/jpg/14/91/35/87/240_F_1491358713_9uJI4HUg3Ns7exvmKF8CWZjHKPkoGwKb.jpg",
  },
  {
    id: 6,
    title: "Apartment",
    subTitle: "Modern high-rise or low-rise apartments with shared amenities.",
    image_Url: "https://as2.ftcdn.net/v2/jpg/11/09/40/23/1000_F_1109402318_88CpRgeP2jMDa9RgTguJbaw2y39jPnL4.jpg",
  },
  {
    id: 7,
    title: "Bungalow",
    subTitle: "Single-floor family houses with yard space.",
    image_Url: "https://t3.ftcdn.net/jpg/03/92/14/30/240_F_392143036_9pLBCZjMpkslgJxyL2YpJZhAy0ns5A35.jpg",
  },
  {
    id: 8,
    title: "Plot / Land",
    subTitle: "Ideal for development or investment.",
    image_Url: "https://t4.ftcdn.net/jpg/11/19/78/19/240_F_1119781987_m2x4z2suEfq2Mn2tVPX8TVFiYdFHcc5C.jpg",
  },
  {
    id: 9,
    title: "Commercial Property",
    subTitle: "Shops, offices, and business spaces for rent or sale.",
    image_Url: "https://as1.ftcdn.net/v2/jpg/11/48/67/56/1000_F_1148675607_lM2s98PleGMfYppEFliVxpEHZDj7Qv0A.jpg",
  },
  {
    id: 10,
    title: "Luxury Homes",
    subTitle: "High-end properties with premium finishes and locations.",
    image_Url: "https://t4.ftcdn.net/jpg/01/66/71/15/240_F_166711543_nXdw2cSQO0H00YnBkcOQNZpJc01YIAww.jpg",
  },
];


  // Product Data
  export const productData = [
  {
    id: 1,
    category: "1 Bedroom",
    name: "Modern 1 Bedroom Apartment",
    description: "A sleek 1-bedroom apartment in Kilimani with open-plan kitchen and city views.",
    location: "Kilimani, Nairobi",
    image_Url: [
      {
        public_id: "apt1",
        url: "https://example.com/images/1bed-kilimani-1.jpg",
      },
      {
        public_id: "apt2",
        url: "https://example.com/images/1bed-kilimani-2.jpg",
      },
    ],
    shop: {
      name: "Urban Estates Ltd",
      shop_avatar: {
        public_id: "agent1",
        url: "https://example.com/images/urban-estates-logo.jpg",
      },
      ratings: 4.7,
    },
    price: 45000, // Monthly rent or sale price
    discount_price: 42000, // Optional for deals
    rating: 4.5,
    total_sell: 12, // Total rented or sold
    stock: 3, // Units available
  },
  {
    id: 2,
    category: "Plot / Land",
    name: "1/8 Acre Plot for Sale",
    description: "Prime residential plot in Ruiru ideal for immediate development.",
    location: "Ruiru, Kiambu",
    image_Url: [
      {
        public_id: "plot1",
        url: "https://example.com/images/plot-ruiru.jpg",
      },
    ],
    shop: {
      name: "Plot Masters",
      shop_avatar: {
        public_id: "agent2",
        url: "https://example.com/images/plot-masters-logo.jpg",
      },
      ratings: 4.6,
    },
    price: 1200000,
    discount_price: 1100000,
    rating: 4.9,
    total_sell: 50,
    stock: 20,
  },
  {
    id: 3,
    category: "Maisonette",
    name: "4 Bedroom Maisonette with SQ",
    description: "Luxurious 4-bedroom maisonette with a DSQ and parking for two in Syokimau.",
    location: "Syokimau, Nairobi",
    image_Url: [
      {
        public_id: "maisonette1",
        url: "https://example.com/images/maisonette-syokimau.jpg",
      },
    ],
    shop: {
      name: "Dream Homes KE",
      shop_avatar: {
        public_id: "agent3",
        url: "https://example.com/images/dream-homes.jpg",
      },
      ratings: 4.8,
    },
    price: 14500000,
    discount_price: 14000000,
    rating: 4.7,
    total_sell: 8,
    stock: 1,
  },
  // Add more properties...
];

  

// Slider Data
export const sliderData = [
  {
    image: "https://res.cloudinary.com/drls2cpnu/image/upload/v1746010482/Banner_USP_2_C_dhwcs3.webp",
    title: "Explore Premium Interior Pieces",
    subtitle: "Upgrade your home with luxury furniture at unbeatable prices.",
  },
  {
    image: "https://optica.africa/cdn/shop/files/Banner_2_1.jpg?v=1744181847",
    title: "Quality Meets Style",
    subtitle: "Find the perfect blend of comfort and elegance.",
  },
  {
    image: "https://optica.africa/cdn/shop/files/Banner_1_1.jpg?v=1744181846",
    title: "Timeless Design",
    subtitle: "Bring modern aesthetics to your space.",
  },
];

export const allEvents = [
  {
    id: 1,
    title: 'Spring Music Festival',
    date: '2025-05-01',
    description: 'Join us for a day of live music, food, and fun!',
    image: 'https://optica.africa/cdn/shop/collections/optica_eyewear.png?height=500&v=1739534180',
    originalPrice: 50,
    discountPrice: 30,
    sold_out: 120,
    Finish_Date: '2025-05-05',
  },
  {
    id: 2,
    title: 'Tech Conference 2025',
    date: '2025-06-15',
    description: 'Explore the latest in tech and innovation.',
    image: 'https://optica.africa/cdn/shop/collections/Toni_Valencia_sunglasses.png?height=500&v=1739545321',
    originalPrice: 100,
    discountPrice: 70,
    sold_out: 200,
    Finish_Date: '2025-06-18',
  },
  {
      id: 2,
      title: 'Tech Conference 2025',
      date: '2025-06-15',
      description: 'Explore the latest in tech and innovation.',
      image: 'https://optica.africa/cdn/shop/collections/Toni_Valencia_sunglasses.png?height=500&v=1739545321',
      originalPrice: 100,
      discountPrice: 70,
      sold_out: 200,
      Finish_Date: '2025-06-18',
    },
    
];