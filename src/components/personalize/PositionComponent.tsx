const PositionComponent = ({ id, name, isSelected, onClick }) => (
  <label
    htmlFor={id}
    className="flex items-center bg-slate-900 py-2 pl-4 pr-7 rounded-lg"
  >
    <input
      onClick={() => onClick(id)}
      checked={isSelected}
      type="checkbox"
      name={name}
      id={id}
      className="mr-4 before:checked:content-['✓'] before:checked:bg-aqua-600 bg-opacity-0 before:rounded before:w-5 relative before:absolute before:h-5 before:bg-slate-800 before:-top-1 before:-left-1 before:flex before:items-center before:justify-center"
    />
    <div
      className={`flex justify-center items-center bg-slate-800 p-2 border ${
        isSelected ? "border-aqua-700" : "border-slate-700"
      } rounded-lg mr-4`}
    >
      <img src="/images/assets/product-designer.svg" alt="" />
    </div>
    <span className="w-fit text-xs font-normal">{name}</span>
  </label>
);
export default PositionComponent;
