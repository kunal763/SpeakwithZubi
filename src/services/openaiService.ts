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

Your style:
- Friendly and encouraging
- Simple language for children
- Short responses (1-3 sentences max)
- Ask specific questions about what's in the image
- Give enthusiastic feedback about their observations

${isInitial ? 'START with a warm greeting and ask what they see, notice, or like about this specific image!' : 'Continue discussing the visual content of the image. Reference what they said about it!'}`;

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

    // Generate encouraging feedback as tool responses
    const toolCalls: any[] = [];
    
    // Add an update_ui tool call with encouraging message
    if (responseText.includes('Great') || responseText.includes('Wonderful') || responseText.includes('Excellent')) {
      toolCalls.push({
        type: 'update_ui',
        message: '⭐ ' + responseText
      });
    }

    return {
      success: true,
      text: responseText,
      toolCalls: toolCalls
    };
  } catch (error: any) {
    console.error('Groq API Error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.error?.message || 'Failed to get response from Groq API. Make sure your API key is valid and you have rate limit availability.'
    };
  }
};

