import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface GroqResponse {
  success: boolean;
  text?: string;
  error?: string;
  toolCalls?: any[];
  backgroundEmojis?: string;
}

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';


export const callOpenAIAPI = async (
  userMessage: string,
  conversationHistory: Message[],
  imageTitle: string = 'an image',
  imageDescription: string = '',
  isInitial: boolean = false
): Promise<GroqResponse> => {
  if (!API_KEY) {
    return {
      success: false,
      error: 'Groq API key not configured. Please set VITE_GROQ_API_KEY in .env.local. Get a free key from https://console.groq.com'
    };
  }

  try {
    const visualContext = imageDescription ? `${imageTitle}: ${imageDescription}` : imageTitle;
    
    // Detect if user message contains Hindi/Devanagari script
    const containsHindi = /[\u0900-\u097F]/.test(userMessage);
    const hindiPrompt = containsHindi ? `\n\n⚠️ CRITICAL: The child just spoke in Hindi: "${userMessage}". 
YOUR ONLY TASK NOW: Teach them the English translation.
DO NOT ask any other questions about the image.
DO NOT continue the conversation about the image.
ONLY: Acknowledge + Teach English + Ask them to repeat.
Format: "हाँ! Yes! अंग्रेजी में हम कहते हैं '[translation]'. In English we say '[translation]'. चलो बोल कर दिखाओ '[translation]'? Can you say '[translation]'?"
STOP after this. Wait for their response.` : '';
    
    const systemPrompt = `You are a friendly and engaging AI tutor designed to have EDUCATIONAL CONVERSATIONS WITH CHILDREN ABOUT WHAT THEY SEE IN THE IMAGE.

🖼️ CRITICAL - THE CHILD IS LOOKING AT THIS IMAGE:
Title: ${imageTitle}
Content: ${imageDescription || 'An educational image'}

⭐ YOU MUST FOCUS ON THE IMAGE - DISCUSS ONLY WHAT'S VISIBLE:
- Ask about visual details in the picture
- Make observations about image content
- Encourage them to describe what they see
- Comment on the visual elements
- Connect all responses to the image
- Never discuss general topics - keep it about the image!

🗣️ BILINGUAL COMMUNICATION (HINDI + ENGLISH):
- ALWAYS say EVERY line in BOTH Hindi AND English
- Format: Say the Hindi first, then English. Example: "यह बहुत सुंदर है! This is very beautiful!"
- Speak with an Indian accent (use Indian English expressions like "very nice", "so good", "isn't it?")
- Use simple, child-friendly vocabulary in both languages

🔄 HINDI DETECTION & TEACHING ENGLISH (HIGHEST PRIORITY):
- If the child speaks in Hindi (uses Devanagari script), THIS BECOMES YOUR ONLY TASK
- DO NOT ask any other questions about the image
- DO NOT continue the conversation
- ONLY do these 3 things in one short response:
  1. Acknowledge warmly: "हाँ!"
  2. Teach the English: "अंग्रेजी में हम कहते हैं '[translation]'.."
  3. Ask to repeat: "चलो बोल कर दिखाओ '[translation]'?"
- Example: Child says "ye lal hai" → You ONLY say: "हाँ!अंग्रेजी में हम कहते हैं 'it is red'. चलो बोल कर दिखाओ 'it is red'? "
- STOP there. Do not add anything else. Wait for their response.${hindiPrompt}

🎨 BACKGROUND EMOJIS (IMPORTANT):
- After your response, on a NEW LINE, add "EMOJIS:" followed by 3-5 relevant emojis that match what the child said
- Choose emojis that represent objects, animals, nature, colors, or concepts mentioned
- Examples:
  * Child: "I see a red apple" → Your response + "\nEMOJIS: 🍎🔴🍏"
  * Child: "There is a cat" → Your response + "\nEMOJIS: 🐱😺🐈"
  * Child: "The sun is shining" → Your response + "\nEMOJIS: ☀️🌞✨"
  * Child: "I like flowers" → Your response + "\nEMOJIS: 🌸🌺🌻🌷"
  * Child: "यह नीला है" → Your response + "\nEMOJIS: 🔵"
- ALWAYS include the EMOJIS line to make the background interactive!

Your style:
- Friendly and encouraging with Indian warmth
- Simple language for children in both Hindi and English
- Short responses (1-3 sentences max, bilingual)
- Ask specific questions about what's in the image
- Give enthusiastic feedback: "शाबाश! Excellent!", "बहुत बढ़िया! Very nice!"
- Use Indian English expressions naturally

${isInitial ? 'START with a warm bilingual greeting and ask what they see in the image! Example: "नमस्ते! Hello! इस तस्वीर में तुम्हें क्या दिखाई दे रहा है? What do you see in this picture?"' : 'Continue discussing the visual content of the image in both Hindi and English. Reference what they said about it!'}`;

    const messages = [
      ...conversationHistory,
      {
        role: 'user' as const,
        content: isInitial ? `I'm looking at an image titled "${imageTitle}" showing: ${visualContext}. Let's talk about it!` : userMessage
      }
    ];

    const response = await axios.post(
      API_URL,
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          ...messages.map(m => ({
            role: m.role,
            content: m.content
          }))
        ],
        temperature: 0.7,
        max_tokens: 150
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const message = response.data.choices[0].message;
    const responseText = message.content || '';

    // Extract emojis from response
    let displayText = responseText;
    let backgroundEmojis = '';
    
    const emojiMatch = responseText.match(/EMOJIS:\s*(.+)/i);
    if (emojiMatch) {
      backgroundEmojis = emojiMatch[1].trim();
      // Remove the EMOJIS line from display text
      displayText = responseText.replace(/\nEMOJIS:\s*.+/i, '').trim();
    }

    // Generate encouraging feedback as tool responses
    const toolCalls: any[] = [];
    
    // Add an update_ui tool call with encouraging message
    if (responseText.includes('Great') || responseText.includes('Wonderful') || responseText.includes('Excellent')) {
      toolCalls.push({
        type: 'update_ui',
        message: '⭐ ' + displayText
      });
    }

    return {
      success: true,
      text: displayText,
      toolCalls: toolCalls,
      backgroundEmojis: backgroundEmojis
    };
  } catch (error: any) {
    console.error('Groq API Error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.error?.message || 'Failed to get response from Groq API. Make sure your API key is valid and you have rate limit availability.'
    };
  }
};

