import { DragDropContext } from "react-beautiful-dnd";
import Proptypes from "prop-types";
import { useContext } from "react";
import StatusColumn from "./StatusColumn";
import TaskBoardItem from "./TaskBoardItem";
import AuthContext from "../../context/AuthContext";

function TaskBoard({ tasks, setTasks }) {
  const auth = useContext(AuthContext);
  const STATUS_DATA = [
    { id: 0, title: "To Do", color: "bg-red-100" },
    { id: 1, title: "In Progress", color: "bg-yellow-100" },
    { id: 2, title: "Done", color: "bg-green-100" }];

  const updateStatus = async (currentTask, newStatus) => {
    try {
      await fetch(`http://localhost:4000/tasks/${currentTask.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...currentTask, status: newStatus }),
      }).then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTasks((prevTasks) => prevTasks.map((task) => ({
            ...task,
            status: task.title === currentTask.title ? newStatus : task.status,
          })));
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const onDragEnd = (result) => {
    console.log("End");
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    // Check if location changed
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      // If no Change
      return;
    }

    // Update status
    const currentTask = tasks.find((task) => task.id === draggableId);
    const newStatus = STATUS_DATA.find((status) => status.title === destination.droppableId).title;
    updateStatus(currentTask, newStatus);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-5 overflow-x-scroll">
        {STATUS_DATA.map((status) => (
          <StatusColumn
            key={status.id}
            color={status.color}
            title={status.title}
          >
            {tasks.filter((task) => task.status === status.title).map((task, index) => (
              <TaskBoardItem
                key={task.id}
                index={index}
                id={task.id}
              />
            ))}
          </StatusColumn>
        ))}
      </div>
    </DragDropContext>
  );
}

TaskBoard.propTypes = {
  tasks: Proptypes.arrayOf(Proptypes.shape({
    id: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    status: Proptypes.string.isRequired,
  })).isRequired,
  setTasks: Proptypes.func.isRequired,
};

export default TaskBoard;
