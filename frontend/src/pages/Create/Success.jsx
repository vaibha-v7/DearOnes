import { useSearchParams, Link } from 'react-router-dom';
import { useState } from 'react';

export default function Success() {
  const [searchParams] = useSearchParams();
  const link = searchParams.get('link');
  const [copied, setCopied] = useState(false);

  const fullUrl = `${window.location.origin}/cards/${link}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center">
      <div className="w-24 h-24 bg-primary-container/20 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-primary/10">
        <span className="material-symbols-outlined text-primary text-5xl">mark_email_read</span>
      </div>
      
      <h1 className="font-display-lg text-display-lg text-primary mb-4">It's Ready to Send</h1>
      <p className="font-body-lg text-on-surface-variant mb-12 max-w-lg">Your card has been beautifully wrapped and sealed. Share the link below with your DearOne.</p>
      
      <div className="w-full bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 flex items-center justify-between gap-4 shadow-[0_20px_40px_-10px_rgba(125,86,45,0.04)] mb-12">
        <div className="truncate font-body-md text-on-surface opacity-80">
          {fullUrl}
        </div>
        <button 
          onClick={copyToClipboard}
          className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-full transition-colors ${copied ? 'bg-primary/20 text-primary' : 'bg-secondary/10 text-secondary hover:bg-secondary/20'}`}
          title="Copy Link"
        >
          <span className="material-symbols-outlined">{copied ? 'check' : 'content_copy'}</span>
        </button>
      </div>
      
      <div className="flex gap-4">
        <Link 
          to="/"
          className="px-8 py-4 border border-outline text-primary rounded-full font-label-sm uppercase tracking-widest hover:bg-surface-variant transition-colors"
        >
          Back to Home
        </Link>
        <a 
          href={`/cards/${link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-primary text-white rounded-full font-label-sm uppercase tracking-widest hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
        >
          View Live Card
        </a>
      </div>

      {/* Custom Toast Alert */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-surface-variant text-on-surface-variant px-6 py-3 rounded-full shadow-lg font-label-sm uppercase tracking-widest flex items-center gap-2 transition-all duration-500 z-50 ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
        Link copied to clipboard!
      </div>
    </div>
  );
}
