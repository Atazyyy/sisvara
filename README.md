Kategori: Web App — School/Campus Management

# Sisvara — Manajemen Sekolah & Rapor Digital

> **Kategori proyek: Web App — School/Campus Management.**
> Satu aplikasi untuk kelola nilai per mapel dengan rata-rata otomatis,
> absensi harian H/I/S/A, rapor dengan peringkat kelas, dan papan
> pengumuman sekolah.

Aplikasi manajemen sekolah fiktif "Sisvara" untuk SMP Cahaya Nusantara —
dari input nilai harian oleh wali kelas sampai rapor peringkat yang siap
dibagikan. Proyek ini adalah **concept demo** untuk portofolio jasa
pembuatan web app — seluruh nama sekolah, siswa, guru, dan angka bersifat
fiktif. Nama "Sisvara" sengaja dibuat unik (belum dipakai entitas mana pun
di internet).

**Live:** https://sisvara.vercel.app

## Fitur

- **Kelola Kelas — tab Nilai**: 3 kelas (VII-A, VIII-B, IX-C) × 12 siswa
  (nama, NIS, JK). Input nilai per mapel (MTK, B. Indonesia, IPA,
  B. Inggris) → rata-rata otomatis per siswa, rata-rata kelas per mapel,
  dan grafik SVG dengan garis KKM 75.
- **Kelola Kelas — tab Absensi**: input harian H/I/S/A per siswa untuk
  hari ini, ringkasan hadir/izin/sakit/alpa, dan rekap % kehadiran
  (riwayat 24 hari efektif + hari ini).
- **Rapor Siswa**: nilai semua mapel + rata-rata + predikat (A–D) +
  peringkat kelas dari 12 siswa, rekap kehadiran lengkap, catatan wali
  kelas, dan tombol bagikan rangkuman via WhatsApp.
- **Pengumuman**: 4 pengumuman contoh bertanda "Penting", bisa tambah
  pengumuman baru & hapus, plus tombol pulihkan data contoh.
- **Stat ringkas**: rata-rata kelas, % kehadiran hari ini, siswa
  peringkat 1, dan mapel tertinggi — dihitung langsung dari data.
- Semua data tersimpan di **localStorage** (nilai yang diedit dan
  pengumuman yang ditambahkan tetap ada setelah refresh).
- Responsif desktop + mobile (tabel berubah jadi kartu), animasi halus
  Framer Motion, ikon Lucide, tanpa backend & tanpa library chart.

## Untuk siapa demo ini?

Sekolah, yayasan, lembaga bimbel, atau kampus yang butuh sistem akademik
ringan: rekap nilai, absensi harian, rapor berperingkat, dan papan
pengumuman — tanpa perlu backend maupun server database.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4 (token tema `@theme`)
- Framer Motion
- Lucide Icons
- Grafik SVG custom (tanpa library chart)

## Menjalankan

```bash
npm install
npm run dev      # development
npm run build    # production build ke folder dist/
npm run preview  # preview hasil build
```

---

Dibuat oleh [Agni Miftah Fauzi](https://github.com/Atazyyy) — jasa pembuatan
website & web app.
