import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { templates } from '../utils/templates';
import { useCardCreation } from '../context/CardCreationContext';

const API_BASE = 'http://localhost:5000';

const occasionLabel = {
  birthday: 'Birthday',
  anniversary: 'Anniversary',
  wedding: 'Wedding',
  sympathy: 'Sympathy',
  thank_you: 'Thank You',
  get_well: 'Get Well Soon'
};

function formatDate(dateValue) {
  if (!dateValue) return 'A Special Day';

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return 'A Special Day';

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export default function CardPreview() {
  const { link } = useParams();
  const cardCreation = useCardCreation();
  const cardData = cardCreation?.cardData || null;
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    let isMounted = true;

    const hasLiveData = !!(
      cardData &&
      (cardData.title || cardData.message || cardData.recipientName || cardData.img)
    );

    async function fetchCard() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(`${API_BASE}/cards/${link}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Unable to open this card.');
        }

        if (isMounted) {
          setCard(data.card);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to open this card.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (hasLiveData) {
      setCard(cardData);
      setLoading(false);
    } else if (link) {
      fetchCard();
    } else {
      setError('No card to preview.');
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [link, cardData]);

  const templateData = useMemo(() => {
    if (!card?.title) return null;
    return templates.find((item) => item.name === card.title) || null;
  }, [card]);

  const previewCard = useMemo(() => {
    if (!card) return null;

    return {
      ...card,
      img: card.img || templateData?.img || templates[0]?.img
    };
  }, [card, templateData]);

  const cardImage = previewCard?.img;
  const cardDate = formatDate(card?.createdAt || card?.date);
  const previewOccasion = occasionLabel[card?.occasion] || 'A Special Message';
  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return link ? `${window.location.origin}/cards/${link}` : window.location.href;
  }, [link]);

  const handleCopyUrl = async () => {
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyStatus('Copied!');
    } catch (err) {
      setCopyStatus('Copy failed');
    }

    window.setTimeout(() => {
      setCopyStatus('');
    }, 1800);
  };

  const getWarmEleganceHeader = () => {
    switch (previewCard?.occasion) {
      case 'birthday': return 'Happy Birthday, always.';
      case 'anniversary': return 'Happy Anniversary, always.';
      case 'wedding': return 'Happy Wedding Day, always.';
      case 'sympathy': return 'With Deepest Sympathy.';
      case 'thank_you': return 'Thank You, always.';
      case 'get_well': return 'Wishing You a Speedy Recovery.';
      default: return 'Thinking of you, always.';
    }
  };

  const getMidnightReverieHeader = () => {
    switch (previewCard?.occasion) {
      case 'birthday': return 'Birthday Edition';
      case 'anniversary': return 'Anniversary Edition';
      case 'wedding': return 'Wedding Edition';
      case 'sympathy': return 'In Sympathy';
      case 'thank_you': return 'With Gratitude';
      case 'get_well': return 'Get Well Soon';
      default: return 'Midnight Reverie';
    }
  };

  const renderCardLayout = () => {
    if (!previewCard) return null;

    switch (previewCard.title) {
      case 'Warm Elegance':
        return (
          <div className="w-full max-w-[340px] sm:max-w-[400px] aspect-[5/8] bg-white rounded-sm shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] flex flex-col mx-auto relative overflow-hidden transition-all">
            <div className="w-full h-[48%] sm:h-[55%] relative p-3 sm:p-4 pb-0">
              <img src={cardImage} className="w-full h-full object-cover object-center rounded-sm" alt="Card Art" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-5 sm:p-8 text-center bg-white relative">
              <h2 className="font-display-lg text-xl sm:text-2xl text-[#2a2a2a] mb-3 sm:mb-4 italic leading-tight">
                {getWarmEleganceHeader()}
              </h2>
              <p className="font-display-lg text-[#2a2a2a] mb-2 text-base sm:text-lg">
                Dear {previewCard.recipientName || 'Someone Special'},
              </p>
              <p className={`font-body-md text-sm sm:text-md text-[#5a5a5a] leading-relaxed mb-4 sm:mb-6 ${previewCard.isBold ? 'font-bold' : ''}`}>
                {previewCard.message || 'Your beautiful message goes here...'}
              </p>
              <div className="text-[#8a3a3a] text-xs mb-2">❦</div>
              <p className="font-display-lg text-xs sm:text-sm text-[#2a2a2a] tracking-widest uppercase">
                With Love, {previewCard.senderName || 'You'}
              </p>
            </div>
          </div>
        );

      case 'Midnight Reverie':
        return (
          <div className="w-full max-w-[340px] sm:max-w-[400px] aspect-[5/8] bg-gradient-to-b from-[#e5e5e5] via-[#ffffff] to-[#ffffff] rounded-sm shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] flex flex-col p-3 sm:p-4 mx-auto border border-gray-200 transition-all">
            <div className="text-center pt-1 sm:pt-2 pb-2 sm:pb-3">
              <p className="text-[8px] sm:text-[9px] text-[#8b7355] tracking-[0.2em] uppercase font-bold mb-0.5">Special Edition</p>
              <h2 className="font-display-lg text-xl sm:text-2xl text-[#222] leading-tight">{getMidnightReverieHeader()}</h2>
            </div>
            <div className="w-[82%] sm:w-[80%] mx-auto aspect-square bg-[#111] mb-3 sm:mb-4">
              <img src={cardImage} className="w-full h-full object-cover grayscale opacity-90" alt="Card Art" />
            </div>
            <div className="flex-1 flex flex-col items-center px-2 sm:px-4 text-center overflow-hidden">
              <p className="font-display-lg text-[#8b7355] mb-2 italic text-base sm:text-lg">Dear {previewCard.recipientName || 'Someone Special'},</p>
              <p className={`font-body-md text-sm sm:text-md text-[#555] italic leading-relaxed mb-auto overflow-hidden ${previewCard.isBold ? 'font-bold' : ''}`}>
                "{previewCard.message || 'Underneath the golden starlight, where the deep navy sky meets the silence of the night, our memories shine the brightest.'}"
              </p>
              <div className="w-8 h-[1px] bg-[#d3c4b1] my-3"></div>
              <p className="font-display-lg text-sm sm:text-md text-[#8b7355] mb-2">
                Yours Forever, {previewCard.senderName || 'You'}
              </p>
            </div>
          </div>
        );

      case 'Scrapbook Romance':
        return (
          <div className="w-full max-w-[700px] bg-[#fdfbf7] rounded-sm shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] flex flex-col p-4 sm:p-6 mx-auto relative border border-[#e8e4db] transition-all" style={{ borderRadius: '2px 10px 4px 8px' }}>
            <h2 className="font-display-lg text-2xl sm:text-4xl text-[#945f65] text-center mb-5 sm:mb-6 italic">
              To my dearest {previewCard.recipientName || 'love'}
            </h2>
            <div className="flex flex-col md:flex-row gap-5 sm:gap-6">
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="w-full max-w-xs md:max-w-none aspect-[4/5] bg-white p-2 pb-8 shadow-md transform -rotate-1 sm:-rotate-2 relative z-10 border border-gray-100">
                  <img src={cardImage} className="w-full h-full object-cover grayscale-[20%] sepia-[10%]" alt="Polaroid" />
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#eae5d9] rounded-full flex items-center justify-center text-[#945f65]">
                    <span className="material-symbols-outlined text-[12px]">photo_camera</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#d4a373]"></div>
                    <span className="text-sm text-[#8b7355] tracking-[0.2em] uppercase font-bold py-2">Our Story</span>
                  </div>
                  <p className={`font-body-md text-lg sm:text-md text-[#555] leading-relaxed italic mb-4 ${previewCard.isBold ? 'font-bold' : ''}`}>
                    "{previewCard.message || 'I was thinking about that afternoon in the garden, where the light hit the sage leaves just right...'}"
                  </p>
                </div>
                <div className="mt-auto text-right">
                  <p className="font-display-lg text-xl sm:text-2xl text-[#7a8a76] italic mb-1">With all my love</p>
                  <p className="text-sm sm:text-md text-[#555] italic uppercase tracking-wider">{previewCard.senderName || 'Eleanor'}</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full max-w-[500px] aspect-[4/5] bg-surface-container-highest rounded-3xl relative overflow-hidden flex flex-col border border-outline-variant/20 shadow-2xl group mx-auto transition-all">
            {cardImage && (
              <img
                src={cardImage}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
              />
            )}
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between bg-gradient-to-t from-surface/90 via-transparent to-surface/40 z-10">
              <h2 className="font-display-lg text-3xl md:text-4xl text-on-surface text-center mt-4 drop-shadow-md">
                Dear {previewCard.recipientName || 'Name'},
              </h2>
              <p className={`font-display-lg text-2xl md:text-3xl text-on-surface leading-relaxed text-center italic my-4 drop-shadow-sm min-h-[100px] flex items-center justify-center break-words ${previewCard.isBold ? 'font-bold' : ''}`}>
                {previewCard.message || 'Your beautiful message goes here...'}
              </p>
              <p className="font-display-lg text-xl md:text-2xl text-on-surface text-right mb-4 drop-shadow-md">
                With love,<br />{previewCard.senderName || 'You'}
              </p>
            </div>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background floral-texture flex items-center justify-center px-margin-mobile">
        <div className="max-w-xl w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 card-shadow">
          <div className="animate-pulse space-y-4">
            <div className="h-5 w-44 bg-surface-container rounded-full" />
            <div className="h-10 w-3/4 bg-surface-container rounded-full" />
            <div className="h-64 w-full bg-surface-container rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="min-h-screen bg-background floral-texture flex items-center justify-center px-margin-mobile">
        <div className="max-w-xl w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-10 card-shadow text-center">
          <div className="w-16 h-16 rounded-full bg-error-container text-on-error-container mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">mail_off</span>
          </div>
          <h1 className="mt-6 font-display-lg text-headline-lg text-primary">Card not found</h1>
          <p className="mt-3 text-on-surface-variant">{error || 'This link is invalid or expired.'}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="px-6 py-3 rounded-full bg-secondary text-on-secondary font-label-sm text-sm tracking-widest"
            >
              GO HOME
            </Link>
            <Link
              to="/create/occasion"
              className="px-6 py-3 rounded-full border border-primary text-primary font-label-sm text-sm tracking-widest"
            >
              CREATE YOUR OWN
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background font-body-md text-on-surface selection:bg-secondary-fixed-dim floral-texture min-h-screen flex flex-col overflow-x-hidden">
      <header className="w-full h-20 px-margin-mobile md:px-margin-desktop flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-display-lg text-headline-md text-primary tracking-tight">DearOnes</Link>
        </div>

        {/* <div className="hidden sm:flex items-center gap-3 bg-surface-container-low py-2 px-4 rounded-full border border-outline-variant/30 shadow-sm">
          <span className="material-symbols-outlined text-secondary animate-pulse">graphic_eq</span>
          <div className="flex flex-col">
            <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest">Now Playing</span>
            <span className="font-label-sm text-on-surface text-xs">Moonlight Sonata</span>
          </div>
          <button className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-on-secondary">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>pause</span>
          </button>
        </div> */}
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile py-8 sm:py-12 gap-8">
        <div className="w-full flex justify-center">
          {renderCardLayout()}
        </div>
        <div className="text-center space-y-2">
          <p className="font-label-sm text-secondary uppercase tracking-[0.2em]">{cardDate}</p>
          <p className="font-label-sm text-on-surface-variant uppercase tracking-[0.15em]">{templateData?.name || previewCard?.title || previewOccasion}</p>
        </div>
      </main>

      <footer className="w-full py-section-gap flex flex-col items-center gap-gutter px-margin-mobile">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* <button className="px-10 py-4 bg-secondary text-on-secondary rounded-full font-label-sm text-sm tracking-widest hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300 flex items-center gap-3">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            SEND A HEART BACK
          </button> */}

          <button
            onClick={handleCopyUrl}
            className="px-10 py-4 border border-secondary text-secondary bg-transparent rounded-full font-label-sm text-sm tracking-widest hover:bg-secondary/10 transition-colors flex items-center gap-3"
            type="button"
          >
            <span className="material-symbols-outlined">content_copy</span>
            COPY PREVIEW LINK
          </button>

          <Link
            to="/create/occasion"
            className="px-10 py-4 border border-primary text-primary bg-transparent rounded-full font-label-sm text-sm tracking-widest hover:bg-primary/5 transition-colors flex items-center gap-3"
          >
            <span className="material-symbols-outlined">edit_note</span>
            CREATE YOUR OWN
          </Link>
        </div>

        <div className="text-center">
          <p className="font-label-sm text-on-surface-variant text-xs break-all px-4">{shareUrl}</p>
          {copyStatus && <p className="font-label-sm text-secondary text-xs mt-2 tracking-wider uppercase">{copyStatus}</p>}
        </div>

        <div className="mt-12 text-center space-y-4">
          <p className="font-label-sm text-on-surface-variant/60 tracking-widest">© 2026 DEARONES. DESIGNED FOR SLOW, INTENTIONAL LOVE.</p>
          <div className="flex justify-center gap-6">
            <a className="font-label-sm text-xs text-on-surface-variant hover:text-secondary transition-colors" href="#">Privacy Policy</a>
            <a className="font-label-sm text-xs text-on-surface-variant hover:text-secondary transition-colors" href="#">Help Center</a>
          </div>
        </div>
      </footer>

      {/* <div className="fixed bottom-6 right-6 md:hidden">
        <button className="w-14 h-14 bg-surface-container-high rounded-full shadow-xl border border-outline-variant/50 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">music_note</span>
        </button>
      </div> */}

      <style>{`
        .floral-texture {
          background-image: radial-gradient(circle at 2px 2px, rgba(144, 72, 81, 0.05) 1px, transparent 0);
          background-size: 40px 40px;
        }
        .card-shadow {
          box-shadow: 0 20px 50px -12px rgba(125, 86, 45, 0.15);
        }
      `}</style>
    </div>
  );
}
