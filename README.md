# Scaler Persona Chatbot

Chat with the Scaler founders—Anshuman, Abhimanyu, and Kshitij—each with their own perspective on tech, learning, and building. Think of it as having office hours with three mentors at the same time.

## What's Inside?

- **Three Real Personalities** - Each persona has their own communication style, values, and advice framework based on actual interviews and talks
- **Live Chat** - Ask questions and get thoughtful responses instantly
- **Switch Anytime** - Jump between personas, conversation resets so you can ask each person the same question and compare
- **Smart Suggestions** - Each persona has 3 starter questions tailored to their style
- **Works Everywhere** - Mobile-friendly, works on phone or desktop
- **Falls Back Gracefully** - If the API hits a limit, it uses demo responses (so it always works)

## What You Need

- Node.js (any recent version)
- An API key (see setup below)
- A modern browser

## Getting Started

### 1. Get the Code
```bash
git clone <repo-url>
cd chatbot-app
```

### 2. Install Everything
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### 3. Get an API Key & Set It Up

**Quick setup (using Together AI):**
```bash
cd backend
echo "TOGETHER_API_KEY=your_key_here" > .env
echo "PORT=3001" >> .env
cd ..
```

**Or use Google Gemini instead:**
```bash
cd backend
echo "GOOGLE_GEMINI_API_KEY=your_key_here" > .env
echo "PORT=3001" >> .env
cd ..
```

**Where to get free API keys:**
- **Together AI** (recommended - $25 free): https://www.together.ai
- **Google Gemini**: https://aistudio.google.com/app/apikey

### 4. Run It

```bash
npm run dev
```

Then open:
- **Chat app:** http://localhost:5173
- **API status:** http://localhost:3001/health

### 5. Deploy It

```bash
npm run build
```

Check [DEPLOYMENT.md](./DEPLOYMENT.md) for Vercel setup.

## How It Works

**You ask a question** → **Backend matches your persona** → **Calls the LLM** → **Response comes back**

If the API is down or quota is hit, it falls back to smart demo responses (they're still good ones, just from a curated set).

Here's the flow:
```
Frontend (React) 
    ↓
Backend (Node + Express)
    ↓
LLM (Together AI / Gemini)
    ↓ (success) OR (fallback to demo)
    ↓
Response back to Frontend
```

## The Three Personas

### Anshuman Singh
**CEO, Scaler Academy** - Data-driven, direct, builder mindset. He talks about systems, shipping, and why motivation is overrated.

**Ask him about:** Learning strategies, building fast, scaling, whether bootcamp or college makes sense.

### Abhimanyu Saxena
**Co-founder, InterviewBit** - Strategic, career-focused, thoughtful. He breaks down complex problems and helps you think like a founder.

**Ask him about:** System design, career paths, technical skills, hiring, what makes engineers successful.

### Kshitij Mishra
**Co-founder, Scaler** - Learning specialist, psychology-informed, believes in depth over speed. He talks about how humans actually learn.

**Ask him about:** Retaining knowledge, interview prep, deep learning, building fundamentals.

## File Structure

```
chatbot-app/
├── backend/                    # The brain (Node + Express)
│   ├── server.js              # Handles requests, talks to LLM
│   ├── package.json
│   └── .env                   # Your API key (not committed)
│
├── frontend/                  # The face (React + Vite)
│   ├── src/
│   │   ├── App.jsx           # Main chat component
│   │   └── main.jsx          # React entry point
│   ├── index.html
│   └── package.json
│
├── prompts.md                 # Full system prompts for each persona
├── reflection.md              # What I learned building this
├── API_SETUP.md              # Detailed API key setup guide
├── README.md                 # You are here
└── .gitignore
```

## The Prompts

Each persona has a custom system prompt that includes:
- **Who they are** - Their background and values
- **How they communicate** - Examples of responses
- **What they do well** - Their expertise area
- **What they won't do** - Constraints (no vagueness, no shortcuts, etc.)

See [prompts.md](./prompts.md) for the full text with explanations.

## API Options

We support two LLM providers. Pick one:

### Together AI (Recommended)
- **Free tier:** $25 credits
- **Best for:** Testing, exploration, won't run out of credits fast
- **Setup:** `TOGETHER_API_KEY=your_key`
- **Get key:** https://www.together.ai

### Google Gemini
- **Free tier:** Daily quota (limited but resets)
- **Best for:** Quick testing
- **Setup:** `GOOGLE_GEMINI_API_KEY=your_key`
- **Get key:** https://aistudio.google.com/app/apikey

Both work with the same code—just change the .env file.

## Common Issues

**"I'm getting API errors"**
- Check your API key is correct in `.env`
- Make sure backend is running: `http://localhost:3001/health`
- If quota is hit, it falls back to demo mode (still works, just pre-written responses)

**"Chat isn't connecting"**
- Frontend needs to hit backend at `http://localhost:3001`
- Check proxy in `frontend/vite.config.js` points to `:3001`
- Run both `npm run dev` from root folder (starts both servers)

**"Persona switch isn't working"**
- It clears the conversation when you switch
- If stuck, refresh the page

**"Messages aren't showing"**
- Clear browser cache: Command+Shift+Delete on Mac
- Try a different browser (or incognito mode)

## Technical Details (If You Care)

**Frontend:**
- React 18 for the chat UI
- Vite for lightning-fast dev experience
- Inline CSS (no external stylesheets)
- Responsive design works on phone too

**Backend:**
- Express server, runs on port 3001
- CORS enabled so frontend can talk to it
- Input validation (message can't be empty, max 500 chars)
- Error handling with graceful fallback to demo mode
- Health check endpoint at `/health`

**LLM Integration:**
- Sends conversation history to maintain context
- System prompt includes persona's instructions
- If API fails, returns demo response (hardcoded but realistic)
- Logs API calls for debugging

## Learning from This Project

See [reflection.md](./reflection.md) for the full breakdown of:
- What worked well in prompt design
- How the GIGO principle (garbage in = garbage out) applied
- Mistakes I made and how to avoid them
- Ideas for improvements

## What I'd Do Differently Next Time

1. **Use structured outputs** from the LLM (JSON) instead of free text
2. **Add conversation persistence** (save chats to database)
3. **Implement rate limiting** (prevent abuse)
4. **Add user analytics** (track which questions users ask)
5. **Support more personas** (add more founders/experts)
6. **Fine-tune the model** instead of just using system prompts

## Want to Contribute?

Open to suggestions. Feel free to:
- Add more personas
- Improve system prompts
- Add features
- Report bugs

## Built With

- **React 18** - UI framework
- **Vite 5** - Build tool
- **Express 4** - Backend framework
- **Together AI / Google Gemini** - LLM
- **CSS3** - Styling (no frameworks, just vanilla CSS)

## License

MIT - Use it however you want

---

**Questions?** Check [API_SETUP.md](./API_SETUP.md) for more details on API configuration, or see [prompts.md](./prompts.md) to understand how each persona works.
