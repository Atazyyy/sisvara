import { GraduationCap, MessageCircle } from "lucide-react";
import { WA_NUMBER } from "../data/seed";

const NAV = [
  { id: "kelola", label: "Kelola Kelas", short: "Kelola" },
  { id: "rapor", label: "Rapor Siswa", short: "Rapor" },
  { id: "pengumuman", label: "Pengumuman", short: "Info" },
];

export const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Halo Sisvara! Saya tertarik dengan sistem manajemen sekolah."
)}`;

export default function Navbar({ view, onNavigate }) {
  return (
    <>
      {/* Bar atas */}
      <header className="sticky top-0 z-30 border-b border-edge bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
          <button
            onClick={() => onNavigate("kelola")}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-ink">
              Sisvara<span className="text-accent">.</span>
            </span>
          </button>

          <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-1 rounded-full bg-canvas p-1 sm:flex">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => onNavigate(n.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    view === n.id
                      ? "bg-sky text-white shadow-sm"
                      : "text-mute hover:text-sky"
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </nav>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-full bg-accent-soft px-4 py-2 text-sm font-bold text-warn transition-colors hover:bg-accent hover:text-white md:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              62812-3456-7890
            </a>
          </div>
        </div>
      </header>

      {/* Tab bawah mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-edge bg-card/95 backdrop-blur sm:hidden">
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => onNavigate(n.id)}
            className={`flex-1 py-3 text-xs font-bold ${
              view === n.id ? "text-sky" : "text-mute"
            }`}
          >
            {n.short}
          </button>
        ))}
      </nav>
    </>
  );
}
