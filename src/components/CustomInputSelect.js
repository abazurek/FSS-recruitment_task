import React, { useState, useEffect, useRef } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomInputSelect = ({
  numOfCharts,
  options,
  showOptionsWithNoCharts,
  placeholder,
  setData,
  fetchDataOnChoose,
  fetchAddress,
}) => {
  const [clicked, setClicked] = useState(false);
  const [response, setResponse] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isError, setIsError] = useState(false);
  const inputRef = useRef(null);

  const choseOption = (option) => {
    setInputValue(option);
    setData(option);
    setClicked(false);
  };

  const fetchCountryData = (countryName) => {
    fetch(`${fetchAddress}${countryName}`)
      .then((resp) => resp.json())
      .then((data) => setResponse(data))
      .catch((err) => setIsError(err));
  };

  const changeInputValueAndSendRequest = (inputValue) => {
    setInputValue(inputValue);
    if (fetchDataOnChoose) {
      if (inputValue.length >= numOfCharts) {
        fetchCountryData(inputValue);
      } else {
        setResponse(false);
      }
    } else setResponse(options.data);
    setClicked(true);
  };

  const clearInput = () => {
    setInputValue("");
    setResponse(false);
    inputRef.current.focus();
  };

  return (
    <>
      <div
        onMouseLeave={() => setClicked(false)}
        className={
          clicked ? "custom-select _input clicked" : "custom-select _input"
        }
      >
        <div className="firstOption ">
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => changeInputValueAndSendRequest(e.target.value)}
            onClick={() => setClicked(!clicked)}
            placeholder={placeholder}
            className="option _input"
          />
          <button className="clearButton" onClick={() => clearInput()}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div
          className={
            !clicked ? "optionsList disabled" : "optionsList biggerVersion"
          }
        >
          <ul>
            {response ? (
              Array.isArray(response) ? (
                response.map((option) => (
                  <li
                    onClick={() =>
                      choseOption(
                        typeof option === "object" ? option.name : option
                      )
                    }
                    key={response.indexOf(option)}
                  >
                    {typeof option === "object" ? option.name : option}
                  </li>
                ))
              ) : (
                <li className="noResults">no results, try again</li>
              )
            ) : (
              <li className="dots">
                <div /> <div /> <div />
              </li>
            )}
          </ul>
        </div>
      </div>
      <p className="errorMessage">
        {isError && "undefined problem, please try again"}
      </p>
    </>
  );
};

export default CustomInputSelect;
