# Archetype
A high-performance discovery engine built to map user personalities to the 12 classic male archetypes. Featuring a weighted scoring algorithm, multi-tier state management, and situational decision-tree logic. Designed with a focus on deep-dive UX and state-driven architecture for professional personality assessment.

---

## The Algorithm: Weighted Trait Matrix

Each archetype is represented as a vector in a **5-dimensional trait space** (e.g., Dominance, Empathy, Independence, Creativity, Discipline). When a user completes the assessment, their responses are translated into a corresponding trait vector. The engine then computes the **dot-product similarity** between the user's vector and each of the 12 archetype vectors, applying per-dimension weights that reflect each trait's relative importance. The archetype with the highest weighted similarity score is selected as the user's primary match.

```
similarity(user, archetype) = Σ (weight_i × user_trait_i × archetype_trait_i)
```

This approach ensures nuanced, data-driven results rather than simple category buckets.

---

## Shadow Logic

The engine continuously monitors trait distributions to detect **unbalanced profiles** — combinations that indicate an unhealthy or underdeveloped psychological pattern. When such an imbalance is found, a contextual "Shadow" warning is surfaced to the user.

**Example trigger:**

| Condition | Shadow Warning |
|---|---|
| Independence score is high **and** Empathy score is below 20% | ⚠️ **Rebel Shadow** — drive without connection can lead to isolation. |

Additional shadow triggers are evaluated across all trait pairings, giving users actionable insight into blind spots alongside their primary archetype result.

---

## Discovery Tiers

The assessment unfolds across three progressive tiers, each narrowing the result set until a final archetype is locked:

1. **Core Driver** — Quadrant identification. A broad set of questions places the user into one of four motivational quadrants (e.g., Power, Connection, Expression, Structure), establishing the foundational archetype family.

2. **Action Style** — Execution strategy. A secondary question layer distinguishes *how* the user pursues their core driver (e.g., assertively vs. collaboratively), narrowing candidates within the quadrant.

3. **Refinement** — Final archetype lock. Situational decision-tree questions resolve any remaining ambiguity and produce the definitive archetype assignment, complete with a detailed profile and any applicable Shadow warnings.
