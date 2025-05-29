
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Mic, Heart, Users, Briefcase, ShoppingBag, BookOpen, Phone } from 'lucide-react';
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
      tagline: 'पास में काम, महिलाओं के सपने, आसान बनाया',
      helpline: 'हेल्पलाइन: 1800-XXX-XXXX',
      findJobs: 'काम खोजें',
      womenHub: 'महिला केंद्र',
      weather: 'मौसम',
      description: 'गांव के लोगों के लिए बनाया गया - काम खोजना और कमाना आसान!'
    },
    english: {
      title: 'Gram Udyog',
      tagline: 'Jobs Nearby, Women\'s Dreams, Made Simple',
      helpline: 'Helpline: 1800-XXX-XXXX',
      findJobs: 'Find Jobs',
      womenHub: 'Women\'s Hub',
      weather: 'Weather',
      description: 'Built for villages - making work and earning simple!'
    }
  };

  const currentLang = languages[selectedLanguage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-green-400">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-green-700">{currentLang.title}</h1>
                <p className="text-sm text-gray-600">{currentLang.tagline}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <LanguageSelector 
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
              <VoiceHelper />
              <div className="bg-red-100 border border-red-300 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-700">{currentLang.helpline}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b-2 border-green-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-1 md:space-x-4 py-3">
            {[
              { id: 'home', label: '🏠 Home', icon: Heart },
              { id: 'jobs', label: '🚜 ' + currentLang.findJobs, icon: Briefcase },
              { id: 'women', label: '👩 ' + currentLang.womenHub, icon: Users },
              { id: 'weather', label: '🌤️ ' + currentLang.weather, icon: ArrowRight }
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "outline"}
                className={`text-xs md:text-sm px-2 md:px-4 py-2 rounded-full font-medium transition-all ${
                  activeSection === item.id 
                    ? 'bg-green-500 text-white shadow-lg scale-105' 
                    : 'bg-white text-green-700 border-green-300 hover:bg-green-50'
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {activeSection === 'home' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center py-8">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                🌾 {currentLang.description}
              </h2>
              <div className="flex justify-center gap-4 flex-wrap mt-8">
                <Card className="w-full md:w-80 border-2 border-green-300 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105" 
                      onClick={() => setActiveSection('jobs')}>
                  <CardHeader className="bg-gradient-to-r from-green-400 to-blue-400 text-white text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                      <Briefcase className="w-8 h-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">{currentLang.findJobs}</CardTitle>
                    <CardDescription className="text-green-50">
                      {selectedLanguage === 'hindi' ? 'पास के काम देखें' : 'Find work nearby'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <Badge className="bg-green-100 text-green-800">🚜 Farming</Badge>
                      <Badge className="bg-blue-100 text-blue-800">🔨 Construction</Badge>
                      <Badge className="bg-orange-100 text-orange-800">🏪 Shop Work</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="w-full md:w-80 border-2 border-pink-300 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
                      onClick={() => setActiveSection('women')}>
                  <CardHeader className="bg-gradient-to-r from-pink-400 to-purple-400 text-white text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="w-8 h-8 text-pink-600" />
                    </div>
                    <CardTitle className="text-xl">{currentLang.womenHub}</CardTitle>
                    <CardDescription className="text-pink-50">
                      {selectedLanguage === 'hindi' ? 'सीखें और कमाएं' : 'Learn and Earn'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <Badge className="bg-pink-100 text-pink-800">🥒 Skills</Badge>
                      <Badge className="bg-purple-100 text-purple-800">🛍️ Sell</Badge>
                      <Badge className="bg-orange-100 text-orange-800">🤝 Connect</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 text-center border-2 border-green-200 shadow-md">
                <div className="text-2xl font-bold text-green-600">500+</div>
                <div className="text-sm text-gray-600">{selectedLanguage === 'hindi' ? 'काम मिले' : 'Jobs Found'}</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border-2 border-blue-200 shadow-md">
                <div className="text-2xl font-bold text-blue-600">200+</div>
                <div className="text-sm text-gray-600">{selectedLanguage === 'hindi' ? 'उत्पाद बेचे' : 'Products Sold'}</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border-2 border-pink-200 shadow-md">
                <div className="text-2xl font-bold text-pink-600">100+</div>
                <div className="text-sm text-gray-600">{selectedLanguage === 'hindi' ? 'महिलाएं जुड़ीं' : 'Women Joined'}</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border-2 border-orange-200 shadow-md">
                <div className="text-2xl font-bold text-orange-600">₹50K+</div>
                <div className="text-sm text-gray-600">{selectedLanguage === 'hindi' ? 'कुल कमाई' : 'Total Earned'}</div>
              </div>
            </div>

            {/* Success Story */}
            <Card className="border-2 border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="text-center text-xl text-gray-800">
                  ⭐ {selectedLanguage === 'hindi' ? 'सफलता की कहानी' : 'Success Story'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👩</span>
                  </div>
                  <div className="flex-1 min-w-64">
                    <p className="text-lg font-medium text-gray-800">
                      {selectedLanguage === 'hindi' 
                        ? '"रेखा जी ने बिहार से बैग बेचकर इस महीने ₹15,000 कमाए!"'
                        : '"Rekha from Bihar earned ₹15,000 selling bags this month!"'
                      }
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {selectedLanguage === 'hindi' ? '- गांव की सफल महिला उद्यमी' : '- Successful village entrepreneur'}
                    </p>
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-red-400" />
            <span className="text-lg font-medium">
              {selectedLanguage === 'hindi' 
                ? 'गांव के लिए बनाया गया, प्यार के साथ'
                : 'Made for villages, with love'
              }
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            {selectedLanguage === 'hindi' 
              ? 'ग्राम उद्योग - हर सपने को साकार करना'
              : 'Gram Udyog - Making every dream possible'
            }
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
