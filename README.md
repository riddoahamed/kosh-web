# Kosh

Kosh is a Bangladesh-focused financial literacy app for beta learners. It includes a money level check, personalized learning track, modules, tools, gamification, and an optional AI assistant.

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Create local environment variables:

```bash
cp .env.example .env.local
```

3. Fill in:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

4. Start the app:

```bash
npm run dev
```

## Checks

```bash
npm run build
npm run lint
```

`npm run build` is the launch gate. `npm run lint` currently catches stricter React 19 cleanup work and should be made green before a wider launch.

## Supabase For Beta

The app currently has local-first auth code for pilot testing, but a public beta with real users should use Supabase Auth before launch.

Supabase's built-in email sender is only for testing and is limited. For beta users:

- Configure a custom SMTP provider in Supabase Auth.
- Use a branded sender such as `Kosh <no-reply@auth.your-domain.com>`.
- Configure SPF, DKIM, and DMARC with the email provider.
- Edit Supabase Auth email templates for Kosh-branded confirmation and recovery emails.
- Add production URLs in Supabase Auth URL configuration.

Recommended beta auth setup:

- Email + password accounts.
- Email confirmation enabled after custom SMTP is configured.
- Password recovery enabled.
- Longer session duration so testers do not repeatedly trigger emails.
- Separate marketing/waitlist emails from auth emails.

## AI Assistant

The assistant is served through the Supabase Edge Function at:

```text
supabase/functions/kosh-assistant
```

Set this secret in Supabase, not in `.env.local`:

```bash
GROQ_API_KEY=
```

If the edge function or key is missing, the product should still work; the assistant is supportive, not part of the critical learning path.

## Beta Launch Notes

For the first 100 users, prioritize feedback on:

- Whether the money check result feels accurate.
- Whether modules feel too long, too short, or too wordy.
- Which missing topics users ask for.
- Whether gamification feels motivating or distracting.
- Whether tools are useful enough to share.

Do not launch real money mango redemption until backend verification, fraud controls, and operational payout handling exist.
