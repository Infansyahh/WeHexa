# Product Requirements Document (PRD)
## WeHexa — Creative & AI Software Agency Landing Page

| Atribut Dokumen | Detail |
| :--- | :--- |
| **Nama Produk** | WeHexa Landing Page & Lead Generation Platform |
| **Versi** | 1.0 (Photorealistic & Interactive Motion Edition) |
| **Status** | Ready for Production / Prototype Approved |
| **Target Platform** | Web Desktop, Tablet, & Mobile (Responsive Single-Page Experience) |
| **Tech Stack Utama** | Semantic HTML5, Tailwind CSS, Vanilla ES6+ JavaScript |

---

## 1. Ringkasan Eksekutif & Visi Produk

**WeHexa** adalah agensi pengembangan perangkat lunak (*software engineering*) dan otomasi kecerdasan buatan (*AI automations*) yang membantu perusahaan merancang aplikasi web modern, alur kerja AI otonom, serta identitas desain digital berkinerja tinggi.

Landing page ini dirancang sebagai **etalase kapabilitas teknis sekaligus mesin konversi klien (*lead capture*)** dengan pendekatan visual *Atmospheric Realism meets Obsidian Engineering*—memadukan fotografi lanskap alam yang cerah dan realistis dengan kartu antarmuka gelap (*obsidian*) bergaya presisi tinggi, tipografi ekspresif, serta koreografi animasi berbasis arah *scroll* (*scroll-down* dan *scroll-up*).

---

## 2. Tujuan Bisnis & Metrik Keberhasilan (KPIs)

1. **Meningkatkan Konversi Konsultasi Strategis (*Strategy Call*)**
   * **Target:** Minimal **4.5% – 7%** pengunjung mengisi formulir *"Let's Talk"* atau memulai sesi *"Quick Chat"* dengan *founder*.
2. **Membangun Kredibilitas Instan (*Trust & Authority*)**
   * Menampilkan bukti sosial terukur (`500+ BUSINESS SCALED THEIR INTELLIGENT TECH`), mitra teknologi, serta akses langsung ke *technical founders* tanpa perantara *account manager*.
3. **Meningkatkan Keterlibatan Eksplorasi (*Interactive Engagement*)**
   * **Target:** Rata-rata durasi sesi **> 90 detik** melalui interaksi kartu layanan (*Services*), akordeon FAQ, pembaca artikel (*Insights Modal*), dan animasi responsif.
4. **Performa & Keandalan Teknis**
   * **Target:** Animasi berjalan mulus pada **60 FPS**, waktu muat awal cepat, dan *zero broken images* melalui mekanisme *fallback* gambar otomatis.

---

## 3. Target Audiens & Persona Pengguna

1. **Startup Founders & CEOs (Seed – Series B)**
   * **Kebutuhan:** Membangun MVP SaaS dalam 4–6 minggu dengan arsitektur yang siap skala dan desain produk yang memikat investor.
2. **Enterprise CTOs & VP of Engineering**
   * **Kebutuhan:** Mengintegrasikan *LLM pipelines*, *RAG knowledge systems*, dan otomasi alur kerja ke dalam sistem perusahaan yang sudah ada.
3. **Product & Operations Leaders**
   * **Kebutuhan:** Mengurangi beban operasional manual dan meningkatkan retensi pengguna melalui perombakan UI/UX berbasis riset.

---

## 4. Lingkup Fitur & Spesifikasi Fungsional

### 4.1. Navigasi & Kontrol Global
* **Scroll Progress Bar:** Indikator progres baca setebal `3px` berwarna hijau limau (`#D4F85A`) di bagian paling atas layar.
* **Scroll-Direction Aware Floating Pill Navbar:**
  * Tersembunyi secara halus saat pengguna melakukan *scroll-down* melewati `140px` untuk memaksimalkan ruang pandang.
  * Muncul kembali secara responsif saat pengguna melakukan *scroll-up*.
  * Dilengkapi penyorotan tautan aktif otomatis berdasarkan bagian (*section*) yang sedang dilihat.
* **Interactive Language Switcher (`ENG` / `IDN`):** *Dropdown* pemilih bahasa yang mengubah label CTA navigasi secara dinamis.
* **Mobile Navigation Drawer:** Menu *hamburger* responsif untuk layar ponsel dengan akses cepat ke seluruh bagian dan fitur *Quick Chat*.

### 4.2. Hero Section (`#work`)
* **Latar Belakang Fotorealistik:** Foto lanskap langit biru cerah dan perbukitan hijau bermandikan cahaya matahari dengan efek *multi-layer parallax*.
* **Social Proof Badge:** Pil kaca (*glassmorphic pill*) berisi 3 foto potret klien realistis melingkar dan teks `"500+ BUSINESS SCALED THEIR INTELLIGENT TECH"`.
* **Headline & Subheadline:** Proposisi nilai utama mengenai *Software* dan *AI Automations*.
* **Dual CTA Pills:** Tombol utama *"Book a Call"* (`#D4F85A`) menuju formulir kontak dan tombol sekunder *"View Our Work"* (`#FFFFFF`) menuju bagian layanan.

### 4.3. Direction-Reactive Client Logo Marquee
* Menampilkan logo mitra teknologi (`Synaptech AI`, `Datrix`, `DeepOrbit`, `DataStack`) yang bergerak secara kontinu.
* **Reaktivitas Arah Scroll:** Arah gerakan *marquee* berbalik secara dinamis mengikuti arah *scroll* pengguna (*scroll-down* ke kiri, *scroll-up* ke kanan) dan berhenti sementara saat kursor diarahkan (*hover*).

### 4.4. Interactive Services Showcase (`#services` — `/Our Service`)
* Menampilkan 4 pilar layanan dalam *grid* 4 kolom:
  1. **Web & Software Development** (Pratinjau konfigurasi *edge runtime* & metrik *uptime*).
  2. **AI & Automations** (Pratinjau *agent pipeline* `Input -> AI Core -> Action` & latensi RAG).
  3. **Design & Branding** (*Default active card* berwarna *Obsidian* `#0D0F12` dengan deskripsi lengkap & pratinjau *Design System*).
  4. **Maintenance & Consulting** (Pratinjau grafik telemetri *system health* & pertumbuhan *throughput*).
* **Interaktivitas:** Mengarahkan kursor (*hover*), mengklik, atau memfokuskan kartu mana pun akan mengubahnya menjadi kartu aktif *Obsidian* `#0D0F12` sekaligus memperbarui penghitung `01 / 04` – `04 / 04`.

### 4.5. FAQ Accordion & Quick Support Strip (`#faq`)
* *Grid* 2 kolom berisi 4 pertanyaan utama seputar sprint MVP, *tech stack*, durasi implementasi AI, dan akses langsung ke *senior engineers*.
* Ekspansi mulus menggunakan transisi CSS `grid-template-rows` dengan rotasi ikon `+` sebesar `45°`.
* Bagian bantuan cepat di bawah akordeon dengan tombol *"Quick Chat"* (berindikator titik hijau berdenyut) dan *"Schedule a Call"*.

### 4.6. Editorial Insights / Blog (`#blog` — `/Recent Blog`)
* Menampilkan 3 kartu artikel dengan gambar fotorealistik & render 3D studio (`aspect-[4/3]`), label kategori, dan judul artikel.
* **Article Reader Modal:** Mengklik kartu artikel membuka jendela modal berisi ringkasan mendalam artikel serta tombol CTA langsung untuk menjadwalkan diskusi implementasi.

### 4.7. Kinetic Display Typography Banner
* Teks tipografi raksasa (`"Solutions built for tomorrow • AI-first engineering •"`) yang bergeser secara horizontal tersinkronisasi dengan posisi *scroll* vertikal pengguna.

### 4.8. Lead Capture & Direct Founder Access (`#contact` — `"Let's Talk"`)
* **Formulir Strategi Interaktif:** Input `Full Name`, `Email`, `WhatsApp`, pilihan `Service Type`, `Project Budget`, dan `Project Details`.
* **Validasi Real-Time & Konfirmasi:** Validasi format email dan kelengkapan data; menampilkan kartu konfirmasi sukses yang dipersonalisasi setelah pengiriman.
* **Direct Founder Access Card:** Kartu mengambang dengan foto studio *technical founder* nyata, penjelasan akses langsung tanpa perantara, serta tombol *"Quick Chat"* dan *"Schedule a Call"*.

### 4.9. Live Founder Chat Modal & Floating Utilities
* **Direct Founder Chat Widget:** Modal percakapan interaktif dengan *quick prompt chips* (*AI Support Agent*, *SaaS MVP Sprint*, *UI/UX Redesign*) dan balasan otomatis cerdas.
* **Back-to-Top Pill:** Tombol melayang di pojok kanan bawah yang hanya muncul saat pengguna melakukan *scroll-up* setelah melewati `550px`.

---

## 5. Persyaratan Non-Fungsional

* **Responsivitas:** Tata letak adaptif penuh untuk layar *mobile* (`< 640px`), *tablet* (`640px – 1024px`), dan *desktop* (`> 1024px` hingga `1440px`).
* **Keandalan Gambar:** Seluruh tag `<img>` menggunakan URL beresolusi tinggi dengan atribut `onerror` fallback agar tampilan tidak pernah rusak.
* **Aksesibilitas:** Mendukung navigasi keyboard (`tabindex="0"` pada kartu layanan, tombol `Escape` untuk menutup modal), atribut ARIA (`aria-expanded`, `aria-label`), serta kontras teks tinggi di atas foto lanskap melalui lapisan gradien atmosferik.