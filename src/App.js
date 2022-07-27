import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthContext from "./context/AuthContext";
import useAuth from "./hooks/useAuth";

function App() {
  const {
    login, logout, token, userId,
  } = useAuth();

  const Welcome = lazy(() => import("./pages/Welcome"));
  const Signup = lazy(() => import("./pages/Signup"));
  const Login = lazy(() => import("./pages/Login"));
  const Home = lazy(() => import("./pages/Home"));
  const Projects = lazy(() => import("./pages/Projects"));
  const Tasks = lazy(() => import("./pages/Tasks"));

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      token,
      userId,
    }}
    >
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <div id="app" className="h-screen flex flex-col p-3 px-5">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tasks" element={<Tasks />} />
            </Routes>
          </div>
        </Suspense>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
