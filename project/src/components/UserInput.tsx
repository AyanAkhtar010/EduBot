import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { Send } from 'lucide-react';

export const UserInput: React.FC = () => {
  const [input, setInput] = useState('');
  const { handleUserInput } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleUserInput(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-cyan-500/20 p-4 bg-slate-900/50">
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="メッセージを入力..."
          className="flex-1 px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/20 text-cyan-100 placeholder-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors border border-cyan-500/20"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};