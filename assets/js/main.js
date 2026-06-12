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
    let targetHref = '';
    if (pageId === 'beranda') targetHref = '/index.html';
    else if (pageId === 'lokasi') targetHref = 'lokasi.html';
    else if (pageId === 'order') targetHref = 'order.html';
    else if (pageId === 'insight') targetHref = 'insight.html';
    
    const activeNav = document.querySelector(`.nav-links a[href="${targetHref}"]`);
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
        let targetHref = '';
        if (currentPage === 'beranda') targetHref = '/index.html';
        else if (currentPage === 'lokasi') targetHref = 'lokasi.html';
        else if (currentPage === 'order') targetHref = 'order.html';
        else if (currentPage === 'insight') targetHref = 'insight.html';
        
        if (link.getAttribute('href') === targetHref) {
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
    initPageFromURL();
    
    if (typeof updateCartBadges === 'function') {
        setTimeout(updateCartBadges, 100);
    }
});

// Export ke global
window.showPage = showPage;
window.getCurrentPageFromURL = getCurrentPageFromURL;
window.initPageFromURL = initPageFromURL;

document.addEventListener('DOMContentLoaded', () => {
    const menuBar = document.getElementById('menu-bar');
    const navMenu = document.getElementById('nav');

    if (menuBar && navMenu) {
        menuBar.addEventListener('click', () => {
            menuBar.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.addEventListener('click', () => {
                menuBar.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});
