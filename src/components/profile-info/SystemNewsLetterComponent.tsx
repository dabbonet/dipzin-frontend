interface SystemNewsLetterComponentProps {
  id: number;
  name: string;
  addNewsLetter: (event: React.MouseEvent<HTMLInputElement>) => void;
  userArr: number[];
}

const SystemNewsLetterComponent: React.FC<SystemNewsLetterComponentProps> = ({
  id,
  name,
  addNewsLetter,
  userArr,
}) => {
  return (
    <div className=" flex gap-2  items-center">
      <input
        onClick={addNewsLetter}
        type="checkbox"
        defaultChecked={userArr.includes(id)}
        id={id.toString()}
        className="before:checked:content-['✓'] before:checked:bg-aqua-600 bg-opacity-0 before:rounded-lg before:w-5 relative before:absolute before:h-5 before:bg-slate-800 before:-top-1 before:-left-1 before:flex before:items-center before:justify-center "
      />
      <label htmlFor={id.toString()}>{name}</label>
    </div>
  );
};
export default SystemNewsLetterComponent;
