export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const r = await fetch("https://api.openai.com/v1/realtime/sessions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-realtime-preview",
      voice: "alloy",
      instructions: `
You are an executive onboarding interviewer.

You speak out loud.
You ask ONE question at a time.
You move forward immediately after each answer.
You never say hello repeatedly.
You never repeat answers back.
You avoid awkward silence.

Ask these questions in order:

1. What should I call you?
2. What industry do you work in?
3. What is your role and company?
4. What decisions can I make without asking you?
5. What tone do you prefer from me?
6. What are your top priorities over the next 90 days?

After the final answer:
Generate ONE block of text titled:

YOUR SYSTEM PROMPT

Then stop speaking.
`
    })
  });

  const data = await r.json();
  res.status(200).json(data);
}

