
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface VoiceHelperProps {
  onVoiceCommand?: (command: string) => void;
  placeholder?: string;
  language?: string;
}

const VoiceHelper: React.FC<VoiceHelperProps> = ({ 
  onVoiceCommand, 
  placeholder = 'Voice commands...',
  language = 'hindi'
}) => {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = language === 'hindi' ? 'hi-IN' : 'en-US';
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setLastCommand(`"${transcript}" समझ गया`);
        setIsProcessing(false);
        
        if (onVoiceCommand) {
          onVoiceCommand(transcript);
        }
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
          setIsListening(false);
          setLastCommand('');
        }, 3000);
      };
      
      recognitionInstance.onerror = () => {
        setIsProcessing(false);
        setLastCommand('आवाज नहीं सुनाई दी');
        setTimeout(() => {
          setIsListening(false);
          setLastCommand('');
        }, 2000);
      };
      
      setRecognition(recognitionInstance);
    }
  }, [language, onVoiceCommand]);

  const voiceCommands = [
    'काम खोजें',
    'महिला केंद्र दिखाएं',
    'मौसम बताएं',
    'नई कलाएं सिखाएं',
    'प्रोफाइल बनाएं',
    'Find jobs nearby',
    'Show women\'s hub',
    'Weather update',
    'Create profile'
  ];

  const toggleVoiceHelper = () => {
    if (!isListening && recognition) {
      setIsListening(true);
      setIsProcessing(true);
      setLastCommand('सुन रहा हूं...');
      recognition.start();
    } else if (recognition) {
      setIsListening(false);
      setIsProcessing(false);
      setLastCommand('');
      recognition.stop();
    } else {
      // Fallback simulation if speech recognition is not supported
      setIsListening(true);
      setIsProcessing(true);
      setLastCommand('सुन रहा हूं...');
      
      setTimeout(() => {
        const randomCommand = voiceCommands[Math.floor(Math.random() * voiceCommands.length)];
        setLastCommand(`"${randomCommand}" समझ गया`);
        setIsProcessing(false);
        
        if (onVoiceCommand) {
          onVoiceCommand(randomCommand);
        }
        
        setTimeout(() => {
          setIsListening(false);
          setLastCommand('');
        }, 2000);
      }, 2000);
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
