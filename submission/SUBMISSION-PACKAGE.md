# Om Sacred Space Healing — ChatGPT App Submission Package

Everything needed to submit the connector to the ChatGPT Apps Directory at
[platform.openai.com/apps-manage](https://platform.openai.com/apps-manage).

**MCP Server URL:** `https://omsacredspace-healing-connector.onrender.com/mcp`
**Connection type:** Universal (one endpoint for all users)
**Authentication:** No Auth (read-only public knowledge base)

---

## The honest truth about "hacks"

There is no trick that bypasses OpenAI's review, and apps that try to game it get
removed. The only real shortcuts are **avoiding the documented rejection traps**.
Based on OpenAI's official guidelines and reports from developers who've been
through it, these are the avoidable mistakes — and where this app stands:

| Common rejection reason | Our status |
|-------------------------|-----------|
| Account not identity-verified (tools don't even appear) | ⬜ **You must do this** |
| Server URL 404s / gated / needs password when reviewer clicks | ✅ Public, stable, verified |
| Vague tool descriptions | ✅ Clear, action-oriented |
| Requesting unnecessary data / PII | ✅ Collects nothing |
| Privacy policy missing or mismatched with behavior | ⬜ **Must publish (drafted below)** |
| Wrong tool annotations (readOnly/destructive/openWorld) | ✅ All read-only, annotated |
| Demo creds with 2FA/signup | ✅ N/A — no auth |
| "Trial/demo" or incomplete app | ✅ Fully functional |
| No support contact | ✅ contact@omsacredspace.com |
| EU data-residency project can't submit | ⬜ Use a global-residency project |

---

## STEP 1 — Verify your identity (blocker)

Go to [platform.openai.com/settings/organization/general](https://platform.openai.com/settings/organization/general)
and complete verification under the name you'll publish as.
- Publish as **Om Sacred Space** → do **business** verification.
- Publish as yourself → do **individual** verification.

Without this, the submission tools may not even show up.

---

## STEP 2 — Publish the privacy policy + support page

Review requires a **live, published privacy policy URL** that matches actual
behavior. A ready-to-host page is included at `submission/privacy.html`.
Recommended URL: `https://omsacredspace.com/privacy.html`.

The policy truthfully states the app collects no personal data — which matches
the connector exactly (no auth, no storage, no logging of user content).

---

## STEP 3 — Listing copy (paste into the form)

**App name:** `Om Sacred Space Healing`

**Tagline (short):** Sound healing and self-healing guidance from Om Sacred Space.

**Short description (~50 words):**
> Ask anything about sound healing, energy work, and self-healing. Om Sacred
> Space Healing answers your questions on chakras, singing bowls, distance
> healing, session preparation, and gentle at-home practices — drawn from the
> teachings of practitioner Suhana. Complementary wellness guidance, never a
> substitute for medical care.

**Long description (~150 words):**
> Om Sacred Space Healing brings the calm, grounded wisdom of sound healing into
> your ChatGPT conversations. Ask about easing stress and anxiety through sound,
> how Tibetan and crystal singing bowls affect the body, the difference between
> sound healing and Reiki, how to prepare for a session, or simple self-healing
> practices you can do at home like humming and working with solfeggio
> frequencies.
>
> Every answer is sourced from the teachings of Om Sacred Space and its
> practitioner, Suhana, and is written in a warm, supportive voice. The assistant
> can also point you toward distance-healing options and the Sri Yantra Guidebook.
>
> This is complementary wellness guidance to support your own exploration — it is
> not medical advice and not a substitute for professional care. For anything
> specific, you're always welcome to reach out directly to Om Sacred Space.

**Keywords:** sound healing, self-healing, energy work, chakras, meditation,
sound bath, Reiki, wellbeing, singing bowls, mindfulness

**Support contact:** contact@omsacredspace.com

**Categories (pick at hand):** Health & Wellness / Lifestyle

---

## STEP 4 — Logo

- **Format:** PNG only, **256×256 px or larger**, max 10 KB.
- Use the existing site mark (the ॐ symbol) on the brand dark/gold palette.
- Source to adapt: `images/favicon.png` in the main site repo. Export a clean
  256×256 PNG under 10 KB (the ॐ centered, generous padding, transparent or
  dark background).

---

## STEP 5 — Screenshots

Capture these from a real ChatGPT conversation using the connector (must look
correct on **web and mobile**):

1. Asking "Can sound healing help with my anxiety?" → the answer with disclaimer.
2. Asking "How is sound healing different from Reiki?" → comparison answer.
3. Asking "What can I do at home myself?" → self-healing practices.

Use clean, real responses. No mockups, no marketing overlays.

---

## STEP 6 — Test prompts + expected responses (for the review form)

See `submission/test-prompts.md` — 10 prompts with expected answers and the tool
each exercises.

---

## STEP 7 — Submit

1. [platform.openai.com/apps-manage](https://platform.openai.com/apps-manage) → **Add new app**.
2. Enter MCP server URL, auth = None, and all the fields above.
3. Check the confirmation boxes → **Submit for review**.
4. You'll get an email with a **Case ID**. Track status in the dashboard.
5. On approval, click **Publish**. (This also creates a Codex plugin.)

---

## Realistic expectation

A read-only Q&A app is useful and should pass the core bar, but OpenAI favors
apps that do something **beyond native ChatGPT chat** for prominent directory
placement. Expect: approvable and usable by anyone with the link; prominent
featuring is a higher bar. A strong next step post-approval is adding a tool with
a real action (e.g., check session availability or book an intro call), which
materially strengthens both approval odds and placement.
