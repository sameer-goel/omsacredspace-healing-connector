// Om Sacred Space — healing knowledge base.
// Content distilled from the live site (sound-healing.html FAQ, programs,
// distance-healing tiers, benefits) so the connector answers reflect the
// real brand voice. Keep answers complementary/wellness-oriented, never
// presented as medical advice.

export const SITE_URL = "https://omsacredspace.com";
export const CONTACT_EMAIL = "contact@omsacredspace.com";

// Each entry: id, question, answer, tags (for keyword matching), and a source url.
export const HEALING_QA = [
  {
    id: "stress-anxiety",
    question: "Can sound healing help with stress or anxiety?",
    answer:
      "Yes. Sound healing works by harmonizing the body's vibrational field. Stress and anxiety often arise from energetic imbalances, blocked emotions, or being out of sync with your natural rhythm. Specific frequencies interact with your energy field, help dissolve stagnant energy, and restore flow — calming the nervous system and easing emotional tension.",
    tags: ["stress", "anxiety", "calm", "nervous system", "relax", "emotions"],
    url: `${SITE_URL}/sound-healing.html#faq`,
  },
  {
    id: "what-is-sound-healing",
    question: "What is sound healing?",
    answer:
      "Sound healing influences the body's subtle vibratory fields, gently bringing dissonance and dis-ease back into harmony. By guiding brainwaves down from a busy Beta state into calmer Alpha or Theta states, it opens space for deep rest, creativity, and connection to your Higher Self. Your breath and heartbeat are rhythmic already — sound healing works with those natural rhythms.",
    tags: ["what", "sound healing", "definition", "vibration", "brainwaves", "basics"],
    url: `${SITE_URL}/sound-healing.html#about`,
  },
  {
    id: "instruments",
    question: "What instruments are used and how do they affect the body?",
    answer:
      "Different instruments serve different intentions. Tibetan singing bowls support chakra analysis, emotional balance, and alignment of the nadis. Crystal bowls use higher frequencies and gentle dissonance to guide you into a trance state. Tuning forks target specific points with immediate physical effect. Drums and shakers ground you with the Earth's vibration. Chimes and bells work on the higher chakras, helping release fears and reprogram the subconscious.",
    tags: ["instruments", "singing bowls", "crystal bowls", "tuning forks", "drums", "chimes"],
    url: `${SITE_URL}/sound-healing.html#faq`,
  },
  {
    id: "sound-vs-reiki",
    question: "What's the difference between sound healing and Reiki?",
    answer:
      "Reiki channels universal energy through the hands and intention, working subtly like a gentle infusion of light into the auric layers. Sound healing uses frequencies, instruments, and intention to actively shift energy patterns — restructuring the energetic field on a vibrational level. Both are complementary; many people enjoy combining them.",
    tags: ["reiki", "difference", "energy", "comparison", "vs", "different", "versus", "compared"],
    url: `${SITE_URL}/sound-healing.html#faq`,
  },
  {
    id: "self-healing-at-home",
    question: "Can I practice sound healing or self-healing at home?",
    answer:
      "Absolutely. Simply humming vibrates your own cells back toward balance. You can meditate with binaural beats and solfeggio frequencies, or work with a singing bowl or tuning fork as a first instrument to induce a calm, meditative state. Daily practice — even a few minutes — helps maintain your vibrational shift between sessions.",
    tags: ["self-healing", "home", "practice", "humming", "binaural", "solfeggio", "diy"],
    url: `${SITE_URL}/sound-healing.html#faq`,
  },
  {
    id: "how-often",
    question: "How often should I attend sessions to see results?",
    answer:
      "It depends on your goal. For deep emotional work, weekly until you feel aligned. For stress or anxiety relief, weekly at first, then every 2–4 weeks for maintenance. For spiritual growth, come whenever you feel called. Many people feel a shift after a single session, while deeper changes settle in over weeks.",
    tags: ["frequency", "how often", "sessions", "results", "schedule"],
    url: `${SITE_URL}/sound-healing.html#faq`,
  },
  {
    id: "safety",
    question: "Is sound healing safe for everyone?",
    answer:
      "For most people, yes. However, those with severe mental health conditions or epilepsy, and people who are pregnant, should approach with awareness and check with their healthcare provider first. Sound can surface deep subconscious patterns, which may feel intense if you are not ready for emotional release. Always share any concerns beforehand so the session can be adapted.",
    tags: ["safe", "safety", "epilepsy", "pregnant", "contraindication", "risk"],
    url: `${SITE_URL}/sound-healing.html#faq`,
  },
  {
    id: "prepare",
    question: "How should I prepare before a session?",
    answer:
      "Set an intention if surrendering is hard for you. Stay hydrated — sound moves through water, and your body is about 70% water. Avoid heavy meals for at least two hours beforehand. Come open to whatever emotions arise. If you tend to feel sensitive, mention it so grounding can be done first.",
    tags: ["prepare", "before", "intention", "hydrate", "ready"],
    url: `${SITE_URL}/sound-healing.html#faq`,
  },
  {
    id: "remote-distance",
    question: "Can sound healing be done remotely?",
    answer:
      "Yes. Sound and intention travel beyond physical space into the quantum field, much like prayer or distance Reiki — the energetic body can absorb these frequencies without physical presence. Om Sacred Space offers online Distance Healing sessions, with tiers ranging from a single Foundations session (45 EUR) to multi-session Awakening, Integration, and Transformation packages.",
    tags: ["remote", "distance", "online", "far", "anywhere", "session", "sessions", "virtual", "zoom"],
    url: `${SITE_URL}/sound-healing.html#distance`,
  },
  {
    id: "integrate-daily-life",
    question: "How do I integrate the healing effects into daily life?",
    answer:
      "Drink water to help flush released energy. Spend time in nature to recalibrate with the Earth's rhythm. Meditate or journal to process any insights that surface. Avoid overstimulation so the frequencies can settle. Keep sound in your day — mantras, humming, or binaural beats — to sustain your vibrational shift.",
    tags: ["integrate", "daily", "aftercare", "after", "maintain", "lifestyle"],
    url: `${SITE_URL}/sound-healing.html#faq`,
  },
];

// Short brand summary used when no specific Q&A matches well.
export const FALLBACK = {
  id: "about-om-sacred-space",
  question: "About Om Sacred Space",
  answer:
    "Om Sacred Space offers sound healing, energy work, sacred sound baths, and chakra energizing with Suhana — in person and through online Distance Healing. There are five-session immersive programs, a Sri Yantra Guidebook, and a sacred retreat in the works. For anything specific, reach out at " +
    CONTACT_EMAIL +
    ".",
  tags: ["about", "om sacred space", "suhana", "contact"],
  url: SITE_URL,
};

// Wellness disclaimer appended to answers.
export const DISCLAIMER =
  "Note: Sound healing is a complementary wellness practice and is not a substitute for professional medical or mental-health care.";
