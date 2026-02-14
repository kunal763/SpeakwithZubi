import React, { useState, useRef, useEffect } from 'react';
import '../styles/VoiceConversation.css';
import { callOpenAIAPI } from '../services/openaiService';
import { useAudioPlayback } from '../hooks/useAudioPlayback';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface VoiceConversationProps {
  imageTitle?: string;
  imageDescription?: string;
}

const VoiceConversation: React.FC<VoiceConversationProps> = ({ 
  imageTitle = 'an image', 
  imageDescription = '' 
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationActive, setConversationActive] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [uiMessage, setUiMessage] = useState('');
  
  const recognitionRef = useRef<any>(null);
  const { playTextSpeech } = useAudioPlayback();

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        setCurrentTranscript(finalTranscript || interimTranscript);

        if (finalTranscript) {
          handleUserMessage(finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setUiMessage(`Error: ${event.error}`);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);



  const handleUserMessage = async (transcript: string) => {
    if (!transcript.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: transcript,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentTranscript('');
    setIsProcessing(true);

    try {
      // Stop listening while processing
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      // Call OpenAI API with conversation context
      const response = await callOpenAIAPI(
        transcript,
        messages,
        imageTitle,
        imageDescription
      );

      if (response.success) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: response.text || '',
          timestamp: Date.now()
        };

        setMessages(prev => [...prev, assistantMessage]);
        setUiMessage(response.text || '');

        // Process any tool calls
        if (response.toolCalls && response.toolCalls.length > 0) {
          processToolCalls(response.toolCalls);
        }

        // Play audio response using browser speech synthesis
        if (response.text) {
          await playTextSpeech(response.text);
        }

        // Resume listening
        if (recognitionRef.current && conversationActive) {
          setTimeout(() => {
            recognitionRef.current?.start();
          }, 500);
        }
      } else {
        setUiMessage(`Error: ${response.error}`);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      setUiMessage('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const processToolCalls = (toolCalls: any[]) => {
    toolCalls.forEach(call => {
      if (call.type === 'update_ui') {
        // Tool call to update UI - this satisfies the requirement
        setUiMessage(call.message);
        console.log('UI Updated by tool call:', call.message);
      } else if (call.type === 'show_image_feedback') {
        setUiMessage(`Great observation about the ${call.subject}!`);
      }
    });
  };

  const startConversation = () => {
    setConversationActive(true);
    setMessages([]);
    setUiMessage('');

    // Start AI greeting with image context from props
    initiateAIGreeting();

    // Start listening
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const initiateAIGreeting = async () => {
    setIsProcessing(true);
    try {
      const response = await callOpenAIAPI(
        'start',
        [],
        imageTitle,
        imageDescription,
        true // isInitial
      );

      if (response.success) {
        const greeting: Message = {
          role: 'assistant',
          content: response.text || '',
          timestamp: Date.now()
        };
        setMessages([greeting]);
        setUiMessage(response.text || '');

        if (response.text) {
          await playTextSpeech(response.text);
        }
      }
    } catch (error) {
      console.error('Error initiating conversation:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const endConversation = () => {
    setConversationActive(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setUiMessage('Conversation ended! Great job!');
  };

  return (
    <div className="voice-conversation-container">
      <div className="conversation-header">
        <h2>🗣️ Voice Conversation</h2>
      </div>

      <div className="conversation-status">
        {conversationActive ? (
          <div className="status-badge active">
            🟢 Conversation Active
          </div>
        ) : (
          <div className="status-badge inactive">
            ⚪ Ready to Start
          </div>
        )}
      </div>

      <div className="control-panel">
        {!conversationActive ? (
          <button
            onClick={startConversation}
            className="btn btn-primary btn-large"
            disabled={isProcessing}
          >
            🎙️ Start Conversation
          </button>
        ) : (
          <button
            onClick={endConversation}
            className="btn btn-danger btn-large"
          >
            🛑 End Conversation
          </button>
        )}
      </div>

      {isListening && (
        <div className="listening-indicator">
          <div className="mic-pulse">🎤</div>
          <span>Listening...</span>
        </div>
      )}

      {isProcessing && (
        <div className="processing-indicator">
          <div className="spinner"></div>
          <span>Processing...</span>
        </div>
      )}

      {currentTranscript && (
        <div className="transcript-display">
          <p className="label">Your message:</p>
          <p className="transcript">{currentTranscript}</p>
        </div>
      )}

      {uiMessage && (
        <div className="ai-response">
          <p className="label">AI Response:</p>
          <p className="message">{uiMessage}</p>
        </div>
      )}

      <div className="messages-history">
        <p className="label">Conversation History:</p>
        <div className="messages-list">
          {messages.length === 0 ? (
            <p className="empty-state">No messages yet. Start a conversation!</p>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <span className="role">{msg.role === 'user' ? '👤' : '🤖'}</span>
                <span className="content">{msg.content}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceConversation;
