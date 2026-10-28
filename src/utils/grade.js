import { SUBJECTS, EFFECTIVE_DAYS } from "../data/seed";

// "85" → 85, ""/"abc" → null, clamp 0..100
export const parseScore = (v) => {
  if (v === "" || v === null || v === undefined) return null;
  const n = Number(v);
  if (!Number.isFinite(n)) return null;
  return Math.max(0, Math.min(100, Math.round(n)));
};

// Rata-rata otomatis siswa: rata-rata mapel yang sudah diisi
export function studentAverage(row) {
  if (!row) return null;
  const vals = SUBJECTS.map((m) => parseScore(row[m.id])).filter(
    (v) => v !== null
  );
  if (!vals.length) return null;
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
}

// Format angka gaya Indonesia: 84.5 → "84,5"
export const avgStr = (v) =>
  v === null || v === undefined || Number.isNaN(v)
    ? "—"
    : v.toLocaleString("id-ID", { maximumFractionDigits: 1 });

// Peringkat kelas: [{ nis, nama, jk, avg, rank }] terurut turun
export function buildRanking(nilaiKelas, students) {
  const rows = students.map((s) => ({
    nis: s.nis,
    nama: s.nama,
    jk: s.jk,
    avg: studentAverage(nilaiKelas?.[s.nis]),
  }));
  rows.sort((a, b) => (b.avg ?? -1) - (a.avg ?? -1) || a.nis.localeCompare(b.nis));
  let rank = 0;
  let prev = null;
  rows.forEach((r, idx) => {
    if (r.avg === null) {
      r.rank = null;
      return;
    }
    if (prev === null || r.avg !== prev) {
      rank = idx + 1;
      prev = r.avg;
    }
    r.rank = rank;
  });
  return rows;
}

// Rekap kehadiran: riwayat 24 hari efektif + hari ini (total 25 hari)
export function rekapAbsensi(base, today) {
  const i = (base?.i || 0) + (today === "I" ? 1 : 0);
  const s = (base?.s || 0) + (today === "S" ? 1 : 0);
  const a = (base?.a || 0) + (today === "A" ? 1 : 0);
  const total = EFFECTIVE_DAYS + 1;
  const h = total - i - s - a;
  return { h, i, s, a, total, pct: Math.round((h / total) * 1000) / 10 };
}

// Predikat dari rata-rata (skala 100)
export function predikat(avg) {
  if (avg === null || avg === undefined) return null;
  if (avg >= 90) return { huruf: "A", label: "Sangat Baik", cls: "bg-ok-soft text-ok" };
  if (avg >= 80) return { huruf: "B", label: "Baik", cls: "bg-sky-soft text-sky-deep" };
  if (avg >= 70) return { huruf: "C", label: "Cukup", cls: "bg-warn-soft text-warn" };
  return { huruf: "D", label: "Perlu Bimbingan", cls: "bg-bad-soft text-bad" };
}

// Catatan wali kelas sesuai predikat (fiktif)
export function catatanWali(avg) {
  if (avg === null || avg === undefined)
    return "Belum ada nilai yang cukup untuk membuat catatan.";
  if (avg >= 90)
    return "Prestasi sangat konsisten. Pertahankan semangat belajar dan teruslah membantu teman-teman sekelas.";
  if (avg >= 80)
    return "Hasil belajar baik. Tingkatkan ketelitian pada soal cerita agar naik ke predikat A.";
  if (avg >= 70)
    return "Cukup baik, namun perlu latihan tambahan di rumah. Disarankan mengikuti program pendampingan terjadwal.";
  return "Perlu pendampingan belajar lebih intensif. Wali kelas akan menjadwalkan konsultasi dengan orang tua/wali.";
}
