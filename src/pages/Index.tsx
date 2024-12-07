import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Brain, Lightbulb, Target } from "lucide-react";
import { ChatInterface } from "@/components/ChatInterface";
import { useState } from "react";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Personal AI  Assistant
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Transform your learning experience with AI-powered study tools, personalized guidance, and interactive exercises.
          </p>
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6"
            onClick={() => setShowChat(true)}
          >
            Get Started <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>

      {/* Chat Interface */}
      {showChat && (
        <div className="container mx-auto px-4 py-8">
          <ChatInterface />
        </div>
      )}

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Brain className="w-8 h-8 text-purple-600" />}
            title="AI-Powered Learning"
            description="Get intelligent answers and explanations tailored to your learning style"
          />
          <FeatureCard
            icon={<Target className="w-8 h-8 text-purple-600" />}
            title="Personalized Path"
            description="Follow a customized learning journey based on your goals"
          />
          <FeatureCard
            icon={<BookOpen className="w-8 h-8 text-purple-600" />}
            title="Interactive Study"
            description="Engage with dynamic exercises and quizzes"
          />
          <FeatureCard
            icon={<Lightbulb className="w-8 h-8 text-purple-600" />}
            title="Smart Insights"
            description="Track your progress and receive intelligent recommendations"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already experiencing the future of education.
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            className="text-purple-600"
            onClick={() => setShowChat(true)}
          >
            Start Learning Now
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <Card className="transition-transform hover:scale-105">
      <CardContent className="p-6 text-center">
        <div className="mb-4 flex justify-center">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Index;