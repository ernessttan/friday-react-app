import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/common/Header";

function App() {
  const Home = lazy(() => import("./pages/Home"));
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div id="app" className="h-screen flex flex-col p-3 px-5">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
