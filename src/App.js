import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthContext from "./context/AuthContext";
import useAuth from "./hooks/useAuth";

function App() {
  const {
    login, logout, token, userId, firstName,
  } = useAuth();

  // Lazy Load Pages for code splitting
  const Welcome = lazy(() => import("./pages/Authentication/Welcome"));
  const Signup = lazy(() => import("./pages/Authentication/Signup"));
  const Login = lazy(() => import("./pages/Authentication/Login"));
  const Home = lazy(() => import("./pages/Home/Home"));
  const Project = lazy(() => import("./pages/Project/Project"));
  const Tasks = lazy(() => import("./pages/Tasks/Tasks"));

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
          <div id="app" className="container mx-auto h-screen flex flex-col p-3 px-5 sm:px-10 md:px-14">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/project/:id" element={<Project />} />
              <Route path="/tasks" element={<Tasks />} />
            </Routes>
          </div>
        </Suspense>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
