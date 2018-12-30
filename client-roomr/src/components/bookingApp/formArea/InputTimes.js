/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

/*
 *  this component renders the select inputs for reserve and unblock room
 *  the first input should always render the entire timeArray array
 *  and therefore doesnt need a "start" property
 *  the second input starts at a certain point in the array because
 * it *has* to be later than the time in the first input
 *  e.g. if you start your desired reserved time at 10:30, it will
 * automatically set your end to 10:45 and you can still
 *  change the time from there
 *
 * IMPORTANT: this functional component only changes
 * what is rendered in the input but not the actual state,
 * so although you will see 10:45 if your start time is 10:30,
 * the actual state would still be the the default 09:15.
 * we still need to update the state
 * the state change is then done in the ComponentDidUpdate
 * function in Form.js so the state represents what you see
 */

const InputTimes = (props) => {
  const timeArray = [
    '09:00',
    '09:15',
    '09:30',
    '09:45',
    '10:00',
    '10:15',
    '10:30',
    '10:45',
    '11:00',
    '11:15',
    '11:30',
    '11:45',
    '12:00',
    '12:15',
    '12:30',
    '12:45',
    '13:00',
    '13:15',
    '13:30',
    '13:45',
    '14:00',
    '14:15',
    '14:30',
    '14:45',
    '15:00',
    '15:15',
    '15:30',
    '15:45',
    '16:00',
    '16:15',
    '16:30',
    '16:45',
    '17:00',
  ];

  if (!props.start) {
    const renderedTimes = timeArray.map(time => <option key={`startTime: ${time}`} value={time}>{time}</option>);
    renderedTimes.pop();
    return <React.Fragment>{renderedTimes}</React.Fragment>;
  }
  const index = timeArray.indexOf(props.start);
  const endTimeArray = timeArray.slice(index + 1);
  const renderedTimes = endTimeArray.map(time => <option key={`endTime: ${time}`} value={time}>{time}</option>);

  return <React.Fragment>{renderedTimes}</React.Fragment>;
};

export default InputTimes;
