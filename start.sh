#!/bin/bash
# Quick Start Guide for AI Voice Conversation Interface

echo "🚀 AI Voice Conversation Interface - Startup Script"
echo "=================================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo ""
    echo "⚠️  .env.local file not found!"
    echo "Please create .env.local with your OpenAI API key:"
    echo ""
    echo "    VITE_OPENAI_API_KEY=sk-your-api-key-here"
    echo ""
    echo "Get your API key from: https://platform.openai.com/api-keys"
    echo ""
else
    echo "✅ .env.local configured"
fi

echo ""
echo "🎯 Starting development server..."
echo "The app will be available at: http://localhost:5173"
echo ""
npm run dev
