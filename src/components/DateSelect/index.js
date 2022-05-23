import React, {useState} from 'react';
import 'rsuite/styles/index.less';

import 'react-dates/initialize';
import './datepicker.css';
import { DateRangePicker } from 'react-dates';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import {setStartDate} from 'src/store/actions/trendsActions';
import {setEndDate} from 'src/store/actions/trendsActions';
import {store} from 'src/store/configureStore';

function DateSelect({onSubmit}) {
  const [focusedInput, setFocusedInput] = useState(null);

  const startDate = useSelector(state => state.trendsReducer.startDate);
  const endDate = useSelector(state => state.trendsReducer.endDate);

  return (
    <DateRangePicker
      style={{zIndex:100}}
      startDate={moment(startDate)}
      startDateId="startDate" 
      endDate={moment(endDate)} 
      isOutsideRange={() => false}
      endDateId="endDate" 
      onDatesChange={({ startDate, endDate }) => {
        startDate && store.dispatch(setStartDate(startDate))
        endDate && store.dispatch(setEndDate(endDate))
      }}
      focusedInput={focusedInput}
      onFocusChange={focusedInput => {
        setFocusedInput(focusedInput)
        if(!focusedInput){
          onSubmit()
        }
      }}
    />
  );
}

export default DateSelect;