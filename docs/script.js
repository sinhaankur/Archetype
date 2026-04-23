const QUESTIONS = [
  {
    id: 1,
    trait: "Ind",
    text: "I prefer to rely on my own judgment rather than following the crowd.",
  },
  {
    id: 2,
    trait: "Emp",
    text: "I am deeply attuned to the emotions and needs of those around me.",
  },
  {
    id: 3,
    trait: "Wis",
    text: "I spend a lot of time reflecting on life's deeper meanings and seeking truth.",
  },
  {
    id: 4,
    trait: "Skl",
    text: "I take great pride in mastering technical crafts or specific disciplines.",
  },
  {
    id: 5,
    trait: "Cre",
    text: "I feel a constant need to build, innovate, or express myself artistically.",
  },
  {
    id: 6,
    trait: "Ind",
    text: "I am comfortable being the lone wolf if it means staying true to my mission.",
  },
  {
    id: 7,
    trait: "Emp",
    text: "Helping and nurturing others gives me my greatest sense of purpose.",
  },
  {
    id: 8,
    trait: "Wis",
    text: "People often come to me for objective advice or a big picture perspective.",
  },
  {
    id: 9,
    trait: "Skl",
    text: "I am highly disciplined when it comes to training and physical or mental execution.",
  },
  {
    id: 10,
    trait: "Cre",
    text: "I often imagine entirely new ways something could look, work, or be expressed.",
  },
]

// All weight rows are normalized to sum exactly to 1.00 so every archetype
// competes on the same scale. Previously The Rebel summed to 1.24 and always won.
const ARCHETYPES = {
  "The King":      { Ind: 0.39, Wis: 0.35, Emp: 0.14, Skl: 0.03, Cre: 0.09 }, // sum=1.00
  "The Father":    { Wis: 0.50, Emp: 0.30, Ind: 0.10, Skl: 0.05, Cre: 0.05 }, // sum=1.00
  "The Warrior":   { Ind: 0.30, Skl: 0.25, Wis: 0.23, Cre: 0.19, Emp: 0.03 }, // sum=1.00
  "The Magician":  { Emp: 0.52, Cre: 0.20, Skl: 0.16, Ind: 0.08, Wis: 0.04 }, // sum=1.00
  "The Lover":     { Emp: 0.42, Wis: 0.32, Ind: 0.12, Skl: 0.10, Cre: 0.04 }, // sum=1.00
  "The Sage":      { Wis: 0.44, Cre: 0.19, Emp: 0.18, Ind: 0.11, Skl: 0.08 }, // sum=1.00
  "The Explorer":  { Ind: 0.59, Cre: 0.12, Skl: 0.12, Wis: 0.11, Emp: 0.06 }, // sum=1.00
  "The Creator":   { Cre: 0.51, Wis: 0.19, Ind: 0.14, Skl: 0.13, Emp: 0.03 }, // sum=1.00
  "The Hero":      { Wis: 0.43, Ind: 0.36, Emp: 0.13, Skl: 0.06, Cre: 0.02 }, // sum=1.00
  "The Rebel":     { Ind: 0.52, Cre: 0.22, Emp: 0.12, Wis: 0.10, Skl: 0.04 }, // sum=1.00
  "The Jester":    { Cre: 0.60, Skl: 0.12, Ind: 0.11, Wis: 0.10, Emp: 0.07 }, // sum=1.00
  "The Caregiver": { Emp: 0.48, Skl: 0.21, Wis: 0.16, Ind: 0.11, Cre: 0.04 }, // sum=1.00
}

const TRAIT_LABELS = {
  Ind: "Independence",
  Emp: "Empathy",
  Wis: "Wisdom",
  Skl: "Skills",
  Cre: "Creativity",
}

const TRAIT_CLASSES = {
  Ind: "trait-ind",
  Emp: "trait-emp",
  Wis: "trait-wis",
  Skl: "trait-skl",
  Cre: "trait-cre",
}

const SCALE_LABELS = {
  1: "Strongly Disagree",
  2: "Disagree",
  3: "Neutral",
  4: "Agree",
  5: "Strongly Agree",
}

const ARCHETYPE_DESCRIPTIONS = {
  "The King": "Strategic, steady, and motivated by order, responsibility, and long-range vision.",
  "The Father": "Protective, wise, and driven to guide others with care and grounded judgment.",
  "The Warrior": "Action-oriented, disciplined, and willing to push through resistance to win.",
  "The Magician": "Insightful, perceptive, and drawn to transformation, pattern, and hidden meaning.",
  "The Lover": "Passionate, devoted, and motivated by connection, feeling, and depth of experience.",
  "The Sage": "Reflective, truth-seeking, and naturally oriented toward perspective and understanding.",
  "The Explorer": "Independent, self-directed, and energized by freedom, challenge, and discovery.",
  "The Creator": "Inventive, expressive, and driven to shape something original and meaningful.",
  "The Hero": "Courageous, dutiful, and motivated to rise to challenges with purpose.",
  "The Rebel": "Defiant, autonomous, and willing to reject convention in service of authenticity.",
  "The Jester": "Playful, unconventional, and energized by humor, novelty, and creative disruption.",
  "The Caregiver": "Compassionate, dependable, and most fulfilled when supporting and protecting others.",
}

const STORAGE_KEY = "archetype-pages-v2" // bumped from v1 to bust stale cached answers

// ─── DOM refs ────────────────────────────────────────────────────────────────
const form             = document.querySelector("#archetype-form")
const questionTemplate = document.querySelector("#question-template")
const ratingTemplate   = document.querySelector("#rating-template")
const calculateButton  = document.querySelector("#calculate-button")
const resetButton      = document.querySelector("#reset-button")
const answerAgainButton= document.querySelector("#answer-again-button")
const copySummaryButton  = document.querySelector("#copy-summary-button")
const shareXButton       = document.querySelector("#share-x-button")
const shareLinkedinButton= document.querySelector("#share-linkedin-button")
const shareWaButton      = document.querySelector("#share-wa-button")
const resultCard       = document.querySelector("#result-card")
const answeredCount    = document.querySelector("#answered-count")
const progressFill     = document.querySelector("#progress-fill")
const progressCopy     = document.querySelector("#progress-copy")
const topName          = document.querySelector("#top-name")
const topDescription   = document.querySelector("#top-description")
const topScore         = document.querySelector("#top-score")
const traitBreakdown   = document.querySelector("#trait-breakdown")
const rankingList      = document.querySelector("#ranking-list")
const summaryText      = document.querySelector("#summary-text")

// ─── Floating progress pill ──────────────────────────────────────────────────
const floatPill = document.createElement("div")
floatPill.className = "floating-progress"
floatPill.innerHTML = `<span id="float-count">0</span>/<span id="float-total">10</span>\u00a0answered <div class="floating-progress-fill"><span id="float-bar"></span></div>`
document.body.appendChild(floatPill)
const floatCount = document.querySelector("#float-count")
const floatTotal = document.querySelector("#float-total")
const floatBar   = document.querySelector("#float-bar")

// ─── Confetti ────────────────────────────────────────────────────────────────
const confettiCanvas    = document.createElement("canvas")
confettiCanvas.id       = "confetti-canvas"
document.body.appendChild(confettiCanvas)
const confettiCtx       = confettiCanvas.getContext("2d")
let   confettiParticles = []
let   confettiRaf       = null

function launchConfetti() {
  confettiCanvas.width  = window.innerWidth
  confettiCanvas.height = window.innerHeight
  const colors = ["#E8182A", "#F5C800", "#1A5FD4", "#111", "#fff"]
  confettiParticles = Array.from({ length: 120 }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: -10 - Math.random() * 60,
    w: 8 + Math.random() * 8,
    h: 4 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * Math.PI * 2,
    vx: -2 + Math.random() * 4,
    vy: 3 + Math.random() * 5,
    vr: -0.08 + Math.random() * 0.16,
    life: 1,
    decay: 0.008 + Math.random() * 0.006,
  }))
  if (confettiRaf) cancelAnimationFrame(confettiRaf)
  tickConfetti()
}

function tickConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height)
  confettiParticles.forEach((p) => {
    p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.rotation += p.vr; p.life -= p.decay
    confettiCtx.save()
    confettiCtx.globalAlpha = Math.max(0, p.life)
    confettiCtx.translate(p.x, p.y)
    confettiCtx.rotate(p.rotation)
    confettiCtx.fillStyle = p.color
    confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
    confettiCtx.restore()
  })
  confettiParticles = confettiParticles.filter((p) => p.life > 0)
  if (confettiParticles.length) confettiRaf = requestAnimationFrame(tickConfetti)
}

let answers = loadAnswers()

// Remove loading guard after first frame
requestAnimationFrame(() => document.body.classList.remove("js-loading"))

renderQuestions()
updateProgress()

calculateButton.addEventListener("click", () => {
  const missingQuestion = QUESTIONS.find((question) => typeof answers[question.id] !== "number")

  if (missingQuestion) {
    const el = document.querySelector(`[data-question-id="${missingQuestion.id}"]`)
    el?.scrollIntoView({ behavior: "smooth", block: "center" })
    if (el) {
      el.style.animation = "none"
      requestAnimationFrame(() => { el.style.animation = "shake 320ms ease" })
    }
    return
  }

  const averages = calculateAverages(answers)
  const ranking  = rankArchetypes(averages)
  renderResults(averages, ranking)
})

resetButton.addEventListener("click", doReset)

if (answerAgainButton) {
  answerAgainButton.addEventListener("click", () => {
    resultCard.classList.remove("is-visible")
    resultCard.classList.add("is-hidden")
    document.querySelector("#assessment")?.scrollIntoView({ behavior: "smooth", block: "start" })
    doReset()
  })
}

function doReset() {
  answers = {}
  persistState()
  renderQuestions()
  updateProgress()
  resultCard.classList.remove("is-visible")
  resultCard.classList.add("is-hidden")
}

copySummaryButton.addEventListener("click", async () => {
  const text = summaryText.textContent || ""

  if (!text) {
    return
  }

  try {
    await navigator.clipboard.writeText(text)
    copySummaryButton.textContent = "Copied"
    window.setTimeout(() => {
      copySummaryButton.textContent = "Copy text"
    }, 1400)
  } catch {
    copySummaryButton.textContent = "Copy failed"
    window.setTimeout(() => {
      copySummaryButton.textContent = "Copy text"
    }, 1400)
  }
})

function buildShareText() {
  const name  = topName.textContent || "an archetype"
  const score = topScore.textContent || ""
  const site  = "https://sinhaankur.github.io/Archetype/"
  return `I just took the Archetype Assessment and my primary match is ${name} (score: ${score}). Find yours → ${site}`
}

shareXButton.addEventListener("click", () => {
  const url = "https://x.com/intent/tweet?text=" + encodeURIComponent(buildShareText())
  window.open(url, "_blank", "noopener,noreferrer")
})

shareLinkedinButton.addEventListener("click", () => {
  const site = "https://sinhaankur.github.io/Archetype/"
  const url  = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(site)
  window.open(url, "_blank", "noopener,noreferrer")
})

shareWaButton.addEventListener("click", () => {
  const url = "https://wa.me/?text=" + encodeURIComponent(buildShareText())
  window.open(url, "_blank", "noopener,noreferrer")
})

let _rendering = false

function renderQuestions() {
  if (_rendering) return
  _rendering = true
  form.innerHTML = ""

  QUESTIONS.forEach((question, idx) => {
    const fragment = questionTemplate.content.cloneNode(true)
    const fieldset = fragment.querySelector("fieldset")
    const traitPill = fragment.querySelector(".trait-pill")
    const status = fragment.querySelector(".question-status")
    const legend = fragment.querySelector(".question-text")
    const ratingGrid = fragment.querySelector(".rating-grid")
    const selectedValue = answers[question.id]

    fieldset.dataset.questionId = String(question.id)
    fieldset.style.setProperty("--i", idx)
    if (selectedValue) fieldset.classList.add("is-answered")
    traitPill.textContent = TRAIT_LABELS[question.trait]
    traitPill.classList.add(TRAIT_CLASSES[question.trait])
    status.textContent = selectedValue ? `Selected: ${selectedValue} / 5` : "Not answered"
    legend.textContent = `${question.id}. ${question.text}`

    for (let rating = 1; rating <= 5; rating += 1) {
      const ratingFragment = ratingTemplate.content.cloneNode(true)
      const label = ratingFragment.querySelector("label")
      const input = ratingFragment.querySelector("input")
      const valueNode = ratingFragment.querySelector(".rating-value")
      const labelNode = ratingFragment.querySelector(".rating-label")

      input.type = "radio"
      input.name = `question-${question.id}`
      input.value = String(rating)
      input.checked = selectedValue === rating
      input.addEventListener("change", () => {
        answers[question.id] = rating
        persistState()
        renderQuestions()
        updateProgress()
        resultCard.classList.remove("is-visible")
        resultCard.classList.add("is-hidden")
      })

      valueNode.textContent = String(rating)
      labelNode.textContent = SCALE_LABELS[rating]
      label.title = SCALE_LABELS[rating]
      ratingGrid.appendChild(ratingFragment)
    }

    form.appendChild(fragment)
  })
  _rendering = false
}

function updateProgress() {
  const count   = QUESTIONS.filter((q) => typeof answers[q.id] === "number").length
  const percent = Math.round((count / QUESTIONS.length) * 100)

  answeredCount.textContent = String(count)
  progressFill.style.width  = `${percent}%`

  floatCount.textContent = String(count)
  floatTotal.textContent = String(QUESTIONS.length)
  floatBar.style.width   = `${percent}%`
  if (count > 0 && count < QUESTIONS.length) {
    floatPill.classList.add("is-visible")
  } else {
    floatPill.classList.remove("is-visible")
  }

  if (count === QUESTIONS.length) {
    progressCopy.textContent = "All answers are in. Calculate your ranked result below."
    return
  }

  if (count === 0) {
    progressCopy.textContent = "Answer the statements below to unlock your result."
    return
  }

  progressCopy.textContent = `${QUESTIONS.length - count} question${QUESTIONS.length - count === 1 ? "" : "s"} left.`
}

function calculateAverages(currentAnswers) {
  const grouped = {
    Ind: [],
    Emp: [],
    Wis: [],
    Skl: [],
    Cre: [],
  }

  for (const question of QUESTIONS) {
    grouped[question.trait].push(currentAnswers[question.id])
  }

  return {
    Ind: average(grouped.Ind),
    Emp: average(grouped.Emp),
    Wis: average(grouped.Wis),
    Skl: average(grouped.Skl),
    Cre: average(grouped.Cre),
  }
}

function rankArchetypes(averages) {
  return Object.entries(ARCHETYPES)
    .map(([name, weights]) => {
      const score =
        averages.Ind * weights.Ind +
        averages.Emp * weights.Emp +
        averages.Wis * weights.Wis +
        averages.Skl * weights.Skl +
        averages.Cre * weights.Cre

      return {
        name,
        score: Number(score.toFixed(2)),
      }
    })
    .sort((left, right) => right.score - left.score)
}

function renderResults(averages, ranking) {
  const top = ranking[0]
  const strongestTraits = Object.entries(averages).sort((left, right) => right[1] - left[1])

  topName.textContent = top.name
  topDescription.textContent = ARCHETYPE_DESCRIPTIONS[top.name]
  topScore.textContent = top.score.toFixed(2)
  traitBreakdown.innerHTML = ""
  rankingList.innerHTML = ""

  strongestTraits.forEach(([trait, score]) => {
    const wrapper = document.createElement("article")
    wrapper.className = "trait-row"

    const normalized = Math.round((score / 5) * 100)
    wrapper.innerHTML = `
      <div class="trait-row-header">
        <span class="trait-pill ${TRAIT_CLASSES[trait]}">${TRAIT_LABELS[trait]}</span>
        <strong>${score.toFixed(2)} / 5</strong>
      </div>
      <div class="mini-progress" aria-hidden="true">
        <div class="mini-progress-fill" style="width:${normalized}%"></div>
      </div>
    `
    traitBreakdown.appendChild(wrapper)
  })

  ranking.slice(0, 5).forEach((item, index) => {
    const wrapper = document.createElement("article")
    wrapper.className = "ranking-row"
    wrapper.innerHTML = `
      <div class="ranking-row-header">
        <strong>${index + 1}. ${item.name}</strong>
        <span>${item.score.toFixed(2)}</span>
      </div>
      <p>${ARCHETYPE_DESCRIPTIONS[item.name]}</p>
    `
    rankingList.appendChild(wrapper)
  })

  const topTraitsText = strongestTraits
    .slice(0, 2)
    .map(([trait]) => TRAIT_LABELS[trait])
    .join(" and ")

  summaryText.textContent = `Your dominant result is ${top.name} with a match strength of ${top.score.toFixed(2)}. Your strongest expressed traits are ${topTraitsText}. ${ARCHETYPE_DESCRIPTIONS[top.name]}`

  resultCard.classList.remove("is-hidden")
  requestAnimationFrame(() => resultCard.classList.add("is-visible"))
  resultCard.scrollIntoView({ behavior: "smooth", block: "start" })

  // stagger mini-bar fills after reveal
  document.querySelectorAll(".mini-progress-fill").forEach((bar, i) => {
    const target = bar.style.width
    bar.style.width = "0%"
    setTimeout(() => { bar.style.width = target }, 80 + i * 90)
  })

  document.querySelectorAll(".trait-row, .ranking-row").forEach((row, i) => {
    row.style.setProperty("--i", i)
  })

  launchConfetti()
}

function average(values) {
  return Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(2))
}

function loadAnswers() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}")
  } catch {
    return {}
  }
}

function persistState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
}