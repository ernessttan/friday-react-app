import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/common/Header";

function App() {
  const Home = lazy(() => import("./pages/Home"));
  const Projects = lazy(() => import("./pages/Projects"));

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div id="app" className="h-screen flex flex-col p-3 px-5">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
