import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AuthContext from './context/AuthContext';
import useAuth from './hooks/useAuth';

function App() {
  const {
    login, logout, token, userId, firstName,
  } = useAuth();

  // Lazy Load Pages for code splitting
  const Welcome = lazy(() => import('./pages/Welcome'));

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      token,
      userId,
      firstName,
    }}
    >
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="container mx-auto max-w-xl">
            <Routes>
              <Route path="/" element={<Welcome />} />
            </Routes>
          </div>

        </Suspense>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
