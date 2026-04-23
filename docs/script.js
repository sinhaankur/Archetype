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
    text: "I enjoy breaking conventions and finding humor or novelty in mundane situations.",
  },
]

const ARCHETYPES = {
  "The King": { Ind: 0.42, Wis: 0.37, Emp: 0.15, Skl: 0.03, Cre: 0.1 },
  "The Father": { Wis: 0.5, Emp: 0.3, Ind: 0.1, Skl: 0.05, Cre: 0.05 },
  "The Warrior": { Ind: 0.24, Cre: 0.2, Wis: 0.18, Skl: 0.15, Emp: 0.02 },
  "The Magician": { Emp: 0.49, Cre: 0.19, Skl: 0.15, Ind: 0.08, Wis: 0.04 },
  "The Lover": { Ind: 0.38, Wis: 0.32, Emp: 0.12, Skl: 0.17, Cre: 0.01 },
  "The Sage": { Wis: 0.5, Cre: 0.21, Emp: 0.2, Ind: 0.12, Skl: 0.1 },
  "The Explorer": { Ind: 0.54, Cre: 0.11, Skl: 0.11, Wis: 0.1, Emp: 0.06 },
  "The Creator": { Cre: 0.4, Wis: 0.15, Ind: 0.11, Skl: 0.1, Emp: 0.03 },
  "The Hero": { Wis: 0.39, Ind: 0.33, Emp: 0.12, Skl: 0.05, Cre: 0.02 },
  "The Rebel": { Ind: 0.59, Cre: 0.22, Emp: 0.23, Wis: 0.12, Skl: 0.08 },
  "The Jester": { Cre: 0.63, Skl: 0.13, Ind: 0.11, Wis: 0.1, Emp: 0.08 },
  "The Caregiver": { Emp: 0.45, Skl: 0.2, Wis: 0.15, Ind: 0.1, Cre: 0.04 },
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

const STORAGE_KEY = "archetype-pages-answers"

const form = document.querySelector("#archetype-form")
const questionTemplate = document.querySelector("#question-template")
const ratingTemplate = document.querySelector("#rating-template")
const calculateButton = document.querySelector("#calculate-button")
const resetButton = document.querySelector("#reset-button")
const copySummaryButton = document.querySelector("#copy-summary-button")
const resultCard = document.querySelector("#result-card")
const answeredCount = document.querySelector("#answered-count")
const progressFill = document.querySelector("#progress-fill")
const progressCopy = document.querySelector("#progress-copy")
const topName = document.querySelector("#top-name")
const topDescription = document.querySelector("#top-description")
const topScore = document.querySelector("#top-score")
const traitBreakdown = document.querySelector("#trait-breakdown")
const rankingList = document.querySelector("#ranking-list")
const summaryText = document.querySelector("#summary-text")

let answers = loadAnswers()

renderQuestions()
updateProgress()

calculateButton.addEventListener("click", () => {
  const missingQuestion = QUESTIONS.find((question) => typeof answers[question.id] !== "number")

  if (missingQuestion) {
    document.querySelector(`[data-question-id="${missingQuestion.id}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" })
    return
  }

  const averages = calculateAverages(answers)
  const ranking = rankArchetypes(averages)
  renderResults(averages, ranking)
})

resetButton.addEventListener("click", () => {
  answers = {}
  persistAnswers()
  renderQuestions()
  updateProgress()
  resultCard.classList.add("is-hidden")
})

copySummaryButton.addEventListener("click", async () => {
  const text = summaryText.textContent || ""

  if (!text) {
    return
  }

  try {
    await navigator.clipboard.writeText(text)
    copySummaryButton.textContent = "Copied"
    window.setTimeout(() => {
      copySummaryButton.textContent = "Copy result summary"
    }, 1400)
  } catch {
    copySummaryButton.textContent = "Copy failed"
    window.setTimeout(() => {
      copySummaryButton.textContent = "Copy result summary"
    }, 1400)
  }
})

function renderQuestions() {
  form.innerHTML = ""

  for (const question of QUESTIONS) {
    const fragment = questionTemplate.content.cloneNode(true)
    const fieldset = fragment.querySelector("fieldset")
    const traitPill = fragment.querySelector(".trait-pill")
    const status = fragment.querySelector(".question-status")
    const legend = fragment.querySelector(".question-text")
    const ratingGrid = fragment.querySelector(".rating-grid")
    const selectedValue = answers[question.id]

    fieldset.dataset.questionId = String(question.id)
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
        persistAnswers()
        renderQuestions()
        updateProgress()
        resultCard.classList.add("is-hidden")
      })

      valueNode.textContent = String(rating)
      labelNode.textContent = SCALE_LABELS[rating]
      label.title = SCALE_LABELS[rating]
      ratingGrid.appendChild(ratingFragment)
    }

    form.appendChild(fragment)
  }
}

function updateProgress() {
  const count = QUESTIONS.filter((question) => typeof answers[question.id] === "number").length
  const percent = Math.round((count / QUESTIONS.length) * 100)

  answeredCount.textContent = String(count)
  progressFill.style.width = `${percent}%`

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
  resultCard.scrollIntoView({ behavior: "smooth", block: "start" })
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

function persistAnswers() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
}