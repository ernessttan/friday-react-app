import {
  ClipboardListIcon,
  CheckCircleIcon,
  BriefcaseIcon,
  FireIcon,
} from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function Overview({ tasks, activeProjects }) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const calculateScore = () => {
      const score = tasks.reduce((acc, task) => {
        if (task.status === 'Done') {
          return acc + 1;
        }
        return acc;
      }, 0);
      setScore(Math.floor((score / tasks.length) * 100));
    };
    calculateScore();
  }, [tasks]);
  return (
    <section className="grid grid-cols-2 grid-rows-2 gap-3 md:grid-cols-4 md:grid-rows-1">
      <div className="flex gap-3 px-2 py-3 border rounded-md shadow border-grey-300">
        <div className="flex items-center justify-center p-3 text-white bg-orange-500 rounded-md basis-1/3">
          <ClipboardListIcon className="w-8 h-8" />
        </div>
        <div className="basis-2/3">
          <h2>{tasks.length}</h2>
          <p className="text-sm text-grey-500">Tasks Today</p>
        </div>
      </div>
      <div className="flex gap-3 px-2 py-3 border rounded-md shadow border-grey-300">
        <div className="flex items-center justify-center p-3 text-white bg-orange-500 rounded-md basis-1/3">
          <CheckCircleIcon className="w-8 h-8" />
        </div>
        <div className="basis-2/3">
          <h2>{tasks.filter((task) => task.status === 'Done').length}</h2>
          <p className="text-sm text-grey-500">Tasks Done</p>
        </div>
      </div>
      <div className="flex gap-3 px-2 py-3 border rounded-md shadow border-grey-300">
        <div className="flex items-center justify-center p-3 text-white bg-orange-500 rounded-md basis-1/3">
          <BriefcaseIcon className="w-8 h-8" />
        </div>
        <div className="basis-2/3">
          <h2>{activeProjects}</h2>
          <p className="text-sm text-grey-500">Projects</p>
        </div>
      </div>
      <div className="flex gap-3 px-2 py-3 border rounded-md shadow border-grey-300">
        <div className="flex items-center justify-center p-3 text-white bg-orange-500 rounded-md basis-1/3">
          <FireIcon className="w-8 h-8" />
        </div>
        <div className="basis-2/3">
          <h2>{`${score || 0}    %`}</h2>
          <p className="text-sm text-grey-500">Score</p>
        </div>
      </div>
    </section>
  );
}

Overview.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
  activeProjects: PropTypes.number.isRequired,
};

export default Overview;
