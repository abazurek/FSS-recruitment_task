import React, { useState, useEffect } from "react";
import CustomInputSelect from "./CustomInputSelect";
import CustomSelectBox from "./CustomSelectBox";
import {
  countryFetchAddress,
  citiesFetchAddress,
} from "../temp/fetchAddresses";

const Header = () => {
  const [country, setCountry] = useState(false);
  const [cities, setCities] = useState(false);
  const [city, setCity] = useState(false);

  const fetchCities = (data) => {
    fetch(`${citiesFetchAddress}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (country) {
      const data = { country };
      fetchCities(data);
    } else setCities(false);
  }, [country]);

  return (
    <div className="header-wrapper">
      <div className="title">Map and weather page</div>
      <div className="selects-wrapper">
        <div className="countrySelect-wrapper">
          Select Country
          <CustomInputSelect
            numOfCharts={3}
            placeholder="enter minimum 3 charts of country"
            setData={setCountry}
            fetchDataOnChoose
            fetchAddress={countryFetchAddress}
          />
        </div>
        {country && (
          <div className="countrySelect-wrapper">
            Select City
            {/*<CustomSelectBox options={cities} />*/}
            <CustomInputSelect
              numOfCharts={1}
              options={cities}
              showOptionsWithNoCharts
              placeholder="enter minimum 1 chart of city"
              setData={setCity}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
