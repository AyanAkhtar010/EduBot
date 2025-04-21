import React from 'react';
import ChatInterface from './components/ChatInterface';
import { ChatProvider } from './context/ChatContext';
import { SupabaseProvider, useSupabase } from './context/SupabaseContext';
import LoadingScreen from './components/LoadingScreen';
import AuthModal from './components/AuthModal';
import { Toaster } from 'react-hot-toast';

const AppContent = () => {
  const { user, profile, loading } = useSupabase();

  if (loading) return <LoadingScreen />;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900">
      <div 
        className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg')] opacity-10 bg-cover bg-center"
        style={{ mixBlendMode: 'overlay' }}
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl relative">
        <header className="text-center mb-6 relative">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mb-2 animate-pulse">
            EduBot
          </h1>
          <p className="text-cyan-400 text-lg tracking-wide">
            Your AI Learning Assistant
          </p>
          {profile && (
            <p className="text-cyan-300 mt-2">
              Welcome, {profile.full_name} | Grade {profile.grade}
            </p>
          )}
          <div className="absolute -top-4 -left-4 w-full h-full border-2 border-cyan-500 rounded-lg transform -rotate-1 opacity-20" />
          <div className="absolute -top-2 -left-2 w-full h-full border-2 border-pink-500 rounded-lg transform rotate-1 opacity-20" />
        </header>
        
        <ChatProvider>
          {user && profile ? <ChatInterface /> : <AuthModal />}
        </ChatProvider>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

function App() {
  return (
    <SupabaseProvider>
      <AppContent />
    </SupabaseProvider>
  );
}

export default App;