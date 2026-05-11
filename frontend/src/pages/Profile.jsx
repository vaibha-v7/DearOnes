import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

export default function Profile() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [cardToDelete, setCardToDelete] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const initiateDelete = (cardId) => {
    setCardToDelete(cardId);
  };

  const confirmDelete = async () => {
    if (!cardToDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/cards/${cardToDelete}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setUser({
          ...user,
          totalCards: user.totalCards.filter(card => card._id !== cardToDelete)
        });
        showToast('Card deleted successfully!');
      } else {
        showToast(data.message || 'Failed to delete card', 'error');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      showToast('An error occurred while deleting the card.', 'error');
    } finally {
      setCardToDelete(null);
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center font-display-lg text-primary text-2xl">Loading...</div>;
  }

  return (
    <div className="bg-background text-on-surface min-h-screen pt-24 px-8 font-body-md">
      <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-full max-w-container-max mx-auto">
          <Link to="/" className="font-display-lg text-headline-lg text-primary tracking-tight">DearOnes</Link>
          <Link to="/" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-all duration-300 uppercase tracking-widest">
            Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto pt-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="font-display-lg text-headline-lg text-primary">Your Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="px-6 py-2 border border-outline text-primary rounded-full font-label-sm uppercase hover:bg-surface-variant transition-colors tracking-widest"
          >
            Logout
          </button>
        </div>
        
        <div className="bg-surface-container-lowest p-8 md:p-12 rounded-3xl border border-outline-variant/30 shadow-[0_20px_40px_-10px_rgba(125,86,45,0.04)] mb-8">
          <p className="font-display-lg text-3xl mb-2">Hello, <span className="font-bold text-primary">{user.username}</span>!</p>
          <p className="font-body-md text-on-surface-variant">{user.email}</p>
        </div>

        <h2 className="font-display-lg text-headline-md text-on-surface mb-6 mt-12">My Created Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.totalCards && user.totalCards.length > 0 ? (
            user.totalCards.map(card => (
              <div key={card._id} className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 hover:shadow-lg transition-all duration-300 relative group flex flex-col h-full">
                <button 
                  onClick={() => initiateDelete(card._id)}
                  className="absolute top-4 right-4 text-error opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error-container p-2 rounded-full"
                  title="Delete Card"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
                <div className="flex-1">
                  <p className="font-display-lg text-xl mb-1 text-primary">{card.title}</p>
                  <p className="font-body-sm text-on-surface-variant mb-4">For: {card.recipientName}</p>
                </div>
                <a href={`/cards/${card.shareableLink}`} target="_blank" rel="noopener noreferrer" className="text-secondary font-label-sm uppercase tracking-widest hover:underline mt-auto">
                  View Card &rarr;
                </a>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant/50">
              <p className="font-body-md text-on-surface-variant mb-4">You haven't created any cards yet.</p>
              <Link to="/create/occasion" className="inline-block px-6 py-3 bg-secondary text-white rounded-full font-label-sm uppercase tracking-widest hover:bg-secondary/90 shadow-lg shadow-secondary/20 transition-all hover:-translate-y-1">
                Create Your First Card
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {cardToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-surface p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-outline-variant/20 transform animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-error-container text-on-error-container rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-3xl">delete_forever</span>
            </div>
            <h3 className="font-display-lg text-2xl text-on-surface mb-2">Delete Card?</h3>
            <p className="font-body-md text-on-surface-variant mb-8">This action cannot be undone. The card will be permanently removed.</p>
            <div className="flex gap-4 w-full">
              <button 
                onClick={() => setCardToDelete(null)}
                className="flex-1 py-3 border border-outline text-on-surface rounded-full font-label-sm uppercase tracking-widest hover:bg-surface-variant transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 py-3 bg-error text-white rounded-full font-label-sm uppercase tracking-widest hover:bg-error/90 transition-colors shadow-lg shadow-error/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Toast Alert */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-lg font-label-sm uppercase tracking-widest flex items-center gap-2 transition-all duration-500 z-[110] ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'} ${toast.type === 'error' ? 'bg-error-container text-error' : 'bg-surface-variant text-on-surface-variant'}`}>
        <span className="material-symbols-outlined text-[18px]">
          {toast.type === 'error' ? 'error' : 'check_circle'}
        </span>
        {toast.message}
      </div>
    </div>
  );
}
