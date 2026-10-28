// Data contoh Sisvara — seluruh nama sekolah, siswa, guru & angka bersifat FIKTIF.
// Nilai & riwayat absensi dibangkitkan secara deterministik (hash dari NIS)
// supaya demo konsisten setiap kali halaman dibuka.

export const WA_NUMBER = "6281234567890";

export const SCHOOL = {
  name: "SMP Cahaya Nusantara",
  address: "Jl. Melati Raya No. 27, Bandung, Jawa Barat",
  npsn: "20219876",
  tahunAjaran: "2026/2027",
  semester: "Ganjil",
  kepsek: "Drs. Bambang Setiawan, M.Pd.",
};

export const KELAS = [
  { id: "VII-A", wali: "Ratna Widyaningrum, S.Pd.", ruang: "Ruang 101" },
  { id: "VIII-B", wali: "Dedi Kurniawan, S.Pd.", ruang: "Ruang 204" },
  { id: "IX-C", wali: "Sri Wahyuni, M.Pd.", ruang: "Ruang 301" },
];

export const SUBJECTS = [
  { id: "mtk", label: "Matematika", short: "MTK" },
  { id: "bindo", label: "B. Indonesia", short: "B.Indo" },
  { id: "ipa", label: "IPA", short: "IPA" },
  { id: "bing", label: "B. Inggris", short: "B.Ing" },
];

export const KKM = 75; // Kriteria Ketuntasan Minimal (fiktif)

export const ABSEN_STATUSES = [
  { id: "H", label: "Hadir" },
  { id: "I", label: "Izin" },
  { id: "S", label: "Sakit" },
  { id: "A", label: "Alpa" },
];

// ---------- Siswa: 3 kelas × 12 siswa (nama, NIS, JK) ----------
export const STUDENTS = {
  "VII-A": [
    { nis: "240101", nama: "Ahmad Fauzan Alghifari", jk: "L" },
    { nis: "240102", nama: "Bunga Cahaya Ramadhani", jk: "P" },
    { nis: "240103", nama: "Dimas Arya Saputra", jk: "L" },
    { nis: "240104", nama: "Eka Putri Maharani", jk: "P" },
    { nis: "240105", nama: "Fajar Nugraha Wijaya", jk: "L" },
    { nis: "240106", nama: "Gita Anjani Safitri", jk: "P" },
    { nis: "240107", nama: "Hendra Kusuma Wardana", jk: "L" },
    { nis: "240108", nama: "Intan Permata Sari", jk: "P" },
    { nis: "240109", nama: "Joko Prasetyo Aji", jk: "L" },
    { nis: "240110", nama: "Kirana Melati Az Zahra", jk: "P" },
    { nis: "240111", nama: "Lukman Hakim Alfarizi", jk: "L" },
    { nis: "240112", nama: "Maya Sopiah Utami", jk: "P" },
  ],
  "VIII-B": [
    { nis: "230101", nama: "Nadia Rahma Yulianti", jk: "P" },
    { nis: "230102", nama: "Oktavianus Bayu Setiawan", jk: "L" },
    { nis: "230103", nama: "Putri Andini Kirana", jk: "P" },
    { nis: "230104", nama: "Qori Handayani Anwar", jk: "P" },
    { nis: "230105", nama: "Rizky Ramadhan Maulana", jk: "L" },
    { nis: "230106", nama: "Salsa Nabila Husna", jk: "P" },
    { nis: "230107", nama: "Tegar Aditya Pratama", jk: "L" },
    { nis: "230108", nama: "Umi Kalsum Zahra", jk: "P" },
    { nis: "230109", nama: "Vino Bastian Hidayat", jk: "L" },
    { nis: "230110", nama: "Wulan Sari Dewi", jk: "P" },
    { nis: "230111", nama: "Yoga Eka Prasetya", jk: "L" },
    { nis: "230112", nama: "Zahra Amelia Putri", jk: "P" },
  ],
  "IX-C": [
    { nis: "220101", nama: "Aditya Rahman Hakim", jk: "L" },
    { nis: "220102", nama: "Bella Safira Ananda", jk: "P" },
    { nis: "220103", nama: "Cahyo Nugroho Adi", jk: "L" },
    { nis: "220104", nama: "Dinda Ayu Lestari", jk: "P" },
    { nis: "220105", nama: "Eko Saputra Wijaya", jk: "L" },
    { nis: "220106", nama: "Fitriani Nur Azizah", jk: "P" },
    { nis: "220107", nama: "Galih Purnama Sidi", jk: "L" },
    { nis: "220108", nama: "Hanif Abdurrahman", jk: "L" },
    { nis: "220109", nama: "Indah Cahyaningrum", jk: "P" },
    { nis: "220110", nama: "Julius Bagas Prakoso", jk: "L" },
    { nis: "220111", nama: "Kartika Sari Wibowo", jk: "P" },
    { nis: "220112", nama: "Bagas Dwi Santoso", jk: "L" },
  ],
};

// ---------- Pengumuman contoh ----------
export const PENGUMUMAN_SEED = [
  {
    id: "a1",
    judul: "Ujian Tengah Semester (UTS) Ganjil 2026/2027",
    isi: "UTS semester ganjil dilaksanakan pada 2–7 November 2026. Seluruh siswa wajib hadir 15 menit sebelum ujian dimulai dan membawa kartu peserta. Materi ujian mencakup seluruh bab yang telah diajarkan hingga pertengahan Oktober. Siswa yang berhalangan karena sakit wajib menyerahkan surat keterangan dokter paling lambat sehari setelah jadwal ujian.",
    tanggal: "26 Okt 2026",
    oleh: "Kepala Sekolah — Drs. Bambang Setiawan, M.Pd.",
    penting: true,
  },
  {
    id: "a2",
    judul: "Pembagian Rapor Pertengahan Semester",
    isi: "Pembagian rapor pertengahan semester dilaksanakan pada Sabtu, 8 November 2026 pukul 08.00–12.00 WIB di ruang kelas masing-masing, dilanjutkan konsultasi singkat orang tua/wali bersama wali kelas. Mohon hadir tepat waktu sesuai jadwal yang diinformasikan wali kelas melalui grup kelas.",
    tanggal: "24 Okt 2026",
    oleh: "Admin Sekolah",
    penting: false,
  },
  {
    id: "a3",
    judul: "Ekstrakurikuler Baru: Klub Robotik & Coding",
    isi: "Mulai bulan ini sekolah membuka Klub Robotik & Coding untuk siswa kelas VII–IX. Kegiatan berlangsung setiap Jumat pukul 15.00–16.30 di Laboratorium Komputer. Pendaftaran dibuka hingga 5 November 2026 melalui wali kelas; kuota terbatas 20 siswa per angkatan.",
    tanggal: "21 Okt 2026",
    oleh: "Tim Ekstrakurikuler",
    penting: false,
  },
  {
    id: "a4",
    judul: "Jadwal Class Meeting & Lomba Hari Sains",
    isi: "Class meeting dan lomba hari sains akan digelar pada 21–22 November 2026. Setiap kelas wajib mendaftarkan minimal dua tim lomba (karya ilmiah dan mini robot line follower). Pendaftaran tim ditutup 14 November 2026. Nama tim bebas, asalkan sopan dan sesuai nilai-nilai sekolah.",
    tanggal: "19 Okt 2026",
    oleh: "Wali Kelas IX-C — Sri Wahyuni, M.Pd.",
    penting: false,
  },
];

// ---------- Generator deterministik (hash FNV-1a dari string) ----------
function hashStr(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Nilai awal: { [kelas]: { [nis]: { mtk: "87", bindo: "90", ... } } }
export function seededNilai() {
  const out = {};
  for (const k of KELAS) {
    out[k.id] = {};
    for (const s of STUDENTS[k.id]) {
      const row = {};
      const bias = hashStr("b" + s.nis) % 10; // 0..9 — kecenderungan per siswa
      for (const m of SUBJECTS) {
        const v = 62 + bias * 2 + (hashStr(s.nis + m.id) % 13); // 62..92
        row[m.id] = String(Math.min(99, v));
      }
      out[k.id][s.nis] = row;
    }
  }
  return out;
}

// Riwayat absensi 24 hari efektif (Izin/Sakit/Alpa), sisanya Hadir:
// { [kelas]: { [nis]: { i, s, a } } }
export const EFFECTIVE_DAYS = 24;

export function seededAbsenBase() {
  const out = {};
  for (const k of KELAS) {
    out[k.id] = {};
    for (const s of STUDENTS[k.id]) {
      const h = hashStr("abs" + s.nis);
      out[k.id][s.nis] = {
        i: h % 3,
        s: (h >> 2) % 3,
        a: (h >> 4) % 2,
      };
    }
  }
  return out;
}

// Status absensi hari ini (default: semua Hadir)
export function initialAbsen() {
  const out = {};
  for (const k of KELAS) {
    out[k.id] = {};
    for (const s of STUDENTS[k.id]) out[k.id][s.nis] = "H";
  }
  return out;
}
