
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const VoiceHelper: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const voiceCommands = [
    'काम खोजें',
    'महिला केंद्र दिखाएं',
    'मौसम बताएं',
    'नई कलाएं सिखाएं',
    'Find jobs nearby',
    'Show women\'s hub',
    'Weather update'
  ];

  const toggleVoiceHelper = () => {
    if (!isListening) {
      setIsListening(true);
      setIsProcessing(true);
      setLastCommand('सुन रहा हूं...');
      
      // Simulate voice recognition process
      setTimeout(() => {
        const randomCommand = voiceCommands[Math.floor(Math.random() * voiceCommands.length)];
        setLastCommand(`"${randomCommand}" समझ गया`);
        setIsProcessing(false);
        
        // Simulate response
        setTimeout(() => {
          setLastCommand('कमांड प्रोसेस हो गया');
          setTimeout(() => {
            setIsListening(false);
            setLastCommand('');
          }, 2000);
        }, 1500);
      }, 2000);
    } else {
      setIsListening(false);
      setIsProcessing(false);
      setLastCommand('');
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={toggleVoiceHelper}
        variant={isListening ? "destructive" : "outline"}
        className={`relative transition-all duration-300 ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' 
            : 'border-emerald-400 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-500'
        } ${isProcessing ? 'animate-pulse' : ''}`}
        disabled={isProcessing}
      >
        {isListening ? (
          <MicOff className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
        <span className="ml-2 text-sm font-medium">
          {isListening ? 'बंद करें' : 'आवाज'}
        </span>
        {isListening && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
        )}
      </Button>
      
      {lastCommand && (
        <Badge 
          variant="secondary" 
          className={`text-xs px-3 py-1 max-w-48 truncate transition-all ${
            isProcessing ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
          }`}
        >
          <Volume2 className="w-3 h-3 mr-1" />
          {lastCommand}
        </Badge>
      )}
    </div>
  );
};

export default VoiceHelper;
