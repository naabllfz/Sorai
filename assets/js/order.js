// LOGIKA PEMESANAN & KERANJANG BELANJA

let cart = [];

// Load cart dari localStorage saat halaman dimuat
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('sorai_cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            renderCart();
            updateCartBadges();
        } catch(e) {
            console.error('Gagal load cart:', e);
        }
    }
}

// Simpan cart ke localStorage
function saveCartToStorage() {
    localStorage.setItem('sorai_cart', JSON.stringify(cart));
}

// Update badge cart di navbar
function updateCartBadges() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const navBadge = document.getElementById('cart-badge-nav');
    if (navBadge) {
        if (totalItems > 0) {
            navBadge.textContent = totalItems;
            navBadge.style.display = 'inline-block';
        } else {
            navBadge.style.display = 'none';
        }
    }
}

// Render daftar menu di halaman order
function renderMenuList() {
    const container = document.getElementById('menu-list-container');
    if (!container) return;
    
    const categories = {
        'Kopi Kuat': [],
        'Kopi Sedang': [],
        'Kopi Lemah': [],
        'Bukan Kopi': [],
        'Tambahan': []
    };
    
    window.menuData.forEach(menu => {
        if (categories[menu.category]) {
            categories[menu.category].push(menu);
        }
    });
    
    let html = '';
    for (const [category, items] of Object.entries(categories)) {
        if (items.length === 0) continue;
        
        html += `
            <div class="menu-category">
                <h3 class="menu-category-title">${category}</h3>
                <div class="menu-list">
        `;
        
        items.forEach(menu => {
            html += `
                <div class="menu-item" data-id="${menu.id}">
                    <div style="flex: 1;">
                        <span class="menu-name">${menu.name} ${menu.bestSeller ? '⭐' : ''}</span>
                        <span class="menu-desc">${menu.description}</span>
                    </div>
                    <div class="menu-dots"></div>
                    <div class="menu-price">
                        Rp ${menu.price.toLocaleString('id-ID')}
                    </div>
                    <div>
                        <button class="button-tambah" onclick="addToCart(${menu.id})">Tambah</button>
                    </div>
                </div>
            `;
        });
        
        html += `</div></div>`;
    }
    
    container.innerHTML = html;
}

// Tambah item ke keranjang
function addToCart(menuId) {
    const menu = window.menuData.find(m => m.id === menuId);
    if (!menu) return;
    
    const existingItem = cart.find(item => item.id === menuId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: menu.id,
            name: menu.name,
            price: menu.price,
            quantity: 1
        });
    }
    
    renderCart();
    updateCartBadges();
    saveCartToStorage();
    
    // Animasi feedback
    const btn = event.target;
    setTimeout(() => {
        btn.textContent = 'Tambah';
    }, 1000);
}

// Update quantity item di keranjang
function updateCartQuantity(menuId, newQuantity) {
    if (newQuantity <= 0) {
        cart = cart.filter(item => item.id !== menuId);
    } else {
        const item = cart.find(item => item.id === menuId);
        if (item) item.quantity = newQuantity;
    }
    
    renderCart();
    updateCartBadges();
    saveCartToStorage();
}

// Hapus item dari keranjang
function removeFromCart(menuId) {
    cart = cart.filter(item => item.id !== menuId);
    renderCart();
    updateCartBadges();
    saveCartToStorage();
}

// Kosongkan semua keranjang
function clearCart() {
    if (confirm('Yakin ingin menghapus semua item di keranjang?')) {
        cart = [];
        renderCart();
        updateCartBadges();
        saveCartToStorage();
    }
}

// Render tampilan keranjang
function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-kosong');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-jumlah');
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        if (cartEmpty) cartEmpty.style.display = 'block';
        if (cartItems) cartItems.style.display = 'none';
        if (cartTotal) cartTotal.textContent = '0';
        if (cartCount) cartCount.textContent = '0';
        return;
    }
    
    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartItems) cartItems.style.display = 'block';
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
                </div>
                <div class="cart-item-actions">
                    <button class="cart-button" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="cart-button" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="cart-remove" onclick="removeFromCart(${item.id})">Hapus</button>
                </div>
                <div class="cart-item-subtotal">Rp ${subtotal.toLocaleString('id-ID')}</div>
            </div>
        `;
    });
    
    if (cartItems) cartItems.innerHTML = html;
    if (cartTotal) cartTotal.textContent = total.toLocaleString('id-ID');
    if (cartCount) cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Set default date ke hari ini
function setDefaultDate() {
    const dateInput = document.getElementById('order-date');
    if (dateInput && !dateInput.value) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }
}

// Submit pesanan
function submitOrder() {
    const nama = document.getElementById('customer-name').value.trim();
    const wa = document.getElementById('customer-wa').value.trim();
    const tanggal = document.getElementById('order-date').value;
    const lokasi = document.getElementById('order-location').value;
    const catatan = document.getElementById('order-notes').value.trim();
    
    // Validasi
    if (!nama || !wa || !tanggal || !lokasi) {
        alert('Mohon lengkapi semua data pemesan!');
        return false;
    }
    
    if (!wa.match(/^08[0-9]{8,12}$/)) {
        alert('Format nomor WhatsApp tidak valid. Harus diawali 08 dan 10-14 digit.');
        return false;
    }
    
    if (cart.length === 0) {
        alert('Keranjang belanja masih kosong! Silakan pilih menu terlebih dahulu.');
        return false;
    }
    
    // Hitung total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Format detail pesanan
    let orderDetail = '';
    cart.forEach(item => {
        orderDetail += `- ${item.name} x${item.quantity} = Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n`;
    });
    
    const tglFormatted = new Date(tanggal).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Simpan ke localStorage
    const orderData = {
        id: Date.now(),
        nama: nama,
        wa: wa,
        tanggal: tanggal,
        lokasi: lokasi,
        catatan: catatan,
        items: cart,
        total: total,
        timestamp: new Date().toISOString()
    };
    
    const orders = JSON.parse(localStorage.getItem('sorai_orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('sorai_orders', JSON.stringify(orders));
    
    // Tampilkan ringkasan
    alert(`PESANAN DITERIMA!\n\nDetail Pesanan:\n${orderDetail}\nTotal: Rp ${total.toLocaleString('id-ID')}\n\nPengambilan: ${lokasi}\nTanggal: ${tglFormatted}\n\nAkan dikonfirmasi ke ${wa}`);
    
    // Reset keranjang
    cart = [];
    renderCart();
    updateCartBadges();
    saveCartToStorage();
    
    // Reset form
    document.getElementById('customer-name').value = '';
    document.getElementById('customer-wa').value = '';
    document.getElementById('order-notes').value = '';
    document.getElementById('order-location').value = '';
    
    return true;
}

// Inisialisasi halaman order
function initOrderPage() {
    setDefaultDate();
    loadCartFromStorage();
    renderMenuList();
}

// Export ke global
window.cart = cart;
window.addToCart = addToCart;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.renderCart = renderCart;
window.updateCartBadges = updateCartBadges;
window.saveCartToStorage = saveCartToStorage;
window.loadCartFromStorage = loadCartFromStorage;
window.renderMenuList = renderMenuList;
window.submitOrder = submitOrder;
window.initOrderPage = initOrderPage;