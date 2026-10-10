/* ═══════════════════════════════════════════════════════
   DESK NOVA — app.js (SPA Completa con 15 Productos y Comparador)
═══════════════════════════════════════════════════════ */
'use strict';

const CONFIG = {
  FREE_SHIPPING_THRESHOLD: 150,
  SHIPPING_COST: 15,
  SESSION_KEY: 'desknova_session',
  CART_KEY: 'desknova_cart',
  CHECKOUT_PENDING_KEY: 'desknova_checkout_pending',
};

const CREDENTIALS = {
  email: 'demo@desknova.com',
  password: 'demo',
};

// 15 Productos de alta calidad distribuidos en categorías
const PRODUCTS = [
  { id: 1, name: 'Teclado Mecánico Pro RGB', description: 'Switches Cherry MX Blue, retroiluminación RGB por tecla, anti-ghosting total.', price: 189.99, originalPrice: 229.99, category: 'teclados', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1100&q=85', rating: 4.9, reviews: 342, badge: 'Bestseller' },
  { id: 2, name: 'Teclado Compacto TKL Silent', description: 'Teclado tenkeyless con switches silenciosos, ideal para espacios reducidos.', price: 119.99, originalPrice: null, category: 'teclados', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1100&q=85', rating: 4.7, reviews: 158, badge: null },
  { id: 3, name: 'Teclado Custom Alum 75%', description: 'Estructura de aluminio CNC, gasket mount, switches lineales lubricados de fábrica.', price: 219.99, originalPrice: 259.99, category: 'teclados', image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1100&q=85', rating: 5.0, reviews: 92, badge: 'Nuevo' },
  { id: 4, name: 'Mouse Ergonómico Wireless', description: 'Diseño ergonómico para zurdos y diestros, DPI ajustable 800-6000, batería 90 días.', price: 79.99, originalPrice: 99.99, category: 'ratones', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1100&q=85', rating: 4.8, reviews: 512, badge: 'Oferta' },
  { id: 5, name: 'Mouse Gaming Hyperion X', description: 'Sensor óptico de 16.000 DPI, clic mecánico de alta precisión, RGB customizable.', price: 129.99, originalPrice: null, category: 'ratones', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1100&q=85', rating: 4.9, reviews: 89, badge: 'Nuevo' },
  { id: 6, name: 'Mouse Vertical Workspace', description: 'Ángulo de 57 grados para prevenir lesiones de túnel carpiano. Inalámbrico dual.', price: 69.99, originalPrice: 89.99, category: 'ratones', image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?auto=format&fit=crop&w=1100&q=85', rating: 4.6, reviews: 230, badge: null },
  { id: 7, name: 'Headset Pro Noise Cancel', description: 'Cancelación activa de ruido, drivers de 40mm, autonomía de 30h, micrófono retráctil.', price: 149.99, originalPrice: 189.99, category: 'audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1100&q=85', rating: 4.8, reviews: 267, badge: 'Oferta' },
  { id: 8, name: 'Micrófono USB Kondenser', description: 'Patrón cardioide, muestreo 24bit/96kHz, brazo articulado incluido.', price: 109.99, originalPrice: null, category: 'audio', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1100&q=85', rating: 4.6, reviews: 94, badge: null },
  { id: 9, name: 'Monitores de Estudio Activos', description: 'Respuesta plana de frecuencia, potencia de 50W, sonido cristalino para edición.', price: 220.00, originalPrice: null, category: 'audio', image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=1100&q=85', rating: 4.9, reviews: 112, badge: 'Premium' },
  { id: 10, name: 'Lámpara LED Smart Desk', description: 'Control táctil, temperatura de color 2700K-6500K, modo lectura sin parpadeo.', price: 59.99, originalPrice: 79.99, category: 'iluminacion', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1100&q=85', rating: 4.7, reviews: 201, badge: null },
  { id: 11, name: 'Tira RGB Ambient Monitor', description: 'Tira LED con 16 millones de colores, sync con pantalla, adhesivo premium.', price: 34.99, originalPrice: null, category: 'iluminacion', image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1100&q=85', rating: 4.5, reviews: 445, badge: null },
  { id: 12, name: 'Monitor IPS 27" 165Hz', description: 'Panel IPS 2K QHD, tiempo de respuesta 1ms, DisplayHDR 400, sin marco.', price: 399.99, originalPrice: 459.99, category: 'monitores', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1100&q=85', rating: 4.9, reviews: 188, badge: 'Bestseller' },
  { id: 13, name: 'Monitor Ultrapanorámico 34"', description: 'Curvatura 1000R, 21:9, 144Hz, compatible con G-Sync y FreeSync Premium.', price: 649.99, originalPrice: null, category: 'monitores', image: 'https://images.unsplash.com/photo-1586952518485-11b180e92764?auto=format&fit=crop&w=1100&q=85', rating: 4.8, reviews: 73, badge: 'Premium' },
  { id: 14, name: 'Hub USB-C 12 en 1', description: 'HDMI 4K, lector de tarjetas, Ethernet Gigabit, PD 100W, 4× USB 3.0.', price: 69.99, originalPrice: 89.99, category: 'accesorios', image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=1100&q=85', rating: 4.6, reviews: 321, badge: null },
  { id: 15, name: 'Alfombrilla XL Gaming DeskPad', description: 'Superficie extendida 90×40cm, base antideslizante, bordes cosidos reforzados.', price: 29.99, originalPrice: null, category: 'accesorios', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1100&q=85', rating: 4.7, reviews: 634, badge: null },
];

const State = {
  currentView: 'landing',
  isAuthenticated: false,
  user: null,
  cart: [],
  checkoutPending: false,
  filters: { category: 'all', search: '', priceMin: null, priceMax: null, sort: 'default' },

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
      try { this.cart = JSON.parse(savedCart); }
      catch (_) { localStorage.removeItem(CONFIG.CART_KEY); }
    }

    this.checkoutPending = sessionStorage.getItem(CONFIG.CHECKOUT_PENDING_KEY) === 'true';
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
    if (this.GUEST_ONLY.includes(view) && State.isAuthenticated) {
      this._show(State.checkoutPending ? 'cart' : 'catalog');
      return;
    }
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
      if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
        State.login(email);
        this.updateNavbarUser();
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').classList.remove('hidden');
        submitBtn.querySelector('.btn-loader').classList.add('hidden');
        const returnView = State.checkoutPending ? 'cart' : 'catalog';
        State.checkoutPending = false;
        sessionStorage.removeItem(CONFIG.CHECKOUT_PENDING_KEY);
        Router.navigate(returnView);
        Toast.show(returnView === 'cart' ? 'Sesión iniciada. Revisa tu pedido.' : '¡Bienvenido a Desk Nova!', 'success', returnView === 'cart' ? '✓' : '👋');
        if (returnView === 'cart') Cart.showCheckoutModal();
      } else {
        document.getElementById('login-error').classList.remove('hidden');
        document.getElementById('login-error-msg').textContent = 'Credenciales incorrectas. Prueba: demo@desknova.com / demo';
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').classList.remove('hidden');
        submitBtn.querySelector('.btn-loader').classList.add('hidden');
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
    const isText = pwdInput.type === 'text';
    pwdInput.type = isText ? 'password' : 'text';
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
    if (State.user) {
      document.getElementById('user-email-display').textContent = State.user.email;
    }
  },
};

const Catalog = {
  init() {
    document.getElementById('category-filters').addEventListener('click', (e) => {
      const item = e.target.closest('.filter-item');
      if (!item) return;
      document.querySelectorAll('.filter-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      State.filters.category = item.dataset.category;
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

    document.getElementById('sort-select').addEventListener('change', (e) => {
      State.filters.sort = e.target.value; this.render();
    });

    document.getElementById('reset-filters').addEventListener('click', () => this.resetFilters());
    document.getElementById('mobile-filter-toggle').addEventListener('click', () => {
      document.querySelector('.catalog-sidebar').classList.toggle('open');
    });
  },

  getFiltered() {
    let products = [...PRODUCTS];
    const { category, search, priceMin, priceMax, sort } = State.filters;
    if (category !== 'all') products = products.filter(p => p.category === category);
    if (search) products = products.filter(p => p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search));
    if (priceMin !== null) products = products.filter(p => p.price >= priceMin);
    if (priceMax !== null) products = products.filter(p => p.price <= priceMax);

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
    card.className = 'product-card';
    const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    const priceOriginalHtml = product.originalPrice ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : '';
    const badgeHtml = product.badge ? `<span class="product-badge ${product.badge === 'Oferta' ? 'sale' : ''}">${product.badge}</span>` : '';
    const isCompared = Compare.selectedIds.includes(product.id);

    card.innerHTML = `
      ${badgeHtml}
      <button class="compare-toggle ${isCompared ? 'selected' : ''}" data-compare-id="${product.id}" aria-pressed="${isCompared}">⇆ ${isCompared ? 'En comparación' : 'Comparar'}</button>
      <div class="product-image"><img src="${product.image}" alt="${product.name}" loading="lazy" /></div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-rating"><span class="rating-stars">${stars}</span><span class="rating-count">(${product.reviews})</span></div>
      </div>
      <div class="product-footer">
        <div class="product-price"><span class="price-current">$${product.price.toFixed(2)}</span>${priceOriginalHtml}</div>
        <button class="add-to-cart-btn" data-product-id="${product.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Agregar</button>
      </div>
    `;

    card.querySelector('.add-to-cart-btn').addEventListener('click', () => Cart.addItem(product.id));
    return card;
  },

  resetFilters() {
    State.filters = { category: 'all', search: '', priceMin: null, priceMax: null, sort: 'default' };
    document.querySelectorAll('.filter-item').forEach(el => el.classList.remove('active'));
    document.querySelector('.filter-item[data-category="all"]').classList.add('active');
    document.getElementById('search-input').value = '';
    document.getElementById('clear-search').classList.add('hidden');
    document.getElementById('price-min').value = ''; document.getElementById('price-max').value = '';
    document.getElementById('sort-select').value = 'default';
    this.render();
  },
};

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
      btn.textContent = `⇆ ${sel ? 'En comparación' : 'Comparar'}`;
    });
    if (!document.getElementById('compare-modal').classList.contains('hidden')) this.renderTable();
  },

  renderDock() {
    const dock = document.getElementById('compare-dock');
    const count = this.selectedIds.length;
    dock.classList.toggle('hidden', count === 0);
    document.getElementById('compare-count').textContent = `${count} producto${count === 1 ? '' : 's'} ${count >= 2 ? 'listos para comparar' : 'seleccionado'}`;
    document.getElementById('compare-open').disabled = count < 2;
  },

  open() {
    if (this.selectedIds.length < 2) return;
    this.renderTable();
    document.getElementById('compare-modal').classList.remove('hidden');
  },

  close() { document.getElementById('compare-modal').classList.add('hidden'); },

  clear() {
    this.selectedIds = [];
    document.querySelectorAll('[data-compare-id]').forEach((btn) => {
      btn.classList.remove('selected'); btn.textContent = '⇆ Comparar';
    });
    this.renderDock(); this.close();
  },

  renderTable() {
    const products = this.selectedIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    const head = document.getElementById('compare-table-head');
    const body = document.getElementById('compare-table-body');
    head.innerHTML = `<tr><th scope="col">Producto</th>${products.map(p => `<th scope="col"><div class="compare-product-head"><img src="${p.image}" alt=""/><span>${p.name}</span><button type="button" data-remove-compare="${p.id}">Quitar</button></div></th>`).join('')}</tr>`;
    
    body.innerHTML = [
      { label: 'Precio', value: p => `$${p.price.toFixed(2)}` },
      { label: 'Categoría', value: p => p.category },
      { label: 'Descripción', value: p => p.description },
      { label: 'Valoración', value: p => `${p.rating.toFixed(1)} / 5 · ${p.reviews} reseñas` },
    ].map(row => `<tr><th scope="row">${row.label}</th>${products.map(p => `<td>${row.value(p)}</td>`).join('')}</tr>`).join('');

    head.querySelectorAll('[data-remove-compare]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.toggle(Number(btn.dataset.removeCompare));
        if (this.selectedIds.length < 2) this.close();
        else this.renderTable();
      });
    });
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
      if (State.cart.length === 0) { Toast.show('Tu carrito está vacío.', 'info', '🛒'); return; }
      if (!State.isAuthenticated) {
        State.checkoutPending = true;
        sessionStorage.setItem(CONFIG.CHECKOUT_PENDING_KEY, 'true');
        Toast.show('Inicia sesión para continuar con tu compra.', 'info', '🔒');
        Router.navigate('login');
        return;
      }
      this.showCheckoutModal();
    });

    document.getElementById('checkout-cancel').addEventListener('click', () => {
      document.getElementById('checkout-modal').classList.add('hidden');
    });

    document.getElementById('confirm-order').addEventListener('click', () => {
      document.getElementById('checkout-step-label').textContent = 'COMPRA COMPLETADA';
      document.getElementById('checkout-title').textContent = '¡Pedido confirmado!';
      document.getElementById('checkout-description').textContent = 'Gracias por tu compra. En breve procesaremos tu envío express a Bucaramanga.';
      document.getElementById('checkout-actions').classList.add('hidden');
      document.getElementById('modal-close').classList.remove('hidden');
    });

    document.getElementById('modal-close').addEventListener('click', () => {
      document.getElementById('checkout-modal').classList.add('hidden');
      document.getElementById('checkout-actions').classList.remove('hidden');
      document.getElementById('modal-close').classList.add('hidden');
      State.cart = []; State.persistCart(); this.render(); this.updateCounter();
      Router.navigate('catalog');
    });
  },

  addItem(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const item = State.cart.find(i => i.id === productId);
    if (item) item.quantity += 1;
    else State.cart.push({ id: productId, quantity: 1 });

    State.persistCart();
    this.updateCounter();
    Toast.show(`"${product.name}" agregado al carrito`, 'success', '🛒');
    if (State.currentView === 'cart') this.render();
  },

  removeItem(productId) {
    State.cart = State.cart.filter(i => i.id !== productId);
    State.persistCart(); this.updateCounter(); this.render();
    Toast.show('Producto eliminado del carrito.', 'info', '✓');
  },

  updateQuantity(productId, delta) {
    const item = State.cart.find(i => i.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) { this.removeItem(productId); return; }
    State.persistCart(); this.updateCounter(); this.render();
  },

  getSubtotal() {
    return State.cart.reduce((sum, item) => {
      const p = PRODUCTS.find(prod => prod.id === item.id);
      return sum + (p ? p.price * item.quantity : 0);
    }, 0);
  },

  getTotalItems() { return State.cart.reduce((sum, item) => sum + item.quantity, 0); },

  updateCounter() {
    const total = this.getTotalItems();
    document.getElementById('cart-count').textContent = total;
    document.querySelectorAll('[data-cart-count]').forEach(el => el.textContent = total);
  },

  render() {
    const subtotal = this.getSubtotal();
    const isEmpty = State.cart.length === 0;
    const shippingCost = subtotal >= CONFIG.FREE_SHIPPING_THRESHOLD ? 0 : CONFIG.SHIPPING_COST;
    const total = subtotal + shippingCost;

    document.getElementById('cart-empty').classList.toggle('hidden', !isEmpty);
    document.getElementById('cart-items-list').classList.toggle('hidden', isEmpty);
    document.getElementById('shipping-progress-wrapper').classList.toggle('hidden', isEmpty);
    document.getElementById('cart-content-wrapper').classList.toggle('hidden', isEmpty);

    if (!isEmpty) {
      this.renderItems();
      this.renderShippingProgress(subtotal);
    }

    document.getElementById('summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    if (subtotal >= CONFIG.FREE_SHIPPING_THRESHOLD) {
      document.getElementById('summary-shipping-line').classList.add('hidden');
      document.getElementById('summary-free-shipping-line').classList.remove('hidden');
    } else {
      document.getElementById('summary-shipping-line').classList.remove('hidden');
      document.getElementById('summary-free-shipping-line').classList.add('hidden');
      document.getElementById('summary-shipping').textContent = `$${CONFIG.SHIPPING_COST.toFixed(2)}`;
    }
    document.getElementById('summary-total').textContent = `$${total.toFixed(2)}`;
  },

  renderItems() {
    const list = document.getElementById('cart-items-list');
    list.innerHTML = '';
    State.cart.forEach(item => {
      const p = PRODUCTS.find(prod => prod.id === item.id);
      if (!p) return;
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <div class="cart-item-image"><img src="${p.image}" alt="${p.name}" loading="lazy" /></div>
        <div class="cart-item-info">
          <span class="cart-item-cat">${p.category}</span>
          <span class="cart-item-name">${p.name}</span>
          <span class="cart-item-price">$${p.price.toFixed(2)} c/u</span>
        </div>
        <div class="cart-item-controls">
          <div class="quantity-control">
            <button class="qty-btn" data-action="decrease" data-id="${p.id}">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn" data-action="increase" data-id="${p.id}">+</button>
          </div>
          <span class="cart-item-total">$${(p.price * item.quantity).toFixed(2)}</span>
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

  renderShippingProgress(subtotal) {
    const threshold = CONFIG.FREE_SHIPPING_THRESHOLD;
    const percent = Math.min((subtotal / threshold) * 100, 100);
    const remaining = Math.max(threshold - subtotal, 0);

    const messageEl = document.getElementById('shipping-message');
    const percentEl = document.getElementById('shipping-percent');
    const progressEl = document.getElementById('shipping-progress-fill');

    if (subtotal >= threshold) {
      messageEl.innerHTML = '🎉 <strong>¡Felicitaciones!</strong> Tienes envío gratis.';
      percentEl.textContent = '100%';
    } else {
      messageEl.innerHTML = `🚚 Te faltan <strong>$${remaining.toFixed(2)}</strong> para <strong>envío gratis</strong>`;
      percentEl.textContent = `${Math.round(percent)}%`;
    }
    progressEl.style.width = `${percent}%`;
  },

  showCheckoutModal() {
    const subtotal = this.getSubtotal();
    const shipping = subtotal >= CONFIG.FREE_SHIPPING_THRESHOLD ? 0 : CONFIG.SHIPPING_COST;
    document.getElementById('checkout-step-label').textContent = 'CHECKOUT';
    document.getElementById('checkout-title').textContent = 'Revisa tu pedido';
    document.getElementById('checkout-description').textContent = `Total a pagar: $${(subtotal + shipping).toFixed(2)}. Confirma para finalizar tu compra.`;
    document.getElementById('checkout-actions').classList.remove('hidden');
    document.getElementById('modal-close').classList.add('hidden');
    document.getElementById('checkout-modal').classList.remove('hidden');
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
    this.timeoutId = setTimeout(() => toast.classList.add('hidden'), 3200);
  },
};

function handleGlobalClicks(e) {
  const trigger = e.target.closest('[data-view]');
  if (trigger) {
    e.preventDefault();
    Router.navigate(trigger.dataset.view);
    return;
  }
  const scroll = e.target.closest('[data-scroll]');
  if (scroll) {
    e.preventDefault();
    const target = document.getElementById(scroll.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    return;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  State.init();
  document.addEventListener('click', handleGlobalClicks);
  Auth.init();
  Catalog.init();
  Compare.init();
  Cart.init();
  Auth.updateNavbarUser();
  Cart.updateCounter();
  Router.navigate('landing');
});