import { useEffect, useState } from "react";
import {
  KELAS,
  PENGUMUMAN_SEED,
  seededNilai,
  seededAbsenBase,
  initialAbsen,
} from "../data/seed";

const KEY = "sisvara-data-v1";

function fresh() {
  return {
    nilai: seededNilai(),
    absen: initialAbsen(),
    absenBase: seededAbsenBase(),
    pengumuman: PENGUMUMAN_SEED,
  };
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fresh();
    const d = JSON.parse(raw);
    if (!d || !d.nilai || !d.absen || !Array.isArray(d.pengumuman)) return fresh();
    return d;
  } catch {
    return fresh();
  }
}

// Seluruh state aplikasi (nilai, absensi, pengumuman) — tersimpan di localStorage.
export function useSisvaraData() {
  const [data, setData] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      // penyimpanan penuh / diblokir — abaikan, demo tetap jalan
    }
  }, [data]);

  const setNilai = (kelas, nis, mapel, raw) =>
    setData((d) => ({
      ...d,
      nilai: {
        ...d.nilai,
        [kelas]: {
          ...d.nilai[kelas],
          [nis]: { ...d.nilai[kelas]?.[nis], [mapel]: raw },
        },
      },
    }));

  const setAbsen = (kelas, nis, status) =>
    setData((d) => ({
      ...d,
      absen: {
        ...d.absen,
        [kelas]: { ...d.absen[kelas], [nis]: status },
      },
    }));

  const addPengumuman = (item) =>
    setData((d) => ({ ...d, pengumuman: [item, ...d.pengumuman] }));

  const removePengumuman = (id) =>
    setData((d) => ({
      ...d,
      pengumuman: d.pengumuman.filter((p) => p.id !== id),
    }));

  const reset = () => setData(fresh());

  return { data, setNilai, setAbsen, addPengumuman, removePengumuman, reset };
}
