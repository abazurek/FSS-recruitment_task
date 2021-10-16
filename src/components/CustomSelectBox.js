import React, { useState, useEffect } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomSelectBox = ({ options, defaultOption }) => {
  const [clicked, setClicked] = useState(false);
  const [chosenOption, setChosenOption] = useState("");

  const choseOption = (option) => {
    setChosenOption(option);
    setClicked(false);
  };

  console.log(options);
  return (
    <div
      onBlur={() => setClicked(false)}
      className={clicked ? "custom-select clicked" : "custom-select"}
    >
      <div className="firstOption" onClick={() => setClicked(!clicked)}>
        <div className="option">
          {chosenOption ? chosenOption : defaultOption}
        </div>
        <button>
          <FontAwesomeIcon icon={clicked ? faChevronUp : faChevronDown} />
        </button>
      </div>
      <div className={!clicked ? "optionsList disabled" : "optionsList"}>
        <ul>
          {options &&
            options.data.map((option) => (
              <li
                key={options.data.indexOf(option)}
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

export default CustomSelectBox;
