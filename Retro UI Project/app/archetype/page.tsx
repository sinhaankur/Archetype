import { ArchetypeQuestionnaire } from "@/components/archetype-questionnaire"

export default function ArchetypePage() {
  return (
    <section className="py-6 sm:py-10 md:py-12 space-y-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border-2 bg-[linear-gradient(135deg,hsl(var(--secondary))_0%,hsl(var(--background))_100%)] p-6 sm:p-8 shadow-lg space-y-4">
          <p className="font-mono text-xs sm:text-sm uppercase tracking-wide text-muted-foreground">
            Personality Assessment
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-3xl">
            Answer the questions and uncover your dominant archetype.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl">
            This page uses the retro visual system and a weighted five-trait scoring model to produce a ranked result,
            not just a single label.
          </p>
        </div>
      </div>
      <ArchetypeQuestionnaire />
    </section>
  )
}
