import { X } from "./icons/Icons";

export default function Locker({ onClose }) {
  return (
    <div className="fixed inset-0 z-[999]">
      <iframe
        src="https://bestapps1.online/cl/i/w6qv81"
        title="Locker"
        allow="fullscreen"
        className="w-full h-full border-0"
      />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white rounded-full p-2 transition-colors"
      >
        <X />
      </button>
    </div>
  );
}