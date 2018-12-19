import React from 'react';
import './Room.css';

const Room = ({ roomData }) => {
  const config = {
    true: 'green',
    false: 'red',
  };
  /**
  * every room in the database has a 'times' array with objects
  * that hold a timespan and the corresponding availability
  * of the room, e.g. "09:15" and true. We loop over
  *  the times array to create an li element for each timespan.
  * we use the availability property to give the div
  * inside the li a class of either green or red, making the html block
  * green (or in the current color theme: blue) and red
  */
  const renderedTimeBlocks = roomData.times.map((timeSpanObject) => {
    const timespan = timeSpanObject.time.default;
    const availability = timeSpanObject.availability.toString();
    return (
      <li className="room__timeblock-list__timeblock" key={timespan}>
        <div className={`room__timeblock-list__timeblock--block ${config[availability]}`} />
      </li>
    );
  });

  return (
    <div className="room">
      <div className="room__number-box">{roomData.roomName}</div>
      <ul className="room__timeblock-list">{renderedTimeBlocks}</ul>
    </div>
  );
};

export default Room;
