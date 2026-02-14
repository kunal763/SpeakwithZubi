# 🚀 Getting Started with FREE Groq API Setup

## Your AI Voice App - Completely Free!

This guide will get you up and running in 5 minutes with **zero cost**.

---

## Step 1: Get Your Free Groq API Key (2 minutes)

### What is Groq?
Groq is a fast inference service with a generous free tier. Perfect for this project!

### Getting the Key

1. **Go to Groq Console**
   - Visit: https://console.groq.com/keys
   - (Bookmark this!)

2. **Create Account (Free)**
   - Click "Sign up"
   - Fill out form
   - **No credit card required!**
   - Verify email

3. **Generate API Key**
   - You're now in the console
   - Look for "API Keys" section
   - Click "Generate Key"
   - Copy the key (starts with `gsk_`)

4. **Save It Somewhere Safe**
   - ⚠️ Don't share this key
   - Store it securely
   - You'll need it next

---

## Step 2: Setup Your Project (1 minute)

### Create .env.local File

In the project folder, create a file called `.env.local`:

```bash
# Linux/Mac
echo "VITE_GROQ_API_KEY=gsk_your_key_here" > .env.local

# Windows (PowerShell)
echo "VITE_GROQ_API_KEY=gsk_your_key_here" | Out-File -Encoding utf8 .env.local
```

**Replace `gsk_your_key_here` with your actual key!**

### Verify File Created

```bash
cat .env.local  # Should show your key
```

---

## Step 3: Install & Run (2 minutes)

### Install Dependencies

```bash
npm install
```

### Start the App

```bash
npm run dev
```

### Open in Browser

- The terminal will show a URL like `http://localhost:5173`
- Click it or paste in browser
- **Allow microphone access when prompted**

---

## Step 4: Use the App!

1. **View Image** - Beautiful educational image displayed
2. **Click "🎙️ Start Conversation"**
3. **Speak** - Tell the AI about the image
4. **Listen** - AI responds with voice + text
5. **Keep talking** - Conversation lasts 60 seconds
6. **Enjoy!** - Try different images, have fun learning!

---

## 🎉 That's It!

You now have a working AI voice app with:
- ✅ Advanced LLM (Mixtral-8x7b)
- ✅ Voice recognition
- ✅ AI responses with audio
- ✅ Beautiful interface
- ✅ Zero cost!

---

## 💡 Tips & Tricks

### Tip 1: Groq Free Tier Limits
- **Rate limit**: Current limit is generous (check console)
- **If you hit limit**: Wait a moment and retry
- **Unlimited usage available**: Free tier can be used indefinitely

### Tip 2: Testing the App
- Try describing what you see
- Ask questions about the image
- The AI will respond naturally
- Change images with the buttons

### Tip 3: Microphone Issues?
- Check browser settings
- Grant microphone permission
- Try Chrome if nothing works
- Ensure you're using modern browser

### Tip 4: Deploying Online
```bash
# Build app
npm run build

# Creates 'dist' folder
# Deploy dist/ to:
# - Netlify (drag & drop)
# - Vercel (git connected)
# - GitHub Pages
# - Any static host

# Set environment variable:
# VITE_GROQ_API_KEY=your_key_here
```

---

## 🆘 Troubleshooting

### "API key not configured"
**Problem**: App says API key missing

**Solution**:
1. Open `.env.local` file (in project root)
2. Check if `VITE_GROQ_API_KEY` is there
3. Format should be: `VITE_GROQ_API_KEY=gsk_xxxxxx`
4. Save file
5. Restart dev server

### "Rate limit exceeded"
**Problem**: Getting rate limit error

**Solution**:
1. Wait 30 seconds
2. Try again
3. Groq has generous free limits
4. If persistent, check console.groq.com/keys

### No microphone sound
**Problem**: Can't hear responses

**Solution**:
1. Check system volume (not muted)
2. Check browser volume settings
3. Try different browser
4. Ensure browser speech synthesis enabled
5. Check browser console for errors

### Microphone not working
**Problem**: "Permission denied" or mic won't record

**Solution**:
1. Refresh page
2. Allow microphone when prompted
3. Check browser settings → Privacy
4. Grant microphone access
5. Try different browser (Chrome recommended)

### Images not loading
**Problem**: Black image boxes

**Solution**:
1. Check internet connection
2. Wait for images to load
3. Click Random button to try other images
4. Refresh page

---

## 🔗 Useful Links

| Link | Purpose |
|------|---------|
| https://console.groq.com | Groq API dashboard |
| https://console.groq.com/keys | Get your API key |
| https://console.groq.com/docs | API documentation |
| http://localhost:5173 | Your app (after npm run dev) |

---

## 📚 Next Steps

### Want to customize?

Edit these files:

**Change AI Personality**
- File: `src/services/openaiService.ts`
- Section: `systemPrompt` variable
- Add instructions for how AI should behave

**Add More Images**
- File: `src/components/ImageDisplay.tsx`
- Section: `images` array
- Add more image URLs

**Adjust Timer**
- File: `src/components/VoiceConversation.tsx`
- Line: `const [timeRemaining, setTimeRemaining] = useState(60);`
- Change 60 to other number (seconds)

**Change AI Speed/Temperature**
- File: `src/services/openaiService.ts`
- Adjust `temperature` (0-1, higher = more creative)
- Adjust `max_tokens` (150 = concise)

---

## ✨ Features You Have

✅ **Voice Recognition**
- Automatic speech-to-text
- Real-time transcription
- Multiple language support (browser native)

✅ **AI Responses**
- Groq's fast LLM (Mixtral-8x7b)
- Context-aware replies
- Encouraging feedback

✅ **Text-to-Speech**
- Browser native (completely free)
- Natural sounding
- No API charges

✅ **Beautiful UI**
- Responsive design
- Works on mobile too
- Smooth animations
- Gradient styling

✅ **Educational Focus**
- Age-appropriate responses
- Encouragement system
- Interactive learning

---

## 📊 How Much Does This Cost?

| Component | Cost |
|-----------|------|
| Groq API | FREE (generous tier) |
| Browser Speech Synthesis | FREE (built-in) |
| Web Speech API | FREE (built-in) |
| React/Vite | FREE (open source) |
| Hosting | FREE (static deployment) |
| **Total** | **$0** |

---

## 🎓 Learning Resources

- **Groq API Docs**: https://console.groq.com/docs
- **React**: https://react.dev
- **Web Speech API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
- **Vite**: https://vite.dev

---

## 🤝 Questions?

Common issues are covered in troubleshooting above.

If something else happens:
1. Check browser console (F12)
2. Look for error messages
3. Check if `.env.local` exists with correct key
4. Restart dev server

---

## 🎉 Enjoy Your Free AI App!

You've successfully:
- ✅ Set up a free AI voice interface
- ✅ Integrated real-time speech recognition
- ✅ Connected to a powerful free LLM
- ✅ Built a beautiful React application
- ✅ Created something educational and fun!

**Starting setup time: 5 minutes**
**Starting cost: $0**
**Educational value: Priceless!**

Happy learning! 🚀
