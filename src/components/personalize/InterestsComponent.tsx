const InterestsComponent = ({ title, id, isSelected, onClick }) => {
  const clickButton = () => {
    onClick(id);
  };

  return (
    <button
      className={`text-slate-200 py-2 px-4 rounded-2xl bg-slate-900 border ${
        isSelected ? "border-aqua-600" : "border-transparent"
      } border-solid`}
      onClick={clickButton}
    >
      {title}
    </button>
  );
};

export default InterestsComponent;
