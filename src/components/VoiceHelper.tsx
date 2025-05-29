
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const VoiceHelper: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState('');

  const toggleVoiceHelper = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate voice recognition
      setLastCommand('Listening...');
      setTimeout(() => {
        setLastCommand('Voice command received');
        setIsListening(false);
      }, 3000);
    } else {
      setLastCommand('');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={toggleVoiceHelper}
        variant={isListening ? "destructive" : "outline"}
        className={`relative ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
            : 'border-blue-300 text-blue-700 hover:bg-blue-50'
        }`}
      >
        {isListening ? (
          <MicOff className="w-4 h-4" />
        ) : (
          <Mic className="w-4 h-4" />
        )}
        <span className="ml-2 text-sm">
          {isListening ? 'Stop' : 'Voice'}
        </span>
      </Button>
      
      {lastCommand && (
        <Badge variant="secondary" className="text-xs">
          🎤 {lastCommand}
        </Badge>
      )}
    </div>
  );
};

export default VoiceHelper;
