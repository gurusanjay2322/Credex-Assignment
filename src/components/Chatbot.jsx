import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Predefined responses with follow-up suggestions
const RESPONSES = {
  "welcome": {
    message: "Hi there! 👋 I'm your SoftSell assistant. I can help you with:",
    suggestions: [
      "What is SoftSell?",
      "How does it work?",
      "What licenses do you accept?",
      "How much can I get for my license?"
    ]
  },
  "what is softsell": {
    message: "SoftSell is a software license resale platform that helps businesses and individuals sell their unused software licenses quickly and securely. We help you get the best value for your digital assets.",
    suggestions: [
      "How does it work?",
      "What licenses do you accept?",
      "Is it secure?",
      "How much can I get?"
    ]
  },
  "how does it work": {
    message: "The process is simple: 1) Upload your license details securely through our platform, 2) Receive a fair market value assessment within 24 hours, and 3) Get paid quickly and securely once the sale is complete.",
    suggestions: [
      "What licenses do you accept?",
      "How long does it take?",
      "Is it secure?",
      "How much can I get?"
    ]
  },
  "what licenses do you accept": {
    message: "We accept various software licenses including Adobe, Microsoft, Autodesk, and other major software providers. You can select your license type when submitting your request.",
    suggestions: [
      "How much can I get?",
      "How long does it take?",
      "Is it secure?",
      "How do I start?"
    ]
  },
  "how long does it take": {
    message: "The entire process can be completed in as little as 24 hours. We provide quick valuations and ensure fast, secure payments once the sale is complete.",
    suggestions: [
      "Is it secure?",
      "How much can I get?",
      "What licenses do you accept?",
      "How do I contact you?"
    ]
  },
  "is it secure": {
    message: "Yes, we provide bank-level security for all license transfers and payments. Your transactions and data are protected with industry-standard security measures.",
    suggestions: [
      "How much can I get?",
      "How long does it take?",
      "How do I start?",
      "What makes you different?"
    ]
  },
  "how much can i get": {
    message: "You can get up to 80% of retail value for your licenses. The exact amount depends on the type and condition of your license.",
    suggestions: [
      "What licenses do you accept?",
      "How long does it take?",
      "How do I start?",
      "Is it secure?"
    ]
  },
  "how do i contact you": {
    message: "You can reach us through our contact form on the website, or directly via email at info@softsell.com or phone at (555) 123-4567.",
    suggestions: [
      "What makes you different?",
      "Do you have customer support?",
      "Where are you located?",
      "How do I start?"
    ]
  },
  "what makes you different": {
    message: "We offer secure transactions, quick process (24-hour completion), best value (up to 80% of retail), and expert support to guide you through the process.",
    suggestions: [
      "How do I start?",
      "Is it secure?",
      "How much can I get?",
      "Do you have customer support?"
    ]
  },
  "where are you located": {
    message: "Our office is located at 123 Tech Street, San Francisco, CA 94105.",
    suggestions: [
      "How do I contact you?",
      "Do you have customer support?",
      "What makes you different?",
      "How do I start?"
    ]
  },
  "do you have customer support": {
    message: "Yes, we have a dedicated team of experts to guide you through the process. You can reach our support team through the contact form or directly via email and phone.",
    suggestions: [
      "How do I contact you?",
      "What makes you different?",
      "How do I start?",
      "Is it secure?"
    ]
  },
  "how do i start": {
    message: "Getting started is easy! Just visit our website, click on 'Sell Your License', and follow the simple steps to submit your license details. Our team will review your submission within 24 hours.",
    suggestions: [
      "What licenses do you accept?",
      "How much can I get?",
      "Is it secure?",
      "How long does it take?"
    ]
  }
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [{ role: "assistant", content: RESPONSES.welcome.message, suggestions: RESPONSES.welcome.suggestions }];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const getResponse = (question) => {
    const normalizedQuestion = question.toLowerCase().trim();
    
    // Check for exact matches
    if (RESPONSES[normalizedQuestion]) {
      return RESPONSES[normalizedQuestion];
    }
    
    // Check for partial matches
    for (const [key, value] of Object.entries(RESPONSES)) {
      if (normalizedQuestion.includes(key)) {
        return value;
      }
    }
    
    // Default response for unknown questions
    return {
      message: "I'm sorry, I can only answer questions about SoftSell's services, process, and general information. Here are some topics I can help you with:",
      suggestions: [
        "What is SoftSell?",
        "How does it work?",
        "What licenses do you accept?",
        "How much can I get?"
      ]
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const response = getResponse(userMessage);
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: response.message,
          suggestions: response.suggestions
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    const newMessages = [...messages, { role: "user", content: suggestion }];
    setMessages(newMessages);
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const response = getResponse(suggestion);
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: response.message,
          suggestions: response.suggestions
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-20 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 w-96 h-[600px] bg-white dark:bg-card-dark rounded-lg shadow-xl flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 bg-primary dark:bg-primary-dark text-white">
              <h3 className="text-lg font-semibold">SoftSell Assistant</h3>
            </div>

            {/* Messages Container */}
            <div
              ref={messagesEndRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-background-dark"
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? 'bg-primary dark:bg-primary-dark text-white'
                        : 'bg-white dark:bg-card-dark text-gray-800 dark:text-text-dark shadow'
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-card-dark text-gray-800 dark:text-text-dark rounded-lg p-3 shadow">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-border-dark bg-white dark:bg-card-dark">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about SoftSell..."
                  className="flex-1 p-2 border border-gray-300 dark:border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark bg-white dark:bg-background-dark text-gray-800 dark:text-text-dark"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-primary dark:bg-primary-dark text-white rounded-lg hover:bg-primary/90 dark:hover:bg-primary-dark/90 transition-colors disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-primary dark:bg-primary-dark text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;
