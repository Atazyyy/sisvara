import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  CalendarCheck,
  MessageCircle,
} from "lucide-react";
import { STUDENTS, SUBJECTS, KKM, SCHOOL } from "../data/seed";
import {
  parseScore,
  avgStr,
  buildRanking,
  rekapAbsensi,
  predikat,
  catatanWali,
} from "../utils/grade";
import ClassSwitcher from "./ClassSwitcher";
import { Avatar, JkBadge } from "./ui";

const ABSEN_BOX = {
  H: "bg-ok-soft text-ok",
  I: "bg-warn-soft text-warn",
  S: "bg-sick-soft text-sick",
  A: "bg-bad-soft text-bad",
};

export default function Rapor({ data }) {
  const [kelas, setKelas] = useState("VII-A");
  const [nis, setNis] = useState(STUDENTS["VII-A"][0].nis);

  const selectKelas = (k) => {
    setKelas(k);
    setNis(STUDENTS[k][0].nis);
  };

  const students = STUDENTS[kelas];
  const ranking = buildRanking(data.nilai[kelas] || {}, students);
  const sel = ranking.find((r) => r.nis === nis) || ranking[0];
  const rowNilai = data.nilai[kelas]?.[sel.nis] || {};
  const today = data.absen[kelas]?.[sel.nis] || "H";
  const rekap = rekapAbsensi(data.absenBase?.[kelas]?.[sel.nis], today);
  const pr = predikat(sel.avg);

  const mapelAvg = {};
  for (const m of SUBJECTS) {
    const vals = students
      .map((s) => parseScore((data.nilai[kelas]?.[s.nis] || {})[m.id]))
      .filter((v) => v !== null);
    mapelAvg[m.id] = vals.length
      ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10
      : null;
  }

  const waShare = `https://wa.me/?text=${encodeURIComponent(
    `Rapor ${sel.nama} (Kelas ${kelas}) — ${SCHOOL.name}: rata-rata ${avgStr(sel.avg)} (${pr?.label ?? "-"}), peringkat ${sel.rank ?? "-"} dari ${students.length} siswa, kehadiran ${rekap.pct}%. [Sisvara — concept demo]`
  )}`;

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-extrabold tracking-tight text-ink md:text-2xl">
          Rapor Siswa
        </h1>
        <p className="mt-1 text-sm text-mute">
          Nilai semua mapel, rata-rata, peringkat kelas, dan rekap absensi —
          tersusun otomatis dari data Kelola Kelas.
        </p>
      </div>

      <ClassSwitcher kelas={kelas} onChange={selectKelas} />

      <div className="mt-4 grid gap-4 lg:grid-cols-5">
        {/* Kartu rapor */}
        <motion.div
          key={kelas + sel.nis}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl border border-edge bg-card p-5 md:p-6 lg:col-span-3"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar name={sel.nama} size="h-14 w-14 text-lg" />
              <div>
                <h2 className="text-lg font-extrabold tracking-tight text-ink">
                  {sel.nama}
                </h2>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-mute">
                  <span className="font-mono">NIS {sel.nis}</span>
                  <span>·</span>
                  <span>Kelas {kelas}</span>
                  <JkBadge jk={sel.jk} />
                </div>
                <p className="mt-0.5 text-xs text-mute">
                  T.A. {SCHOOL.tahunAjaran} · Semester {SCHOOL.semester}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold text-sky-deep">
                {avgStr(sel.avg)}
              </p>
              {pr && (
                <span
                  className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-bold ${pr.cls}`}
                >
                  {pr.huruf} · {pr.label}
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-xs font-extrabold text-warn">
              <Award className="h-3.5 w-3.5" />
              Peringkat {sel.rank ?? "—"} dari {students.length} siswa
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold ${
                sel.avg !== null && sel.avg >= KKM
                  ? "bg-ok-soft text-ok"
                  : "bg-bad-soft text-bad"
              }`}
            >
              {sel.avg !== null && sel.avg >= KKM
                ? "Tuntas KKM"
                : "Di bawah KKM"}{" "}
              ({KKM})
            </span>
          </div>

          {/* Nilai per mapel */}
          <div className="mt-4 divide-y divide-edge border-t border-edge">
            {SUBJECTS.map((m) => {
              const score = parseScore(rowNilai[m.id]);
              return (
                <div key={m.id} className="flex items-center gap-3 py-2.5">
                  <BookOpen className="h-4 w-4 shrink-0 text-sky" />
                  <p className="w-24 shrink-0 text-sm font-semibold text-ink">
                    {m.label}
                  </p>
                  <div className="h-2 min-w-16 flex-1 overflow-hidden rounded-full bg-canvas">
                    <div
                      className={`h-2 rounded-full ${
                        score !== null && score >= KKM ? "bg-sky" : "bg-warn"
                      }`}
                      style={{ width: `${score ?? 0}%` }}
                    />
                  </div>
                  <span className="w-9 text-right text-sm font-extrabold text-ink">
                    {score ?? "—"}
                  </span>
                  <span className="hidden w-24 text-right text-xs text-mute sm:block">
                    kelas {avgStr(mapelAvg[m.id])}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Catatan wali kelas */}
          <div className="mt-4 rounded-xl bg-canvas p-3.5">
            <p className="text-xs font-extrabold uppercase tracking-wide text-mute">
              Catatan Wali Kelas
            </p>
            <p className="mt-1 text-sm italic leading-relaxed text-ink">
              “{catatanWali(sel.avg)}”
            </p>
          </div>

          <a
            href={waShare}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-ok-soft px-4 py-2.5 text-sm font-extrabold text-ok transition-colors hover:bg-ok hover:text-white"
          >
            <MessageCircle className="h-4 w-4" />
            Bagikan Rangkuman via WhatsApp
          </a>
        </motion.div>

        {/* Kolom kanan: absensi + peringkat */}
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl border border-edge bg-card p-4 md:p-5">
            <p className="flex items-center gap-2 text-sm font-extrabold text-ink">
              <CalendarCheck className="h-4 w-4 text-sky" />
              Rekap Kehadiran
            </p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {["H", "I", "S", "A"].map((id) => (
                <div
                  key={id}
                  className={`rounded-xl px-2 py-2.5 text-center ${ABSEN_BOX[id]}`}
                >
                  <p className="text-lg font-extrabold">{rekap[id.toLowerCase()]}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wide">
                    {id === "H" ? "Hadir" : id === "I" ? "Izin" : id === "S" ? "Sakit" : "Alpa"}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-mute">
                <span>% kehadiran</span>
                <span className="font-extrabold text-ink">
                  {rekap.h}/{rekap.total} hari · {rekap.pct}%
                </span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-canvas">
                <div
                  className="h-2 rounded-full bg-ok"
                  style={{ width: `${rekap.pct}%` }}
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-edge bg-card p-4 md:p-5">
            <p className="flex items-center gap-2 text-sm font-extrabold text-ink">
              <Award className="h-4 w-4 text-sky" />
              Peringkat Kelas {kelas}
            </p>
            <div className="mt-3 space-y-1">
              {ranking.map((r, i) => (
                <button
                  key={r.nis}
                  onClick={() => setNis(r.nis)}
                  className={`flex w-full items-center gap-2.5 rounded-xl border px-2.5 py-2 text-left transition-colors ${
                    r.nis === sel.nis
                      ? "border-sky bg-sky-soft"
                      : "border-transparent hover:bg-canvas"
                  }`}
                >
                  <span
                    className={`w-6 text-center text-sm font-extrabold ${
                      i < 3 ? "text-sky-deep" : "text-mute"
                    }`}
                  >
                    {r.rank ?? "—"}
                  </span>
                  <Avatar name={r.nama} size="h-7 w-7 text-[10px]" />
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">
                    {r.nama}
                  </span>
                  <span className="text-sm font-extrabold text-sky-deep">
                    {avgStr(r.avg)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
