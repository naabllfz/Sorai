// Data Menu Sorai
const menuData = [
    // KOPI KUAT
    {id:1, name:"Amerciano", category:"Kopi Kuat", price:10000, description:"Espresso & Air", bestSeller:false, minat:20},
    {id:2, name:"Serana", category:"Kopi Kuat", price:13000, description:"Kopi susu dengan double shot espresso", bestSeller:false, minat:45},

    // KOPI SEDANG
    {id:3, name:"Sorai", category:"Kopi Sedang", price:11000, description:"SKM, creamer, fresh milk dan espresso", bestSeller:false, minat:55},
    {id:4, name:"Gula Aren", category:"Kopi Sedang", price:13000, description:"Perpaduan gula aren dalam segelas kopi susu", bestSeller:false, minat:60},
    {id:5, name:"Pandan Latte", category:"Kopi Sedang", price:15000, description:"Cita rasa pandan dalam segelas kopi susu", bestSeller:false, minat:50},
    {id:6, name:"Butterscotch", category:"Kopi Sedang", price:15000, description:"Perpaduan rasa karamel, gula aren, butter dipadukan dengan kopi yang cukup  strong", bestSeller:true, minat:80},

    // KOPI LEMAH
    {id:7, name:"Caramel Latte", category:"Kopi Lemah", price:15000, description:"Es kopi dengan sentuhan karamel cair", bestSeller:false, minat:55},
    {id:8, name:"Hazelnut Latte", category:"Kopi Lemah", price:13000, description:"Es kopi dengan sentuhan kacang hazel yang intens", bestSeller:false, minat:50},

    // BUKAN KOPI
    {id:9, name:"Matcha", category:"Bukan Kopi", price:13000, description:"Matcha murni dengan susu", bestSeller:true, minat:100},
    {id:10, name:"Cokelat", category:"Bukan Kopi", price:13000, description:"Minuman cokelat creamy", bestSeller:false, minat:60},
    {id:11, name:"Taro", category:"Bukan Kopi", price:13000, description:"Minuman taro creamy", bestSeller:false, minat:55},
    {id:12, name:"Vanila Regal", category:"Bukan Kopi", price:13000, description:"Vanila dengan sentuhan biskuit regal", bestSeller:false, minat:50},


    // TAMBAHAN
    {id:13, name:"Biskuit Regal", category:"Tambahan", price:1000, description:"Biskuit regal sebagai topping", bestSeller:false, minat:70},
    {id:14, name:"Espresso 1 shot", category:"Tambahan", price:2000, description:"Tambahaan espresso shot", bestSeller:false, minat:40}
];

// DATA LOKASI DRIVER
const lokasiData={
    siang:[
        {name:"Depan SMADA", address:"SMA Negeri 2 Palu", time:"10.00-15.00", pros: ["Ramai siswa setiap hari sekolah", "Harga terjangkau sesuai kantong pelajar", "Lokasi mudah dijangkau dari jalan utama"]},
        {name:"Taman UNTAD", address:"Universitas Tadulako", time:"10.00-17.00", pros: ["Basis mahasiswa besar dan aktif", "Potensi pembelian berulang dari pelangan tetap", "Aktivitas kampus padat di jam siang sampai sore"]}   
    ],
    malam:[
        {name:"Sekitaran Kantor Wali Kota", address:"Taman Vatulemo, Kantor Wali Kota Palu", pros:["Pusat kota dengan lalu lintas tinggi", "Mudah ditemukan oleh pelanggan baru", "Area strategis yang dikenal masyarakat luas"]}
    ]
};

// DATA TANTANGAN (HAMBATAN UMKM)
const challengesData = [
  { title: "Lokasi", desc: "Sulit menemukan titik jual yang konsisten dan strategis. Sebagai usaha keliling, lokasi sangat menentukan volume penjualan harian." },
  { title: "Regulasi", desc: "Perizinan dan aturan berjualan di ruang publik menjadi hambatan, terutama di titik-titik strategis yang ramai pengunjung." },
  { title: "Akses Bahan Baku", desc: "Pernah terjadi kelangkaan susu secara nasional yang memaksa operasional terganggu karena bahan utama tidak tersedia di pasaran." },
  { title: "Kenaikan Harga Bahan Baku", desc: "Kenaikan harga bahan baku secara berkala mempengaruhi margin keuntungan, terutama untuk bahan seperti susu, kopi, dan matcha." },
  { title: "Cuaca", desc: "Cuaca buruk — terutama hujan di sore dan malam hari — secara langsung menurunkan jumlah pelanggan yang datang membeli." },
  { title: "Kompetitor", desc: "Jumlah usaha kopi serupa yang terus bertambah di Palu membuat persaingan semakin ketat, terutama di area operasional Sorai." }
];

// DATA FAKTOR PENJUALAN
const faktorSiangData = [
  { name: "Lokasi", desc: "Titik jual di dekat sekolah & kampus meningkatkan kunjungan secara konsisten." },
  { name: "Cuaca", desc: "Cuaca panas siang hari mendorong permintaan minuman dingin lebih tinggi." },
  { name: "Harga", desc: "Rentang harga Rp 10–15 ribu sangat cocok untuk segmen pelajar dan mahasiswa." },
  { name: "Kompetitor", desc: "Persaingan di sekitar kawasan kampus semakin ketat dari usaha kopi sejenis." }
];

const faktorMalamData = [
  { name: "Cuaca", desc: "Hujan malam hari secara langsung menurunkan jumlah pengunjung dan penjualan." },
  { name: "Regulasi", desc: "Perizinan lokasi berjualan menjadi kendala tersendiri di beberapa titik area kota." },
  { name: "Kompetitor", desc: "Usaha kopi serupa semakin banyak bermunculan di area yang sama pada malam hari." },
  { name: "Lokasi", desc: "Konsistensi lokasi sulit dijaga karena bersifat keliling tanpa titik tetap." }
];

// Export ke global
window.menuData = menuData;
window.lokasiData = lokasiData;
window.challengesData = challengesData;
window.faktorSiangData = faktorSiangData;
window.faktorMalamData = faktorMalamData;
