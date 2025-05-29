
import React from 'react';
import { Button } from '@/components/ui/button';
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
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'english', name: 'English', flag: '🇬🇧' },
    { code: 'tamil', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'marathi', name: 'मराठी', flag: '🇮🇳' },
    { code: 'bengali', name: 'বাংলা', flag: '🇮🇳' }
  ];

  const currentLang = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  return (
    <Select value={selectedLanguage} onValueChange={onLanguageChange}>
      <SelectTrigger className="w-32 border-2 border-orange-300 bg-orange-50">
        <SelectValue>
          <div className="flex items-center gap-2">
            <span>{currentLang.flag}</span>
            <span className="text-sm">{currentLang.name}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white border-2 border-orange-300">
        {languages.map((language) => (
          <SelectItem 
            key={language.code} 
            value={language.code}
            className="hover:bg-orange-50"
          >
            <div className="flex items-center gap-2">
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
