import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mic, MapPin, Clock, DollarSign, Camera, User } from 'lucide-react';
import VoiceHelper from './VoiceHelper';
import ProfileCreation from './ProfileCreation';

interface JobsSectionProps {
  language: string;
}

const JobsSection: React.FC<JobsSectionProps> = ({ language }) => {
  const [showPostJob, setShowPostJob] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    title: '',
    description: '',
    payment: '',
    location: '',
    photo: ''
  });
  
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Wheat Harvesting Help',
      description: 'Need 3 workers for wheat harvesting. Experience preferred.',
      pay: '₹300/day',
      location: 'Jaipur Village',
      type: 'farming',
      posted: '2 hours ago',
      employer: 'Ramesh Sharma',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Shop Assistant',
      description: 'Helper needed for grocery shop. Morning shift.',
      pay: '₹250/day',
      location: 'Kota Market',
      type: 'shop',
      posted: '5 hours ago',
      employer: 'Grocery Store',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Construction Worker',
      description: 'Building new house, need experienced mason.',
      pay: '₹400/day',
      location: 'Udaipur',
      type: 'construction',
      posted: '1 day ago',
      employer: 'Singh Construction',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'
    }
  ]);

  const translations = {
    hindi: {
      title: 'पास के काम',
      postJob: 'काम पोस्ट करें',
      createProfile: 'प्रोफाइल बनाएं',
      jobTitle: 'काम का नाम',
      description: 'विवरण',
      payment: 'पैसे',
      location: 'जगह',
      photo: 'फोटो अपलोड करें',
      apply: 'आवेदन करें',
      contact: 'संपर्क करें',
      postedBy: 'द्वारा पोस्ट',
      ago: 'पहले',
      jobTypes: {
        farming: '🚜 खेती',
        construction: '🔨 निर्माण',
        shop: '🏪 दुकान'
      },
      cancel: 'रद्द करें',
      save: 'पोस्ट करें'
    },
    english: {
      title: 'Jobs Nearby',
      postJob: 'Post a Job',
      createProfile: 'Create Profile',
      jobTitle: 'Job Title',
      description: 'Description',
      payment: 'Payment',
      location: 'Location',
      photo: 'Upload Photo',
      apply: 'Apply Now',
      contact: 'Contact',
      postedBy: 'Posted by',
      ago: 'ago',
      jobTypes: {
        farming: '🚜 Farming',
        construction: '🔨 Construction',
        shop: '🏪 Shop Work'
      },
      cancel: 'Cancel',
      save: 'Post Job'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.english;

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('title') || lowerCommand.includes('काम')) {
      setJobFormData(prev => ({ ...prev, title: command }));
    } else if (lowerCommand.includes('description') || lowerCommand.includes('विवरण')) {
      setJobFormData(prev => ({ ...prev, description: command }));
    } else if (lowerCommand.includes('payment') || lowerCommand.includes('पैसे')) {
      setJobFormData(prev => ({ ...prev, payment: command }));
    } else if (lowerCommand.includes('location') || lowerCommand.includes('जगह')) {
      setJobFormData(prev => ({ ...prev, location: command }));
    }
  };

  const handlePhotoUpload = () => {
    // Simulate photo upload
    const photoUrl = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop';
    setJobFormData(prev => ({ ...prev, photo: photoUrl }));
  };

  const handleJobSubmit = () => {
    if (jobFormData.title && jobFormData.description) {
      const newJob = {
        id: jobs.length + 1,
        title: jobFormData.title,
        description: jobFormData.description,
        pay: jobFormData.payment || '₹300/day',
        location: jobFormData.location || 'Local Area',
        type: 'general',
        posted: 'Just now',
        employer: 'आप',
        image: jobFormData.photo || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop'
      };
      
      setJobs(prev => [newJob, ...prev]);
      setJobFormData({ title: '', description: '', payment: '', location: '', photo: '' });
      setShowPostJob(false);
      
      alert(language === 'hindi' ? 'काम सफलतापूर्वक पोस्ट हो गया!' : 'Job posted successfully!');
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
          <Button 
            onClick={() => setShowProfile(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-lg rounded-full"
          >
            <User className="w-5 h-5 mr-2" />
            {t.createProfile}
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
            {/* Photo Upload */}
            <div className="text-center">
              {jobFormData.photo ? (
                <img src={jobFormData.photo} alt="Job" className="w-32 h-24 object-cover rounded-lg mx-auto mb-3" />
              ) : (
                <div className="w-32 h-24 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Camera className="w-8 h-8 text-gray-500" />
                </div>
              )}
              <Button variant="outline" onClick={handlePhotoUpload} className="text-sm">
                <Camera className="w-4 h-4 mr-2" />
                {t.photo}
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t.jobTitle}</label>
              <div className="flex gap-2">
                <Input
                  value={jobFormData.title}
                  onChange={(e) => setJobFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Wheat harvesting helper"
                  className="flex-1"
                />
                <VoiceHelper onVoiceCommand={handleVoiceCommand} language={language} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t.description}</label>
              <div className="flex gap-2">
                <Textarea
                  value={jobFormData.description}
                  onChange={(e) => setJobFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the work needed..."
                  className="min-h-20 flex-1"
                />
                <VoiceHelper onVoiceCommand={handleVoiceCommand} language={language} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t.payment}</label>
                <div className="flex gap-2">
                  <Input
                    value={jobFormData.payment}
                    onChange={(e) => setJobFormData(prev => ({ ...prev, payment: e.target.value }))}
                    placeholder="₹300/day"
                    className="flex-1"
                  />
                  <VoiceHelper onVoiceCommand={handleVoiceCommand} language={language} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.location}</label>
                <div className="flex gap-2">
                  <Input
                    value={jobFormData.location}
                    onChange={(e) => setJobFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Village/Area name"
                    className="flex-1"
                  />
                  <VoiceHelper onVoiceCommand={handleVoiceCommand} language={language} />
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <Button onClick={handleJobSubmit} className="bg-green-500 hover:bg-green-600 text-white px-8">
                📤 {t.save}
              </Button>
              <Button variant="outline" onClick={() => setShowPostJob(false)}>
                {t.cancel}
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
                <div className="flex gap-4 flex-1 min-w-64">
                  <img src={job.image} alt={job.title} className="w-20 h-16 object-cover rounded-lg" />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                      <Badge className="bg-blue-100 text-blue-800">
                        {t.jobTypes[job.type as keyof typeof t.jobTypes] || job.type}
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

      {/* Profile Creation Modal */}
      {showProfile && (
        <ProfileCreation 
          language={language} 
          onClose={() => setShowProfile(false)} 
        />
      )}

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
            <Button 
              onClick={() => setShowProfile(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3"
            >
              ✏️ {language === 'hindi' ? 'प्रोफाइल बनाएं' : 'Create Profile'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobsSection;
