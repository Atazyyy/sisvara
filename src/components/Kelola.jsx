import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  TrendingUp,
} from "lucide-react";
import {
  STUDENTS,
  SUBJECTS,
  KKM,
  ABSEN_STATUSES,
  EFFECTIVE_DAYS,
} from "../data/seed";
import { parseScore, avgStr, buildRanking, rekapAbsensi } from "../utils/grade";
import { fullDate } from "../utils/format";
import ClassSwitcher from "./ClassSwitcher";
import { Avatar, JkBadge } from "./ui";

const ABSEN_ON = {
  H: "bg-ok text-white",
  I: "bg-warn text-white",
  S: "bg-sick text-white",
  A: "bg-bad text-white",
};
const ABSEN_OFF = {
  H: "bg-ok-soft text-ok hover:bg-ok hover:text-white",
  I: "bg-warn-soft text-warn hover:bg-warn hover:text-white",
  S: "bg-sick-soft text-sick hover:bg-sick hover:text-white",
  A: "bg-bad-soft text-bad hover:bg-bad hover:text-white",
};
const ABSEN_CHIP = {
  H: "bg-ok-soft text-ok",
  I: "bg-warn-soft text-warn",
  S: "bg-sick-soft text-sick",
  A: "bg-bad-soft text-bad",
};

const pctCls = (pct) =>
  pct >= 90 ? "text-ok" : pct >= 75 ? "text-warn" : "text-bad";

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="rounded-2xl border border-edge bg-card p-4">
      <div className="flex items-center gap-2 text-mute">
        <Icon className="h-4 w-4" />
        <p className="text-xs font-semibold">{label}</p>
      </div>
      <p className="mt-1.5 truncate text-xl font-extrabold text-ink">{value}</p>
      {sub && <p className="mt-0.5 truncate text-xs text-mute">{sub}</p>}
    </div>
  );
}

// Grafik SVG buatan sendiri: rata-rata kelas per mapel + garis KKM
function MapelChart({ data }) {
  const W = 320;
  const H = 190;
  const padX = 22;
  const padT = 20;
  const padB = 30;
  const gap = 16;
  const max = 100;
  const bw = (W - padX * 2 - gap * (data.length - 1)) / data.length;
  const kkmY = H - padB - (KKM / max) * (H - padB - padT);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Rata-rata kelas per mata pelajaran"
    >
      <line
        x1={padX}
        x2={W - padX}
        y1={kkmY}
        y2={kkmY}
        stroke="#f59e0b"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <text
        x={W - padX}
        y={kkmY - 4}
        textAnchor="end"
        fontSize="9"
        fontWeight="700"
        fill="#d97706"
      >
        KKM {KKM}
      </text>
      {data.map((d, ci) => {
        const x = padX + ci * (bw + gap);
        const h = Math.max(3, ((d.avg / max) * (H - padB - padT)) | 0);
        return (
          <g key={d.id}>
            <title>{`${d.label}: rata-rata kelas ${avgStr(d.avg)}`}</title>
            <rect
              x={x}
              y={H - padB - h}
              width={bw}
              height={h}
              rx={6}
              fill={d.avg >= KKM ? "#0284c7" : "#f59e0b"}
            />
            <text
              x={x + bw / 2}
              y={H - padB - h - 5}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="#0e2338"
            >
              {avgStr(d.avg)}
            </text>
            <text
              x={x + bw / 2}
              y={H - 10}
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              fill="#57708c"
            >
              {d.short}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function ScoreInput({ value, onChange }) {
  return (
    <input
      type="text"
      inputMode="numeric"
      maxLength={3}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder="—"
      aria-label="Nilai"
      className="h-9 w-full max-w-14 rounded-lg border border-edge bg-canvas text-center text-sm font-bold text-ink outline-none transition-colors focus:border-sky focus:bg-card"
    />
  );
}

export default function Kelola({ data, setNilai, setAbsen }) {
  const [kelas, setKelas] = useState("VII-A");
  const [tab, setTab] = useState("nilai");
  const students = STUDENTS[kelas];

  const ranking = buildRanking(data.nilai[kelas] || {}, students);
  const avgs = ranking.map((r) => r.avg).filter((v) => v !== null);
  const classAvg = avgs.length
    ? Math.round((avgs.reduce((a, b) => a + b, 0) / avgs.length) * 10) / 10
    : null;
  const tuntas = ranking.filter((r) => r.avg !== null && r.avg >= KKM).length;
  const hadirToday = students.filter(
    (s) => (data.absen[kelas]?.[s.nis] || "H") === "H"
  ).length;
  const kehadiranPct = Math.round((hadirToday / students.length) * 100);
  const top = ranking[0];

  const mapelAvg = SUBJECTS.map((m) => {
    const vals = students
      .map((s) => parseScore((data.nilai[kelas]?.[s.nis] || {})[m.id]))
      .filter((v) => v !== null);
    return {
      ...m,
      avg: vals.length
        ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10
        : 0,
    };
  });
  const topMapel = [...mapelAvg].sort((a, b) => b.avg - a.avg)[0];

  const absenCounts = ABSEN_STATUSES.map((st) => ({
    ...st,
    n: students.filter((s) => (data.absen[kelas]?.[s.nis] || "H") === st.id)
      .length,
  }));

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-extrabold tracking-tight text-ink md:text-2xl">
          Kelola Kelas
        </h1>
        <p className="mt-1 text-sm text-mute">
          Input nilai per mapel dan absensi harian — rata-rata &amp; rekap
          kehadiran dihitung otomatis.
        </p>
      </div>

      <ClassSwitcher kelas={kelas} onChange={setKelas} />

      {/* Stat ringkas */}
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={TrendingUp}
          label="Rata-rata Kelas"
          value={avgStr(classAvg)}
          sub={`${tuntas}/${students.length} siswa tuntas KKM ${KKM}`}
        />
        <StatCard
          icon={CalendarCheck}
          label="Kehadiran Hari Ini"
          value={`${kehadiranPct}%`}
          sub={`${hadirToday} dari ${students.length} siswa hadir`}
        />
        <StatCard
          icon={Award}
          label="Peringkat 1"
          value={top?.nama?.split(" ")[0] ?? "—"}
          sub={top ? `rata-rata ${avgStr(top.avg)}` : "belum ada nilai"}
        />
        <StatCard
          icon={BookOpen}
          label="Mapel Tertinggi"
          value={topMapel?.short ?? "—"}
          sub={topMapel ? `rata-rata kelas ${avgStr(topMapel.avg)}` : ""}
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-4">
        {/* Tab nilai / absensi */}
        <div className="lg:col-span-3">
          <div className="mb-3 flex w-fit gap-1 rounded-full bg-canvas p-1">
            {[
              { id: "nilai", label: "Input Nilai", icon: ClipboardList },
              { id: "absensi", label: "Absensi Harian", icon: CalendarCheck },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  tab === t.id
                    ? "bg-sky text-white shadow-sm"
                    : "text-mute hover:text-sky"
                }`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </div>

          <motion.div
            key={kelas + tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {tab === "nilai" ? (
              <div className="rounded-2xl border border-edge bg-card p-4 md:p-5">
                <p className="text-sm font-extrabold text-ink">
                  Nilai Mapel — Kelas {kelas}
                </p>
                <p className="text-xs text-mute">
                  Isi nilai 0–100 per mapel; kolom rata-rata menghitung otomatis.
                </p>

                {/* Tabel desktop */}
                <div className="mt-3 hidden overflow-x-auto md:block">
                  <table className="w-full min-w-[680px] text-left">
                    <thead>
                      <tr className="text-xs uppercase tracking-wide text-mute">
                        <th className="px-3 py-2 font-bold">No</th>
                        <th className="px-3 py-2 font-bold">Siswa</th>
                        <th className="px-3 py-2 font-bold">NIS</th>
                        {SUBJECTS.map((m) => (
                          <th key={m.id} className="px-3 py-2 text-center font-bold">
                            {m.short}
                          </th>
                        ))}
                        <th className="px-3 py-2 text-center font-bold">Rata²</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s, i) => {
                        const row = data.nilai[kelas]?.[s.nis] || {};
                        const avg = ranking.find((r) => r.nis === s.nis)?.avg;
                        return (
                          <tr key={s.nis} className="border-t border-edge">
                            <td className="px-3 py-2 text-sm text-mute">{i + 1}</td>
                            <td className="px-3 py-2">
                              <div className="flex items-center gap-2.5">
                                <Avatar name={s.nama} size="h-7 w-7 text-[10px]" />
                                <span className="text-sm font-semibold text-ink">
                                  {s.nama}
                                </span>
                                <JkBadge jk={s.jk} />
                              </div>
                            </td>
                            <td className="px-3 py-2 font-mono text-xs text-mute">
                              {s.nis}
                            </td>
                            {SUBJECTS.map((m) => (
                              <td key={m.id} className="px-3 py-2">
                                <div className="mx-auto w-14">
                                  <ScoreInput
                                    value={row[m.id]}
                                    onChange={(v) => setNilai(kelas, s.nis, m.id, v)}
                                  />
                                </div>
                              </td>
                            ))}
                            <td
                              className={`px-3 py-2 text-center text-sm font-extrabold ${
                                avg === null
                                  ? "text-mute"
                                  : avg >= KKM
                                    ? "text-ok"
                                    : "text-bad"
                              }`}
                            >
                              {avgStr(avg)}
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="border-t-2 border-edge bg-canvas">
                        <td colSpan={3} className="px-3 py-2.5 text-xs font-bold text-mute">
                          Rata-rata kelas
                        </td>
                        {mapelAvg.map((m) => (
                          <td
                            key={m.id}
                            className="px-3 py-2.5 text-center text-sm font-extrabold text-sky-deep"
                          >
                            {avgStr(m.avg)}
                          </td>
                        ))}
                        <td className="px-3 py-2.5 text-center text-sm font-extrabold text-sky-deep">
                          {avgStr(classAvg)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Kartu mobile */}
                <div className="mt-3 space-y-3 md:hidden">
                  {students.map((s) => {
                    const row = data.nilai[kelas]?.[s.nis] || {};
                    const avg = ranking.find((r) => r.nis === s.nis)?.avg;
                    return (
                      <div key={s.nis} className="rounded-xl border border-edge p-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={s.nama} size="h-8 w-8 text-xs" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-ink">
                              {s.nama}
                            </p>
                            <p className="text-xs text-mute">NIS {s.nis}</p>
                          </div>
                          <JkBadge jk={s.jk} />
                        </div>
                        <div className="mt-2.5 grid grid-cols-4 gap-2">
                          {SUBJECTS.map((m) => (
                            <div key={m.id}>
                              <p className="mb-1 text-center text-[10px] font-bold text-mute">
                                {m.short}
                              </p>
                              <ScoreInput
                                value={row[m.id]}
                                onChange={(v) => setNilai(kelas, s.nis, m.id, v)}
                              />
                            </div>
                          ))}
                        </div>
                        <p className="mt-2 text-right text-xs text-mute">
                          Rata-rata:{" "}
                          <span
                            className={`font-extrabold ${
                              avg === null
                                ? "text-mute"
                                : avg >= KKM
                                  ? "text-ok"
                                  : "text-bad"
                            }`}
                          >
                            {avgStr(avg)}
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-edge bg-card p-4 md:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-extrabold text-ink">
                      Absensi Hari Ini — Kelas {kelas}
                    </p>
                    <p className="text-xs text-mute">
                      {fullDate()} · klik huruf untuk mengubah status
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {absenCounts.map((c) => (
                      <span
                        key={c.id}
                        title={c.label}
                        className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${ABSEN_CHIP[c.id]}`}
                      >
                        {c.id}: {c.n}
                      </span>
                    ))}
                    <span
                      className={`rounded-full bg-canvas px-2.5 py-1 text-xs font-extrabold ${pctCls(kehadiranPct)}`}
                    >
                      {kehadiranPct}% hadir
                    </span>
                  </div>
                </div>

                <div className="mt-3 divide-y divide-edge">
                  {students.map((s) => {
                    const today = data.absen[kelas]?.[s.nis] || "H";
                    const rekap = rekapAbsensi(
                      data.absenBase?.[kelas]?.[s.nis],
                      today
                    );
                    return (
                      <div
                        key={s.nis}
                        className="flex flex-wrap items-center gap-x-3 gap-y-2 py-2.5"
                      >
                        <Avatar name={s.nama} />
                        <div className="min-w-36 flex-1">
                          <p className="text-sm font-bold text-ink">{s.nama}</p>
                          <p className="text-xs text-mute">NIS {s.nis}</p>
                        </div>
                        <div className="flex gap-1">
                          {ABSEN_STATUSES.map((st) => {
                            const on = today === st.id;
                            return (
                              <button
                                key={st.id}
                                onClick={() => setAbsen(kelas, s.nis, st.id)}
                                title={st.label}
                                className={`h-8 w-9 rounded-lg text-xs font-extrabold transition-colors ${
                                  on ? ABSEN_ON[st.id] : ABSEN_OFF[st.id]
                                }`}
                              >
                                {st.id}
                              </button>
                            );
                          })}
                        </div>
                        <span
                          className={`w-14 text-right text-xs font-extrabold ${pctCls(rekap.pct)}`}
                          title={`Kehadiran ${rekap.h} dari ${rekap.total} hari`}
                        >
                          {rekap.pct}%
                        </span>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-3 text-xs text-mute">
                  Rekap % kehadiran dihitung dari riwayat {EFFECTIVE_DAYS} hari
                  efektif + hari ini (H = Hadir, I = Izin, S = Sakit, A = Alpa).
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Grafik rata-rata per mapel */}
        <div className="rounded-2xl border border-edge bg-card p-4 md:p-5">
          <p className="text-sm font-extrabold text-ink">Rata-rata per Mapel</p>
          <p className="text-xs text-mute">Kelas {kelas} · skala 0–100</p>
          <div className="mt-3">
            <MapelChart data={mapelAvg} />
          </div>
          <p className="mt-2 text-xs text-mute">
            Batang di bawah garis KKM {KKM} berwarna amber — kelas perlu
            pendampingan tambahan pada mapel tersebut.
          </p>
        </div>
      </div>
    </div>
  );
}
