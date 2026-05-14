import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCardCreation } from '../../context/CardCreationContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Editor() {
  const navigate = useNavigate();
  const { cardData, updateCardData } = useCardCreation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show local preview instantly
    const localUrl = URL.createObjectURL(file);
    updateCardData({ img: localUrl });

    // Upload to ImageKit via backend
    setIsUploadingImage(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Upload failed');

      // Update with permanent URL
      updateCardData({ img: data.url });
    } catch (err) {
      console.error(err);
      alert('Failed to save image permanently. Please try again.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleEnhanceMessage = async () => {
    setIsEnhancing(true);
    try {
      const response = await fetch('http://localhost:5000/ai/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: cardData.message,
          recipientName: cardData.recipientName,
          occasion: cardData.occasion
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to enhance message');

      updateCardData({ message: data.enhancedMessage });
    } catch (err) {
      console.error(err);
      alert('AI Enhancement failed. Please check your API key in the backend .env file.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/cards/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(cardData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to create card. Are you logged in?');

      navigate(`/create/success?link=${data.card.shareableLink}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getWarmEleganceHeader = () => {
    switch (cardData.occasion) {
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
    switch (cardData.occasion) {
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
    switch (cardData.title) {
      case 'Warm Elegance':
        return (
          <div className="w-full max-w-[400px] aspect-[5/8] bg-white rounded-sm shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] flex flex-col mx-auto relative overflow-hidden transition-all">
            <div className="w-full h-[55%] relative p-4 pb-0">
              <img src={cardData.img} className="w-full h-full object-cover object-center rounded-sm" alt="Card Art" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white relative">
              <h2 className="font-display-lg text-2xl text-[#2a2a2a] mb-4 italic">
                {getWarmEleganceHeader()}
              </h2>
              <p className="font-display-lg text-[#2a2a2a] mb-2 text-lg">
                Dear {cardData.recipientName || 'Someone Special'},
              </p>
              <p className={`font-body-md text-sm text-[#5a5a5a] leading-relaxed mb-6 ${cardData.isBold ? 'font-bold' : ''}`}>
                {cardData.message || 'Your beautiful message goes here...'}
              </p>
              <div className="text-[#8a3a3a] text-xs mb-2">❦</div>
              <p className="font-display-lg text-sm text-[#2a2a2a] tracking-widest uppercase">
                With Love, {cardData.senderName || 'You'}
              </p>
            </div>
          </div>
        );

      case 'Midnight Reverie':
        return (
          <div className="w-full max-w-[400px] aspect-[9/16] bg-gradient-to-b from-[#e5e5e5] via-[#ffffff] to-[#ffffff] rounded-sm shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] flex flex-col p-4 mx-auto border border-gray-200 transition-all">
            <div className="text-center pt-2 pb-3">
              <p className="text-[9px] text-[#8b7355] tracking-[0.2em] uppercase font-bold mb-0.5">Special Edition</p>
              <h2 className="font-display-lg text-2xl text-[#222]">{getMidnightReverieHeader()}</h2>
            </div>
            <div className="w-[80%] mx-auto aspect-square bg-[#111] mb-4">
              <img src={cardData.img} className="w-full h-full object-cover grayscale opacity-90" alt="Card Art" />
            </div>
            <div className="flex-1 flex flex-col items-center px-4 text-center overflow-hidden">
              <p className="font-display-lg text-[#8b7355] mb-2 italic text-lg">Dear {cardData.recipientName || 'Someone Special'},</p>
              <p className={`font-body-md text-[13px] text-[#555] italic leading-relaxed mb-auto overflow-hidden ${cardData.isBold ? 'font-bold' : ''}`}>
                "{cardData.message || 'Underneath the golden starlight, where the deep navy sky meets the silence of the night, our memories shine the brightest.'}"
              </p>
              <div className="w-8 h-[1px] bg-[#d3c4b1] my-3"></div>
              <p className="font-display-lg text-[15px] text-[#8b7355] mb-2">
                Yours Forever, {cardData.senderName || 'You'}
              </p>
            </div>
          </div>
        );

      case 'Scrapbook Romance':
        return (
          <div className="w-full max-w-[700px] bg-[#fdfbf7] rounded-sm shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] flex flex-col p-4 sm:p-6 mx-auto relative border border-[#e8e4db] transition-all" style={{ borderRadius: '2px 10px 4px 8px' }}>
            <h2 className="font-display-lg text-2xl sm:text-4xl text-[#945f65] text-center mb-5 sm:mb-6 italic">
              To my dearest {cardData.recipientName || 'love'}
            </h2>
            <div className="flex flex-col md:flex-row gap-5 sm:gap-6">
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="w-full max-w-xs md:max-w-none aspect-[4/5] bg-white p-2 pb-8 shadow-md transform -rotate-1 sm:-rotate-2 relative z-10 border border-gray-100">
                  <img src={cardData.img} className="w-full h-full object-cover grayscale-[20%] sepia-[10%]" alt="Polaroid" />
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
                  <p className={`font-body-md text-lg sm:text-md text-[#555] leading-relaxed italic mb-4 ${cardData.isBold ? 'font-bold' : ''}`}>
                    "{cardData.message || 'I was thinking about that afternoon in the garden, where the light hit the sage leaves just right...'}"
                  </p>
                </div>
                <div className="mt-auto text-right">
                  <p className="font-display-lg text-xl sm:text-2xl text-[#7a8a76] italic mb-1">With all my love</p>
                  <p className="text-sm sm:text-md text-[#555] italic uppercase tracking-wider">{cardData.senderName || 'Eleanor'}</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full max-w-[500px] aspect-[4/5] bg-surface-container-highest rounded-3xl relative overflow-hidden flex flex-col border border-outline-variant/20 shadow-2xl group mx-auto transition-all">
            {cardData.img && (
              <img
                src={cardData.img}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:scale-105 transition-transform duration-[10s] ease-linear"
              />
            )}
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between bg-gradient-to-t from-surface/90 via-transparent to-surface/40 z-10">
              <motion.h2
                layout="position"
                className="font-display-lg text-3xl md:text-4xl text-on-surface text-center mt-4 drop-shadow-md"
              >
                Dear {cardData.recipientName || 'Name'},
              </motion.h2>
              <motion.p
                layout="position"
                className={`font-display-lg text-2xl md:text-3xl text-on-surface leading-relaxed text-center italic my-4 drop-shadow-sm min-h-[100px] flex items-center justify-center break-words ${cardData.isBold ? 'font-bold' : ''}`}
              >
                {cardData.message || 'Your beautiful message goes here...'}
              </motion.p>
              <motion.p
                layout="position"
                className="font-display-lg text-xl md:text-2xl text-on-surface text-right mb-4 drop-shadow-md"
              >
                With love,<br />{cardData.senderName || 'You'}
              </motion.p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface h-screen w-full flex flex-col overflow-hidden">
      {/* Custom Editor Header */}
      <header className="bg-surface dark:bg-surface-dim shadow-sm border-b border-surface-variant/30 shrink-0 z-50">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-20 max-w-container-max mx-auto">
          <div className="flex items-center gap-6">
            <Link to="/create/template" className="flex items-center text-outline hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </Link>
            <Link to="/" className="font-display-lg text-headline-lg text-primary dark:text-primary-fixed tracking-tight">DearOnes</Link>
            <nav className="hidden md:flex gap-8 items-center h-full pt-1 ml-4 border-l border-outline-variant/30 pl-8">
              <span className="text-primary dark:text-primary-fixed-dim font-medium pb-1 font-body-md text-body-md">Personalization Suite</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handlePublish}
              disabled={loading}
              className="bg-secondary text-on-secondary px-6 py-2 rounded-lg font-label-sm text-label-sm shadow-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-70 uppercase tracking-widest"
            >
              {loading ? 'Finalizing...' : 'Finalize Card'}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Sidebar Controls */}
        <aside className="w-full md:w-[420px] bg-surface-container-lowest border-r border-outline-variant/20 flex flex-col h-full z-20 shrink-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-10">
            {error && <div className="p-4 bg-error-container text-on-error-container rounded-xl font-body-md text-sm">{error}</div>}

            <div className="space-y-1">
              <h1 className="font-headline-md text-headline-md text-primary">Personalize Your Story</h1>
              <p className="font-body-md text-on-surface-variant">The details make the difference. Take your time.</p>
            </div>

            {/* Identities */}
            <section className="space-y-4">
              <label className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">Who is this for?</label>
              <div className="space-y-3">
                <input
                  type="text"
                  value={cardData.recipientName}
                  onChange={(e) => updateCardData({ recipientName: e.target.value })}
                  className="w-full bg-surface border border-outline-variant/40 rounded-xl p-3 font-body-md focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                  placeholder="Recipient's Name (e.g. Sarah)"
                />
                <input
                  type="text"
                  value={cardData.senderName}
                  onChange={(e) => updateCardData({ senderName: e.target.value })}
                  className="w-full bg-surface border border-outline-variant/40 rounded-xl p-3 font-body-md focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                  placeholder="Your Name"
                />
              </div>
            </section>

            {/* The Message */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-outline">The Message</label>
                <span className="text-[10px] text-outline-variant uppercase">{cardData.message.length} / 500</span>
              </div>
              <div className="relative group">
                <textarea
                  value={cardData.message}
                  onChange={(e) => updateCardData({ message: e.target.value })}
                  maxLength={500}
                  className="w-full min-h-[160px] bg-surface border border-outline-variant/40 rounded-xl p-4 font-body-md focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none outline-none pb-12"
                  placeholder="Write your heartfelt message here..."
                />
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <button
                    onClick={() => updateCardData({ isBold: !cardData.isBold })}
                    className={`p-2 transition-colors rounded ${cardData.isBold ? 'text-primary bg-primary/10' : 'text-outline hover:text-primary'}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">format_bold</span>
                  </button>
                  <button
                    onClick={handleEnhanceMessage}
                    disabled={isEnhancing}
                    title="AI Enhance"
                    className={`p-2 transition-all rounded ${isEnhancing ? 'text-primary animate-pulse' : 'text-outline hover:text-primary'} disabled:opacity-50`}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${isEnhancing ? 'animate-spin' : ''}`}>auto_fix_high</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Media Area */}
            <section className="space-y-4">
              <label className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">Card Image</label>
              <div className="aspect-[3/1] border border-outline-variant/40 rounded-xl overflow-hidden relative group">
                <img src={cardData.img} alt="template" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage}
                    className="px-4 py-2 bg-white text-black font-label-sm text-xs uppercase tracking-widest rounded shadow-lg hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50"
                  >
                    <span className={`material-symbols-outlined text-[16px] ${isUploadingImage ? 'animate-spin' : ''}`}>
                      {isUploadingImage ? 'sync' : 'upload'}
                    </span>
                    {isUploadingImage ? 'Uploading...' : 'Upload Photo'}
                  </button>
                  <Link to="/create/template" className="text-white text-[10px] uppercase tracking-widest hover:underline">Change Template Theme</Link>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
              </div>
            </section>


          </div>

          <div className="md:hidden flex justify-around p-4 border-t border-outline-variant/20 bg-surface shrink-0">
            <button className="flex flex-col items-center gap-1 text-primary">
              <span className="material-symbols-outlined">edit</span>
              <span className="text-[10px]">Edit</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-outline">
              <span className="material-symbols-outlined">visibility</span>
              <span className="text-[10px]">Preview</span>
            </button>
          </div>
        </aside>

        {/* Live Preview Canvas */}
        <section className="flex-1 bg-surface-container-low flex flex-col items-center justify-center p-4 md:p-8 relative overflow-y-auto">
          <div className="absolute top-8 left-8 flex items-center gap-3 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm z-10 hidden md:flex">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-label-sm text-[11px] text-outline uppercase tracking-widest">Preview</span>
          </div>

          {renderCardLayout()}
        </section>
      </main>
    </div>
  );
}
