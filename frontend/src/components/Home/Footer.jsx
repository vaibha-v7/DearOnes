export default function Footer() {
  return (
    <footer className="bg-surface-container-low dark:bg-surface-container-lowest border-t border-outline-variant/20">
      <div className="flex flex-col md:flex-row justify-between items-start gap-gutter w-full px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
        <div className="space-y-6 max-w-xs">
          <a className="font-display-lg text-headline-md text-primary dark:text-primary-fixed" href="#">DearOnes</a>
          <p className="font-body-md text-on-surface-variant">© 2026 DearOnes. Designed for slow, intentional love. Bringing the tactile beauty of stationery to the digital world.</p>
          <div className="flex gap-4">
            <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#"><span className="material-symbols-outlined">share</span></a>
            <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#"><span className="material-symbols-outlined">favorite</span></a>
            <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#"><span className="material-symbols-outlined">mail</span></a>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h5 className="font-label-sm text-secondary uppercase tracking-widest">Connect</h5>
            <ul className="space-y-3">
              <li><a className="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#">Instagram</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#">Pinterest</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#">Twitter</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="font-label-sm text-secondary uppercase tracking-widest">Company</h5>
            <ul className="space-y-3">
              <li><a className="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#">About Our Paper</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#">Help Center</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="space-y-4 hidden md:block">
            <h5 className="font-label-sm text-secondary uppercase tracking-widest">Support</h5>
            <ul className="space-y-3">
              <li><a className="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#">Terms of Service</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#">Accessibility</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="px-margin-mobile md:px-margin-desktop py-8 border-t border-outline-variant/10 max-w-container-max mx-auto text-center">
        <p className="font-label-sm text-on-surface-variant/60">© 2026 DearOnes. All rights reserved.</p>
      </div>
    </footer>
  );
}
