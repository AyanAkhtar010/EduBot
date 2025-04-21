import React, { useState } from 'react';
import { useSupabase } from '../context/SupabaseContext';
import { AuthView, UserProfile } from '../types';
import { Mail, Lock, User, Phone, School, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';

const AuthModal: React.FC = () => {
  const [view, setView] = useState<AuthView>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    full_name: '',
    phone_number: '',
    grade: 1,
    school_name: '',
  });

  const { supabase } = useSupabase();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast.success('Successfully signed in!');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      setView('profile-setup');
      toast.success('Please complete your profile setup');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleProfileSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase.from('profiles').insert({
        id: user.id,
        ...profile,
      });

      if (error) throw error;
      toast.success('Profile setup complete!');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'apple') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (view === 'profile-setup') {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-slate-800 p-8 rounded-lg shadow-xl max-w-md w-full border border-cyan-500/20">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">Complete Your Profile</h2>
          <form onSubmit={handleProfileSetup} className="space-y-4">
            <div>
              <label className="block text-cyan-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-cyan-500" size={18} />
                <input
                  type="text"
                  value={profile.full_name}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-cyan-500/20 rounded-lg text-cyan-100"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-cyan-300 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-cyan-500" size={18} />
                <input
                  type="tel"
                  value={profile.phone_number}
                  onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-cyan-500/20 rounded-lg text-cyan-100"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-cyan-300 mb-1">Grade</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-3 text-cyan-500" size={18} />
                <select
                  value={profile.grade}
                  onChange={(e) => setProfile({ ...profile, grade: Number(e.target.value) })}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-cyan-500/20 rounded-lg text-cyan-100"
                  required
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>Grade {i + 1}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-cyan-300 mb-1">School Name</label>
              <div className="relative">
                <School className="absolute left-3 top-3 text-cyan-500" size={18} />
                <input
                  type="text"
                  value={profile.school_name}
                  onChange={(e) => setProfile({ ...profile, school_name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-cyan-500/20 rounded-lg text-cyan-100"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Complete Setup
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl max-w-md w-full border border-cyan-500/20">
        <h2 className="text-2xl font-bold text-cyan-400 mb-6">
          {view === 'sign-in' ? 'Welcome Back!' : 'Create Account'}
        </h2>
        
        <div className="space-y-4 mb-6">
          <button
            onClick={() => handleSocialAuth('google')}
            className="w-full py-2 px-4 border border-cyan-500/20 rounded-lg text-cyan-100 hover:bg-cyan-500/10 transition-colors flex items-center justify-center space-x-2"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>
          
          <button
            onClick={() => handleSocialAuth('apple')}
            className="w-full py-2 px-4 border border-cyan-500/20 rounded-lg text-cyan-100 hover:bg-cyan-500/10 transition-colors flex items-center justify-center space-x-2"
          >
            <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-5 h-5" />
            <span>Continue with Apple</span>
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-cyan-500/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-800 text-cyan-400">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={view === 'sign-in' ? handleSignIn : handleSignUp} className="space-y-4">
          <div>
            <label className="block text-cyan-300 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-cyan-500" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-cyan-500/20 rounded-lg text-cyan-100"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-cyan-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-cyan-500" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-cyan-500/20 rounded-lg text-cyan-100"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            {view === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-cyan-300">
          {view === 'sign-in' ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setView(view === 'sign-in' ? 'sign-up' : 'sign-in')}
            className="text-cyan-400 hover:underline"
          >
            {view === 'sign-in' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;