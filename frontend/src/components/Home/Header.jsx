import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { user, loading } = useAuth();

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface dark:bg-surface-dim shadow-sm border-b border-surface-variant/30">
      <nav className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-20 max-w-container-max mx-auto">
        <div className="flex items-center gap-12">
          <a className="font-display-lg text-headline-lg text-primary dark:text-primary-fixed tracking-tight" href="#">DearOnes</a>
          <div className="hidden md:flex gap-8">
            <a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed pb-1 transition-all duration-300" href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')}>How it Works</a>
            <a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed pb-1 transition-all duration-300" href="#templates" onClick={(e) => scrollToSection(e, 'templates')}>Templates</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {!loading && (
            user ? (
              <Link to="/profile" title="Your Profile" className="flex items-center justify-center w-10 h-10 bg-secondary text-on-secondary rounded-full font-display-lg text-xl hover:opacity-90 transition-all duration-300 active:scale-95 shadow-sm shadow-secondary/20 uppercase">
                {user.username ? user.username.charAt(0) : 'U'}
              </Link>
            ) : (
              <Link to="/auth" className="flex items-center gap-2 px-6 py-2 bg-secondary text-on-secondary rounded-full font-label-sm hover:opacity-90 transition-all duration-300 active:scale-95 shadow-sm shadow-secondary/20 uppercase tracking-widest">
                Sign In
              </Link>
            )
          )}
        </div>
      </nav>
    </header>
  );
}
