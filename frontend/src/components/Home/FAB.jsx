import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function FAB() {
  const { user } = useAuth();
  return (
    <Link to={user ? "/create/occasion" : "/auth"} className="fixed bottom-8 right-8 w-14 h-14 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-lg shadow-secondary/20 hover:scale-110 active:scale-95 transition-all z-40">
      <span className="material-symbols-outlined">edit</span>
    </Link>
  );
}
