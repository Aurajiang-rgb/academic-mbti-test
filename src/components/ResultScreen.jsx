import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { RESULT_MAP } from '../data/results.js'

function pctPair(a, b) {
  const t = a + b
  if (t <= 0) return 50
  return Math.round((a / t) * 100)
}

function ScoreAxis({ leftLabel, rightLabel, left, right, variant }) {
  const leftPct = pctPair(left, right)

  const labelRight =
    variant === 'sc' ? 'text-rose-300' : variant === 'pi' ? 'text-zinc-200' : 'text-zinc-200'

  const fillLeft =
    variant === 'sc'
      ? 'bg-emerald-400/75'
      : variant === 'pi'
        ? 'bg-emerald-400/55'
        : 'bg-emerald-400/55'

  const fillRight =
    variant === 'sc' ? 'bg-rose-500/35' : variant === 'pi' ? 'bg-white/10' : 'bg-white/10'

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[11px] text-zinc-400 text-center">
        <span className="text-emerald-300">{leftLabel}</span>
        <span className={labelRight}>{rightLabel}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full border border-white/10 bg-black/40">
        <div className="flex h-full w-full">
          <div className={`h-full ${fillLeft}`} style={{ width: `${leftPct}%` }} />
          <div className={`h-full flex-1 ${fillRight}`} />
        </div>
      </div>
      <div className="flex items-center justify-between font-jetbrains text-[11px] text-zinc-500 text-center">
        <span>
          {leftLabel}: <span className="text-zinc-300 text-center">{left}</span>
        </span>
        <span>
          {rightLabel}: <span className="text-zinc-300 text-center">{right}</span>
        </span>
      </div>
    </div>
  )
}

async function waitForImages(root) {
  if (!root) return
  const imgs = Array.from(root.querySelectorAll('img'))
  await Promise.all(
    imgs.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve()
            return
          }
          img.addEventListener('load', () => resolve(), { once: true })
          img.addEventListener('error', () => resolve(), { once: true })
        }),
    ),
  )
  await Promise.all(
    imgs.map((img) => (img.decode ? img.decode().catch(() => {}) : Promise.resolve())),
  )
}

function isMobilePosterUi() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 768px)').matches
}

/** 仅包含「海报需要出镜」的内容：大标题、角色图、MBTI、匹配度、标签、描述 — html2canvas 只截这一层 */
const PosterExportSurface = forwardRef(function PosterExportSurface(
  { profileKey, profile },
  ref,
) {
  return (
    <div
      ref={ref}
      // 👇 这里的背景已经改成了高级深蓝灰渐变
      className="relative box-border w-full max-w-[420px] overflow-hidden rounded-[28px] border border-emerald-400/25 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 p-8 pb-9 shadow-neonLg"
    >
      <div className="pointer-events-none absolute inset-0 bg-cyberGrid bg-cyberGridSize opacity-[0.35]" />
      <div className="pointer-events-none absolute inset-0 cyber-noise opacity-[0.35]" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
        aria-hidden
      />

      <div className="relative flex flex-col gap-7">
        <div className="flex items-start justify-between gap-4">
          <div className="font-jetbrains text-[10px] font-semibold tracking-[0.35em] text-emerald-300/75 text-center">
            CYBER_RESULT
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-center backdrop-blur-sm">
            <div className="font-jetbrains text-[9px] uppercase tracking-wider text-zinc-500 text-center">Key</div>
            <div className="font-jetbrains text-xs font-bold text-emerald-200 text-center">{profileKey}</div>
          </div>
        </div>

        <div className="space-y-5">
          <h2 className="text-center font-orbitron text-[26px] font-black leading-tight tracking-tight text-white md:text-[28px]">
            {profile.title}
          </h2>

          <div className="flex justify-center px-1">
            <img
              src={profile.image}
              alt=""
              crossOrigin="anonymous"
              decoding="async"
              draggable={false}
              className="animate-fade-in-up h-48 max-h-64 w-auto max-w-full object-contain object-center drop-shadow-[0_12px_36px_rgba(34,197,94,0.22)]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="rounded-full border border-emerald-400/35 bg-emerald-400/10 px-4 py-2 font-jetbrains text-[13px] font-bold tracking-wide text-emerald-100 shadow-[0_0_20px_rgba(52,211,153,0.12)]">
              MBTI · {profile.mbti}
            </div>
            <div className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 font-jetbrains text-[13px] font-semibold text-zinc-100 text-center">
              匹配度 · {profile.match}%
            </div>
          </div>
        </div>

        {/* 👇 扎心标签方框：加入 Flexbox 绝对居中 */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] pt-5 pb-7 px-6 backdrop-blur-sm sm:px-8 w-full">
          <p className="m-0 w-full text-center text-[15px] leading-normal text-zinc-50">{profile.tags}</p>
        </div>

        {/* 👇 人物描述方框：加入 Flexbox 绝对居中 */}
        <div className="rounded-2xl border border-rose-500/25 bg-rose-500/[0.07] pt-5 pb-7 px-6 backdrop-blur-sm sm:px-8 w-full">
          <p className="m-0 w-full text-center text-[15px] leading-normal text-zinc-100 antialiased">{profile.desc}</p>
        </div>

        <div className="border-t border-white/10 pt-5 text-center">
          <div className="font-jetbrains text-[10px] leading-relaxed text-zinc-500">
            科研发疯综合征确诊指南：测测你的「学术怨气值」  
          </div>
        </div>
      </div>
    </div>
  )
})

export function ResultScreen({ profileKey, scores, onRestart }) {
  const profile = RESULT_MAP[profileKey]
  const captureRef = useRef(null)
  const previewUrlRef = useRef(null)
  const [exporting, setExporting] = useState(false)
  const [posterPreviewUrl, setPosterPreviewUrl] = useState(null)

  const revokePreview = useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
      previewUrlRef.current = null
    }
    setPosterPreviewUrl(null)
  }, [])

  useEffect(() => {
    return () => revokePreview()
  }, [revokePreview])

  async function handleSavePoster() {
    const node = captureRef.current
    if (!node || !profile) return

    setExporting(true)
    try {
      revokePreview()

      await waitForImages(node)

      /** 海报文字清晰度：scale 最小为 2，避免 raster 后字形发糊、对齐观感变差 */
      const scale = Math.max(2, Math.min(3, (window.devicePixelRatio || 2) * 1.35))

      const canvas = await html2canvas(node, {
        backgroundColor: 'null',
        scale,
        useCORS: true,
        allowTaint: true,
        logging: false,
        imageTimeout: 20000,
        removeContainer: false,
      })

      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (!b) reject(new Error('EMPTY_BLOB'))
            else resolve(b)
          },
          'image/png',
          1,
        )
      })

      const filename = `学术怨气值测评_${profileKey}.png`

      const url = URL.createObjectURL(blob)
      previewUrlRef.current = url

      try {
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.rel = 'noopener'
        document.body.appendChild(a)
        a.click()
        a.remove()
      } catch {
        /* 部分 WebView 不支持程序化下载，交给预览浮层 */
      }

      if (isMobilePosterUi()) {
        setPosterPreviewUrl(url)
      }
    } catch {
      alert('海报导出失败：请尝试刷新后重试，或长按下方结果卡片截图。')
      revokePreview()
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <header className="flex items-center justify-between gap-3">
        <button
            type="button"
            disabled={exporting}
            onClick={handleSavePoster}
            className="shrink-0 rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-1.5 text-[11px] font-bold text-emerald-100 shadow-neon transition hover:border-emerald-300/70 hover:bg-emerald-400/15 disabled:opacity-50"
          >
            {exporting ? '正在合成海报…' : '保存海报 PNG（仅限电脑网页可保存）'}
            </button>
            <button
            type="button"
            onClick={onRestart}
            className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[11px] font-semibold text-zinc-200 transition hover:border-emerald-300/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/55"
          >
            再测一次
          </button>

           </header>

              {!profile ? (
        <div className="rounded-3xl border border-rose-500/25 bg-rose-500/10 p-4 text-sm text-rose-100">
          未匹配到预设画像（这在当前题库下理论上不该发生）。请截图反馈开发者。
        </div>
      ) : (
        <>
          <section className="space-y-4">
             <div className="flex justify-center">
              <PosterExportSurface ref={captureRef} profileKey={profileKey} profile={profile} />
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-black/25 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white">维度雷达 </div>
              <div className="font-jetbrains text-[11px] text-zinc-500 text-center"> </div>
            </div>

            <div className="mt-5 space-y-5">
              <ScoreAxis
                leftLabel="稳定 S"
                rightLabel="发疯 C"
                left={scores.S}
                right={scores.C}
                variant="sc"
              />
              <ScoreAxis
                leftLabel="红人 P"
                rightLabel="透明 I"
                left={scores.P}
                right={scores.I}
                variant="pi"
              />
              <ScoreAxis
                leftLabel="出片 Pr"
                rightLabel="摸鱼 Sl"
                left={scores.Pr}
                right={scores.Sl}
                variant="prsl"
              />
            </div>
          </section>
        </>
      )}

      {posterPreviewUrl ? (
        <div
          className="fixed inset-0 z-[100] flex flex-col justify-end bg-black/88 p-4 backdrop-blur-md sm:justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="海报预览，长按保存"
        >
          <div className="mx-auto w-full max-w-md rounded-3xl border border-emerald-400/25 bg-zinc-950/95 p-5 shadow-neonLg">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-jetbrains text-[10px] font-semibold tracking-[0.25em] text-emerald-300/80 text-center">
                  PREVIEW
                </div>
                <div className="mt-1 text-sm font-semibold text-white">长按图片保存到相册</div>
              </div>
              <button
                type="button"
                onClick={revokePreview}
                className="rounded-xl border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold text-zinc-200 hover:border-emerald-400/35 hover:text-white"
              >
                关闭
              </button>
            </div>
            <div className="mt-4 flex max-h-[min(72vh,640px)] justify-center overflow-auto rounded-2xl border border-white/10 bg-black/40 p-3">
              <img
                src={posterPreviewUrl}
                alt="海报预览，长按保存到相册"
                className="max-h-[min(68vh,600px)] w-auto max-w-full rounded-xl object-contain"
              />
            </div>
            <p className="mt-3 text-center text-[11px] text-zinc-500">
              若长按无菜单，可在系统相册中查看已下载的 PNG。
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
