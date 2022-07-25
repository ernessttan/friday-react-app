import CompletedCard from "./CompletedCard";

function CompletedTasks() {
  return (
    <section>
      <h3 className="text-grey-500">Completed Tasks</h3>
      <div className="flex justify-between flex-wrap gap-3">
        <CompletedCard
          title="Tasks Today"
          number={4}
          classes="w-full"
        />
        <CompletedCard
          title="This Week"
          number={8}
          classes="w-[48%]"
        />
        <CompletedCard
          title="This Month"
          number={4}
          classes="w-[48%]"
        />
      </div>
    </section>
  );
}

export default CompletedTasks;
