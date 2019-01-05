/* eslint-disable react/jsx-filename-extension */
import React, { Fragment } from 'react';
import Room from './Room';

/*
* state.rooms that is passed down into this
* component as data holds the array of rooms in the database
* we loop over the array to create and render rooms
*/

const RoomList = ({ data, day }) => {
  const renderedRooms = data.map(room => <Room day={day} key={room.roomName} roomData={room} />);
  return (
    <Fragment>
      {renderedRooms}
    </Fragment>
  );
};

export default RoomList;
