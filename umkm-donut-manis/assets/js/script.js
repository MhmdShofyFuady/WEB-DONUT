// =========================================================
// UMKM Donut Manis - script umum
// (nav active, rating, layanan, tombol beli, wishlist, tema, validasi form)
// =========================================================

// Jalan setelah DOM siap
document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------
  // 1) Navbar active sesuai halaman
  // ---------------------------
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".navbar .nav-link").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    a.classList.toggle("active", href === path);
  });

  // ---------------------------
  // 2) Label rating produk (berdasarkan data-value)
  // ---------------------------
  const ratingEl = document.getElementById("hasil-rating");
  if (ratingEl) {
    const rating = Number(ratingEl.dataset.value || 4.6);
    let label = "★ Tidak Direkomendasikan";
    if (rating >= 4.5) label = "★★★★★ Sangat Disarankan";
    else if (rating >= 3) label = "★★★ Rekomendasi Biasa";
    ratingEl.textContent = label;
  }

  // ---------------------------
  // 3) Render layanan unggulan (opsional)
  //    Butuh element: <ul id="layanan-list"></ul>
  // ---------------------------
  const layananList = document.getElementById("layanan-list");
  if (layananList) {
    const layanan = ["Donut Fresh Harian", "Bisa Pre-Order", "Pengiriman Cepat"];
    layananList.innerHTML = "";
    layanan.forEach((x) => {
      const li = document.createElement("li");
      li.textContent = x;
      layananList.appendChild(li);
    });
  }

  // ---------------------------
  // 4) Tombol beli → tampilkan alert Bootstrap (opsional)
  //    Butuh:
  //    - tombol: <a class="btn-beli" data-produk="Donut Coklat"></a>
  //    - alert:  <div id="alert-beli" class="d-none"></div>
  // ---------------------------
  document.querySelectorAll(".btn-beli").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const namaProduk = btn.dataset.produk || "produk";
      const alertEl = document.getElementById("alert-beli");
      if (!alertEl) return;

      alertEl.classList.remove("d-none");
      alertEl.textContent = `Terima kasih, pesanan untuk ${namaProduk} sudah tercatat!`;
      alertEl.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  // ---------------------------
  // 5) Wishlist + preview input (opsional)
  //    Butuh:
  //    - <input id="produkInput">
  //    - <span id="previewProduk"></span>
  //    - <ul id="daftarProduk"></ul>
  //    - <button id="tambahBtn"></button>
  // ---------------------------
  const produkInput = document.getElementById("produkInput");
  const previewProduk = document.getElementById("previewProduk");
  const daftarProduk = document.getElementById("daftarProduk");
  const tambahBtn = document.getElementById("tambahBtn");

  // Preview teks saat mengetik
  if (produkInput && previewProduk) {
    produkInput.addEventListener("keyup", () => {
      previewProduk.textContent = produkInput.value;
    });
  }

  // Tambah item wishlist
  if (tambahBtn && produkInput && daftarProduk) {
    tambahBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const v = (produkInput.value || "").trim();
      if (!v) return;

      const li = document.createElement("li");
      li.textContent = v;
      daftarProduk.appendChild(li);

      produkInput.value = "";
      if (previewProduk) previewProduk.textContent = "";
    });
  }

  // ---------------------------
  // 6) Tema warna (opsional)
  //    Butuh: <select id="temaSelect"> <option value="#fff">...</option> </select>
  // ---------------------------
  const temaSelect = document.getElementById("temaSelect");
  if (temaSelect) {
    temaSelect.addEventListener("change", () => {
      document.body.style.backgroundColor = temaSelect.value;
    });
  }

  // ---------------------------
  // 7) Form kontak validasi sederhana (opsional)
  //    Butuh id form: formKontak dan beberapa input sesuai id
  // ---------------------------
  const form = document.getElementById("formKontak");
  if (form) {
    // Ambil field-field penting
    const field = {
      nama: document.getElementById("nama"),
      email: document.getElementById("email"),
      kategori: document.getElementById("kategori"),
      pesan: document.getElementById("pesan"),
      hp: document.getElementById("hp"),
    };

    // Ambil tempat error (jika ada)
    const errorEl = {
      nama: document.getElementById("errorNama"),
      email: document.getElementById("errorEmail"),
      kategori: document.getElementById("errorKategori"),
      pesan: document.getElementById("errorPesan"),
      hp: document.getElementById("errorHp"),
    };

    const successMsg = document.getElementById("successMsg");
    const clearBtn = document.getElementById("clearBtn");
    const counterPesan = document.getElementById("counterPesan");

    // Helper set error/success (mengatur teks & class bootstrap)
    function setError(input, elError, msg) {
      if (!input || !elError) return false;
      elError.textContent = msg;
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      return false;
    }
    function setSuccess(input, elError) {
      if (!input || !elError) return true;
      elError.textContent = "";
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      return true;
    }

    // Regex khusus email Gmail
    const EMAIL_GMAIL = /^[^ ]+@gmail\.com$/i;

    // Validasi per field
    function validateNama() {
      const v = field.nama?.value?.trim() || "";
      return v === ""
        ? setError(field.nama, errorEl.nama, "Nama wajib diisi.")
        : setSuccess(field.nama, errorEl.nama);
    }
    function validateEmail() {
      const v = field.email?.value?.trim() || "";
      return EMAIL_GMAIL.test(v)
        ? setSuccess(field.email, errorEl.email)
        : setError(field.email, errorEl.email, "Email harus @gmail.com dan format benar.");
    }
    function validateKategori() {
      const v = field.kategori?.value || "";
      return v === ""
        ? setError(field.kategori, errorEl.kategori, "Silakan pilih kategori.")
        : setSuccess(field.kategori, errorEl.kategori);
    }
    function validatePesan() {
      const v = field.pesan?.value || "";
      if (counterPesan) counterPesan.textContent = `${v.length}/200`;
      return v.trim().length < 10
        ? setError(field.pesan, errorEl.pesan, "Minimal 10 karakter.")
        : setSuccess(field.pesan, errorEl.pesan);
    }
    function validateHp() {
      const v = field.hp?.value?.trim() || "";
      return /^\d+$/.test(v) || v === ""
        ? setSuccess(field.hp, errorEl.hp)
        : setError(field.hp, errorEl.hp, "Hanya boleh angka.");
    }

    // Live validation (langsung saat user interaksi)
    field.nama?.addEventListener("blur", validateNama);
    field.email?.addEventListener("blur", validateEmail);
    field.kategori?.addEventListener("change", validateKategori);
    field.pesan?.addEventListener("input", validatePesan);
    field.hp?.addEventListener("input", validateHp);

    // Submit form
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Pakai & (bitwise) agar semua fungsi tetap dijalankan; hasil akhirnya 0/1
      const ok =
        validateNama() &
        validateEmail() &
        validateKategori() &
        validatePesan() &
        validateHp();

      if (ok) {
        // Tampilkan pesan sukses jika elemennya ada
        if (successMsg) {
          successMsg.hidden = false;
          successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        // Reset form dan bersihkan state validasi
        form.reset();
        Object.values(errorEl).forEach((el) => el && (el.textContent = ""));
        Object.values(field).forEach((el) => el && el.classList.remove("is-valid", "is-invalid"));
        if (counterPesan) counterPesan.textContent = "0/200";
      }
    });

    // Tombol clear (jika ada)
    clearBtn?.addEventListener("click", () => {
      form.reset();
      Object.values(errorEl).forEach((el) => el && (el.textContent = ""));
      Object.values(field).forEach((el) => el && el.classList.remove("is-valid", "is-invalid"));
      if (successMsg) successMsg.hidden = true;
      if (counterPesan) counterPesan.textContent = "0/200";
    });
  }

  // ---------------------------
  // 8) (Opsional) Log untuk debug
  // ---------------------------
  console.log("script.js loaded");
});
