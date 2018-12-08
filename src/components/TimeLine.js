import React from 'react';
import './TimeLine.css';

const TimeLine = props => {
  const timeArray = [
    "09:00",
    "09:15",
    "09:30",
    "09:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00"
  ]
  const renderedTimes = timeArray.map(time => {
    return <li className="timeline__item"><div className="timeline__item--block">{time}</div></li>
  })
  return <ul className="timeline">{renderedTimes}</ul>;
}

export default TimeLine;