
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WeatherWidgetProps {
  language: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ language }) => {
  const [weather, setWeather] = useState({
    temperature: 28,
    condition: 'Sunny',
    humidity: 65,
    forecast: 'Clear skies today, light rain tomorrow'
  });

  const [marketPrices, setMarketPrices] = useState([
    { crop: 'Wheat', price: 25, trend: 'up' },
    { crop: 'Rice', price: 32, trend: 'stable' },
    { crop: 'Potato', price: 20, trend: 'down' },
    { crop: 'Tomato', price: 35, trend: 'up' }
  ]);

  const [selectedVillage, setSelectedVillage] = useState('Jaipur');

  const translations = {
    hindi: {
      title: 'मौसम और बाजार की जानकारी',
      village: 'गांव',
      weather: 'आज का मौसम',
      forecast: 'कल की भविष्यवाणी',
      marketPrices: 'आज के भाव (₹/किलो)',
      temperature: 'तापमान',
      humidity: 'नमी',
      conditions: {
        'Sunny': 'धूप',
        'Cloudy': 'बादल',
        'Rainy': 'बारिश'
      },
      advice: 'सलाह: कल बारिश की संभावना - फसल की कटाई जल्दी करें!',
      changeVillage: 'गांव बदलें'
    },
    english: {
      title: 'Weather & Market Updates',
      village: 'Village',
      weather: 'Today\'s Weather',
      forecast: 'Tomorrow\'s Forecast',
      marketPrices: 'Today\'s Prices (₹/kg)',
      temperature: 'Temperature',
      humidity: 'Humidity',
      conditions: {
        'Sunny': 'Sunny',
        'Cloudy': 'Cloudy',
        'Rainy': 'Rainy'
      },
      advice: 'Advice: Rain expected tomorrow - finish harvesting quickly!',
      changeVillage: 'Change Village'
    }
  };

  const t = translations[language] || translations.english;

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
        {/* Weather Card */}
        <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-sky-50">
          <CardHeader className="bg-gradient-to-r from-blue-400 to-sky-400 text-white text-center">
            <CardTitle className="text-xl flex items-center justify-center gap-2">
              🌡️ {t.weather}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-blue-600">
                {weather.temperature}°C
              </div>
              <div className="text-lg text-gray-700">
                ☀️ {t.conditions[weather.condition] || weather.condition}
              </div>
              <div className="flex justify-around text-sm">
                <div>
                  <div className="font-medium">{t.humidity}</div>
                  <div className="text-blue-600">{weather.humidity}%</div>
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
                       item.crop === 'Potato' ? '🥔' : '🍅'}
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
                      {item.trend === 'up' ? '↗️' : item.trend === 'down' ? '↘️' : '→'}
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

      {/* Agricultural Calendar */}
      <Card className="border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50">
        <CardHeader className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white text-center">
          <CardTitle className="text-xl">
            📅 {language === 'hindi' ? 'खेती कैलेंडर' : 'Farming Calendar'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border border-orange-200">
              <div className="text-2xl mb-2">🌱</div>
              <div className="font-medium">
                {language === 'hindi' ? 'इस सप्ताह' : 'This Week'}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {language === 'hindi' ? 'गेहूं की बुआई' : 'Wheat sowing'}
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-orange-200">
              <div className="text-2xl mb-2">💧</div>
              <div className="font-medium">
                {language === 'hindi' ? 'अगला सप्ताह' : 'Next Week'}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {language === 'hindi' ? 'सिंचाई का समय' : 'Irrigation time'}
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-orange-200">
              <div className="text-2xl mb-2">🚜</div>
              <div className="font-medium">
                {language === 'hindi' ? 'इस महीने' : 'This Month'}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {language === 'hindi' ? 'धान की कटाई' : 'Rice harvesting'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherWidget;
