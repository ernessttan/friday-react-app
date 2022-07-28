import TaskList from "../components/tasks/TaskList";
import Header from "../components/common/Header";

function Tasks() {
  return (
    <>
      <Header />
      <main>
        <h1 className="text-orange-500">Tasks</h1>
        <TaskList />
      </main>
    </>
  );
}

export default Tasks;
