// ============================================
// LOGIKA HALAMAN INSIGHT (HASIL WAWANCARA UMKM)
// DENGAN MONITORING BAHAN BAKU & KEPUTUSAN HARGA
// ============================================

let inventoryData = null;
let priceDecision = null;

// Data harga bahan baku (simulasi update real-time)
const bahanBakuData = {
    susu: {
        name: 'Susu Cair',
        currentPrice: 18000,
        lastMonthPrice: 16000,
        trend: 'naik',
        unit: '/liter',
        stock: 15,
        minStock: 10,
        impact: 'high'
    },
    kopi: {
        name: 'Biji Kopi',
        currentPrice: 85000,
        lastMonthPrice: 80000,
        trend: 'naik',
        unit: '/kg',
        stock: 8,
        minStock: 5,
        impact: 'high'
    },
    matcha: {
        name: 'Matcha Powder',
        currentPrice: 120000,
        lastMonthPrice: 120000,
        trend: 'stabil',
        unit: '/kg',
        stock: 3,
        minStock: 2,
        impact: 'medium'
    },
    gula: {
        name: 'Gula Aren',
        currentPrice: 22000,
        lastMonthPrice: 20000,
        trend: 'naik',
        unit: '/kg',
        stock: 12,
        minStock: 8,
        impact: 'medium'
    },
    creamer: {
        name: 'Creamer',
        currentPrice: 15000,
        lastMonthPrice: 14000,
        trend: 'naik',
        unit: '/kg',
        stock: 10,
        minStock: 6,
        impact: 'low'
    },
    cup: {
        name: 'Cup + Tutup',
        currentPrice: 1200,
        lastMonthPrice: 1200,
        trend: 'stabil',
        unit: '/pc',
        stock: 200,
        minStock: 100,
        impact: 'low'
    }
};

// Inisialisasi data inventory
function initInventory() {
    const saved = localStorage.getItem('sorai_inventory');
    if (saved) {
        inventoryData = JSON.parse(saved);
    } else {
        inventoryData = JSON.parse(JSON.stringify(bahanBakuData));
    }
    
    const savedDecision = localStorage.getItem('sorai_price_decision');
    if (savedDecision) {
        priceDecision = JSON.parse(savedDecision);
    }
}

// Simpan inventory ke localStorage
function saveInventory() {
    localStorage.setItem('sorai_inventory', JSON.stringify(inventoryData));
}

// Simpan keputusan harga
function savePriceDecision() {
    localStorage.setItem('sorai_price_decision', JSON.stringify(priceDecision));
}

// Render 6 tantangan utama
function renderTantangan() {
    const container = document.getElementById('tantangan-container');
    if (!container) return;
    
    const challengesWithImpact = window.challengesData.map((challenge, index) => ({
        ...challenge,
        impact: [5, 4, 5, 4, 5, 4][index],
    }));
    
    let html = '<div class="tantangan-grid">';
    challengesWithImpact.forEach(challenge => {
        const impactPercent = (challenge.impact / 5) * 100;
        html += `
            <div class="tantangan-item">
                <div class="tantangan-header">
                    <strong>${challenge.title}</strong>
                    <span class="impact-badge" style="background: ${getImpactColor(challenge.impact)}">
                        Dampak ${'⭐'.repeat(challenge.impact)}${'☆'.repeat(5 - challenge.impact)}
                    </span>
                </div>
                <p>${challenge.desc}</p>
                <div class="impact-bar">
                    <div class="impact-fill" style="width: ${impactPercent}%; background: ${getImpactColor(challenge.impact)};"></div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

function getImpactColor(impact) {
    if (impact >= 4) return '#e74c3c';
    if (impact >= 3) return '#f39c12';
    return '#27ae60';
}

// Render minat produk (LANGSUNG dari window.menuData)
function renderMinatProduk() {
    const container = document.getElementById('minat-produk-container');
    if (!container) return;
    
    if (!window.menuData) {
        container.innerHTML = '<p>Error: Data menu tidak tersedia</p>';
        return;
    }
    
    // Filter best seller (bestSeller = true)
    const bestSellers = window.menuData.filter(m => m.bestSeller === true);
    
    // Cari menu yang kurang diminati (Americano)
    const lowInterest = window.menuData.find(m => m.name === 'Americano');
    
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
            <!-- Best Seller Card -->
            <div style="background: linear-gradient(135deg, #2c1810, #4a2c1a); padding: 25px; border-radius: 20px; color: white;">
                <h2 style="color: #c49a6c; margin-bottom: 15px;">Best Seller</h2>
                ${bestSellers.map(bs => `
                    <div style="background: rgba(255,255,255,0.1); border-radius: 12px; padding: 15px; margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong style="font-size: 20px;">${bs.name}</strong>
                                <div style="font-size: 13px; opacity: 0.8;">${bs.category}</div>
                            </div>
                            <div style="text-align: right;">
                                <div style="font-size: 18px; color: #c49a6c;">Rp ${bs.price.toLocaleString('id-ID')}</div>
                                <div style="font-size: 12px;">Minat: ${bs.minat}%</div>
                            </div>
                        </div>
                        <div class="popularity-bar" style="margin-top: 10px;">
                            <div class="popularity-fill" style="width: ${bs.minat}%; background: #c49a6c;"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Kurang Diminati -->
            <div>
                <div style="background: rgba(231, 76, 60, 0.1); border-radius: 20px; padding: 25px; margin-bottom: 20px;">
                    <h2 style="color: #e74c3c; margin-bottom: 15px;">Kurang Diminati</h2>
                    <div style="background: white; border-radius: 12px; padding: 15px;">
                        <strong>${lowInterest?.name || 'Americano'}</strong>
                        <div style="font-size: 13px; color: #666; margin: 5px 0;">${lowInterest?.category || 'Kopi Kuat'} - Rp ${(lowInterest?.price || 10000).toLocaleString('id-ID')}</div>
                        <div class="popularity-bar" style="margin-top: 10px;">
                            <div class="popularity-fill" style="width: ${lowInterest?.minat || 20}%; background: #e74c3c;"></div>
                        </div>
                        <p style="margin-top: 10px; font-size: 13px;">Hanya ${lowInterest?.minat || 20}% tingkat minat. Karakter pahit kurang disukai pelanggan.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render insight text (LANGSUNG dari window.menuData)
function renderInsightText() {
    const container = document.getElementById('insight-text-container');
    if (!container) return;
    
    if (!window.menuData) {
        container.innerHTML = '<p>Error: Data tidak tersedia</p>';
        return;
    }
    
    const matcha = window.menuData.find(m => m.name === 'Matcha');
    const butterscotch = window.menuData.find(m => m.name === 'Butterscotch');
    const americano = window.menuData.find(m => m.name === 'Americano');
    
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
            <div class="insight-stat">
                <div class="stat-value">${matcha?.minat || 100}%</div>
                <div class="stat-label">Penjualan dari Matcha</div>
                <div class="stat-desc">Matcha mendominasi penjualan non-coffee</div>
            </div>
            <div class="insight-stat">
                <div class="stat-value">${butterscotch?.minat || 80}%</div>
                <div class="stat-label">Penjualan dari Butterscotch</div>
                <div class="stat-desc">Best seller di kategori coffee</div>
            </div>
            <div class="insight-stat">
                <div class="stat-value">${americano?.minat || 20}%</div>
                <div class="stat-label">Penjualan Americano</div>
                <div class="stat-desc">Kurang diminati karena rasa pahit</div>
            </div>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: rgba(196, 154, 108, 0.1); border-radius: 16px;">
            <h3 style="color: #c49a6c; margin-bottom: 10px;">Insight Utama dari Wawancara Owner</h3>
            <p>Minuman non-coffee seperti Matcha memiliki permintaan lebih tinggi (${matcha?.minat || 100}%) dibandingkan Americano (${americano?.minat || 20}%). Hal ini menunjukkan preferensi pelanggan Sorai yang lebih menyukai minuman dengan rasa ringan, manis, dan tidak terlalu pahit.</p>
            <p style="margin-top: 10px;">Meskipun Butterscotchadalah kopi, popularitasnya tetap tinggi (${butterscotch?.minat || 80}%) karena profil rasa yang manis dan familiar — berbeda dengan Americano yang memiliki karakter pahit kuat tanpa pemanis tambahan.</p>
            <p style="margin-top: 10px;">Temuan ini menjadi sinyal penting bagi pengembangan menu ke depan: pelanggan .Sorai cenderung menyukai minuman yang memiliki keseimbangan antara rasa manis, creamy, dan aroma yang kuat.</p>
        </div>
    `;
}

// Fungsi untuk mendapatkan data menu untuk dampak harga (LANGSUNG dari window.menuData)
function getMenuForPriceImpact() {
    if (!window.menuData) return [];
    
    // Ambil menu populer (best seller + beberapa menu utama)
    const popularMenus = window.menuData.filter(m => 
        m.name === 'Matcha' || 
        m.name === 'Butterscotch' || 
        m.name === 'Americano' || 
        m.name === 'Sorai' ||
        m.name === 'Gula Aren'
    );
    
    return popularMenus;
}

// Render monitoring bahan baku
function renderMonitoringBahanBaku() {
    const container = document.getElementById('monitoring-bahanbaku-container');
    if (!container) return;
    
    let totalCostIncrease = 0;
    let bahanWithIncrease = [];
    
    for (const [key, bahan] of Object.entries(inventoryData)) {
        if (bahan.trend === 'naik') {
            const kenaikan = bahan.currentPrice - bahan.lastMonthPrice;
            totalCostIncrease += kenaikan;
            bahanWithIncrease.push({ ...bahan, key, kenaikan });
        }
    }
    
    container.innerHTML = `
        <div style="margin-bottom: 24px;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                <div style="background: var(--warna-button); padding: 15px; border-radius: 16px; color: white; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold;">${Object.keys(inventoryData).length}</div>
                    <div style="font-size: 12px;">Jenis Bahan Baku</div>
                </div>
                <div style="background: var(--warna-button); padding: 15px; border-radius: 16px; color: white; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold;">${bahanWithIncrease.length}</div>
                    <div style="font-size: 12px;">Bahan dengan Kenaikan Harga</div>
                </div>
                <div style="background: var(--warna-button); padding: 15px; border-radius: 16px; color: white; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold;">Rp ${totalCostIncrease.toLocaleString('id-ID')}</div>
                    <div style="font-size: 12px;">Total Kenaikan Biaya</div>
                </div>
            </div>
        </div>
        
        <div class="bahanbaku-grid">
            ${Object.entries(inventoryData).map(([key, bahan]) => {
                const trendIcon = bahan.trend === 'naik' ? '📈' : (bahan.trend === 'turun' ? '📉' : '➡️');
                const trendColor = bahan.trend === 'naik' ? '#e74c3c' : (bahan.trend === 'turun' ? '#27ae60' : '#f39c12');
                const stockStatus = bahan.stock <= bahan.minStock ? 'danger' : (bahan.stock <= bahan.minStock * 1.5 ? 'warning' : 'safe');
                const stockText = stockStatus === 'danger' ? 'Stok Menipis!' : (stockStatus === 'warning' ? 'Stok Terbatas' : 'Stok Aman');
                
                return `
                    <div class="bahanbaku-card">
                        <div class="bahanbaku-header">
                            <span class="bahanbaku-icon">${trendIcon}</span>
                            <strong>${bahan.name}</strong>
                            <span class="trend-badge" style="background: ${trendColor}">${bahan.trend === 'naik' ? 'Naik' : (bahan.trend === 'turun' ? 'Turun' : 'Stabil')}</span>
                        </div>
                        <div class="bahanbaku-price">
                            <div>
                                <span style="font-size: 12px; color: #666;">Harga saat ini</span>
                                <div style="font-size: 20px; font-weight: bold;">Rp ${bahan.currentPrice.toLocaleString('id-ID')}${bahan.unit}</div>
                            </div>
                            <div style="text-align: right;">
                                <span style="font-size: 12px; color: #666;">Bulan lalu</span>
                                <div style="font-size: 16px;">Rp ${bahan.lastMonthPrice.toLocaleString('id-ID')}</div>
                            </div>
                        </div>
                        <div class="bahanbaku-stock">
                            <div style="display: flex; justify-content: space-between;">
                                <span>Stok: ${bahan.stock} ${bahan.unit}</span>
                                <span class="stock-status ${stockStatus}">${stockText}</span>
                            </div>
                            <div class="stock-bar">
                                <div class="stock-fill" style="width: ${Math.min(100, (bahan.stock / (bahan.minStock * 3)) * 100)}%; background: ${stockStatus === 'danger' ? '#e74c3c' : (stockStatus === 'warning' ? '#f39c12' : '#27ae60')}"></div>
                            </div>
                            <button class="update-stock-btn" onclick="updateStock('${key}')">Update Stok</button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        
        <div class="insight-warning" style="margin-top: 24px; padding: 16px; background: rgba(231, 76, 60, 0.1); border-radius: 12px; border-left: 4px solid #e74c3c;">
            <strong>Peringatan Stok:</strong> 
            ${Object.values(inventoryData).filter(b => b.stock <= b.minStock).length > 0 
                ? `Ada ${Object.values(inventoryData).filter(b => b.stock <= b.minStock).length} bahan yang stoknya menipis! Segera lakukan pemesanan.`
                : 'Semua stok dalam kondisi aman.'}
        </div>
    `;
}

// Update stok bahan baku
function updateStock(bahanKey) {
    const bahan = inventoryData[bahanKey];
    const newStock = prompt(`Masukkan stok terbaru untuk ${bahan.name} (dalam ${bahan.unit}):`, bahan.stock);
    
    if (newStock !== null && !isNaN(parseInt(newStock))) {
        bahan.stock = parseInt(newStock);
        saveInventory();
        renderMonitoringBahanBaku();
        renderKeputusanHarga();
    }
}

// Render keputusan harga
function renderKeputusanHarga() {
    const container = document.getElementById('keputusan-harga-container');
    if (!container) return;
    
    let totalKenaikanBiaya = 0;
    let bahanTerkena = [];
    
    for (const [key, bahan] of Object.entries(inventoryData)) {
        if (bahan.trend === 'naik') {
            const kenaikan = bahan.currentPrice - bahan.lastMonthPrice;
            totalKenaikanBiaya += kenaikan;
            bahanTerkena.push(bahan.name);
        }
    }
    
    const rataRataKenaikan = (totalKenaikanBiaya / Object.keys(inventoryData).length) || 0;
    let rekomendasiHarga = 'tetap';
    
    if (rataRataKenaikan > 5000) {
        rekomendasiHarga = 'naik-15';
    } else if (rataRataKenaikan > 3000) {
        rekomendasiHarga = 'naik-10';
    } else if (rataRataKenaikan > 1000) {
        rekomendasiHarga = 'naik-5';
    } else {
        rekomendasiHarga = 'tetap';
    }
    
    // Ambil data menu populer untuk ditampilkan (LANGSUNG dari window.menuData)
    const popularMenus = getMenuForPriceImpact();
    
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <!-- Kolom Kiri: Analisis Kenaikan Bahan Baku -->
            <div style="background: var(--white); border-radius: 16px; padding: 20px;">
                <h3 style="margin-bottom: 16px;">Analisis Kenaikan Bahan Baku</h3>
                <div style="margin-bottom: 16px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span>Total kenaikan biaya:</span>
                        <strong style="color: #e74c3c;">Rp ${totalKenaikanBiaya.toLocaleString('id-ID')}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span>Bahan yang terkena kenaikan:</span>
                        <strong>${bahanTerkena.join(', ') || 'Tidak ada'}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>Rata-rata kenaikan per bahan:</span>
                        <strong>Rp ${rataRataKenaikan.toLocaleString('id-ID')}</strong>
                    </div>
                </div>
                
                <div style="background: #fef9e8; padding: 16px; border-radius: 12px; margin-top: 16px;">
                    <div style="font-weight: bold; margin-bottom: 8px;">Faktor yang Mempengaruhi:</div>
                    <ul style="margin-left: 20px; font-size: 13px;">
                        <li>Kenaikan harga susu nasional sebesar 12%</li>
                        <li>Kenaikan harga gula aren karena cuaca</li>
                        <li>Biaya pengiriman dari supplier</li>
                    </ul>
                </div>
            </div>
            
            <!-- Kolom Kanan: Rekomendasi Keputusan Harga -->
            <div style="background: var(--white); border-radius: 16px; padding: 20px;">
                <h3 style="margin-bottom: 16px;">Rekomendasi Keputusan Harga</h3>
                
                <div class="price-decision-card ${rekomendasiHarga === 'tetap' ? 'active' : ''}" onclick="setPriceDecision('tetap')">
                    <div class="decision-content">
                        <strong>Pertahankan Harga</strong>
                        <p>Tidak ada kenaikan harga. Margin akan menurun tapi pelanggan tetap loyal.</p>
                        <span class="decision-tag ${rekomendasiHarga === 'tetap' ? 'recommended' : ''}">${rekomendasiHarga === 'tetap' ? 'Rekomendasi' : ''}</span>
                    </div>
                </div>
                
                <div class="price-decision-card ${rekomendasiHarga === 'naik-5' ? 'active' : ''}" onclick="setPriceDecision('naik-5')">
                    <div class="decision-content">
                        <strong>Naikkan Harga 5%</strong>
                        <p>Kenaikan kecil (Rp 500-1000 per menu). Pelanggan tidak akan terlalu terasa.</p>
                        <span class="decision-tag ${rekomendasiHarga === 'naik-5' ? 'recommended' : ''}">${rekomendasiHarga === 'naik-5' ? 'Rekomendasi' : ''}</span>
                    </div>
                </div>
                
                <div class="price-decision-card ${rekomendasiHarga === 'naik-10' ? 'active' : ''}" onclick="setPriceDecision('naik-10')">
                    <div class="decision-content">
                        <strong>Naikkan Harga 10%</strong>
                        <p>Kenaikan moderat (Rp 1000-1500 per menu). Kompensasi dengan promo bundling.</p>
                        <span class="decision-tag ${rekomendasiHarga === 'naik-10' ? 'recommended' : ''}">${rekomendasiHarga === 'naik-10' ? 'Rekomendasi' : ''}</span>
                    </div>
                </div>
                
                <div class="price-decision-card ${rekomendasiHarga === 'naik-15' ? 'active' : ''}" onclick="setPriceDecision('naik-15')">
                    <div class="decision-content">
                        <strong>Naikkan Harga 15%</strong>
                        <p>Kenaikan signifikan (Rp 1500-2000 per menu). Hanya jika terpaksa.</p>
                        <span class="decision-tag ${rekomendasiHarga === 'naik-15' ? 'recommended' : ''}">${rekomendasiHarga === 'naik-15' ? 'Rekomendasi' : ''}</span>
                    </div>
                </div>
                
                <div id="price-decision-status" style="margin-top: 16px; padding: 12px; background: rgba(196, 154, 108, 0.15); border-radius: 12px;">
                    ${priceDecision ? 
                        `<strong>Keputusan saat ini:</strong> ${priceDecision.text}<br>
                        <span style="font-size: 13px;">Diputuskan pada: ${new Date(priceDecision.timestamp).toLocaleString('id-ID')}</span>` : 
                        `<span style="color: #666;">Belum ada keputusan. Pilih salah satu opsi di atas.</span>`
                    }
                </div>
            </div>
        </div>
        
        <!-- Dampak pada Menu Populer (LANGSUNG dari window.menuData) -->
        <div style="margin-top: 24px; background: var(--white); border-radius: 16px; padding: 20px;">
            <h3 style="margin-bottom: 16px;">Dampak Keputusan Harga pada Menu Populer</h3>
            <div class="menu-impact-grid">
                ${popularMenus.map(menu => {
                    const hargaBaru5 = Math.round(menu.price * 1.05);
                    const hargaBaru10 = Math.round(menu.price * 1.1);
                    const hargaBaru15 = Math.round(menu.price * 1.15);
                    
                    return `
                        <div class="menu-impact-card">
                            <div class="menu-impact-name">${menu.name} ${menu.bestSeller ? '⭐' : ''}</div>
                            <div class="menu-impact-price">Sekarang: Rp ${menu.price.toLocaleString('id-ID')}</div>
                            <div class="menu-impact-prices">
                                <span>5%: Rp ${hargaBaru5.toLocaleString('id-ID')}</span>
                                <span>10%: Rp ${hargaBaru10.toLocaleString('id-ID')}</span>
                                <span>15%: Rp ${hargaBaru15.toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

// Set keputusan harga
function setPriceDecision(decision) {
    let decisionText = '';
    let multiplier = 1;
    
    switch(decision) {
        case 'tetap':
            decisionText = 'Pertahankan harga saat ini (tidak ada kenaikan)';
            multiplier = 1;
            break;
        case 'naik-5':
            decisionText = 'Naikkan harga sebesar 5% untuk semua menu';
            multiplier = 1.05;
            break;
        case 'naik-10':
            decisionText = 'Naikkan harga sebesar 10% untuk semua menu';
            multiplier = 1.1;
            break;
        case 'naik-15':
            decisionText = 'Naikkan harga sebesar 15% untuk semua menu';
            multiplier = 1.15;
            break;
    }
    
    priceDecision = {
        decision: decision,
        text: decisionText,
        multiplier: multiplier,
        timestamp: new Date().toISOString()
    };
    
    savePriceDecision();
    renderKeputusanHarga();
    
    alert(`Keputusan disimpan!\n\n${decisionText}\n\nSaran: Terapkan secara bertahap dan komunikasikan ke pelanggan.`);
}

// Show full insight
function showFullInsight() {
    if (!window.menuData) {
        alert("Error: Data tidak tersedia");
        return;
    }
    
    const matcha = window.menuData.find(m => m.name === 'Matcha');
    const butterscotch = window.menuData.find(m => m.name === 'Butterscotch');
    const americano = window.menuData.find(m => m.name === 'Americano');
    
    alert(
        "ANALISIS LENGKAP SORAI COFFEE\n\n" +
        "BEST SELLER:\n" +
        `   • Matcha (Non Coffee) - Rp ${(matcha?.price || 13000).toLocaleString('id-ID')} | ${matcha?.minat || 100}% penjualan\n` +
        `   • Butterscotch (Coffee) - Rp ${(butterscotch?.price || 15000).toLocaleString('id-ID')} | ${butterscotch?.minat || 80}% penjualan\n\n` +
        "KURANG MINAT:\n" +
        `   • Americano - ${americano?.minat || 20}% penjualan (karakter pahit)\n\n` +
        "REKOMENDASI BISNIS:\n" +
        "   • Promosikan Matcha & Butterscotch\n" +
        "   • Evaluasi Americano (bundling/hapus)\n" +
        "   • Kembangkan varian baru (Matcha Float, Butterscotch Cream)\n\n" +
        "LOKASI STRATEGIS:\n" +
        "   • Siang: Depan SMADA (10-15) & Taman UNTAD (10-17)\n" +
        "   • Malam: Sekitaran Kantor Wali Kota (14.30-00.00)\n\n" +
        "KONTAK: 0851-4553-3880\n" +
        "IG: @kopisorai_palu\n\n" +
        "Sumber: Wawancara langsung dengan owner"
    );
}

// Render rekomendasi tambahan
function renderRekomendasiTambahan() {
    const container = document.getElementById('rekomendasi-tambahan-container');
    if (!container) return;
    
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; place-items: center;">
            <div class="rekomendasi-card">
                <div class="rekomendasi-icon">📝</div>
                <h4>Pencatatan Stok Rutin</h4>
                <p>Catat stok bahan baku setiap hari untuk mengantisipasi kelangkaan.</p>
                <button class="action-btn" onclick="showActionPlan('Pencatatan Stok Rutin')">Terapkan</button>
            </div>
            <div class="rekomendasi-card">
                <div class="rekomendasi-icon">🔍</div>
                <h4>Cari Supplier Alternatif</h4>
                <p>Cari supplier dengan harga lebih kompetitif untuk mengurangi ketergantungan.</p>
                <button class="action-btn" onclick="showActionPlan('Cari Supplier Alternatif')">Terapkan</button>
            </div>
            <div class="rekomendasi-card">
                <div class="rekomendasi-icon">📦</div>
                <h4>Paket Bundling</h4>
                <p>Buat paket bundling untuk meningkatkan nilai transaksi tanpa menaikkan harga satuan.</p>
                <button class="action-btn" onclick="showActionPlan('Paket Bundling')">Terapkan</button>
            </div>
            <div class="rekomendasi-card">
                <div class="rekomendasi-icon">💬</div>
                <h4>Komunikasi ke Pelanggan</h4>
                <p>Jika terpaksa menaikkan harga, komunikasikan alasannya ke pelanggan setia.</p>
                <button class="action-btn" onclick="showActionPlan('Komunikasi ke Pelanggan')">Terapkan</button>
            </div>
        </div>
    `;
}

function showActionPlan(title) {
    alert(`RENCANA AKSI: ${title}\n\n1. Identifikasi kebutuhan spesifik\n2. Buat timeline pelaksanaan (1-2 minggu)\n3. Alokasikan sumber daya\n4. Evaluasi hasil secara berkala`);
}

// Inisialisasi halaman insight
function initInsightPage() {
    console.log('Init Insight Page...');
    
    // Tunggu sebentar agar data.js selesai loading
    setTimeout(() => {
        if (!window.menuData) {
            console.error('menuData masih belum tersedia!');
            return;
        }
        
        initInventory();
        renderTantangan();
        renderMinatProduk();
        renderInsightText();
        renderMonitoringBahanBaku();
        renderKeputusanHarga();
        renderRekomendasiTambahan();
        
        console.log('Insight Page selesai diinisialisasi');
    }, 100);
}

// Export ke global
window.renderTantangan = renderTantangan;
window.renderMinatProduk = renderMinatProduk;
window.renderInsightText = renderInsightText;
window.renderMonitoringBahanBaku = renderMonitoringBahanBaku;
window.renderKeputusanHarga = renderKeputusanHarga;
window.renderRekomendasiTambahan = renderRekomendasiTambahan;
window.showFullInsight = showFullInsight;
window.initInsightPage = initInsightPage;
window.updateStock = updateStock;
window.setPriceDecision = setPriceDecision;
window.showActionPlan = showActionPlan;