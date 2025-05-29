
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
    const cleanup = () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch (error) {
          console.error('Error stopping recognition:', error);
        }
      }
      setIsListening(false);
      setIsProcessing(false);
      setLastCommand('');
    };

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = language === 'hindi' ? 'hi-IN' : 'en-US';
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setLastCommand(`"${transcript}" ${language === 'hindi' ? 'समझ गया' : 'understood'}`);
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
      
      recognitionInstance.onend = () => {
        setIsListening(false);
        setIsProcessing(false);
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsProcessing(false);
        setLastCommand(language === 'hindi' ? 'आवाज नहीं सुनाई दी' : 'Could not hear voice');
        setTimeout(() => {
          setIsListening(false);
          setLastCommand('');
        }, 2000);
      };
      
      setRecognition(recognitionInstance);
    }

    // Cleanup when component unmounts or language changes
    return cleanup;
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
      try {
        // Reset any existing recognition state
        recognition.abort();
        recognition.stop();
        
        // Start fresh
        setIsListening(true);
        setIsProcessing(true);
        setLastCommand(language === 'hindi' ? 'सुन रहा हूं...' : 'Listening...');
        
        // Small delay to ensure previous instance is fully stopped
        setTimeout(() => {
          try {
            recognition.start();
          } catch (error) {
            console.error('Error in delayed start:', error);
            setIsListening(false);
            setIsProcessing(false);
            setLastCommand(language === 'hindi' ? 'माइक चालू नहीं हो सका' : 'Could not start microphone');
            setTimeout(() => setLastCommand(''), 3000);
          }
        }, 100);
      } catch (error) {
        console.error('Error in initial recognition cleanup:', error);
        setIsListening(false);
        setIsProcessing(false);
        setLastCommand(language === 'hindi' ? 'माइक चालू नहीं हो सका' : 'Could not start microphone');
        setTimeout(() => setLastCommand(''), 3000);
      }
    } else if (recognition) {
      try {
        recognition.stop();
        recognition.abort(); // Force stop
        setIsListening(false);
        setIsProcessing(false);
        setLastCommand(language === 'hindi' ? 'माइक बंद' : 'Microphone off');
        setTimeout(() => setLastCommand(''), 1500);
      } catch (error) {
        console.error('Error stopping voice recognition:', error);
        // Force the state to stopped even if there's an error
        setIsListening(false);
        setIsProcessing(false);
      }
    } else {
      // Fallback simulation if speech recognition is not supported
      setIsListening(true);
      setIsProcessing(true);
      setLastCommand(language === 'hindi' ? 'सुन रहा हूं...' : 'Listening...');
      
      setTimeout(() => {
        const randomCommand = voiceCommands[Math.floor(Math.random() * voiceCommands.length)];
        setLastCommand(`"${randomCommand}" ${language === 'hindi' ? 'समझ गया' : 'understood'}`);
        setIsProcessing(false);
        
        if (onVoiceCommand) {
          onVoiceCommand(randomCommand);
        }
        
        setTimeout(() => {
          setIsListening(false);
          setLastCommand('');
        }, 3000);
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
        title={isListening ? 'माइक बंद करें' : 'आवाज से बोलें'}
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
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-ping" />
        )}
      </Button>
      {(lastCommand || isProcessing) && (
        <Badge 
          variant="outline" 
          className={`animate-fade-in flex items-center gap-2 ${isProcessing ? 'bg-amber-50' : ''}`}
        >
          {isProcessing && <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />}
          {lastCommand}
        </Badge>
      )}
    </div>
  );
};

export default VoiceHelper;
