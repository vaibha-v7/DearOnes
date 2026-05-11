import { useNavigate, Link } from 'react-router-dom';
import { useCardCreation } from '../../context/CardCreationContext';
import { templates } from '../../utils/templates';

export default function Template() {
  const navigate = useNavigate();
  const { cardData, updateCardData } = useCardCreation();

  const handleSelect = (template) => {
    updateCardData({ title: template.name, img: template.img });
    navigate('/create/editor');
  };

  return (
    <div className="w-full mx-auto flex flex-col items-center relative pt-12 md:pt-4 max-w-5xl">
      <Link to="/create/occasion" className="absolute top-0 left-0 flex items-center gap-2 text-outline hover:text-primary transition-colors font-label-sm uppercase tracking-widest">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Occasion
      </Link>
      <h1 className="font-display-lg text-headline-lg text-primary mb-4 mt-6 md:mt-0">Choose a canvas</h1>
      <p className="font-body-md text-on-surface-variant mb-12 text-center max-w-xl">Select a premium, tactile-inspired design to house your message.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {templates.map((tpl) => (
          <div key={tpl.id} className="flex flex-col items-center group cursor-pointer" onClick={() => handleSelect(tpl)}>
            <div className={`relative rounded-2xl overflow-hidden aspect-[4/5] w-full mb-6 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 ${
              cardData.title === tpl.name ? 'ring-4 ring-primary ring-offset-4 ring-offset-background shadow-2xl' : 'shadow-md shadow-primary/5'
            }`}>
              <img src={tpl.img} alt={tpl.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
            <h3 className="font-headline-md text-on-surface text-lg">{tpl.name}</h3>
            <button className="mt-4 px-6 py-2 border border-outline text-primary rounded-full font-label-sm uppercase tracking-widest group-hover:bg-primary group-hover:text-on-primary transition-colors">
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
