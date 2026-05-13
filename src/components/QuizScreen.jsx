export function QuizScreen({
  question,
  index,
  total,
  busy,
  transition,
  selectedOptionIndex,
  onPick,
}) {
  const pct = Math.round(((index + 1) / total) * 100)

  const panelClass =
    transition === 'out'
      ? 'pointer-events-none opacity-0 -translate-x-4 transition-all duration-300 ease-out'
      : transition === 'in-prep'
        ? 'pointer-events-none opacity-0 translate-x-4 transition-none'
        : transition === 'in'
          ? 'opacity-100 translate-x-0 transition-all duration-300 ease-out'
          : 'opacity-100 translate-x-0 transition-all duration-300 ease-out'

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-end justify-between gap-3">
        <div className="space-y-2">
          <div className="font-jetbrains text-[11px] font-semibold tracking-[0.35em] text-emerald-300/70">
            
          </div>
          <div className="text-lg font-semibold text-white">第 {index + 1} / {total} 题</div>
        </div>
              </div>

      <div className="space-y-2">
        <div className="h-2 w-full overflow-hidden rounded-full border border-white/10 bg-black/40">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-rose-500 transition-[width] duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-zinc-500">
          <span>进度</span>
          <span className="font-jetbrains text-zinc-400">{pct}%</span>
        </div>
      </div>

      <section
        className={[
          'relative flex-1 rounded-3xl border border-emerald-400/20 bg-white/[0.03] p-4 shadow-neon backdrop-blur will-change-transform',
          panelClass,
        ].join(' ')}
        aria-live="polite"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent" />
          <div className="absolute inset-0 animate-scan bg-gradient-to-b from-transparent via-emerald-400/10 to-transparent opacity-30" />
        </div>

        <div className="relative space-y-4">
          <div className="font-jetbrains text-[11px] text-zinc-400">
           </div>

          <h2 className="text-[17px] font-semibold leading-snug text-white">{question.text}</h2>

          <div className="flex w-full flex-col gap-4 pb-1">
            {question.options.map((opt, optIdx) => {
              const isSelected = selectedOptionIndex === optIdx
              const isDimmed =
                selectedOptionIndex !== null && selectedOptionIndex !== optIdx

              return (
                <button
                  key={`${question.id}-${optIdx}`}
                  type="button"
                  aria-disabled={busy}
                  tabIndex={busy ? -1 : 0}
                  onClick={() => {
                    if (busy) return
                    onPick(opt, optIdx)
                  }}
                  className={[
                    'flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left text-sm leading-relaxed transition-all duration-200 ease-out',
                    isSelected
                      ? 'border-green-500 bg-green-900/40 text-white shadow-[0_0_22px_rgba(34,197,94,0.35)] ring-2 ring-green-400/30'
                      : 'border-gray-700 bg-gray-800 text-zinc-100',
                    !isSelected &&
                      'hover:border-emerald-400/70 hover:bg-gray-700 hover:shadow-[0_0_18px_rgba(52,211,153,0.18)]',
                    !isSelected && 'active:border-emerald-400 active:bg-gray-700',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
                    isDimmed ? 'scale-[0.99] opacity-40' : '',
                    busy ? 'pointer-events-none' : '',
                    busy && selectedOptionIndex === null ? 'opacity-55' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <span
                    className={[
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border font-jetbrains text-[13px] font-bold tabular-nums transition-colors duration-200',
                      isSelected
                        ? 'border-green-400/80 bg-green-950/80 text-green-100'
                        : 'border-emerald-600/35 bg-gray-900 text-emerald-300',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span
                    className={[
                      'min-w-0 flex-1 text-left text-[15px] leading-snug transition-colors duration-200',
                      isSelected ? 'font-semibold text-white' : 'font-medium text-zinc-100',
                    ].join(' ')}
                  >
                    {opt.text}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <div className="text-center text-[11px] text-zinc-500">
        <span className="font-semibold text-zinc-300"></span>
        <span className="font-semibold text-zinc-300"></span>
      </div>
    </div>
  )
}
