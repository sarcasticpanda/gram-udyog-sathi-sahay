import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Clock, DollarSign, Camera, User, Star, Phone, CheckCircle } from 'lucide-react';
import VoiceHelper from './VoiceHelper';
import ProfileCreation from './ProfileCreation';

interface JobsSectionProps {
  language: string;
}

const JobsSection: React.FC<JobsSectionProps> = ({ language }) => {
  const [showPostJob, setShowPostJob] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showJobDetails, setShowJobDetails] = useState<number | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
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
      description: 'Need 3 workers for wheat harvesting. Experience preferred. Work starts at 6 AM.',
      pay: '₹350/day',
      location: 'Jaipur Village, Rajasthan',
      type: 'farming',
      posted: '2 hours ago',
      employer: 'Ramesh Sharma',
      phone: '9876543210',
      requirements: 'Physical fitness, experience with farming tools',
      duration: '5 days',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Shop Assistant',
      description: 'Helper needed for grocery shop. Morning shift 8 AM to 2 PM. Good communication skills required.',
      pay: '₹280/day',
      location: 'Kota Market, Rajasthan',
      type: 'shop',
      posted: '5 hours ago',
      employer: 'Sunita General Store',
      phone: '9123456789',
      requirements: 'Basic math, customer service',
      duration: 'Ongoing',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Construction Worker',
      description: 'Building new house, need experienced mason. Must know cement mixing and brick laying.',
      pay: '₹450/day',
      location: 'Udaipur, Rajasthan',
      type: 'construction',
      posted: '1 day ago',
      employer: 'Singh Construction',
      phone: '9987654321',
      requirements: 'Masonry experience, own tools preferred',
      duration: '2 weeks',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Vegetable Vendor Assistant',
      description: 'Help with vegetable selling at local market. Early morning work 5 AM to 11 AM.',
      pay: '₹200/day',
      location: 'Ajmer Market, Rajasthan',
      type: 'shop',
      posted: '3 hours ago',
      employer: 'Gopal Vegetable Store',
      phone: '9876543456',
      requirements: 'Early riser, basic counting',
      duration: 'Daily',
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'Rice Field Planting',
      description: 'Seasonal work for rice planting. Transportation provided from nearby villages.',
      pay: '₹320/day',
      location: 'Alwar District, Rajasthan',
      type: 'farming',
      posted: '6 hours ago',
      employer: 'Krishak Samiti',
      phone: '9234567890',
      requirements: 'No experience needed, training provided',
      duration: '10 days',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      title: 'Poultry Farm Helper',
      description: 'Help with chicken feeding and egg collection. Clean and organized work environment.',
      pay: '₹250/day',
      location: 'Bharatpur, Rajasthan',
      type: 'farming',
      posted: '8 hours ago',
      employer: 'Modern Poultry Farm',
      phone: '9345678901',
      requirements: 'Love for animals, punctuality',
      duration: 'Ongoing',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&h=300&fit=crop'
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
      requirements: 'आवश्यकताएं',
      duration: 'अवधि',
      rating: 'रेटिंग',
      applied: 'आवेदन दिया',
      details: 'विवरण देखें',
      callNow: 'अभी कॉल करें',
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
      requirements: 'Requirements',
      duration: 'Duration',
      rating: 'Rating',
      applied: 'Applied',
      details: 'View Details',
      callNow: 'Call Now',
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

  const handleApply = (jobId: number) => {
    setAppliedJobs(prev => [...prev, jobId]);
    alert(language === 'hindi' ? 'आवेदन सफल! नियोक्ता जल्द संपर्क करेगा।' : 'Application successful! Employer will contact you soon.');
  };

  const handleCall = (phone: string, employer: string) => {
    alert(language === 'hindi' 
      ? `${employer} को कॉल कर रहे हैं: ${phone}` 
      : `Calling ${employer}: ${phone}`);
  };

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
        phone: '9876543210', // Default phone number
        requirements: 'No specific requirements', // Default requirements
        duration: 'As needed', // Default duration
        rating: 4.0, // Default rating
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

      {/* Enhanced Jobs List */}
      <div className="grid gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="border-2 border-blue-200 hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex gap-4 flex-1 min-w-64">
                  <img src={job.image} alt={job.title} className="w-24 h-20 object-cover rounded-lg shadow-md" />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                      <Badge className="bg-blue-100 text-blue-800">
                        {t.jobTypes[job.type as keyof typeof t.jobTypes] || job.type}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{job.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{job.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-600">{job.pay}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-600">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{job.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4 text-purple-600" />
                        <span className="text-purple-600">{job.employer}</span>
                      </div>
                    </div>

                    {showJobDetails === job.id && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">{t.requirements}:</h4>
                        <p className="text-gray-600 mb-3">{job.requirements}</p>
                        <div className="text-sm text-gray-500">
                          {t.postedBy}: {job.employer} • {job.posted}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  {appliedJobs.includes(job.id) ? (
                    <Button disabled className="bg-green-500 text-white px-6">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {t.applied}
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleApply(job.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6"
                    >
                      📝 {t.apply}
                    </Button>
                  )}
                  <Button 
                    onClick={() => handleCall(job.phone, job.employer)}
                    className="bg-green-500 hover:bg-green-600 text-white px-6"
                  >
                    📞 {t.callNow}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowJobDetails(showJobDetails === job.id ? null : job.id)}
                    className="border-blue-300 text-blue-700"
                  >
                    ℹ️ {t.details}
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

      {/* Enhanced Worker Profile Section */}
      <Card className="border-2 border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <User className="w-6 h-6" />
            {language === 'hindi' ? 'अपनी प्रोफाइल बनाएं और काम पाएं' : 'Create Profile & Get Work'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🚜</span>
                </div>
                <h4 className="font-medium">{language === 'hindi' ? 'खेती के काम' : 'Farm Work'}</h4>
                <p className="text-sm text-gray-600">120+ {language === 'hindi' ? 'काम उपलब्ध' : 'jobs available'}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🔨</span>
                </div>
                <h4 className="font-medium">{language === 'hindi' ? 'निर्माण कार्य' : 'Construction'}</h4>
                <p className="text-sm text-gray-600">85+ {language === 'hindi' ? 'काम उपलब्ध' : 'jobs available'}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🏪</span>
                </div>
                <h4 className="font-medium">{language === 'hindi' ? 'दुकान का काम' : 'Shop Work'}</h4>
                <p className="text-sm text-gray-600">60+ {language === 'hindi' ? 'काम उपलब्ध' : 'jobs available'}</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowProfile(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 text-lg"
            >
              ✏️ {language === 'hindi' ? 'अभी प्रोफाइल बनाएं' : 'Create Profile Now'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobsSection;
