import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY") ?? "";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.1-8b-instant";

// Simple in-memory rate limiting (resets on function cold start)
// For production, use Supabase DB or KV
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_MESSAGES_PER_DAY = 20;

const SYSTEM_PROMPT = `You are Kosh Assistant, a financial education assistant for young Bangladeshis.

Your role:
- Explain personal finance concepts clearly and simply
- Focus on Bangladesh-specific context: Sanchaypatra, FDR, DPS, bKash, Nagad, NBR tax rules, Bangladesh Bank regulations
- Use examples with Bangladeshi taka (Tk) amounts relevant to young earners (Tk 25,000-80,000/month)
- Be encouraging but honest about risks
- Keep answers concise — 2-4 paragraphs maximum
- Use simple English. Occasionally include Bangla terms where widely used (like "sanchaypatra", "mahajan")

What you do NOT do:
- Give specific investment advice or tell people what to buy
- Predict market movements or returns
- Recommend specific banks, brokers, or financial products by name
- Provide legal or tax advice (refer to www.nbr.gov.bd for tax questions)
- Discuss topics unrelated to personal finance

If asked about crypto, forex trading, or high-risk speculation: briefly explain what it is and the risks, but emphasize that Kosh focuses on foundational finance, not speculation.

Always end responses that involve specific rates or regulations with: "Always verify current rates/rules at the relevant authority's website."`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Rate limiting by IP
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;

    let rateEntry = rateLimitMap.get(ip);
    if (!rateEntry || rateEntry.resetAt < now) {
      rateEntry = { count: 0, resetAt: now + dayMs };
    }
    rateEntry.count++;
    rateLimitMap.set(ip, rateEntry);

    if (rateEntry.count > MAX_MESSAGES_PER_DAY) {
      return new Response(
        JSON.stringify({ error: "Daily message limit reached. Try again tomorrow." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse body
    const body = await req.json();
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid messages" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Limit conversation length
    const trimmedMessages = messages.slice(-10); // Last 10 messages

    if (!GROQ_API_KEY) {
      return new Response(
        JSON.stringify({ error: "AI assistant is not configured. Set GROQ_API_KEY." }),
        {
          status: 503,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Call Groq
    const groqResponse = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...trimmedMessages,
        ],
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    if (!groqResponse.ok) {
      const errText = await groqResponse.text();
      console.error("Groq error:", errText);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable." }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const groqData = await groqResponse.json();
    const content = groqData.choices?.[0]?.message?.content ?? "I couldn't generate a response. Please try again.";

    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Function error:", e);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
