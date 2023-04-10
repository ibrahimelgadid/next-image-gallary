import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const EmptyArray = ({ error }) => {
  return (
    <div className="flex flex-col gap-3 items-center">
      <p>
        <FontAwesomeIcon
          icon={faSkullCrossbones}
          className="text-yellow-300 text-3xl"
        />
      </p>

      <p className="text-3xl font-bold text-red-500">There's no {error}</p>
    </div>
  );
};

export default EmptyArray;
