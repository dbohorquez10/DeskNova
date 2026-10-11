/* ═══════════════════════════════════════════════════════
   DESK NOVA — app.js (SPA con 15 productos, comparador, detalle y checkout)

   Correcciones según la evaluación de casos de uso:
   - CU Comparar Productos: se muestran sensor, conexión y disponibilidad,
     y se agrega "Comprar ahora". Mensaje de error si hay menos de 2 productos.
   - CU Consultar Información del Producto: vista de detalle al hacer clic.
   - CU Consultar y Filtrar Productos: filtros por marca, tipo de conexión
     y disponibilidad; las categorías de la página de inicio filtran el catálogo.
   - CU Simular Checkout y Entrega: ya no exige iniciar sesión; pide modalidad
     de entrega, datos de entrega y método de pago (simulado).
   - RF005: la entrega no genera cargos adicionales (se quitó el costo de envío).
═══════════════════════════════════════════════════════ */
'use strict';

const CONFIG = {
  SESSION_KEY: 'desknova_session',
  CART_KEY: 'desknova_cart',
  LOW_STOCK: 5,
};

const CREDENTIALS = {
  email: 'demo@desknova.com',
  password: 'demo',
};

const DELIVERY_OPTIONS = ['Envío a domicilio (48h)', 'Recogida en tienda (24h)'];

// 15 productos. Cada uno incluye marca, sensor, conexión, stock,
// especificaciones y compatibilidad (atributos que piden los casos de uso).
const PRODUCTS = [
  { id: 1, name: 'Teclado Mecánico Pro RGB', description: 'Switches Cherry MX Blue, retroiluminación RGB por tecla, anti-ghosting total.', price: 189.99, originalPrice: 229.99, category: 'teclados', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1100&q=85', rating: 4.9, reviews: 342, badge: 'Bestseller',
    brand: 'KeyForge', sensor: 'Switch mecánico táctil (Cherry MX Blue)', connections: ['Cableado'], stock: 14,
    specs: ['Formato 100% (104 teclas)', 'Anti-ghosting N-key rollover', 'Cable USB-C desmontable', 'Reposamuñecas magnético'], compatibility: 'Windows, macOS y Linux' },
  { id: 2, name: 'Teclado Compacto TKL Silent', description: 'Teclado tenkeyless con switches silenciosos, ideal para espacios reducidos.', price: 119.99, originalPrice: null, category: 'teclados', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1100&q=85', rating: 4.7, reviews: 158, badge: null,
    brand: 'Nova', sensor: 'Switch de membrana silencioso', connections: ['Inalámbrico', 'Bluetooth'], stock: 4,
    specs: ['Formato TKL (87 teclas)', 'Batería de 6 meses', 'Hasta 3 dispositivos emparejados', 'Nivel de ruido < 35 dB'], compatibility: 'Windows, macOS, iPadOS y Android' },
  { id: 3, name: 'Teclado Custom Alum 75%', description: 'Estructura de aluminio CNC, gasket mount, switches lineales lubricados de fábrica.', price: 219.99, originalPrice: 259.99, category: 'teclados', image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1100&q=85', rating: 5.0, reviews: 92, badge: 'Nuevo',
    brand: 'KeyForge', sensor: 'Switch mecánico lineal lubricado', connections: ['Cableado', 'Bluetooth'], stock: 0,
    specs: ['Formato 75% (84 teclas)', 'Carcasa de aluminio CNC', 'Montaje gasket', 'Switches hot-swap'], compatibility: 'Windows, macOS y Linux' },
  { id: 4, name: 'Mouse Ergonómico Wireless', description: 'Diseño ergonómico para zurdos y diestros, DPI ajustable 800-6000, batería 90 días.', price: 79.99, originalPrice: 99.99, category: 'ratones', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1100&q=85', rating: 4.8, reviews: 512, badge: 'Oferta',
    brand: 'Nova', sensor: 'Óptico 6.000 DPI', connections: ['Inalámbrico'], stock: 22,
    specs: ['DPI ajustable 800–6.000', 'Batería de 90 días', 'Diseño ambidiestro', '6 botones programables'], compatibility: 'Windows, macOS y ChromeOS' },
  { id: 5, name: 'Mouse Gaming Hyperion X', description: 'Sensor óptico de 16.000 DPI, clic mecánico de alta precisión, RGB customizable.', price: 129.99, originalPrice: null, category: 'ratones', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1100&q=85', rating: 4.9, reviews: 89, badge: 'Nuevo',
    brand: 'Hyperion', sensor: 'Óptico 16.000 DPI', connections: ['Cableado', 'Inalámbrico'], stock: 9,
    specs: ['Tasa de sondeo 1.000 Hz', 'Peso de 68 g', 'Iluminación RGB personalizable', 'Clics mecánicos de 80 M pulsaciones'], compatibility: 'Windows y macOS' },
  { id: 6, name: 'Mouse Vertical Workspace', description: 'Ángulo de 57 grados para prevenir lesiones de túnel carpiano. Inalámbrico dual.', price: 69.99, originalPrice: 89.99, category: 'ratones', image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?auto=format&fit=crop&w=1100&q=85', rating: 4.6, reviews: 230, badge: null,
    brand: 'Nova', sensor: 'Óptico 4.000 DPI', connections: ['Inalámbrico', 'Bluetooth'], stock: 3,
    specs: ['Ángulo vertical de 57°', 'Conexión dual (2.4 GHz + Bluetooth)', 'Batería recargable USB-C', 'Para mano derecha'], compatibility: 'Windows, macOS, iPadOS y Android' },
  { id: 7, name: 'Headset Pro Noise Cancel', description: 'Cancelación activa de ruido, drivers de 40mm, autonomía de 30h, micrófono retráctil.', price: 149.99, originalPrice: 189.99, category: 'audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1100&q=85', rating: 4.8, reviews: 267, badge: 'Oferta',
    brand: 'Aural', sensor: 'No aplica', connections: ['Bluetooth', 'Cableado'], stock: 11,
    specs: ['Cancelación activa de ruido', 'Drivers de 40 mm', 'Autonomía de 30 h', 'Micrófono retráctil'], compatibility: 'PC, consolas y dispositivos móviles' },
  { id: 8, name: 'Micrófono USB Kondenser', description: 'Patrón cardioide, muestreo 24bit/96kHz, brazo articulado incluido.', price: 109.99, originalPrice: null, category: 'audio', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1100&q=85', rating: 4.6, reviews: 94, badge: null,
    brand: 'Aural', sensor: 'Cápsula de condensador cardioide', connections: ['Cableado'], stock: 7,
    specs: ['Muestreo 24 bit / 96 kHz', 'Patrón cardioide', 'Brazo articulado incluido', 'Salida de audífonos con monitoreo'], compatibility: 'Windows y macOS (plug & play)' },
  { id: 9, name: 'Monitores de Estudio Activos', description: 'Respuesta plana de frecuencia, potencia de 50W, sonido cristalino para edición.', price: 220.00, originalPrice: null, category: 'audio', image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=1100&q=85', rating: 4.9, reviews: 112, badge: 'Premium',
    brand: 'Aural', sensor: 'No aplica', connections: ['Cableado', 'Bluetooth'], stock: 0,
    specs: ['Potencia de 50 W', 'Respuesta de frecuencia plana', 'Entradas RCA, TRS y Bluetooth', 'Par de parlantes'], compatibility: 'PC, interfaces de audio y móviles' },
  { id: 10, name: 'Lámpara LED Smart Desk', description: 'Control táctil, temperatura de color 2700K-6500K, modo lectura sin parpadeo.', price: 59.99, originalPrice: 79.99, category: 'iluminacion', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1100&q=85', rating: 4.7, reviews: 201, badge: null,
    brand: 'Lumio', sensor: 'Sensor de luz ambiente', connections: ['Cableado', 'Bluetooth'], stock: 18,
    specs: ['Temperatura de color 2.700–6.500 K', 'Control táctil y por app', 'Sin parpadeo', 'Puerto de carga USB'], compatibility: 'App para iOS y Android' },
  { id: 11, name: 'Tira RGB Ambient Monitor', description: 'Tira LED con 16 millones de colores, sync con pantalla, adhesivo premium.', price: 34.99, originalPrice: null, category: 'iluminacion', image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1100&q=85', rating: 4.5, reviews: 445, badge: null,
    brand: 'Lumio', sensor: 'No aplica', connections: ['Cableado'], stock: 30,
    specs: ['16 millones de colores', 'Sincronización con la pantalla', 'Longitud de 2 m', 'Alimentación USB'], compatibility: 'Monitores de 24" a 34"' },
  { id: 12, name: 'Monitor IPS 27" 165Hz', description: 'Panel IPS 2K QHD, tiempo de respuesta 1ms, DisplayHDR 400, sin marco.', price: 399.99, originalPrice: 459.99, category: 'monitores', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1100&q=85', rating: 4.9, reviews: 188, badge: 'Bestseller',
    brand: 'ViewMax', sensor: 'No aplica', connections: ['Cableado'], stock: 6,
    specs: ['Panel IPS 27" QHD 2560×1440', '165 Hz · 1 ms', 'DisplayHDR 400', 'HDMI 2.0 y DisplayPort 1.4'], compatibility: 'PC, portátiles y consolas' },
  { id: 13, name: 'Monitor Ultrapanorámico 34"', description: 'Curvatura 1000R, 21:9, 144Hz, compatible con G-Sync y FreeSync Premium.', price: 649.99, originalPrice: null, category: 'monitores', image: 'https://images.unsplash.com/photo-1586952518485-11b180e92764?auto=format&fit=crop&w=1100&q=85', rating: 4.8, reviews: 73, badge: 'Premium',
    brand: 'ViewMax', sensor: 'No aplica', connections: ['Cableado'], stock: 2,
    specs: ['34" WQHD 3440×1440, 21:9', 'Curvatura 1000R', '144 Hz', 'USB-C con carga de 65 W'], compatibility: 'PC y portátiles con USB-C o DisplayPort' },
  { id: 14, name: 'Hub USB-C 12 en 1', description: 'HDMI 4K, lector de tarjetas, Ethernet Gigabit, PD 100W, 4× USB 3.0.', price: 69.99, originalPrice: 89.99, category: 'accesorios', image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=1100&q=85', rating: 4.6, reviews: 321, badge: null,
    brand: 'Connectix', sensor: 'No aplica', connections: ['Cableado'], stock: 25,
    specs: ['HDMI 4K a 60 Hz', 'Ethernet Gigabit', 'Carga PD de 100 W', '4 puertos USB 3.0 y lector SD'], compatibility: 'Portátiles con USB-C (Windows y macOS)' },
  { id: 15, name: 'Alfombrilla XL Gaming DeskPad', description: 'Superficie extendida 90×40cm, base antideslizante, bordes cosidos reforzados.', price: 29.99, originalPrice: null, category: 'accesorios', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1100&q=85', rating: 4.7, reviews: 634, badge: null,
    brand: 'Hyperion', sensor: 'No aplica', connections: ['No aplica'], stock: 40,
    specs: ['Tamaño 90×40 cm', 'Base de caucho antideslizante', 'Bordes cosidos', 'Superficie de microtejido'], compatibility: 'Cualquier mouse óptico o láser' },
];

const CATEGORY_LABELS = {
  teclados: 'Teclados', ratones: 'Ratones', audio: 'Audio',
  iluminacion: 'Iluminación', monitores: 'Monitores', accesorios: 'Accesorios',
};

const findProduct = (id) => PRODUCTS.find(p => p.id === id);
const isAvailable = (p) => p.stock > 0;
const money = (n) => `$${n.toFixed(2)}`;

function availabilityText(p) {
  if (p.stock === 0) return 'Agotado';
  if (p.stock <= CONFIG.LOW_STOCK) return `Pocas unidades (${p.stock})`;
  return `Disponible (${p.stock} unidades)`;
}
function availabilityClass(p) {
  if (p.stock === 0) return 'soldout';
  if (p.stock <= CONFIG.LOW_STOCK) return 'low';
  return 'ok';
}

const DEFAULT_FILTERS = () => ({
  category: 'all', search: '', priceMin: null, priceMax: null, sort: 'default',
  brands: [], connections: [], availability: 'all',
});

const State = {
  currentView: 'landing',
  isAuthenticated: false,
  user: null,
  cart: [],
  filters: DEFAULT_FILTERS(),

  init() {
    const session = sessionStorage.getItem(CONFIG.SESSION_KEY);
    if (session) {
      try {
        const parsed = JSON.parse(session);
        this.isAuthenticated = true;
        this.user = parsed.user;
      } catch (_) { sessionStorage.removeItem(CONFIG.SESSION_KEY); }
    }

    const savedCart = localStorage.getItem(CONFIG.CART_KEY);
    if (savedCart) {
      try {
        // Se descartan productos que ya no existan o estén agotados
        this.cart = JSON.parse(savedCart).filter(i => { const p = findProduct(i.id); return p && isAvailable(p); });
      } catch (_) { localStorage.removeItem(CONFIG.CART_KEY); }
    }
  },

  persistCart() { localStorage.setItem(CONFIG.CART_KEY, JSON.stringify(this.cart)); },

  login(email) {
    this.isAuthenticated = true;
    this.user = { email, initial: email.charAt(0).toUpperCase() };
    sessionStorage.setItem(CONFIG.SESSION_KEY, JSON.stringify({ user: this.user }));
  },

  logout() {
    this.isAuthenticated = false;
    this.user = null;
    sessionStorage.removeItem(CONFIG.SESSION_KEY);
  },
};

const Router = {
  GUEST_ONLY: ['login'],

  navigate(view) {
    if (this.GUEST_ONLY.includes(view) && State.isAuthenticated) view = 'catalog';
    this._show(view);
    if (view === 'catalog') Catalog.render();
    if (view === 'cart') Cart.render();
  },

  _show(view) {
    document.querySelectorAll('.view').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(`view-${view}`);
    if (!target) return;
    target.classList.remove('hidden');
    State.currentView = view;

    const navbar = document.getElementById('navbar');
    const showNav = view !== 'landing' && view !== 'login';
    navbar.classList.toggle('hidden', !showNav);
    document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.view === view));
    window.scrollTo({ top: 0 });
  },
};

const Auth = {
  init() {
    const form = document.getElementById('login-form');
    const togglePwd = document.getElementById('toggle-pwd');

    form.addEventListener('submit', (e) => { e.preventDefault(); this.handleLogin(); });
    togglePwd.addEventListener('click', () => this.togglePassword());
    document.getElementById('logout-btn').addEventListener('click', () => this.logout());
  },

  handleLogin() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const submitBtn = document.getElementById('login-submit');

    this.clearErrors();
    let hasError = false;
    if (!email) { this.setFieldError('email-error', 'El correo es requerido.'); hasError = true; }
    if (!password) { this.setFieldError('password-error', 'La contraseña es requerida.'); hasError = true; }
    if (hasError) return;

    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').classList.add('hidden');
    submitBtn.querySelector('.btn-loader').classList.remove('hidden');

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').classList.remove('hidden');
      submitBtn.querySelector('.btn-loader').classList.add('hidden');
      if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
        State.login(email);
        this.updateNavbarUser();
        Router.navigate('catalog');
        Toast.show('¡Bienvenido a Desk Nova!', 'success', '👋');
      } else {
        document.getElementById('login-error').classList.remove('hidden');
        document.getElementById('login-error-msg').textContent = 'Credenciales incorrectas. Prueba: demo@desknova.com / demo';
      }
    }, 900);
  },

  logout() {
    State.logout();
    this.updateNavbarUser();
    Router.navigate('landing');
    Toast.show('Sesión cerrada correctamente.', 'info', '👋');
  },

  togglePassword() {
    const pwdInput = document.getElementById('password');
    pwdInput.type = pwdInput.type === 'text' ? 'password' : 'text';
  },

  setFieldError(id, message) { document.getElementById(id).textContent = message; },
  clearErrors() {
    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';
    document.getElementById('login-error').classList.add('hidden');
  },

  updateNavbarUser() {
    const loginButton = document.querySelector('.nav-login');
    const userMenu = document.getElementById('user-menu');
    loginButton.classList.toggle('hidden', State.isAuthenticated);
    userMenu.classList.toggle('hidden', !State.isAuthenticated);
    if (State.user) document.getElementById('user-email-display').textContent = State.user.email;
  },
};

const Catalog = {
  init() {
    this.buildCheckFilters();

    document.getElementById('category-filters').addEventListener('click', (e) => {
      const item = e.target.closest('.filter-item');
      if (!item) return;
      this.setCategory(item.dataset.category);
      this.render();
    });

    const searchInput = document.getElementById('search-input');
    const clearSearch = document.getElementById('clear-search');
    searchInput.addEventListener('input', () => {
      State.filters.search = searchInput.value.trim().toLowerCase();
      clearSearch.classList.toggle('hidden', !searchInput.value);
      this.render();
    });

    clearSearch.addEventListener('click', () => {
      searchInput.value = ''; State.filters.search = ''; clearSearch.classList.add('hidden'); this.render();
    });

    document.getElementById('apply-price-filter').addEventListener('click', () => {
      const min = parseFloat(document.getElementById('price-min').value);
      const max = parseFloat(document.getElementById('price-max').value);
      State.filters.priceMin = isNaN(min) ? null : min;
      State.filters.priceMax = isNaN(max) ? null : max;
      this.render();
    });

    document.getElementById('brand-filters').addEventListener('change', () => {
      State.filters.brands = [...document.querySelectorAll('#brand-filters input:checked')].map(i => i.value);
      this.render();
    });
    document.getElementById('connection-filters').addEventListener('change', () => {
      State.filters.connections = [...document.querySelectorAll('#connection-filters input:checked')].map(i => i.value);
      this.render();
    });
    document.getElementById('availability-filters').addEventListener('change', (e) => {
      State.filters.availability = e.target.value;
      this.render();
    });

    document.getElementById('sort-select').addEventListener('change', (e) => {
      State.filters.sort = e.target.value; this.render();
    });

    document.getElementById('reset-filters').addEventListener('click', () => this.resetFilters());
    document.getElementById('sidebar-reset-filters').addEventListener('click', () => this.resetFilters());
    document.getElementById('mobile-filter-toggle').addEventListener('click', () => {
      document.querySelector('.catalog-sidebar').classList.toggle('open');
    });

    // Abrir el detalle al hacer clic en la imagen, el nombre o "Ver detalles"
    document.getElementById('products-grid').addEventListener('click', (e) => {
      const opener = e.target.closest('[data-detail-id]');
      if (opener) ProductDetail.open(Number(opener.dataset.detailId));
    });
  },

  // Genera las casillas de marca y conexión a partir de los productos
  buildCheckFilters() {
    const brands = [...new Set(PRODUCTS.map(p => p.brand))].sort();
    const connections = [...new Set(PRODUCTS.flatMap(p => p.connections))].filter(c => c !== 'No aplica');
    document.getElementById('brand-filters').innerHTML = brands
      .map(b => `<label class="check-item"><input type="checkbox" value="${b}" /> ${b}</label>`).join('');
    document.getElementById('connection-filters').innerHTML = connections
      .map(c => `<label class="check-item"><input type="checkbox" value="${c}" /> ${c}</label>`).join('');
  },

  setCategory(category) {
    State.filters.category = category;
    document.querySelectorAll('.filter-item').forEach(el => el.classList.toggle('active', el.dataset.category === category));
  },

  getFiltered() {
    let products = [...PRODUCTS];
    const { category, search, priceMin, priceMax, sort, brands, connections, availability } = State.filters;
    if (category !== 'all') products = products.filter(p => p.category === category);
    if (search) products = products.filter(p => [p.name, p.description, p.brand].join(' ').toLowerCase().includes(search));
    if (priceMin !== null) products = products.filter(p => p.price >= priceMin);
    if (priceMax !== null) products = products.filter(p => p.price <= priceMax);
    if (brands.length) products = products.filter(p => brands.includes(p.brand));
    if (connections.length) products = products.filter(p => p.connections.some(c => connections.includes(c)));
    if (availability === 'available') products = products.filter(isAvailable);
    if (availability === 'soldout') products = products.filter(p => !isAvailable(p));

    switch (sort) {
      case 'price-asc': products.sort((a, b) => a.price - b.price); break;
      case 'price-desc': products.sort((a, b) => b.price - a.price); break;
      case 'name-asc': products.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'rating': products.sort((a, b) => b.rating - a.rating); break;
    }
    return products;
  },

  render() {
    const grid = document.getElementById('products-grid');
    const empty = document.getElementById('empty-state');
    const counter = document.getElementById('products-count');
    const products = this.getFiltered();

    grid.innerHTML = '';
    if (products.length === 0) {
      empty.classList.remove('hidden'); counter.textContent = '0 productos'; return;
    }
    empty.classList.add('hidden');
    counter.textContent = `${products.length} producto${products.length !== 1 ? 's' : ''}`;
    products.forEach(product => grid.appendChild(this.createCard(product)));
  },

  createCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card' + (isAvailable(product) ? '' : ' is-soldout');
    const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    const priceOriginalHtml = product.originalPrice ? `<span class="price-original">${money(product.originalPrice)}</span>` : '';
    const badgeText = isAvailable(product) ? product.badge : 'Agotado';
    const badgeHtml = badgeText ? `<span class="product-badge ${badgeText === 'Oferta' || badgeText === 'Agotado' ? 'sale' : ''}">${badgeText}</span>` : '';
    const isCompared = Compare.selectedIds.includes(product.id);

    card.innerHTML = `
      ${badgeHtml}
      <button class="compare-toggle ${isCompared ? 'selected' : ''}" data-compare-id="${product.id}" aria-pressed="${isCompared}">⇆ ${isCompared ? 'En comparación' : 'Comparar'}</button>
      <button class="product-image" data-detail-id="${product.id}" aria-label="Ver detalles de ${product.name}"><img src="${product.image}" alt="${product.name}" loading="lazy" /></button>
      <div class="product-info">
        <span class="product-category">${CATEGORY_LABELS[product.category]} · ${product.brand}</span>
        <button class="product-name" data-detail-id="${product.id}">${product.name}</button>
        <p class="product-description">${product.description}</p>
        <span class="stock-tag ${availabilityClass(product)}">${availabilityText(product)}</span>
        <div class="product-rating"><span class="rating-stars">${stars}</span><span class="rating-count">(${product.reviews})</span></div>
        <button class="details-link" data-detail-id="${product.id}">Ver detalles →</button>
      </div>
      <div class="product-footer">
        <div class="product-price"><span class="price-current">${money(product.price)}</span>${priceOriginalHtml}</div>
        <button class="add-to-cart-btn" data-product-id="${product.id}" ${isAvailable(product) ? '' : 'disabled'}>${isAvailable(product)
          ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Agregar'
          : 'Agotado'}</button>
      </div>
    `;

    card.querySelector('.add-to-cart-btn').addEventListener('click', () => Cart.addItem(product.id));
    return card;
  },

  resetFilters() {
    State.filters = DEFAULT_FILTERS();
    this.setCategory('all');
    document.getElementById('search-input').value = '';
    document.getElementById('clear-search').classList.add('hidden');
    document.getElementById('price-min').value = ''; document.getElementById('price-max').value = '';
    document.getElementById('sort-select').value = 'default';
    document.querySelectorAll('#brand-filters input, #connection-filters input').forEach(i => { i.checked = false; });
    document.querySelector('#availability-filters input[value="all"]').checked = true;
    this.render();
  },
};

// CU Consultar Información del Producto
const ProductDetail = {
  currentId: null,

  init() {
    document.getElementById('product-modal-close').addEventListener('click', () => this.close());
    document.getElementById('product-modal').addEventListener('click', (e) => {
      if (e.target.id === 'product-modal') this.close();
    });
    document.getElementById('product-detail-body').addEventListener('click', (e) => {
      if (e.target.closest('#detail-add')) { Cart.addItem(this.currentId); }
      if (e.target.closest('#detail-compare')) { Compare.toggle(this.currentId); this.open(this.currentId); }
    });
  },

  open(productId) {
    const p = findProduct(productId);
    if (!p) return;
    this.currentId = productId;
    const available = isAvailable(p);
    const compared = Compare.selectedIds.includes(p.id);

    document.getElementById('product-modal-category').textContent = `DESKNOVA / ${CATEGORY_LABELS[p.category].toUpperCase()}`;
    document.getElementById('product-modal-title').textContent = p.name;
    document.getElementById('product-detail-body').innerHTML = `
      <div class="detail-media"><img src="${p.image}" alt="${p.name}" /></div>
      <div class="detail-info">
        <p class="detail-desc">${p.description}</p>
        <div class="detail-price"><span class="price-current">${money(p.price)}</span>${p.originalPrice ? `<span class="price-original">${money(p.originalPrice)}</span>` : ''}<small>Precio final</small></div>
        <dl class="detail-list">
          <dt>Marca</dt><dd>${p.brand}</dd>
          <dt>Tipo de sensor</dt><dd>${p.sensor}</dd>
          <dt>Conexión</dt><dd>${p.connections.join(' / ')}</dd>
          <dt>Compatibilidad</dt><dd>${p.compatibility}</dd>
          <dt>Disponibilidad</dt><dd><span class="stock-tag ${availabilityClass(p)}">${availabilityText(p)}</span></dd>
          <dt>Entrega</dt><dd>${DELIVERY_OPTIONS.join(' o ')} · sin costo adicional</dd>
        </dl>
        <h3 class="detail-subtitle">Especificaciones técnicas</h3>
        <ul class="detail-specs">${p.specs.map(s => `<li>${s}</li>`).join('')}</ul>
        <div class="detail-actions">
          <button class="btn-primary" id="detail-add" ${available ? '' : 'disabled'}>${available ? 'Agregar al carrito' : 'Producto agotado'}</button>
          <button class="btn-outline" id="detail-compare">${compared ? 'Quitar de comparación' : '⇆ Comparar'}</button>
        </div>
      </div>
    `;
    document.getElementById('product-modal').classList.remove('hidden');
  },

  close() { document.getElementById('product-modal').classList.add('hidden'); },
};

// CU Comparar Productos
const Compare = {
  selectedIds: [],
  maxProducts: 3,

  init() {
    document.addEventListener('click', (event) => {
      const toggle = event.target.closest('[data-compare-id]');
      if (!toggle) return;
      this.toggle(Number(toggle.dataset.compareId));
    });

    document.getElementById('compare-open').addEventListener('click', () => this.open());
    document.getElementById('compare-clear').addEventListener('click', () => this.clear());
    document.getElementById('compare-close').addEventListener('click', () => this.close());
    document.getElementById('compare-done').addEventListener('click', () => this.close());
    document.getElementById('compare-modal').addEventListener('click', (event) => {
      if (event.target.id === 'compare-modal') this.close();
    });
    this.renderDock();
  },

  toggle(productId) {
    const idx = this.selectedIds.indexOf(productId);
    if (idx !== -1) {
      this.selectedIds.splice(idx, 1);
    } else if (this.selectedIds.length >= this.maxProducts) {
      Toast.show('Puedes comparar hasta 3 productos a la vez.', 'info', '⇆');
      return;
    } else {
      this.selectedIds.push(productId);
    }

    this.renderDock();
    document.querySelectorAll(`[data-compare-id="${productId}"]`).forEach((btn) => {
      const sel = this.selectedIds.includes(productId);
      btn.classList.toggle('selected', sel);
      btn.setAttribute('aria-pressed', sel);
      btn.textContent = `⇆ ${sel ? 'En comparación' : 'Comparar'}`;
    });
    if (!document.getElementById('compare-modal').classList.contains('hidden')) {
      if (this.selectedIds.length < 2) this.close(); else this.renderTable();
    }
  },

  renderDock() {
    const dock = document.getElementById('compare-dock');
    const count = this.selectedIds.length;
    dock.classList.toggle('hidden', count === 0);
    document.getElementById('compare-count').textContent = `${count} producto${count === 1 ? '' : 's'} ${count >= 2 ? 'listos para comparar' : 'seleccionado'}`;
    document.getElementById('compare-hint').textContent = count >= 2 ? 'Puedes agregar hasta 3 productos' : 'Selecciona al menos 2 para compararlos';
  },

  open() {
    if (this.selectedIds.length < 2) {
      Toast.show('ERROR: Se requiere mínimo de 2 productos para realizar la comparación.', 'error', '!');
      return;
    }
    this.renderTable();
    document.getElementById('compare-modal').classList.remove('hidden');
  },

  close() { document.getElementById('compare-modal').classList.add('hidden'); },

  clear() {
    this.selectedIds = [];
    document.querySelectorAll('[data-compare-id]').forEach((btn) => {
      btn.classList.remove('selected'); btn.setAttribute('aria-pressed', 'false'); btn.textContent = '⇆ Comparar';
    });
    this.renderDock(); this.close();
  },

  renderTable() {
    const products = this.selectedIds.map(findProduct).filter(Boolean);
    const head = document.getElementById('compare-table-head');
    const body = document.getElementById('compare-table-body');
    head.innerHTML = `<tr><th scope="col">Producto</th>${products.map(p => `<th scope="col"><div class="compare-product-head"><img src="${p.image}" alt=""/><span>${p.name}</span><button type="button" data-remove-compare="${p.id}">Quitar</button></div></th>`).join('')}</tr>`;

    const rows = [
      { label: 'Precio', value: p => `<strong class="compare-price">${money(p.price)}</strong>` },
      { label: 'Categoría', value: p => CATEGORY_LABELS[p.category] },
      { label: 'Marca', value: p => p.brand },
      { label: 'Tipo de sensor', value: p => p.sensor },
      { label: 'Tipo de conexión', value: p => p.connections.join(' / ') },
      { label: 'Disponibilidad', value: p => `<span class="stock-tag ${availabilityClass(p)}">${availabilityText(p)}</span>` },
      { label: 'Características técnicas', value: p => `<ul class="compare-specs">${p.specs.map(s => `<li>${s}</li>`).join('')}</ul>` },
      { label: 'Compatibilidad', value: p => p.compatibility },
      { label: 'Valoración', value: p => `${p.rating.toFixed(1)} / 5 · ${p.reviews} reseñas` },
    ];
    const actionsRow = `<tr class="compare-actions-row"><th scope="row">Acciones</th>${products.map(p => `<td>
        <button type="button" class="btn-primary compare-buy" data-buy-id="${p.id}" ${isAvailable(p) ? '' : 'disabled'}>${isAvailable(p) ? 'Comprar ahora' : 'Agotado'}</button>
        <button type="button" class="details-link" data-compare-detail="${p.id}">Ver detalles →</button>
      </td>`).join('')}</tr>`;

    body.innerHTML = rows
      .map(row => `<tr><th scope="row">${row.label}</th>${products.map(p => `<td>${row.value(p)}</td>`).join('')}</tr>`)
      .join('') + actionsRow;

    head.querySelectorAll('[data-remove-compare]').forEach(btn => {
      btn.addEventListener('click', () => this.toggle(Number(btn.dataset.removeCompare)));
    });
    body.querySelectorAll('[data-buy-id]').forEach(btn => {
      btn.addEventListener('click', () => this.buyNow(Number(btn.dataset.buyId)));
    });
    body.querySelectorAll('[data-compare-detail]').forEach(btn => {
      btn.addEventListener('click', () => { this.close(); ProductDetail.open(Number(btn.dataset.compareDetail)); });
    });
  },

  // "Comprar ahora": agrega el producto al carrito y lleva al usuario a pagar
  buyNow(productId) {
    const added = Cart.addItem(productId, { silent: true });
    if (!added) return;
    this.close();
    Router.navigate('cart');
    Toast.show('Producto agregado. Revisa tu pedido y procede al pago.', 'success', '🛒');
  },
};

const Cart = {
  init() {
    document.getElementById('clear-cart-btn').addEventListener('click', () => {
      if (State.cart.length === 0) return;
      State.cart = []; State.persistCart(); this.render(); this.updateCounter();
      Toast.show('Carrito vaciado.', 'info', '🗑️');
    });

    document.getElementById('checkout-btn').addEventListener('click', () => {
      if (State.cart.length === 0) {
        Toast.show('Agregue al menos un producto al carrito para continuar.', 'info', '🛒');
        return;
      }
      Checkout.open();
    });
  },

  addItem(productId, { silent = false } = {}) {
    const product = findProduct(productId);
    if (!product) return false;
    if (!isAvailable(product)) {
      Toast.show(`"${product.name}" está agotado.`, 'error', '!');
      return false;
    }
    const item = State.cart.find(i => i.id === productId);
    if (item && item.quantity >= product.stock) {
      Toast.show(`Solo hay ${product.stock} unidades disponibles.`, 'info', '!');
      return false;
    }
    if (item) item.quantity += 1;
    else State.cart.push({ id: productId, quantity: 1 });

    State.persistCart();
    this.updateCounter();
    if (!silent) Toast.show(`"${product.name}" agregado al carrito`, 'success', '🛒');
    if (State.currentView === 'cart') this.render();
    return true;
  },

  removeItem(productId) {
    State.cart = State.cart.filter(i => i.id !== productId);
    State.persistCart(); this.updateCounter(); this.render();
    Toast.show('Producto eliminado del carrito.', 'info', '✓');
  },

  updateQuantity(productId, delta) {
    const item = State.cart.find(i => i.id === productId);
    const product = findProduct(productId);
    if (!item || !product) return;
    if (delta > 0 && item.quantity >= product.stock) {
      Toast.show(`Solo hay ${product.stock} unidades disponibles.`, 'info', '!');
      return;
    }
    item.quantity += delta;
    if (item.quantity <= 0) { this.removeItem(productId); return; }
    State.persistCart(); this.updateCounter(); this.render();
  },

  getSubtotal() {
    return State.cart.reduce((sum, item) => {
      const p = findProduct(item.id);
      return sum + (p ? p.price * item.quantity : 0);
    }, 0);
  },

  getTotalItems() { return State.cart.reduce((sum, item) => sum + item.quantity, 0); },

  updateCounter() {
    const total = this.getTotalItems();
    document.getElementById('cart-count').textContent = total;
    document.querySelectorAll('[data-cart-count]').forEach(el => { el.textContent = total; });
  },

  render() {
    const subtotal = this.getSubtotal();
    const isEmpty = State.cart.length === 0;

    document.getElementById('cart-empty').classList.toggle('hidden', !isEmpty);
    document.getElementById('cart-items-list').classList.toggle('hidden', isEmpty);
    document.getElementById('shipping-progress-wrapper').classList.toggle('hidden', isEmpty);
    document.getElementById('cart-content-wrapper').classList.toggle('hidden', isEmpty);
    document.getElementById('checkout-btn').disabled = isEmpty;
    document.getElementById('checkout-empty-msg').classList.toggle('hidden', !isEmpty);

    if (!isEmpty) this.renderItems();

    // RF005: la entrega no genera cargos adicionales, el total es el subtotal
    document.getElementById('summary-subtotal').textContent = money(subtotal);
    document.getElementById('summary-total').textContent = money(subtotal);
  },

  renderItems() {
    const list = document.getElementById('cart-items-list');
    list.innerHTML = '';
    State.cart.forEach(item => {
      const p = findProduct(item.id);
      if (!p) return;
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <div class="cart-item-image"><img src="${p.image}" alt="${p.name}" loading="lazy" /></div>
        <div class="cart-item-info">
          <span class="cart-item-cat">${CATEGORY_LABELS[p.category]}</span>
          <span class="cart-item-name">${p.name}</span>
          <span class="cart-item-price">${money(p.price)} c/u</span>
        </div>
        <div class="cart-item-controls">
          <div class="quantity-control">
            <button class="qty-btn" data-action="decrease" data-id="${p.id}" aria-label="Disminuir cantidad">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn" data-action="increase" data-id="${p.id}" aria-label="Aumentar cantidad">+</button>
          </div>
          <span class="cart-item-total">${money(p.price * item.quantity)}</span>
          <button class="remove-item-btn" data-id="${p.id}">Eliminar</button>
        </div>
      `;

      el.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => this.updateQuantity(p.id, btn.dataset.action === 'increase' ? 1 : -1));
      });
      el.querySelector('.remove-item-btn').addEventListener('click', () => this.removeItem(p.id));
      list.appendChild(el);
    });
  },
};

// CU Simular Checkout y Entrega (sin inicio de sesión obligatorio)
const Checkout = {
  init() {
    document.getElementById('checkout-cancel').addEventListener('click', () => this.close());
    document.getElementById('checkout-close').addEventListener('click', () => this.close());
    document.getElementById('checkout-form').addEventListener('submit', (e) => { e.preventDefault(); this.confirm(); });
    document.querySelectorAll('input[name="delivery"]').forEach(r => r.addEventListener('change', () => this.updateDeliveryFields()));
    document.querySelectorAll('.co-input').forEach(i => i.addEventListener('input', () => i.classList.remove('input-error')));
    document.querySelectorAll('input[name="payment"]').forEach(r => r.addEventListener('change', () => {
      document.querySelector('#checkout-form .option-toggle.three').classList.remove('input-error');
    }));
    document.getElementById('modal-close').addEventListener('click', () => {
      this.close();
      Router.navigate('catalog');
    });
  },

  open() {
    if (State.cart.length === 0) {
      Toast.show('Agregue al menos un producto al carrito para continuar.', 'info', '🛒');
      return;
    }
    const form = document.getElementById('checkout-form');
    form.classList.remove('hidden');
    document.getElementById('checkout-success').classList.add('hidden');
    document.getElementById('checkout-step-label').textContent = 'CHECKOUT';
    document.getElementById('checkout-title').textContent = 'Finaliza tu pedido';
    document.getElementById('checkout-error').classList.add('hidden');
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    if (State.user && !document.getElementById('co-email').value) document.getElementById('co-email').value = State.user.email;

    document.getElementById('checkout-summary').innerHTML = State.cart.map(item => {
      const p = findProduct(item.id);
      return `<li><span>${p.name} <small>× ${item.quantity}</small></span><span>${money(p.price * item.quantity)}</span></li>`;
    }).join('');
    document.getElementById('checkout-total').textContent = money(Cart.getSubtotal());
    this.updateDeliveryFields();
    document.getElementById('checkout-modal').classList.remove('hidden');
  },

  close() { document.getElementById('checkout-modal').classList.add('hidden'); },

  getDelivery() { return document.querySelector('input[name="delivery"]:checked').value; },

  updateDeliveryFields() {
    const delivery = this.getDelivery();
    document.querySelectorAll('[data-delivery]').forEach(el => el.classList.toggle('hidden', el.dataset.delivery !== delivery));
  },

  validate() {
    const delivery = this.getDelivery();
    const val = (id) => document.getElementById(id).value.trim();
    const errors = [];
    const mark = (id, msg) => { document.getElementById(id).classList.add('input-error'); errors.push(msg); };

    if (val('co-name').length < 3) mark('co-name', 'Nombre completo');
    if (!/^[0-9+\s-]{7,15}$/.test(val('co-phone'))) mark('co-phone', 'Teléfono (solo números, mínimo 7 dígitos)');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('co-email'))) mark('co-email', 'Correo electrónico válido');
    if (delivery === 'domicilio') {
      if (!val('co-city')) mark('co-city', 'Ciudad');
      if (val('co-address').length < 6) mark('co-address', 'Dirección de entrega');
    } else if (!val('co-store')) {
      mark('co-store', 'Tienda para recoger');
    }
    if (!document.querySelector('input[name="payment"]:checked')) {
      document.querySelector('#checkout-form .option-toggle.three').classList.add('input-error');
      errors.push('Método de pago');
    }
    return errors;
  },

  confirm() {
    const errorBox = document.getElementById('checkout-error');
    const errors = this.validate();
    if (errors.length) {
      errorBox.innerHTML = `<strong>Corrige la siguiente información:</strong> ${errors.join(', ')}.`;
      errorBox.classList.remove('hidden');
      return;
    }
    errorBox.classList.add('hidden');

    const delivery = this.getDelivery();
    const name = document.getElementById('co-name').value.trim();
    const payment = document.querySelector('input[name="payment"]:checked').value;
    const total = money(Cart.getSubtotal());
    const orderNumber = `DN-${Date.now().toString().slice(-6)}`;
    const where = delivery === 'domicilio'
      ? `Lo enviaremos a ${document.getElementById('co-address').value.trim()}, ${document.getElementById('co-city').value.trim()}, en 48 horas.`
      : `Podrás recogerlo en ${document.getElementById('co-store').value} en 24 horas.`;

    document.getElementById('checkout-step-label').textContent = 'COMPRA SIMULADA COMPLETADA';
    document.getElementById('checkout-title').textContent = `Pedido ${orderNumber}`;
    document.getElementById('checkout-success-msg').textContent =
      `Gracias, ${name}. Tu pedido por ${total} (${payment}) fue registrado. ${where}`;
    document.getElementById('checkout-form').classList.add('hidden');
    document.getElementById('checkout-success').classList.remove('hidden');

    // Paso 12 del caso de uso: el sistema limpia el carrito
    State.cart = []; State.persistCart(); Cart.updateCounter(); Cart.render();
    document.getElementById('checkout-form').reset();
  },
};

const Toast = {
  timeoutId: null,
  show(message, type = 'success', icon = '✓') {
    const toast = document.getElementById('toast');
    if (this.timeoutId) clearTimeout(this.timeoutId);
    document.getElementById('toast-message').textContent = message;
    document.getElementById('toast-icon').textContent = icon;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    this.timeoutId = setTimeout(() => toast.classList.add('hidden'), 3600);
  },
};

function handleGlobalClicks(e) {
  const trigger = e.target.closest('[data-view]');
  if (trigger) {
    e.preventDefault();
    // Las tarjetas de categoría de la página de inicio abren el catálogo ya filtrado
    if (trigger.dataset.view === 'catalog' && trigger.dataset.category) Catalog.setCategory(trigger.dataset.category);
    Router.navigate(trigger.dataset.view);
    return;
  }
  const scroll = e.target.closest('[data-scroll]');
  if (scroll) {
    e.preventDefault();
    const target = document.getElementById(scroll.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  ProductDetail.close(); Compare.close(); Checkout.close();
});

document.addEventListener('DOMContentLoaded', () => {
  State.init();
  document.addEventListener('click', handleGlobalClicks);
  Auth.init();
  Catalog.init();
  ProductDetail.init();
  Compare.init();
  Cart.init();
  Checkout.init();
  Auth.updateNavbarUser();
  Cart.updateCounter();
  Router.navigate('landing');
});