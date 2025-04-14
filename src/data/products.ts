import decorbgImage from '../assets/categories/decorbg.webp';
import furnitureImage from '../assets/categories/furniture.webp';
import electronicsImage from '../assets/categories/electronics.webp';
import clockImage from '../assets/categories/Clock.jpeg';

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    rating: number;
    reviews: number;
    inStock: boolean;
    images: string[];
}
  
  export const products: Product[] = [
    {
      id: 1,
        name: "Vintage Wall Clock",
        price: 1499,
        description: "Elegant vintage wall clock with a rustic finish, perfect for any room.",
        category: "Home Decor",
        rating: 4.2,
        reviews: 128,
        inStock: true,
        images: [
            clockImage, 
            "https://placehold.co/500x500/333/e1e1e1?text=Clock+View+2",
            "https://placehold.co/500x500/333/e1e1e1?text=Clock+View+3"
        ]
    },
    {
        id: 2,
        name: "Modern Sofa",
        price: 29999,
        description: "Contemporary 3-seater sofa with premium fabric and ergonomic design.",
        category: "Furniture",
        rating: 4.6,
        reviews: 45,
        inStock: true,
        images: [
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=500&h=500&fit=crop"
        ]
    },
    {
        id: 3,
        name: "Wireless Bluetooth Headphones",
        price: 2499,
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
        category: "Electronics",
        rating: 4.5,
        reviews: 120,
        inStock: true,
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop"
        ]
    },
    {
        id: 4,
        name: "Minimalist Coffee Table",
        price: 4999,
        description: "Sleek coffee table with glass top and wooden base.",
        category: "Furniture",
        rating: 4.3,
        reviews: 67,
        inStock: true,
        images: [
            "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1532372320572-cda25653a694?w=500&h=500&fit=crop"
        ]
    },
    {
        id: 5,
        name: "Decorative Throw Pillows",
        price: 799,
        description: "Set of 2 decorative throw pillows with modern patterns.",
        category: "Home Decor",
        rating: 4.1,
        reviews: 78,
        inStock: true,
        images: [
            "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&h=500&fit=crop",
            "https://via.placeholder.com/500x500/cccccc/969696?text=Pillow+View+2",
            "https://via.placeholder.com/500x500/cccccc/969696?text=Pillow+Set"
        ]
    },
    {
        id: 6,
        name: "Smart LED TV",
        price: 34999,
        description: "55-inch 4K Ultra HD Smart LED TV with HDR.",
        category: "Electronics",
        rating: 4.8,
        reviews: 256,
        inStock: true,
        images: [
            "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&h=500&fit=crop"
        ]
    },
    {
        id: 7,
        name: "Desk Lamp",
        price: 999,
        description: "Modern LED desk lamp with adjustable brightness and color temperature.",
        category: "Home Decor",
        rating: 4.4,
        reviews: 92,
        inStock: true,
        images: [
            "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSVDWteUW55BYbzWRyFOIBwL0OVgmnx3_P5IWPwW-Cq2j7Zimo5JPzxu0IhXDkhtWrS44UU8xBftyE86KycBfL-UQByEtAo2rDnBb5usQ30",
            "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSeR0y2FLOJ7duPvDFZUUVpoWmG5vhWv3GEX6LhF8Bt-JatuG7KXmPxwTtVBO5v6MFtC-QtmVocx0LCsRabIPQJh2fIy3zgIuv_nZCq_GGoDh1Sb5XIU4z3",
            "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRHalFViaNIoOnoJGxk_Pu2O6rBDnA4pKQ-SURLFLapT7iNNoCHabLYX34nflNkoy01EdC6okXX58tUMLi8p-PEjqQCT0fIcyHhuYWiFVYOlFvUB2Ez3-xzgw"
        ]
    },
    {
        id: 8,
        name: "Dining Table Set",
        price: 24999,
        description: "6-seater dining table set with matching chairs.",
        category: "Furniture",
        rating: 4.7,
        reviews: 85,
        inStock: true,
        images: [
            "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&h=500&fit=crop"
        ]
    },
    {
        id: 9,
        name: "Artificial Plants",
        price: 599,
        description: "Set of 3 artificial plants in decorative pots.",
        category: "Home Decor",
        rating: 4.0,
        reviews: 110,
        inStock: true,
        images: [
            "https://images.unsplash.com/photo-1602923668104-8f9e03e77e62?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1602923668104-8f9e03e77e62?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1602923668104-8f9e03e77e62?w=500&h=500&fit=crop"
        ]
    },
    {
        id: 10,
        name: "Bookshelf",
        price: 6999,
        description: "Modern 5-tier bookshelf with metal frame.",
        category: "Furniture",
        rating: 4.5,
        reviews: 65,
        inStock: true,
        images: [
            "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&h=500&fit=crop"
        ]
    },
    {
        id: 11,
        name: "Boho Macramé Wall Hanging",
        price: 999,
        description: "Handcrafted macramé wall hanging with tassels and bohemian design.",
      category: "Home Decor",
        rating: 4.6,
        reviews: 42,
        inStock: true,
        images: [
            "https://images.unsplash.com/photo-1596796930385-0885a029049b?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1596796930385-0885a029049b?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1596796930385-0885a029049b?w=500&h=500&fit=crop"
        ]
    },
    {
        id: 12,
        name: "Smart Speaker",
      price: 3499,
        description: "Voice-controlled smart speaker with premium sound quality.",
        category: "Electronics",
        rating: 4.8,
        reviews: 67,
        inStock: true,
        images: [
            "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&h=500&fit=crop"
        ]
    },
    {
        id: 13,
        name: "Modern Floor Lamp",
        price: 2999,
        description: "Contemporary floor lamp with adjustable height and direction.",
        category: "Home Decor",
        rating: 4.4,
        reviews: 89,
        inStock: true,
        images: [
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop"
        ]
    }
  ];
  