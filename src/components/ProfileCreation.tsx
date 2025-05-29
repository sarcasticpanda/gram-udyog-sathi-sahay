
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Phone, Briefcase, Camera } from 'lucide-react';
import VoiceHelper from './VoiceHelper';

interface ProfileCreationProps {
  language: string;
  onClose: () => void;
}

const ProfileCreation: React.FC<ProfileCreationProps> = ({ language, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    village: '',
    phone: '',
    skills: '',
    experience: '',
    profilePhoto: ''
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const translations = {
    hindi: {
      title: 'अपनी प्रोफाइल बनाएं',
      name: 'नाम',
      village: 'गाँव/शहर',
      phone: 'मोबाइल नंबर',
      skills: 'आपके हुनर',
      experience: 'अनुभव',
      photo: 'फोटो अपलोड करें',
      save: 'प्रोफाइल सेव करें',
      cancel: 'रद्द करें',
      skillOptions: ['खेती', 'निर्माण', 'दुकान का काम', 'हस्तकला', 'खाना बनाना', 'सफाई'],
      namePlaceholder: 'अपना नाम लिखें',
      villagePlaceholder: 'अपना गाँव/शहर लिखें',
      phonePlaceholder: '9876543210',
      experiencePlaceholder: 'अपना अनुभव बताएं...'
    },
    english: {
      title: 'Create Your Profile',
      name: 'Name',
      village: 'Village/City',
      phone: 'Mobile Number',
      skills: 'Your Skills',
      experience: 'Experience',
      photo: 'Upload Photo',
      save: 'Save Profile',
      cancel: 'Cancel',
      skillOptions: ['Farming', 'Construction', 'Shop Work', 'Handicrafts', 'Cooking', 'Cleaning'],
      namePlaceholder: 'Enter your name',
      villagePlaceholder: 'Enter your village/city',
      phonePlaceholder: '9876543210',
      experiencePlaceholder: 'Tell us about your experience...'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.english;

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('name') || lowerCommand.includes('नाम')) {
      setFormData(prev => ({ ...prev, name: command }));
    } else if (lowerCommand.includes('village') || lowerCommand.includes('गाँव')) {
      setFormData(prev => ({ ...prev, village: command }));
    } else if (lowerCommand.includes('experience') || lowerCommand.includes('अनुभव')) {
      setFormData(prev => ({ ...prev, experience: command }));
    }
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSave = () => {
    console.log('Profile saved:', { ...formData, skills: selectedSkills });
    // Here you would normally save to database
    alert(language === 'hindi' ? 'प्रोफाइल सेव हो गई!' : 'Profile saved successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <User className="w-6 h-6" />
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Profile Photo */}
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
              {formData.profilePhoto ? (
                <img src={formData.profilePhoto} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
              ) : (
                <Camera className="w-8 h-8 text-gray-500" />
              )}
            </div>
            <Button variant="outline" className="text-sm">
              <Camera className="w-4 h-4 mr-2" />
              {t.photo}
            </Button>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              {t.name}
            </label>
            <div className="flex gap-2">
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder={t.namePlaceholder}
                className="flex-1"
              />
              <VoiceHelper onVoiceCommand={handleVoiceCommand} language={language} />
            </div>
          </div>

          {/* Village */}
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {t.village}
            </label>
            <div className="flex gap-2">
              <Input
                value={formData.village}
                onChange={(e) => setFormData(prev => ({ ...prev, village: e.target.value }))}
                placeholder={t.villagePlaceholder}
                className="flex-1"
              />
              <VoiceHelper onVoiceCommand={handleVoiceCommand} language={language} />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {t.phone}
            </label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder={t.phonePlaceholder}
              type="tel"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              {t.skills}
            </label>
            <div className="flex flex-wrap gap-2">
              {t.skillOptions.map((skill) => (
                <Badge
                  key={skill}
                  variant={selectedSkills.includes(skill) ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-2 text-sm ${
                    selectedSkills.includes(skill) 
                      ? 'bg-emerald-500 text-white' 
                      : 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                  }`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium mb-2">{t.experience}</label>
            <div className="flex gap-2">
              <Textarea
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                placeholder={t.experiencePlaceholder}
                className="flex-1 min-h-20"
              />
              <VoiceHelper onVoiceCommand={handleVoiceCommand} language={language} />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <Button onClick={handleSave} className="bg-emerald-500 hover:bg-emerald-600 text-white px-8">
              {t.save}
            </Button>
            <Button variant="outline" onClick={onClose}>
              {t.cancel}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCreation;
