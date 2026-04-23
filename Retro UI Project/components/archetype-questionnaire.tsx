"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

type TraitKey = "Ind" | "Emp" | "Wis" | "Skl" | "Cre"

type Question = {
  id: number
  text: string
  trait: TraitKey
}

type Scores = Record<TraitKey, number>

type ArchetypeWeights = Record<TraitKey, number>

type RankedArchetype = {
  name: string
  score: number
}

const QUESTIONS: Question[] = [
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
    text: "I am comfortable being the \"lone wolf\" if it means staying true to my mission.",
  },
  {
    id: 7,
    trait: "Emp",
    text: "Helping and nurturing others gives me my greatest sense of purpose.",
  },
  {
    id: 8,
    trait: "Wis",
    text: "People often come to me for objective advice or a \"big picture\" perspective.",
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

const ARCHETYPES: Record<string, ArchetypeWeights> = {
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

const TRAIT_LABELS: Record<TraitKey, string> = {
  Ind: "Independence",
  Emp: "Empathy",
  Wis: "Wisdom",
  Skl: "Skills",
  Cre: "Creativity",
}

const TRAIT_STYLES: Record<TraitKey, string> = {
  Ind: "bg-primary text-primary-foreground border-primary",
  Emp: "bg-secondary text-secondary-foreground border-secondary",
  Wis: "bg-accent text-accent-foreground border-accent",
  Skl: "bg-muted text-foreground border-border",
  Cre: "bg-card text-foreground border-primary",
}

const ARCHETYPE_DESCRIPTIONS: Record<string, string> = {
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

const SCALE_LABELS: Record<number, string> = {
  1: "Strongly Disagree",
  2: "Disagree",
  3: "Neutral",
  4: "Agree",
  5: "Strongly Agree",
}

function calculateAverages(answers: Record<number, number>): Scores {
  const grouped: Record<TraitKey, number[]> = {
    Ind: [],
    Emp: [],
    Wis: [],
    Skl: [],
    Cre: [],
  }

  for (const q of QUESTIONS) {
    const answer = answers[q.id]
    if (typeof answer === "number") {
      grouped[q.trait].push(answer)
    }
  }

  return {
    Ind: grouped.Ind.reduce((a, b) => a + b, 0) / grouped.Ind.length,
    Emp: grouped.Emp.reduce((a, b) => a + b, 0) / grouped.Emp.length,
    Wis: grouped.Wis.reduce((a, b) => a + b, 0) / grouped.Wis.length,
    Skl: grouped.Skl.reduce((a, b) => a + b, 0) / grouped.Skl.length,
    Cre: grouped.Cre.reduce((a, b) => a + b, 0) / grouped.Cre.length,
  }
}

function calculateArchetypeRanking(answers: Scores) {
  const results = Object.entries(ARCHETYPES).map(([name, weights]) => {
    const score =
      answers.Ind * weights.Ind +
      answers.Emp * weights.Emp +
      answers.Wis * weights.Wis +
      answers.Skl * weights.Skl +
      answers.Cre * weights.Cre

    return { name, score: Number(score.toFixed(2)) }
  })

  return results.sort((a, b) => b.score - a.score)
}

function getStrongestTraits(traitAverages: Scores) {
  return (Object.entries(traitAverages) as Array<[TraitKey, number]>).sort((a, b) => b[1] - a[1])
}

export function ArchetypeQuestionnaire() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResult, setShowResult] = useState(false)

  const answeredCount = useMemo(
    () => QUESTIONS.filter((question) => typeof answers[question.id] === "number").length,
    [answers],
  )

  const progress = Math.round((answeredCount / QUESTIONS.length) * 100)

  const allAnswered = useMemo(() => QUESTIONS.every((q) => typeof answers[q.id] === "number"), [answers])

  const computed = useMemo(() => {
    if (!allAnswered) return null

    const traitAverages = calculateAverages(answers)
    const ranking = calculateArchetypeRanking(traitAverages)

    return {
      traitAverages,
      ranking,
      strongestTraits: getStrongestTraits(traitAverages),
      top: ranking[0],
    }
  }, [allAnswered, answers])

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4 sm:px-6 pb-12">
      <Card className="shadow-lg overflow-hidden">
        <CardHeader className="space-y-5 bg-[linear-gradient(135deg,hsl(var(--background))_0%,hsl(var(--muted))_100%)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3 max-w-2xl">
              <Badge variant="secondary" className="w-fit">12 archetypes • 5 core traits</Badge>
              <CardTitle className="text-3xl sm:text-4xl md:text-5xl leading-none">Archetype Discovery Test</CardTitle>
              <CardDescription className="text-sm sm:text-base md:text-lg text-muted-foreground">
                Answer 10 statements to see which masculine archetype dominates your current pattern.
              </CardDescription>
            </div>
            <div className="border-2 bg-card px-4 py-3 shadow-sm min-w-[220px]">
              <p className="text-xs font-mono text-muted-foreground">Progress</p>
              <p className="text-2xl font-bold">{answeredCount}/{QUESTIONS.length}</p>
              <p className="text-sm text-muted-foreground">questions completed</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
              <span>{progress}% complete</span>
              <span>{allAnswered ? "Ready to calculate" : "Keep going"}</span>
            </div>
            <Progress value={progress} className="h-3 rounded-none border-2 border-border bg-background" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="border-2 bg-card p-3">
              <p className="font-bold">Fast to complete</p>
              <p className="text-muted-foreground">Roughly 2 minutes with a simple 1-5 scale.</p>
            </div>
            <div className="border-2 bg-card p-3">
              <p className="font-bold">Weighted scoring</p>
              <p className="text-muted-foreground">Each answer maps into the five-trait archetype model.</p>
            </div>
            <div className="border-2 bg-card p-3">
              <p className="font-bold">Ranked outcome</p>
              <p className="text-muted-foreground">You get a primary match plus the next closest fits.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <span className="font-mono">Scale:</span>
            {[1, 2, 3, 4, 5].map((rating) => (
              <div key={rating} className="border-2 px-2 py-1 bg-background font-mono">
                {rating} = {SCALE_LABELS[rating]}
              </div>
            ))}
          </div>

          {QUESTIONS.map((q) => {
            const value = answers[q.id]
            return (
              <div key={q.id} className="border-2 p-4 sm:p-5 space-y-4 bg-card shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <Badge className={TRAIT_STYLES[q.trait]}>{TRAIT_LABELS[q.trait]}</Badge>
                    <Label className="text-base sm:text-lg leading-relaxed block font-semibold">
                      {q.id}. {q.text}
                    </Label>
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-muted-foreground shrink-0">
                    {value ? `Selected: ${value} / 5` : "Not answered"}
                  </div>
                </div>

                <RadioGroup
                  value={value ? String(value) : undefined}
                  onValueChange={(next: string) => {
                    setAnswers((prev: Record<number, number>) => ({ ...prev, [q.id]: Number(next) }))
                    setShowResult(false)
                  }}
                  className="grid grid-cols-1 sm:grid-cols-5 gap-2"
                >
                  {[1, 2, 3, 4, 5].map((rating) => {
                    const id = `q${q.id}-${rating}`
                    return (
                      <div key={id} className="flex items-center justify-center">
                        <RadioGroupItem value={String(rating)} id={id} className="sr-only" />
                        <Label
                          htmlFor={id}
                          className={`w-full border-2 px-3 py-3 text-sm font-bold cursor-pointer select-none transition-all ${
                            value === rating
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border hover:bg-muted"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3 sm:flex-col sm:gap-1 sm:text-center">
                            <span className="font-mono text-base">{rating}</span>
                            <span className="text-xs sm:text-[11px] leading-tight">{SCALE_LABELS[rating]}</span>
                          </div>
                        </Label>
                      </div>
                    )
                  })}
                </RadioGroup>
              </div>
            )
          })}

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <Button
              onClick={() => setShowResult(true)}
              disabled={!allAnswered}
              className="w-full sm:w-auto"
              type="button"
            >
              Calculate My Archetype
            </Button>
            <Button
              onClick={() => {
                setAnswers({})
                setShowResult(false)
              }}
              variant="outline"
              className="w-full sm:w-auto"
              type="button"
            >
              Reset
            </Button>
            {!allAnswered && (
              <p className="text-sm text-muted-foreground">
                Complete all 10 questions to unlock your ranked archetype result.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {showResult && computed && (
        <Card className="shadow-lg border-2 border-primary overflow-hidden">
          <CardHeader className="bg-primary text-primary-foreground space-y-3">
            <Badge className="w-fit bg-background text-foreground border-background">Primary Match</Badge>
            <CardTitle className="text-2xl sm:text-3xl">{computed.top.name}</CardTitle>
            <CardDescription className="text-primary-foreground/90 text-sm sm:text-base">
              {ARCHETYPE_DESCRIPTIONS[computed.top.name]}
            </CardDescription>
            <div className="flex flex-wrap items-center gap-3 text-sm font-mono">
              <span>Match Strength: {computed.top.score}</span>
              <span>Top Traits: {computed.strongestTraits.slice(0, 2).map(([trait]) => TRAIT_LABELS[trait]).join(" + ")}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-bold text-lg">Trait Breakdown</h3>
                  <div className="space-y-3">
                    {computed.strongestTraits.map(([trait, score]: [TraitKey, number]) => {
                      const normalized = Math.round((score / 5) * 100)

                      return (
                        <div key={trait} className="space-y-2 border-2 p-3 bg-card">
                          <div className="flex items-center justify-between gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <Badge className={TRAIT_STYLES[trait]}>{TRAIT_LABELS[trait]}</Badge>
                            </div>
                            <span className="font-mono">{score.toFixed(2)} / 5</span>
                          </div>
                          <Progress
                            value={normalized}
                            className="h-3 rounded-none border-2 border-border bg-muted"
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>

                <Separator className="bg-border" />

                <div className="space-y-3">
                  <h3 className="font-bold text-lg">What This Suggests</h3>
                  <div className="border-2 p-4 bg-muted/40">
                    <p className="text-sm sm:text-base leading-relaxed">
                      Your answers show the strongest pull toward <span className="font-bold">{computed.top.name}</span>,
                      meaning your current pattern is most aligned with {ARCHETYPE_DESCRIPTIONS[computed.top.name].toLowerCase()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-lg">Top 5 Matches</h3>
                <div className="space-y-3">
                  {computed.ranking.slice(0, 5).map((item: RankedArchetype, index: number) => (
                    <div key={item.name} className="border-2 p-4 bg-card shadow-sm space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold">
                          {index + 1}. {item.name}
                        </p>
                        <p className="font-mono text-sm">{item.score}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{ARCHETYPE_DESCRIPTIONS[item.name]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
