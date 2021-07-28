import React, { useState } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { indexOf } from "leaflet/src/core/Util";

const CustomSelect = ({ options, defaultOption }) => {
  const [clicked, setClicked] = useState(false);
  const [chosenOption, setChosenOption] = useState("");

  const choseOption = (option) => {
    setChosenOption(option);
    setClicked(false);
  };

  return (
    <div className={clicked ? "custom-select clicked" : "custom-select"}>
      <div className="firstOption" onClick={() => setClicked(!clicked)}>
        <div className="option">
          {chosenOption ? chosenOption : defaultOption}
        </div>
        <button>
          <FontAwesomeIcon icon={clicked ? faChevronUp : faChevronDown} />
        </button>
      </div>
      <div className={clicked ? "optionsList showed" : "optionsList"}>
        <ul>
          {options &&
            options.map((option) => (
              <li
                key={options.indexOf(option)}
                onClick={() => choseOption(option)}
              >
                {option}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomSelect;
