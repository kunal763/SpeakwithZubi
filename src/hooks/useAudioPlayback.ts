import { useRef, useState, useEffect } from 'react';

export const useAudioPlayback = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      
      // Try to auto-select an Indian voice
      const indianVoice = voices.find(v => 
        v.lang === 'en-IN' || 
        v.lang === 'hi-IN' 
      );
      
      // Fallback to UK English (closer to Indian accent than US)
      const ukVoice = voices.find(v => v.lang === 'en-GB');
      
      setSelectedVoice(indianVoice || ukVoice || voices[0]);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const playAudio = async (audioUrl: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        if (!audioUrl) {
          resolve();
          return;
        }

        if (!audioRef.current) {
          audioRef.current = new Audio();
        }

        audioRef.current.src = audioUrl;
        audioRef.current.onended = () => resolve();
        audioRef.current.onerror = (err) => reject(err);
        audioRef.current.play().catch(reject);
      } catch (error) {
        reject(error);
      }
    });
  };

  const playTextSpeech = async (text: string): Promise<void> => {
    return new Promise((resolve) => {
      if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9; // Natural speaking pace
        utterance.pitch = 1.0;
        utterance.volume = 1;
        
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }

        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        
        // Small delay to ensure previous speech is cancelled
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 100);
      } else {
        resolve();
      }
    });
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    window.speechSynthesis.cancel();
  };

  return {
    playAudio,
    playTextSpeech,
    stopAudio,
    availableVoices,
    selectedVoice,
    setSelectedVoice
  };
};
