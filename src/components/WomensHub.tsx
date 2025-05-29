
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, ShoppingBag, Users, TrendingUp, Heart, Star, Play, Filter, MessageCircle, DollarSign } from 'lucide-react';

interface WomensHubProps {
  language: string;
}

const WomensHub: React.FC<WomensHubProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState('learn');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const translations = {
    hindi: {
      title: 'महिला केंद्र',
      learn: 'सीखें',
      sell: 'बेचें',
      connect: 'जुड़ें',
      invest: 'निवेश',
      learnSkills: 'नई कलाएं सीखें',
      sellProducts: 'अपने उत्पाद बेचें',
      connectWomen: 'महिलाओं से जुड़ें',
      getInvestment: 'निवेश प्राप्त करें',
      categories: {
        all: 'सभी',
        food: 'खाना',
        crafts: 'हस्तकला',
        beauty: 'सौंदर्य',
        digital: 'डिजिटल',
        tourism: 'पर्यटन'
      }
    },
    english: {
      title: 'Women\'s Hub',
      learn: 'Learn',
      sell: 'Sell',
      connect: 'Connect',
      invest: 'Invest',
      learnSkills: 'Learn New Skills',
      sellProducts: 'Sell Your Products',
      connectWomen: 'Connect with Women',
      getInvestment: 'Get Investment',
      categories: {
        all: 'All',
        food: 'Food',
        crafts: 'Crafts',
        beauty: 'Beauty',
        digital: 'Digital',
        tourism: 'Tourism'
      }
    }
  };

  const t = translations[language as keyof typeof translations] || translations.english;

  const skillCourses = [
    {
      title: language === 'hindi' ? 'आम का अचार बनाना' : 'Making Mango Pickle',
      duration: '12 मिनट',
      level: 'आसान',
      students: 185,
      rating: 4.8,
      category: 'food',
      image: 'Woman in traditional dress making mango pickle with fresh mangoes',
      description: language === 'hindi' ? 'घर में बनाएं स्वादिष्ट आम का अचार' : 'Make delicious mango pickle at home'
    },
    {
      title: language === 'hindi' ? 'हाथ से बैग बनाना' : 'Handmade Bag Making',
      duration: '18 मिनट',
      level: 'मध्यम',
      students: 142,
      rating: 4.9,
      category: 'crafts',
      image: 'Rural woman weaving colorful handmade bags',
      description: language === 'hindi' ? 'रंग-बिरंगे हस्तनिर्मित बैग बनाना सीखें' : 'Learn to make colorful handmade bags'
    },
    {
      title: language === 'hindi' ? 'प्राकृतिक साबुन बनाना' : 'Natural Soap Making',
      duration: '15 मिनट',
      level: 'आसान',
      students: 203,
      rating: 4.7,
      category: 'beauty',
      image: 'Woman making natural herbal soap with organic ingredients',
      description: language === 'hindi' ? 'हर्बल साबुन बनाकर कमाई करें' : 'Make herbal soaps and earn money'
    },
    {
      title: language === 'hindi' ? 'UPI पेमेंट सीखें' : 'Learn UPI Payments',
      duration: '10 मिनट',
      level: 'बहुत आसान',
      students: 78,
      rating: 4.6,
      category: 'digital',
      image: 'Woman learning to use smartphone for digital payments',
      description: language === 'hindi' ? 'मोबाइल से पैसे भेजना और लेना सीखें' : 'Learn to send and receive money via mobile'
    },
    {
      title: language === 'hindi' ? 'मसाले बनाना' : 'Making Spice Mixes',
      duration: '14 मिनट',
      level: 'आसान',
      students: 156,
      rating: 4.8,
      category: 'food',
      image: 'Woman grinding fresh spices in traditional way',
      description: language === 'hindi' ? 'घर के मसाले बनाकर बेचें' : 'Make and sell homemade spice mixes'
    },
    {
      title: language === 'hindi' ? 'गाँव टूर गाइड' : 'Village Tour Guide',
      duration: '20 मिनट',
      level: 'मध्यम',
      students: 89,
      rating: 4.5,
      category: 'tourism',
      image: 'Woman showing village culture to tourists',
      description: language === 'hindi' ? 'पर्यटकों को गाँव दिखाकर कमाई करें' : 'Earn by showing village culture to tourists'
    }
  ];

  const products = [
    {
      name: language === 'hindi' ? 'घर का आम का अचार' : 'Homemade Mango Pickle',
      price: '₹120',
      seller: 'प्रिया देवी',
      location: 'जयपुर',
      image: 'Glass jar filled with authentic mango pickle',
      rating: 4.7,
      reviews: 18,
      category: 'खाना'
    },
    {
      name: language === 'hindi' ? 'हस्तनिर्मित कॉटन बैग' : 'Handwoven Cotton Bag',
      price: '₹350',
      seller: 'सुनीता जी',
      location: 'कोटा',
      image: 'Beautiful handwoven cotton bag with traditional patterns',
      rating: 5.0,
      reviews: 12,
      category: 'हस्तकला'
    },
    {
      name: language === 'hindi' ? 'हर्बल नीम साबुन' : 'Herbal Neem Soap',
      price: '₹95',
      seller: 'गीता शर्मा',
      location: 'उदयपुर',
      image: 'Natural neem soap bars with herbs',
      rating: 4.8,
      reviews: 24,
      category: 'सौंदर्य'
    }
  ];

  const investmentOpportunities = [
    {
      entrepreneur: 'राधा शर्मा',
      business: language === 'hindi' ? 'हर्बल साबुन का व्यवसाय' : 'Herbal Soap Business',
      needed: '₹8,000',
      raised: '₹5,200',
      backers: 8,
      description: language === 'hindi' ? 'प्राकृतिक साबुन बनाने के लिए कच्चा माल और पैकेजिंग' : 'Raw materials and packaging for natural soap making',
      image: 'Woman entrepreneur working with soap making materials',
      progress: 65,
      updates: language === 'hindi' ? 'राधा ने पिछले महीने 45 साबुन बेचे' : 'Radha sold 45 soaps last month'
    },
    {
      entrepreneur: 'मीरा देवी',
      business: language === 'hindi' ? 'अचार और मसाले की दुकान' : 'Pickle & Spice Shop',
      needed: '₹12,000',
      raised: '₹4,800',
      backers: 6,
      description: language === 'hindi' ? 'अचार बनाने और ऑनलाइन बेचने के लिए सामग्री' : 'Materials for pickle making and online selling setup',
      image: 'Woman with various pickles and spice containers',
      progress: 40,
      updates: language === 'hindi' ? 'मीरा के अचार की 3 नई दुकानों में मांग' : 'Meera\'s pickles in demand at 3 new shops'
    }
  ];

  const teamProjects = [
    {
      title: language === 'hindi' ? 'शादी के लिए 50 साड़ी का ऑर्डर' : 'Wedding Order: 50 Sarees',
      description: language === 'hindi' ? 'बड़ी शादी के लिए 50 हस्तनिर्मित साड़ी चाहिए' : 'Need 50 handmade sarees for a big wedding',
      needed: 5,
      joined: 3,
      deadline: '15 दिन',
      payment: '₹800/साड़ी',
      leader: 'अनीता देवी'
    },
    {
      title: language === 'hindi' ? 'दुकान के लिए 100 बैग' : 'Shop Order: 100 Bags',
      description: language === 'hindi' ? 'स्थानीय दुकान के लिए रंग-बिरंगे बैग बनाने का काम' : 'Colorful bags needed for local shop order',
      needed: 4,
      joined: 2,
      deadline: '20 दिन',
      payment: '₹150/बैग',
      leader: 'सुमित्रा जी'
    }
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skillCourses 
    : skillCourses.filter(skill => skill.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          👩 {t.title}
        </h2>
        <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
          {language === 'hindi' 
            ? 'सीखें, कमाएं और साथ मिलकर बढ़ें - आपके सपनों का साथी'
            : 'Learn, Earn and Grow Together - Your partner in dreams'
          }
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="learn" className="text-sm md:text-base py-3 px-4 rounded-md data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
            📚 {t.learn}
          </TabsTrigger>
          <TabsTrigger value="sell" className="text-sm md:text-base py-3 px-4 rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            🛍️ {t.sell}
          </TabsTrigger>
          <TabsTrigger value="connect" className="text-sm md:text-base py-3 px-4 rounded-md data-[state=active]:bg-rose-500 data-[state=active]:text-white">
            💬 {t.connect}
          </TabsTrigger>
          <TabsTrigger value="invest" className="text-sm md:text-base py-3 px-4 rounded-md data-[state=active]:bg-amber-500 data-[state=active]:text-white">
            💰 {t.invest}
          </TabsTrigger>
        </TabsList>

        {/* Enhanced Learn Tab */}
        <TabsContent value="learn" className="space-y-6">
          <Card className="border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-t-lg">
              <CardTitle className="text-2xl font-bold">{t.learnSkills}</CardTitle>
              <p className="text-emerald-100">
                {language === 'hindi' ? 'व्यावसायिक वीडियो कोर्स से सीखें' : 'Learn from professional video courses'}
              </p>
            </CardHeader>
            <CardContent className="p-6">
              {/* Category Filter */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">
                    {language === 'hindi' ? 'श्रेणी चुनें:' : 'Choose Category:'}
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(t.categories).map(([key, label]) => (
                    <Button
                      key={key}
                      variant={selectedCategory === key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(key)}
                      className={`${
                        selectedCategory === key 
                          ? 'bg-emerald-500 text-white' 
                          : 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      {label as string}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((skill, index) => (
                  <Card key={index} className="border border-emerald-200 hover:shadow-xl transition-all bg-white">
                    <CardContent className="p-5">
                      {/* Image Placeholder */}
                      <div className="w-full h-40 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-xs text-center text-gray-600 px-2">{skill.image}</span>
                      </div>
                      
                      <h4 className="font-bold text-gray-800 mb-2 text-lg">{skill.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{skill.description}</p>
                      
                      <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          ⏱️ {skill.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          📊 {skill.level}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">{skill.rating}</span>
                        </div>
                        <span>👥 {skill.students} छात्र</span>
                      </div>
                      
                      <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2">
                        <Play className="w-4 h-4 mr-2" />
                        {language === 'hindi' ? 'वीडियो देखें' : 'Watch Video'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Sell Tab */}
        <TabsContent value="sell" className="space-y-6">
          <div className="grid gap-6">
            {/* Quick List Product */}
            <Card className="border-2 border-green-300 bg-green-50">
              <CardHeader className="bg-gradient-to-r from-green-400 to-emerald-400 text-white text-center">
                <CardTitle>{language === 'hindi' ? 'झटपट उत्पाद बेचें' : 'Quick Product Listing'}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <Button className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-4 rounded-full">
                      📸 {language === 'hindi' ? 'फोटो लें और बेचें' : 'Take Photo & Sell'}
                    </Button>
                    <p className="text-sm text-gray-600 mt-2">
                      {language === 'hindi' 
                        ? 'बस फोटो लें, कीमत बोलें, और बेच दें!'
                        : 'Just take photo, say price, and sell!'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products Marketplace */}
            <Card className="border-2 border-blue-300">
              <CardHeader className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-center">
                <CardTitle>{language === 'hindi' ? 'गाँव का बाजार' : 'Village Marketplace'}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  {products.map((product, index) => (
                    <Card key={index} className="border border-blue-200 hover:shadow-lg transition-all">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-6xl mb-3">{product.image}</div>
                          <h4 className="font-bold text-gray-800 mb-2">{product.name}</h4>
                          <div className="text-2xl font-bold text-green-600 mb-2">{product.price}</div>
                          <div className="text-sm text-gray-600 mb-2">
                            {language === 'hindi' ? 'बनाने वाली:' : 'Made by:'} {product.seller}
                          </div>
                          <div className="text-sm text-gray-600 mb-3">📍 {product.location}</div>
                          <div className="flex items-center justify-center gap-1 mb-3">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm">{product.rating} ({product.reviews})</span>
                          </div>
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white w-full">
                            🛒 {language === 'hindi' ? 'खरीदें' : 'Buy Now'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Enhanced Connect Tab with Collaboration */}
        <TabsContent value="connect" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Chat Section */}
            <Card className="border-2 border-rose-300 bg-gradient-to-br from-rose-50 to-pink-50">
              <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-center rounded-t-lg">
                <CardTitle className="flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  {language === 'hindi' ? 'महिला चैट समुदाय' : 'Women\'s Chat Community'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
                  {/* Sample chat messages */}
                  <div className="bg-white rounded-lg p-3 border border-rose-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-rose-700">रेखा देवी</div>
                        <div className="text-gray-700 mt-1">
                          {language === 'hindi' 
                            ? 'मेरे हस्तनिर्मित बैग ₹350 में बिके! बहुत खुशी हो रही है।'
                            : 'My handmade bags sold for ₹350! So happy!'
                          }
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">5 मिनट पहले</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input placeholder={language === 'hindi' ? 'अपना संदेश लिखें...' : 'Type your message...'} className="flex-1" />
                  <Button className="bg-rose-500 hover:bg-rose-600 text-white">📤</Button>
                </div>
              </CardContent>
            </Card>

            {/* Team Projects */}
            <Card className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-indigo-50">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-center rounded-t-lg">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" />
                  {language === 'hindi' ? 'टीम प्रोजेक्ट्स' : 'Team Projects'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {teamProjects.map((project, index) => (
                    <Card key={index} className="border border-purple-200 bg-white">
                      <CardContent className="p-4">
                        <h4 className="font-bold text-gray-800 mb-2">{project.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                          <span className="text-purple-600">👥 {project.joined}/{project.needed} जुड़े</span>
                          <span className="text-green-600">💰 {project.payment}</span>
                          <span className="text-orange-600">⏰ {project.deadline}</span>
                          <span className="text-blue-600">👑 {project.leader}</span>
                        </div>
                        <Button size="sm" className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                          {language === 'hindi' ? 'प्रोजेक्ट ज्वाइन करें' : 'Join Project'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Enhanced Investment Tab */}
        <TabsContent value="invest" className="space-y-6">
          <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-center rounded-t-lg">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                <DollarSign className="w-6 h-6" />
                {language === 'hindi' ? 'महिला निवेशक कार्यक्रम' : 'Women Investor Program'}
              </CardTitle>
              <p className="text-amber-100">
                {language === 'hindi' ? 'सफल व्यवसायों में निवेश करें और मेंटर बनें' : 'Invest in successful businesses and become a mentor'}
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {investmentOpportunities.map((opportunity, index) => (
                  <Card key={index} className="border border-amber-200 hover:shadow-xl transition-all bg-white">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Image placeholder */}
                        <div className="w-full lg:w-40 h-32 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs text-center text-gray-600 px-2">{opportunity.image}</span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                            <div className="flex-1">
                              <h4 className="font-bold text-xl text-gray-800 mb-2">{opportunity.business}</h4>
                              <p className="text-gray-600 mb-3">{opportunity.description}</p>
                              
                              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-amber-600 font-medium">🎯 लक्ष्य:</span>
                                  <span className="font-bold text-lg">{opportunity.needed}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-600 font-medium">💰 जुटाया:</span>
                                  <span className="font-bold text-lg">{opportunity.raised}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-purple-600">👥 निवेशक:</span>
                                  <span>{opportunity.backers}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-blue-600">👩 उद्यमी:</span>
                                  <span>{opportunity.entrepreneur}</span>
                                </div>
                              </div>
                              
                              {/* Progress bar */}
                              <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-600">प्रगति</span>
                                  <span className="font-medium">{opportunity.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                  <div 
                                    className="bg-amber-500 h-3 rounded-full transition-all" 
                                    style={{ width: `${opportunity.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div className="bg-amber-50 rounded-lg p-3 mb-4">
                                <p className="text-sm text-amber-800">
                                  <strong>अपडेट:</strong> {opportunity.updates}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-3 lg:w-40">
                              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                                💝 {language === 'hindi' ? 'निवेश करें' : 'Invest Now'}
                              </Button>
                              <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                                🤝 {language === 'hindi' ? 'मेंटर बनें' : 'Become Mentor'}
                              </Button>
                              <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                                📊 {language === 'hindi' ? 'विस्तार देखें' : 'View Details'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WomensHub;
