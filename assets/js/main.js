// ============================================
// MAIN CONTROLLER - NAVIGASI & INISIALISASI
// ============================================

// Fungsi untuk berpindah halaman
function showPage(pageId) {
    // Sembunyikan semua page
    const pages = ['beranda', 'lokasi', 'order', 'insight'];
    pages.forEach(id => {
        const page = document.getElementById(`page-${id}`);
        if (page) page.style.display = 'none';
    });
    
    // Tampilkan page yang dipilih
    const activePage = document.getElementById(`page-${pageId}`);
    if (activePage) activePage.style.display = 'block';
    
    // Update active class di navigasi
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Cari link yang sesuai dengan halaman aktif
    const activeNav = document.querySelector(`.nav-links a[href*="${pageId === 'beranda' ? 'index' : pageId}"]`);
    if (activeNav) activeNav.classList.add('active');
    
    // Inisialisasi konten sesuai halaman
    if (pageId === 'lokasi' && typeof initLokasiPage === 'function') {
        setTimeout(initLokasiPage, 50);
    } else if (pageId === 'insight' && typeof initInsightPage === 'function') {
        setTimeout(initInsightPage, 50);
    } else if (pageId === 'order' && typeof initOrderPage === 'function') {
        setTimeout(initOrderPage, 50);
    }
    
    // Simpan ke localStorage
    localStorage.setItem('activePage', pageId);
}

// Deteksi halaman saat ini berdasarkan URL
function getCurrentPageFromURL() {
    const path = window.location.pathname;
    if (path.includes('lokasi.html')) return 'lokasi';
    if (path.includes('order.html')) return 'order';
    if (path.includes('insight.html')) return 'insight';
    return 'beranda';
}

// Inisialisasi halaman berdasarkan URL
function initPageFromURL() {
    const currentPage = getCurrentPageFromURL();
    
    // Tampilkan page yang sesuai
    const pages = ['beranda', 'lokasi', 'order', 'insight'];
    pages.forEach(id => {
        const page = document.getElementById(`page-${id}`);
        if (page) page.style.display = id === currentPage ? 'block' : 'none';
    });
    
    // Update active nav
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `${currentPage === 'beranda' ? 'index.html' : currentPage + '.html'}`) {
            link.classList.add('active');
        }
    });
    
    // Inisialisasi konten
    if (currentPage === 'lokasi' && typeof initLokasiPage === 'function') {
        setTimeout(initLokasiPage, 50);
    } else if (currentPage === 'insight' && typeof initInsightPage === 'function') {
        setTimeout(initInsightPage, 50);
    } else if (currentPage === 'order' && typeof initOrderPage === 'function') {
        setTimeout(initOrderPage, 50);
    }
}

// Jalankan saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi berdasarkan URL (karena multiple page)
    initPageFromURL();
    
    // Load cart badge di navbar (jika ada)
    if (typeof updateCartBadges === 'function') {
        setTimeout(updateCartBadges, 100);
    }
});

// Export ke global
window.showPage = showPage;
window.getCurrentPageFromURL = getCurrentPageFromURL;
window.initPageFromURL = initPageFromURL;