# Design System & UI/UX Architecture
## WeHexa — Visual Identity, Tokens & Motion Specification

---

## 1. Filosofi Desain & Arah Visual

**Konsep Inti:** *Atmospheric Realism meets Obsidian Engineering*

Desain WeHexa mendobrak stereotip situs agensi AI yang serba gelap dan penuh ilustrasi vektor/kartun generik. Sebaliknya, antarmuka ini memadukan:
1. **Kejernihan Alam Fotorealistik (*Sunlit Atmospheric Realism*):** Fotografi langit biru cerah dan perbukitan hijau terbuka yang melambangkan kejelasan visi, pertumbuhan organik, dan optimisme teknologi.
2. **Presisi Rekayasa Obsidian (*High-Craft Dark UI*):** Komponen kartu layanan aktif dan *footer* menggunakan warna hitam *obsidian* pekat (`#0D0F12`) untuk menonjolkan ketajaman rekayasa perangkat lunak.
3. **Aksen Energi Tinggi (*Electric Lime Pulse*):** Warna hijau limau cerah (`#D4F85A`) digunakan secara disiplin sebagai penanda aksi utama (*primary CTAs*), indikator progres *scroll*, dan titik fokus visual.

---

## 2. Sistem Warna (Color Tokens)

| Token Name | Hex / Value | Peran & Penggunaan Utama |
| :--- | :--- | :--- |
| `bg-canvas` | `#FFFFFF` | Latar belakang utama halaman & kartu permukaan terang |
| `bg-subtle` | `#F9FAFB` | Latar belakang kartu FAQ, kotak pratinjau layanan non-aktif, & *chat feed* |
| `obsidian-core` | `#0F1115` | Warna teks utama (*primary ink*), ikon tombol bulat/kotak, & tombol sekunder |
| `obsidian-card` | `#0D0F12` | Latar belakang kartu layanan aktif (*Services*) & kontainer *Footer* |
| `obsidian-surface` | `#161920` | Latar belakang sub-panel pratinjau di dalam kartu *Obsidian* |
| `lime-pulse` | `#D4F85A` | Warna CTA utama (*Book a Call*, *Contact Us*, *Schedule a Strategy Call*) & *progress bar* |
| `lime-pulse-hover` | `#C5EE3C` | Status *hover* pada seluruh tombol hijau limau |
| `sky-backdrop` | `#137CE5` → `#BCE2FF` | Gradien cadangan atmosferik di balik foto lanskap *Hero* & *Let's Talk* |
| `border-hairline` | `#E5E7EB` (`gray-200`) | Garis batas tipis pada kartu putih, input formulir, & akordeon FAQ |

---

## 3. Tipografi & Skala Hierarki

### Keluarga Font
* **Display & Body Sans:** `'Plus Jakarta Sans', system-ui, sans-serif` — Geometris, modern, humanis, dengan keterbacaan tinggi pada ukuran besar maupun kecil.
* **Technical & Metadata Mono:** `'JetBrains Mono', monospace` — Digunakan untuk *eyebrow labels* (`/Our Service`, `/FAQ`, `/Recent Blog`), penghitung kartu (`03 / 04`), dan lencana bukti sosial.

### Skala Tipografi Responsif
* **Hero Display (`H1`):** `2.25rem` (Mobile) → `3.35rem` (Tablet) → `4.15rem` (Desktop) | `font-weight: 700` | `line-height: 1.08` | `letter-spacing: -0.035em`.
* **Kinetic Display Banner:** `3.25rem` → `6.5rem` | `font-weight: 800` | `letter-spacing: -0.04em`.
* **Section Heading (`H2`):** `1.875rem` → `2.75rem` | `font-weight: 700` | `line-height: 1.12` | `letter-spacing: -0.03em`.
* **Card Title (`H3`):** `1.125rem` – `1.1875rem` (`18px–19px`) | `font-weight: 700` | `line-height: 1.35`.
* **Body Copy:** `0.875rem` – `1.0625rem` (`14px–17px`) | `font-weight: 400` | `line-height: 1.6`.
* **Eyebrow & Badge Mono:** `0.625rem` – `0.75rem` (`10px–12px`) | `font-weight: 600` | `letter-spacing: 0.06em`.

---

## 4. Tata Letak, Grid & Geometri Kontainer

* **Max Container Width:** `1440px` untuk pembungkus luar dengan *padding* horizontal responsif (`10px` pada mobile, `24px` pada desktop).
* **Framed Scenic Sections:** Bagian **Hero**, **Let's Talk**, dan **Footer** dibingkai dalam kontainer beradius besar (`rounded-[24px]` pada mobile, `rounded-[28px]` pada desktop) yang menciptakan kesan kartu editorial modern di atas kanvas putih bersih.
* **Sistem Radius Komponen:**
  * *Floating Navbar & CTA Buttons:* `rounded-full` (kapsul penuh).
  * *Ikon Panah di Dalam CTA:* `rounded-full sm:rounded-lg` (kotak membulat tajam di desktop untuk kontras geometris).
  * *Service Cards & Blog Cards:* `rounded-[22px]` dan `rounded-2xl`.
  * *Form Inputs:* `rounded-xl` (`12px`).

---

## 5. Panduan Aset Fotografi & Media (Aturan Anti-Kartun)

Seluruh aset visual **wajib menggunakan fotografi nyata atau render 3D studio berkualitas tinggi**. Ilustrasi kartun, vektor datar (*flat vector*), atau avatar ilustrasi dilarang keras.

1. **Lanskap Hero & Let's Talk:**
   * Menggunakan foto pemandangan alam terbuka beresolusi tinggi (`w=1920&q=85`) dengan komposisi langit biru cerah di bagian atas dan perbukitan hijau terang di bagian bawah.
   * Dilapisi gradien transparan (`from-[#0855A8]/60 via-[#0E74D8]/35 to-black/15`) agar teks putih memiliki kontras keterbacaan optimal.
2. **Potret Manusia (Social Proof & Direct Founder Access):**
   * *Social Proof Avatars:* 3 foto wajah profesional asli berbentuk lingkaran (`w-6 h-6`) dengan `ring-2 ring-white` dan `object-cover`.
   * *Direct Founder Access:* Foto potret studio profesional seorang *founder* (`w-20 h-20`, `rounded-2xl`, `object-cover object-top`).
3. **Thumbnail Artikel Blog (`aspect-[4/3]`):**
   * *Artikel 1 (AI Support):* Fotografi editorial seorang engineer/profesional bekerja dengan laptop di ruang kerja modern.
   * *Artikel 2 (Next.js SaaS):* Render 3D studio gelombang abstrak berwarna jingga-amber hangat.
   * *Artikel 3 (Psychology of UI):* Render 3D studio fluida gelap (*obsidian*) dengan aksen cahaya jingga dan *teal*.

---

## 6. Koreografi Gerak & Sistem Animasi Interaktif

### 6.1. Bidirectional Scroll Reveal (`[data-reveal]`)
* Menggunakan variabel CSS dinamis `--scroll-dir` (`1` saat *scroll-down*, `-1` saat *scroll-up*).
* Elemen muncul dengan interpolasi kurva pegas `cubic-bezier(0.22, 1, 0.36, 1)` dari pergeseran `translate3d(0, calc(28px * var(--scroll-dir)), 0)` menuju posisi netral, dan mereset secara halus saat keluar dari *viewport* sehingga animasi bekerja dua arah (*scroll-down* maupun *scroll-up*).

### 6.2. Scroll-Direction Reactive UI
* **Floating Navbar:** Menyusut ke atas (`translateY(-145%)`) saat pengguna menggulir ke bawah melewati `140px`, dan memantul turun (`translateY(0%)`) segera saat pengguna menggulir ke atas.
* **Client Logo Marquee:** Kecepatan dasar `0.65px/frame` dikalikan dengan `marqueeDirection` (`+1` atau `-1`) sesuai arah *scroll* terbaru.
* **Back-to-Top Pill:** Muncul dari bawah (`translate-y-0 opacity-100`) hanya ketika pengguna menggulir ke atas pada posisi `scrollY > 550px`.

### 6.3. Multi-Layer Parallax & Kinetic Scrubbing
* **Landscape Parallax (`[data-parallax]`):** Lapisan foto lanskap memiliki skala awal `scale-[1.12]` dan bergeser secara vertikal pada rasio `0.10` – `0.14` terhadap posisi *viewport*.
* **Kinetic Typography Banner:** Menggeser teks raksasa secara horizontal berdasarkan rumus `(rect.top - window.innerHeight * 0.5) * 0.28`.

### 6.4. Micro-Interactions (Hover & State Morphing)
* **Magnetic CTA Pills (`.magnetic-btn`):** Mengikuti posisi kursor di dalam batas tombol dengan faktor redaman `0.16x` (sumbu X) dan `0.22x` (sumbu Y), disertai rotasi ikon panah `↗` sebesar `12°`.
* **Service Cards Morphing:** Transisi `450ms` untuk warna latar (`#FFFFFF` ↔ `#0D0F12`), warna teks, bayangan `shadow-obsidian`, serta ekspansi deskripsi (`max-h-0` → `max-h-32`).