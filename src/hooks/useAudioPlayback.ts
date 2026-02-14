import { useRef } from 'react';

export const useAudioPlayback = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        // Try to find the specified voice
        const voices = window.speechSynthesis.getVoices();
        const selectedVoice = voices.find(v => v.name.includes('English'));
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }

        utterance.onend = () => resolve();
        window.speechSynthesis.speak(utterance);
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
    stopAudio
  };
};
