"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  time: string;
}

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! Welcome to the NexusPort developer support channel. How can I assist you with integrations today?",
      sender: "bot",
      time: "Just now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: "user-" + Date.now(),
      text: inputValue,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = inputValue.toLowerCase();
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      let replyText = "I'm sorry, I didn't quite catch that. You can contact our sales team directly at sales@nexusport.com, or visit our documentation center.";

      if (query.includes("register") || query.includes("sign up") || query.includes("onboarding")) {
        replyText = "You can sign up as an enterprise partner by clicking the 'Become a Partner' button in the header or heading to /register. The onboarding steps are fully automated!";
      } else if (query.includes("api key") || query.includes("token") || query.includes("credentials") || query.includes("client id")) {
        replyText = "To get API credentials, login to your partner account, head to the Dashboard page, and locate the 'Credentials Manager'. There you can generate client IDs and secrets.";
      } else if (query.includes("sandbox") || query.includes("testing") || query.includes("mock")) {
        replyText = "Our developer sandbox allows you to test REST/GraphQL endpoints with zero risk. You can find detail guides on the /products page.";
      } else if (query.includes("sdk") || query.includes("download") || query.includes("libraries")) {
        replyText = "SDK wrappers for Node.js, Go, Python, and Java are available in our Resources Center under the /resources directory.";
      } else if (query.includes("price") || query.includes("fee") || query.includes("cost")) {
        replyText = "The developer tier is free up to 10k calls/day. Gold and Platinum levels offer custom pricing depending on volume. Check the Partner Program FAQ page for details.";
      }

      const botMsg: Message = {
        id: "bot-" + Date.now(),
        text: replyText,
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat Bubble Toggle Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="h-14 w-14 rounded-full bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 flex items-center justify-center text-white shadow-xl shadow-brand-500/20 cursor-pointer focus:outline-none"
        aria-label="Open support chat"
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-18 right-0 w-80 sm:w-96 h-[480px] rounded-2xl shadow-2xl glass-card flex flex-col border border-slate-200 dark:border-slate-800 overflow-hidden text-sm"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-900 to-brand-700 dark:from-brand-950 dark:to-brand-800 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Bot className="h-4.5 w-4.5 text-brand-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs leading-none">NexusPort Assistant</h4>
                  <span className="text-[10px] text-brand-300 leading-none">Automated Support &bull; Online</span>
                </div>
              </div>
              <button 
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Message List */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-900/30">
              {messages.map((msg) => {
                const isBot = msg.sender === "bot";
                return (
                  <div 
                    key={msg.id}
                    className={`flex gap-2 max-w-[85%] ${isBot ? "" : "ml-auto flex-row-reverse"}`}
                  >
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                      isBot ? "bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400" : "bg-slate-200 dark:bg-slate-800"
                    }`}>
                      {isBot ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                    </div>
                    <div>
                      <div className={`p-3 rounded-2xl ${
                        isBot 
                          ? "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none" 
                          : "bg-brand-600 text-white rounded-tr-none shadow-sm"
                      }`}>
                        <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-1 px-1">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form 
              onSubmit={handleSend}
              className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask about sandbox, APIs, registration..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-brand-500 text-slate-800 dark:text-slate-200"
              />
              <button
                type="submit"
                className="h-8.5 w-8.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
