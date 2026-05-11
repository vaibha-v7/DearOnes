export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-display-lg text-headline-lg text-on-surface font-bold">Designed for Slow, Intentional Love</h2>
          <p className="font-body-md text-on-surface font-medium max-w-2xl mx-auto">Thoughtful communication shouldn't be complicated. Our three-step process makes sharing love effortless yet deeply personal.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center mb-6 group-hover:bg-primary-container/40 transition-colors">
              <span className="material-symbols-outlined text-primary text-3xl">calendar_month</span>
            </div>
            <h3 className="font-headline-md text-on-surface mb-3 font-bold">Choose Occasion</h3>
            <p className="font-body-md text-on-surface-variant">From birthdays to sympathy, browse collection of artisanal card templates for every emotion.</p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full bg-secondary-container/20 flex items-center justify-center mb-6 group-hover:bg-secondary-container/40 transition-colors">
              <span className="material-symbols-outlined text-secondary text-3xl">edit_note</span>
            </div>
            <h3 className="font-headline-md text-on-surface mb-3 font-bold">Personalize with Love</h3>
            <p className="font-body-md text-on-surface-variant">Write from the heart. Add photos in your card to make your message truly unique.</p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full bg-tertiary-container/20 flex items-center justify-center mb-6 group-hover:bg-tertiary-container/40 transition-colors">
              <span className="material-symbols-outlined text-tertiary text-3xl">auto_awesome</span>
            </div>
            <h3 className="font-headline-md text-on-surface mb-3 font-bold">Send Instantly</h3>
            <p className="font-body-md text-on-surface-variant">Deliver your piece of heart via links. Your DearOne receives a premium experience.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
