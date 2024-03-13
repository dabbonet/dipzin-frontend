import { useState } from "react";
import SystemNewsLetterComponent from "./SystemNewsLetterComponent";

interface FullNewSLetterComponentProps {
  newsLetter?: any[];
  userArr: number[];
  addNewsLetter: (event: React.MouseEvent<HTMLInputElement>) => void;
}
const FullNewSLetterComponent: React.FC<FullNewSLetterComponentProps> = ({
  newsLetter,
  userArr,
  addNewsLetter,
}) => {
  const [newsLetterUpdated, setNewsLetterUpdated] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);

  return (
    <div className=" grid grid-cols-2 gap-x-12 gap-y-4 mt-5">
      {newsLetter?.map((el) => (
        <SystemNewsLetterComponent
          key={el?.id}
          id={el?.id}
          name={el?.attributes.name}
          addNewsLetter={addNewsLetter}
        />
      ))}
    </div>
  );
};
export default FullNewSLetterComponent;
