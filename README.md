# Archetype
A high-performance discovery engine built to map user personalities to the 12 classic male archetypes. Featuring a weighted scoring algorithm, multi-tier state management, and situational decision-tree logic. Designed with a focus on deep-dive UX and state-driven architecture for professional personality assessment.

## GitHub Pages Test Site

This repository now includes a standalone static archetype questionnaire in the docs folder so it can be published with GitHub Pages without depending on the Next.js app.

### Local test

From the repository root, run one of these:

- python3 -m http.server 4173 --directory docs
- npx serve docs

Then open:

- http://localhost:4173

### GitHub Pages publish

The workflow at .github/workflows/deploy-pages.yml deploys the docs folder automatically when main is updated.

In the repository settings on GitHub:

- Open Settings > Pages
- Set Source to GitHub Actions

After the next push to main, GitHub Pages will publish the static test site.
