import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Kelola from "./components/Kelola";
import Rapor from "./components/Rapor";
import Pengumuman from "./components/Pengumuman";
import { useSisvaraData } from "./hooks/useSisvaraData";

export default function App() {
  const {
    data,
    setNilai,
    setAbsen,
    addPengumuman,
    removePengumuman,
    reset,
  } = useSisvaraData();
  const [view, setView] = useState("kelola");

  const navigate = (v) => {
    setView(v);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas font-sans text-ink antialiased">
      <Navbar view={view} onNavigate={navigate} />
      <main className="flex-1 pb-16 sm:pb-0">
        <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">
          {view === "kelola" && (
            <Kelola data={data} setNilai={setNilai} setAbsen={setAbsen} />
          )}
          {view === "rapor" && <Rapor data={data} />}
          {view === "pengumuman" && (
            <Pengumuman
              data={data}
              addPengumuman={addPengumuman}
              removePengumuman={removePengumuman}
              reset={reset}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
