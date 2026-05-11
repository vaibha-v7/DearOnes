import { Link } from 'react-router-dom';
import { templates } from '../../utils/templates';

export default function FeaturedTemplates() {
  return (
    <section id="templates" className="py-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-display-lg text-headline-lg text-on-surface">Featured Templates</h2>
            <p className="font-body-md text-on-surface-variant">Hand-crafted designs that feel like real paper.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {templates.map((tpl) => (
            <div key={tpl.id} className="bg-surface border border-outline-variant/30 rounded-xl overflow-hidden hover-lift shadow-sm shadow-primary/5">
              <div className="aspect-[4/3] bg-surface-container-high relative">
                <img className="w-full h-full object-cover" alt={`${tpl.name} design`} src={tpl.img} />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary-container text-on-primary-container rounded-full font-label-sm">{tpl.category}</span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-headline-md text-on-surface mb-2">{tpl.name}</h4>
                <p className="font-body-md text-on-surface-variant mb-6">{tpl.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
