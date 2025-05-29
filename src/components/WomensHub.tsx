import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, ShoppingBag, Users, DollarSign, Star, Play, Heart, TrendingUp, Camera, Plus, Target, IndianRupee } from 'lucide-react';
import VoiceHelper from './VoiceHelper';
import WomensCollaboration from './WomensCollaboration';

interface WomensHubProps {
  language: string;
}

const WomensHub: React.FC<WomensHubProps> = ({ language }) => {
  const [activeSection, setActiveSection] = useState('skills');
  const [showProductForm, setShowProductForm] = useState(false);
  const [showInvestmentForm, setShowInvestmentForm] = useState(false);
  const [investmentType, setInvestmentType] = useState<'raise' | 'request'>('raise');
  
  const [productFormData, setProductFormData] = useState({
    name: '',
    description: '',
    price: '',
    photo: ''
  });

  const [investmentFormData, setInvestmentFormData] = useState({
    businessName: '',
    description: '',
    amount: '',
    purpose: '',
    returns: '',
    timeline: '',
    photo: ''
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'आम का अचार',
      price: '₹120/jar',
      seller: 'Rekha Devi',
      location: 'Jaipur',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop',
      rating: 4.8,
      sales: 45
    },
    {
      id: 2,
      name: 'हस्तनिर्मित बैग',
      price: '₹250/piece',
      seller: 'Sunita Sharma',
      location: 'Udaipur',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
      rating: 4.9,
      sales: 32
    }
  ]);

  const [investments, setInvestments] = useState([
    {
      id: 1,
      name: 'Radha Singh',
      business: 'साबुन का कारोबार',
      goal: '₹10,000',
      raised: '₹7,500',
      investors: 12,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop',
      description: 'हर्बल साबुन बनाकर बेचना चाहती हूं। पहले से 50 साबुन बेच चुकी हूं।',
      returns: '15% वार्षिक',
      timeline: '6 महीने'
    },
    {
      id: 2,
      name: 'Sunita Devi',
      business: 'अचार का व्यापार',
      goal: '₹15,000',
      raised: '₹5,000',
      investors: 8,
      image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&h=200&fit=crop',
      description: 'घर का बना अचार ऑनलाइन बेचना चाहती हूं। स्वादिष्ट और शुद्ध।',
      returns: '20% वार्षिक',
      timeline: '8 महीने'
    }
  ]);

  const translations = {
    hindi: {
      title: 'महिला सशक्तिकरण केंद्र',
      learn: 'सीखें',
      sell: 'बेचें',
      connect: 'जुड़ें',
      invest: 'निवेश',
      learnSkills: 'नई कलाएं सीखें',
      sellProducts: 'अपने उत्पाद बेचें',
      connectWomen: 'महिलाओं से जुड़ें',
      getInvestment: 'निवेश प्राप्त करें',
      raiseInvestment: 'निवेश जुटाएं',
      requestInvestment: 'निवेश मांगें',
      categories: {
        all: 'सभी',
        food: '🍛 खाना',
        crafts: '🎨 हस्तकला',
        beauty: '💄 सौंदर्य',
        digital: '💻 डिजिटल',
        tourism: 'पर्यटन'
      }
    },
    english: {
      title: 'Women\'s Empowerment Hub',
      learn: 'Learn',
      sell: 'Sell',
      connect: 'Connect',
      invest: 'Invest',
      learnSkills: 'Learn New Skills',
      sellProducts: 'Sell Your Products',
      connectWomen: 'Connect with Women',
      getInvestment: 'Get Investment',
      raiseInvestment: 'Raise Investment',
      requestInvestment: 'Request Investment',
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

  const handleProductSubmit = () => {
    if (productFormData.name && productFormData.price) {
      const newProduct = {
        id: products.length + 1,
        name: productFormData.name,
        price: productFormData.price,
        seller: 'आप',
        location: 'आपका क्षेत्र',
        image: productFormData.photo || 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop',
        rating: 5.0,
        sales: 0
      };
      
      setProducts(prev => [newProduct, ...prev]);
      setProductFormData({ name: '', description: '', price: '', photo: '' });
      setShowProductForm(false);
      
      alert(language === 'hindi' ? 'उत्पाद सफलतापूर्वक जोड़ा गया!' : 'Product added successfully!');
    }
  };

  const handleInvestmentSubmit = () => {
    if (investmentFormData.businessName && investmentFormData.amount) {
      const newInvestment = {
        id: investments.length + 1,
        name: 'आप',
        business: investmentFormData.businessName,
        goal: `₹${investmentFormData.amount}`,
        raised: '₹0',
        investors: 0,
        image: investmentFormData.photo || 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop',
        description: investmentFormData.description,
        returns: investmentFormData.returns,
        timeline: investmentFormData.timeline
      };
      
      setInvestments(prev => [newInvestment, ...prev]);
      setInvestmentFormData({ businessName: '', description: '', amount: '', purpose: '', returns: '', timeline: '', photo: '' });
      setShowInvestmentForm(false);
      
      alert(language === 'hindi' ? 'निवेश अवसर सफलतापूर्वक जोड़ा गया!' : 'Investment opportunity added successfully!');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-rose-800 mb-4">
          👩‍🌾 {language === 'hindi' ? 'महिला सशक्तिकरण केंद्र' : 'Women Empowerment Hub'}
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          {language === 'hindi' 
            ? 'सीखें, बेचें, कमाएं और एक-दूसरे का साथ दें। आपका सपनों का कारोबार यहीं से शुरू होता है।'
            : 'Learn, Sell, Earn and Support Each Other. Your dream business starts here.'
          }
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="bg-white rounded-full p-1 shadow-lg border-2 border-rose-200">
          <div className="flex gap-1">
            {[
              { id: 'skills', label: language === 'hindi' ? '🎓 नई कलाएं' : '🎓 New Skills', icon: BookOpen },
              { id: 'marketplace', label: language === 'hindi' ? '🛒 बाजार' : '🛒 Marketplace', icon: ShoppingBag },
              { id: 'collaboration', label: language === 'hindi' ? '🤝 सहयोग' : '🤝 Collaboration', icon: Users },
              { id: 'investment', label: language === 'hindi' ? '💰 निवेश' : '💰 Investment', icon: DollarSign }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeSection === tab.id ? "default" : "ghost"}
                className={`rounded-full px-4 py-2 text-sm ${
                  activeSection === tab.id 
                    ? 'bg-rose-500 text-white shadow-md' 
                    : 'text-rose-700 hover:bg-rose-50'
                }`}
                onClick={() => setActiveSection(tab.id)}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      {activeSection === 'skills' && (
        <div className="space-y-6">
          {/* Categories Filter */}
          <div className="flex justify-center">
            <div className="flex gap-2 flex-wrap">
              {[
                { id: 'all', label: language === 'hindi' ? 'सभी' : 'All', color: 'bg-gray-500' },
                { id: 'food', label: language === 'hindi' ? '🍛 खाना' : '🍛 Food', color: 'bg-orange-500' },
                { id: 'crafts', label: language === 'hindi' ? '🎨 हस्तकला' : '🎨 Crafts', color: 'bg-purple-500' },
                { id: 'beauty', label: language === 'hindi' ? '💄 सौंदर्य' : '💄 Beauty', color: 'bg-pink-500' },
                { id: 'digital', label: language === 'hindi' ? '💻 डिजिटल' : '💻 Digital', color: 'bg-blue-500' }
              ].map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  className={`${category.color} text-white border-none hover:opacity-80`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Enhanced Skills Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'आम का अचार बनाना',
                duration: '15 मिनट',
                difficulty: 'आसान',
                rating: 4.8,
                learners: 234,
                image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
                category: 'food'
              },
              {
                title: 'हस्तनिर्मित साबुन',
                duration: '25 मिनट',
                difficulty: 'मध्यम',
                rating: 4.9,
                learners: 189,
                image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=300&fit=crop',
                category: 'beauty'
              },
              {
                title: 'बैग बनाना',
                duration: '30 मिनट',
                difficulty: 'मध्यम',
                rating: 4.7,
                learners: 156,
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
                category: 'crafts'
              },
              {
                title: 'UPI पेमेंट सीखें',
                duration: '10 मिनट',
                difficulty: 'आसान',
                rating: 4.6,
                learners: 345,
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
                category: 'digital'
              },
              {
                title: 'मसाले बनाना',
                duration: '20 मिनट',
                difficulty: 'आसान',
                rating: 4.8,
                learners: 123,
                image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop',
                category: 'food'
              },
              {
                title: 'पेपर क्राफ्ट',
                duration: '35 मिनट',
                difficulty: 'कठिन',
                rating: 4.5,
                learners: 89,
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
                category: 'crafts'
              }
            ].map((skill, index) => (
              <Card key={index} className="border-2 border-pink-200 hover:shadow-xl transition-all transform hover:scale-105">
                <div className="relative">
                  <img src={skill.image} alt={skill.title} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-sm">
                    {skill.duration}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4 py-2">
                      <Play className="w-4 h-4 mr-2" />
                      वीडियो देखें
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{skill.title}</h3>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <Badge className="bg-green-100 text-green-800">{skill.difficulty}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{skill.rating}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {skill.learners} लोगों ने सीखा
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Marketplace Section */}
      {activeSection === 'marketplace' && (
        <div className="space-y-6">
          <div className="text-center">
            <Button 
              onClick={() => setShowProductForm(!showProductForm)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-lg rounded-full"
            >
              ➕ {language === 'hindi' ? 'उत्पाद बेचें' : 'Sell Product'}
            </Button>
          </div>

          {/* Product Form */}
          {showProductForm && (
            <Card className="border-2 border-green-300 bg-green-50">
              <CardHeader className="bg-gradient-to-r from-green-400 to-blue-400 text-white">
                <CardTitle className="text-center">
                  {language === 'hindi' ? 'अपना उत्पाद बेचें' : 'Sell Your Product'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  {productFormData.photo ? (
                    <img src={productFormData.photo} alt="Product" className="w-32 h-24 object-cover rounded-lg mx-auto mb-3" />
                  ) : (
                    <div className="w-32 h-24 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Camera className="w-8 h-8 text-gray-500" />
                    </div>
                  )}
                  <Button variant="outline" className="text-sm">
                    <Camera className="w-4 h-4 mr-2" />
                    {language === 'hindi' ? 'फोटो अपलोड करें' : 'Upload Photo'}
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === 'hindi' ? 'उत्पाद का नाम' : 'Product Name'}
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={productFormData.name}
                      onChange={(e) => setProductFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder={language === 'hindi' ? 'जैसे: आम का अचार' : 'e.g., Mango Pickle'}
                      className="flex-1"
                    />
                    <VoiceHelper language={language} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === 'hindi' ? 'विवरण' : 'Description'}
                  </label>
                  <div className="flex gap-2">
                    <Textarea
                      value={productFormData.description}
                      onChange={(e) => setProductFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder={language === 'hindi' ? 'अपने उत्पाद के बारे में बताएं...' : 'Tell about your product...'}
                      className="min-h-20 flex-1"
                    />
                    <VoiceHelper language={language} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === 'hindi' ? 'कीमत' : 'Price'}
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={productFormData.price}
                      onChange={(e) => setProductFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="₹100"
                      className="flex-1"
                    />
                    <VoiceHelper language={language} />
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <Button onClick={handleProductSubmit} className="bg-green-500 hover:bg-green-600 text-white px-8">
                    {language === 'hindi' ? 'उत्पाद जोड़ें' : 'Add Product'}
                  </Button>
                  <Button variant="outline" onClick={() => setShowProductForm(false)}>
                    {language === 'hindi' ? 'रद्द करें' : 'Cancel'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Products Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="border-2 border-blue-200 hover:shadow-lg transition-all">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                    {product.price}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-gray-600">by {product.seller}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{product.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{product.sales} बिके</span>
                    <div className="flex gap-2">
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4">
                        खरीदें
                      </Button>
                      <Button variant="outline" className="text-sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Collaboration Section */}
      {activeSection === 'collaboration' && (
        <WomensCollaboration language={language} />
      )}

      {/* Enhanced Investment Section */}
      {activeSection === 'investment' && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {language === 'hindi' ? '💰 निवेश और फंडिंग' : '💰 Investment & Funding'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'hindi' 
                ? 'अपना व्यापार बढ़ाने के लिए निवेश जुटाएं या दूसरों के सपनों में निवेश करें'
                : 'Raise investment to grow your business or invest in others\' dreams'
              }
            </p>
            
            <div className="flex justify-center gap-4 flex-wrap">
              <Button 
                onClick={() => {
                  setShowInvestmentForm(true);
                  setInvestmentType('raise');
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-lg rounded-full"
              >
                <Plus className="w-5 h-5 mr-2" />
                {language === 'hindi' ? 'निवेश जुटाएं' : 'Raise Investment'}
              </Button>
              <Button 
                onClick={() => {
                  setShowInvestmentForm(true);
                  setInvestmentType('request');
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-lg rounded-full"
              >
                <Target className="w-5 h-5 mr-2" />
                {language === 'hindi' ? 'निवेश मांगें' : 'Request Investment'}
              </Button>
            </div>
          </div>

          {/* Investment Form */}
          {showInvestmentForm && (
            <Card className="border-2 border-purple-300 bg-purple-50">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <CardTitle className="text-center">
                  {investmentType === 'raise' 
                    ? (language === 'hindi' ? 'निवेश जुटाएं' : 'Raise Investment')
                    : (language === 'hindi' ? 'निवेश मांगें' : 'Request Investment')
                  }
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  {investmentFormData.photo ? (
                    <img src={investmentFormData.photo} alt="Business" className="w-32 h-24 object-cover rounded-lg mx-auto mb-3" />
                  ) : (
                    <div className="w-32 h-24 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Camera className="w-8 h-8 text-gray-500" />
                    </div>
                  )}
                  <Button variant="outline" className="text-sm">
                    <Camera className="w-4 h-4 mr-2" />
                    {language === 'hindi' ? 'व्यापार फोटो अपलोड करें' : 'Upload Business Photo'}
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === 'hindi' ? 'व्यापार का नाम' : 'Business Name'}
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={investmentFormData.businessName}
                      onChange={(e) => setInvestmentFormData(prev => ({ ...prev, businessName: e.target.value }))}
                      placeholder={language === 'hindi' ? 'जैसे: साबुन का कारोबार' : 'e.g., Soap Business'}
                      className="flex-1"
                    />
                    <VoiceHelper language={language} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === 'hindi' ? 'व्यापार का विवरण' : 'Business Description'}
                  </label>
                  <div className="flex gap-2">
                    <Textarea
                      value={investmentFormData.description}
                      onChange={(e) => setInvestmentFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder={language === 'hindi' ? 'अपने व्यापार के बारे में बताएं...' : 'Tell about your business...'}
                      className="min-h-20 flex-1"
                    />
                    <VoiceHelper language={language} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'hindi' ? 'कितनी राशि चाहिए' : 'Amount Needed'}
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={investmentFormData.amount}
                        onChange={(e) => setInvestmentFormData(prev => ({ ...prev, amount: e.target.value }))}
                        placeholder="₹10,000"
                        className="flex-1"
                      />
                      <VoiceHelper language={language} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'hindi' ? 'वापसी दर' : 'Return Rate'}
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={investmentFormData.returns}
                        onChange={(e) => setInvestmentFormData(prev => ({ ...prev, returns: e.target.value }))}
                        placeholder={language === 'hindi' ? '15% वार्षिक' : '15% Annual'}
                        className="flex-1"
                      />
                      <VoiceHelper language={language} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === 'hindi' ? 'समयसीमा' : 'Timeline'}
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={investmentFormData.timeline}
                      onChange={(e) => setInvestmentFormData(prev => ({ ...prev, timeline: e.target.value }))}
                      placeholder={language === 'hindi' ? '6 महीने' : '6 months'}
                      className="flex-1"
                    />
                    <VoiceHelper language={language} />
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <Button onClick={handleInvestmentSubmit} className="bg-purple-500 hover:bg-purple-600 text-white px-8">
                    <IndianRupee className="w-4 h-4 mr-2" />
                    {language === 'hindi' ? 'सबमिट करें' : 'Submit'}
                  </Button>
                  <Button variant="outline" onClick={() => setShowInvestmentForm(false)}>
                    {language === 'hindi' ? 'रद्द करें' : 'Cancel'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Investment Opportunities Grid */}
          <div className="grid gap-6">
            {investments.map((investment, index) => (
              <Card key={index} className="border-2 border-green-200 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img 
                      src={investment.image} 
                      alt={investment.name}
                      className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{investment.name}</h3>
                          <p className="text-green-600 font-medium">{investment.business}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {Math.round((parseInt(investment.raised.replace('₹', '').replace(',', '')) / parseInt(investment.goal.replace('₹', '').replace(',', ''))) * 100)}% Funded
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-4">{investment.description}</p>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Target</div>
                          <div className="text-lg font-bold text-blue-800">{investment.goal}</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-sm text-green-600 font-medium">Returns</div>
                          <div className="text-lg font-bold text-green-800">{investment.returns}</div>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <div className="text-sm text-purple-600 font-medium">Timeline</div>
                          <div className="text-lg font-bold text-purple-800">{investment.timeline}</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Goal: {investment.goal}</span>
                            <span>Raised: {investment.raised}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ 
                                width: `${(parseInt(investment.raised.replace('₹', '').replace(',', '')) / parseInt(investment.goal.replace('₹', '').replace(',', ''))) * 100}%` 
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{investment.investors} निवेशक</span>
                          <div className="flex gap-2">
                            <Button className="bg-green-500 hover:bg-green-600 text-white">
                              <DollarSign className="w-4 h-4 mr-2" />
                              निवेश करें
                            </Button>
                            <Button variant="outline" className="border-green-300 text-green-700">
                              <TrendingUp className="w-4 h-4 mr-2" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WomensHub;
