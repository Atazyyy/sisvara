import { initials } from "../utils/format";

// Avatar inisial dari nama
export function Avatar({ name, size = "h-8 w-8 text-xs" }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-sky font-bold text-white ${size}`}
    >
      {initials(name)}
    </div>
  );
}

// Badge jenis kelamin: L / P
export function JkBadge({ jk }) {
  return jk === "L" ? (
    <span
      title="Laki-laki"
      className="rounded-full bg-sky-soft px-2 py-0.5 text-[10px] font-bold text-sky-deep"
    >
      L
    </span>
  ) : (
    <span
      title="Perempuan"
      className="rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-bold text-pink-700"
    >
      P
    </span>
  );
}
