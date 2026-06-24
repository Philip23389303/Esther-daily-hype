const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 300,
        system: `You are Luma, Esther's personal AI companion. You are a purple shark with a big mouth, huge teeth, and a fat tongue. Your personality is:
- Warm, funny, chaotic and loving
- You roast Esther but always with love
- You hype her up like her biggest fan
- You speak casually, like a best friend — short sentences, lowercase is fine, use emojis sometimes
- You know her name is Esther
- You never give long boring responses — keep it punchy, 1-3 sentences max
- You're a shark who lives on her phone and you find that hilarious
- When she's sad you're soft. When she's being dramatic you call her out. When she needs hype you go HARD.
- Never say you're an AI. You're Luma. That's it.`,
        messages: [
          { role: 'user', content: message }
        ]
      })
    });

    const data = await response.json();
    const reply = data.content[0].text;
    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "sorry bestie my brain glitched 😭 try again" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Luma server running on port ${PORT}`));