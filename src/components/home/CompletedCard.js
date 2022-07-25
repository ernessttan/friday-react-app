import PropTypes from "prop-types";

function CompletedCard({
  classes, number, title,
}) {
  return (
    <div className={`${classes} bg-grey-200 rounded-md border border-grey-300 shadow-lg p-3 flex flex-col items-center justify-center`}>
      <h2>{number}</h2>
      <p>{title}</p>
    </div>
  );
}

CompletedCard.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  classes: PropTypes.string.isRequired,
};

export default CompletedCard;
