import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const formatResponse = (text: string) => {
    // Convert markdown-style headers
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/^# (.*?)$/gm, '<h1 class="text-xl font-bold mb-2">$1</h1>');
    text = text.replace(/^## (.*?)$/gm, '<h2 class="text-lg font-semibold mb-2">$1</h2>');
    text = text.replace(/^### (.*?)$/gm, '<h3 class="text-md font-semibold mb-2">$1</h3>');
    
    // Convert bullet points with enhanced styling
    text = text.replace(/^\* (.*?)$/gm, '<div class="flex items-start space-x-2 mb-1"><span class="text-purple-500 mt-1">•</span><span class="flex-1">$1</span></div>');
    
    // Convert paragraphs
    text = text.replace(/\n\n/g, '</p><p class="mb-2">');
    
    // Wrap the entire text in a paragraph if it's not already wrapped
    if (!text.startsWith('<')) {
      text = `<p class="mb-2">${text}</p>`;
    }
    
    return text;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const key = 'AIzaSyBHo_BslzlNzFPmaj9K0v3msG0_WBfY7pY';

    const userMessage = input.trim();
    setInput("");
    
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(userMessage);
      const response = await result.response;
      const text = formatResponse(response.text());
      
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: text,
        },
      ]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      toast({
        title: "Error",
        description: "Failed to get response from Gemini. Please check your API key and try again.",
        variant: "destructive",
      });
      
      if (error.toString().includes("API key")) {
        localStorage.removeItem("gemini-api-key");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto bg-white rounded-lg shadow-xl border border-purple-100">
      <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-white">
        <h2 className="text-lg font-semibold text-purple-900">Your Personal AI Assistant</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              } animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-purple-600 to-purple-700 text-white"
                    : "bg-gradient-to-br from-gray-50 to-white border border-purple-100 text-gray-800"
                }`}
              >
                <div 
                  className="leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: message.content }}
                />
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-gradient-to-br from-gray-50 to-white border border-purple-100 text-gray-800 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border-purple-100 focus-visible:ring-purple-400"
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};