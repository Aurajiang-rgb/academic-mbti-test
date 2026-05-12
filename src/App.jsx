import { useEffect, useMemo, useRef, useState } from 'react'
import { CyberShell } from './components/CyberShell.jsx'
import { LandingScreen } from './components/LandingScreen.jsx'
import { QuizScreen } from './components/QuizScreen.jsx'
import { ResultScreen } from './components/ResultScreen.jsx'
import { QUESTIONS } from './data/quiz.js'
import { addScores, computeProfileKey, createEmptyScores } from './utils/scoring.js'

const SELECT_FEEDBACK_MS = 450
const PANEL_FADE_MS = 300

export default function App() {
  const total = QUESTIONS.length

  const [screen, setScreen] = useState('landing')
  const [scores, setScores] = useState(() => createEmptyScores())
  const [currentIndex, setCurrentIndex] = useState(0)
  /** idle | out | in-prep | in — in-prep 用于新一题首帧隐藏，再切入 in 做淡入 */
  const [transition, setTransition] = useState('idle')
  const [busy, setBusy] = useState(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null)

  const timersRef = useRef(new Set())
  const scoresRef = useRef(scores)
  const indexRef = useRef(currentIndex)

  scoresRef.current = scores
  indexRef.current = currentIndex

  const profileKey = useMemo(() => computeProfileKey(scores), [scores])

  useEffect(() => {
    return () => {
      for (const id of timersRef.current) window.clearTimeout(id)
      timersRef.current.clear()
    }
  }, [])

  function queueTimeout(fn, ms) {
    const id = window.setTimeout(() => {
      timersRef.current.delete(id)
      fn()
    }, ms)
    timersRef.current.add(id)
    return id
  }

  function startQuiz() {
    for (const id of timersRef.current) window.clearTimeout(id)
    timersRef.current.clear()

    const empty = createEmptyScores()
    setScores(empty)
    scoresRef.current = empty
    setCurrentIndex(0)
    indexRef.current = 0
    setTransition('idle')
    setBusy(false)
    setSelectedOptionIndex(null)
    setScreen('quiz')
  }

  function restartQuiz() {
    startQuiz()
  }

  function finishQuiz(nextScores) {
    setScores(nextScores)
    scoresRef.current = nextScores
    setBusy(false)
    setTransition('idle')
    setSelectedOptionIndex(null)
    setScreen('result')
  }

  function handlePick(option, optionIndex) {
    if (busy) return

    setBusy(true)
    setSelectedOptionIndex(optionIndex)

    queueTimeout(() => {
      setSelectedOptionIndex(null)
      setTransition('out')

      queueTimeout(() => {
        const nextScores = addScores(scoresRef.current, option.scores)
        scoresRef.current = nextScores
        setScores(nextScores)

        const idx = indexRef.current
        const isLast = idx >= total - 1

        if (isLast) {
          finishQuiz(nextScores)
          return
        }

        const nextIdx = idx + 1
        indexRef.current = nextIdx
        setCurrentIndex(nextIdx)

        setTransition('in-prep')
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTransition('in')
            queueTimeout(() => {
              setTransition('idle')
              setBusy(false)
            }, PANEL_FADE_MS)
          })
        })
      }, PANEL_FADE_MS)
    }, SELECT_FEEDBACK_MS)
  }

  const question = QUESTIONS[currentIndex]

  return (
    <CyberShell>
      {screen === 'landing' ? <LandingScreen onStart={startQuiz} /> : null}

      {screen === 'quiz' && question ? (
        <QuizScreen
          question={question}
          index={currentIndex}
          total={total}
          busy={busy}
          transition={transition}
          selectedOptionIndex={selectedOptionIndex}
          onPick={handlePick}
        />
      ) : null}

      {screen === 'result' ? (
        <ResultScreen profileKey={profileKey} scores={scores} onRestart={restartQuiz} />
      ) : null}
    </CyberShell>
  )
}
