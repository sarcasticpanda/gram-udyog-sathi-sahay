
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  const languages = [
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳', region: 'Hindi' },
    { code: 'english', name: 'English', flag: '🇬🇧', region: 'English' },
    { code: 'tamil', name: 'தமிழ்', flag: '🇮🇳', region: 'Tamil' },
    { code: 'marathi', name: 'मराठी', flag: '🇮🇳', region: 'Marathi' },
    { code: 'bengali', name: 'বাংলা', flag: '🇮🇳', region: 'Bengali' }
  ];

  const currentLang = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  const handleLanguageChange = (newLanguage: string) => {
    onLanguageChange(newLanguage);
    console.log(`Language changed to: ${newLanguage}`);
  };

  return (
    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-36 border-2 border-emerald-400 bg-emerald-50 hover:bg-emerald-100 transition-colors shadow-sm">
        <SelectValue>
          <div className="flex items-center gap-2">
            <span className="text-lg">{currentLang.flag}</span>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{currentLang.name}</span>
              <span className="text-xs text-gray-600">{currentLang.region}</span>
            </div>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white border-2 border-emerald-300 shadow-lg min-w-40">
        {languages.map((language) => (
          <SelectItem 
            key={language.code} 
            value={language.code}
            className="hover:bg-emerald-50 cursor-pointer py-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{language.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium">{language.name}</span>
                <span className="text-xs text-gray-500">{language.region}</span>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
