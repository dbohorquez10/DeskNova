/* ═════════════════════════════════════════════════════════════════════
   DESKNOVA — app.js  (Refactorizado · COP · 30 Productos · Scroll Fix)
   Frontend Vanilla JavaScript para Tienda Boutique DTC de Periféricos
   - Catálogo Extenso (30 Productos con precios en COP)
   - Validación Estricta de Misma Categoría en Comparación (RF002)
   - Checkout con scroll corregido y 3 Pasos Secuenciales (RF005)
   - SPA con Vistas Separadas (Landing vs Catálogo), Auth, Zoom y LocalStorage.
   ═════════════════════════════════════════════════════════════════════ */
'use strict';

// ─── CONFIGURACIÓN GLOBAL ───────────────────────────────────────────
const CONFIG = {
  CART_STORAGE_KEY: 'desknova_cart_v2',
  AUTH_STORAGE_KEY: 'desknova_auth_session',
  FREE_SHIPPING_THRESHOLD: 500000, // $500.000 COP
};

// ─── FORMATEADOR OFICIAL DE MONEDA: PESOS COLOMBIANOS (COP) ─────────
const formatCOP = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// ─── CATÁLOGO EXTENSO (30 Periféricos y Accesorios Premium — COP) ───
const PRODUCTS = [
  // ── TECLADOS (6 Productos) ──
  {
    id: 1,
    name: 'Keychron Q1 Pro Wireless Custom',
    brand: 'Keychron',
    category: 'teclados',
    price: 849000,
    originalPrice: 979000,
    sensor: 'Switches Mecánicos K Pro Banana (Hot-Swap)',
    connection: 'Tri-modo (Bluetooth 5.1 / Cable USB-C)',
    inStock: true,
    rating: 4.9,
    reviews: 84,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
    description: 'Chasis completo de aluminio CNC mecanizado con diseño gasket mount de doble amortiguación. Experiencia acústica y táctil de grado audiófilo para tecleo continuo.',
    dimensions: '327.5 × 145 × 35.8 mm / 1.730 g',
    battery: 'Batería 4000 mAh (Hasta 300 horas continuas)',
    compatibility: 'macOS, Windows 10/11, Linux, iPadOS'
  },
  {
    id: 2,
    name: 'SteelSeries Apex Pro TKL Wireless',
    brand: 'SteelSeries',
    category: 'teclados',
    price: 1069000,
    originalPrice: 1199000,
    sensor: 'OmniPoint 2.0 Magnético (Actuación Hall Effect 0.1mm - 4.0mm)',
    connection: 'Inalámbrico 2.4GHz (Quantum 2.0) + Bluetooth 5.0',
    inStock: true,
    rating: 4.9,
    reviews: 62,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=80',
    description: 'El teclado con el tiempo de respuesta más veloz del planeta. Permite programar dos acciones en una misma tecla según la profundidad de pulsación gracias a sus sensores magnéticos.',
    dimensions: '355 × 128 × 42 mm / 960 g',
    battery: 'Hasta 40 horas con iluminación completa',
    compatibility: 'Windows, macOS, Xbox, PlayStation'
  },
  {
    id: 3,
    name: 'Keychron K3 Ultra-Slim Mecánico V2',
    brand: 'Keychron',
    category: 'teclados',
    price: 379000,
    originalPrice: 449000,
    sensor: 'Switches Ópticos de Perfil Bajo Red Lineales',
    connection: 'Bluetooth 5.1 + Cable USB-C',
    inStock: true,
    rating: 4.6,
    reviews: 88,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80',
    description: 'Teclado mecánico ultrafino del 75% con cuerpo de aluminio reforzado. Diseñado ergonómicamente para una postura neutra de muñecas sin reposamanos.',
    dimensions: '306 × 116 × 22 mm / 396 g',
    battery: 'Hasta 34 horas continuas de uso',
    compatibility: 'macOS, Windows, iOS, Android'
  },
  {
    id: 4,
    name: 'Logitech G915 LIGHTSPEED Wireless',
    brand: 'Logitech',
    category: 'teclados',
    price: 979000,
    originalPrice: 1069000,
    sensor: 'Switches GL Mecánicos de Perfil Bajo Táctil',
    connection: 'Inalámbrico 2.4GHz (LIGHTSPEED) + Bluetooth',
    inStock: true,
    rating: 4.8,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
    description: 'Diseño ultrafino de aluminio cepillado con controles multimedia dedicados y rueda de volumen ergonómica de precisión.',
    dimensions: '475 × 150 × 22 mm / 1.025 g',
    battery: 'Hasta 30 horas con brillo al 100%',
    compatibility: 'Windows 10/11, macOS, ChromeOS'
  },
  {
    id: 5,
    name: 'NuPhy Air75 V2 Low-Profile Custom',
    brand: 'NuPhy',
    category: 'teclados',
    price: 589000,
    originalPrice: null,
    sensor: 'Switches Gateron Low-Profile Cowberry Lubricados',
    connection: 'Tri-modo (2.4GHz / Bluetooth 5.1 / USB-C)',
    inStock: true,
    rating: 4.9,
    reviews: 93,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=80',
    description: 'Tasa de sondeo de 1000Hz por 2.4GHz, keycaps PBT de doble inyección y placas acústicas de silicona integradas.',
    dimensions: '316.4 × 132.5 × 13.5 mm / 598 g',
    battery: 'Batería 4000 mAh (Hasta 220 horas)',
    compatibility: 'macOS, Windows, Linux, iOS'
  },
  {
    id: 6,
    name: 'Ducky One 3 RGB TKL Hot-Swap',
    brand: 'Ducky',
    category: 'teclados',
    price: 509000,
    originalPrice: null,
    sensor: 'Switches Cherry MX Silent Red Lubricados',
    connection: 'Cableado USB-C Desmontable',
    inStock: false,
    rating: 4.7,
    reviews: 51,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80',
    description: 'Arquitectura acústica QUACK Mechanics con amortiguación de EVA multicapa y estabilizadores lubricados a mano.',
    dimensions: '370 × 140 × 40 mm / 908 g',
    battery: 'Alimentación directa por cable trenzado',
    compatibility: 'Windows 10/11, macOS, Linux'
  },

  // ── RATONES (6 Productos) ──
  {
    id: 7,
    name: 'Logitech MX Master 3S Performance',
    brand: 'Logitech',
    category: 'ratones',
    price: 429000,
    originalPrice: 509000,
    sensor: 'Darkfield Alta Precisión 8.000 DPI (Funciona sobre cristal)',
    connection: 'Inalámbrico 2.4GHz (Logi Bolt) + Bluetooth',
    inStock: true,
    rating: 4.8,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
    description: 'Silencio táctil con clics amortiguados en un 90% y rueda de desplazamiento MagSpeed electromagnética capaz de recorrer 1.000 líneas por segundo.',
    dimensions: '124.9 × 84.3 × 51 mm / 141 g',
    battery: 'Hasta 70 días con carga completa USB-C',
    compatibility: 'Windows, macOS, iPadOS, ChromeOS, Linux'
  },
  {
    id: 8,
    name: 'Logitech G PRO X Superlight 2',
    brand: 'Logitech',
    category: 'ratones',
    price: 679000,
    originalPrice: 769000,
    sensor: 'HERO 2 de Próxima Gen (32.000 DPI, >500 IPS, 44G)',
    connection: 'Inalámbrico 2.4GHz (LIGHTSPEED 4K Polling)',
    inStock: true,
    rating: 5.0,
    reviews: 147,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=80',
    description: 'Switches híbridos óptico-mecánicos LIGHTFORCE con latencia cero y un peso pluma de tan solo 60 gramos.',
    dimensions: '125 × 63.5 × 40 mm / 60 g',
    battery: 'Hasta 95 horas continuas de juego',
    compatibility: 'Windows 10/11'
  },
  {
    id: 9,
    name: 'Razer DeathAdder V3 Pro Esports',
    brand: 'Razer',
    category: 'ratones',
    price: 639000,
    originalPrice: null,
    sensor: 'Focus Pro 30K Óptico (30.000 DPI, 750 IPS, 70G)',
    connection: 'Inalámbrico 2.4GHz (HyperSpeed) + USB-C',
    inStock: false,
    rating: 4.7,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?auto=format&fit=crop&w=900&q=80',
    description: 'Silueta ergonómica refinada junto a atletas profesionales de esports. Estructura ultraligera de 63 gramos con switches ópticos Gen-3.',
    dimensions: '128 × 68 × 44 mm / 63 g',
    battery: 'Hasta 90 horas de autonomía',
    compatibility: 'Windows 10/11'
  },
  {
    id: 10,
    name: 'Zowie EC2-CW Wireless Esports',
    brand: 'Zowie',
    category: 'ratones',
    price: 639000,
    originalPrice: null,
    sensor: 'PixArt 3370 Óptico Puro (3.200 DPI nativo sin aceleración)',
    connection: 'Inalámbrico 2.4GHz con receptor base mejorado',
    inStock: true,
    rating: 4.8,
    reviews: 77,
    image: 'https://images.unsplash.com/photo-1586952518485-11b180e92764?auto=format&fit=crop&w=900&q=80',
    description: 'Diseño asimétrico ergonómico clásico de Zowie ahora con base transmisora independiente contra interferencias en competiciones.',
    dimensions: '123 × 65 × 42 mm / 77 g',
    battery: 'Hasta 70 horas continuas',
    compatibility: 'Plug & Play compatible con Windows, Mac, Linux'
  },
  {
    id: 11,
    name: 'Pulsar X2V2 Wireless Mini',
    brand: 'Pulsar',
    category: 'ratones',
    price: 429000,
    originalPrice: 469000,
    sensor: 'PixArt PAW3395 Óptico (26.000 DPI, 650 IPS)',
    connection: 'Inalámbrico 2.4GHz + Cable USB-C Superflex',
    inStock: true,
    rating: 4.8,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
    description: 'Estructura simétrica de 51 gramos con switches ópticos a prueba de clics accidentales y codificador Pulsar Blue.',
    dimensions: '115.6 × 60.6 × 36.6 mm / 51 g',
    battery: 'Hasta 100 horas de uso',
    compatibility: 'Windows, macOS, Linux'
  },
  {
    id: 12,
    name: 'Lamzu Atlantis OG V2 4K Pro',
    brand: 'Lamzu',
    category: 'ratones',
    price: 469000,
    originalPrice: null,
    sensor: 'PixArt 3395 con Dongle 4000Hz Polling',
    connection: 'Inalámbrico 2.4GHz (4K Hz) + USB-C',
    inStock: true,
    rating: 4.9,
    reviews: 82,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=80',
    description: 'Curvatura trasera diseñada específicamente para agarre en garra (claw grip) y deslizadores 100% PTFE virgen.',
    dimensions: '123 × 66 × 38 mm / 55 g',
    battery: 'Hasta 70 horas (1000Hz) / 30 horas (4000Hz)',
    compatibility: 'Windows 10/11'
  },

  // ── AUDIO Y MICRÓFONOS (6 Productos) ──
  {
    id: 13,
    name: 'Audio-Technica ATH-M50xBT2 Studio',
    brand: 'Audio-Technica',
    category: 'audio',
    price: 849000,
    originalPrice: null,
    sensor: 'Transductores de apertura 45mm con imanes de tierras raras',
    connection: 'Bluetooth 5.0 (Códec LDAC / AAC) + Cable 3.5mm',
    inStock: true,
    rating: 4.9,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    description: 'Firma sonora de estudio profesional en un formato inalámbrico de alta fidelidad con aislamiento acústico pasivo extraordinario.',
    dimensions: 'Almohadillas circumaurales giratorias 90° / 307 g',
    battery: 'Hasta 50 horas continuas con carga rápida',
    compatibility: 'Universal (iOS, Android, macOS, Windows)'
  },
  {
    id: 14,
    name: 'Sony WH-1000XM5 Studio Edition',
    brand: 'Sony',
    category: 'audio',
    price: 1499000,
    originalPrice: 1699000,
    sensor: 'Procesador V1 + QN1 con 8 micrófonos Noise Cancelling',
    connection: 'Bluetooth 5.2 Multipunto + Cable 3.5mm',
    inStock: true,
    rating: 4.8,
    reviews: 184,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
    description: 'La máxima referencia mundial en cancelación activa de ruido. Audio inalámbrico de alta resolución LDAC para concentración absoluta.',
    dimensions: 'Diseño sin juntas pivotante / 250 g',
    battery: '30 horas continuas con ANC encendido',
    compatibility: 'iOS, Android, Windows, macOS'
  },
  {
    id: 15,
    name: 'Elgato Wave:3 Studio Microphone',
    brand: 'Elgato',
    category: 'audio',
    price: 639000,
    originalPrice: null,
    sensor: 'Cápsula condensador electret 17mm con tecnología Clipguard',
    connection: 'Cableado USB-C (Conversor analógico 24 bits / 96 kHz)',
    inStock: true,
    rating: 4.7,
    reviews: 114,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=80',
    description: 'Micrófono de condensador con mezclador digital Wave Link integrado. Protege contra picos y distorsiones en tiempo real.',
    dimensions: '153 × 66 × 40 mm / 280 g',
    battery: 'Alimentación USB directa',
    compatibility: 'Windows 10/11, macOS Monterey o posterior'
  },
  {
    id: 16,
    name: 'Shure MV7 USB/XLR Podcast Mic',
    brand: 'Shure',
    category: 'audio',
    price: 1069000,
    originalPrice: 1199000,
    sensor: 'Cápsula dinámica cardioide con aislamiento de voz',
    connection: 'Salida dual USB-A/C y XLR profesional',
    inStock: true,
    rating: 4.9,
    reviews: 97,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=80',
    description: 'Inspirado en el legendario SM7B. Panel táctil integrado para controlar ganancia, volumen de auriculares y monitoreo en directo.',
    dimensions: '164 × 90 × 153 mm / 550 g',
    battery: 'Alimentación por USB o Phantom Power XLR',
    compatibility: 'Windows, Mac, iOS, Android'
  },
  {
    id: 17,
    name: 'Beyerdynamic DT 770 PRO X Limited',
    brand: 'Beyerdynamic',
    category: 'audio',
    price: 849000,
    originalPrice: null,
    sensor: 'Drivers STELLAR.45 (Respuesta de frecuencia 5-40.000 Hz)',
    connection: 'Cable mini-XLR a jack 3.5mm desmontable',
    inStock: true,
    rating: 4.8,
    reviews: 73,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    description: 'Auriculares de estudio cerrados para producción crítica, edición y mezclas con almohadillas de terciopelo transpirables.',
    dimensions: 'Diadema de resorte de acero acolchada / 305 g',
    battery: 'Pasivo (No requiere baterías)',
    compatibility: 'Universal analógico con conector de 3.5mm/6.35mm'
  },
  {
    id: 18,
    name: 'Sennheiser HD 600 Audiophile Open',
    brand: 'Sennheiser',
    category: 'audio',
    price: 1369000,
    originalPrice: 1699000,
    sensor: 'Sistemas magnéticos optimizados por ordenador (Impedancia 300 Ω)',
    connection: 'Cable de cobre OFC desmontable de 3 metros',
    inStock: false,
    rating: 5.0,
    reviews: 130,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
    description: 'El estándar de oro en fidelidad sonora audiófila con diseño acústico abierto que genera un escenario sonoro espacioso y transparente.',
    dimensions: 'Circumaural abierto / 260 g',
    battery: 'Pasivo de alta impedancia',
    compatibility: 'Equipos con amplificador dedicado o interfaces de audio'
  },

  // ── MONITORES (4 Productos) ──
  {
    id: 19,
    name: 'Dell UltraSharp 27" 4K Hub (U2723QE)',
    brand: 'Dell',
    category: 'monitores',
    price: 2479000,
    originalPrice: 2699000,
    sensor: 'Panel IPS Black 4K UHD (Contraste 2000:1, 100% sRGB)',
    connection: 'Cableado USB-C (90W Power Delivery) + DP 1.4 + HDMI 2.0',
    inStock: true,
    rating: 4.9,
    reviews: 73,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
    description: 'Negros dos veces más profundos con la tecnología IPS Black. Hub universal que transmite vídeo, datos Ethernet y 90W de energía por un solo cable.',
    dimensions: '27 pulgadas (611.4 × 385.2 × 185 mm con base)',
    battery: 'Alimentación directa 100-240V AC',
    compatibility: 'macOS, Windows, Linux con soporte 4K 60Hz'
  },
  {
    id: 20,
    name: 'BenQ MOBIUZ EX2710Q 165Hz IPS',
    brand: 'BenQ',
    category: 'monitores',
    price: 1499000,
    originalPrice: null,
    sensor: 'Panel IPS QHD 2K 165Hz (1ms MPRT, HDRi inteligente)',
    connection: 'DisplayPort 1.4 + 2x HDMI 2.0 + Hub USB 3.0',
    inStock: true,
    rating: 4.7,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
    description: 'Calidad cinematográfica con tecnología de audio treVolo de 2.1 canales integrada con subwoofer de 5W y cobertura 95% DCI-P3.',
    dimensions: '27 pulgadas / 7.4 kg con base ergonómica',
    battery: 'Alimentación directa AC',
    compatibility: 'PC, Mac, PS5, Xbox Series X'
  },
  {
    id: 21,
    name: 'LG UltraFine 32" 4K Ergo USB-C',
    brand: 'LG',
    category: 'monitores',
    price: 2139000,
    originalPrice: 2349000,
    sensor: 'Panel IPS 4K UHD con Brazo Ergonómico C-Clamp',
    connection: 'Cableado USB-C (60W PD) + HDMI + DisplayPort',
    inStock: true,
    rating: 4.8,
    reviews: 58,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
    description: 'Soporte Ergo flexible que permite extender, retraer, girar, pivotar e inclinar el monitor para una postura de trabajo óptima.',
    dimensions: '31.5 pulgadas con brazo articulado de mesa',
    battery: 'Alimentación directa AC',
    compatibility: 'macOS, Windows con salida 4K'
  },
  {
    id: 22,
    name: 'ASUS ProArt Display 27" Calibrado',
    brand: 'ASUS',
    category: 'monitores',
    price: 1839000,
    originalPrice: null,
    sensor: 'Panel IPS 100% sRGB / Rec. 709 con Delta E < 2',
    connection: 'Cableado USB-C (65W) + DisplayPort + HDMI',
    inStock: true,
    rating: 4.9,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
    description: 'Verificado por Calman para garantizar fidelidad cromática absoluta en edición de fotografía, arquitectura y diseño gráfico.',
    dimensions: '27 pulgadas (2560 × 1440 WQHD) / 7.6 kg',
    battery: 'Alimentación eléctrica directa',
    compatibility: 'Windows, macOS compatible con calibración ProArt'
  },

  // ── ILUMINACIÓN (2 Productos) ──
  {
    id: 23,
    name: 'BenQ ScreenBar Halo Ambient Light',
    brand: 'BenQ',
    category: 'iluminacion',
    price: 769000,
    originalPrice: null,
    sensor: 'Sensor de luz ambiental inteligente ultrapreciso integrado',
    connection: 'Inalámbrico 2.4GHz (Dial táctil rotatorio) + USB-A',
    inStock: true,
    rating: 4.8,
    reviews: 129,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
    description: 'Lámpara de monitor con iluminación asimétrica antirreflejos y retroiluminación ambiental trasera que reduce la fatiga visual nocturna.',
    dimensions: '500 × 95 × 97 mm / 800 g',
    battery: 'Alimentación por USB 5V/1.3A',
    compatibility: 'Monitores planos y curvos (1000R a 1800R)'
  },
  {
    id: 24,
    name: 'Xiaomi Mi Computer Light Bar',
    brand: 'Xiaomi',
    category: 'iluminacion',
    price: 249000,
    originalPrice: 289000,
    sensor: 'Regulador térmico de luz 2700K - 6500K sin parpadeo',
    connection: 'Inalámbrico 2.4GHz (Control remoto circular) + USB',
    inStock: true,
    rating: 4.6,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
    description: 'Estructura metálica con pivote magnético de 25 grados y control remoto inalámbrico de aleación para brillo y temperatura.',
    dimensions: '448 × 23 mm / 450 g',
    battery: '2x pilas AAA en control remoto / USB en barra',
    compatibility: 'Monitores de grosor entre 1 y 32 mm'
  },

  // ── ACCESORIOS (4 Productos) ──
  {
    id: 25,
    name: 'Grovemade Wool & Wood Desk Pad XL',
    brand: 'Grovemade',
    category: 'accesorios',
    price: 509000,
    originalPrice: null,
    sensor: 'Fieltro de lana merino alemana natural de 3 mm',
    connection: 'No aplica (Accesorio de escritorio de confección artesanal)',
    inStock: true,
    rating: 4.9,
    reviews: 88,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=80',
    description: 'Superficie de lana virgen de primera calidad con base de corcho natural que previene deslizamientos y protege tu mesa.',
    dimensions: '965 × 381 × 3 mm / 420 g',
    battery: 'No requiere',
    compatibility: 'Universal para setups de trabajo minimalistas'
  },
  {
    id: 26,
    name: 'CalDigit TS4 Thunderbolt 4 Station',
    brand: 'CalDigit',
    category: 'accesorios',
    price: 1699000,
    originalPrice: 1839000,
    sensor: 'Controlador Intel Thunderbolt 4 con 18 puertos de expansión',
    connection: 'Thunderbolt 4 (40Gbps, 98W Carga Power Delivery)',
    inStock: true,
    rating: 5.0,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
    description: 'La estación de acoplamiento más potente del mercado. Conecta hasta dos pantallas 6K 60Hz, Ethernet 2.5GbE y audio de alta fidelidad.',
    dimensions: '141 × 42 × 113 mm / 640 g (Cuerpo de aluminio disipador)',
    battery: 'Fuente de alimentación externa 230W incluida',
    compatibility: 'macOS Monterey o posterior, Windows 10/11 con TB4'
  },
  // ── WEBCAMS (2 Productos — NUEVOS) ──
  {
    id: 27,
    name: 'Logitech Brio 4K Ultra HD Pro',
    brand: 'Logitech',
    category: 'webcams',
    price: 899000,
    originalPrice: 1049000,
    sensor: 'Sensor 4K UHD con HDR y corrección de iluminación RightLight 3',
    connection: 'Cableado USB-C / USB-A con clip universal',
    inStock: true,
    rating: 4.8,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=900&q=80',
    description: 'La webcam con mayor resolución del mercado para reuniones, streaming y creación de contenido en 4K 30fps o 1080p 60fps.',
    dimensions: '102 × 27 × 27 mm / 63 g',
    battery: 'Alimentación directa USB',
    compatibility: 'Windows 10/11, macOS 10.15+, ChromeOS'
  },
  {
    id: 28,
    name: 'Elgato Facecam Pro 4K60',
    brand: 'Elgato',
    category: 'webcams',
    price: 1299000,
    originalPrice: null,
    sensor: 'Sony STARVIS 2 Sensor con 4K a 60fps nativo',
    connection: 'USB-C 3.0 (Requiere USB 3.0 para 4K60)',
    inStock: true,
    rating: 4.9,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=900&q=80',
    description: 'La primera webcam del mundo con 4K a 60 cuadros por segundo. Lente gran angular de 90° con ajuste manual de campo visual.',
    dimensions: '86 × 35 × 37 mm / 100 g',
    battery: 'Alimentación directa USB-C',
    compatibility: 'Windows 10/11, macOS 12+'
  },
  // ── MOUSEPADS (2 Productos — NUEVOS) ──
  {
    id: 29,
    name: 'Artisan Hien FX Soft XL',
    brand: 'Artisan',
    category: 'mousepads',
    price: 289000,
    originalPrice: null,
    sensor: 'Superficie tejida híbrida de control y velocidad calibrada',
    connection: 'No aplica (Mousepad de competición)',
    inStock: true,
    rating: 4.9,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1586952518485-11b180e92764?auto=format&fit=crop&w=900&q=80',
    description: 'El mousepad definitivo de esports con superficie de tela japonesa de precisión milimétrica, base de espuma de caucho Poron antideslizante.',
    dimensions: '420 × 330 × 4 mm / 160 g',
    battery: 'No requiere',
    compatibility: 'Compatible con todos los sensores ópticos y láser'
  },
  {
    id: 30,
    name: 'SteelSeries QcK Heavy XXL',
    brand: 'SteelSeries',
    category: 'mousepads',
    price: 169000,
    originalPrice: 199000,
    sensor: 'Microtejido QcK de alta densidad de hilos',
    connection: 'No aplica (Mousepad de escritorio completo)',
    inStock: true,
    rating: 4.7,
    reviews: 231,
    image: 'https://images.unsplash.com/photo-1586952518485-11b180e92764?auto=format&fit=crop&w=900&q=80',
    description: 'Mousepad de tamaño extendido con base de caucho extra grueso (6mm) para máxima estabilidad. Bordes cosidos a máquina para durabilidad extrema.',
    dimensions: '900 × 400 × 6 mm / 680 g',
    battery: 'No requiere',
    compatibility: 'Superficie optimizada para todos los ratones gaming y productividad'
  }
];

// ─── ESTADO GLOBAL DE LA APLICACIÓN ─────────────────────────────────
const State = {
  cart: [],
  compareIds: [],
  currentUser: null,
  currentView: 'landing',
  filters: {
    category: 'all',
    search: '',
    priceMin: null,
    priceMax: null,
    brands: [],
    connections: [],
    stockOnly: false,
    sort: 'featured'
  },

  init() {
    this.loadCartFromStorage();
    this.loadAuthFromStorage();
  },

  loadCartFromStorage() {
    try {
      const raw = localStorage.getItem(CONFIG.CART_STORAGE_KEY);
      this.cart = raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Error al recuperar carrito de localStorage:', e);
      this.cart = [];
    }
  },

  saveCartToStorage() {
    try {
      localStorage.setItem(CONFIG.CART_STORAGE_KEY, JSON.stringify(this.cart));
    } catch (e) {
      console.error('Error al guardar carrito en localStorage:', e);
    }
  },

  clearCartStorage() {
    this.cart = [];
    try {
      localStorage.removeItem(CONFIG.CART_STORAGE_KEY);
    } catch (e) {
      localStorage.clear();
    }
  },

  loadAuthFromStorage() {
    try {
      const session = sessionStorage.getItem(CONFIG.AUTH_STORAGE_KEY);
      this.currentUser = session ? JSON.parse(session) : null;
    } catch (e) {
      this.currentUser = null;
    }
  },

  setAuthUser(user) {
    this.currentUser = user;
    if (user) {
      sessionStorage.setItem(CONFIG.AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(CONFIG.AUTH_STORAGE_KEY);
    }
  }
};

// ─── ENRUTADOR DE VISTAS SEPARADAS (SPA ROUTER) ──────────────────────
const Router = {
  navigate(viewName, filterCategory = null) {
    const landingView = document.getElementById('view-landing');
    const catalogView = document.getElementById('view-catalog');
    const navLinkLanding = document.getElementById('navLinkLanding');
    const navLinkCatalog = document.getElementById('navLinkCatalog');

    if (viewName === 'catalog') {
      landingView.classList.add('d-none');
      catalogView.classList.remove('d-none');

      navLinkLanding.classList.remove('active');
      navLinkCatalog.classList.add('active');
      State.currentView = 'catalog';

      if (filterCategory) {
        CatalogModule.filterByCategory(filterCategory);
      } else {
        CatalogModule.render();
      }
    } else {
      // Landing Page (Inicio Puro sin filtros ni buscadores)
      landingView.classList.remove('d-none');
      catalogView.classList.add('d-none');

      navLinkLanding.classList.add('active');
      navLinkCatalog.classList.remove('active');
      State.currentView = 'landing';
      OffersModule.render();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// ─── COMPONENTE TOAST MINIMALISTA ───────────────────────────────────
const Toast = {
  element: null,
  messageEl: null,
  iconEl: null,
  timer: null,

  init() {
    this.element = document.getElementById('customToast');
    this.messageEl = document.getElementById('toastMessage');
    this.iconEl = document.getElementById('toastIcon');
  },

  show(message, type = 'success') {
    if (!this.element) this.init();
    if (this.timer) clearTimeout(this.timer);

    this.messageEl.textContent = message;
    if (type === 'error' || type === 'warning') {
      this.iconEl.className = 'bi bi-exclamation-circle text-white fs-5';
    } else if (type === 'info') {
      this.iconEl.className = 'bi bi-info-circle text-white fs-5';
    } else {
      this.iconEl.className = 'bi bi-check2 text-white fs-5';
    }

    this.element.classList.add('show');
    this.timer = setTimeout(() => {
      this.element.classList.remove('show');
    }, 4000);
  }
};

// ─── MÓDULO AUTENTICACIÓN (LOGIN / REGISTRO EN NAVBAR) ──────────────
const AuthModule = {
  modalInstance: null,

  init() {
    this.bindEvents();
    this.updateNavbarUI();
  },

  getModal() {
    if (!this.modalInstance) {
      const el = document.getElementById('authModal');
      this.modalInstance = bootstrap.Modal.getOrCreateInstance(el);
    }
    return this.modalInstance;
  },

  bindEvents() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const pwd = document.getElementById('loginPassword').value.trim();

      if (!email || !pwd) {
        loginForm.classList.add('was-validated');
        return;
      }

      const name = email.split('@')[0];
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
      State.setAuthUser({ name: formattedName, email });
      this.updateNavbarUI();
      this.getModal().hide();
      loginForm.reset();
      loginForm.classList.remove('was-validated');
      Toast.show(`¡Bienvenido a Desknova, ${formattedName}!`);
    });

    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const pwd = document.getElementById('regPassword').value.trim();

      if (!name || !email || !pwd || pwd.length < 6) {
        registerForm.classList.add('was-validated');
        return;
      }

      State.setAuthUser({ name, email });
      this.updateNavbarUI();
      this.getModal().hide();
      registerForm.reset();
      registerForm.classList.remove('was-validated');
      Toast.show(`¡Cuenta creada con éxito! Bienvenido, ${name}.`);
    });

    document.getElementById('quickDemoLoginBtn').addEventListener('click', () => {
      document.getElementById('loginEmail').value = 'alex.boutique@desknova.com';
      document.getElementById('loginPassword').value = 'password123';
      Toast.show('Credenciales de demostración cargadas.', 'info');
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
      State.setAuthUser(null);
      this.updateNavbarUI();
      Toast.show('Has cerrado sesión correctamente.', 'info');
    });
  },

  updateNavbarUI() {
    const loginBtn = document.getElementById('loginNavBtn');
    const userDropdown = document.getElementById('userMenuDropdown');
    const userNameEl = document.getElementById('navUserName');
    const userEmailEl = document.getElementById('navUserEmail');

    if (State.currentUser) {
      loginBtn.classList.add('d-none');
      userDropdown.classList.remove('d-none');
      userNameEl.textContent = State.currentUser.name;
      userEmailEl.textContent = State.currentUser.email;
    } else {
      loginBtn.classList.remove('d-none');
      userDropdown.classList.add('d-none');
    }
  }
};

// ─── MÓDULO LANDING: OFERTAS DESTACADAS Y LANZAMIENTOS (CARRUSEL) ───
const OffersModule = {
  carouselTrack: null,
  prevBtn: null,
  nextBtn: null,
  dotsContainer: null,
  isInitialized: false,

  init() {
    this.render();
    this.bindControls();
  },

  bindControls() {
    this.carouselTrack = document.getElementById('offersGrid');
    this.prevBtn = document.getElementById('offersCarouselPrev');
    this.nextBtn = document.getElementById('offersCarouselNext');
    this.dotsContainer = document.getElementById('offersCarouselDots');

    if (this.prevBtn && this.nextBtn && this.carouselTrack && !this.isInitialized) {
      this.isInitialized = true;

      this.prevBtn.addEventListener('click', () => {
        const item = this.carouselTrack.querySelector('.offers-carousel-item');
        const scrollAmount = item ? item.getBoundingClientRect().width + 20 : 300;
        this.carouselTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });

      this.nextBtn.addEventListener('click', () => {
        const item = this.carouselTrack.querySelector('.offers-carousel-item');
        const scrollAmount = item ? item.getBoundingClientRect().width + 20 : 300;
        this.carouselTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });

      this.carouselTrack.addEventListener('scroll', () => {
        this.updateActiveDot();
      }, { passive: true });
    }
  },

  updateActiveDot() {
    if (!this.carouselTrack || !this.dotsContainer) return;
    const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
    if (!dots.length) return;

    const maxScroll = this.carouselTrack.scrollWidth - this.carouselTrack.clientWidth;
    if (maxScroll <= 0) return;
    const progress = this.carouselTrack.scrollLeft / maxScroll;
    const activeIndex = Math.min(dots.length - 1, Math.round(progress * (dots.length - 1)));

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === activeIndex);
    });
  },

  renderDots(totalDots) {
    if (!this.dotsContainer) {
      this.dotsContainer = document.getElementById('offersCarouselDots');
    }
    if (!this.dotsContainer) return;

    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Ir a página de ofertas ${i + 1}`);
      dot.addEventListener('click', () => {
        if (!this.carouselTrack) return;
        const maxScroll = this.carouselTrack.scrollWidth - this.carouselTrack.clientWidth;
        const targetScroll = (maxScroll / (totalDots - 1)) * i;
        this.carouselTrack.scrollTo({ left: targetScroll, behavior: 'smooth' });
      });
      this.dotsContainer.appendChild(dot);
    }
  },

  render() {
    const container = document.getElementById('offersGrid');
    if (!container) return;

    // Obtener todos los productos en oferta
    const withOffers = PRODUCTS.filter(p => p.originalPrice !== null);

    // Agrupar por categoría
    const byCategory = {};
    withOffers.forEach(p => {
      if (!byCategory[p.category]) byCategory[p.category] = [];
      byCategory[p.category].push(p);
    });

    // Entrelazar categorías para máxima variedad visual (Teclados, Ratones, Audio, Monitores, Iluminación, Accesorios, Webcams, Mousepads)
    const offerProducts = [];
    const cats = Object.keys(byCategory);
    let added = true;
    let index = 0;
    while (added) {
      added = false;
      cats.forEach(cat => {
        if (byCategory[cat][index]) {
          offerProducts.push(byCategory[cat][index]);
          added = true;
        }
      });
      index++;
    }

    container.innerHTML = '';
    offerProducts.forEach(product => {
      const discountPct = Math.round((1 - product.price / product.originalPrice) * 100);
      const isCompared = State.compareIds.includes(product.id);

      const col = document.createElement('div');
      col.className = 'offers-carousel-item';
      col.innerHTML = `
        <article class="card h-100 border-0 shadow-none product-card offer-card position-relative text-start">
          <span class="offer-discount-pill">-${discountPct}% OFF</span>
          <div class="product-img-wrapper">
            <span class="stock-pill">Oferta Desknova</span>
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
          </div>
          <div class="card-body p-0 d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="badge-brand">${product.brand}</span>
              <button class="btn btn-compare-card ${isCompared ? 'active' : ''}" onclick="CompareModule.toggle(${product.id});">
                <i class="bi bi-arrow-left-right me-1"></i>${isCompared ? 'En lista' : 'Comparar'}
              </button>
            </div>
            <h3 class="fs-6 fw-bold text-dark mb-1 text-truncate" title="${product.name}" style="cursor: pointer;" onclick="DetailModule.open(${product.id});">
              ${product.name}
            </h3>
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="category-tag-badge">${product.category}</span>
              <span class="text-muted fw-normal text-truncate" style="font-size: 0.78rem;">${product.connection}</span>
            </div>
            <div class="mt-auto pt-2 d-flex align-items-baseline mb-3">
              <span class="price-tag fs-5 text-dark">${formatCOP(product.price)}</span>
              <span class="text-decoration-line-through text-muted ms-2 fw-normal" style="font-size: 0.85rem;">${formatCOP(product.originalPrice)}</span>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-outline-dark btn-sm rounded-0 text-uppercase fw-bold" style="font-size: 0.72rem; letter-spacing: 0.06em;" onclick="DetailModule.open(${product.id});">
                Ver con Zoom
              </button>
              <button class="btn btn-dark btn-sm rounded-0 text-uppercase fw-bold flex-grow-1" style="font-size: 0.72rem; letter-spacing: 0.06em;" onclick="CartModule.addItem(${product.id});">
                Agregar
              </button>
            </div>
          </div>
        </article>
      `;
      container.appendChild(col);
    });

    // Renderizar 5 indicadores/dots interactivos
    const totalDots = Math.min(6, Math.max(3, Math.ceil(offerProducts.length / 3)));
    this.renderDots(totalDots);
    this.bindControls();
  }
};

// ─── MÓDULO 1: CATÁLOGO EXTENSO Y FILTROS COMBINABLES (RF001) ───────
const CatalogModule = {
  init() {
    this.bindEvents();
    this.render();
  },

  bindEvents() {
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');

    searchInput.addEventListener('input', (e) => {
      State.filters.search = e.target.value.trim().toLowerCase();
      clearSearchBtn.classList.toggle('d-none', !e.target.value);
      this.render();
    });

    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      State.filters.search = '';
      clearSearchBtn.classList.add('d-none');
      this.render();
      searchInput.focus();
    });

    document.getElementById('sortSelect').addEventListener('change', (e) => {
      State.filters.sort = e.target.value;
      this.render();
    });

    document.getElementById('categoryFilterContainer').addEventListener('click', (e) => {
      const link = e.target.closest('.filter-category-link');
      if (!link) return;
      e.preventDefault();
      this.filterByCategory(link.dataset.category);
    });

    document.getElementById('applyPriceBtn').addEventListener('click', () => {
      const minVal = parseFloat(document.getElementById('priceMin').value);
      const maxVal = parseFloat(document.getElementById('priceMax').value);

      State.filters.priceMin = !isNaN(minVal) ? minVal : null;
      State.filters.priceMax = !isNaN(maxVal) ? maxVal : null;
      this.render();
    });

    document.querySelectorAll('.filter-brand-check').forEach(check => {
      check.addEventListener('change', () => {
        const selected = Array.from(document.querySelectorAll('.filter-brand-check:checked')).map(c => c.value);
        State.filters.brands = selected;
        this.render();
      });
    });

    document.querySelectorAll('.filter-conn-check').forEach(check => {
      check.addEventListener('change', () => {
        const selected = Array.from(document.querySelectorAll('.filter-conn-check:checked')).map(c => c.value);
        State.filters.connections = selected;
        this.render();
      });
    });

    document.getElementById('stockOnlyCheck').addEventListener('change', (e) => {
      State.filters.stockOnly = e.target.checked;
      this.render();
    });

    document.getElementById('resetFiltersBtn').addEventListener('click', () => {
      this.resetFilters();
    });

    // Quick category pills
    document.getElementById('quickCategoryPills').addEventListener('click', (e) => {
      const btn = e.target.closest('.quick-cat-btn');
      if (!btn) return;
      const cat = btn.dataset.category;
      this.filterByCategory(cat);
      // Update active state on pills
      document.querySelectorAll('.quick-cat-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.category === cat);
        b.classList.toggle('btn-dark', b.dataset.category === cat);
        b.classList.toggle('btn-outline-dark', b.dataset.category !== cat);
      });
    });
  },

  filterByCategory(category) {
    State.filters.category = category;

    document.querySelectorAll('.filter-category-link').forEach(link => {
      link.classList.toggle('active', link.dataset.category === category);
    });

    // Sync quick pills
    document.querySelectorAll('.quick-cat-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.category === category);
      b.classList.toggle('btn-dark', b.dataset.category === category);
      b.classList.toggle('btn-outline-dark', b.dataset.category !== category);
    });

    this.render();
  },

  resetFilters() {
    State.filters.category = 'all';
    State.filters.search = '';
    State.filters.priceMin = null;
    State.filters.priceMax = null;
    State.filters.brands = [];
    State.filters.connections = [];
    State.filters.stockOnly = false;
    State.filters.sort = 'featured';

    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').classList.add('d-none');
    document.getElementById('priceMin').value = '';
    document.getElementById('priceMax').value = '';
    document.getElementById('sortSelect').value = 'featured';
    document.getElementById('stockOnlyCheck').checked = false;

    document.querySelectorAll('.filter-brand-check').forEach(c => c.checked = false);
    document.querySelectorAll('.filter-conn-check').forEach(c => c.checked = false);

    document.querySelectorAll('.filter-category-link').forEach(link => {
      link.classList.toggle('active', link.dataset.category === 'all');
    });

    document.querySelectorAll('.quick-cat-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.category === 'all');
      b.classList.toggle('btn-dark', b.dataset.category === 'all');
      b.classList.toggle('btn-outline-dark', b.dataset.category !== 'all');
    });

    this.render();
    Toast.show('Filtros del catálogo restablecidos.', 'info');
  },

  getFilteredList() {
    let list = [...PRODUCTS];
    const { category, search, priceMin, priceMax, brands, connections, stockOnly, sort } = State.filters;

    if (category !== 'all') {
      list = list.filter(p => p.category === category);
    }

    if (search) {
      list = list.filter(p => 
        p.name.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search) ||
        p.sensor.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }

    if (priceMin !== null) {
      list = list.filter(p => p.price >= priceMin);
    }

    if (priceMax !== null) {
      list = list.filter(p => p.price <= priceMax);
    }

    if (brands.length > 0) {
      list = list.filter(p => brands.includes(p.brand));
    }

    if (connections.length > 0) {
      list = list.filter(p => {
        return connections.some(c => p.connection.toLowerCase().includes(c.toLowerCase()));
      });
    }

    if (stockOnly) {
      list = list.filter(p => p.inStock === true);
    }

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        list.sort((a, b) => a.id - b.id);
        break;
    }

    return list;
  },

  render() {
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');
    const counter = document.getElementById('resultsCount');
    const products = this.getFilteredList();

    counter.textContent = `Mostrando ${products.length} de ${PRODUCTS.length} productos`;
    grid.innerHTML = '';

    if (products.length === 0) {
      emptyState.classList.remove('d-none');
      return;
    }

    emptyState.classList.add('d-none');

    products.forEach(product => {
      const col = document.createElement('div');
      col.className = 'col';

      const isCompared = State.compareIds.includes(product.id);
      const stockBadge = product.inStock 
        ? '<span class="stock-pill">En Stock</span>' 
        : '<span class="stock-pill out-of-stock">Agotado</span>';

      const priceOriginalHtml = product.originalPrice 
        ? `<span class="text-decoration-line-through text-muted ms-2 fw-normal" style="font-size: 0.85rem;">${formatCOP(product.originalPrice)}</span>` 
        : '';

      const addToCartBtn = product.inStock
        ? `<button class="btn btn-dark btn-sm rounded-0 text-uppercase fw-bold flex-grow-1" style="font-size: 0.72rem; letter-spacing: 0.06em;" onclick="CartModule.addItem(${product.id});">
             Agregar
           </button>`
        : `<button class="btn btn-secondary btn-sm rounded-0 text-uppercase fw-bold flex-grow-1" style="font-size: 0.72rem; letter-spacing: 0.06em;" disabled>
             Agotado
           </button>`;

      col.innerHTML = `
        <article class="card h-100 border-0 shadow-none product-card bg-light text-start">
          <div class="product-img-wrapper">
            ${stockBadge}
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
          </div>
          <div class="card-body p-0 d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="badge-brand">${product.brand}</span>
              <button class="btn btn-compare-card ${isCompared ? 'active' : ''}" onclick="CompareModule.toggle(${product.id});" title="${isCompared ? 'Quitar de comparación' : 'Comparar producto'}">
                <i class="bi bi-arrow-left-right me-1"></i>${isCompared ? 'En lista' : 'Comparar'}
              </button>
            </div>
            <h3 class="fs-6 fw-bold text-dark mb-1" style="cursor: pointer;" onclick="DetailModule.open(${product.id});">
              ${product.name}
            </h3>
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="category-tag-badge">${product.category}</span>
              <span class="text-muted fw-normal" style="font-size: 0.78rem;">${product.connection}</span>
            </div>
            <div class="mt-auto pt-2 d-flex align-items-baseline mb-3">
              <span class="price-tag fs-5">${formatCOP(product.price)}</span>
              ${priceOriginalHtml}
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-outline-dark btn-sm rounded-0 text-uppercase fw-bold" style="font-size: 0.72rem; letter-spacing: 0.06em;" onclick="DetailModule.open(${product.id});">
                Ver detalles
              </button>
              ${addToCartBtn}
            </div>
          </div>
        </article>
      `;

      grid.appendChild(col);
    });
  }
};

// ─── MÓDULO 2: COMPARACIÓN CON VALIDACIÓN DE MISMA CATEGORÍA (RF002) 
const CompareModule = {
  maxProducts: 4,
  modalInstance: null,

  init() {
    this.updateDock();
  },

  getModal() {
    if (!this.modalInstance) {
      const el = document.getElementById('compareModal');
      this.modalInstance = new bootstrap.Modal(el);
    }
    return this.modalInstance;
  },

  toggle(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const idx = State.compareIds.indexOf(productId);

    if (idx !== -1) {
      State.compareIds.splice(idx, 1);
      Toast.show('Producto retirado de la comparación.', 'info');
    } else {
      // VALIDACIÓN ESTRICTA: Solo comparar productos de la misma categoría
      if (State.compareIds.length > 0) {
        const firstProduct = PRODUCTS.find(p => p.id === State.compareIds[0]);
        if (firstProduct && firstProduct.category !== product.category) {
          Toast.show(
            `Solo puedes comparar productos de la misma categoría. Actualmente estás comparando "${firstProduct.category.toUpperCase()}" y no se puede mezclar con "${product.category.toUpperCase()}". Limpia la lista o elige otro de la misma categoría.`,
            'warning'
          );
          return;
        }
      }

      if (State.compareIds.length >= this.maxProducts) {
        Toast.show(`Puedes comparar un máximo de ${this.maxProducts} productos simultáneamente.`, 'warning');
        return;
      }

      State.compareIds.push(productId);
      Toast.show(`Añadido a comparación (${product.category.toUpperCase()}).`, 'success');
    }

    this.updateDock();
    CatalogModule.render();
    OffersModule.render();

    const modalEl = document.getElementById('compareModal');
    if (modalEl && modalEl.classList.contains('show')) {
      if (State.compareIds.length < 2) {
        this.getModal().hide();
        Toast.show('Se requieren al menos 2 productos para comparar.', 'warning');
      } else {
        this.renderTable();
      }
    }
  },

  clear() {
    State.compareIds = [];
    this.updateDock();
    CatalogModule.render();
    OffersModule.render();
    Toast.show('Lista de comparación vaciada.', 'info');
  },

  open() {
    if (State.compareIds.length < 2) {
      Toast.show('Debes seleccionar al menos 2 productos de la misma categoría para comparar sus especificaciones.', 'warning');
      return;
    }

    this.renderTable();
    this.getModal().show();
  },

  updateDock() {
    const dock = document.getElementById('compareDock');
    const countEl = document.getElementById('compareDockCount');
    const hintEl = document.getElementById('compareDockHint');
    const catBadge = document.getElementById('compareCategoryBadge');
    const thumbsContainer = document.getElementById('compareDockThumbs');
    const navCompareCount = document.getElementById('navCompareCount');

    const count = State.compareIds.length;

    if (count > 0) {
      navCompareCount.textContent = count;
      navCompareCount.classList.remove('d-none');
    } else {
      navCompareCount.classList.add('d-none');
    }

    if (count === 0) {
      dock.classList.add('hidden');
      return;
    }

    dock.classList.remove('hidden');
    countEl.textContent = `${count} producto${count > 1 ? 's' : ''}`;

    const firstProduct = PRODUCTS.find(p => p.id === State.compareIds[0]);
    if (firstProduct) {
      catBadge.textContent = firstProduct.category.toUpperCase();
      catBadge.classList.remove('d-none');
    } else {
      catBadge.classList.add('d-none');
    }

    if (count < 2) {
      hintEl.textContent = 'Selecciona 1 producto más de la misma categoría para comparar';
    } else {
      hintEl.textContent = `Listos para comparar (${count} de ${this.maxProducts})`;
    }

    thumbsContainer.innerHTML = '';
    State.compareIds.forEach(id => {
      const p = PRODUCTS.find(item => item.id === id);
      if (p) {
        const img = document.createElement('img');
        img.src = p.image;
        img.alt = p.name;
        img.className = 'compare-thumb-img';
        img.title = p.name;
        thumbsContainer.appendChild(img);
      }
    });
  },

  renderTable() {
    const head = document.getElementById('compareTableHead');
    const body = document.getElementById('compareTableBody');
    const products = State.compareIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

    head.innerHTML = `
      <tr>
        <th class="compare-table-label align-middle" scope="col">Características</th>
        ${products.map(p => `
          <th scope="col" style="min-width: 200px; width: ${100 / (products.length + 1)}%;">
            <div class="d-flex flex-column align-items-start">
              <div class="bg-light p-2 mb-2 w-100 text-center" style="background-color: var(--bg-card-media);">
                <img src="${p.image}" alt="${p.name}" style="height: 100px; object-fit: contain; mix-blend-mode: multiply;" />
              </div>
              <span class="badge-brand mb-1">${p.brand}</span>
              <strong class="fs-6 text-dark mb-1">${p.name}</strong>
              <span class="category-tag-badge mb-2">${p.category}</span>
              <button class="btn btn-sm btn-outline-secondary rounded-0 mb-2 py-0 px-2" style="font-size: 0.72rem;" onclick="CompareModule.toggle(${p.id});">
                <i class="bi bi-x"></i> Quitar
              </button>
            </div>
          </th>
        `).join('')}
      </tr>
    `;

    const rows = [
      {
        label: 'Precio',
        render: p => `<strong class="fs-5 text-dark fw-bold">${formatCOP(p.price)}</strong>`
      },
      {
        label: 'Sensor / Componente',
        render: p => `<span class="fw-normal text-dark">${p.sensor}</span>`
      },
      {
        label: 'Tipo de Conexión',
        render: p => `<span class="fw-normal text-secondary">${p.connection}</span>`
      },
      {
        label: 'Disponibilidad',
        render: p => p.inStock 
          ? '<span class="badge bg-dark rounded-0 px-2 py-1 text-uppercase fw-normal" style="font-size: 0.7rem;">En Stock</span>' 
          : '<span class="badge bg-secondary rounded-0 px-2 py-1 text-uppercase fw-normal" style="font-size: 0.7rem;">Agotado</span>'
      },
      {
        label: 'Dimensiones / Peso',
        render: p => `<span class="fw-normal text-secondary" style="font-size: 0.84rem;">${p.dimensions}</span>`
      },
      {
        label: 'Autonomía / Alimentación',
        render: p => `<span class="fw-normal text-secondary" style="font-size: 0.84rem;">${p.battery}</span>`
      },
      {
        label: 'Compatibilidad',
        render: p => `<span class="fw-normal text-secondary" style="font-size: 0.84rem;">${p.compatibility}</span>`
      },
      {
        label: 'Acción Rápida',
        render: p => p.inStock
          ? `<button class="btn btn-dark btn-sm rounded-0 w-100 text-uppercase fw-bold" style="font-size: 0.75rem;" onclick="CartModule.addItem(${p.id});">
               Agregar a Bolsa
             </button>`
          : `<button class="btn btn-secondary btn-sm rounded-0 w-100 text-uppercase fw-bold" style="font-size: 0.75rem;" disabled>
               Agotado
             </button>`
      }
    ];

    body.innerHTML = rows.map(r => `
      <tr>
        <th class="compare-table-label" scope="row">${r.label}</th>
        ${products.map(p => `<td>${r.render(p)}</td>`).join('')}
      </tr>
    `).join('');
  }
};

// ─── MÓDULO 3: DETALLE DE PRODUCTO CON EFECTO ZOOM / LUPA (RF003) ───
const DetailModule = {
  currentProduct: null,
  currentQty: 1,
  modalInstance: null,

  init() {
    this.bindEvents();
    this.initZoomEffect();
  },

  getModal() {
    if (!this.modalInstance) {
      const el = document.getElementById('productDetailModal');
      this.modalInstance = new bootstrap.Modal(el);
    }
    return this.modalInstance;
  },

  initZoomEffect() {
    const zoomContainer = document.getElementById('productZoomContainer');
    const zoomImg = document.getElementById('detailImage');

    if (!zoomContainer || !zoomImg) return;

    zoomContainer.addEventListener('mousemove', (e) => {
      const rect = zoomContainer.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      zoomImg.style.transformOrigin = `${x}% ${y}%`;
      zoomImg.style.transform = 'scale(2.2)';
    });

    zoomContainer.addEventListener('mouseleave', () => {
      zoomImg.style.transformOrigin = 'center center';
      zoomImg.style.transform = 'scale(1)';
    });
  },

  bindEvents() {
    const qtyMinus = document.getElementById('detailQtyMinus');
    const qtyPlus = document.getElementById('detailQtyPlus');
    const qtyVal = document.getElementById('detailQtyVal');
    const addBtn = document.getElementById('detailAddToCartBtn');
    const compareBtn = document.getElementById('detailCompareBtn');

    qtyMinus.addEventListener('click', () => {
      if (this.currentQty > 1) {
        this.currentQty--;
        qtyVal.textContent = this.currentQty;
      }
    });

    qtyPlus.addEventListener('click', () => {
      this.currentQty++;
      qtyVal.textContent = this.currentQty;
    });

    addBtn.addEventListener('click', () => {
      if (!this.currentProduct || !this.currentProduct.inStock) return;
      CartModule.addItem(this.currentProduct.id, this.currentQty);
      this.getModal().hide();
    });

    compareBtn.addEventListener('click', () => {
      if (!this.currentProduct) return;
      CompareModule.toggle(this.currentProduct.id);
      this.updateCompareBtnState();
    });
  },

  open(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    this.currentProduct = product;
    this.currentQty = 1;
    document.getElementById('detailQtyVal').textContent = '1';

    const zoomImg = document.getElementById('detailImage');
    zoomImg.src = product.image;
    zoomImg.alt = product.name;
    zoomImg.style.transformOrigin = 'center center';
    zoomImg.style.transform = 'scale(1)';

    document.getElementById('detailBrand').textContent = product.brand;
    document.getElementById('detailCategory').textContent = product.category.toUpperCase();
    document.getElementById('detailName').textContent = product.name;

    const fullStars = '★'.repeat(Math.floor(product.rating));
    const emptyStars = '☆'.repeat(5 - Math.floor(product.rating));
    document.getElementById('detailRatingStars').textContent = `${fullStars}${emptyStars}`;
    document.getElementById('detailReviewsCount').textContent = `(${product.reviews} valoraciones)`;

    document.getElementById('detailPrice').textContent = formatCOP(product.price);
    document.getElementById('detailDescription').textContent = product.description;

    document.getElementById('detailSpecSensor').textContent = product.sensor;
    document.getElementById('detailSpecConnection').textContent = product.connection;
    document.getElementById('detailSpecDimensions').textContent = product.dimensions;
    document.getElementById('detailSpecBattery').textContent = product.battery;
    document.getElementById('detailSpecCompatibility').textContent = product.compatibility;

    const stockPill = document.getElementById('detailStockPill');
    const addBtn = document.getElementById('detailAddToCartBtn');
    const qtyContainer = document.getElementById('detailQuantityContainer');

    if (product.inStock) {
      stockPill.textContent = 'En Stock · Despacho Inmediato';
      stockPill.className = 'stock-pill';
      addBtn.disabled = false;
      addBtn.textContent = 'Agregar a la Bolsa';
      addBtn.className = 'btn btn-dark rounded-0 px-4 py-3 flex-grow-1 text-uppercase fw-bold';
      qtyContainer.style.opacity = '1';
      qtyContainer.style.pointerEvents = 'auto';
    } else {
      stockPill.textContent = 'Agotado · Temporalmente sin stock';
      stockPill.className = 'stock-pill out-of-stock';
      addBtn.disabled = true;
      addBtn.textContent = 'Producto Agotado';
      addBtn.className = 'btn btn-secondary rounded-0 px-4 py-3 flex-grow-1 text-uppercase fw-bold';
      qtyContainer.style.opacity = '0.5';
      qtyContainer.style.pointerEvents = 'none';
    }

    this.updateCompareBtnState();
    this.getModal().show();
  },

  updateCompareBtnState() {
    if (!this.currentProduct) return;
    const isCompared = State.compareIds.includes(this.currentProduct.id);
    const compareBtn = document.getElementById('detailCompareBtn');
    compareBtn.classList.toggle('btn-dark', isCompared);
    compareBtn.classList.toggle('btn-outline-dark', !isCompared);
    compareBtn.title = isCompared ? 'En lista de comparación' : 'Comparar producto';
  }
};

// ─── MÓDULO 4: GESTIÓN DEL CARRITO CON LOCALSTORAGE (RF004) ─────────
const CartModule = {
  offcanvasInstance: null,

  init() {
    this.updateCounters();
    this.render();
  },

  getOffcanvas() {
    if (!this.offcanvasInstance) {
      const el = document.getElementById('cartOffcanvas');
      this.offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(el);
    }
    return this.offcanvasInstance;
  },

  addItem(productId, quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || !product.inStock) {
      Toast.show('Este producto no tiene existencias disponibles.', 'warning');
      return;
    }

    const existing = State.cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      State.cart.push({ id: productId, quantity });
    }

    State.saveCartToStorage();
    this.updateCounters();
    this.render();

    Toast.show(`"${product.name}" agregado a tu bolsa de compra.`);
    this.getOffcanvas().show();
  },

  removeItem(productId) {
    const p = PRODUCTS.find(item => item.id === productId);
    State.cart = State.cart.filter(item => item.id !== productId);
    State.saveCartToStorage();
    this.updateCounters();
    this.render();

    Toast.show(p ? `"${p.name}" eliminado de la bolsa.` : 'Producto eliminado.', 'info');
  },

  updateQuantity(productId, delta) {
    const item = State.cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    State.saveCartToStorage();
    this.updateCounters();
    this.render();
  },

  getSubtotal() {
    return State.cart.reduce((acc, item) => {
      const p = PRODUCTS.find(prod => prod.id === item.id);
      return acc + (p ? p.price * item.quantity : 0);
    }, 0);
  },

  getTotalCount() {
    return State.cart.reduce((acc, item) => acc + item.quantity, 0);
  },

  updateCounters() {
    const count = this.getTotalCount();
    document.getElementById('cartNavCount').textContent = count;
    document.getElementById('cartHeaderCount').textContent = `${count} Artículo${count !== 1 ? 's' : ''}`;
  },

  render() {
    const subtotal = this.getSubtotal();
    const itemsList = document.getElementById('cartItemsList');
    const emptyState = document.getElementById('cartEmptyState');
    const summarySection = document.getElementById('cartSummarySection');
    const freeShippingContainer = document.getElementById('freeShippingContainer');

    if (State.cart.length === 0) {
      itemsList.classList.add('d-none');
      emptyState.classList.remove('d-none');
      summarySection.classList.add('d-none');
      freeShippingContainer.classList.add('d-none');
      return;
    }

    itemsList.classList.remove('d-none');
    emptyState.classList.add('d-none');
    summarySection.classList.remove('d-none');
    freeShippingContainer.classList.remove('d-none');

    // Barra de Envío Gratuito
    const threshold = CONFIG.FREE_SHIPPING_THRESHOLD;
    const progress = Math.min((subtotal / threshold) * 100, 100);
    const freeFill = document.getElementById('freeShippingFill');
    const freeMsg = document.getElementById('freeShippingMessage');
    const freePct = document.getElementById('freeShippingPercent');

    freeFill.style.width = `${progress}%`;
    freePct.textContent = `${Math.round(progress)}%`;

    if (subtotal >= threshold) {
      freeMsg.innerHTML = '<strong class="text-dark">¡Felicidades!</strong> Tu orden califica para envío sin costo.';
      document.getElementById('cartShippingText').textContent = 'Gratis';
    } else {
      const remaining = threshold - subtotal;
      freeMsg.innerHTML = `Agrega <strong class="text-dark">${formatCOP(remaining)}</strong> más para envío gratuito.`;
      document.getElementById('cartShippingText').textContent = 'Calculado en checkout';
    }

    itemsList.innerHTML = '';
    State.cart.forEach(item => {
      const p = PRODUCTS.find(prod => prod.id === item.id);
      if (!p) return;

      const itemTotal = p.price * item.quantity;
      const row = document.createElement('div');
      row.className = 'cart-item-row';
      row.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="cart-item-img" />
        <div class="d-flex flex-column justify-content-between">
          <div>
            <span class="badge-brand d-block">${p.brand}</span>
            <span class="fw-bold text-dark d-block fs-6 lh-sm mb-1">${p.name}</span>
            <span class="text-secondary fw-normal" style="font-size: 0.82rem;">${formatCOP(p.price)} c/u</span>
          </div>
          <div class="quantity-stepper mt-2">
            <button type="button" onclick="CartModule.updateQuantity(${p.id}, -1);" aria-label="Reducir cantidad">−</button>
            <span>${item.quantity}</span>
            <button type="button" onclick="CartModule.updateQuantity(${p.id}, 1);" aria-label="Aumentar cantidad">+</button>
          </div>
        </div>
        <div class="d-flex flex-column justify-content-between align-items-end">
          <button class="btn btn-link text-muted p-0 border-0" onclick="CartModule.removeItem(${p.id});" title="Eliminar ítem">
            <i class="bi bi-trash3" style="font-size: 0.95rem;"></i>
          </button>
          <span class="fw-bolder text-dark fs-6">${formatCOP(itemTotal)}</span>
        </div>
      `;
      itemsList.appendChild(row);
    });

    document.getElementById('cartSubtotal').textContent = formatCOP(subtotal);
    document.getElementById('cartTotal').textContent = formatCOP(subtotal);
  }
};

// ─── MÓDULO 5: CHECKOUT WIZARD EN 3 PARTES (RF005) ───────────────────
const CheckoutModule = {
  modalInstance: null,
  currentStep: 1,

  init() {
    this.bindEvents();
  },

  getModal() {
    if (!this.modalInstance) {
      const el = document.getElementById('checkoutModal');
      this.modalInstance = new bootstrap.Modal(el);
    }
    return this.modalInstance;
  },

  bindEvents() {
    // 1. Alternancia de Entrega
    const homeRadio = document.getElementById('methodHome');
    const pickupRadio = document.getElementById('methodPickup');
    const homeCard = document.getElementById('methodHomeCard');
    const pickupCard = document.getElementById('methodPickupCard');
    const homeFields = document.getElementById('deliveryHomeFields');
    const pickupFields = document.getElementById('deliveryPickupFields');

    const addressInput = document.getElementById('addressInput');
    const cityInput = document.getElementById('cityInput');
    const postalInput = document.getElementById('postalInput');
    const pickupSelect = document.getElementById('pickupStoreSelect');

    const toggleDeliveryMethod = (isPickup) => {
      homeCard.classList.toggle('selected', !isPickup);
      pickupCard.classList.toggle('selected', isPickup);

      homeFields.classList.toggle('d-none', isPickup);
      pickupFields.classList.toggle('d-none', !isPickup);

      if (isPickup) {
        addressInput.removeAttribute('required');
        cityInput.removeAttribute('required');
        postalInput.removeAttribute('required');
        pickupSelect.setAttribute('required', 'required');
      } else {
        addressInput.setAttribute('required', 'required');
        cityInput.setAttribute('required', 'required');
        postalInput.setAttribute('required', 'required');
        pickupSelect.removeAttribute('required');
      }
    };

    homeRadio.addEventListener('change', () => toggleDeliveryMethod(false));
    pickupRadio.addEventListener('change', () => toggleDeliveryMethod(true));

    // 2. Alternancia de Métodos de Pago
    const payCardRadio = document.getElementById('payMethodCard');
    const payPaypalRadio = document.getElementById('payMethodPaypal');
    const payMPRadio = document.getElementById('payMethodMP');

    const payCardLabel = document.getElementById('payMethodCardLabel');
    const payPaypalLabel = document.getElementById('payMethodPaypalLabel');
    const payMPLabel = document.getElementById('payMethodMPLabel');

    const creditCardForm = document.getElementById('creditCardFormContainer');
    const paypalNotice = document.getElementById('paypalNoticeContainer');
    const mpNotice = document.getElementById('mercadopagoNoticeContainer');

    const cardHolderName = document.getElementById('cardHolderName');
    const cardNumberInput = document.getElementById('cardNumberInput');
    const cardExpiryInput = document.getElementById('cardExpiryInput');
    const cardCvvInput = document.getElementById('cardCvvInput');

    const togglePaymentOption = (method) => {
      payCardLabel.classList.toggle('active', method === 'card');
      payPaypalLabel.classList.toggle('active', method === 'paypal');
      payMPLabel.classList.toggle('active', method === 'mercadopago');

      creditCardForm.classList.toggle('d-none', method !== 'card');
      paypalNotice.classList.toggle('d-none', method !== 'paypal');
      mpNotice.classList.toggle('d-none', method !== 'mercadopago');

      if (method === 'card') {
        cardHolderName.setAttribute('required', 'required');
        cardNumberInput.setAttribute('required', 'required');
        cardExpiryInput.setAttribute('required', 'required');
        cardCvvInput.setAttribute('required', 'required');
      } else {
        cardHolderName.removeAttribute('required');
        cardNumberInput.removeAttribute('required');
        cardExpiryInput.removeAttribute('required');
        cardCvvInput.removeAttribute('required');
      }
    };

    payCardRadio.addEventListener('change', () => togglePaymentOption('card'));
    payPaypalRadio.addEventListener('change', () => togglePaymentOption('paypal'));
    payMPRadio.addEventListener('change', () => togglePaymentOption('mercadopago'));

    // Formateo de número de tarjeta en bloques de 4 dígitos
    cardNumberInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
      e.target.value = formatted;
    });

    // Formateo de fecha de vencimiento (MM/AA)
    cardExpiryInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 3) {
        e.target.value = val.substring(0, 2) + '/' + val.substring(2);
      } else {
        e.target.value = val;
      }
    });

    // Botón de Tarjeta de Prueba rápida para agilizar pruebas
    const demoCardBtn = document.getElementById('fillDemoCardBtn');
    if (demoCardBtn) {
      demoCardBtn.addEventListener('click', () => {
        cardHolderName.value = 'ANDRES CASTILLO';
        cardNumberInput.value = '4532 8920 1204 8892';
        cardExpiryInput.value = '08/28';
        cardCvvInput.value = '742';
        form.classList.remove('was-validated');
        [cardHolderName, cardNumberInput, cardExpiryInput, cardCvvInput].forEach(el => {
          el.classList.remove('is-invalid');
        });
        Toast.show('Datos de tarjeta de prueba cargados correctamente.', 'info');
      });
    }

    // Limpiar errores visuales al escribir
    [cardHolderName, cardNumberInput, cardExpiryInput, cardCvvInput].forEach(el => {
      el.addEventListener('input', () => el.classList.remove('is-invalid'));
    });

    // Validación y Envío del Formulario en el Paso 3
    const form = document.getElementById('checkoutForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validar campos de pago si tarjeta de crédito está seleccionada
      if (payCardRadio.checked) {
        const holder = cardHolderName.value.trim();
        const rawCard = cardNumberInput.value.replace(/\s+/g, '');
        const expiry = cardExpiryInput.value.trim();
        const cvv = cardCvvInput.value.trim();

        if (!holder) {
          cardHolderName.focus();
          cardHolderName.classList.add('is-invalid');
          Toast.show('Por favor ingresa el nombre del titular de la tarjeta.', 'warning');
          return;
        } else {
          cardHolderName.classList.remove('is-invalid');
        }

        if (rawCard.length < 15) {
          cardNumberInput.focus();
          cardNumberInput.classList.add('is-invalid');
          Toast.show('Por favor ingresa los 16 dígitos de la tarjeta.', 'warning');
          return;
        } else {
          cardNumberInput.classList.remove('is-invalid');
        }

        if (!expiry.includes('/') || expiry.length < 5) {
          cardExpiryInput.focus();
          cardExpiryInput.classList.add('is-invalid');
          Toast.show('Por favor ingresa una fecha de vencimiento válida (MM/AA).', 'warning');
          return;
        } else {
          cardExpiryInput.classList.remove('is-invalid');
        }

        if (cvv.length < 3) {
          cardCvvInput.focus();
          cardCvvInput.classList.add('is-invalid');
          Toast.show('Por favor ingresa el código CVV (3 dígitos al reverso).', 'warning');
          return;
        } else {
          cardCvvInput.classList.remove('is-invalid');
        }
      }

      this.processOrder();
    });
  },

  // NAVEGACIÓN ENTRE LAS 3 PARTES / PASOS DEL CHECKOUT
  goToStep(step) {
    const isPickup = document.getElementById('methodPickup').checked;
    const addressInput = document.getElementById('addressInput');
    const cityInput = document.getElementById('cityInput');
    const postalInput = document.getElementById('postalInput');
    const pickupSelect = document.getElementById('pickupStoreSelect');

    const buyerName = document.getElementById('buyerName');
    const buyerEmail = document.getElementById('buyerEmail');
    const buyerPhone = document.getElementById('buyerPhone');
    const buyerDoc = document.getElementById('buyerDoc');

    // Validación al avanzar desde el Paso 1
    if (this.currentStep === 1 && step === 2) {
      if (isPickup) {
        if (!pickupSelect.value) {
          pickupSelect.focus();
          Toast.show('Por favor selecciona una sucursal para la recogida.', 'warning');
          return;
        }
      } else {
        if (!addressInput.value.trim() || !cityInput.value.trim() || !postalInput.value.trim()) {
          Toast.show('Por favor completa todos los campos de dirección de entrega.', 'warning');
          addressInput.focus();
          return;
        }
      }
    }

    // Validación al avanzar desde el Paso 2
    if (this.currentStep === 2 && step === 3) {
      if (!buyerName.value.trim() || !buyerEmail.value.trim() || !buyerPhone.value.trim() || !buyerDoc.value.trim()) {
        Toast.show('Por favor completa todos los datos de contacto y facturación.', 'warning');
        buyerName.focus();
        return;
      }
      if (!buyerEmail.value.includes('@') || !buyerEmail.value.includes('.')) {
        Toast.show('Por favor ingresa un correo electrónico válido.', 'warning');
        buyerEmail.focus();
        return;
      }
    }

    this.currentStep = step;

    // Alternar visibilidad de los 3 paneles
    document.getElementById('checkoutStepPane1').classList.toggle('d-none', step !== 1);
    document.getElementById('checkoutStepPane2').classList.toggle('d-none', step !== 2);
    document.getElementById('checkoutStepPane3').classList.toggle('d-none', step !== 3);

    // Actualizar indicador visual del Stepper
    this.updateStepperUI(step);

    // Scroll interno del modal hacia la parte superior (FIX RF005)
    const modalBody = document.getElementById('checkoutModalBody');
    if (modalBody) {
      modalBody.scrollTop = 0;
    }
  },

  updateStepperUI(step) {
    const ind1 = document.getElementById('stepIndicator1');
    const ind2 = document.getElementById('stepIndicator2');
    const ind3 = document.getElementById('stepIndicator3');

    const line1 = document.getElementById('stepLine1');
    const line2 = document.getElementById('stepLine2');

    ind1.className = `checkout-step-item ${step === 1 ? 'active' : 'completed'}`;
    ind2.className = `checkout-step-item ${step === 2 ? 'active' : (step > 2 ? 'completed' : '')}`;
    ind3.className = `checkout-step-item ${step === 3 ? 'active' : ''}`;

    line1.classList.toggle('active', step >= 2);
    line2.classList.toggle('active', step >= 3);
  },

  open() {
    if (State.cart.length === 0) {
      Toast.show('Tu bolsa de compra está vacía.', 'warning');
      return;
    }

    const cartOffcanvasEl = document.getElementById('cartOffcanvas');
    const offcanvas = bootstrap.Offcanvas.getInstance(cartOffcanvasEl);
    if (offcanvas) offcanvas.hide();

    document.getElementById('checkoutFormView').classList.remove('d-none');
    document.getElementById('checkoutSuccessView').classList.add('d-none');

    const modalTitle = document.getElementById('checkoutModalTitle');
    if (modalTitle) modalTitle.textContent = 'Proceso de Pago Seguro';

    const form = document.getElementById('checkoutForm');
    form.classList.remove('was-validated');

    // Pre-llenar con datos del usuario si está autenticado
    if (State.currentUser) {
      document.getElementById('buyerName').value = State.currentUser.name || '';
      document.getElementById('buyerEmail').value = State.currentUser.email || '';
    }

    const subtotal = CartModule.getSubtotal();
    const count = CartModule.getTotalCount();
    document.getElementById('checkoutItemsCount').textContent = `${count} producto${count !== 1 ? 's' : ''}`;
    document.getElementById('checkoutTotalPrice').textContent = formatCOP(subtotal);

    const briefList = document.getElementById('checkoutItemsBrief');
    briefList.innerHTML = State.cart.map(item => {
      const p = PRODUCTS.find(prod => prod.id === item.id);
      if (!p) return '';
      return `<div class="d-flex justify-content-between py-1 border-bottom border-light"><span>${item.quantity}× ${p.name}</span><span class="text-dark fw-bold">${formatCOP(p.price * item.quantity)}</span></div>`;
    }).join('');

    // Iniciar siempre en el Paso 1
    this.goToStep(1);
    const modalBody = document.getElementById('checkoutModalBody');
    if (modalBody) {
      modalBody.scrollTop = 0;
    }
    this.getModal().show();
  },

  processOrder() {
    const isPickup = document.getElementById('methodPickup').checked;
    const buyerName = document.getElementById('buyerName').value.trim();
    const buyerEmail = document.getElementById('buyerEmail').value.trim();
    const totalPaid = CartModule.getSubtotal();

    let deliveryType = '';
    let destination = '';

    if (isPickup) {
      deliveryType = 'Recogida en Tienda Desknova';
      destination = document.getElementById('pickupStoreSelect').value;
    } else {
      deliveryType = 'Envío Express a Domicilio';
      const address = document.getElementById('addressInput').value.trim();
      const city = document.getElementById('cityInput').value.trim();
      const postal = document.getElementById('postalInput').value.trim();
      destination = `${address}, ${city} (${postal})`;
    }

    let paymentDesc = '';
    if (document.getElementById('payMethodCard').checked) {
      const rawCard = document.getElementById('cardNumberInput').value.replace(/\s+/g, '');
      const lastFour = rawCard.slice(-4) || '8892';
      paymentDesc = `Tarjeta de Crédito terminada en •••• ${lastFour}`;
    } else if (document.getElementById('payMethodPaypal').checked) {
      paymentDesc = 'Cuenta Verificada de PayPal (Simulado)';
    } else {
      paymentDesc = 'Billetera Digital Mercado Pago (Simulado)';
    }

    const randomRef = `#DN-${Math.floor(10000 + Math.random() * 90000)}`;

    document.getElementById('successOrderRef').textContent = randomRef;
    document.getElementById('successBuyerName').textContent = buyerName;
    document.getElementById('successBuyerEmail').textContent = buyerEmail;
    document.getElementById('successDeliveryType').textContent = deliveryType;
    document.getElementById('successDestination').textContent = destination;
    document.getElementById('successPaymentMethod').textContent = paymentDesc;
    document.getElementById('successTotalPaid').textContent = formatCOP(totalPaid);

    // Requisito técnico RF005: Limpiar el carrito en memoria local
    State.clearCartStorage();
    CartModule.updateCounters();
    CartModule.render();

    document.getElementById('checkoutFormView').classList.add('d-none');
    document.getElementById('checkoutSuccessView').classList.remove('d-none');

    const modalTitle = document.getElementById('checkoutModalTitle');
    if (modalTitle) modalTitle.textContent = '¡Orden Confirmada!';

    const modalBody = document.getElementById('checkoutModalBody');
    if (modalBody) {
      modalBody.scrollTop = 0;
    }

    Toast.show('¡Pago procesado y pedido completado con éxito! Carrito vaciado.');
  }
};

// ─── INICIALIZACIÓN GLOBAL AL CARGAR EL DOM ──────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  State.init();
  Toast.init();
  AuthModule.init();
  OffersModule.init();
  CatalogModule.init();
  CompareModule.init();
  DetailModule.init();
  CartModule.init();
  CheckoutModule.init();
  Router.navigate('landing'); // Iniciar estrictamente en Landing Page

  // Garantizar que el scroll de la página SIEMPRE se desbloquee al cerrar cualquier modal u offcanvas
  const restorePageScroll = () => {
    // Si no hay otros modales abiertos, quitar bloqueos de scroll
    setTimeout(() => {
      if (!document.querySelector('.modal.show') && !document.querySelector('.offcanvas.show')) {
        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('padding-right');
        document.documentElement.style.removeProperty('overflow');
        document.body.style.overflowY = 'auto';
        document.documentElement.style.overflowY = 'auto';
      }
    }, 150);
  };

  document.addEventListener('hidden.bs.modal', restorePageScroll);
  document.addEventListener('hidden.bs.offcanvas', restorePageScroll);
});