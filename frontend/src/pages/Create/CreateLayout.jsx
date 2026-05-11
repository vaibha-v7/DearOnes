import { Outlet, Link, useLocation } from 'react-router-dom';
import { CardCreationProvider } from '../../context/CardCreationContext';

export default function CreateLayout() {
  const location = useLocation();
  const steps = ['occasion', 'template', 'details', 'preview'];
  const currentStepIndex = steps.findIndex(step => location.pathname.includes(step));

  // If on success page, hide the progress bar
  const isSuccess = location.pathname.includes('success');
  const isEditor = location.pathname.includes('editor');

  if (isEditor) {
    return (
      <CardCreationProvider>
        <Outlet />
      </CardCreationProvider>
    );
  }

  return (
    <CardCreationProvider>
      <div className="bg-background text-on-surface min-h-screen flex flex-col font-body-md">
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-surface border-b border-outline-variant/30 flex items-center justify-between px-6">
          <Link to="/" className="font-display-lg text-primary text-xl tracking-tight">DearOnes</Link>
          
          {!isSuccess && (
            <div className="hidden md:flex gap-3">
              {steps.map((step, idx) => (
                <div key={step} className={`w-20 h-1.5 rounded-full transition-colors duration-500 ${idx <= currentStepIndex ? 'bg-primary' : 'bg-surface-variant'}`} />
              ))}
            </div>
          )}
          
          <Link to="/" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest">
            {isSuccess ? 'Back to Home' : 'Cancel'}
          </Link>
        </header>
        <main className="flex-grow pt-24 pb-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex justify-center">
          <Outlet />
        </main>
      </div>
    </CardCreationProvider>
  );
}
