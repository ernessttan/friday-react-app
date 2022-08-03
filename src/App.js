import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AuthContext from './context/AuthContext';
import useAuth from './hooks/useAuth';

function App() {
  const { login, logout, token, userId, firstName } = useAuth();

  // Lazy Load Pages for code splitting
  const Welcome = lazy(() => import('./pages/Welcome'));
  const Signup = lazy(() => import('./pages/Signup'));

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        userId,
        firstName,
      }}
    >
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="container max-w-xl mx-auto">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Suspense>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
