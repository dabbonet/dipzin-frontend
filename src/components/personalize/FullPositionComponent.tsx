import React from "react";
import PositionComponent from "./PositionComponent";

const FullPositionComponent = ({
  positions,
  userPositions,
  setUserPositions,
}) => {
  const handleClick = (id) => {
    if (userPositions.includes(id)) {
      setUserPositions(userPositions.filter((el) => el !== id));
    } else {
      setUserPositions([...userPositions, id]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 mt-3 gap-4">
      {positions?.data.map((position) => (
        <PositionComponent
          key={position.id}
          id={position.id}
          name={position.attributes.name}
          isSelected={userPositions.includes(position.id)}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};

export default FullPositionComponent;
