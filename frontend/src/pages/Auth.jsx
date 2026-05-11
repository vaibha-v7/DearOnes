import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Update global context with user data from response
      setUser(data.user);
      
      // Redirect to home
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed">
      <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-surface/80 backdrop-blur-md">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-full max-w-container-max mx-auto">
          <Link to="/" className="font-display-lg text-headline-lg text-primary">DearOnes</Link>
          <Link to="/" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-all duration-300">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center pt-24 pb-section-gap px-margin-mobile">
        <div className="max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <div className="hidden md:flex flex-col pr-12 border-r border-outline-variant/30">
            <div className="mb-8">
              <span className="material-symbols-outlined text-primary text-[40px]" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
            </div>
            <blockquote className="mb-12">
              <p className="font-display-lg text-headline-lg text-on-surface leading-tight italic">
                "The shortest distance between two people is a heartfelt note."
              </p>
              <footer className="mt-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">— DearOnes Philosophy</footer>
            </blockquote>
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-sm">
              <img alt="Elegant stationery" className="object-cover w-full h-full opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3yjzynDmCJXhP343TenzA1tzRmKxbO5HO4QsQ4DnB3S8cz8EdKbHw1tBqoT0XUvFCeWcPhW3KWojV9sOe9KP2NZjGdJWEocaF_nKgNOgEZ75ikhcopSJLqAUBBcq3153Hsk87vQoVK1H7Rw9jRu8rsyUTWYvxQ3uTio7uQLOgox0GGouIxI-0prfJknVRL7S9SAX8oFbYIxTf78ba09Lzuc2_XqRtyOZxYhfyzjikcQ48x148YdFEuKNR1GM9WjZX5mQVc2J7T2Q"/>
            </div>
          </div>
          
          <div className="w-full max-w-md mx-auto">
            <div className="text-center md:text-left mb-10">
              <h2 className="font-display-lg text-headline-lg text-primary mb-2">
                {isLogin ? 'Welcome Back' : 'Join DearOnes'}
              </h2>
              <p className="font-body-md text-on-surface-variant">
                {isLogin ? 'Continue your journey of intentional love.' : 'Start creating meaningful connections.'}
              </p>
            </div>
            
            <div className="bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-[0_20px_40px_-10px_rgba(125,86,45,0.04)] border border-surface-variant/40">
              {error && <div className="mb-4 p-3 bg-error-container text-on-error-container rounded font-body-md text-sm">{error}</div>}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase" htmlFor="username">Username</label>
                    <input 
                      className="w-full bg-surface-container-low border-outline-variant/30 rounded-lg py-4 px-4 font-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-0 transition-all duration-300 focus-within:shadow-[0_0_0_4px_rgba(212,163,115,0.1)] outline-none" 
                      id="username" 
                      placeholder="johndoe" 
                      type="text" 
                      required 
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase" htmlFor="email">Email Address</label>
                  <input 
                    className="w-full bg-surface-container-low border-outline-variant/30 rounded-lg py-4 px-4 font-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-0 transition-all duration-300 focus-within:shadow-[0_0_0_4px_rgba(212,163,115,0.1)] outline-none" 
                    id="email" 
                    placeholder="hello@example.com" 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase" htmlFor="password">Password</label>
                  </div>
                  <input 
                    className="w-full bg-surface-container-low border-outline-variant/30 rounded-lg py-4 px-4 font-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-0 transition-all duration-300 focus-within:shadow-[0_0_0_4px_rgba(212,163,115,0.1)] outline-none" 
                    id="password" 
                    placeholder="••••••••" 
                    type="password" 
                    required 
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <button 
                  disabled={loading}
                  className="w-full bg-secondary text-white font-label-sm text-label-sm py-4 px-8 rounded-full shadow-lg shadow-secondary/10 hover:bg-secondary/90 hover:-translate-y-[2px] active:scale-95 transition-all duration-300 uppercase tracking-widest disabled:opacity-70" 
                  type="submit"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                </button>
                
              </form>
              
              <div className="mt-8 text-center">
                <p className="font-body-md text-on-surface-variant">
                  {isLogin ? 'New to DearOnes? ' : 'Already have an account? '}
                  <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-primary font-semibold hover:underline">
                    {isLogin ? 'Create an account' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center flex flex-col items-center gap-4">
              <div className="flex gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/20"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary/20"></span>
              </div>
              <p className="font-label-sm text-[11px] text-outline italic">Crafted with care for your most meaningful moments.</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-auto border-t border-outline-variant/20 bg-surface-container-low py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <p className="font-label-sm text-label-sm text-on-surface-variant">© 2026 DearOnes. Designed for slow, intentional love.</p>
          <div className="flex gap-8">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Terms of Service</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
