import React from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex items-start space-x-2 max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isBot ? 'bg-cyan-500/20 text-cyan-400' : 'bg-pink-500/20 text-pink-400'
        } border border-current`}>
          {isBot ? <Bot size={20} /> : <User size={20} />}
        </div>
        
        <div className={`rounded-lg p-3 ${
          isBot 
            ? 'bg-cyan-500/10 text-cyan-100 border border-cyan-500/20' 
            : 'bg-pink-500/10 text-pink-100 border border-pink-500/20'
        }`}>
          <p className="whitespace-pre-wrap">{message.content}</p>
          
          {message.options && (
            <div className="mt-3 space-y-2">
              {message.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {/* Handle option selection */}}
                  className="block w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition-colors border border-current/20"
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};