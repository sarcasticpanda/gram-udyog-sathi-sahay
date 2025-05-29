
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mic, MapPin, Clock, DollarSign } from 'lucide-react';

interface JobsSectionProps {
  language: string;
}

const JobsSection: React.FC<JobsSectionProps> = ({ language }) => {
  const [showPostJob, setShowPostJob] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Wheat Harvesting Help',
      description: 'Need 3 workers for wheat harvesting. Experience preferred.',
      pay: '₹300/day',
      location: 'Jaipur Village',
      type: 'farming',
      posted: '2 hours ago',
      employer: 'Ramesh Sharma'
    },
    {
      id: 2,
      title: 'Shop Assistant',
      description: 'Helper needed for grocery shop. Morning shift.',
      pay: '₹250/day',
      location: 'Kota Market',
      type: 'shop',
      posted: '5 hours ago',
      employer: 'Grocery Store'
    },
    {
      id: 3,
      title: 'Construction Worker',
      description: 'Building new house, need experienced mason.',
      pay: '₹400/day',
      location: 'Udaipur',
      type: 'construction',
      posted: '1 day ago',
      employer: 'Singh Construction'
    }
  ]);

  const translations = {
    hindi: {
      title: 'पास के काम',
      postJob: 'काम पोस्ट करें',
      findWork: 'काम खोजें',
      jobTitle: 'काम का नाम',
      description: 'विवरण',
      payment: 'पैसे',
      location: 'जगह',
      useVoice: 'आवाज से बोलें',
      apply: 'आवेदन करें',
      contact: 'संपर्क करें',
      postedBy: 'द्वारा पोस्ट',
      ago: 'पहले',
      jobTypes: {
        farming: '🚜 खेती',
        construction: '🔨 निर्माण',
        shop: '🏪 दुकान'
      }
    },
    english: {
      title: 'Jobs Nearby',
      postJob: 'Post a Job',
      findWork: 'Find Work',
      jobTitle: 'Job Title',
      description: 'Description',
      payment: 'Payment',
      location: 'Location',
      useVoice: 'Use Voice',
      apply: 'Apply Now',
      contact: 'Contact',
      postedBy: 'Posted by',
      ago: 'ago',
      jobTypes: {
        farming: '🚜 Farming',
        construction: '🔨 Construction',
        shop: '🏪 Shop Work'
      }
    }
  };

  const t = translations[language] || translations.english;

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // Simulate voice recording
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        // Simulated voice-to-text result
      }, 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          🚜 {t.title}
        </h2>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button 
            onClick={() => setShowPostJob(!showPostJob)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-lg rounded-full"
          >
            ➕ {t.postJob}
          </Button>
        </div>
      </div>

      {/* Post Job Form */}
      {showPostJob && (
        <Card className="border-2 border-green-300 bg-green-50">
          <CardHeader className="bg-gradient-to-r from-green-400 to-blue-400 text-white">
            <CardTitle className="text-center">{t.postJob}</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t.jobTitle}</label>
              <div className="flex gap-2">
                <Input placeholder="e.g., Wheat harvesting helper" className="flex-1" />
                <Button 
                  variant="outline" 
                  onClick={handleVoiceRecord}
                  className={`px-4 ${isRecording ? 'bg-red-100 border-red-400' : 'border-green-400'}`}
                >
                  <Mic className={`w-4 h-4 ${isRecording ? 'text-red-600' : 'text-green-600'}`} />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t.description}</label>
              <Textarea placeholder="Describe the work needed..." className="min-h-20" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t.payment}</label>
                <Input placeholder="₹300/day" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.location}</label>
                <Input placeholder="Village/Area name" />
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <Button className="bg-green-500 hover:bg-green-600 text-white px-8">
                📤 {language === 'hindi' ? 'पोस्ट करें' : 'Post Job'}
              </Button>
              <Button variant="outline" onClick={() => setShowPostJob(false)}>
                {language === 'hindi' ? 'रद्द करें' : 'Cancel'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Jobs List */}
      <div className="grid gap-4">
        {jobs.map((job) => (
          <Card key={job.id} className="border-2 border-blue-200 hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex-1 min-w-64">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                    <Badge className="bg-blue-100 text-blue-800">
                      {t.jobTypes[job.type] || job.type}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{job.description}</p>
                  
                  <div className="flex items-center gap-4 flex-wrap text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-600">{job.pay}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{job.posted}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-2">
                    {t.postedBy}: {job.employer}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">
                    📞 {t.contact}
                  </Button>
                  <Button variant="outline" className="border-blue-300 text-blue-700">
                    ℹ️ {language === 'hindi' ? 'विवरण' : 'Details'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Worker Profile Quick Setup */}
      <Card className="border-2 border-purple-300 bg-purple-50">
        <CardHeader className="bg-gradient-to-r from-purple-400 to-pink-400 text-white text-center">
          <CardTitle>
            👤 {language === 'hindi' ? 'अपनी प्रोफाइल बनाएं' : 'Create Your Profile'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <p className="text-gray-700">
              {language === 'hindi' 
                ? 'अपने हुनर बताएं और काम आसानी से पाएं!'
                : 'Tell us your skills and find work easily!'
              }
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">🚜 {language === 'hindi' ? 'खेती' : 'Farming'}</Badge>
              <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">🔨 {language === 'hindi' ? 'निर्माण' : 'Construction'}</Badge>
              <Badge className="bg-orange-100 text-orange-800 text-lg px-4 py-2">🏪 {language === 'hindi' ? 'दुकान' : 'Shop Work'}</Badge>
            </div>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3">
              ✏️ {language === 'hindi' ? 'प्रोफाइल बनाएं' : 'Create Profile'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobsSection;
