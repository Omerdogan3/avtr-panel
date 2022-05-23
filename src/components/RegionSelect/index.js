

import React, {useState,useEffect} from 'react';
import 'rsuite/styles/index.less';
import { Dropdown,SelectPicker } from 'rsuite';
import api from 'src/api';

import { useSelector } from 'react-redux';
import {store} from 'src/store/configureStore';
import {setCountry} from 'src/store/actions/trendsActions';
import ReactCountryFlag from "react-country-flag"
import regions from '../../constants/regions';

function RegionSelect({onChange,style}) {

  const handleChange = (newcountry)=>{
    store.dispatch(setCountry(newcountry))
    if(onChange){
      onChange(newcountry);
    }
  }
  
  return (
    <SelectPicker 
      style={style}
      onChange={(val)=>handleChange(val)} 
      onClean={()=>handleChange('All')} 
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