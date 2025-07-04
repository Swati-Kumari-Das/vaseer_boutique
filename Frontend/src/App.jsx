


import { Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import AuthPage from './pages/AuthPage'; 
import Profile from "./pages/Profile";
import Index from "./pages/Index";
function App() {
  return (
    <>
     
      <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<AuthPage />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} /> */}
        {/* Add more routes */}
        <Route path="/account" element={<Profile />} />
      </Routes>
     
    </>
  );
}

export default App;
