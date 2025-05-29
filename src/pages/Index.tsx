import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Heart, Users, Briefcase, Phone, TrendingUp, Star } from 'lucide-react';
import WeatherWidget from '@/components/WeatherWidget';
import JobsSection from '@/components/JobsSection';
import WomensHub from '@/components/WomensHub';
import VoiceHelper from '@/components/VoiceHelper';
import LanguageSelector from '@/components/LanguageSelector';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedLanguage, setSelectedLanguage] = useState('hindi');

  const languages = {
    hindi: {
      title: 'ग्राम उद्योग',
      tagline: 'नजदीकी काम, महिलाओं के सपने, सरल बनाया गया',
      helpline: 'हेल्पलाइन: 1800-233-4567',
      findJobs: 'काम खोजें',
      womenHub: 'महिला केंद्र',
      weather: 'मौसम',
      description: 'ग्रामीण भारत के लिए बनाया गया - काम खोजना और कमाना आसान बनाया!'
    },
    english: {
      title: 'Gram Udyog',
      tagline: 'Jobs Nearby, Women\'s Dreams, Made Simple',
      helpline: 'Helpline: 1800-233-4567',
      findJobs: 'Find Jobs',
      womenHub: 'Women\'s Hub',
      weather: 'Weather',
      description: 'Built for Rural India - making work and earning accessible for everyone!'
    }
  };

  const currentLang = languages[selectedLanguage as keyof typeof languages] || languages.hindi;

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    console.log(`Navigating to section: ${section}`);
  };

  const handleMainVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('job') || lowerCommand.includes('काम')) {
      setActiveSection('jobs');
    } else if (lowerCommand.includes('women') || lowerCommand.includes('महिला')) {
      setActiveSection('women');
    } else if (lowerCommand.includes('weather') || lowerCommand.includes('मौसम')) {
      setActiveSection('weather');
    } else if (lowerCommand.includes('home') || lowerCommand.includes('गृह')) {
      setActiveSection('home');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-emerald-500">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-emerald-800">{currentLang.title}</h1>
                <p className="text-sm text-gray-700 font-medium">{currentLang.tagline}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <LanguageSelector 
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
              <VoiceHelper onVoiceCommand={handleMainVoiceCommand} language={selectedLanguage} />
              <div className="bg-red-50 border-2 border-red-400 rounded-lg px-4 py-2 shadow-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-semibold text-red-700">{currentLang.helpline}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b-2 border-emerald-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-2 md:space-x-6 py-4">
            {[
              { id: 'home', label: '🏠 गृह', icon: Heart },
              { id: 'jobs', label: '🚜 ' + currentLang.findJobs, icon: Briefcase },
              { id: 'women', label: '👩 ' + currentLang.womenHub, icon: Users },
              { id: 'weather', label: '🌤️ ' + currentLang.weather, icon: ArrowRight }
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "outline"}
                className={`text-sm md:text-base px-4 md:px-6 py-3 rounded-lg font-medium transition-all ${
                  activeSection === item.id 
                    ? 'bg-emerald-600 text-white shadow-lg scale-105 border-emerald-600' 
                    : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50 hover:border-emerald-400'
                }`}
                onClick={() => handleSectionChange(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="space-y-10">
            {/* Hero Section with Real Village Image */}
            <div className="relative text-center py-12 px-6 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 rounded-2xl"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
                  🌾 {currentLang.description}
                </h2>
                <div className="w-full h-64 rounded-xl mb-6 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=400&fit=crop" 
                    alt="Rural Indian Village Scene - Farmers Working Together"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex justify-center gap-6 flex-wrap mt-8">
                  <Card className="w-full md:w-80 border-2 border-emerald-300 hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105 bg-white" 
                        onClick={() => handleSectionChange('jobs')}>
                    <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-t-lg">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <Briefcase className="w-8 h-8 text-emerald-600" />
                      </div>
                      <CardTitle className="text-xl font-bold">{currentLang.findJobs}</CardTitle>
                      <CardDescription className="text-emerald-100 font-medium">
                        {selectedLanguage === 'hindi' ? 'नजदीकी काम देखें और तुरंत आवेदन करें' : 'Find nearby work and apply instantly'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <Badge className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1">🚜 खेती का काम</Badge>
                        <Badge className="bg-blue-100 text-blue-800 text-sm px-3 py-1">🔨 निर्माण कार्य</Badge>
                        <Badge className="bg-orange-100 text-orange-800 text-sm px-3 py-1">🏪 दुकान का काम</Badge>
                      </div>
                      <div className="mt-4 text-center">
                        <div className="text-2xl font-bold text-emerald-600">500+</div>
                        <div className="text-sm text-gray-600">{selectedLanguage === 'hindi' ? 'उपलब्ध काम' : 'Available Jobs'}</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="w-full md:w-80 border-2 border-rose-300 hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105 bg-white"
                        onClick={() => handleSectionChange('women')}>
                    <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-center rounded-t-lg">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <Users className="w-8 h-8 text-rose-600" />
                      </div>
                      <CardTitle className="text-xl font-bold">{currentLang.womenHub}</CardTitle>
                      <CardDescription className="text-rose-100 font-medium">
                        {selectedLanguage === 'hindi' ? 'सीखें, बेचें और एक-साथ बढ़ें' : 'Learn, Sell and Grow Together'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <Badge className="bg-rose-100 text-rose-800 text-sm px-3 py-1">📚 नई कलाएं</Badge>
                        <Badge className="bg-purple-100 text-purple-800 text-sm px-3 py-1">🛍️ उत्पाद बेचें</Badge>
                        <Badge className="bg-amber-100 text-amber-800 text-sm px-3 py-1">🤝 निवेश करें</Badge>
                      </div>
                      <div className="mt-4 text-center">
                        <div className="text-2xl font-bold text-rose-600">200+</div>
                        <div className="text-sm text-gray-600">{selectedLanguage === 'hindi' ? 'सफल महिलाएं' : 'Successful Women'}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Enhanced Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 text-center border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-all">
                <div className="text-3xl font-bold text-emerald-600 mb-2">500+</div>
                <div className="text-sm text-gray-700 font-medium">{selectedLanguage === 'hindi' ? 'काम मिले' : 'Jobs Found'}</div>
                <TrendingUp className="w-6 h-6 text-emerald-500 mx-auto mt-2" />
              </div>
              <div className="bg-white rounded-xl p-6 text-center border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all">
                <div className="text-3xl font-bold text-blue-600 mb-2">250+</div>
                <div className="text-sm text-gray-700 font-medium">{selectedLanguage === 'hindi' ? 'उत्पाद बेचे' : 'Products Sold'}</div>
                <Star className="w-6 h-6 text-blue-500 mx-auto mt-2" />
              </div>
              <div className="bg-white rounded-xl p-6 text-center border-2 border-rose-200 shadow-lg hover:shadow-xl transition-all">
                <div className="text-3xl font-bold text-rose-600 mb-2">150+</div>
                <div className="text-sm text-gray-700 font-medium">{selectedLanguage === 'hindi' ? 'महिलाएं जुड़ीं' : 'Women Joined'}</div>
                <Users className="w-6 h-6 text-rose-500 mx-auto mt-2" />
              </div>
              <div className="bg-white rounded-xl p-6 text-center border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all">
                <div className="text-3xl font-bold text-amber-600 mb-2">₹75K+</div>
                <div className="text-sm text-gray-700 font-medium">{selectedLanguage === 'hindi' ? 'कुल कमाई' : 'Total Earned'}</div>
                <Heart className="w-6 h-6 text-amber-500 mx-auto mt-2" />
              </div>
            </div>

            {/* Enhanced Success Story */}
            <Card className="border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-center text-2xl text-gray-800 font-bold">
                  ⭐ {selectedLanguage === 'hindi' ? 'सफलता की कहानी' : 'Success Story'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center p-8">
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop" 
                      alt="Successful village entrepreneur"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-80">
                    <p className="text-xl font-semibold text-gray-800 mb-3">
                      {selectedLanguage === 'hindi' 
                        ? '"रेखा देवी ने बिहार से हस्तनिर्मित बैग बेचकर इस महीने ₹18,000 कमाए!"'
                        : '"Rekha Devi from Bihar earned ₹18,000 selling handmade bags this month!"'
                      }
                    </p>
                    <p className="text-base text-gray-600">
                      {selectedLanguage === 'hindi' ? '- गांव की सफल महिला उद्यमी और तीन बच्चों की माँ' : '- Successful village entrepreneur and mother of three'}
                    </p>
                    <div className="mt-4 flex justify-center">
                      <Badge className="bg-emerald-100 text-emerald-800 text-sm px-4 py-2">
                        {selectedLanguage === 'hindi' ? '6 महीने में 300% बढ़ोतरी' : '300% growth in 6 months'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'jobs' && <JobsSection language={selectedLanguage} />}
        {activeSection === 'women' && <WomensHub language={selectedLanguage} />}
        {activeSection === 'weather' && <WeatherWidget language={selectedLanguage} />}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-red-400" />
            <span className="text-xl font-semibold">
              {selectedLanguage === 'hindi' 
                ? 'गांवों के लिए बनाया गया, प्रेम और समर्पण के साथ'
                : 'Made for villages, with love and dedication'
              }
            </span>
          </div>
          <p className="text-gray-300 text-base mb-4">
            {selectedLanguage === 'hindi' 
              ? 'ग्राम उद्योग - हर सपने को साकार करने का साथी'
              : 'Gram Udyog - Your partner in making every dream come true'
            }
          </p>
          <div className="text-sm text-gray-400">
            © 2024 Gram Udyog. {selectedLanguage === 'hindi' ? 'सभी अधिकार सुरक्षित।' : 'All rights reserved.'}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
