export function RoomFallback({
  message,
}: {
  message: string;
}) {
  return (
    <div className="flex h-full min-h-[420px] flex-col justify-between bg-room p-6 sm:p-8">
      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-muted">Flat view</p>
        <p className="mt-3 max-w-md text-base leading-7 text-ink/80">{message}</p>
      </div>
      <svg
        viewBox="0 0 640 360"
        role="img"
        aria-label="A simple drawing of a study with a desk, a shelf, and a window."
        className="mt-6 h-auto w-full"
      >
        <rect x="24" y="28" width="592" height="304" rx="18" fill="#f7f1e6" />
        <rect x="24" y="250" width="592" height="82" fill="#c4a484" />
        <rect x="250" y="58" width="150" height="110" rx="4" fill="#d7ebf1" />
        <rect x="248" y="56" width="154" height="114" fill="none" stroke="#f7f4ee" strokeWidth="10" />
        <path d="M325 56 V170 M248 112 H402" stroke="#f7f4ee" strokeWidth="6" />
        <rect x="78" y="196" width="150" height="14" rx="2" fill="#6f4e37" />
        <rect x="92" y="210" width="10" height="52" fill="#4a3428" />
        <rect x="204" y="210" width="10" height="52" fill="#4a3428" />
        <rect x="168" y="168" width="8" height="28" fill="#2b241d" />
        <path d="M156 168 h32 l-4 16 h-24 z" fill="#f4efe4" />
        <rect x="430" y="150" width="16" height="112" fill="#8d6a4a" />
        <rect x="520" y="150" width="16" height="112" fill="#8d6a4a" />
        <rect x="430" y="168" width="106" height="8" fill="#6f4e37" />
        <rect x="430" y="214" width="106" height="8" fill="#6f4e37" />
        <rect x="430" y="252" width="106" height="8" fill="#6f4e37" />
        <rect x="452" y="176" width="10" height="34" fill="#7f1d1d" />
        <rect x="466" y="184" width="10" height="26" fill="#1e3a4c" />
        <rect x="480" y="172" width="12" height="38" fill="#3f6212" />
      </svg>
    </div>
  );
}
