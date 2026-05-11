import { useNavigate, Link } from 'react-router-dom';
import { useCardCreation } from '../../context/CardCreationContext';

const occasions = [
  { id: 'birthday', label: 'Birthday', icon: 'cake' },
  { id: 'anniversary', label: 'Anniversary', icon: 'favorite' },
  { id: 'wedding', label: 'Wedding', icon: 'celebration' },
  { id: 'sympathy', label: 'Sympathy', icon: 'local_florist' },
  { id: 'thank_you', label: 'Thank You', icon: 'volunteer_activism' },
  { id: 'get_well', label: 'Get Well Soon', icon: 'health_and_safety' }
];

export default function Occasion() {
  const navigate = useNavigate();
  const { cardData, updateCardData } = useCardCreation();

  const handleSelect = (id) => {
    updateCardData({ occasion: id });
    navigate('/create/template');
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center relative pt-12 md:pt-4">
      <Link to="/" className="absolute top-0 left-0 flex items-center gap-2 text-outline hover:text-primary transition-colors font-label-sm uppercase tracking-widest">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Home
      </Link>
      <h1 className="font-display-lg text-headline-lg text-primary mb-4 mt-6 md:mt-0">What's the occasion?</h1>
      <p className="font-body-md text-on-surface-variant mb-12 text-center max-w-xl">Every great card starts with a meaningful intent. Choose the reason you're sending love today.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {occasions.map((occ) => (
          <button 
            key={occ.id}
            onClick={() => handleSelect(occ.id)}
            className={`flex flex-col items-center justify-center p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              cardData.occasion === occ.id 
                ? 'border-primary bg-primary-container/10 ring-2 ring-primary/50' 
                : 'border-outline-variant/30 bg-surface-container-lowest hover:border-primary/50'
            }`}
          >
            <span className="material-symbols-outlined text-4xl mb-4 text-secondary">{occ.icon}</span>
            <span className="font-headline-md text-on-surface text-lg">{occ.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
