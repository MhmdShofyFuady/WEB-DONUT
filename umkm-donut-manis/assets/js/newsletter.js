// Menunggu HTML siap
document.addEventListener("DOMContentLoaded", () => {
  // Checkbox newsletter (misal: <input type="checkbox" id="langganan">)
  const checkbox = document.getElementById("langganan");

  // Jika elemen tidak ada di halaman ini, stop agar tidak error
  if (!checkbox) return;

  // Event ketika checkbox berubah (dicentang / dilepas)
  checkbox.addEventListener("change", () => {
    // Jika dicentang -> berlangganan, kalau tidak -> batal
    if (checkbox.checked) {
      alert("Terima kasih telah berlangganan!");
    } else {
      alert("Langganan dibatalkan.");
    }
  });
});
