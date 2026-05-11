import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import goodImg from '../../assets/good.png';

export default function Hero() {
  const { user } = useAuth();

  const scrollToTemplates = () => {
    const element = document.getElementById('templates');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[870px] flex items-center px-margin-mobile md:px-margin-desktop overflow-hidden">
      <div className="max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
        <div className="z-10 space-y-8">
          <span className="font-label-sm text-secondary tracking-widest uppercase">Intentional Connection</span>
          <h1 className="font-display-lg text-display-lg text-on-surface leading-tight">Send a Piece of Your Heart</h1>
          <p className="font-body-lg text-on-surface-variant max-w-lg">
            In a world of fleeting notifications, give them something to hold. Send beautiful, tactile-inspired digital cards designed for life's most meaningful moments.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to={user ? "/create/occasion" : "/auth"} className="px-8 py-4 bg-secondary text-on-secondary rounded-full font-label-sm hover-lift shadow-lg shadow-secondary/10 inline-block text-center uppercase tracking-widest">Start Your Card</Link>
            <button onClick={scrollToTemplates} className="px-8 py-4 border border-outline text-primary rounded-full font-label-sm hover:bg-surface-container-low transition-colors uppercase tracking-widest">View Templates</button>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-4 bg-primary-container/10 rounded-[40px] blur-3xl group-hover:bg-primary-container/20 transition-all duration-700"></div>
          <div className="relative rounded-[32px] overflow-hidden shadow-2xl shadow-primary/5 aspect-[4/5] md:aspect-square">
            <img className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" alt="A warm, emotionally resonant scene" src={goodImg}/>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-surface p-6 rounded-2xl shadow-xl border border-outline-variant/30 hidden md:block max-w-[240px]">
            <p className="italic font-display-lg text-headline-md text-primary">"The most beautiful way to say I'm thinking of you."</p>
          </div>
        </div>
      </div>
    </section>
  );
}
