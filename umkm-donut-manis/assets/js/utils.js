// Mengekspor function agar bisa dipakai file lain (misal form.js)
export function formatPesan(nama, kategori, pesan) {
  // Membuat template pesan 2 baris:
  // Baris 1: perkenalan + tujuan
  // Baris 2: kategori + isi pesan
  return `Halo, saya ${nama} ingin menyampaikan pesan mengenai\n${kategori}: ${pesan}`;
}
