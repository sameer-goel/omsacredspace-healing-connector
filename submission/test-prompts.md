# Test Prompts + Expected Responses

For the OpenAI app review form. Each must produce a relevant, correct answer on
both ChatGPT web and mobile. The connector appends a wellness disclaimer to
every answer.

| # | User prompt | Tool exercised | Expected response (summary) |
|---|-------------|----------------|------------------------------|
| 1 | Can sound healing help with my anxiety? | ask_healing | Explains sound healing harmonizes the body's vibrational field, helps dissolve stagnant energy and calm the nervous system. Ends with disclaimer. |
| 2 | What is sound healing? | ask_healing | Describes how sound influences subtle vibratory fields and guides brainwaves from Beta to Alpha/Theta for deep rest. |
| 3 | What instruments do you use and how do they affect the body? | ask_healing | Lists Tibetan singing bowls, crystal bowls, tuning forks, drums, chimes/bells and their effects. |
| 4 | How is sound healing different from Reiki? | ask_healing | Reiki channels energy via hands/intention; sound healing uses frequencies/instruments to shift energy patterns. Both complementary. |
| 5 | Can I practice sound healing at home myself? | ask_healing | Yes — humming, binaural beats, solfeggio frequencies, a singing bowl or tuning fork; daily practice helps. |
| 6 | How often should I attend sessions? | ask_healing | Weekly for deep/emotional work, then every 2–4 weeks for maintenance; whenever called for spiritual growth. |
| 7 | Is sound healing safe if I'm pregnant? | ask_healing | Generally yes, but pregnancy, epilepsy, and severe mental-health conditions should check with a provider first. |
| 8 | How should I prepare before a session? | ask_healing | Set an intention, stay hydrated, avoid heavy meals 2h before, stay open; mention sensitivity for grounding. |
| 9 | Do you offer online or distance sessions? | ask_healing / search | Yes — distance healing works across space; mentions Foundations/Awakening/Integration/Transformation tiers. |
| 10 | Search for self-healing daily practices, then show me the full answer. | search → fetch | search returns matching topic ids; fetch returns the full self-healing-at-home answer with disclaimer. |

## Notes for reviewers
- All tools are **read-only**; the app collects no personal data and requires no
  login.
- Answers are complementary wellness guidance sourced from Om Sacred Space, not
  medical advice. A disclaimer is appended to every answer.
- No precise location, health data, or credentials are requested at any point.
