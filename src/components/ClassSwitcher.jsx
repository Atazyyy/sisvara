import { KELAS, STUDENTS } from "../data/seed";

// Pemilih kelas: 3 kelas, masing-masing 12 siswa
export default function ClassSwitcher({ kelas, onChange }) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {KELAS.map((k) => {
        const active = k.id === kelas;
        return (
          <button
            key={k.id}
            onClick={() => onChange(k.id)}
            className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all ${
              active
                ? "border-sky bg-sky text-white shadow-md shadow-sky/30"
                : "border-edge bg-card text-ink hover:border-sky"
            }`}
          >
            <div>
              <p className="text-base font-extrabold tracking-tight">
                Kelas {k.id}
              </p>
              <p className={`text-xs ${active ? "text-sky-soft" : "text-mute"}`}>
                {STUDENTS[k.id].length} siswa · {k.ruang}
              </p>
            </div>
            <span
              className={`text-xs font-extrabold ${active ? "text-white" : "text-sky"}`}
            >
              {active ? "AKTIF" : "PILIH"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
