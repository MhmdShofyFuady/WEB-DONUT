// Import fungsi pembentuk teks pesan dari utils.js
import { formatPesan } from "./utils.js";

// Menunggu sampai HTML selesai dimuat agar element bisa ditemukan
document.addEventListener("DOMContentLoaded", () => {
  // Ambil form kontak berdasarkan id
  const form = document.getElementById("formKontak");

  // Jika halaman ini tidak punya formKontak (misal bukan kontak.html), hentikan script aman-aman
  if (!form) return;

  // Saat form disubmit
  form.addEventListener("submit", (e) => {
    // Mencegah halaman reload (default submit)
    e.preventDefault();

    // Gunakan validasi bawaan HTML5 (required, type=email, dsb)
    if (!form.checkValidity()) {
      // Menampilkan pesan error bawaan browser
      form.reportValidity();
      return;
    }

    // Ambil nilai input (pakai optional chaining supaya tidak error bila elemen tidak ada)
    const nama = document.getElementById("nama")?.value || "";
    const kategori = document.getElementById("kategori")?.value || "";
    const pesan = document.getElementById("pesan")?.value || "";

    // Tampilkan pesan yang sudah diformat
    alert(formatPesan(nama, kategori, pesan));

    // Reset isi form setelah terkirim
    form.reset();
  });
});
