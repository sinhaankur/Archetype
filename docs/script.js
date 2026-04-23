const STANDARD_QUESTIONS = [
  { id: 1, trait: "Ind", text: "I prefer to rely on my own judgment rather than following the crowd." },
  { id: 2, trait: "Emp", text: "I am deeply attuned to the emotions and needs of those around me." },
  { id: 3, trait: "Wis", text: "I spend a lot of time reflecting on life's deeper meanings and seeking truth." },
  { id: 4, trait: "Skl", text: "I take great pride in mastering technical crafts or specific disciplines." },
  { id: 5, trait: "Cre", text: "I feel a constant need to build, innovate, or express myself artistically." },
  { id: 6, trait: "Ind", text: "I am comfortable being the lone wolf if it means staying true to my mission." },
  { id: 7, trait: "Emp", text: "Helping and nurturing others gives me my greatest sense of purpose." },
  { id: 8, trait: "Wis", text: "People often come to me for objective advice or a big picture perspective." },
  { id: 9, trait: "Skl", text: "I am highly disciplined when it comes to training and physical or mental execution." },
  { id: 10, trait: "Cre", text: "I often imagine entirely new ways something could look, work, or be expressed." },
]

const DEEP_QUESTIONS = [
  { id: 11, trait: "Ind", text: "When facing hard choices, I trust my own compass even when others disagree." },
  { id: 12, trait: "Emp", text: "I naturally notice emotional shifts in a room and adjust to support people." },
  { id: 13, trait: "Wis", text: "I tend to connect events into patterns and extract larger lessons." },
  { id: 14, trait: "Skl", text: "I enjoy practicing one craft repeatedly until details become precise." },
  { id: 15, trait: "Cre", text: "I feel energized when I can redesign systems instead of following defaults." },
  { id: 16, trait: "Ind", text: "I prioritize autonomy and ownership over comfort or popularity." },
  { id: 17, trait: "Emp", text: "People often come to me because they feel emotionally safe around me." },
  { id: 18, trait: "Wis", text: "I make decisions by balancing short-term tradeoffs with long-term outcomes." },
  { id: 19, trait: "Skl", text: "I prefer deliberate training and execution over improvisation." },
  { id: 20, trait: "Cre", text: "I regularly produce original ideas for expression, products, or workflows." },
]

const DEEP_DIVE_QUESTIONS = [
  { id: 21, trait: "Ind", text: "Even when outcomes are uncertain, I still choose the path that preserves my autonomy." },
  { id: 22, trait: "Emp", text: "I can hold space for others without losing my own emotional center." },
  { id: 23, trait: "Wis", text: "I frequently revisit past decisions to extract principles I can apply to future situations." },
  { id: 24, trait: "Skl", text: "I create repeatable systems so my performance stays high even under pressure." },
  { id: 25, trait: "Cre", text: "I am willing to challenge successful formulas when I sense a better original approach." },
  { id: 26, trait: "Ind", text: "I can tolerate disapproval if it means remaining aligned with my deepest values." },
  { id: 27, trait: "Emp", text: "I actively adapt my communication style to meet people where they are emotionally." },
  { id: 28, trait: "Wis", text: "I naturally think in second-order effects before taking important action." },
  { id: 29, trait: "Skl", text: "I improve by measuring weak points deliberately rather than relying on motivation alone." },
  { id: 30, trait: "Cre", text: "I can turn abstract ideas into tangible outputs that others can actually use." },
]

const ARCHETYPES = {
  "The King":      { Ind: 0.39, Wis: 0.35, Emp: 0.14, Skl: 0.03, Cre: 0.09 },
  "The Father":    { Wis: 0.50, Emp: 0.30, Ind: 0.10, Skl: 0.05, Cre: 0.05 },
  "The Warrior":   { Ind: 0.30, Skl: 0.25, Wis: 0.23, Cre: 0.19, Emp: 0.03 },
  "The Magician":  { Emp: 0.52, Cre: 0.20, Skl: 0.16, Ind: 0.08, Wis: 0.04 },
  "The Lover":     { Emp: 0.42, Wis: 0.32, Ind: 0.12, Skl: 0.10, Cre: 0.04 },
  "The Sage":      { Wis: 0.44, Cre: 0.19, Emp: 0.18, Ind: 0.11, Skl: 0.08 },
  "The Explorer":  { Ind: 0.59, Cre: 0.12, Skl: 0.12, Wis: 0.11, Emp: 0.06 },
  "The Creator":   { Cre: 0.51, Wis: 0.19, Ind: 0.14, Skl: 0.13, Emp: 0.03 },
  "The Hero":      { Wis: 0.43, Ind: 0.36, Emp: 0.13, Skl: 0.06, Cre: 0.02 },
  "The Rebel":     { Ind: 0.52, Cre: 0.22, Emp: 0.12, Wis: 0.10, Skl: 0.04 },
  "The Jester":    { Cre: 0.60, Skl: 0.12, Ind: 0.11, Wis: 0.10, Emp: 0.07 },
  "The Caregiver": { Emp: 0.48, Skl: 0.21, Wis: 0.16, Ind: 0.11, Cre: 0.04 },
}

const FEMALE_NAMES = {
  "The King": "The Queen",
  "The Father": "The Mother",
  "The Warrior": "The Huntress",
  "The Magician": "The Sorceress",
  "The Lover": "The Enchantress",
  "The Sage": "The Oracle",
  "The Explorer": "The Wanderer",
  "The Creator": "The Weaver",
  "The Hero": "The Champion",
  "The Rebel": "The Wild One",
  "The Jester": "The Trickster",
  "The Caregiver": "The Nurturer",
}

const ARCHETYPE_DESCRIPTIONS = {
  "The King": "Strategic, steady, and motivated by order, responsibility, and long-range vision.",
  "The Queen": "Commanding, visionary, and driven by legacy, structure, and sovereign authority.",
  "The Father": "Protective, wise, and driven to guide others with care and grounded judgment.",
  "The Mother": "Nurturing, grounding, and devoted to protecting and cultivating those in her care.",
  "The Warrior": "Action-oriented, disciplined, and willing to push through resistance to win.",
  "The Huntress": "Precise, fierce, and relentless in pursuit of her chosen mission.",
  "The Magician": "Insightful, perceptive, and drawn to transformation, pattern, and hidden meaning.",
  "The Sorceress": "Transformative, intuitive, and drawn to the hidden forces that shape reality.",
  "The Lover": "Passionate, devoted, and motivated by connection, feeling, and depth of experience.",
  "The Enchantress": "Magnetic, deeply feeling, and driven by beauty, connection, and passionate devotion.",
  "The Sage": "Reflective, truth-seeking, and naturally oriented toward perspective and understanding.",
  "The Oracle": "Visionary, truth-telling, and gifted with deep perception and foresight.",
  "The Explorer": "Independent, self-directed, and energized by freedom, challenge, and discovery.",
  "The Wanderer": "Fiercely independent, driven by discovery, and unbound by convention.",
  "The Creator": "Inventive, expressive, and driven to shape something original and meaningful.",
  "The Weaver": "Imaginative and pattern-making, drawn to craft something enduring and meaningful.",
  "The Hero": "Courageous, dutiful, and motivated to rise to challenges with purpose.",
  "The Champion": "Bold, purposeful, and motivated to rise and protect with courage.",
  "The Rebel": "Defiant, autonomous, and willing to reject convention in service of authenticity.",
  "The Wild One": "Untamed, authentic, and willing to burn systems that no longer serve truth.",
  "The Jester": "Playful, unconventional, and energized by humor, novelty, and creative disruption.",
  "The Trickster": "Shape-shifting, playful, and gifted at disrupting the expected with wit.",
  "The Caregiver": "Compassionate, dependable, and most fulfilled when supporting and protecting others.",
  "The Nurturer": "Fiercely devoted, emotionally present, and most alive when others flourish.",
}

const TRAIT_LABELS = { Ind: "Independence", Emp: "Empathy", Wis: "Wisdom", Skl: "Skills", Cre: "Creativity" }
const TRAIT_CLASSES = { Ind: "trait-ind", Emp: "trait-emp", Wis: "trait-wis", Skl: "trait-skl", Cre: "trait-cre" }
const SCALE_LABELS = { 1: "Strongly Disagree", 2: "Disagree", 3: "Neutral", 4: "Agree", 5: "Strongly Agree" }
const STORAGE_KEY = "archetype-pages-v3"

const form = document.querySelector("#archetype-form")
const questionTemplate = document.querySelector("#question-template")
const ratingTemplate = document.querySelector("#rating-template")
const calculateButton = document.querySelector("#calculate-button")
const resetButton = document.querySelector("#reset-button")
const answerAgainButton = document.querySelector("#answer-again-button")
const copySummaryButton = document.querySelector("#copy-summary-button")
const shareXButton = document.querySelector("#share-x-button")
const shareLinkedinButton = document.querySelector("#share-linkedin-button")
const shareWaButton = document.querySelector("#share-wa-button")
const resultCard = document.querySelector("#result-card")
const answeredCount = document.querySelector("#answered-count")
const totalCount = document.querySelector("#total-count")
const heroQCount = document.querySelector("#hero-q-count")
const progressFill = document.querySelector("#progress-fill")
const progressCopy = document.querySelector("#progress-copy")
const topName = document.querySelector("#top-name")
const topDescription = document.querySelector("#top-description")
const topScore = document.querySelector("#top-score")
const traitBreakdown = document.querySelector("#trait-breakdown")
const rankingList = document.querySelector("#ranking-list")
const summaryText = document.querySelector("#summary-text")
const seeHowItWorksButton = document.querySelector('a[href="#method"]')

const floatPill = document.createElement("div")
floatPill.className = "floating-progress"
floatPill.innerHTML = '<span id="float-count">0</span>/<span id="float-total">10</span>&nbsp;answered <div class="floating-progress-fill"><span id="float-bar"></span></div>'
document.body.appendChild(floatPill)
const floatCount = document.querySelector("#float-count")
const floatTotal = document.querySelector("#float-total")
const floatBar = document.querySelector("#float-bar")

const confettiCanvas = document.createElement("canvas")
confettiCanvas.id = "confetti-canvas"
document.body.appendChild(confettiCanvas)
const confettiCtx = confettiCanvas.getContext("2d")
let confettiParticles = []
let confettiRaf = null

let state = loadState()
let answers = state.answers || {}
let gender = state.gender || "male"
let mode = state.mode || "standard"
let rendering = false
let recentlyAnsweredQuestionId = null
let motionObserver = null
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
const MOBILE_BREAKPOINT = 720
let hasPlayedTapWelcome = false
let pulseTimeoutId = null
let mobileQuestionIndex = 0
const ANALYTICS_NAMESPACE = "archetype-gh-pages-sinhaankur"
const UNIQUE_USER_KEY = "archetype-unique-user-v1"

requestAnimationFrame(() => document.body.classList.remove("js-loading"))
initConfigControls()
updateQuestionCountUI()
renderQuestions()
updateProgress()
initFramerUX()
initWelcomeAnimation()
initDelightInteractions()
initMobilePagingSync()
initMethodLinkBehavior()
trackUsageMetrics()

calculateButton.addEventListener("click", () => {
  const active = getActiveQuestions()
  const missing = active.find((question) => typeof answers[question.id] !== "number")

  if (missing) {
    if (isMobilePagedView()) {
      mobileQuestionIndex = Math.max(0, active.findIndex((question) => question.id === missing.id))
      renderQuestions()
    }
    const el = document.querySelector(`[data-question-id="${missing.id}"]`)
    el?.scrollIntoView({ behavior: "smooth", block: "center" })
    if (el) {
      el.style.animation = "none"
      requestAnimationFrame(() => { el.style.animation = "shake 320ms ease" })
    }
    return
  }

  const averages = calculateAverages(answers, active)
  const ranking = rankArchetypes(averages)
  renderResults(averages, ranking)
})

resetButton.addEventListener("click", doReset)
answerAgainButton?.addEventListener("click", () => {
  doReset()
  document.querySelector("#assessment")?.scrollIntoView({ behavior: "smooth", block: "start" })
})

copySummaryButton.addEventListener("click", async () => {
  const text = summaryText.textContent || ""
  if (!text) return
  try {
    await navigator.clipboard.writeText(text)
    copySummaryButton.textContent = "Copied"
  } catch {
    copySummaryButton.textContent = "Copy failed"
  }
  window.setTimeout(() => { copySummaryButton.textContent = "Copy text" }, 1200)
})

shareXButton.addEventListener("click", () => {
  const url = "https://x.com/intent/tweet?text=" + encodeURIComponent(buildShareText())
  window.open(url, "_blank", "noopener,noreferrer")
})

shareLinkedinButton.addEventListener("click", () => {
  const site = "https://sinhaankur.github.io/Archetype/"
  const url = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(site)
  window.open(url, "_blank", "noopener,noreferrer")
})

shareWaButton.addEventListener("click", () => {
  const url = "https://wa.me/?text=" + encodeURIComponent(buildShareText())
  window.open(url, "_blank", "noopener,noreferrer")
})

function getActiveQuestions() {
  if (mode === "deep") return STANDARD_QUESTIONS.concat(DEEP_QUESTIONS)
  if (mode === "deepdive") return STANDARD_QUESTIONS.concat(DEEP_QUESTIONS, DEEP_DIVE_QUESTIONS)
  return STANDARD_QUESTIONS
}

function initConfigControls() {
  document.querySelectorAll("input[name='gender']").forEach((radio) => {
    radio.checked = radio.value === gender
    radio.addEventListener("change", () => {
      gender = radio.value
      persistState()
      hideResults()
    })
  })

  document.querySelectorAll("input[name='mode']").forEach((radio) => {
    radio.checked = radio.value === mode
    radio.addEventListener("change", () => {
      mode = radio.value
      mobileQuestionIndex = 0
      persistState()
      updateQuestionCountUI()
      renderQuestions()
      updateProgress()
      hideResults()
    })
  })
}

function updateQuestionCountUI() {
  const total = getActiveQuestions().length
  totalCount.textContent = String(total)
  heroQCount.textContent = String(total)
}

function hideResults() {
  resultCard.classList.remove("is-visible")
  resultCard.classList.add("is-hidden")
}

function doReset() {
  answers = {}
  mobileQuestionIndex = 0
  persistState()
  renderQuestions()
  updateProgress()
  hideResults()
}

function renderQuestions() {
  if (rendering) return
  rendering = true
  form.innerHTML = ""
  const activeQuestions = getActiveQuestions()
  const mobilePagedView = isMobilePagedView()

  if (mobilePagedView) {
    mobileQuestionIndex = clampMobileQuestionIndex(activeQuestions.length)
    form.classList.add("is-mobile-paged")
  } else {
    form.classList.remove("is-mobile-paged")
  }

  const questionsToRender = mobilePagedView
    ? [{ question: activeQuestions[mobileQuestionIndex], idx: mobileQuestionIndex }]
    : activeQuestions.map((question, idx) => ({ question, idx }))

  questionsToRender.forEach(({ question, idx }) => {
    if (!question) return
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
    legend.textContent = `${idx + 1}. ${question.text}`

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
        const nextQuestion = activeQuestions[idx + 1]
        recentlyAnsweredQuestionId = question.id
        answers[question.id] = rating

        if (mobilePagedView && nextQuestion) {
          mobileQuestionIndex = idx + 1
        }

        persistState()
        renderQuestions()
        updateProgress()
        hideResults()

        if (mobilePagedView && nextQuestion) {
          document.querySelector(".question-list")?.scrollIntoView({ behavior: "smooth", block: "start" })
        }

        if (window.matchMedia("(pointer: coarse)").matches && "vibrate" in navigator) {
          try {
            navigator.vibrate(8)
          } catch {
            // Ignore vibration errors on unsupported devices/browsers.
          }
        }
      })

      valueNode.textContent = String(rating)
      labelNode.textContent = SCALE_LABELS[rating]
      label.title = SCALE_LABELS[rating]
      ratingGrid.appendChild(ratingFragment)
    }

    form.appendChild(fragment)
  })

  if (mobilePagedView) {
    form.appendChild(buildMobileQuestionNav(activeQuestions))
  }

  rendering = false
  syncFramerMotion()
  animateRecentlyAnsweredQuestion()
}

function buildMobileQuestionNav(activeQuestions) {
  const wrapper = document.createElement("div")
  wrapper.className = "mobile-question-nav"

  const prev = document.createElement("button")
  prev.type = "button"
  prev.className = "button"
  prev.textContent = "Previous"
  prev.disabled = mobileQuestionIndex <= 0
  prev.addEventListener("click", () => {
    mobileQuestionIndex = Math.max(0, mobileQuestionIndex - 1)
    renderQuestions()
  })

  const status = document.createElement("p")
  status.className = "mobile-nav-status"
  status.textContent = `Question ${mobileQuestionIndex + 1} of ${activeQuestions.length}`

  const next = document.createElement("button")
  next.type = "button"
  next.className = "button button-secondary"
  next.textContent = mobileQuestionIndex >= activeQuestions.length - 1 ? "Review" : "Next"
  next.disabled = mobileQuestionIndex >= activeQuestions.length - 1
  next.addEventListener("click", () => {
    mobileQuestionIndex = Math.min(activeQuestions.length - 1, mobileQuestionIndex + 1)
    renderQuestions()
  })

  wrapper.append(prev, status, next)
  return wrapper
}

function isMobilePagedView() {
  return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches
}

function clampMobileQuestionIndex(total) {
  if (total <= 0) return 0
  return Math.min(Math.max(0, mobileQuestionIndex), total - 1)
}

function initMobilePagingSync() {
  const media = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
  let wasMobile = media.matches

  media.addEventListener("change", (event) => {
    if (event.matches !== wasMobile) {
      wasMobile = event.matches
      renderQuestions()
    }
  })
}

function initMethodLinkBehavior() {
  if (!seeHowItWorksButton) return

  seeHowItWorksButton.addEventListener("click", (event) => {
    const mobileTarget = document.querySelector("#method-mobile")
    const desktopTarget = document.querySelector("#method")
    const target = isMobilePagedView() ? mobileTarget : desktopTarget

    if (!target) return

    event.preventDefault()
    target.scrollIntoView({ behavior: "smooth", block: "start" })
  })
}

function updateProgress() {
  const active = getActiveQuestions()
  const answered = active.filter((question) => typeof answers[question.id] === "number").length
  const total = active.length
  const percent = Math.round((answered / total) * 100)

  answeredCount.textContent = String(answered)
  progressFill.style.width = `${percent}%`

  floatCount.textContent = String(answered)
  floatTotal.textContent = String(total)
  floatBar.style.width = `${percent}%`
  if (answered > 0 && answered < total) {
    floatPill.classList.add("is-visible")
  } else {
    floatPill.classList.remove("is-visible")
  }

  if (answered === total) {
    progressCopy.textContent = "All answers are in. Calculate your ranked result below."
  } else if (answered === 0) {
    progressCopy.textContent = "Answer the statements below to unlock your result."
  } else {
    const left = total - answered
    progressCopy.textContent = `${left} question${left === 1 ? "" : "s"} left.`
  }
}

function calculateAverages(currentAnswers, activeQuestions) {
  const grouped = { Ind: [], Emp: [], Wis: [], Skl: [], Cre: [] }
  activeQuestions.forEach((question) => grouped[question.trait].push(currentAnswers[question.id]))
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
    .map(([key, weights]) => {
      const score = averages.Ind * weights.Ind + averages.Emp * weights.Emp + averages.Wis * weights.Wis + averages.Skl * weights.Skl + averages.Cre * weights.Cre
      const name = resolveDisplayName(key)
      return { key, name, score: Number(score.toFixed(2)) }
    })
    .sort((left, right) => right.score - left.score)
}

function resolveDisplayName(key) {
  if (gender === "female") return FEMALE_NAMES[key] || key
  return key
}

function renderResults(averages, ranking) {
  const top = ranking[0]
  const strongestTraits = Object.entries(averages).sort((left, right) => right[1] - left[1])

  topName.textContent = top.name
  topDescription.textContent = ARCHETYPE_DESCRIPTIONS[top.name] || ARCHETYPE_DESCRIPTIONS[top.key] || ""
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
      <p>${ARCHETYPE_DESCRIPTIONS[item.name] || ARCHETYPE_DESCRIPTIONS[item.key] || ""}</p>
    `
    rankingList.appendChild(wrapper)
  })

  const topTraitsText = strongestTraits.slice(0, 2).map(([trait]) => TRAIT_LABELS[trait]).join(" and ")
  summaryText.textContent = `Your dominant result is ${top.name} with a match strength of ${top.score.toFixed(2)}. Your strongest expressed traits are ${topTraitsText}. ${ARCHETYPE_DESCRIPTIONS[top.name] || ARCHETYPE_DESCRIPTIONS[top.key] || ""}`

  resultCard.classList.remove("is-hidden")
  requestAnimationFrame(() => resultCard.classList.add("is-visible"))
  resultCard.scrollIntoView({ behavior: "smooth", block: "start" })
  syncFramerMotion()

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

function buildShareText() {
  const name = topName.textContent || "an archetype"
  const score = topScore.textContent || ""
  const site = "https://sinhaankur.github.io/Archetype/"
  return `I just took the Archetype Assessment and my primary match is ${name} (score: ${score}). Find yours -> ${site}`
}

function launchConfetti() {
  confettiCanvas.width = window.innerWidth
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
    p.x += p.vx
    p.y += p.vy
    p.vy += 0.12
    p.rotation += p.vr
    p.life -= p.decay

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

function average(values) {
  return Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(2))
}

function loadState() {
  try {
    const raw = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}")
    if (raw && typeof raw === "object" && raw.answers) return raw
    if (raw && typeof raw === "object") return { answers: raw, gender: "male", mode: "standard" }
    return { answers: {}, gender: "male", mode: "standard" }
  } catch {
    return { answers: {}, gender: "male", mode: "standard" }
  }
}

function persistState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, gender, mode }))
}

function initFramerUX() {
  wireSpringPressInteractions(document)
  if (prefersReducedMotion) return
  initMotionObserver()
  syncFramerMotion()
}

function initMotionObserver() {
  if (motionObserver || !("IntersectionObserver" in window)) return

  motionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("motion-in")
          motionObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  )
}

function syncFramerMotion() {
  wireSpringPressInteractions(document)
  if (prefersReducedMotion) return

  const motionTargets = document.querySelectorAll(
    ".hero, .hero .stat-card, .config-bar, .sidebar-card, .question-card, .result-card, .result-hero, .panel, .summary-panel, .trait-row, .ranking-row"
  )

  motionTargets.forEach((el, idx) => {
    if (!el.classList.contains("motion-item")) {
      el.classList.add("motion-item")
      let delay = Math.min(idx * 26, 220)
      if (el.classList.contains("hero")) delay = 20
      if (el.classList.contains("stat-card")) delay = 80 + idx * 28
      if (el.classList.contains("result-card")) delay = 40
      if (el.classList.contains("result-hero")) delay = 80
      el.style.setProperty("--motion-delay", `${delay}ms`)
    }

    if (motionObserver) {
      motionObserver.observe(el)
    } else {
      el.classList.add("motion-in")
    }
  })
}

function wireSpringPressInteractions(root) {
  root.querySelectorAll(".button, .config-chip span, .rating-box").forEach((el) => {
    if (el.dataset.springWired === "1") return
    el.dataset.springWired = "1"

    const clear = () => el.classList.remove("spring-press")
    el.addEventListener("pointerdown", () => el.classList.add("spring-press"))
    el.addEventListener("pointerup", clear)
    el.addEventListener("pointerleave", clear)
    el.addEventListener("blur", clear)
  })
}

function animateRecentlyAnsweredQuestion() {
  if (prefersReducedMotion || recentlyAnsweredQuestionId === null) return

  const card = document.querySelector(`[data-question-id="${recentlyAnsweredQuestionId}"]`)
  recentlyAnsweredQuestionId = null
  if (!card || typeof card.animate !== "function") return

  card.animate(
    [
      { transform: "translateY(10px) scale(0.985)", opacity: 0.82 },
      { transform: "translateY(0) scale(1.01)", opacity: 1, offset: 0.7 },
      { transform: "translateY(0) scale(1)", opacity: 1 },
    ],
    { duration: 420, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
  )
}

function initWelcomeAnimation() {
  showWelcomeBanner("Ready to discover your archetype?")
}

function showWelcomeBanner(message) {
  const existing = document.querySelector(".welcome-banner")
  existing?.remove()

  const banner = document.createElement("div")
  banner.className = "welcome-banner"
  banner.setAttribute("aria-live", "polite")
  banner.innerHTML = `<span class="welcome-kicker">Welcome</span><strong>${message}</strong>`
  document.body.appendChild(banner)

  requestAnimationFrame(() => banner.classList.add("is-visible"))

  const visibleFor = prefersReducedMotion ? 1000 : 1700
  window.setTimeout(() => {
    banner.classList.remove("is-visible")
    banner.classList.add("is-exit")
  }, visibleFor)

  window.setTimeout(() => banner.remove(), visibleFor + 700)
}

function initDelightInteractions() {
  document.addEventListener("pointerdown", (event) => {
    const target = event.target instanceof Element ? event.target : null
    const interactive = target?.closest(".button, .config-chip, .rating-option, .rating-box")

    if (!interactive) return

    if (!prefersReducedMotion) {
      playTapSpark(event.clientX, event.clientY, interactive)
      playPagePulse()
    }

    if (!hasPlayedTapWelcome) {
      hasPlayedTapWelcome = true
      showWelcomeBanner("Nice. Let's begin.")
    }
  }, { passive: true })
}

function playTapSpark(x, y, sourceTarget) {
  const burst = document.createElement("span")
  burst.className = "tap-burst"
  burst.style.left = `${x}px`
  burst.style.top = `${y}px`
  burst.dataset.theme = resolveBurstTheme(sourceTarget)

  const ring = document.createElement("span")
  ring.className = "tap-ring"
  burst.appendChild(ring)

  for (let i = 0; i < 6; i += 1) {
    const dot = document.createElement("span")
    dot.className = "tap-dot"
    dot.style.setProperty("--a", `${i * 60}deg`)
    burst.appendChild(dot)
  }

  document.body.appendChild(burst)
  window.setTimeout(() => burst.remove(), 560)
}

function resolveBurstTheme(sourceTarget) {
  if (!(sourceTarget instanceof Element)) return "default"

  if (sourceTarget.closest(".button-primary")) return "primary"
  if (sourceTarget.closest(".button-secondary")) return "secondary"
  if (sourceTarget.closest(".rating-box")) return "rating"
  if (sourceTarget.closest(".config-chip")) return "config"

  return "default"
}

function playPagePulse() {
  document.body.classList.add("page-pulse")
  if (pulseTimeoutId) window.clearTimeout(pulseTimeoutId)
  pulseTimeoutId = window.setTimeout(() => document.body.classList.remove("page-pulse"), 240)
}

function trackUsageMetrics() {
  // Visitors: every page load.
  hitCounter("visitors")

  // Users: first visit on this browser/device only.
  if (!window.localStorage.getItem(UNIQUE_USER_KEY)) {
    hitCounter("users")
      .then(() => {
        window.localStorage.setItem(UNIQUE_USER_KEY, "1")
      })
      .catch(() => {
        // Leave key unset so we can retry on next load.
      })
  }
}

function hitCounter(metric) {
  const url = `https://api.countapi.xyz/hit/${ANALYTICS_NAMESPACE}/${metric}`
  return fetch(url, { method: "GET", mode: "cors", cache: "no-store" })
}
