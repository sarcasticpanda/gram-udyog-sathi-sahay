
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertTriangle, TrendingUp, TrendingDown, Briefcase, Users, Droplets, Sun, Cloud, CloudRain } from 'lucide-react';

interface WeatherWidgetProps {
  language: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ language }) => {
  const [weather, setWeather] = useState({
    temperature: 28,
    condition: 'Sunny',
    humidity: 65,
    forecast: 'Clear skies today, light rain tomorrow',
    windSpeed: 12,
    rainfall: 0
  });

  const [marketPrices, setMarketPrices] = useState([
    { crop: 'Wheat', price: 25, trend: 'up', change: '+3%' },
    { crop: 'Rice', price: 32, trend: 'stable', change: '0%' },
    { crop: 'Potato', price: 20, trend: 'down', change: '-5%' },
    { crop: 'Tomato', price: 35, trend: 'up', change: '+8%' },
    { crop: 'Onion', price: 28, trend: 'up', change: '+4%' },
    { crop: 'Sugarcane', price: 15, trend: 'stable', change: '+1%' }
  ]);

  const [selectedVillage, setSelectedVillage] = useState('Jaipur');

  // Job impact analysis based on weather
  const [jobImpact, setJobImpact] = useState({
    farming: { impact: 'positive', demand: 85, reason: 'Good weather for harvesting' },
    construction: { impact: 'positive', demand: 75, reason: 'Clear skies, perfect for construction' },
    transportation: { impact: 'neutral', demand: 60, reason: 'Normal conditions' },
    tourism: { impact: 'positive', demand: 90, reason: 'Pleasant weather attracts tourists' }
  });

  const translations = {
    hindi: {
      title: 'मौसम और बाजार की जानकारी',
      village: 'गांव',
      weather: 'आज का मौसम',
      forecast: 'कल की भविष्यवाणी',
      marketPrices: 'आज के भाव (₹/किलो)',
      temperature: 'तापमान',
      humidity: 'नमी',
      windSpeed: 'हवा की गति',
      jobImpact: 'काम पर मौसम का प्रभाव',
      farming: 'खेती',
      construction: 'निर्माण',
      transportation: 'परिवहन',
      tourism: 'पर्यटन',
      conditions: {
        'Sunny': 'धूप',
        'Cloudy': 'बादल',
        'Rainy': 'बारिश'
      },
      advice: 'सलाह: कल बारिश की संभावना - फसल की कटाई जल्दी करें!',
      changeVillage: 'गांव बदलें',
      jobDemand: 'काम की मांग',
      positive: 'अच्छा',
      negative: 'खराब',
      neutral: 'सामान्य'
    },
    english: {
      title: 'Weather & Market Updates',
      village: 'Village',
      weather: 'Today\'s Weather',
      forecast: 'Tomorrow\'s Forecast',
      marketPrices: 'Today\'s Prices (₹/kg)',
      temperature: 'Temperature',
      humidity: 'Humidity',
      windSpeed: 'Wind Speed',
      jobImpact: 'Weather Impact on Jobs',
      farming: 'Farming',
      construction: 'Construction',
      transportation: 'Transportation',
      tourism: 'Tourism',
      conditions: {
        'Sunny': 'Sunny',
        'Cloudy': 'Cloudy',
        'Rainy': 'Rainy'
      },
      advice: 'Advice: Rain expected tomorrow - finish harvesting quickly!',
      changeVillage: 'Change Village',
      jobDemand: 'Job Demand',
      positive: 'Good',
      negative: 'Poor',
      neutral: 'Normal'
    }
  };

  const t = translations[language] || translations.english;

  // Simulate weather impact on jobs
  useEffect(() => {
    if (weather.condition === 'Rainy') {
      setJobImpact({
        farming: { impact: 'negative', demand: 30, reason: language === 'hindi' ? 'बारिश के कारण खेती का काम बंद' : 'Farming work stopped due to rain' },
        construction: { impact: 'negative', demand: 20, reason: language === 'hindi' ? 'बारिश में निर्माण काम नहीं हो सकता' : 'Construction work not possible in rain' },
        transportation: { impact: 'negative', demand: 40, reason: language === 'hindi' ? 'सड़कें खराब, परिवहन में समस्या' : 'Bad roads, transportation issues' },
        tourism: { impact: 'negative', demand: 25, reason: language === 'hindi' ? 'बारिश में पर्यटक नहीं आते' : 'Tourists avoid rainy weather' }
      });
    } else if (weather.condition === 'Sunny') {
      setJobImpact({
        farming: { impact: 'positive', demand: 85, reason: language === 'hindi' ? 'अच्छा मौसम, खेती के लिए उत्तम' : 'Good weather, excellent for farming' },
        construction: { impact: 'positive', demand: 90, reason: language === 'hindi' ? 'धूप में निर्माण काम तेज़ी से होता है' : 'Construction work progresses quickly in sunshine' },
        transportation: { impact: 'positive', demand: 80, reason: language === 'hindi' ? 'साफ सड़कें, परिवहन आसान' : 'Clear roads, easy transportation' },
        tourism: { impact: 'positive', demand: 95, reason: language === 'hindi' ? 'अच्छा मौसम, पर्यटकों की भीड़' : 'Good weather, tourist rush' }
      });
    }
  }, [weather.condition, language]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return <TrendingUp className="w-4 h-4" />;
      case 'negative': return <TrendingDown className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          🌤️ {t.title}
        </h2>
        
        {/* Village Selector */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-lg font-medium">{t.village}:</span>
          <Input 
            type="text" 
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
            className="w-48 text-center border-2 border-green-300"
            placeholder="Enter village name"
          />
          <Button variant="outline" className="border-green-300 text-green-700">
            {t.changeVillage}
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Enhanced Weather Card */}
        <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-sky-50">
          <CardHeader className="bg-gradient-to-r from-blue-400 to-sky-400 text-white text-center">
            <CardTitle className="text-xl flex items-center justify-center gap-2">
              {weather.condition === 'Sunny' ? <Sun className="w-6 h-6" /> : 
               weather.condition === 'Cloudy' ? <Cloud className="w-6 h-6" /> : 
               <CloudRain className="w-6 h-6" />}
              {t.weather}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-blue-600">
                {weather.temperature}°C
              </div>
              <div className="text-lg text-gray-700">
                {weather.condition === 'Sunny' ? '☀️' : weather.condition === 'Cloudy' ? '☁️' : '🌧️'} 
                {' '}{t.conditions[weather.condition] || weather.condition}
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="bg-white p-3 rounded-lg border">
                  <div className="flex items-center justify-center mb-1">
                    <Droplets className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="font-medium">{t.humidity}</div>
                  <div className="text-blue-600 font-bold">{weather.humidity}%</div>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="font-medium">{t.windSpeed}</div>
                  <div className="text-green-600 font-bold">{weather.windSpeed} km/h</div>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <div className="flex items-center justify-center mb-1">
                    <CloudRain className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="font-medium">Rainfall</div>
                  <div className="text-purple-600 font-bold">{weather.rainfall} mm</div>
                </div>
              </div>
              
              <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mt-4">
                <div className="text-sm font-medium text-yellow-800">
                  💡 {t.advice}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Prices Card */}
        <Card className="border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="bg-gradient-to-r from-green-400 to-emerald-400 text-white text-center">
            <CardTitle className="text-xl flex items-center justify-center gap-2">
              📈 {t.marketPrices}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {marketPrices.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {item.crop === 'Wheat' ? '🌾' : 
                       item.crop === 'Rice' ? '🍚' : 
                       item.crop === 'Potato' ? '🥔' : 
                       item.crop === 'Tomato' ? '🍅' :
                       item.crop === 'Onion' ? '🧅' : '🌿'}
                    </span>
                    <span className="font-medium">{item.crop}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-green-600">₹{item.price}</span>
                    <Badge className={
                      item.trend === 'up' ? 'bg-green-100 text-green-800' :
                      item.trend === 'down' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {item.trend === 'up' ? '↗️' : item.trend === 'down' ? '↘️' : '→'} {item.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
              <div className="text-sm text-blue-800">
                <strong>💰 {language === 'hindi' ? 'आज की सलाह:' : 'Today\'s Tip:'}</strong>
                <br />
                {language === 'hindi' 
                  ? 'टमाटर का भाव बढ़ रहा है - बेचने का अच्छा समय!'
                  : 'Tomato prices are rising - good time to sell!'
                }
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NEW: Weather Impact on Jobs */}
      <Card className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader className="bg-gradient-to-r from-purple-400 to-pink-400 text-white text-center">
          <CardTitle className="text-xl flex items-center justify-center gap-2">
            <Briefcase className="w-6 h-6" />
            {t.jobImpact}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(jobImpact).map(([job, data]) => (
              <div key={job} className="bg-white p-4 rounded-lg border-2 border-gray-200 hover:shadow-lg transition-all">
                <div className="text-center">
                  <div className="text-2xl mb-2">
                    {job === 'farming' ? '🚜' : 
                     job === 'construction' ? '🏗️' : 
                     job === 'transportation' ? '🚛' : '🏖️'}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    {t[job as keyof typeof t] || job}
                  </h3>
                  
                  <Badge className={`mb-3 ${getImpactColor(data.impact)}`}>
                    {getImpactIcon(data.impact)}
                    <span className="ml-1">
                      {t[data.impact as keyof typeof t] || data.impact}
                    </span>
                  </Badge>
                  
                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-1">{t.jobDemand}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          data.demand > 70 ? 'bg-green-500' : 
                          data.demand > 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${data.demand}%` }}
                      ></div>
                    </div>
                    <div className="text-lg font-bold mt-1">{data.demand}%</div>
                  </div>
                  
                  <p className="text-xs text-gray-600 italic">
                    {data.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 bg-orange-100 border border-orange-300 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-orange-800 mb-2">
                  {language === 'hindi' ? 'मौसम आधारित सलाह' : 'Weather-Based Advice'}
                </h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• {language === 'hindi' ? 'धूप में निर्माण और पर्यटन के काम बढ़ जाते हैं' : 'Construction and tourism jobs increase in sunshine'}</li>
                  <li>• {language === 'hindi' ? 'बारिश में घर के अंदर के काम देखें' : 'Look for indoor work during rain'}</li>
                  <li>• {language === 'hindi' ? 'मौसम का पूर्वानुमान देखकर काम की योजना बनाएं' : 'Plan work based on weather forecast'}</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Agricultural Calendar */}
      <Card className="border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50">
        <CardHeader className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white text-center">
          <CardTitle className="text-xl">
            📅 {language === 'hindi' ? 'खेती कैलेंडर और काम की सलाह' : 'Farming Calendar & Work Advice'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border border-orange-200 hover:shadow-lg transition-all">
              <div className="text-3xl mb-3">🌱</div>
              <div className="font-bold text-lg">
                {language === 'hindi' ? 'इस सप्ताह' : 'This Week'}
              </div>
              <div className="text-sm text-gray-600 mt-2 mb-3">
                {language === 'hindi' ? 'गेहूं की बुआई' : 'Wheat sowing'}
              </div>
              <Badge className="bg-green-100 text-green-800 text-xs">
                {language === 'hindi' ? 'काम की मांग: 80%' : 'Job Demand: 80%'}
              </Badge>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg border border-orange-200 hover:shadow-lg transition-all">
              <div className="text-3xl mb-3">💧</div>
              <div className="font-bold text-lg">
                {language === 'hindi' ? 'अगला सप्ताह' : 'Next Week'}
              </div>
              <div className="text-sm text-gray-600 mt-2 mb-3">
                {language === 'hindi' ? 'सिंचाई का समय' : 'Irrigation time'}
              </div>
              <Badge className="bg-blue-100 text-blue-800 text-xs">
                {language === 'hindi' ? 'काम की मांग: 65%' : 'Job Demand: 65%'}
              </Badge>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg border border-orange-200 hover:shadow-lg transition-all">
              <div className="text-3xl mb-3">🚜</div>
              <div className="font-bold text-lg">
                {language === 'hindi' ? 'इस महीने' : 'This Month'}
              </div>
              <div className="text-sm text-gray-600 mt-2 mb-3">
                {language === 'hindi' ? 'धान की कटाई' : 'Rice harvesting'}
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                {language === 'hindi' ? 'काम की मांग: 90%' : 'Job Demand: 90%'}
              </Badge>
            </div>
          </div>
          
          <div className="mt-6 bg-green-100 border border-green-300 rounded-lg p-4">
            <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5" />
              {language === 'hindi' ? 'आज के लिए काम की सिफारिशें' : 'Today\'s Work Recommendations'}
            </h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="bg-white p-3 rounded border">
                <strong className="text-green-700">
                  {language === 'hindi' ? '✅ करने योग्य काम:' : '✅ Recommended Work:'}
                </strong>
                <ul className="mt-1 text-gray-700">
                  <li>• {language === 'hindi' ? 'फसल की कटाई' : 'Crop harvesting'}</li>
                  <li>• {language === 'hindi' ? 'निर्माण कार्य' : 'Construction work'}</li>
                  <li>• {language === 'hindi' ? 'ट्रांसपोर्ट सेवा' : 'Transport services'}</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded border">
                <strong className="text-red-700">
                  {language === 'hindi' ? '❌ बचने योग्य काम:' : '❌ Work to Avoid:'}
                </strong>
                <ul className="mt-1 text-gray-700">
                  <li>• {language === 'hindi' ? 'बारिश में बाहरी काम' : 'Outdoor work in rain'}</li>
                  <li>• {language === 'hindi' ? 'धूप में भारी काम' : 'Heavy work in hot sun'}</li>
                  <li>• {language === 'hindi' ? 'खराब मौसम में यात्रा' : 'Travel in bad weather'}</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherWidget;
