import React from "react";
import InterestsComponent from "./InterestsComponent";

const FullInterestsComponent = ({
  interests,
  userInterests,
  setUserInterests,
}) => {
  const handleInterestClick = (id) => {
    // Update the userInterests state based on whether the id is already included
    setUserInterests(
      userInterests.includes(id)
        ? userInterests.filter((currentId) => currentId !== id)
        : [...userInterests, id]
    );
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {interests?.data.map((interest) => (
        <InterestsComponent
          key={interest.id}
          id={interest.id}
          title={interest.attributes.name}
          isSelected={userInterests.includes(interest.id)}
          onClick={handleInterestClick}
        />
      ))}
    </div>
  );
};

export default FullInterestsComponent;
