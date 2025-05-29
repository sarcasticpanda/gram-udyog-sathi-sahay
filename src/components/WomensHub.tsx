
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, ShoppingBag, Users, TrendingUp, Heart, Star } from 'lucide-react';

interface WomensHubProps {
  language: string;
}

const WomensHub: React.FC<WomensHubProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState('learn');

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
      getInvestment: 'निवेश पाएं',
      startLearning: 'सीखना शुरू करें',
      listProduct: 'उत्पाद लिस्ट करें',
      joinChat: 'चैट में शामिल हों',
      seekInvestor: 'निवेशक खोजें',
      viewCourse: 'कोर्स देखें',
      watchVideo: 'वीडियो देखें'
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
      startLearning: 'Start Learning',
      listProduct: 'List Product',
      joinChat: 'Join Chat',
      seekInvestor: 'Find Investor',
      viewCourse: 'View Course',
      watchVideo: 'Watch Video'
    }
  };

  const t = translations[language] || translations.english;

  const skillCourses = [
    {
      title: language === 'hindi' ? 'आम का अचार बनाना' : 'Making Mango Pickle',
      duration: '10 मिनट',
      level: 'आसान',
      students: 150,
      rating: 4.8,
      thumbnail: '🥒'
    },
    {
      title: language === 'hindi' ? 'हाथ से बैग बनाना' : 'Handmade Bag Making',
      duration: '15 मिनट',
      level: 'मध्यम',
      students: 89,
      rating: 4.9,
      thumbnail: '👜'
    },
    {
      title: language === 'hindi' ? 'साबुन बनाना' : 'Soap Making',
      duration: '12 मिनट',
      level: 'आसान',
      students: 203,
      rating: 4.7,
      thumbnail: '🧼'
    },
    {
      title: language === 'hindi' ? 'UPI पेमेंट सीखें' : 'Learn UPI Payments',
      duration: '8 मिनट',
      level: 'बहुत आसान',
      students: 45,
      rating: 4.6,
      thumbnail: '📱'
    }
  ];

  const products = [
    {
      name: language === 'hindi' ? 'घर का अचार' : 'Homemade Pickle',
      price: '₹100',
      seller: 'प्रिया देवी',
      location: 'जयपुर',
      image: '🥒',
      rating: 4.5,
      reviews: 12
    },
    {
      name: language === 'hindi' ? 'हस्तनिर्मित साड़ी' : 'Handwoven Saree',
      price: '₹2500',
      seller: 'सुनीता जी',
      location: 'कोटा',
      image: '🥻',
      rating: 5.0,
      reviews: 8
    },
    {
      name: language === 'hindi' ? 'प्राकृतिक साबुन' : 'Natural Soap',
      price: '₹80',
      seller: 'गीता शर्मा',
      location: 'उदयपुर',
      image: '🧼',
      rating: 4.7,
      reviews: 15
    }
  ];

  const chatMessages = [
    {
      user: 'रेखा जी',
      message: language === 'hindi' ? 'मेरा अचार ₹80 में बिका! बहुत खुशी!' : 'My pickle sold for ₹80! So happy!',
      time: '2 मिनट पहले'
    },
    {
      user: 'सुधा',
      message: language === 'hindi' ? 'साबुन बनाना सीखना है, कोई मदद करेगा?' : 'Want to learn soap making, anyone help?',
      time: '5 मिनट पहले'
    },
    {
      user: 'अनीता देवी',
      message: language === 'hindi' ? '50 बैग का ऑर्डर आया है! कौन मदद करेगा?' : 'Got order for 50 bags! Who can help?',
      time: '10 मिनट पहले'
    }
  ];

  const investmentOpportunities = [
    {
      entrepreneur: 'राधा शर्मा',
      business: language === 'hindi' ? 'साबुन का व्यवसाय' : 'Soap Business',
      needed: '₹5,000',
      raised: '₹3,000',
      backers: 6,
      description: language === 'hindi' ? 'प्राकृतिक साबुन बनाने के लिए कच्चा माल चाहिए' : 'Need raw materials for natural soap making'
    },
    {
      entrepreneur: 'मीरा देवी',
      business: language === 'hindi' ? 'अचार की दुकान' : 'Pickle Shop',
      needed: '₹8,000',
      raised: '₹2,500',
      backers: 4,
      description: language === 'hindi' ? 'अचार बनाने और पैकेजिंग के लिए फंड' : 'Funds for pickle making and packaging'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          👩 {t.title}
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          {language === 'hindi' 
            ? 'सीखें, कमाएं, और साथ मिलकर बढ़ें!'
            : 'Learn, Earn, and Grow Together!'
          }
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="learn" className="text-sm">📚 {t.learn}</TabsTrigger>
          <TabsTrigger value="sell" className="text-sm">🛍️ {t.sell}</TabsTrigger>
          <TabsTrigger value="connect" className="text-sm">💬 {t.connect}</TabsTrigger>
          <TabsTrigger value="invest" className="text-sm">💰 {t.invest}</TabsTrigger>
        </TabsList>

        {/* Learn Tab */}
        <TabsContent value="learn" className="space-y-6">
          <Card className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader className="bg-gradient-to-r from-purple-400 to-pink-400 text-white text-center">
              <CardTitle className="text-xl">{t.learnSkills}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {skillCourses.map((course, index) => (
                  <Card key={index} className="border border-purple-200 hover:shadow-lg transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{course.thumbnail}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 mb-2">{course.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <span>⏱️ {course.duration}</span>
                            <span>📊 {course.level}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{course.rating}</span>
                            <span>👥 {course.students}</span>
                          </div>
                          <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                            {t.watchVideo}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sell Tab */}
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
                <CardTitle>{language === 'hindi' ? 'गांव का बाजार' : 'Village Marketplace'}</CardTitle>
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

        {/* Connect Tab */}
        <TabsContent value="connect" className="space-y-6">
          <Card className="border-2 border-pink-300 bg-gradient-to-br from-pink-50 to-rose-50">
            <CardHeader className="bg-gradient-to-r from-pink-400 to-rose-400 text-white text-center">
              <CardTitle>{language === 'hindi' ? 'महिला चैट ग्रुप' : 'Women\'s Chat Group'}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {chatMessages.map((msg, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 border border-pink-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-pink-700">{msg.user}</div>
                        <div className="text-gray-700 mt-1">{msg.message}</div>
                      </div>
                      <div className="text-xs text-gray-500">{msg.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Input placeholder={language === 'hindi' ? 'अपना संदेश लिखें...' : 'Type your message...'} className="flex-1" />
                <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                  📤
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Success Stories */}
          <Card className="border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-center">
              <CardTitle>⭐ {language === 'hindi' ? 'सफलता की कहानियां' : 'Success Stories'}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👩</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">रेखा देवी - बिहार</div>
                      <div className="text-sm text-gray-600">बैग बनाने का व्यवसाय</div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    {language === 'hindi' 
                      ? '"इस महीने मैंने ₹15,000 कमाए! पहले कभी इतने पैसे नहीं देखे थे।"'
                      : '"I earned ₹15,000 this month! Never seen so much money before."'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Investment Tab */}
        <TabsContent value="invest" className="space-y-6">
          <Card className="border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-green-50">
            <CardHeader className="bg-gradient-to-r from-emerald-400 to-green-400 text-white text-center">
              <CardTitle>{language === 'hindi' ? 'महिला निवेशक कार्यक्रम' : 'Women Investor Program'}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {investmentOpportunities.map((opportunity, index) => (
                  <Card key={index} className="border border-emerald-200 hover:shadow-lg transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div className="flex-1 min-w-64">
                          <h4 className="font-bold text-gray-800 mb-2">{opportunity.business}</h4>
                          <p className="text-gray-600 mb-3">{opportunity.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-green-600 font-medium">
                              🎯 {language === 'hindi' ? 'लक्ष्य:' : 'Target:'} {opportunity.needed}
                            </span>
                            <span className="text-blue-600">
                              💰 {language === 'hindi' ? 'जुटाया:' : 'Raised:'} {opportunity.raised}
                            </span>
                            <span className="text-purple-600">
                              👥 {opportunity.backers} {language === 'hindi' ? 'निवेशक' : 'backers'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mt-2">
                            {language === 'hindi' ? 'उद्यमी:' : 'Entrepreneur:'} {opportunity.entrepreneur}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                            💝 {language === 'hindi' ? 'निवेश करें' : 'Invest'}
                          </Button>
                          <Button variant="outline" className="border-emerald-300 text-emerald-700">
                            📊 {language === 'hindi' ? 'विवरण' : 'Details'}
                          </Button>
                        </div>
                      </div>
                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-emerald-500 h-2 rounded-full" 
                            style={{ width: `${(parseInt(opportunity.raised.replace('₹', '').replace(',', '')) / parseInt(opportunity.needed.replace('₹', '').replace(',', ''))) * 100}%` }}
                          ></div>
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
