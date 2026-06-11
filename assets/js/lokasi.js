// LOGIKA HALAMAN LOKASI

// Render lokasi sesi siang
function renderLokasiSiang() {
    const container = document.getElementById('lokasi-siang-container');
    if (!container) return;
    
    let html = '';
    window.lokasiData.siang.forEach(loc => {
        html += `
            <div class="lokasi-card">
                <img src="${loc.icon}" alt="${loc.name}" class="lokasi-icon">
                <h3>${loc.name}</h3>
                <div class="lokasi-time">⏱ ${loc.time}</div>
                <div class="lokasi-address">
                📍 <a href="${loc.map}" target="_blank">${loc.address}</a>
                </div>
                <div class="lokasi-pros">
                    <h4>Kelebihan Lokasi:</h4>
                    <ul>
                        ${loc.pros.map(pro => `<li>${pro}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// Render lokasi sesi malam
function renderLokasiMalam() {
    const container = document.getElementById('lokasi-malam-container');
    if (!container) return;
    
    let html = '';
    window.lokasiData.malam.forEach(loc => {
        html += `
            <div class="lokasi-card">
                <img src="${loc.icon}" alt="${loc.name}" class="lokasi-icon">
                <h3>${loc.name}</h3>
                <div class="lokasi-time">⏱ ${loc.time}</div>
                <div class="lokasi-address">
                📍 <a href="${loc.map}" target="_blank">${loc.address}</a>
                </div>
                <div class="lokasi-pros">
                    <h4>Kelebihan Lokasi:</h4>
                    <ul>
                        ${loc.pros.map(pro => `<li>${pro}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// Render faktor penjualan sesi siang
function renderFaktorSiang() {
    const container = document.getElementById('faktor-siang-container');
    if (!container) return;
    
    let html = '<div class="faktor-grid">';
    window.faktorSiangData.forEach(f => {
        html += `
            <div class="faktor-card">
                <div class="faktor-icon">${f.icon}</div>
                <h4>${f.name}</h4>
                <p>${f.desc}</p>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

// Render faktor penjualan sesi malam
function renderFaktorMalam() {
    const container = document.getElementById('faktor-malam-container');
    if (!container) return;
    
    let html = '<div class="faktor-grid">';
    window.faktorMalamData.forEach(f => {
        html += `
            <div class="faktor-card">
                <div class="faktor-icon">${f.icon}</div>
                <h4>${f.name}</h4>
                <p>${f.desc}</p>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

// Switch antara sesi siang dan malam
function switchSesi(sesi) {
    const siangPanel = document.getElementById('siang-panel');
    const malamPanel = document.getElementById('malam-panel');
    const tabs = document.querySelectorAll('.lokasi-button');
    
    if (sesi === 'siang') {
        if (siangPanel) siangPanel.style.display = 'block';
        if (malamPanel) malamPanel.style.display = 'none';
        if (tabs[0]) tabs[0].classList.add('active');
        if (tabs[1]) tabs[1].classList.remove('active');
    } else {
        if (siangPanel) siangPanel.style.display = 'none';
        if (malamPanel) malamPanel.style.display = 'block';
        if (tabs[0]) tabs[0].classList.remove('active');
        if (tabs[1]) tabs[1].classList.add('active');
    }
}

// Inisialisasi halaman lokasi
function initLokasiPage() {
    renderLokasiSiang();
    renderLokasiMalam();
    renderFaktorSiang();
    renderFaktorMalam();
}

// Export ke global
window.renderLokasiSiang = renderLokasiSiang;
window.renderLokasiMalam = renderLokasiMalam;
window.renderFaktorSiang = renderFaktorSiang;
window.renderFaktorMalam = renderFaktorMalam;
window.switchSesi = switchSesi;
window.initLokasiPage = initLokasiPage;