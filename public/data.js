
// Datos semilla (puedes editar o ampliar)
const SEED_DEVICES = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    brand: "Apple",
    type: "Celular",
    releaseDate: "2023-09-22",
    price: 5499900,
    description: "Pantalla OLED 6.1\" 120Hz, Chip A17 Pro, cámara 48MP, USB‑C, titanio.",
    images: ["Imagenes/iPhone 15 Pro.png"],
    specs: {
      pantalla: "6.1\" OLED 120Hz",
      procesador: "A17 Pro",
      ram: "8 GB",
      almacenamiento: "128/256/512GB",
      bateria: "3274 mAh",
      so: "iOS"
    }
  },
  {
    id: 2,
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    type: "Celular",
    releaseDate: "2024-01-24",
    price: 5899900,
    description: "Pantalla 6.8\" AMOLED 120Hz, Snapdragon 8 Gen 3, S‑Pen, cámaras 200MP.",
    images: ["Imagenes/Galaxy S24 Ultra.png"],
    specs: {
      pantalla: "6.8\" AMOLED 120Hz",
      procesador: "Snapdragon 8 Gen 3",
      ram: "12 GB",
      almacenamiento: "256/512GB",
      bateria: "5000 mAh",
      so: "Android"
    }
  },
  {
    id: 3,
    name: "MacBook Air M3 13\"",
    brand: "Apple",
    type: "Portátil",
    releaseDate: "2024-03-08",
    price: 6699900,
    description: "Portátil ultraligero con chip M3, 8‑core GPU, 8GB RAM, 256GB SSD.",
    images: ["Imagenes/MacBook Air M3 13.png"],
    specs: {
      pantalla: "13.6\" Liquid Retina",
      procesador: "Apple M3",
      ram: "8 GB",
      almacenamiento: "256 GB SSD",
      bateria: "18 h",
      so: "macOS"
    }
  },
  {
    id: 4,
    name: "ASUS ROG Zephyrus G14 (2024)",
    brand: "ASUS",
    type: "Portátil",
    releaseDate: "2024-02-10",
    price: 7999900,
    description: "Gaming 14\" OLED, Ryzen 9, RTX 4070, 16GB RAM, 1TB SSD.",
    images: ["Imagenes/ASUS ROG Zephyrus G14 (2024).png"],
    specs: {
      pantalla: "14\" OLED 120Hz",
      procesador: "Ryzen 9",
      ram: "16 GB",
      almacenamiento: "1 TB SSD",
      bateria: "76 Wh",
      so: "Windows 11"
    }
  },
  {
    id: 5,
    name: "iPad Air (M2)",
    brand: "Apple",
    type: "Tablet",
    releaseDate: "2024-05-15",
    price: 3499900,
    description: "Pantalla 11\" Liquid Retina, chip M2, compatible con Apple Pencil Pro.",
    images: ["Imagenes/iPad Air (M2).png"],
    specs: {
      pantalla: "11\" 60Hz",
      procesador: "Apple M2",
      ram: "8 GB",
      almacenamiento: "128/256GB",
      bateria: "28.6 Wh",
      so: "iPadOS"
    }
  },
  {
    id: 6,
    name: "Pixel 8",
    brand: "Google",
    type: "Celular",
    releaseDate: "2023-10-12",
    price: 2999900,
    description: "Tensor G3, cámaras computacionales, 7 años de actualizaciones.",
    images: ["Imagenes/Pixel 8.png"],
    specs: {
      pantalla: "6.2\" OLED 120Hz",
      procesador: "Google Tensor G3",
      ram: "8 GB",
      almacenamiento: "128/256GB",
      bateria: "4575 mAh",
      so: "Android"
    }
  },
  {
    id: 7,
    name: "Galaxy Tab S9",
    brand: "Samsung",
    type: "Tablet",
    releaseDate: "2023-08-11",
    price: 2899900,
    description: "AMOLED 11\", Snapdragon 8 Gen 2, S‑Pen incluido, IP68.",
    images: ["Imagenes/Galaxy Tab S9.png"],
    specs: {
      pantalla: "11\" AMOLED 120Hz",
      procesador: "Snapdragon 8 Gen 2",
      ram: "8 GB",
      almacenamiento: "128/256GB",
      bateria: "8400 mAh",
      so: "Android"
    }
  },
  {
    id: 8,
    name: "Apple Watch Series 9",
    brand: "Apple",
    type: "Smartwatch",
    releaseDate: "2023-09-22",
    price: 1799900,
    description: "Chip S9, pantalla brillante, seguimiento de salud, gestos de doble toque.",
    images: ["Imagenes/Apple Watch Series 9.png"],
    specs: {
      pantalla: "1.9\" OLED",
      procesador: "Apple S9",
      ram: "1 GB",
      almacenamiento: "64GB",
      bateria: "308 mAh",
      so: "watchOS"
    }
  }
];
