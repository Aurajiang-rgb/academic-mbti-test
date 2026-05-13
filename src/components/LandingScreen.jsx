export function LandingScreen({ onStart }) {
  return (
    <div className="flex flex-1 flex-col justify-between gap-10">
      <header className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div className="kbd-chip text-center">本测试仅供娱乐</div>
          <div className="text-[11px] font-semibold tracking-[0.35em] text-emerald-300/70">
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="font-orbitron text-[26px] font-black leading-[1.12] tracking-tight sm:text-[32px]">
            <span
              className="glitch-text animate-glitch text-white"
              data-text="科研发疯综合征确诊指南："
            >
              科研发疯综合征确诊指南：
            </span>
            <span className="mt-1 block bg-gradient-to-r from-emerald-300 via-white to-rose-400 bg-clip-text text-transparent">
              测测你的「学术人格」
            </span>
          </h1>

          <p className="text-sm leading-relaxed text-zinc-300/90">
            10 道题，测出你在实验室生态里的{' '}
            <span className="font-semibold text-emerald-300">三维人格坐标</span>
            ：稳定/发疯、红人/透明、出片/摸鱼。结果仅供参考，{' '}
            <span className="font-semibold text-rose-300">不构成医疗诊断</span>。
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-400/20 bg-white/[0.03] p-4 shadow-neon backdrop-blur">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-9 w-9 shrink-0 rounded-xl border border-emerald-400/25 bg-emerald-400/10" />
            <div className="space-y-2">
              <div className="text-xs font-semibold tracking-wide text-emerald-200/90">
                本测试将为你生成：
              </div>
              <ul className="space-y-2 text-xs leading-relaxed text-zinc-300/90">
                <li>
                  - 一份极其精准的
                  <span className="font-semibold text-white">「学术牛马」临床确诊报告</span>
                </li>
                <li>
                  - 适合深夜发朋友圈阴阳怪气的
                  <span className="font-semibold text-white">专属赛博海报</span>
                </li>
                <li>
                  - <span className="font-semibold text-white">认清现实，然后明天继续回组里搬砖</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-4">
        <button
          type="button"
          onClick={onStart}
          className="group relative w-full overflow-hidden rounded-2xl border border-emerald-400/35 bg-gradient-to-r from-emerald-400/15 via-white/5 to-rose-500/15 px-5 py-4 text-left shadow-neonLg transition hover:border-emerald-300/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
        >
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -left-24 top-0 h-full w-40 -skew-x-12 bg-emerald-400/25 blur-2xl transition group-hover:translate-x-10" />
            <div className="absolute -right-24 bottom-0 h-full w-40 skew-x-12 bg-rose-500/20 blur-2xl transition group-hover:-translate-x-10" />
          </div>

          <div className="relative flex items-center justify-between gap-4">
            <div>
              <div className="font-orbitron text-sm font-extrabold tracking-wide text-white">
                START TEST
              </div>
              <div className="mt-1 text-xs text-zinc-300/85">预计 2–3 分钟</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-jetbrains text-xs font-semibold text-emerald-200/90">
              {'>>>'}
            </div>
          </div>
        </button>

        <div className="text-center text-[11px] leading-relaxed text-zinc-500">
          提示：如果你的精神状态持续恶化，请寻求专业帮助（心理咨询/精神科）。
        </div>
      </div>
    </div>
  )
}
