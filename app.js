// ==============================
// PASTE YOUR RENDER URL HERE
// e.g. https://luma-server.onrender.com
// ==============================
const SERVER_URL = 'YOUR_RENDER_URL_HERE';

const responses = {
  enc: [
    "Okay but real talk — you walked in today and the whole vibe shifted. That's a YOU thing. 💜",
    "Esther. ESTHER. You are THAT girl. Act like it bestie.",
    "Whatever you're doubting yourself about rn — stop. You've already survived harder. You're built different.",
    "The audacity to exist and be that amazing. Iconic behaviour honestly.",
    "Not me rooting for you harder than a sports mum at a school event. GO. YOU. GO.",
  ],
  laugh: [
    "POV: me watching you try to be normal for five minutes. Incredible attempt. 0 success. 10/10 entertained.",
    "You're the main character but like the one who trips UP the stairs. Graceful. Elegant. A vision.",
    "Babe I'm a shark who lives on your phone. We're both doing great 😭",
    "The way your situationship has more plot twists than a Netflix series. I'm invested ngl.",
    "Okay your villain era looks suspiciously like eating snacks and watching tiktok at 1am. Same tbh.",
    // ADD YOUR PERSONAL JOKES + TIKTOK TRENDS HERE
  ],
  roast: [
    "You have the audacity of someone who's never been wrong in their life… despite being wrong constantly. Respect.",
    "I love you but your main character syndrome is running laps. You ARE the side character in at least three people's stories rn.",
    "Bestie your sleep schedule is a cry for help and your 'just five more minutes' has never once been five minutes.",
    "The way you sent that text and then put your phone face down like YOU didn't start it 💀",
    "You're the most 'I'll do it tomorrow' person I know and somehow you're still thriving??? Explain???",
  ]
};

const greetings = {
  enc: "okay okay HYPE MODE activated 💪",
  laugh: "hold on lemme find something chaotic...",
  roast: "bestie are you sure you're ready 💀",
  chat: "luma is thinking... 🦈"
};

// Send message to real Claude AI via your Render server
async function askLuma(message) {
  const bubble = document.getElementById('bubble');
  const bubbleText = document.getElementById('bubbleText');
  const greeting = document.getElementById('greeting');

  bubble.classList.remove('show');
  greeting.textContent = 'luma is thinking... 🦈';

  try {
    const response = await fetch(`${SERVER_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    bubbleText.textContent = data.reply;
    bubble.classList.add('show');
  } catch (err) {
    bubbleText.textContent = "sorry bestie my brain glitched 😭 try again";
    bubble.classList.add('show');
  }

  setTimeout(() => {
    greeting.textContent = 'Good evening, Esther 🦈';
  }, 6000);
}

// Button responses — each button sends a specific prompt to real AI
function respond(type) {
  const prompts = {
    enc: "Hype me up right now, I need it",
    laugh: "Make me laugh, I need something funny",
    roast: "Roast me lovingly, I can take it"
  };

  document.getElementById('greeting').textContent = greetings[type];
  askLuma(prompts[type]);
}

// Chat input — Esther can type anything
function sendChat() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message) return;
  input.value = '';
  askLuma(message);
}

// Send on Enter key
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('chatInput');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendChat();
    });
  }

  // Shark tap
  const sharkWrap = document.getElementById('sharkWrap');
  if (sharkWrap) {
    sharkWrap.addEventListener('click', () => {
      sharkWrap.style.transform = 'scale(1.1) rotate(5deg)';
      setTimeout(() => { sharkWrap.style.transform = ''; }, 300);
      askLuma("Say something random and unhinged to me right now");
    });
  }

  // Time-based greeting
  const hour = new Date().getHours();
  let timeGreeting = 'Good evening';
  if (hour < 12) timeGreeting = 'Good morning';
  else if (hour < 17) timeGreeting = 'Good afternoon';
  document.getElementById('greeting').textContent = `${timeGreeting}, Esther 🦈`;
});