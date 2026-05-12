export function CyberShell({ children }) {
  return (
    <div className="relative min-h-[100svh] overflow-x-hidden bg-black">
      <div
        className="pointer-events-none absolute inset-0 bg-cyberGrid bg-cyberGridSize opacity-[0.55]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 cyber-noise" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-rose-500/25 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-md flex-col px-4 pb-8 pt-10">
        {children}
      </div>
    </div>
  )
}
