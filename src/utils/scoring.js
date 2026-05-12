export function createEmptyScores() {
  return { S: 0, C: 0, P: 0, I: 0, Pr: 0, Sl: 0 }
}

export function addScores(base, delta) {
  const next = { ...base }
  for (const [k, v] of Object.entries(delta)) {
    next[k] = (next[k] ?? 0) + v
  }
  return next
}

export function computeProfileKey(scores) {
  const d1 = scores.C >= scores.S ? 'C' : 'S'
  const d2 = scores.I >= scores.P ? 'I' : 'P'
  const d3 = scores.Sl >= scores.Pr ? 'Sl' : 'Pr'
  return `${d1}${d2}${d3}`
}
