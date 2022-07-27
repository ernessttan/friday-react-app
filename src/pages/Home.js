import { useContext } from "react";
import CompletedTasks from "../components/home/CompletedTasks";
import ProjectGallery from "../components/home/ProjectGallery";
import Header from "../components/common/Header";
import AuthContext from "../context/AuthContext";

function Home() {
  const auth = useContext(AuthContext);
  console.log(auth);
  return (
    <>
      <Header />
      <main>
        <h1 className="text-orange-500">Hello, Madeline</h1>
        <h3 className="text-grey-500">Completed Tasks</h3>
        <CompletedTasks />
        <h3 className="text-grey-500">Projects</h3>
        <ProjectGallery />
      </main>
    </>

  );
}

export default Home;
