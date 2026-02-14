import './App.css';
import { useState } from 'react';
import VoiceConversation from './components/VoiceConversation';
import ImageDisplay from './components/ImageDisplay';

function App() {
  const [currentImageTitle, setCurrentImageTitle] = useState('Friendly Dog');
  const [currentImageDescription, setCurrentImageDescription] = useState('A happy golden retriever playing outdoors');

  const handleImageChange = (title: string, description: string) => {
    setCurrentImageTitle(title);
    setCurrentImageDescription(description);
  };

  return (
    <div className="app-container">
      <div className="app-wrapper">
        <ImageDisplay onImageChange={handleImageChange} />
        <VoiceConversation imageTitle={currentImageTitle} imageDescription={currentImageDescription} />
      </div>
    </div>
  );
}

export default App;
