import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import CreateLayout from './pages/Create/CreateLayout';
import Occasion from './pages/Create/Occasion';
import Template from './pages/Create/Template';
import Editor from './pages/Create/Editor';
import Success from './pages/Create/Success';
import CardPreview from './pages/CardPreview';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cards/:link" element={<CardPreview />} />
          
          <Route path="/create" element={<CreateLayout />}>
            <Route path="occasion" element={<Occasion />} />
            <Route path="template" element={<Template />} />
            <Route path="editor" element={<Editor />} />
            <Route path="success" element={<Success />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
