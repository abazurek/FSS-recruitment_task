import React from "react";
import CustomSelect from "./CustomSelectBox";

const Header = () => (
  <div className="header-wrapper">
    <div className="title">Map and weather page</div>
    <div className="selects-wrapper">
      <div className="countrySelect-wrapper">
        Select Country
        <CustomSelect
          options={["Poland", "Germany", "England"]}
          defaultOption="Poland"
        />
      </div>
    </div>
  </div>
);

export default Header;
