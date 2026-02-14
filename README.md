# 🎨 Real-time AI Voice Conversation Interface - FREE!

An engaging real-time AI interface built with React that enables voice-based conversations with children about images. **100% Free - uses Groq's free LLM API!**

## ✨ Why This Project?

- **Completely Free**: Uses Groq API (free tier) + browser native speech synthesis
- **No Credit Card**: Groq's free tier requires nothing
- **Responsive**: Works on desktop, tablet, and mobile
- **Educational**: Perfect for interactive learning

## 🌟 Key Features

- **Image Display System**: Engaging carousel with diverse educational images
- **Voice Conversation**: Real-time speech recognition
- **AI-Powered**: Groq's Mixtral-8x7b LLM (free!)
- **Text-to-Speech**: Browser native speech synthesis (free!)
- **Tool Calling**: AI provides interactive feedback
- **1-Minute Timer**: Auto-managed conversation time
- **Beautiful UI**: Gradient design with smooth animations

## 🛠️ Tech Stack

- **Frontend**: React 19.2 + TypeScript
- **Build**: Vite 5.1
- **AI**: Groq API - Mixtral-8x7b (FREE)
- **TTS**: Browser Speech Synthesis (FREE)
- **Voice**: Web Speech API (FREE)

## 💰 Cost

**$0 - Completely Free!**

## 🚀 Quick Start

### 1. Get Your Free Groq Key (2 minutes)

1. Visit [https://console.groq.com/keys](https://console.groq.com/keys)
2. Sign up (free, no credit card)
3. Copy your API key

### 2. Setup Project

```bash
# Clone and navigate
cd /home/kunal-singh/code/assignment-zubi

# Install
npm install

# Create .env.local
echo "VITE_GROQ_API_KEY=sk_your_key_here" > .env.local

# Run
npm run dev
```

3. Open `http://localhost:5173`

## 📖 How It Works

1. **See Image** - Beautiful educational image displayed
2. **Start Conversation** - Click button, allow microphone
3. **AI Greets** - AI says hello about the image
4. **You Speak** - Your speech is recognized automatically
5. **AI Responds** - Text + audio response via browser TTS
6. **Continue** - Keep talking for up to 60 seconds
7. **Change Image** - Use buttons to pick new images

## 🎯 Build & Deploy

### Development
```bash
npm run dev
```

### Production
```bash
npm run build            # Creates dist/
npm run preview          # Test locally
# Deploy dist/ folder anywhere (Netlify, Vercel, etc)
```

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Full |
| Firefox | ✅ Full |
| Safari  | ✅ Full |
| Edge    | ✅ Full |

## 🐛 Troubleshooting

**"API key not configured"**
- Create `.env.local` file
- Format: `VITE_GROQ_API_KEY=sk_your_actual_key`
- Restart dev server

**No microphone access**
- Check browser permissions
- Grant microphone access when prompted
- Try different browser

**No audio response**
- Check system volume
- Ensure browser speech synthesis enabled
- Try different browser

## 📁 Project Files

- `src/components/` - React components
- `src/services/` - Groq API integration
- `src/hooks/` - Audio & playback logic
- `src/styles/` - Beautiful CSS
- `.env.local` - Your API key (create this!)
- `package.json` - Dependencies

## 🔗 Links

- **Groq API**: [https://console.groq.com](https://console.groq.com)
- **React Docs**: [https://react.dev](https://react.dev)
- **Vite Guide**: [https://vite.dev](https://vite.dev)

## ✅ What's Included

✅ Voice recognition (Web Speech API)
✅ AI responses (Groq free LLM)
✅ Text-to-speech (Browser native)
✅ Beautiful responsive UI
✅ Real-time conversation
✅ Image carousel
✅ Message history
✅ Status indicators
✅ Error handling
✅ Tool-based feedback

## 🎉 Ready to Use!

Everything is set up. Just get your free Groq key and you're good to go!

**Total setup time: 5 minutes**
**Total cost: $0**
