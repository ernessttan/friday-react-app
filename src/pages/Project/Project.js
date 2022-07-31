/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Header from "../../components/Header";
import TaskList from "../../components/TaskList/TaskList";
import TaskBoard from "../../components/TaskBoard/TaskBoard";

function Project() {
  const { id } = useParams();
  const [view, setView] = useState("List View");
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState();
  const [isViewOpen, setIsViewOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await fetch(`https://friday-productivity.herokuapp.com/tasks/project/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setProject(data.project);
            setTasks(data.tasks);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, []);

  const toggleView = () => {
    setIsViewOpen(!isViewOpen);
  };

  const handleSelectView = (e) => {
    setView(e.target.value);
  };

  return (
    <>
      <Header />
      <main>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-orange-500">{project.title}</h1>
          {/* View Menu */}
          <div className="relative">
            <button onClick={toggleView} type="button" className="text-black flex items-center">
              {view}
              <ChevronDownIcon className="w-5 h-5 ml-2" />
            </button>
            <div className={`origin-top-right w-40 z-40 absolute right-0 bg-white shadow-lg rounded border border-grey-200 flex-col gap-2 p-5 ${
              isViewOpen ? "flex" : "hidden"
            }`}
            >
              <button
                onClick={handleSelectView}
                type="button"
                value="Board View"
                className="text-black text-left"
              >
                Board View
              </button>
              <button
                onClick={handleSelectView}
                type="button"
                value="List View"
                className="text-black text-left"
              >
                List View
              </button>
            </div>
          </div>
          {/* End of view menu */}
        </div>
        <div>
          {
              view === "Board View" && (
                <TaskBoard
                  tasks={tasks}
                  setTasks={setTasks}
                />
              )
            }
          {
              view === "List View" && (
                <TaskList
                  tasks={tasks}
                  setTasks={setTasks}
                />
              )
            }
        </div>
      </main>
    </>

  );
}
export default Project;
