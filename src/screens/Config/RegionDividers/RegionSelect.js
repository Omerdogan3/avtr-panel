import React from 'react';
import 'rsuite/styles/index.less';
import { Container, Content, SelectPicker, Button } from 'rsuite';
import ReactCountryFlag from "react-country-flag"
import regions from '../../../constants/regions';

function RegionSelect({onChange}) {
  return (
    <SelectPicker 
      onChange={onChange} 
      data={
        Object.keys(regions).map(el => {
          return({
            value: el,
            label: 
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
              <ReactCountryFlag
                countryCode={el} /> 
              <p style={{fontSize: 14, fontWeight: "600", paddingLeft: 10, paddingBottom: 4}}>{el}</p>
            </div>,
          })
        }) 
      } 
    />
  );
}

export default RegionSelect;