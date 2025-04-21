import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Message, Option } from '../types';
import { getInitialMessages, getOptionsMenu, getBotResponse } from '../utils/botResponses';
import { useSupabase } from './SupabaseContext';

interface ChatContextType {
  messages: Message[];
  addMessage: (content: string, sender: 'user' | 'bot', options?: Option[]) => void;
  handleUserInput: (content: string) => void;
  handleOptionSelect: (optionId: string) => void;
  resetChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { profile } = useSupabase();

  useEffect(() => {
    const initialMessages = getInitialMessages();
    setMessages(initialMessages);
  }, []);

  const addMessage = (content: string, sender: 'user' | 'bot', options?: Option[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      options,
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const handleUserInput = (content: string) => {
    addMessage(content, 'user');
    
    setTimeout(() => {
      const response = getBotResponse(content, profile?.grade || 1);
      addMessage(response.content, 'bot', response.options);
    }, 600);
  };

  const handleOptionSelect = (optionId: string) => {
    const selectedOption = getOptionsMenu().find(option => option.id === optionId);
    
    if (selectedOption) {
      addMessage(selectedOption.label, 'user');
      setTimeout(() => {
        const response = getBotResponse(selectedOption.id, profile?.grade || 1);
        addMessage(response.content, 'bot', response.options);
      }, 600);
    }
  };

  const resetChat = () => {
    setMessages(getInitialMessages());
  };

  return (
    <ChatContext.Provider value={{
      messages,
      addMessage,
      handleUserInput,
      handleOptionSelect,
      resetChat
    }}>
      {children}
    </ChatContext.Provider>
  );
};