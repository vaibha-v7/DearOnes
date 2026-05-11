import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Newsletter() {
  const { user } = useAuth();
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto bg-primary text-on-primary rounded-[40px] p-12 md:p-24 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
        <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
          <h2 className="font-display-lg text-display-lg">Begin Your Story Today</h2>
          <p className="font-body-lg opacity-90">Join people who are reclaiming the art of intentional connection. Your first card is on us.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to={user ? "/create/occasion" : "/auth"} className="px-8 py-4 bg-white text-primary rounded-full font-label-sm hover:bg-surface-container-low transition-colors uppercase tracking-widest inline-block">Claim Free Card</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
