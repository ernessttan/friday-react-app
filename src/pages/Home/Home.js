import TaskOverview from "./TaskOverview/TaskOverview";
import ProjectGallery from "./ProjectGallery/ProjectGallery";
import Header from "../../components/Header";

function Home() {
  return (
    <>
      <Header />
      <main>
        <h1 className="text-orange-500">Hello, Madeline</h1>
        <h3 className="text-grey-500">Completed Tasks</h3>
        <TaskOverview />
        <h3 className="text-grey-500">Projects</h3>
        <ProjectGallery />
      </main>
    </>

  );
}

export default Home;
