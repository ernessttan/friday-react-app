/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Header from "../../components/Header";

function Project() {
  const { id } = useParams();
  const [view, setView] = useState("List");
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await fetch(`http://localhost:4000/tasks/project/${id}`)
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

  return (
    <>
      <Header />
      <main>
        <div className="flex items-center justify-between">
          <h1 className="text-orange-500">{project.title}</h1>
          <div>
            <button type="button" className="text-black flex items-center">
              {view}
              <ChevronDownIcon className="w-5 h-5 ml-2" />
            </button>
            <div className="bg-white">
              <button type="button" className="text-black">
                Board
              </button>
            </div>
          </div>
        </div>

      </main>
    </>

  );
}
export default Project;
