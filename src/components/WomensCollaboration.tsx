
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, Users, Heart, Send, Star, Clock } from 'lucide-react';

interface WomensCollaborationProps {
  language: string;
}

const WomensCollaboration: React.FC<WomensCollaborationProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState('chat');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'Rekha Devi',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop',
      message: 'मेरा आम का अचार बहुत अच्छा बिका! ₹1200 कमाए इस हफ्ते',
      time: '2 मिनट पहले',
      likes: 12
    },
    {
      id: 2,
      user: 'Sunita Sharma',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop',
      message: 'किसी को साबुन बनाना सिखाना है? मैं सिखा सकती हूं',
      time: '5 मिनट पहले',
      likes: 8
    },
    {
      id: 3,
      user: 'Priya Kumari',
      avatar: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop',
      message: 'शादी के लिए 50 बैग का ऑर्डर आया है। कौन मदद करेगा?',
      time: '10 मिनट पहले',
      likes: 15
    }
  ]);

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'शादी के बैग बनाना',
      description: '50 हस्तनिर्मित बैग बनाने हैं। 15 दिन में पूरा करना है।',
      leader: 'Priya Kumari',
      members: 3,
      needed: 2,
      payment: '₹150 प्रति बैग',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop',
      progress: 40
    },
    {
      id: 2,
      title: 'त्योहार के लिए मिठाई',
      description: 'दिवाली के लिए 100 किलो मिठाई बनानी है। सभी को काम मिलेगा।',
      leader: 'Sunita Devi',
      members: 5,
      needed: 3,
      payment: '₹200 प्रति दिन',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop',
      progress: 60
    },
    {
      id: 3,
      title: 'सिलाई का काम',
      description: 'दुकान के लिए 30 सूट सिलने हैं। अनुभवी महिलाओं की जरूरत।',
      leader: 'Radha Singh',
      members: 2,
      needed: 3,
      payment: '₹300 प्रति सूट',
      image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=300&h=200&fit=crop',
      progress: 20
    }
  ]);

  const translations = {
    hindi: {
      chat: 'चर्चा',
      projects: 'सामूहिक काम',
      mentorship: 'मार्गदर्शन',
      typeMessage: 'संदेश लिखें...',
      send: 'भेजें',
      joinProject: 'प्रोजेक्ट जॉइन करें',
      createProject: 'नया प्रोजेक्ट',
      members: 'सदस्य',
      needed: 'और चाहिए',
      progress: 'प्रगति',
      payment: 'भुगतान'
    },
    english: {
      chat: 'Discussion',
      projects: 'Team Projects',
      mentorship: 'Mentorship',
      typeMessage: 'Type message...',
      send: 'Send',
      joinProject: 'Join Project',
      createProject: 'New Project',
      members: 'Members',
      needed: 'More Needed',
      progress: 'Progress',
      payment: 'Payment'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.hindi;

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: 'You',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop',
        message: newMessage,
        time: 'अभी',
        likes: 0
      };
      setMessages(prev => [message, ...prev]);
      setNewMessage('');
    }
  };

  const handleJoinProject = (projectId: number) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, members: project.members + 1, needed: Math.max(0, project.needed - 1) }
        : project
    ));
    alert(language === 'hindi' ? 'प्रोजेक्ट में शामिल हो गए!' : 'Joined project successfully!');
  };

  const handleLikeMessage = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
    ));
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-white rounded-full p-1 shadow-lg border-2 border-rose-200">
          <div className="flex gap-1">
            {[
              { id: 'chat', label: t.chat, icon: MessageCircle },
              { id: 'projects', label: t.projects, icon: Users },
              { id: 'mentorship', label: t.mentorship, icon: Star }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                className={`rounded-full px-4 py-2 text-sm ${
                  activeTab === tab.id 
                    ? 'bg-rose-500 text-white' 
                    : 'text-rose-700 hover:bg-rose-50'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Section */}
      {activeTab === 'chat' && (
        <div className="space-y-4">
          {/* Message Input */}
          <Card className="border-2 border-rose-200">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Input
                    placeholder={t.typeMessage}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} className="bg-rose-500 hover:bg-rose-600">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <div className="space-y-3">
            {messages.map((msg) => (
              <Card key={msg.id} className="border border-rose-100 hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src={msg.avatar} />
                      <AvatarFallback>{msg.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-800">{msg.user}</span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-gray-700 mb-2">{msg.message}</p>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLikeMessage(msg.id)}
                          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          {msg.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="text-center">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3">
              ➕ {t.createProject}
            </Button>
          </div>

          <div className="grid gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="border-2 border-green-200 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-24 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{project.title}</h3>
                          <p className="text-gray-600 text-sm">{project.description}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {project.progress}% {t.progress}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
                        <div>
                          <span className="text-gray-500">Leader:</span>
                          <span className="font-medium ml-1">{project.leader}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">{t.members}:</span>
                          <span className="font-medium ml-1">{project.members}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">{t.needed}:</span>
                          <span className="font-medium ml-1 text-orange-600">{project.needed}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">{t.payment}:</span>
                          <span className="font-medium ml-1 text-green-600">{project.payment}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleJoinProject(project.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                          disabled={project.needed === 0}
                        >
                          <Users className="w-4 h-4 mr-2" />
                          {t.joinProject}
                        </Button>
                        <Button variant="outline" className="border-green-300 text-green-700">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message Team
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Mentorship Section */}
      {activeTab === 'mentorship' && (
        <div className="space-y-4">
          <div className="grid gap-4">
            {[
              {
                name: 'Sunita Devi',
                expertise: 'साबुन और कॉस्मेटिक्स',
                experience: '5 साल',
                students: 25,
                rating: 4.8,
                image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop',
                available: true
              },
              {
                name: 'Rekha Sharma',
                expertise: 'अचार और खाना',
                experience: '8 साल',
                students: 40,
                rating: 4.9,
                image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop',
                available: true
              },
              {
                name: 'Priya Kumari',
                expertise: 'सिलाई और कपड़े',
                experience: '6 साल',
                students: 30,
                rating: 4.7,
                image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop',
                available: false
              }
            ].map((mentor, index) => (
              <Card key={index} className="border-2 border-purple-200 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={mentor.image} />
                      <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-gray-800">{mentor.name}</h3>
                        {mentor.available && (
                          <Badge className="bg-green-100 text-green-800">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                            Available
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{mentor.expertise}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{mentor.experience} अनुभव</span>
                        <span>{mentor.students} छात्र</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{mentor.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button 
                        className="bg-purple-500 hover:bg-purple-600 text-white"
                        disabled={!mentor.available}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-purple-300 text-purple-700"
                        disabled={!mentor.available}
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        Schedule Call
                      </Button>
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

export default WomensCollaboration;
