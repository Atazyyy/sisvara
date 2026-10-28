import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Megaphone,
  MessageCircle,
  Plus,
  RotateCcw,
  School,
  Trash2,
} from "lucide-react";
import { SCHOOL } from "../data/seed";
import { todayShort } from "../utils/format";
import { WA_LINK } from "./Navbar";

export default function Pengumuman({
  data,
  addPengumuman,
  removePengumuman,
  reset,
}) {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [penting, setPenting] = useState(false);
  const canPost = judul.trim().length > 0 && isi.trim().length > 0;
  const items = data.pengumuman || [];

  const submit = (e) => {
    e.preventDefault();
    if (!canPost) return;
    addPengumuman({
      id: `p${Date.now()}`,
      judul: judul.trim(),
      isi: isi.trim(),
      penting,
      tanggal: todayShort(),
      oleh: "Admin Sekolah",
    });
    setJudul("");
    setIsi("");
    setPenting(false);
  };

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-extrabold tracking-tight text-ink md:text-2xl">
          Pengumuman Sekolah
        </h1>
        <p className="mt-1 text-sm text-mute">
          Papan informasi untuk siswa &amp; orang tua — {items.length}{" "}
          pengumuman aktif.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Daftar pengumuman */}
        <div className="space-y-3 lg:col-span-2">
          {items.length === 0 && (
            <div className="rounded-2xl border border-dashed border-edge bg-card p-8 text-center">
              <Megaphone className="mx-auto h-8 w-8 text-mute" />
              <p className="mt-2 text-sm font-bold text-ink">
                Belum ada pengumuman
              </p>
              <p className="text-xs text-mute">
                Tambahkan lewat formulir di samping, atau pulihkan data contoh.
              </p>
            </div>
          )}

          <AnimatePresence initial={false}>
            {items.map((p) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-edge bg-card p-4 md:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {p.penting && (
                      <span className="rounded-full bg-bad-soft px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-bad">
                        Penting
                      </span>
                    )}
                    <span className="text-xs text-mute">{p.tanggal}</span>
                  </div>
                  <button
                    onClick={() => removePengumuman(p.id)}
                    title="Hapus pengumuman"
                    className="rounded-lg p-1.5 text-mute transition-colors hover:bg-bad-soft hover:text-bad"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="mt-1.5 text-base font-extrabold text-ink">
                  {p.judul}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mute">{p.isi}</p>
                <p className="mt-2.5 text-xs font-semibold text-sky-deep">
                  — {p.oleh}
                </p>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Sidebar: formulir + info sekolah */}
        <div className="space-y-4">
          <form
            onSubmit={submit}
            className="rounded-2xl border border-edge bg-card p-4 md:p-5"
          >
            <p className="flex items-center gap-2 text-sm font-extrabold text-ink">
              <Plus className="h-4 w-4 text-sky" />
              Tambah Pengumuman
            </p>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Judul pengumuman"
              maxLength={120}
              className="mt-3 w-full rounded-xl border border-edge bg-canvas px-3.5 py-2.5 text-sm font-semibold text-ink outline-none transition-colors focus:border-sky focus:bg-card"
            />
            <textarea
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              placeholder="Isi pengumuman…"
              rows={4}
              maxLength={600}
              className="mt-2 w-full resize-none rounded-xl border border-edge bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-sky focus:bg-card"
            />
            <label className="mt-2 flex items-center gap-2 text-sm text-mute">
              <input
                type="checkbox"
                checked={penting}
                onChange={(e) => setPenting(e.target.checked)}
                className="h-4 w-4 accent-sky"
              />
              Tandai sebagai{" "}
              <span className="font-extrabold text-bad">Penting</span>
            </label>
            <button
              type="submit"
              disabled={!canPost}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-sky py-2.5 text-sm font-extrabold text-white transition-colors hover:bg-sky-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Megaphone className="h-4 w-4" />
              Terbitkan Pengumuman
            </button>
          </form>

          <div className="rounded-2xl border border-edge bg-card p-4 md:p-5">
            <p className="flex items-center gap-2 text-sm font-extrabold text-ink">
              <School className="h-4 w-4 text-sky" />
              {SCHOOL.name}
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-mute">
              <li>
                <span className="font-bold text-ink">NPSN:</span> {SCHOOL.npsn}{" "}
                (fiktif)
              </li>
              <li>{SCHOOL.address}</li>
              <li>Kepala Sekolah: {SCHOOL.kepsek}</li>
              <li>
                T.A. {SCHOOL.tahunAjaran} · Semester {SCHOOL.semester}
              </li>
            </ul>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-ok-soft px-3.5 py-2 text-sm font-extrabold text-ok transition-colors hover:bg-ok hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Hubungi Tata Usaha
            </a>
            <button
              onClick={reset}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-edge px-3.5 py-2 text-xs font-bold text-mute transition-colors hover:border-sky hover:text-sky"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Pulihkan Data Contoh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
